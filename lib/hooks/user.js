import { gql, useQuery } from '@apollo/client'
import Router from 'next/router'

const AuthQuery = gql`
  query AuthenticatedQuery {
    authenticated {
      id
      username
      email
    }
  }
`

export function useUser({ redirectTo, redirectIfFound } = {}) {
  const { loading, data, error } = useQuery(AuthQuery)
  const user = data?.authenticated

  if(loading) {
    return
  }

  if (error || !Boolean(user)) {
    Router.push(redirectTo)
  }

  return user
}
