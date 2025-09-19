import React, { useState } from 'react'
import styles from '../SingleSelect/SingleSelect.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

import { SAMPLE_LIST_2 } from '../SingleSelect/consts'
import ChangingValue from '../SingleSelect/Examples/ChangingValue'
import DependableSelects from '../SingleSelect/Examples/DependableSelects'
import TestingTruncation from './components/TestingTruncation'
import DropdownWidth from './components/DropdownWidth'
import LoadingData from '../SingleSelect/Examples/LoadingData'
import TestingEvents from '../SingleSelect/Examples/TestingEvents'
import TestingMethods from '../SingleSelect/Examples/TestingMethods'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'

const TextSelect = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <WppTypography type="2xl-heading">Default Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            type="text"
            name="select-component"
            className={styles.selectItem}
            data-testid="default-text-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Default',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change text', e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Disabled Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            type="text"
            name="select-component"
            className={styles.selectItem}
            disabled
            data-testid="disabled-text-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Disabled',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change text', e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
      </div>

      <WppTypography type="3xl-heading">Scenarios</WppTypography>

      <div className={styles.scenarios}>
        <ChangingValue type="text" />
        <DependableSelects type="text" />
        <DropdownWidth />
        <TestingTruncation />
        <LoadingData type="text" />
        <TestingEvents type="text" />
        <TestingMethods type="text" />
      </div>
    </div>
  )
}

export default TextSelect
