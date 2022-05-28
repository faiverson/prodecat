#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client'
import users from './users'
import teams from './teams'
import matches from './matches'

const prisma = new PrismaClient()

async function main() {
  //await users()
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
