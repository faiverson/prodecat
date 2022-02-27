import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
import users from './users.mjs'
import teams from './teams.mjs'
import matches from './matches.mjs'

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
