import React, { useEffect, useState } from 'react'

import { WppTopbarItem, WppTopbar, WppTypography } from '@platform-ui-kit/components-library-react'
import { NavigationState } from '@platform-ui-kit/components-library'
import styles from './TopbarExample.module.scss'

const initNavigation: NavigationState[] = [
  {
    label: 'Home',
    value: 'home',
    path: '/topbar',
  },
  {
    label: 'Client services',
    value: 'clientServices',
    path: '/topbar/client-services',
  },
  {
    label: 'Learning',
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/topbar/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/topbar/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/topbar/learning/community',
      },
    ],
  },
  {
    label: 'Marketplace',
    value: 'marketplace',
    path: '/topbar/marketplace',
  },
  {
    label: 'Dev portal',
    value: 'devPortal',
    path: '/topbar/devPortal',
  },
]

const children: NavigationState[] = [
  {
    label: 'Guided tour',
    value: 'guidedTour',
    path: '/topbar/learning/guided-tour',
  },
  {
    label: 'Case studies',
    value: 'caseStudies',
    path: '/topbar/learning/case-studies',
  },
  {
    label: 'Community',
    value: 'community',
    path: '/topbar/learning/community',
  },
]

const getNavigationContent = (children: NavigationState[] = [], label = 'Learning'): NavigationState => ({
  label,
  value: label,
  children,
})

export const TopbarExample = () => {
  const [path, navigate] = useState('')
  const [navigation, setNavigate] = useState<NavigationState>(getNavigationContent(children.slice(0, 1)))

  useEffect(() => {
    setTimeout(() => {
      setNavigate(getNavigationContent(children.slice(0, 2)))
    }, 1000)

    setTimeout(() => {
      setNavigate(getNavigationContent(children, 'Updated learning'))
    }, 2000)

    setTimeout(() => {
      setNavigate(getNavigationContent(children.slice(0, 1)))
    }, 4000)
  }, [])

  const handleTopbarItemChange = (event: CustomEvent) => {
    navigate(event.detail.value)
  }

  return (
    <>
      <h3>Topbar Item example</h3>
      <WppTopbarItem
        firstLevel
        navigation={navigation as NavigationState}
        active={true}
        activeItems={['selectedNavItemValue']}
        onWppActiveTopbarItemChange={() => console.log('click wpp active topbar item')}
      />

      <h3>Topbar example</h3>
      <WppTypography>Selected value: {path}</WppTypography>
      <WppTopbar value={path} navigation={initNavigation} onWppChange={handleTopbarItemChange}>
        <div slot="app" className={styles.app}>
          <img
            src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
            className={styles.image}
          />
          <WppTypography className={styles.name} type="m-strong" tag="h3">
            APP Name
          </WppTypography>
        </div>
      </WppTopbar>
    </>
  )
}
