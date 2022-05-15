import type { NextPage } from 'next'
import Layout from '@/components/Layout'

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col justify-center align-middle main-background">
      <h1 className="font-bold leading-none basis-full text-huge text-brand-orange">DASHBOARD!</h1>
        <div className="bg-red-500">
            <p>This is so great!!!</p>
        </div>
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

