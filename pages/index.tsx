import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import prisma from '@/lib/prisma'

const HomePage: NextPage = (props) => {

  const { data: session } = useSession()
  console.log(props)
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
    </div>
  )
}

const Index = (props) => {
  console.log(props)
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const data = await prisma.match.findMany({
    where: {
      AND: [
        {
          state: 'created',
          round_number: '1'
        },
      ]
    },
    // TODO: make the includes depending on the request
    include: {
      local: true,
      away: true,
    },
  })

  // The value of the `props` key will be
  //  passed to the `Home` component
  data.map(item => console.log(item))
  return {
    props: {
      matches: data
    }
  }
}

export default Index

