import { getUserSession } from '@/lib/getUserSession';
import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json(
        { message: 'вы не авторизованы' },
        { status: 401 }
      );
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error [get me]', error);
    return NextResponse.json({ message: 'Error [get me]' }, { status: 500 });
  }
}
