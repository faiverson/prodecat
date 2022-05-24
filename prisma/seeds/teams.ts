#!/usr/bin/env ts-node
import {PrismaClient} from '@prisma/client'
import {snakeCase} from '@/lib/utils/utility'
import {default as data} from './data/american-cup.json'

const prisma = new PrismaClient()

export default async function teams() {
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

  return Promise.all(promises).then(response => {
    console.table(teams)
  })
}
