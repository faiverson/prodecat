// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

type Teams = {
}

type Data = {
  result: Teams[],
  new: Boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await prisma.team.findMany()
  res.status(200).json({result, new: false})

}
