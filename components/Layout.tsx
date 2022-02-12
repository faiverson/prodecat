import Head from 'next/head'
import Header from './layout/Header'
import { Loading } from 'elements/core'
import { useUser } from 'lib/hooks/user'
import PropTypes from 'prop-types'

type MainPageProps = {
  children: React.ReactNode;
}

const MainPage = ({children}: MainPageProps) => {
  // @TODO uncomment this part
  // const user = useUser({ redirectTo: '/login' })

  // if(!user) {
  //   return <Loading fullPage />
  // }

  return (
    <>
      <div className="relative z-10 w-full h-full mx-auto">
        {/* <Header /> */}
        <main className="main">
          {children}
        </main>
      </div>
    </>
  )
}

MainPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired
}

type LayoutProps = {
  children: React.ReactNode;
  special: boolean;
  className: string;
  title: string;
}

const Layout = ({children, special, className, title}: LayoutProps) => {
  const class_name = [className, 'h-full bg-brand-blue main-background font-poppins'].join(' ')

  return (
    <div className={class_name}>
      <Head>
        <title>{title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#07162a"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { special ? children : <MainPage>{children}</MainPage>}
    </div>
  )
}

Layout.defaultProps = {
  title: 'Forecats',
  className: '',
  special: false,
}

Layout.propTypes = {
  title: PropTypes.string,
  special: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired
}

export default Layout
