import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.match.findMany({
    where: {
      AND: [
        {
          state: 'created',
          round_number: '1'
        },
      ]
    },
    // TODO: make the includes depending on the request
    include: {
      local: true,
      away: true,
    },
  })
  res.json({result})

}
