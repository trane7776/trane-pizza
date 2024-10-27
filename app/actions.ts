'use server';

import {
  PayOrderTemplate,
  VerificationUserTemplate,
} from '@/components/shared';
import { CheckoutFormValues } from '@/components/shared/checkout-components/checkout-form-schema';
import { createPayment, sendEmail } from '@/lib';
import { getUserSession } from '@/lib/getUserSession';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;
    if (!cartToken) {
      throw new Error('Cart token not found');
    }
    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // корзина не найдена
    if (!userCart) {
      throw new Error('Cart not found');
    }
    // корзина пуста
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }
    // создаем ордер
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // обнуляем стоимость корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // удаляем все товары привязанные к корзине
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      description: `Оплата заказа #${order.id}`,
      orderId: order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      `Trane Pizza. Оплатите заказ #${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl,
      })
    );
    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });
  } catch (error) {
    console.error('Error [update user]', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('почта не подтверждена');
      }

      throw new Error('пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      `Trane Pizza. 🍏Подтверждение регистрации`,
      VerificationUserTemplate({
        code,
      })
    );
  } catch (error) {
    console.error('Error [create user]', error);
    throw error;
  }
}
