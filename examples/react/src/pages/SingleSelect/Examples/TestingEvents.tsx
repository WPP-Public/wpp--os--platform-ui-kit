import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SAMPLE_LIST_COMBINED, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const TestingEvents = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const list = type === 'combined' ? SAMPLE_LIST_COMBINED : SAMPLE_LIST_2

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 07: Testing events
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`events-${type}-select-m`}
          labelConfig={{
            text: 'Size M',
          }}
          dropdownConfig={{
            onShow: () => console.log('Called onShow'),
            onHide: () => console.log('Called onHide'),
            onShown: () => console.log('Called onShown'),
            onHidden: () => console.log('Called onHidden'),
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          onWppFocus={(e: CustomEvent) => console.log('Focus event', e)}
          onWppBlur={(e: CustomEvent) => console.log('Blur event', e)}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`events-${type}-select-s`}
            labelConfig={{
              text: 'Size S',
            }}
            dropdownConfig={{
              onShow: () => console.log('Called onShow'),
              onHide: () => console.log('Called onHide'),
              onShown: () => console.log('Called onShown'),
              onHidden: () => console.log('Called onHidden'),
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
            onWppFocus={(e: CustomEvent) => console.log('Focus event', e)}
            onWppBlur={(e: CustomEvent) => console.log('Blur event', e)}
          />
        )}
      </div>

      <WppDivider />
    </div>
  )
}

export default TestingEvents
