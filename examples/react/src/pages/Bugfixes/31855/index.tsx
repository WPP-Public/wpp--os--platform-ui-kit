import React, { useEffect, useState } from 'react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { BasicOption } from '../../Autocomplete/options'
import styles from './index.module.scss'
import { WppListItem, WppSearch } from '@platform-ui-kit/components-library-react'
import { searchResults1 } from './searchResults'

const searchCachedItemValues: string[] = ['river']

export const SearchWithCachingAPI = () => {
  const [result, setResult] = useState<AutocompleteDefaultOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState<BasicOption[]>([])

  // Load search options based on search
  useEffect(() => {
    if (!searchValue) return
    let timer: NodeJS.Timeout | null = null

    // Take result from cache
    if (!searchCachedItemValues.includes(searchValue)) {
      searchCachedItemValues.push(searchValue)
      setIsLoading(true)

      timer = setTimeout(() => {
        setSearchResults(() => searchResults1.filter(el => el.label.includes(searchValue)))
        setIsLoading(false)
      }, 1300)
    } else {
      setSearchResults(() => searchResults1.filter(el => el.label.includes(searchValue)))
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [searchValue])

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <WppSearch
          required
          loading={isLoading}
          name="cache-list"
          labelConfig={{ text: `Search with cache. Loading status: ${isLoading}` }}
          placeholder="Search with cache"
          value={result}
          onWppSearchValueChange={(e: CustomEvent) => setSearchValue(e.detail)}
          onWppChange={(e: CustomEvent) => setResult(e.detail.value as AutocompleteDefaultOption[])}
        >
          {searchResults.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>
      </div>

      <div>
        <pre>{JSON.stringify(searchResults, null, 2)}</pre>
      </div>
    </div>
  )
}
