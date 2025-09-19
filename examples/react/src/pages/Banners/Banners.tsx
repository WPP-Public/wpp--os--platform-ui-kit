import { useState } from 'react'
import { WppTabs, WppTab } from '@platform-ui-kit/components-library-react'
import { BannerNavbar } from './BannerNavbar'
import { BannerTopbar } from './BannerTopbar'
import { BannerStates } from './BannerStates'
import styles from './Banners.module.scss'

export const Banners = () => {
  const [currentTab, setCurrentTab] = useState('bannerTopBar')

  const handleTabChange = (event: CustomEvent) => {
    setCurrentTab(event.detail.value)
  }

  return (
    <div className={styles.tabs} data-testid="stepper">
      <WppTabs value={currentTab} onWppChange={handleTabChange}>
        <WppTab value="bannerNavBar" data-testid="nav-bar">
          Banner Navbar
        </WppTab>
        <WppTab value="bannerTopBar" data-testid="top-bar">
          Banner Topbar
        </WppTab>
        <WppTab value="bannerStates" data-testid="states">
          Banner States
        </WppTab>
      </WppTabs>
      <div className={styles.content}>
        {
          {
            bannerNavBar: <BannerNavbar />,
            bannerTopBar: <BannerTopbar />,
            bannerStates: <BannerStates />,
          }[currentTab]
        }
      </div>
    </div>
  )
}
