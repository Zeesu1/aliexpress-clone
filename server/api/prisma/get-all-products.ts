import type { Products } from '@prisma/client'

import { prisma } from '~/prisma/db'

export default defineEventHandler(async event => {
  const products: Products[] = await prisma.products.findMany({
    take: 12,
  })
  return {
    statusCode: 200,
    items: products,
    message: 'success',
  }
})
