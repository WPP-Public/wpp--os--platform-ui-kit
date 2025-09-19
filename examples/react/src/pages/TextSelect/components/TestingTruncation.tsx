import React, { useState } from 'react'
import styles from '../../SingleSelect/SingleSelect.module.scss'
import { WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = [
  { id: 1, label: 'Option with a really long label in order to test truncation.', value: 'long-text' },
  ...SAMPLE_LIST_2.slice(1),
]

const TestingTruncation = () => {
  const [value, setValue] = useState('long-text')

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 05: Testing truncation
      </WppTypography>

      <div className={`${styles.selects} ${styles.truncationContainer}`}>
        <WppSelect
          withFolder
          required
          type={'text'}
          name="select-component"
          className={styles.selectItem}
          data-testid={`trunc-text-select-m`}
          labelConfig={{
            text: 'Size M - truncation',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log('On Change text', e.detail)

            setValue(e.detail.value)
          }}
        />

        <WppSelect
          withFolder
          required
          type={'text'}
          name="select-component"
          className={styles.selectItem}
          data-testid="trunc-text-select-s"
          labelConfig={{
            text: 'Size S - truncation',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log('On Change text', e.detail)

            setValue(e.detail.value)
          }}
          truncate={false}
        />
      </div>

      <WppDivider />
    </div>
  )
}

export default TestingTruncation
