import { WppPill } from '@platform-ui-kit/components-library-react'
import { AutocompleteDefaultOption } from '@platform-ui-kit/components-library'

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
