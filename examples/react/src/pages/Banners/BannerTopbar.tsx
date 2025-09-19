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
} from '@platform-ui-kit/components-library-react'

import { breadcrumb_items, topbar_items, cards } from './config'
import styles from './BannerTopbar.module.scss'

export const BannerTopbar = () => {
  const [value, setValue] = useState('marketOverview')
  const [isToShowBanner, setIsToShowBanner] = useState(true)

  const handleTopbarItemChange = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  const handleBannerShowStateChange = (event: CustomEvent) => {
    setIsToShowBanner(event.detail.show)
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
            <WppAvatar name="Avatar" size="s" color="var(--wpp-dataviz-color-cat-dark-9)" />
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
        <WppBanner
          type="information"
          show={isToShowBanner}
          closable
          onWppClose={handleBannerShowStateChange}
          className={styles.banner}
          data-testid="banner-with-top-bar"
        >
          Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of
          text.
        </WppBanner>
        <div className={styles.body}>
          <div className={styles.section}>
            <WppTypography type="3xl-heading">Client images</WppTypography>
            <div className={styles.actions}>
              <WppIconHelp color="var(--wpp-brand-color)" />
              <WppTypography type="s-midi" className={styles.helper}>
                Help
              </WppTypography>
              <WppButton variant="secondary" onClick={handleShowBanner}>
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
  )
}
