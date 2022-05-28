import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useQuery } from 'react-query'

const HomePage: NextPage = () => {

  const { data: session } = useSession()

  const { isLoading, error, data } = useQuery('repoData', () =>
     fetch('http://localhost:3000/api/teams').then(res =>
       res.json()
     )
   )

   if (isLoading) {
     return <p>Loading</p>
   }
   console.log(data)

  if (session)
    return (
      <div className='flex flex-col justify-center align-middle'>
        <p>Logged in successfully</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )

  return (
    <div className="flex flex-col justify-center align-middle main-background">
      <h1 className="font-bold leading-none basis-full text-huge text-brand-orange">DASHBOARD!</h1>
        <Link href="/login">
          <a className='m-8 square-effect-orange'>Login</a>
        </Link>
    </div>
  )
}

const Index = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default Index
