import Link from 'next/link'
import TournamentBar from '../TournamentBar'

export default function Header() {
  return (
    <header className="grid grid-cols-9 border-b border-brand-blue-grey">
      <div className="col-span-2 px-4 py-2">
        <Link href="/">
          <a><img src="/images/forecats-up.png" alt="Forecats" /></a>
        </Link>
      </div>
      <div className="flex col-span-5 xl:container">
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 rounded">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Profile</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <nav className="grid w-auto gap-4 grid-min-content">
          <TournamentBar />
        </nav>
      </div>
    </header>
  );
}
