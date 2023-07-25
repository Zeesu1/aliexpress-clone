import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const product = await prisma.products.findFirst({
    where: { id: Number(event.context.params!.id) },
  })
  return {
    statusCode: 200,
    product,
    message: 'success',
  }
})
