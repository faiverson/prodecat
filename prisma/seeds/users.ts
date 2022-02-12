import * as bcryptjs from 'bcryptjs'
import faker from '@faker-js/faker'
import env from 'lib/utils/environment'
import {repeat} from 'lib/utils/utility'
import User from 'prisma/seeds/models/user'
import {UserType} from 'prisma/seeds/enum'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const salt = bcryptjs.genSaltSync()

export default async function users() {
  let users: Array<User> = [
    new User({username: 'fabian', type: UserType.Admin, phone: '543516223135', email: 'fa.iverson@gmail.com', password: bcryptjs.hashSync(env.ADMIN_PASSWORD, salt)}),
    new User({username: 'juan', type: UserType.Admin, phone: '543513811489', email: 'juampiib@gmail.com', password: bcryptjs.hashSync(env.ADMIN_PASSWORD, salt)}),
  ]

  users = users.concat(repeat(() => new User({
    username: faker.internet.userName().toLowerCase(),
    email: faker.internet.email(),
    password: bcryptjs.hashSync('password', salt),
    phone: faker.phone.phoneNumber(),
  }), 18))

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
