import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppTypography, WppSelect } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = SAMPLE_LIST_2

const DropdownWidth = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const [selectWidth, setSelectWidth] = useState('300px')

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 04: Testing Dropdown Width
      </WppTypography>

      <WppTypography className={styles.subTitle} type="l-body">
        The width of the dropdown should be at least as big as the width of the anchor element.
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          style={{ width: selectWidth }}
          data-testid={`dropdown-auto-${type}-select-m`}
          labelConfig={{
            text: 'Size M - dropdownWidth = "auto"',
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
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            style={{ width: selectWidth }}
            data-testid={`dropdown-auto-${type}-select-s`}
            labelConfig={{
              text: 'Size S - dropdownWidth = "auto"',
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

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          style={{ width: selectWidth }}
          data-testid={`dropdown-500-${type}-select-m`}
          labelConfig={{
            text: 'Size M - dropdownWidth = "500px"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          dropdownWidth="500px"
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            style={{ width: selectWidth }}
            data-testid={`dropdown-500-${type}-select-s`}
            labelConfig={{
              text: 'Size S - dropdownWidth = "500px"',
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
            dropdownWidth="500px"
          />
        )}
      </div>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          style={{ width: selectWidth }}
          data-testid={`dropdown-150-single-${type}-m`}
          labelConfig={{
            text: 'Size M - dropdownWidth = "150px"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          dropdownWidth="150px"
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            style={{ width: selectWidth }}
            data-testid={`dropdown-150-${type}-select-s`}
            labelConfig={{
              text: 'Size S - dropdownWidth = "150px"',
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
            dropdownWidth="150px"
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('300px')}>
          Change width to: "300px"
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('200px')}>
          Change width to: "200px"
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setSelectWidth('100px')}>
          Change width to: "100px"
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default DropdownWidth
