import React, { useState } from 'react'
import styles from '../../SingleSelect/SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = [
  { id: 1, label: 'Option with a really long label in order to test truncation.', value: 'long-text' },
  ...SAMPLE_LIST_2.slice(1),
]

const MaximumSelectedItems = () => {
  const [value, setValue] = useState(['long-text'])
  const [maximumSelectedItems, setMaximumSelectedItems] = useState<number | undefined>(undefined)

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 09: Testing `maximumSelectedItems` property
      </WppTypography>

      <div className={`${styles.selects} ${styles.truncationContainer}`}>
        <WppSelect
          withFolder
          required
          type="multiple"
          name="select-component"
          className={styles.selectItem}
          data-testid={`trunc-multiple-select-m`}
          labelConfig={{
            text: 'Size M - truncation',
          }}
          placeholder={'Choose option'}
          maximumSelectedItems={maximumSelectedItems}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change multiple`, e.detail)

            setValue(e.detail.value)
          }}
        />

        <WppSelect
          withFolder
          required
          type="multiple"
          name="select-component"
          className={styles.selectItem}
          data-testid={`trunc-multiple-select-s`}
          labelConfig={{
            text: 'Size S - truncation',
          }}
          placeholder={'Choose option'}
          maximumSelectedItems={maximumSelectedItems}
          size="s"
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change multiple`, e.detail)

            setValue(e.detail.value)
          }}
        />
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={() => setMaximumSelectedItems(9)}>
          Change to: 9 items
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setMaximumSelectedItems(5)}>
          Change to: 5 items
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setMaximumSelectedItems(3)}>
          Change to: 3 items
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setMaximumSelectedItems(undefined)}>
          Reset
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default MaximumSelectedItems
