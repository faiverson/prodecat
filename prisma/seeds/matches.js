import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
import {default as data} from './data/american-cup.json'

const prisma = new PrismaClient()

export default async function matches() {
  await prisma.match.deleteMany()
  // if the field in where is not unique you need to use findMany
  let tournament = await prisma.tournament.findMany({
    where: {
      name: data.tournament.name,
    },
  })

  // it return an array and I need only the first match
  tournament = tournament.shift()

  const promises =  data.matches.map(async item => {
    const teams = await prisma.team.findMany({
      where: {
        name: {
          in: [
            item.local, item.away
          ],
        },
      },
    })

    const local = teams.find( team => team.name === item.local)
    const away = teams.find( team => team.name === item.away)
    if(!local) {
      throw new Error(`Team ${local} not found`)
    }
    else if(!local) {
      throw new Error(`Team ${away} not found`)
    }

    return prisma.match.create({
      data: {
        round: `Round ${item.round}`,
        round_number: item.round,
        started_at: Date.parse(item.started_at).toISOString(),
        tournament: {
          connect: {
            id: tournament.id
          }
        },
        local: {
          connect: {
            id: local.id
          }
        },
        away: {
          connect: {
            id: away.id
          }
        }
      }
    })
  })

  return Promise.all(promises).then(response => {
    console.table(data.matches)
  })
}
