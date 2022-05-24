import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
//import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from '@/lib/prisma'
import * as bcryptjs from 'bcryptjs'

const salt = bcryptjs.genSaltSync()

export default NextAuth({
  //adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'Username', type: 'text', placeholder: 'username'
        },
        password: {
          label: 'Password', type: 'password'
        }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        console.log(credentials)
        const user = await prisma.user.findFirst({
          where: { username: credentials.username }
        })

        console.log('nextjs::auth::authorize')

        // If no error and we have user data, return it
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return user
        }

        // Return null if user data could not be retrieved
        return null
      }
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],

  database: process.env.DATABASE_URL
})
