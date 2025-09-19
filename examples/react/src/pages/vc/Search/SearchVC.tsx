import React, { useState } from 'react'
import { SearchDefaultOption } from '@platform-ui-kit/components-library'
import { WppSearch, WppListItem } from '@platform-ui-kit/components-library-react'
import styles from './SearchVC.module.scss'
import {
  SearchChangeEventDetail,
  WppSearchCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'

export const fruitOptions = [
  { id: 1, label: 'Mango' },
  { id: 2, label: 'Passion Fruit' },
  { id: 3, label: 'Kiwi' },
  { id: 4, label: 'Dragon Fruit' },
  { id: 5, label: 'Pineapple' },
  { id: 6, label: 'Сarambola' },
  { id: 7, label: 'Grape' },
  { id: 8, label: 'Orange' },
  { id: 9, label: 'Apple' },
  { id: 10, label: 'Grapefruit' },
  { id: 11, label: 'Watermelon' },
  {
    id: 12,
    label: 'All the fruits in the world mixed into a SUPER FRUIT MIX! Trimmed to the edge of the universe -_-',
  },
  { id: 13, label: 'Pear' },
  { id: 14, label: 'Apricot' },
  { id: 15, label: 'Banana' },
  { id: 16, label: 'Melon' },
]

export const SearchVCPage = () => {
  const [basicValue, setBasicValue] = useState<SearchDefaultOption[]>([{ id: 5, label: 'Pineapple' }])

  const handleSearchChange = (event: WppSearchCustomEvent<SearchChangeEventDetail>) => {
    console.log('Event name: ', event.detail.name)
    setBasicValue(event.detail.value as SearchDefaultOption[])
  }

  return (
    <div className={styles.container} data-testid="search-container">
      <div className={styles.searches}>
        <h2>Size M</h2>
        <div className={styles.regularContainer} data-testid="regular-search-container">
          <WppSearch
            required
            autoFocus
            name="regular-search"
            className={styles.item}
            labelConfig={{ text: 'Regular Search' }}
            placeholder="Select fruits"
            value={basicValue}
            onWppChange={handleSearchChange}
            simpleSearch
            data-testid="regular-search"
          >
            {fruitOptions.map(option => (
              <WppListItem key={option.id} value={option} label={option.label}>
                <p slot="label">{option.label}</p>
              </WppListItem>
            ))}
          </WppSearch>
        </div>

        <WppSearch
          required
          className={styles.item}
          labelConfig={{ text: 'Disabled Search' }}
          disabled
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          required
          className={styles.item}
          labelConfig={{
            text: 'Search with custom dropdown width',
          }}
          highlight={false}
          dropdownWidth="200px"
          placeholder="Select fruits"
          value={basicValue}
          name="custom-dropdown-width-search"
          onWppChange={handleSearchChange}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          required
          className={styles.item}
          labelConfig={{
            text: 'Search with highlight',
          }}
          placeholder="Select fruits"
          value={basicValue}
          name="highlight-search"
          onWppChange={handleSearchChange}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          required
          className={styles.item}
          labelConfig={{
            text: 'Loading Search',
          }}
          loading
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          className={styles.item}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Custom Label Search',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }}
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          className={styles.item}
          labelConfig={{
            text: 'Open dropdown on click',
          }}
          openDropdownOnClick
          required
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
          data-testid="dropdown-open-on-click-search"
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          className={styles.item}
          labelConfig={{ text: 'simpleSearch = false' }}
          required
          placeholder="Select fruits"
          value={basicValue}
          data-testid="simple-search-off-search"
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          className={styles.item}
          labelConfig={{ text: 'showOptions = false' }}
          showOptions={false}
          required
          placeholder="Select fruits"
          value={basicValue}
          data-testid="show-options-off-search"
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          className={styles.item}
          labelConfig={{ text: 'Search with error message' }}
          messageType="error"
          message="Error message"
          required
          placeholder="Select fruits"
          value={basicValue}
        />

        <WppSearch
          className={styles.item}
          labelConfig={{ text: 'Search with warning message' }}
          messageType="warning"
          message="Warning message"
          required
          placeholder="Select fruits"
          value={basicValue}
        />
      </div>

      <div className={styles.searches}>
        <h2>Size S</h2>
        <WppSearch
          size="s"
          required
          className={styles.item}
          labelConfig={{ text: 'Regular Search' }}
          highlight={false}
          placeholder="Select fruits"
          value={basicValue}
          name="regular-search"
          onWppChange={handleSearchChange}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          required
          className={styles.item}
          labelConfig={{ text: 'Disabled Search' }}
          disabled
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          size="s"
          required
          className={styles.item}
          labelConfig={{
            text: 'Search with custom dropdown width',
          }}
          highlight={false}
          dropdownWidth="200px"
          placeholder="Select fruits"
          value={basicValue}
          name="custom-dropdown-width-search"
          onWppChange={handleSearchChange}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          required
          className={styles.item}
          labelConfig={{ text: 'Search with highlight' }}
          placeholder="Select fruits"
          value={basicValue}
          name="highlight-search"
          onWppChange={handleSearchChange}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          required
          className={styles.item}
          labelConfig={{ text: 'Loading Search' }}
          loading
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Custom Label Search',
            description: 'Description',
            locales: { optional: 'Optional' },
          }}
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
        />

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{ text: 'Open dropdown on click' }}
          openDropdownOnClick
          required
          placeholder="Select fruits"
          value={basicValue}
          simpleSearch
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{ text: 'simpleSearch = false' }}
          openDropdownOnClick
          required
          placeholder="Select fruits"
          value={basicValue}
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{ text: 'showOptions = false' }}
          showOptions={false}
          required
          placeholder="Select fruits"
          value={basicValue}
        >
          {fruitOptions.map(option => (
            <WppListItem key={option.id} value={option} label={option.label}>
              <p slot="label">{option.label}</p>
            </WppListItem>
          ))}
        </WppSearch>

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{ text: 'Search with error message' }}
          messageType="error"
          message="Error message"
          required
          placeholder="Select fruits"
          value={basicValue}
        />

        <WppSearch
          size="s"
          className={styles.item}
          labelConfig={{ text: 'Search with warning message' }}
          messageType="warning"
          message="Warning message"
          required
          placeholder="Select fruits"
          value={basicValue}
        />
      </div>
    </div>
  )
}
