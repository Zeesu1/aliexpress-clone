import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const res = await prisma.addresses.findFirst({
    where: { userId: event.context.params!.id },
  })
  return {
    statusCode: 200,
    address: res,
    message: 'success',
  }
})
