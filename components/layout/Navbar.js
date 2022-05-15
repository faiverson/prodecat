import React, { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import cn from 'classnames'

const Navbar = ({items: moreItems}) => {
  const router = useRouter()

  const items = [
    ...[{ href: '/', label: 'Dashboard' }],
    ...[{ href: '/custom', label: 'Custom' }],
    ...moreItems
  ]

  return (
    <>
      {items.map(({ href, as, label }, idx) => (
        <div key={`${href}${label}`} className={
          cn('flex', 'items-center', 'justify-around', {
            "navbar-selected": router.pathname === href || router.asPath === href
          })
        }>
          <Link href={href} as={as} passHref>
            <a title={label} className="block text-2xl font-thin square-effect-white">
              {label}
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

Navbar.propTypes = {
  items: PropTypes.array
};

export default Navbar
