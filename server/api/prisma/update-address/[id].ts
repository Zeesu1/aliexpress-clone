import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const res = await prisma.addresses.update({
    where: { id: Number(event.context.params!.id) },
    data: {
      name: body.name,
      address: body.address,
      zipcode: body.zipCode,
      city: body.city,
      country: body.country,
    },
  })

  return {
    statusCode: 200,
    address: res,
    message: 'success',
  }
})
