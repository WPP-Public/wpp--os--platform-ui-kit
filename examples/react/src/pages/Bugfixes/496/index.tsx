import { WppAutocomplete, WppListItem } from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'
import styles from './index.module.scss'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { fruitOptions } from '../../vc/Autocomplete/AutocompleteVC'

const staticSuggestions = [
  { id: 1, label: 'Avacado' },
  { id: 2, label: 'Blueberry' },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Durian' },
  { id: 5, label: 'Elderberry' },
]

export const AutocompleteImprovements = () => {
  const [basicValue, setBasicValue] = useState<AutocompleteDefaultOption[]>([])
  const [basicValue2, setBasicValue2] = useState<AutocompleteDefaultOption[]>([])
  const [basicValue3, setBasicValue3] = useState<AutocompleteDefaultOption[]>([])
  const [basicValue4, setBasicValue4] = useState<AutocompleteDefaultOption[]>([
    {
      id: 5,
      label: 'Elderberry',
    },
    {
      id: 15,
      label: 'Banana',
    },
    {
      id: 12,
      label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
    },
    {
      id: 13,
      label: 'Pear',
    },
    {
      id: 10,
      label: 'Grapefruit',
    },
    {
      id: 6,
      label: 'Сarambola',
    },
  ])

  return (
    <div className={styles.wrapper}>
      <WppAutocomplete
        labelConfig={{
          text: 'Multiple Autocomplete',
        }}
        placeholder="Select fruits"
        value={basicValue}
        onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as AutocompleteDefaultOption[])}
        multiple
        simpleSearch
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        labelConfig={{
          text: 'Multiple Autocomplete with Suggestions',
        }}
        placeholder="Select fruits"
        suggestions={staticSuggestions}
        value={basicValue2}
        onWppChange={(e: CustomEvent) => setBasicValue2(e.detail.value as AutocompleteDefaultOption[])}
        multiple
        simpleSearch
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        labelConfig={{
          text: 'Multiple Autocomplete without Simple Search',
        }}
        placeholder="Select fruits"
        value={basicValue3}
        onWppChange={(e: CustomEvent) => setBasicValue3(e.detail.value as AutocompleteDefaultOption[])}
        multiple
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        labelConfig={{
          text: 'Multiple Autocomplete with default values',
        }}
        placeholder="Select fruits"
        value={basicValue4}
        onWppChange={(e: CustomEvent) => setBasicValue4(e.detail.value as AutocompleteDefaultOption[])}
        multiple
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>
    </div>
  )
}
