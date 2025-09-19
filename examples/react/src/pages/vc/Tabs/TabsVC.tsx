import React, { useState } from 'react'
import { WppTabs, WppTab, WppTypography } from '@platform-ui-kit/components-library-react'
import { TabsChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './TabsVC.module.scss'

export const TabsVCPage = () => {
  const [currentTab, setCurrentTab] = useState('drinks')

  const handleTabChange = (event: CustomEvent<TabsChangeEventDetail>) => {
    setCurrentTab(event.detail.value)
  }

  return (
    <div data-testid="tab-control">
      <h2 className={styles.title}>Tabs example M Size</h2>
      <div className={styles.page}>
        <WppTabs value={currentTab} onWppChange={handleTabChange}>
          <WppTab value="houses">Houses</WppTab>
          <WppTab value="cars">Cars</WppTab>
          <WppTab disabled counter={2} value="food">
            Food
          </WppTab>
          <WppTab value="drinks" counter={4}>
            Drinks
          </WppTab>
        </WppTabs>
        <div className={styles.content}>
          {
            {
              houses: (
                <WppTypography type="xs-body" className={styles.content}>
                  First content
                </WppTypography>
              ),
              cars: (
                <WppTypography type="xs-body" className={styles.content}>
                  Second content
                </WppTypography>
              ),
              drinks: (
                <WppTypography type="xs-body" className={styles.content}>
                  Fourth content
                </WppTypography>
              ),
            }[currentTab]
          }
        </div>
      </div>

      <h2 className={styles.title}>Tabs example S Size</h2>
      <div className={styles.page}>
        <WppTabs size="s" value={currentTab} onWppChange={handleTabChange}>
          <WppTab value="houses">Houses</WppTab>
          <WppTab value="cars">Cars</WppTab>
          <WppTab disabled counter={2} value="food">
            Food
          </WppTab>
          <WppTab value="drinks" counter={4}>
            Drinks
          </WppTab>
        </WppTabs>
        <div className={styles.content}>
          {
            {
              houses: (
                <WppTypography type="xs-body" className={styles.content}>
                  First content
                </WppTypography>
              ),
              cars: (
                <WppTypography type="xs-body" className={styles.content}>
                  Second content
                </WppTypography>
              ),
              drinks: (
                <WppTypography type="xs-body" className={styles.content}>
                  Fourth content
                </WppTypography>
              ),
            }[currentTab]
          }
        </div>
      </div>
    </div>
  )
}
