import React from 'react'

import { InfiniteScrollWithLazyLoad } from './Examples/InfiniteScrollWithLazyLoad'

import styles from './Search.module.scss'

export const Search = () => (
  <>
    <div className={styles.wrapper} data-testid="search">
      <InfiniteScrollWithLazyLoad />
    </div>
  </>
)
