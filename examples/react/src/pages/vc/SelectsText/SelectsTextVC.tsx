import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './SelectsTextVC.module.scss'
import { useState } from 'react'

export const SelectsTextVCPage = () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('cars')
  const [value3, setValue3] = useState('')

  return (
    <div>
      <div className={styles.text} data-testid="text-selects">
        <h2>Text Selects</h2>
        <WppTypography type="s-body" className={styles.label}>
          Regular Text Select
        </WppTypography>
        <WppSelect
          type="text"
          onWppChange={(event: CustomEvent) => setValue1(event.detail.value)}
          value={value1}
          list={[
            {
              value: 'car',
              label: 'Car',
            },
            {
              value: 'house',
              label: 'House',
              disabled: true,
            },
            {
              value: 'apartment',
              label: 'Apartment',
            },
          ]}
        ></WppSelect>

        <WppTypography type="s-body" className={styles.label}>
          Disabled Text Select
        </WppTypography>
        <WppSelect type="text" placeholder="Choose an Option" disabled />

        <WppTypography type="s-body" className={styles.label}>
          Text Select with Options
        </WppTypography>
        <WppSelect
          type="text"
          onWppChange={(event: CustomEvent) => setValue2(event.detail.value)}
          placeholder="Choose an option"
          value={value2}
          data-testid="text-select-with-items"
          list={[
            {
              value: 'house',
              label: 'House with plus',
              slots: [
                {
                  type: 'wpp-icon-plus',
                  props: {
                    slot: 'left',
                  },
                },
              ],
            },
            {
              value: 'food',
              label: 'Food again',
            },
            {
              value: 'disabled-item',
              label: 'Disabled item',
              disabled: true,
            },
            {
              value: 'cars',
              label: 'Cars more',
              slots: [
                {
                  type: 'wpp-icon-success',
                  props: {
                    slot: 'right',
                  },
                },
              ],
            },
            {
              value: 'text-plus',
              label: 'TextPlus',
              slots: [
                {
                  type: 'wpp-icon-plus',
                  props: {
                    slot: 'left',
                  },
                },
              ],
            },
            {
              value: 'just-text',
              label: 'text',
            },
          ]}
        ></WppSelect>

        <WppTypography type="s-body" className={styles.label}>
          Text Select with Auto Focus
        </WppTypography>
        <WppSelect
          type="text"
          onWppChange={(event: CustomEvent) => setValue3(event.detail.value)}
          placeholder="Choose an option"
          autoFocus
          data-testid="focus-text-select"
          value={value3}
          list={[
            {
              value: 'house',
              label: 'House with plus',
              slots: [
                {
                  type: 'wpp-icon-plus',
                  props: {
                    slot: 'left',
                  },
                },
              ],
            },
          ]}
        ></WppSelect>
      </div>
    </div>
  )
}
