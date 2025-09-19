import React from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { routes } from './routes'

import './App.css'

function App() {
  const [searchParams] = useSearchParams()

  const isStorybookDemo = searchParams.has('storybook-demo')

  return (
    <div>
      {!isStorybookDemo && (
        <header>
          <h2 className="app-title">Components Library Examples</h2>
          <nav
            style={{
              borderBottom: 'solid 1px',
              paddingBottom: '1rem',
            }}
          >
            {routes.map(({ url, title }) => (
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
      )}

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
