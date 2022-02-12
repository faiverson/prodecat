#!/usr/bin/env ts-node
import { PrismaClient } from '@prisma/client'
import users from './users'

const prisma = new PrismaClient()

async function main() {
  await users()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
