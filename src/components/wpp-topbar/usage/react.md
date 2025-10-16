```tsx
import React, { useState } from 'react'
import { WppTopbar, WppButton } from '@wppopen/components-library-react'
import { NavigationState } from '@wppopen/components-library'
import { useNavigate } from 'react-router-dom'

const initNavigation: NavigationState[] = [
  {
    label: 'Home',
    value: 'home',
    path: '/home',
  },
  {
    label: 'Client services',
    value: 'clientServices',
    path: '/client-services',
  },
  {
    label: 'Learning',
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/learning/community',
      },
    ],
  },
  {
    label: 'Marketplace',
    value: 'marketplace',
    path: '/marketplace',
  },
  {
    label: 'Dev portal',
    value: 'devPortal',
    path: '/devPortal',
  },
]

export const TopbarExample = () => {
  const [value, setValue] = useState('devPortal')
  const [navigationData, setNavigationData] = useState(initNavigation)
  const navigate = useNavigate()

  const handleTopbarItemChange = (event: CustomEvent) => {
    setValue(event.detail.value)
    navigate(event.detail.path)
  }

  const handleAddNavigationItemToBeginning = () => {
    setNavigationData([{ label: 'Start', value: 'start', path: '/start' }, ...navigationData])
  }

  const handleAddNavigationItemToEnd = () => {
    setNavigationData([...navigationData, { label: 'End', value: 'end', path: '/end' }])
  }

  return (
    <>
      <WppTopbar
        value={value}
        navigation={navigationData}
        onWppChange={handleTopbarItemChange}
      >
        <div slot="app">
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
          />
          <WppTypography type="m-body-accent" tag="h3">APP Name</WppTypography>
        </div>
      </WppTopbar>
      <div>
        <WppButton variant="secondary" onClick={handleAddNavigationItemToBeginning}>
          Add new navigation to beginning
        </WppButton>
        <WppButton variant="secondary" onClick={handleAddNavigationItemToEnd}>
          Add new navigation to end
        </WppButton>
      </div>
    </>
  )
}
```
