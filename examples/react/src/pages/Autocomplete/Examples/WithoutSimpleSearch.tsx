import React, { useState } from 'react'
import { WppAutocomplete, WppListItem, WppButton } from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

import { delay } from '../../../utils'
import { SelectedValues } from '../SelectedValues'

import styles from '../Autocomplete.module.scss'

const createSingleOption = (label: string): AutocompleteDefaultOption => ({ id: label, label })

const initialOptions: AutocompleteDefaultOption[] = [
  createSingleOption('Option abc'),
  createSingleOption('Option bcd'),
  createSingleOption('Option cde'),
  createSingleOption('Option def'),
  createSingleOption('Option efg'),
]

export const WithoutSimpleSearch = () => {
  const [isMultiple, setIsMultiple] = useState(true)
  const [value, setValue] = useState<AutocompleteDefaultOption[]>([])
  const [options, setOptions] = useState<AutocompleteDefaultOption[]>(initialOptions)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchChange = async (event: CustomEvent<string>) => {
    const searchString = event.detail

    setIsLoading(true)

    await delay(1000)
    setOptions(initialOptions.filter(option => option.label.toLowerCase().includes(searchString.toLowerCase())))

    setIsLoading(false)
  }

  return (
    <div className={styles.item}>
      <WppButton
        onClick={() => {
          setIsMultiple(!isMultiple)
          setValue([])
        }}
      >
        {isMultiple ? 'Multiple' : 'Single'} mode
      </WppButton>
      <WppAutocomplete
        required
        loading={isLoading}
        labelConfig={{ text: `Server load without simple search in a ${isMultiple ? 'Multiple' : 'Single'} mode` }}
        placeholder="Type"
        value={value}
        onWppSearchValueChange={handleSearchChange}
        onWppChange={(e: CustomEvent) => setValue(e.detail.value as AutocompleteDefaultOption[])}
        multiple={isMultiple}
        showCreateNewElement
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
