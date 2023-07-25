import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const orders = await prisma.orders.findMany({
    where: { userId: event.context.params!.userId },
    orderBy: { id: 'desc' },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  })
  return {
    statusCode: 200,
    items: orders,
    message: 'success',
  }
})
