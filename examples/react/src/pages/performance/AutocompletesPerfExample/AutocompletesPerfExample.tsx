import { WppAutocomplete, WppListItem } from '@platform-ui-kit/components-library-react'
import styles from './AutocompletesPerfExample.module.scss'
import React from 'react'
import { fruitOptions } from './const'

export const AutocompletesPerfExample = () => (
  <div className={styles.container}>
    <div className={styles.row}>
      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
        data-testid="single-autocomplete"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>
    </div>

    <div className={styles.row}>
      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>
    </div>

    <div className={styles.row}>
      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>
    </div>

    <div className={styles.row}>
      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>

      <WppAutocomplete
        className={styles.item}
        required
        labelConfig={{
          text: 'Single Autocomplete with search',
        }}
        placeholder="Select fruits"
      >
        {fruitOptions.map(option => (
          <WppListItem key={option.id} value={option} label={option.label}>
            <p slot="label">{option.label}</p>
          </WppListItem>
        ))}
      </WppAutocomplete>
    </div>
  </div>
)
