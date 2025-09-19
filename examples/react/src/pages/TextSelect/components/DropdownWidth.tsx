import React, { useState } from 'react'
import styles from '../../SingleSelect/SingleSelect.module.scss'
import { WppDivider, WppTypography, WppSelect } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = SAMPLE_LIST_2

const DropdownWidth = () => {
  const [value, setValue] = useState('')

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 04: Testing Dropdown Width
      </WppTypography>

      <WppTypography className={styles.subTitle} type="l-body">
        The width of the dropdown should be at least as big as the width of the anchor element.
      </WppTypography>

      <div className={styles.selects}>
        <WppTypography className={styles.selectsTitle} type="m-body">
          Width of dropdown = "auto". Default Option.
        </WppTypography>

        <WppSelect
          withFolder
          type={'text'}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={'dropdown-auto-text-select-m'}
          labelConfig={{
            text: 'Size M - dropdownWidth = "auto"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log('On Change text', e.detail)

            setValue(e.detail.value)
          }}
        />
      </div>

      <div className={styles.selects}>
        <WppTypography className={styles.selectsTitle} type="m-body">
          Width of dropdown = "500px".
        </WppTypography>
        <WppSelect
          withFolder
          type={'text'}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={'dropdown-500-text-select-m'}
          labelConfig={{
            text: 'Size M - dropdownWidth = "500px"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log('On Change text', e.detail)

            setValue(e.detail.value)
          }}
          dropdownWidth="500px"
        />
      </div>

      <div className={styles.selects}>
        <WppTypography className={styles.selectsTitle} type="m-body">
          Width of dropdown = "150px".
        </WppTypography>

        <WppSelect
          withFolder
          type={'text'}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`dropdown-150-single-text-m`}
          labelConfig={{
            text: 'Size M - dropdownWidth = "150px"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log('On Change text', e.detail)

            setValue(e.detail.value)
          }}
          dropdownWidth="150px"
        />
      </div>

      <WppDivider />
    </div>
  )
}

export default DropdownWidth
