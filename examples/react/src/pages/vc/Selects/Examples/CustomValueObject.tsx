import { WppSelect } from '@platform-ui-kit/components-library-react'
import { SelectOption } from '@platform-ui-kit/components-library'
import React, { useState } from 'react'
import styles from '../SelectsVC.module.scss'
import { ResultsView } from '../../../Selects/ResultsView'

interface CustomValueObjectProps {
  initialValue?: SelectOption | SelectOption[] | null
  multiple?: boolean
}

const LIST = [
  {
    id: 1,
    label: 'House',
    value: {
      number: 234,
      name: 'House',
      additionalField: true,
    },
  },
  {
    id: 2,
    label: 'House',
    value: {
      number: 123,
      name: 'House',
      additionalField: true,
    },
  },
  {
    id: 3,
    label: 'Car',
    value: {
      number: 345,
      name: 'Car',
      additionalField: true,
    },
  },
  {
    id: 4,
    label: 'Apartment',
    value: {
      number: 332,
      name: 'Apartment',
      additionalField: true,
    },
  },
  {
    id: 5,
    label: 'Machine',
    value: {
      number: 423,
      name: 'Machine',
      additionalField: true,
    },
  },
  {
    id: 6,
    label: 'Garden',
    value: {
      number: 112,
      name: 'Garden',
      additionalField: true,
    },
  },
]

export const CustomValueObject: React.FC<CustomValueObjectProps> = ({ initialValue, multiple }) => {
  const [value, setValue] = useState(initialValue || [])

  return (
    <div className={styles.infiniteItem}>
      <WppSelect
        placeholder="Choose options"
        type={multiple ? 'multiple' : 'single'}
        required
        withFolder
        withSearch
        labelConfig={{
          text: `${multiple ? 'Multi' : 'Single'} Select with custom value object ${
            initialValue ? 'and initial value' : ''
          }`,
        }}
        list={LIST}
        onWppChange={(e: CustomEvent) => setValue(e.detail.value)}
        value={value}
      ></WppSelect>

      <ResultsView value={value as string[]} />
    </div>
  )
}
