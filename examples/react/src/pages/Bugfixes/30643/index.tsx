import React from 'react'
import styles from './index.module.scss'
import { WppIconChatMessage, WppPopover, WppTypography } from '@platform-ui-kit/components-library-react'

export const ClickingNonInteractiveElementsPopover = () => (
  <div className={styles.container}>
    <WppTypography className={styles.title} type="xl-heading">
      Icon should open a dropdown
    </WppTypography>
    <WppPopover>
      <WppIconChatMessage slot="trigger-element" />
      <div className={styles.dropdownContent}>
        <p>Some text in the dropdown</p>
      </div>
    </WppPopover>
  </div>
)
