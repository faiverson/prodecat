import { useQuery } from '@apollo/client'
import Navbar from '@/components/layout/Navbar'
import { query_tournaments } from 'apollo/queries'

const TournamentBar = () => {
  const { loading, data } = useQuery(query_tournaments, {
    onError: error => {
      console.error('TournamentBar', error)
    }
  })

  if(loading || !data || !data.tournaments) {
    return false
  }

  const items = data.tournaments.map( item => ({
    href: `/tournament/[slug]`,
    as: `/tournament/${item.alias}`,
    label: item.name}
  ))

  return (
    <Navbar items={items}></Navbar>
  )
}

export default TournamentBar
