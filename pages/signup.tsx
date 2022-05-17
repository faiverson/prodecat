import React, { useReducer, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'
import { Input, Password } from 'elements/core'
import styles from './css/login.module.css'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const validator = (state, element) => {
  const [name, value] = element;
  let message = ''
  switch (name) {
    case 'username':
      message = value === '' ? 'Username cannot be empty' : null;
      break;
    case 'first_name':
      message = value === '' ? 'First name cannot be empty' : null;
      break;
    case 'last_name':
      message = value === '' ? 'Lastname cannot be empty' : null;
      break;
    case 'email':
      const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      message = value === '' ? 'Email cannot be empty' : null;
      break;
  }

  console.log(message);
  return {
    ...state,
    [name]: message
  }
}

const SignUp = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const { username, email, first_name, last_name, phone, password, password_confirmation } = formData
  const [error, setError] = useReducer(validator, {});

  const onSubmit = async event => {
    event.preventDefault()

    Object.entries(formData).forEach((element) => setError(element))

  };

  const checkPass = password => {
    const bHasLowercase = /[a-z]+/g.test(password)
    const bHasCapital = /[A-Z]+/g.test(password)
    const bHasDigit = /\d/.test(password)
    const bHasSpecial = /[\$&+,:;=\?@#\|\'\<\>\.\-\^\*\(\)%\!]+/g.test(password)
    if (!bHasLowercase) {
      return 'Password needs a lower letter'
    } else if (!bHasCapital) {
      return 'Password needs a capital letter'
    } else if (!bHasDigit) {
      return 'Password needs a digit'
    } else if (!bHasSpecial) {
      return 'Password needs to have special character'
    }
    return true
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox'
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  }

  return (
    <>
      <div className="flex flex-col w-2/3 mt-16">
        <h2 className="text-5xl leading-none">Sign Up!</h2>
        <h1 className="font-bold leading-none text-huge text-brand-orange">Forecats</h1>
        <h3 className="mt-4 text-2xl font-thin leading-none text-center text-white">Your perfect betting digital platform</h3>
      </div>
      <div className="flex flex-col w-2/4 mt-16">
        <form noValidate onSubmit={onSubmit} className="w-full h-auto max-w-sm grid-flow-row grid-cols-2 mx-auto ">
          <div className="row">
            <Input name="username" label="Username" value={username} placeholder="janedoe" error={error?.username} onChange={handleChange} />
          </div>
          <div className="row">
            <Input type="email" name="email" value={email} label="Email" placeholder="janedoe@email.com" error={error?.email} onChange={handleChange} />
          </div>
          <div className="row">
            <Input name="first_name" label="First Name" placeholder="Jane" value={first_name} onChange={handleChange} />
          </div>
          <div className="row">
            <Input name="last_name" label="Last Name" placeholder="Doe" value={last_name} onChange={handleChange} />
          </div>
          <div className="row">
            <Input name="phone" label="Phone" placeholder="+54 351 112233" value={phone} onChange={handleChange} />
          </div>
          <div className="row">
            <Password name="password" label="Password" placeholder="Type your password" value={password} />
          </div>
          <div className="row">
            <Password name="password_confirmation" label="Confirm Password" placeholder="Type your password again" value={password_confirmation} onChange={handleChange} />
          </div>
          <div className="flex justify-between pt-4">
            <div className="">
              <Link href="/login">
                <a className="text-sm font-light square-effect-white">Do you have an account?</a>
              </Link>
            </div>
            <button type="submit" className="w-2/4 btn-primary">Sign up</button>
          </div>
          <div className="flex justify-between pt-4 row">
            <span>or sign up with</span>
            <Link href="/login">
              <a className="square-effect-orange">Facebook</a>
            </Link>
            <Link href="/login">
              <a className="square-effect-orange">Instagram</a>
            </Link>
            <Link href="/login">
              <a className="square-effect-orange">Gmail</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

const SignUpPage = () => {
  return (
    <Layout special className="login-page special">
      <Head>
        <title>Sign Up in Forecats!</title>
        <meta property="og:title" content="Sign Up in Forecats!" key="title" />
      </Head>
      <div className={styles.loginBackground}></div>
      <div className="container relative z-10 h-full max-w-screen-lg mx-auto">
        <header className="w-full mx-2 max-h-28 xl:py-4">
          <Image src="/images/forecats.png" alt="Forecats" width={419} height={81} />
        </header>
        <main className="flex main">
          <SignUp />
        </main>
      </div>
    </Layout>
  )
}

export default SignUpPage
