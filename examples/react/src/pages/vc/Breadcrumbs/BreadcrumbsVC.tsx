import { WppBreadcrumb } from '@platform-ui-kit/components-library-react'
import { BreadcrumbItemEventDetails } from '@platform-ui-kit/components-library'
import { useNavigate, Outlet } from 'react-router-dom'
import styles from './BreadcrumbsVC.module.scss'

export const BreadcrumbsVCPage = () => {
  const items = [
    {
      label: 'Home',
      path: '/breadcrumb',
    },

    {
      label: 'Alfa',
      path: '/breadcrumb/alfa',
    },

    {
      label: 'Bravo (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo',
    },

    {
      label: 'Charlie',
      path: '/breadcrumb/alfa/bravo/charlie',
    },

    {
      label: 'Delta (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo/charlie/delta',
      active: true,
    },

    {
      label: 'Echo',
      path: '/breadcrumb/alfa/bravo/charlie/delta/echo',
    },

    {
      label: 'Foxtrot (International Radiotelephony Spelling Alphabet)',
      path: '/breadcrumb/alfa/bravo/charlie/delta/echo/foxtrot',
    },
  ]

  const navigate = useNavigate()

  const handleRouteChange = (event: CustomEvent<BreadcrumbItemEventDetails>) => {
    navigate(event.detail.path)
  }

  return (
    <div className={styles.breadcrumbs} data-testid="breadcrumbs">
      <div>
        <h3>Regular Breadcrumb</h3>
        <WppBreadcrumb items={items} onWppChange={handleRouteChange} data-testid="without-native-link" />
      </div>

      <div>
        <h3>Breadcrumb with 3 elements</h3>
        <WppBreadcrumb items={items.slice(0, 3)} nativeLink data-testid="with-native-link" />
      </div>

      <div>
        <h3>Breadcrumb with 4 elements</h3>
        <WppBreadcrumb items={items.slice(0, 4)} />
      </div>

      <div>
        <h3>Breadcrumb with 5 elements</h3>
        <WppBreadcrumb items={items.slice(0, 5)} />
      </div>

      <div>
        <h3>Breadcrumb with middleTruncation</h3>
        <WppBreadcrumb
          items={items}
          middleTruncation
          onWppChange={handleRouteChange}
          data-testid="breadcrumb-truncation"
        />
      </div>

      <Outlet />
    </div>
  )
}
