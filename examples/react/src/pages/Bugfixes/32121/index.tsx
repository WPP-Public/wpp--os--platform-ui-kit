import React, { useState } from 'react'
import styles from './index.module.scss'
import { WppCard, WppCardGroup, WppTab, WppTabs, WppTypography } from '@platform-ui-kit/components-library-react'
import { CardGroupChangeEventDetail, CardGroupValue } from '@platform-ui-kit/components-library'

const CardGroupTabsIssue = () => {
  const [activeTab, setActiveTab] = useState('tab-1')
  const [multipleGroupValue, setMultipleGroupValue] = useState<CardGroupValue>(['item-a'])

  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setMultipleGroupValue(event.detail.value)
  }

  const renderContent = () => {
    if (activeTab === 'tab-1') {
      return (
        <WppCardGroup multiple value={multipleGroupValue} size="s" onWppChange={handleMultipleCardGroupChange}>
          <div className={styles.cardGroupContent}>
            <WppCard className={styles.item} value="item-a" data-testid="multiple-card-item-a">
              <div>Information about item a</div>
              <WppTypography slot="header" type="s-strong">
                Item A
              </WppTypography>
            </WppCard>
            <WppCard className={styles.item} value="item-b" data-testid="multiple-card-item-b">
              <div>Information about item b</div>
              <WppTypography slot="header" type="s-strong">
                Item B
              </WppTypography>
            </WppCard>
            <WppCard className={styles.item} value="item-c">
              <div>Information about item c</div>
              <WppTypography slot="header" type="s-strong">
                Item C
              </WppTypography>
            </WppCard>
          </div>
        </WppCardGroup>
      )
    }

    return <h3>Tab: {activeTab}</h3>
  }

  return (
    <div className={styles.container}>
      <WppTabs value={activeTab} onWppChange={(e: CustomEvent) => setActiveTab(e.detail.value)}>
        <WppTab value="tab-1">Tab 1</WppTab>
        <WppTab value="tab-2">Tab 2</WppTab>
        <WppTab value="tab-3">Tab 3</WppTab>
      </WppTabs>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  )
}

export default CardGroupTabsIssue
