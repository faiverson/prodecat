const { PrismaClient } = require('@prisma/client')
const { snakeCase } = require('lodash')
const prisma = new PrismaClient()
const data = require('./data/american-cup.json')

async function main() {
  await prisma.tournamentTeamGroup.deleteMany()
  await prisma.match.deleteMany()
  await prisma.tournament.deleteMany()
  await prisma.team.deleteMany()
  await prisma.group.deleteMany()

  // first we create a tournament
  const tournament = await prisma.tournament.create({
    data: data.tournament,
  })

  if(tournament.type === 'cup') {
    return addCup(tournament)
  }
}

function addCup(tournament) {
  const promises = data.groups.map(async item_group => {
    const group = await prisma.group.create({
      data: {
        name: item_group.name
      },
    })

    return addTeams(item_group.teams, group, tournament)
  })
  return Promise.all(promises)
}


function addTeams(teams, group, tournament) {
  const promises =  teams.map( async item => {
    const team = await prisma.team.create({
      data: {
        name: item.name,
        alias: snakeCase(item.name),
        tournaments: {
          create: {
            tournament: {
              connect: {
                id: tournament.id
              }
            },
            group: {
              connect: {
                id: group.id
              }
            }
          }
        }
      }
    })
    return team
  })
  return Promise.all(promises)
}

main()
  .catch(ex => { throw ex })
  .finally(async () => { await prisma.$disconnect() })
