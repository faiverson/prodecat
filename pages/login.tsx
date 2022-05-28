import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import styles from './css/login.module.css'
import { getProviders, signIn, getSession } from "next-auth/react"
import cn from 'classnames'

const LogInPage = ({ providers }) => {
  return (
    <Layout special className={cn(styles.special, styles.loginPage)}>
      <div className={styles.loginBackground}></div>
      <div className="container relative z-10 h-full max-w-screen-lg mx-auto">
        <header className="w-full mx-2 max-h-28 xl:py-4">
          <Image src="/images/forecats.png" alt="Forecats" width={419} height={81} />
        </header>
        <main className="flex main">
          <div className="flex flex-col w-2/4 mt-32">
            <h2 className="text-5xl font-medium leading-none">Welcome to</h2>
            <h1 className="font-bold leading-none text-huge text-brand-orange">Forecats</h1>
            <h3 className="mt-4 text-2xl font-light leading-none text-center text-white">Your perfect betting digital platform</h3>
          </div>
          <div className="flex flex-col w-2/4 mt-32">
            <div className="w-full h-auto max-w-sm grid-flow-row grid-cols-2 mx-auto text-right">
              <h3>Login with</h3>
              <div className="flex flex-col items-end text-4xl leading-snug">
                {Object.values(providers).map((provider) => (
                  // provider.name !== 'email'
                  <button className="mt-4 square-effect-orange" onClick={() => signIn(provider.id)} key={provider.name}>
                    <i className={`pr-2 fa-brands fa-${provider.name.toLowerCase()}`} />{provider.name}
                  </button>

                ))}

                {/* <Link href="#">
                  <a className="mt-4 square-effect-orange"><i className="pr-2 fa-brands fa-facebook-square" />Facebook</a>
                </Link>
                <Link href="#">
                  <a className="mt-4 square-effect-orange"><i className="pr-2 fa-brands fa-instagram" />Instagram</a>
                </Link>
                <Link href="#">
                  <a className="mt-4 square-effect-orange"><i className="pr-2 fa-brands fa-google" />Google</a>
                </Link>
                <Link href="#">
                  <a className="mt-4 square-effect-orange"><i className="pr-2 fa-brands fa-twitter-square" />Twitter</a>
                </Link> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default LogInPage

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const providers = await getProviders()
  return {
    props: { providers },
  }
}
