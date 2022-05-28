import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"

import prisma from '@/lib/prisma'
import * as bcryptjs from 'bcryptjs'

const salt = bcryptjs.genSaltSync()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.MAIL_HOST,
    //     port: process.env.MAIL_PORT,
    //     auth: {
    //       user: process.env.MAIL_USERNAME,
    //       pass: process.env.MAIL_PASSWORD,
    //     },
    //   },
    //   from: 'NextAuth <noreply@example.com>',
    // }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({

    }),
    InstagramProvider({

    })
  ],
  pages: {
    signIn: '/login',
  },
  database: process.env.DATABASE_URL
})
