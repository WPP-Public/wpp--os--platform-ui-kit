import { WppBreadcrumb, WppTypography } from '@platform-ui-kit/components-library-react'
import { BreadcrumbItemEventDetails, BreadcrumbItemState } from '@platform-ui-kit/components-library'
import React, { useEffect, useState } from 'react'

const alfaBravoItems: BreadcrumbItemState[] = [
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
]

const generateItems = (alfaBravoItems: BreadcrumbItemState[] = []) => [
  {
    label: 'Home',
    path: '/breadcrumb',
  },
  ...alfaBravoItems,
  {
    label: 'Delta (International Radiotelephony Spelling Alphabet)',
    path: '/breadcrumb/alfa/bravo/charlie/delta',
  },
  {
    label: 'Echo',
    path: '/breadcrumb/alfa/bravo/charlie/delta/echo',
  },

  {
    label: 'Foxtrot',
    path: '/breadcrumb/alfa/bravo/charlie/delta/echo/foxtrot',
  },
]

export const BreadcrumbsExample = () => {
  const [path, setPath] = useState('')
  const [items, setItems] = useState<BreadcrumbItemState[]>(generateItems(alfaBravoItems.slice(0, 2)))

  useEffect(() => {
    setTimeout(() => {
      setItems(generateItems(alfaBravoItems.slice(0, 3)))
    }, 1000)

    setTimeout(() => {
      setItems(generateItems(alfaBravoItems))
    }, 3000)
  }, [])

  const handleRouteChange = (event: CustomEvent<BreadcrumbItemEventDetails>) => {
    setPath(event.detail.path)
  }

  return (
    <div>
      <h3>Breadcrumbs example</h3>
      <WppTypography>Path: {path}</WppTypography>
      <WppBreadcrumb items={items} onWppChange={handleRouteChange} data-testid="without-native-link" />
      <h3>Breadcrumbs example (Appended to document body)</h3>
      <WppTypography>Path: {path}</WppTypography>
      <WppBreadcrumb items={items} onWppChange={handleRouteChange} data-testid="without-native-link" />
    </div>
  )
}
