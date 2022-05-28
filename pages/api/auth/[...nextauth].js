import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from '@/lib/prisma'
import * as bcryptjs from 'bcryptjs'

const salt = bcryptjs.genSaltSync()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      from: 'NextAuth <noreply@example.com>',
    }),
  ],

  database: process.env.DATABASE_URL
})
