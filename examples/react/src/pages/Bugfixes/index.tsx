import React from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { BugfixRoutes } from '../../routes'

import '../../App.css'

export const BugfixPage = () => {
  const [searchParams] = useSearchParams()
  const hideLinks = searchParams?.get('hideLinks')

  return (
    <div>
      <header>
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
            display: hideLinks ? 'none' : 'flex',
          }}
        >
          {BugfixRoutes.map(({ url, title }) => (
            <NavLink
              className={({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')}
              to={url}
              key={url + title}
            >
              {title}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
