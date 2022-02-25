import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
import users from './users.js'
import teams from './teams.js'
import matches from './matches.js'

const prisma = new PrismaClient()

async function main() {
  await users()
  await teams()
  await matches()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
