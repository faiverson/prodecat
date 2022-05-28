// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import * as bcryptjs from 'bcryptjs'

type Data = {
  user: object
}

const credentials = {
  username: 'juan',
  password: 'pass1'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let user = await prisma.user.findFirst({
    where: { username: credentials.username }
  })

  user.passwd = bcryptjs.compareSync(credentials.password, user.password);
  //bcryptjs.hashSync(credentials.password, salt)


  res.status(200).json({ user })
}
