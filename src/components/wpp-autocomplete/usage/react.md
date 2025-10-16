```tsx
import React, { useState } from 'react'
import { AutocompleteDefaultOption } from '@wppopen/components-library'
import { WppAccordion, WppAutocomplete, WppTypography, WppListItem } from '@wppopen/components-library-react'

import { countryOptions, fruitOptions, hugeListOptions } from './options'

import { ResultsView } from './ResultsView'
import { SelectedValues } from './SelectedValues'
import { SingleSelectInfiniteScrollWithLazyLoad } from './Examples/SingleSelectInfiniteScrollWithLazyLoad'
import { ServerSearch } from './Examples/ServerSearch'

import styles from './Autocomplete.module.css'

export const Autocomplete = () => {
  const [basicValue, setBasicValue] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Pineapple',
    },
    {
      id: 3,
      label: 'Kiwi',
    },
    {
      id: 13,
      label: 'Pear',
    },
  ])
  const [customOptionsValue, setCustomOptionsValue] = useState<AutocompleteDefaultOption[]>([])
  const [hugeListValue, setHugeListValue] = useState<AutocompleteDefaultOption[]>([])
  const suggestions = [
    { id: 101, label: 'Avocado' },
    { id: 102, label: 'Blueberry' },
    { id: 103, label: 'Cherry' },
    { id: 104, label: 'Durian' },
    { id: 105, label: 'Elderberry' },
  ]

  return (
    <>
      <div className={styles.wrapper} data-testid="autocompletes">
        <div className={styles.item}>
          <WppAutocomplete
            required
            name="basic"
            suggestions={staticSuggestions}
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Basic with initial values and suggestions',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            placeholder="Select fruits"
            value={basicValue}
            onWppChange={e => setBasicValue(e.detail.value as AutocompleteDefaultOption[])}
            data-testid="basic-autocomplete"
            multiple
            showCreateNewElement
            simpleSearch
          >
            {fruitOptions.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <p slot="label">{option.label}</p>
              </WppListItem>
            ))}
            <SelectedValues
              values={basicValue}
              onCloseClick={value => setBasicValue(basicValue.filter(i => i.id !== value))}
            />
          </WppAutocomplete>
        </div>
        <div className={styles.item}>
          <WppAutocomplete
            required
            name="custom-option-labels"
            labelConfig={{ text: 'Custom option labels and modified number of tags shown when idle and suggestions' }}
            placeholder="Select countries"
            value={customOptionsValue}
            onWppChange={e => setCustomOptionsValue(e.detail.value as AutocompleteDefaultOption[])}
            data-testid="custom-autocomplete"
            suggestions={staticSuggestions}
            autoFocus
            multiple
            showCreateNewElement
            simpleSearch
          >
            {countryOptions.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <div slot="label">
                  <div className={styles.primary}>
                    <span className={styles.flag}>{option.flag}</span> {option.label}
                  </div>
                </div>
                <div className={styles.secondary} slot="caption">
                  {option.nativeName}
                </div>
              </WppListItem>
            ))}
            <SelectedValues
              values={customOptionsValue}
              onCloseClick={value => setCustomOptionsValue(customOptionsValue.filter(i => i.id !== value))}
            />
          </WppAutocomplete>

          <ResultsView value={customOptionsValue.map(i => i.id)} />
        </div>
      </div>
    </>
  )
}
```

#### Related components with additional examples
**ResultView.tsx**

```tsx
import styles from './Autocomplete.module.scss'
import { WppTypography } from '@wppopen/components-library-react'
import React from 'react'

export const ResultsView = ({ value }: { value: (string | number)[] | string }) => (
  <div className={styles.results}>
    <WppTypography type="s-body">Selected values:</WppTypography>
    <pre className={styles.mono}>{JSON.stringify(value, null, 2)}</pre>
  </div>
)
```

**SelectedValues.tsx**

```tsx
import { WppPill } from '@wppopen/components-library-react'
import { AutocompleteDefaultOption } from '@wppopen/components-library'

import styles from './Autocomplete.module.scss'
import React from 'react'

interface SelectedValuesComponent {
  values: AutocompleteDefaultOption[]
  onCloseClick: (a: number | string) => void
}

export const SelectedValues = ({ values, onCloseClick }: SelectedValuesComponent) => (
  <div slot="selected-values">
    {values.map(value => (
      <WppPill
        label={value.label}
        removable
        value={value.id}
        onWppClose={() => onCloseClick(value.id)}
        type="display"
        className={styles.pill}
        key={value.id}
      >
        {value.label}
      </WppPill>
    ))}
  </div>
)
```

**Infinite scroll with lazy load**

```tsx
import React, { useEffect, useRef, useState } from 'react'
import { AutocompleteDefaultOption, LoadMoreHandler } from '@wppopen/components-library'
import { WppAutocomplete, WppListItem } from '@wppopen/components-library-react'

import { BasicOption, generateInfiniteResults, isInfiniteLastPage } from '../options'

import styles from '../Autocomplete.module.scss'
import { SelectedValues } from '../SelectedValues'
import { ResultsView } from '../ResultsView'

export const SingleSelectInfiniteScrollWithLazyLoad = () => {
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
      <WppAutocomplete
        required
        infinite
        infiniteLastPage={isInfiniteLastPage(infiniteSearchValueTrimmed, infiniteSearchPage)}
        loading={isSearchingInfinite}
        name="infinite-list"
        labelConfig={{ text: 'Infinite scroll with lazy load' }}
        placeholder="Scroll me"
        value={infiniteValue}
        loadMore={infiniteSearchLoadMore}
        onWppSearchValueChange={e => setInfiniteSearchValue(e.detail)}
        onWppChange={e => setInfiniteValue(e.detail.value as AutocompleteDefaultOption[])}
        multiple
        showCreateNewElement
        simpleSearch
      >
        {infiniteSearchResults.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
        <SelectedValues
          values={infiniteValue}
          onCloseClick={value => setInfiniteValue(infiniteValue.filter(i => i.id !== value))}
        />
      </WppAutocomplete>

      <ResultsView value={infiniteValue.map(i => i.id)} />
    </div>
  )
}
```

**Autocomplete.css**

```css
.wrapper {
  box-sizing: border-box;
  width: 650px;
  margin: 24px auto;
  padding: 40px;
  border: 1px solid var(--wpp-grey-color-600);
  border-radius: 8px;
}

.item + .item {
  margin-top: 32px;
}

.results {
  margin-top: 16px;
}

.mono {
  margin: 0;
  padding: 8px;
  overflow: hidden;
  white-space: pre-wrap;
  background-color: #faf9f5;
  border: 1px solid var(--wpp-grey-color-600);
  border-radius: 4px;
}
```
