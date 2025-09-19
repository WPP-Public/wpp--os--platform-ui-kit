import styles from './index.module.scss'
import { WppButton, WppIconMail, WppListItem, WppTag } from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'

const labelsArr = ['This is a very long label that will be truncated with an ellipsis', 'Short label']

const RecalculateTooltipOnListItem = () => {
  const [label, setLabel] = useState('Short label')

  const toggleLabel = () => {
    if (label === labelsArr[0]) {
      setLabel(labelsArr[1])
    } else {
      setLabel(labelsArr[0])
    }
  }

  return (
    <div className={styles.container}>
      <WppListItem labelTooltipConfig={{ placement: 'top' }}>
        <WppIconMail slot="left" />
        <span slot="label">{label}</span>
        <WppTag slot="right" label="Positive" variant="positive" />
      </WppListItem>

      <WppButton onClick={toggleLabel}>Toggle Label</WppButton>
    </div>
  )
}

export default RecalculateTooltipOnListItem
