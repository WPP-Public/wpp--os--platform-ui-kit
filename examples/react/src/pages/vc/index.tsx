import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { VCRoutes } from '../../routes'

import '../../App.css'

export const VCPage = () => (
  <div>
    <header>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        {VCRoutes.map(({ url, title }) => (
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
