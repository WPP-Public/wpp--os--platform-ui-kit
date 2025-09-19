import React, { useState } from 'react'
import { WppOverlay, WppTypography, WppButton } from '@platform-ui-kit/components-library-react'
import styles from './Overlay.module.scss'

const OverlayPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const handleOverlayChange = () => {
    console.log('Overlay Clicked:')
  }

  return (
    <div className={styles.container}>
      <WppTypography className={styles.title} type="2xl-heading">
        Overlay component
      </WppTypography>

      <div className={styles.notes}>
        <WppTypography type="xl-heading">Notes</WppTypography>

        <WppTypography className={styles.text} type="s-body">
          - The Overlay component opens relative to the first parent container (which has position: relative).
        </WppTypography>

        <WppTypography className={styles.text} type="s-body">
          - The Overlay component should emit the wppClick event when clicked.
        </WppTypography>
      </div>

      <div className={styles.scenarios}>
        <WppTypography className={styles.scenarioTitle} type="xl-heading">
          Scenario: render overlay in the body of a page.
        </WppTypography>

        <div className={styles.section}>
          <div className={styles.header}>
            <WppTypography className={styles.text} type="s-body">
              Header
            </WppTypography>
          </div>
          <div className={styles.body}>
            <WppTypography className={styles.text} type="s-body">
              Body
            </WppTypography>
            <WppOverlay isVisible={isVisible} onWppClick={handleOverlayChange} />
          </div>
        </div>
      </div>

      <WppButton
        className={styles.button}
        variant="primary"
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        Toggle overlay
      </WppButton>
    </div>
  )
}

export default OverlayPage
