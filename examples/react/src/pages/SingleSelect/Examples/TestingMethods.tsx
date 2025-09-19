import React, { useRef, useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SAMPLE_LIST_COMBINED, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const TestingMethods = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const selectRefSizeM = useRef<HTMLWppSelectElement | null>(null)
  const selectRefSizeS = useRef<HTMLWppSelectElement | null>(null)
  const list = type === 'combined' ? SAMPLE_LIST_COMBINED : SAMPLE_LIST_2

  const handleOpenSizeM = () => {
    if (selectRefSizeM.current) {
      selectRefSizeM.current.setFocus()
    }
  }

  const handleOpenSizeS = () => {
    if (selectRefSizeS.current) {
      selectRefSizeS.current.setFocus()
    }
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 08: Testing methods
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          ref={selectRefSizeM}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`methods-focus-${type}-select-m`}
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
          dropdownConfig={{
            onShow: () => console.log('Called onShow'),
            onHide: () => console.log('Called onHide'),
            onShown: () => console.log('Called onShown'),
            onHidden: () => console.log('Called onHidden'),
          }}
          onWppFocus={(e: CustomEvent) => console.log('Focus event', e)}
          onWppBlur={(e: CustomEvent) => console.log('Blur event', e)}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            ref={selectRefSizeS}
            name="select-component"
            className={styles.selectItem}
            data-testid={`methods-focus-${type}-select-s`}
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
            dropdownConfig={{
              onShow: () => console.log('Called onShow'),
              onHide: () => console.log('Called onHide'),
              onShown: () => console.log('Called onShown'),
              onHidden: () => console.log('Called onHidden'),
            }}
            onWppFocus={(e: CustomEvent) => console.log('Focus event', e)}
            onWppBlur={(e: CustomEvent) => console.log('Blur event', e)}
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={handleOpenSizeM}>
          Open select size M
        </WppButton>
        {type !== 'text' && (
          <WppButton className={styles.buttonItem} onClick={handleOpenSizeS}>
            Open select size S
          </WppButton>
        )}
      </div>

      <WppDivider />
    </div>
  )
}

export default TestingMethods
