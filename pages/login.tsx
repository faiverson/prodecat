import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import styles from './css/login.module.css'
import cn from 'classnames'

const LogIn = () => {
  return (
    <>
      <div className="flex flex-col w-2/4 mt-32">
        <h2 className="text-5xl font-medium leading-none">Welcome to</h2>
        <h1 className="font-bold leading-none text-huge text-brand-orange">Forecats</h1>
        <h3 className="mt-4 text-2xl font-light leading-none text-center text-white">Your perfect betting digital platform</h3>
      </div>
      <div className="flex flex-col w-2/4 mt-32">
        <div className="w-full h-auto max-w-sm grid-flow-row grid-cols-2 mx-auto text-right">
          <h3>Login with</h3>
          <div className="flex flex-col items-end text-4xl leading-snug">
            <Link href="#">
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
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

const LogInPage = () => {
  return (
    <Layout special className={cn(styles.special, styles.loginPage)}>
      <div className={styles.loginBackground}></div>
      <div className="container relative z-10 h-full max-w-screen-lg mx-auto">
        <header className="w-full mx-2 max-h-28 xl:py-4">
          <Image src="/images/forecats.png" alt="Forecats" width={419} height={81} />
        </header>
        <main className="flex main">
          <LogIn />
        </main>
      </div>
    </Layout>
  )
}

export default LogInPage
