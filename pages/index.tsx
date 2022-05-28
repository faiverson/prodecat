import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { MatchTable, Loading } from '@/elements/core'
import Link from 'next/link'
import prisma from 'lib/prisma'
import { useQuery } from 'react-query'

const HomePage: NextPage = () => {
  const { isLoading, error, data } = useQuery('getNextMatches', () =>
    fetch('/api/next-matches').then(res => res.json())
  )

  const tournaments = !!data && data.tournaments

  return (
    <Layout>
      <div className="flex max-w-screen-lg pt-4 mx-auto">
        {isLoading
          ? <Loading fullPage />
          : tournaments.map((item, i) => {
            const { name: title, matches, current_round: round } = item
            return (
              <div key={i} className="w-full max-w-screen-lg ">
                <h2 className="mt-6 text-xl font-semibold mb-7 text-brand-orange">{`${title} - Round ${round}`}</h2>
                <MatchTable matches={matches} />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}


export default HomePage
