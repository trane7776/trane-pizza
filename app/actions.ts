'use server';

import { PayOrderTemplate } from '@/components/shared';
import { CheckoutFormValues } from '@/components/shared/checkout-components/checkout-form-schema';
import { createPayment, sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
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
