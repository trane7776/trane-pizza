import { PaymentCallbackData } from '@/@types/yookassa';
import { OrderSuccessTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.object.status === 'succeeded';
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Trane pizza | Мы начали готовить ваш заказ 💛',
        OrderSuccessTemplate({ orderId: order.id, items })
      );
    }
  } catch (error) {
    console.error('[Checkpout callback] error', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
