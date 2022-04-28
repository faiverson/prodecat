import type { NextPage } from 'next'
import Layout from '@/components/Layout'

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col justify-center align-middle">
      <h1 className="font-bold basis-full leading-none text-huge text-brand-orange">DASHBOARD!</h1>
      <div className="bg-red-500">
      <p>This is so great!</p>
          </div>
      <ul>

      </ul>
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

