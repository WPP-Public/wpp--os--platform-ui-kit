import React, { useEffect, useRef, useState } from 'react'
import { AutocompleteDefaultOption, LoadMoreHandler } from '@platform-ui-kit/components-library'
import { WppListItem, WppSearch } from '@platform-ui-kit/components-library-react'

import { BasicOption, generateInfiniteResults, isInfiniteLastPage } from '../../Autocomplete/options'

import styles from '../Search.module.scss'
import { ResultsView } from '../ResultsView'

export const InfiniteScrollWithLazyLoad = () => {
  const [infiniteValue, setInfiniteValue] = useState<AutocompleteDefaultOption[]>([])

  const isInfiniteFirstLoadSkipped = useRef(false)
  const infiniteLoadMoreTimer = useRef<ReturnType<typeof setTimeout>>()
  const [infiniteSearchPage, setInfiniteSearchPage] = useState(0)
  const [isSearchingInfinite, setIsSearchingInfinite] = useState(false)
  const [infiniteSearchValue, setInfiniteSearchValue] = useState('')
  const [infiniteSearchResults, setInfiniteSearchResults] = useState<BasicOption[]>([])

  const infiniteSearchValueTrimmed = infiniteSearchValue.trim()
  const infiniteSearchLoadMore: LoadMoreHandler = () =>
    new Promise(resolve => {
      const timeout = 300 + Math.round(Math.random() * 700)
      const page = infiniteSearchResults.length ? infiniteSearchPage + 1 : infiniteSearchPage

      infiniteLoadMoreTimer.current = setTimeout(() => {
        infiniteLoadMoreTimer.current = undefined
        setInfiniteSearchResults(current => [...current, ...generateInfiniteResults(infiniteSearchValueTrimmed, page)])
        setInfiniteSearchPage(page)

        resolve()
      }, timeout)
    })

  // Load infinite options based on search
  useEffect(() => {
    if (isInfiniteFirstLoadSkipped.current) {
      if (infiniteLoadMoreTimer.current) {
        clearTimeout(infiniteLoadMoreTimer.current)
        infiniteLoadMoreTimer.current = undefined
      }

      setIsSearchingInfinite(true)

      const timeout = 700 + Math.round(Math.random() * 1300)
      const timer = setTimeout(() => {
        setInfiniteSearchResults(() => [...generateInfiniteResults(infiniteSearchValueTrimmed, 0)])
        setInfiniteSearchPage(0)
        setIsSearchingInfinite(false)
      }, timeout)

      return () => clearTimeout(timer)
    } else {
      isInfiniteFirstLoadSkipped.current = true
    }
  }, [infiniteSearchValueTrimmed])

  return (
    <div className={styles.item}>
      <WppSearch
        required
        infinite
        infiniteLastPage={isInfiniteLastPage(infiniteSearchValueTrimmed, infiniteSearchPage)}
        loading={isSearchingInfinite}
        name="infinite-list"
        labelConfig={{ text: 'Infinite scroll with lazy load' }}
        placeholder="Scroll me"
        value={infiniteValue}
        loadMore={infiniteSearchLoadMore}
        onWppSearchValueChange={(e: CustomEvent) => setInfiniteSearchValue(e.detail)}
        onWppChange={(e: CustomEvent) => setInfiniteValue(e.detail.value as AutocompleteDefaultOption[])}
        simpleSearch
      >
        {infiniteSearchResults.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppSearch>

      <ResultsView value={infiniteValue.map(i => i.id)} />
    </div>
  )
}
