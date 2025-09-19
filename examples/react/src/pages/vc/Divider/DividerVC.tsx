import React from 'react'
import { WppDivider, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './DividerVC.module.scss'

export const DividerVCPage = () => (
  <form className={styles.form} data-testid="divider-form">
    <WppTypography tag="h3" type="xl-heading" className={styles.title}>
      Horizontal Divider
    </WppTypography>
    <WppDivider className={styles.divider} />
    <WppTypography tag="h3" type="xl-heading" className={styles.title}>
      Vertical Divider
    </WppTypography>
    <div className={styles.verticalContainer}>
      <WppDivider vertical />
    </div>
  </form>
)
