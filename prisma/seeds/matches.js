
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const data = require('./data/american-cup.json')
const moment = require('moment')
const { date_format } = require('../../global-config.js')

async function main() {
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
        started_at: moment(item.started_at, date_format).toDate(),
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
  return Promise.all(promises)
}

main()
  .catch(ex => {
    console.error(`Error on matches ${ex}`)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
