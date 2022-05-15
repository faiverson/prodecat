import React, { useState } from 'react'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import { Input, Checkbox, Password } from 'elements/core'
import styles from './css/login.module.css'
import cn from 'classnames'

const LogInMutation = gql`
  mutation LogInMutation($username: String!, $password: String!) {
    logIn(input: { username: $username, password: $password }) {
      user {
        id
        username
        email
      }
    }
  }
`

const LogInHeader = () => {
  return (
    <header className="w-full mx-2 max-h-28 xl:py-4">
      <Image src="/images/forecats.png" alt="Forecats" width={419} height={81} />
    </header>
  );
}

const LogIn = () => {
  // const client = useApolloClient()
  // const [logIn] = useMutation(LogInMutation)
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await client.resetStore()
      const { data } = await logIn({
        variables: { username, password },
      })
      if (data.logIn.user) {
        await router.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-col w-2/4 mt-32">
        <h2 className="text-5xl font-medium leading-none">Welcome to</h2>
        <h1 className="font-bold leading-none text-huge text-brand-orange">Forecats</h1>
        <h3 className="mt-4 text-2xl font-light leading-none text-center text-white">Your perfect betting digital platform</h3>
      </div>
      <div className="flex flex-col w-2/4 mt-32">
        <form onSubmit={handleSubmit} className="w-full h-auto max-w-sm grid-flow-row grid-cols-2 mx-auto ">
          <div className="row">
            <Input name="username" label="Username" placeholder="janedoe@email.com" required value={username} onChange={txt => setUsername(txt)} />
          </div>
          <div className="row">
            <Password name="password" label="Password" placeholder="Type your password" required value={password} onChange={txt => setPassword(txt)} />
          </div>
          <div className="justify-between pt-2 row">
            <Checkbox name="remember" text="Remember me" checked={false} />
            <Link href="block forget-password">
              <a className="text-sm font-light square-effect-white">Forget Password?</a>
            </Link>
          </div>
          <div className="pt-8 row">
            <Link href="signup">
              <a className="w-full btn-secondary">Sign up</a>
            </Link>
            <button type="submit" className="w-full ml-2 btn-primary">Log In</button>
          </div>
          <div className="flex justify-between pt-8 row">
            <span>or login with</span>
            <Link href="signup">
              <a className="square-effect-orange">Facebook</a>
            </Link>
            <Link href="signup">
              <a className="square-effect-orange">Instagram</a>
            </Link>
            <Link href="signup">
              <a className="square-effect-orange">Gmail</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

const LogInPage = () => {
  return (
    <Layout special className={cn(styles.special, styles.loginPage)}>
      <div className={styles.loginBackground}></div>
      <div className="container relative z-10 h-full max-w-screen-lg mx-auto">
        <LogInHeader />
        <main className="flex main">
          <LogIn />
        </main>
      </div>
    </Layout>
  )
}

export default LogInPage
