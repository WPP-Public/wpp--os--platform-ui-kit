```tsx
import React, { useState } from 'react'
import { SearchDefaultOption } from '@platform-ui-kit/components-library'
import { WppSearch, WppListItem } from '@platform-ui-kit/components-library-react'

export const fruitOptions = [
  {
    id: 1,
    label: 'Mango',
  },
  {
    id: 2,
    label: 'Passion Fruit',
  },
  {
    id: 3,
    label: 'Kiwi',
  },
  {
    id: 4,
    label: 'Dragon Fruit',
  },
  {
    id: 5,
    label: 'Pineapple',
  },
  {
    id: 6,
    label: 'Сarambola',
  },
  {
    id: 7,
    label: 'Grape',
  },
  {
    id: 8,
    label: 'Orange',
  },
  {
    id: 9,
    label: 'Apple',
  },
  {
    id: 10,
    label: 'Grapefruit',
  },
  {
    id: 11,
    label: 'Watermelon',
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
    id: 14,
    label: 'Apricot',
  },
  {
    id: 15,
    label: 'Banana',
  },
  {
    id: 16,
    label: 'Melon',
  },
]

export const SearchVCPage = () => {
  const [basicValue, setBasicValue] = useState<SearchDefaultOption[]>([
    {
      id: 5,
      label: 'Pineapple',
    },
  ])

  return (
    <div data-testid="searches">
      <WppSearch
        required
        autoFocus
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        highlight={false}
        placeholder="Select fruits"
        value={basicValue}
        onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as SearchDefaultOption[])}
        simpleSearch
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppSearch>
    </div>
  )
}
```
