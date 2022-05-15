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
    <header className="grid grid-cols-9 border-b border-brand-blue-grey">
      <div className="col-span-2 px-4 py-2">
        <Link href="/">
          <a><Image src="/images/forecats-up.png" alt="Forecats" width={183} height={101} /></a>
        </Link>
      </div>
      <div className="flex col-span-5 xl:container">
        <nav className="grid w-auto gap-4 grid-min-content">
          <Navbar items={items}></Navbar>
        </nav>
      </div>
    </header>
  )
}
