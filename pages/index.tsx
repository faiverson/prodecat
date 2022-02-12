import type { NextPage } from 'next'
import Layout from '@/components/Layout'

const HomePage: NextPage = () => {
  return (
    <div className="flex justify-center align-middle">
      <h1 className="font-bold leading-none text-huge text-brand-orange">DASHBOARD!</h1>
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

