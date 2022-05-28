import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { DateTime } from 'luxon'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @TODO: modify to get the next matches based on round and date
  const result = await prisma.tournament.findMany({
    where: {
      active: true
    },
    include: {
      matches: {
        include: {
          local: true,
          away: true,
        },
      }
    }
  })

  res.json({tournaments: result.map(item => {
    const {id, alias, name, current_round, matches} = item

    return {
      ...item,
      matches: matches.map(match => {
        return {
          ...match,
          started_at: DateTime.fromJSDate(match.started_at).toFormat('yyyy-MM-dd HH:mm'),
        }
     })
    }
  })})

}
