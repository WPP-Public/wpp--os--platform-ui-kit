import React from 'react'
import { WppSpinner } from '@platform-ui-kit/components-library-react'
import styles from './SpinnersVC.module.scss'

export const SpinnersVCPage = () => (
  <div className={styles.container} data-testid="spinners-container">
    <div className={styles.spinners}>
      <h3>Spinner S</h3>
      <WppSpinner size="s" />

      <h3>Spinner M</h3>
      <WppSpinner size="m" />

      <h3>Spinner L</h3>
      <WppSpinner size="l" />
    </div>

    <div className={styles.spinners}>
      <h3>Spinner S (grey 800)</h3>
      <WppSpinner size="s" color="var(--wpp-grey-color-800)" />

      <h3>Spinner M (grey 000)</h3>
      <div style={{ backgroundColor: 'var(--wpp-grey-color-900)' }}>
        <WppSpinner size="m" color="var(--wpp-grey-color-000)" />
      </div>

      <h3>Spinner L (grey 000)</h3>
      <div style={{ backgroundColor: 'var(--wpp-grey-color-900)' }}>
        <WppSpinner size="l" color="var(--wpp-grey-color-000)" />
      </div>
    </div>
  </div>
)
