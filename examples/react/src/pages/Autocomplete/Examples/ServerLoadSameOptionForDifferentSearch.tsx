import React, { useState } from 'react'
import { WppAutocomplete, WppListItem } from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

import { delay } from '../../../utils'
import { SelectedValues } from '../SelectedValues'

import styles from '../Autocomplete.module.scss'

const createOptions = (optionsNumber: number): AutocompleteDefaultOption[] => [
  {
    id: 'okta',
    label: '1Cloud Okta',
  },
  ...Array(Math.min(optionsNumber, 5))
    .fill(null)
    .map((_, index) => ({
      id: `opt${index}`,
      label: `Additional Option ${index + 1}`,
    })),
]

export const ServerLoadSameOptionForDifferentSearch = () => {
  const [value, setValue] = useState<AutocompleteDefaultOption[]>([])
  const [options, setOptions] = useState<AutocompleteDefaultOption[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchChange = async (event: CustomEvent<string>) => {
    const searchString = event.detail

    setIsLoading(true)

    await delay(1000)
    setOptions(createOptions(searchString.length))

    setIsLoading(false)
  }

  return (
    <div className={styles.item}>
      <WppAutocomplete
        required
        loading={isLoading}
        labelConfig={{ text: 'Server load same option for different search input (option - "1Cloud Okta")' }}
        placeholder='Type "1Cloud Okta"'
        value={value}
        onWppSearchValueChange={handleSearchChange}
        onWppChange={(e: CustomEvent) => setValue(e.detail.value as AutocompleteDefaultOption[])}
        multiple
        showCreateNewElement
        simpleSearch
        infinite
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
  )
}
