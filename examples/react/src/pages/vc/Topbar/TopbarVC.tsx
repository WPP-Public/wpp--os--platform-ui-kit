import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { WppTopbar, WppButton, WppTypography } from '@platform-ui-kit/components-library-react'
import { NavigationState } from '@platform-ui-kit/components-library'
import styles from './TopbarVC.module.scss'

const initNavigation: NavigationState[] = [
  {
    label: 'Home',
    value: 'home',
    path: '/topbar',
  },
  {
    chevronOnly: true,
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
        children: [
          {
            label: 'People',
            value: 'people',
            path: '/topbar/learning/people',
          },
          {
            label: 'Workers',
            value: 'workers',
            path: '/topbar/learning/workers',
          },
        ],
      },
    ],
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

export const TopbarVCPage = () => {
  const [firstValue, setFirstValue] = useState('devPortal')
  const [secondValue, setSecondValue] = useState('community')
  const [navigationData, setNavigationData] = useState(initNavigation)
  const navigate = useNavigate()

  const handleTopbarItemChange = (event: CustomEvent) => {
    setFirstValue(event.detail.value)
    setSecondValue(event.detail.value)
    navigate(event.detail.path)
  }

  const handleAddNavigationItemToBeginning = () => {
    setNavigationData([{ label: 'Start', value: 'start', path: '/topbar/start' }, ...navigationData])
  }

  const handleAddNavigationItemToEnd = () => {
    setNavigationData([...navigationData, { label: 'End', value: 'end', path: '/topbar/end' }])
  }

  return (
    <>
      <div className={styles.page} data-testid="topbar-page">
        <WppTopbar value={firstValue} navigation={navigationData} onWppChange={handleTopbarItemChange}>
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
        <WppTopbar value={firstValue} navigation={navigationData} />
        <WppTopbar value={secondValue} navigation={navigationData} data-testid="selected-menu" />
        <div className={styles.actions}>
          <WppButton variant="secondary" onClick={handleAddNavigationItemToBeginning} data-testid="add-nav-button">
            Add new navigation to beginning
          </WppButton>
          <WppButton variant="secondary" onClick={handleAddNavigationItemToEnd}>
            Add new navigation to end
          </WppButton>
        </div>
      </div>

      <Outlet />
    </>
  )
}
