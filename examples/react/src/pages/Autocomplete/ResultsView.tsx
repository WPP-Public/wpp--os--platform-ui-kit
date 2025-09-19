import styles from './Autocomplete.module.scss'
import { WppTypography } from '@platform-ui-kit/components-library-react'
import React from 'react'

export const ResultsView = ({ value }: { value: (string | number)[] | string }) => (
  <div className={styles.results}>
    <WppTypography type="s-body">Selected values:</WppTypography>
    <pre className={styles.mono}>{JSON.stringify(value, null, 2)}</pre>
  </div>
)
