import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = [
  { id: 1, label: 'Option with a really long label in order to test truncation.', value: 'long-text' },
  ...SAMPLE_LIST_2.slice(1),
]

const TestingTruncation = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? ['long-text'] : 'long-text')
  const [selectWidth, setSelectWidth] = useState('300px')

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 05: Testing truncation
      </WppTypography>

      <div className={`${styles.selects} ${styles.truncationContainer}`}>
        <WppSelect
          withFolder
          required
          type={type}
          name="select-component"
          className={styles.selectItem}
          style={{ width: selectWidth }}
          data-testid={`trunc-${type}-select-m`}
          labelConfig={{
            text: 'Size M - truncation',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            required
            type={type}
            name="select-component"
            className={styles.selectItem}
            style={{ width: selectWidth }}
            data-testid={`trunc-${type}-select-s`}
            labelConfig={{
              text: 'Size S - truncation',
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('100%')}>
          Change width to: "100%"
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('400px')}>
          Change width to: "400px"
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('300px')}>
          Change width to: "300px"
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('100px')}>
          Change width to: "100px"
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default TestingTruncation
