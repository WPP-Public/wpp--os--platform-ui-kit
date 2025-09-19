import React from 'react'
import { WppCard, WppCardGroup, WppIconUser, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'

export const NoSelectedCardDefault = () => (
  <div className={styles.group} data-testid="cards-group-container">
    <h3>Multiple Group</h3>
    <WppCardGroup className={styles.multiple} multiple size="l">
      <WppCard className={styles.item} value="item-a" data-testid="multiple-card-item-a">
        <div>Information about item a</div>
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item a</div>
          <WppTypography slot="header" type="s-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppTypography slot="header" type="s-strong">
          Item A
        </WppTypography>
      </WppCard>
      <WppCard className={styles.item} value="item-b" data-testid="multiple-card-item-b">
        <div>Information about item b</div>
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item b</div>
          <WppTypography slot="header" type="s-strong">
            Item B
          </WppTypography>
        </WppCard>
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
    </WppCardGroup>

    <h3>Single Group</h3>
    <WppCardGroup className={styles.single} size="l">
      <WppCard className={styles.item} value="item-a" data-testid="single-card-item-a">
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item a</div>
          <WppTypography slot="header" type="s-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppTypography slot="header" type="l-strong">
          Item A
        </WppTypography>
      </WppCard>
      <WppCard className={styles.item} value="item-b" data-testid="single-card-item-b">
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item b</div>
          <WppTypography slot="header" type="s-strong">
            Item B
          </WppTypography>
        </WppCard>
        <WppTypography slot="header" type="l-strong">
          Item B
        </WppTypography>
      </WppCard>
      <WppCard className={styles.item} value="item-c" disabled>
        <div slot="header" className={styles.cardHeader}>
          <WppIconUser className={styles.userIcon}></WppIconUser>
          <WppTypography className={styles.disabledLabel} slot="header" type="l-strong">
            Item C
          </WppTypography>
        </div>
      </WppCard>
    </WppCardGroup>

    <h3>Single Group without radio</h3>
    <WppCardGroup className={styles.single} size="l" withRadioOrCheckbox={false}>
      <WppCard className={styles.item} value="item-a">
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item a</div>
          <WppTypography slot="header" type="s-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppTypography slot="header" type="l-strong">
          Item A
        </WppTypography>
      </WppCard>
      <WppCard className={styles.item} value="item-b">
        <WppTypography slot="header" type="l-strong">
          Item B
        </WppTypography>
      </WppCard>
      <WppCard className={styles.item} value="item-c">
        <WppCard size="s" variant="secondary" className={styles.secondary}>
          <div>Information about item c</div>
          <WppTypography slot="header" type="s-strong">
            Item C
          </WppTypography>
        </WppCard>
        <WppTypography slot="header" type="l-strong">
          Item C
        </WppTypography>
      </WppCard>
    </WppCardGroup>
  </div>
)
