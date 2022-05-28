import cn from 'classnames'
import Head from 'next/head'
import Header from './layout/Header'
import Router from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

type MainPageProps = {
  children: React.ReactNode;
}

const MainPage = ({ children }: MainPageProps) => {
  const { data: session } = useSession()

  if (!session) {
    // Router.push('/login')
  }

  return (
    <>
      <div className="relative z-10 w-full h-full mx-auto">
        <Header />
        <main className="main">
          {children}
        </main>
      </div>
    </>
  )
}

type LayoutProps = {
  children: React.ReactNode;
  special: boolean;
  className: string;
}

const Layout = ({ children, special, className }: LayoutProps) => {
  const class_name = [className, 'h-full bg-brand-blue', special ? 'no-background' : 'main-background'].join(' ')

  return (
    <div className={class_name}>
      <Head>
        <title>{'Forecats'}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#07162a" />
        <meta name="theme-color" content="#ffffff" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {special ? children : <MainPage>{children}</MainPage>}
    </div>
  )
}

Layout.defaultProps = {
  className: '',
  special: false,
}

export default Layout
