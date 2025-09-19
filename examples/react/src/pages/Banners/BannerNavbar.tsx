import { useState } from 'react'
import {
  WppAvatar,
  WppIconNavigationMenu,
  WppIconSearch,
  WppTypography,
  WppIconMore,
  WppBreadcrumb,
  WppTopbar,
  WppDivider,
  WppIconHelp,
  WppButton,
  WppBanner,
  WppCard,
  WppIconBookmarkSelected,
  WppNavSidebarItem,
  WppIconGlobe,
  WppIconFavourites,
  WppIconCalendar,
  WppIconUser,
  WppIconMail,
  WppIconSubscribe,
  WppIconUpload,
  WppNavSidebar,
} from '@platform-ui-kit/components-library-react'

import { breadcrumb_items, topbar_items, cards } from './config'
import styles from './BannerNavbar.module.scss'

export const BannerNavbar = () => {
  const [value, setValue] = useState('marketOverview')
  const [isToShowBanner, setIsToShowBanner] = useState(false)

  const handleTopbarItemChange = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  const handleShowBanner = () => {
    setIsToShowBanner(true)
  }

  const handleCloseBanner = () => {
    setIsToShowBanner(false)
  }

  const cardItem = () =>
    cards.map(card => (
      <WppCard className={styles['card-item']} key={card.title}>
        <img src={card.src} alt="" />
        <div className={styles.content}>
          <WppTypography type="xl-heading" className={styles.title}>
            {card.title}
          </WppTypography>
          <WppTypography type="s-body" className={styles.description}>
            {card.description}
          </WppTypography>
        </div>
      </WppCard>
    ))

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.navigation}>
          <div className={styles['navigation-bar']}>
            <WppIconNavigationMenu className={styles['icon-nav-menu']} />
            <img
              src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
              className={styles.image}
            />
            <WppBreadcrumb items={breadcrumb_items} />
          </div>
          <div className={styles.actions}>
            <WppIconSearch className={styles['icon-search']} />
            <WppTypography type="s-midi">Help</WppTypography>
            <WppIconMore direction="horizontal" className={styles['icon-more']} />
            <WppAvatar name="Avatar" size="s" color="var(--wpp-dataviz-color-cat-dark-1)" />
          </div>
        </div>
        <WppDivider />
        <WppTopbar value={value} navigation={topbar_items} onWppChange={handleTopbarItemChange}>
          <div slot="app" className={styles.app}>
            <WppTypography className={styles.name} type="m-strong" tag="h3">
              APP Name
            </WppTypography>
          </div>
        </WppTopbar>
      </div>
      <div className={styles.container}>
        <div className={styles['nav-sidebar']}>
          <WppNavSidebar className={styles.sidebar} initialPath={'/dashboard'}>
            <div slot="header">
              <div className={styles.icon}>
                <WppIconBookmarkSelected />
              </div>
              <p className={styles.appName}>App Name</p>
            </div>
            <WppNavSidebarItem label="Dashboard" path="/dashboard">
              <WppIconGlobe slot="icon-start" />
            </WppNavSidebarItem>
            <WppNavSidebarItem label="Projects" path="/projects" extended expanded>
              <WppIconFavourites slot="icon-start" />
              <WppNavSidebarItem label="Projects 01" path="/projects1"></WppNavSidebarItem>
              <WppNavSidebarItem label="Projects 02" path="/projects2"></WppNavSidebarItem>
              <WppNavSidebarItem label="Projects 03" path="/projects3"></WppNavSidebarItem>
            </WppNavSidebarItem>
            <WppNavSidebarItem
              label={'Scheduled reporting'}
              path="/scheduled"
              extended
              groupTitle="Reporting"
              data-testid="tooltip-item"
            >
              <WppIconCalendar slot="icon-start" />
              <WppNavSidebarItem label="Scheduled 01" path="/scheduled1"></WppNavSidebarItem>
              <WppNavSidebarItem label="Scheduled 02" path="/scheduled2"></WppNavSidebarItem>
            </WppNavSidebarItem>
            <WppNavSidebarItem label={'Shared reports'} path="/shared-reposts" divide>
              <WppIconUser slot="icon-start" />
            </WppNavSidebarItem>
            <WppNavSidebarItem label={'Attachments'} path="/attachments">
              <WppIconMail slot="icon-start" />
            </WppNavSidebarItem>
            <WppNavSidebarItem label={'Archive'} path="/archive" divide>
              <WppIconSubscribe slot="icon-start" />
            </WppNavSidebarItem>
            <WppNavSidebarItem label={'Applications'} path="/applications">
              <WppIconUpload slot="icon-start" />
            </WppNavSidebarItem>
          </WppNavSidebar>
        </div>
        <div className={styles['container-body']}>
          <WppBanner type="warning" show={isToShowBanner} className={styles.banner}>
            USPS has updated their rates. Make sure you know how these changes affect your store.
          </WppBanner>
          <div className={styles.body}>
            <div className={styles.section}>
              <div className={styles['section-info']}>
                <WppTypography type="3xl-heading">Client images</WppTypography>
                <div className={styles.actions}>
                  <WppIconHelp color="var(--wpp-brand-color)" />
                  <WppTypography type="s-midi" className={styles.helper}>
                    Help
                  </WppTypography>
                  <WppButton variant="secondary" onClick={handleShowBanner} data-testid="show-banner">
                    Show Banner
                  </WppButton>
                  <WppButton variant="primary" onClick={handleCloseBanner} className={styles['export-btn']}>
                    Close Banner
                  </WppButton>
                </div>
              </div>
              <div className={styles['cards-list']}>{cardItem()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
