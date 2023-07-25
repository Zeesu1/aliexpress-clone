import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const items = await prisma.products.findMany({
    take: 5, // Max rows
    where: {
      title: {
        contains: event.context.params!.id,
        mode: 'insensitive',
      },
    },
  })

  return {
    statusCode: 200,
    items,
    message: 'success',
  }
})
