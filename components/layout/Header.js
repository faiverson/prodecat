import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'

export default function Header() {
  const items = [
    {alias: 'american-cup', name: 'American Cup'},
    {name: 'World Cup', alias: 'world-cup'},
  ].map( item => ({
    href: `/tournament/[slug]`,
    as: `/tournament/${item.alias}`,
    label: item.name}
  ))

  return (
    <header className="flex justify-between h-4 border-b border-brand-blue-grey header-height">
      <div className="absolute px-4 py-2 top-1 left-2">
        <Link href="/">
          <a><Image src="/images/forecats-up.png" alt="Forecats" width={183} height={101} /></a>
        </Link>
      </div>
      <div className="container flex max-w-screen-lg mx-auto">
        <nav className="grid w-auto gap-4 grid-min-content">
          <Navbar items={items}></Navbar>
        </nav>
      </div>
    </header>
  )
}
