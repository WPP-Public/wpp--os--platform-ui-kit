import styles from './index.module.scss'
import { WppAutocomplete, WppListItem, WppTypography } from '@platform-ui-kit/components-library-react'
import React, { useEffect, useRef, useState } from 'react'
import { initialSelectedValues, memberOptions } from '../13719/config'
import { SelectedValues } from '../../Autocomplete/SelectedValues'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { isInfiniteLastPage } from '../../Autocomplete/options'
import { LoadMoreHandler } from '@platform-ui-kit/components-library'
import { initialOptions } from './config'
import { delay } from '../../../utils'

interface CachedData {
  [key: string]: AutocompleteDefaultOption[]
}

const generateInfiniteResults = (searchValue: string, page: number): AutocompleteDefaultOption[] =>
  initialOptions.filter(item => item.label.includes(searchValue)).slice(page * 10, (page + 1) * 10)

const AutocompleteCreateNewElementProblem = () => {
  const [memberOptionsValues, setMemberOptionsValues] = useState(memberOptions)
  const [newlyCreatedValues, setNewlyCreatedValues] = useState([] as typeof memberOptions)
  const [memberValues, setMemberValues] = useState<AutocompleteDefaultOption[]>(initialSelectedValues)

  const [value, setValue] = useState<AutocompleteDefaultOption[]>([])
  const [options, setOptions] = useState<AutocompleteDefaultOption[]>(generateInfiniteResults('', 1))
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const searchValueRef = useRef(searchValue)
  const [infiniteSearchPage, setInfiniteSearchPage] = useState(0)
  const infiniteLoadMoreTimer = useRef<ReturnType<typeof setTimeout>>()
  const [cachedData, setCachedData] = useState<CachedData>({})

  useEffect(() => {
    searchValueRef.current = searchValue
  }, [searchValue])

  const handleCreateNewOption = (e: CustomEvent) => {
    const newItem = { id: memberOptionsValues.length + 1, label: e.detail }

    setMemberValues([...memberValues, newItem])
    setMemberOptionsValues([...memberOptionsValues, newItem])
    setNewlyCreatedValues([...newlyCreatedValues, newItem])
  }

  const handleSearchChange = async (event: CustomEvent<string>) => {
    if (infiniteLoadMoreTimer.current) {
      clearTimeout(infiniteLoadMoreTimer.current)
      infiniteLoadMoreTimer.current = undefined
    }

    const searchString = event.detail

    if (cachedData[searchString]) {
      await delay(200)

      setOptions(cachedData[searchString])
      setInfiniteSearchPage(0)
      setIsLoading(false)

      return
    }

    setIsLoading(true)

    setSearchValue(searchString)

    const timeout = 700 + Math.round(Math.random() * 1300)

    const timer = setTimeout(() => {
      const generatedResults = [...generateInfiniteResults(searchValueRef.current, 0)]

      setOptions(generatedResults)
      setInfiniteSearchPage(0)
      setIsLoading(false)
      setCachedData({
        ...cachedData,
        [searchValueRef.current]: generatedResults,
      })
    }, timeout)

    infiniteLoadMoreTimer.current = timer

    return () => clearTimeout(timer)
  }

  const infiniteSearchLoadMore: LoadMoreHandler = () =>
    new Promise(resolve => {
      const timeout = 300 + Math.round(Math.random() * 700)
      const page = options.length ? infiniteSearchPage + 1 : infiniteSearchPage

      infiniteLoadMoreTimer.current = setTimeout(() => {
        infiniteLoadMoreTimer.current = undefined
        setOptions(current => [...current, ...generateInfiniteResults(searchValue, page)])
        setInfiniteSearchPage(page)

        resolve()
      }, timeout)
    })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <WppTypography type="xl-heading">
          Autocomplete - the createNewElemenet button displays only when the list is empty
        </WppTypography>

        <WppTypography className={styles.newlyAdded}>
          {'Newly created elements: [{' + newlyCreatedValues.map(item => `"${item.id}": "${item.label}"`) + '}]'}
        </WppTypography>

        <WppAutocomplete
          className="autocomplete"
          required
          name="basic"
          labelConfig={{
            text: 'Members',
            description: 'Description',
          }}
          placeholder="Select member(s)"
          value={memberValues}
          onWppChange={(e: CustomEvent) => setMemberValues(e.detail.value as AutocompleteDefaultOption[])}
          data-testid="basic-autocomplete"
          type="extended"
          multiple
          simpleSearch
          limitSelectedItems={3}
          showCreateNewElement
          onWppCreateNewOption={handleCreateNewOption}
        >
          {memberOptionsValues.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
          <SelectedValues
            values={memberValues}
            onCloseClick={value => setMemberValues(memberValues.filter(i => i.id !== value))}
          />
        </WppAutocomplete>
      </div>

      <div className={styles.container}>
        <WppAutocomplete
          required
          infinite
          infiniteLastPage={isInfiniteLastPage(searchValue, infiniteSearchPage)}
          loading={isLoading}
          labelConfig={{ text: `Server load with infinite search in a 'Multiple' mode with caching and debouncing` }}
          placeholder="Type"
          value={value}
          onWppSearchValueChange={handleSearchChange}
          onWppChange={(e: CustomEvent) => setValue(e.detail.value as AutocompleteDefaultOption[])}
          multiple
          showCreateNewElement
          loadMore={infiniteSearchLoadMore}
        >
          {options.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
          <SelectedValues
            values={value}
            onCloseClick={clickedValue => setValue(value.filter(i => i.id !== clickedValue))}
          />
        </WppAutocomplete>
      </div>
    </div>
  )
}

export default AutocompleteCreateNewElementProblem
