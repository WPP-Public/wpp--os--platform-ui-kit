import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SAMPLE_LIST_COMBINED, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const ChangingValue = ({ type, ...rest }: { type: SelectTypes }) => {
  const [value, setValue] = useState<any>(type === 'multiple' ? [] : '')
  const list = type === 'combined' ? SAMPLE_LIST_COMBINED : SAMPLE_LIST_2

  const setValueOnClick = () => {
    if (type === 'multiple') {
      setValue(['option-2'])
    } else if (type === 'combined') {
      setValue('usd')
    } else {
      setValue('option-2')
    }
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 01: Changing Value Programatically
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          required
          type={type}
          name="select-component"
          className={styles.selectItem}
          data-testid={`ch-value-${type}-select-m`}
          labelConfig={{
            text: 'Size M',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          {...rest}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            required
            type={type}
            name="select-component"
            className={styles.selectItem}
            data-testid={`ch-value-${type}-select-s`}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
            {...rest}
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={setValueOnClick}>
          Set Value to: {type === 'combined' ? 'usd' : 'option-2'}
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setValue(type === 'multiple' ? [] : '')}>
          Reset Value
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default ChangingValue
