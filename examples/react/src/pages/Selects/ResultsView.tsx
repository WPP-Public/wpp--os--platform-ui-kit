import React from 'react'
import { WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './Selects.module.scss'

export const ResultsView = ({ value }: { value: (string | number | undefined)[] | string }) => (
  <div className={styles.results}>
    <WppTypography type="s-body">Selected values:</WppTypography>
    <pre className={styles.mono}>{JSON.stringify(value, null, 2)}</pre>
  </div>
)
