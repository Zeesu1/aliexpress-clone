import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  await prisma.addresses.create({
    data: {
      userId: body.userId,
      name: body.name,
      address: body.address,
      zipcode: body.zipCode,
      city: body.city,
      country: body.country,
    },
  })

  return {
    statusCode: 200,
    message: 'success',
  }
})
