import { default as bcryptjs} from 'bcryptjs'
import {faker} from '@faker-js/faker'
import {repeat} from '#lib/utils/utility.js'
import {UserType} from '#prisma/seeds/enum/index.js'
import {config} from 'dotenv'
import Prisma from '@prisma/client'
const { PrismaClient } = Prisma

config()

const prisma = new PrismaClient()

const salt = bcryptjs.genSaltSync(10)

export default async function users() {
  let users = [
    {username: 'fabian', type: UserType.Admin, phone: '543516223135', email: 'fa.iverson@gmail.com', password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD, salt)},
    {username: 'juan', type: UserType.Admin, phone: '543513811489', email: 'juampiib@gmail.com', password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD, salt)},
  ]

  users = users.concat(repeat(() => ({
    username: faker.internet.userName().toLowerCase(),
    email: faker.internet.email(),
    password: bcryptjs.hashSync('password', salt),
    phone: faker.phone.phoneNumber(),
  }), 38))

  await prisma.userResult.deleteMany()

  await prisma.user.deleteMany()

  return await prisma.$transaction(users.map( item => {
    return prisma.user.create({
      data: Object.assign(item),
    })
  })).then(users => {
    console.table(users.map(({password, created_at, updated_at, ...item}) => item))
  })
}
