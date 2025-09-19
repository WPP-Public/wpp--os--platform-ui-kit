import { WppAutocomplete, WppListItem } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'
import { useMemo, useState } from 'react'
import { SelectedValues } from '../../Autocomplete/SelectedValues'

const fruitOptions = [
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

const AutocompleteDropdownIssues = () => {
  const [basicValue, setBasicValue] = useState<AutocompleteDefaultOption[]>([])
  const [searchValue, setSearchValue] = useState('')

  const handleSearchValueChange = (e: any) => {
    setSearchValue(e.detail)
  }

  const filteredList = useMemo(() => fruitOptions.filter(el => el.label.includes(searchValue)), [searchValue])

  return (
    <div>
      <div className={styles.examplesRow}>
        <WppAutocomplete
          required
          name="basic"
          labelConfig={{ text: 'Basic with initial values' }}
          placeholder="Select fruits"
          value={basicValue}
          onWppSearchValueChange={handleSearchValueChange}
          onWppChange={(e: CustomEvent) => setBasicValue(e.detail.value as AutocompleteDefaultOption[])}
          data-testid="basic-autocomplete"
          dropdownConfig={{ popperOptions: { strategy: 'fixed' } }}
          multiple
          infinite
          infiniteLastPage
          loading={false}
          type={'extended'}
        >
          {filteredList.map(option => (
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
    </div>
  )
}

export default AutocompleteDropdownIssues
