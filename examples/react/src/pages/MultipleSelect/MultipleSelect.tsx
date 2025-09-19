import React, { useState } from 'react'
import styles from '../SingleSelect/SingleSelect.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'

import { SAMPLE_LIST_1, SAMPLE_LIST_MULTIPLE } from '../SingleSelect/consts'
import ChangingValue from '../SingleSelect/Examples/ChangingValue'
import TestingSearch from '../SingleSelect/Examples/TestingSearch'
import DependableSelects from '../SingleSelect/Examples/DependableSelects'
import DropdownWidth from '../SingleSelect/Examples/DropdownWidth'
import TestingTruncation from '../SingleSelect/Examples/TestingTruncation'
import LoadingData from '../SingleSelect/Examples/LoadingData'
import TestingEvents from '../SingleSelect/Examples/TestingEvents'
import TestingMethods from '../SingleSelect/Examples/TestingMethods'
import MaximumSelectedItems from './Examples/MaximumSelectedItems'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import PlacingSelectInModal from '../SingleSelect/Examples/PlacingSelectInModal'
import DynamicErrorState from '../SingleSelect/Examples/DynamicErrorState'

const MultipleSelect = () => {
  const [multipleValue, setMultipleValue] = useState<string[]>([])

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <WppTypography type="2xl-heading">Default Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="default-multiple-select-m"
            type="multiple"
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change multiple', e.detail)

              setMultipleValue(e.detail.value)
            }}
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="default-multiple-select-s"
            type="multiple"
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change multiple', e.detail)

              setMultipleValue(e.detail.value)
            }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Disabled Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="disabled-multiple-select-m"
            disabled
            type="multiple"
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="disabled-multiple-select-s"
            disabled
            type="multiple"
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            size="s"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Error Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="error-multiple-select-m"
            type="multiple"
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            message="Error message"
            messageType="error"
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="error-multiple-select-s"
            type="multiple"
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            size="s"
            message="Error message"
            messageType="error"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Error Select with Tooltip Error Message</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="error-multiple-select-m"
            type="multiple"
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            message="Error message"
            messageType="error"
            messageInTooltip
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="error-multiple-select-s"
            type="multiple"
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            list={SAMPLE_LIST_MULTIPLE}
            autoFocus
            size="s"
            message="Error message"
            messageType="error"
            messageInTooltip
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Warning Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-multiple-select-m"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            message="Warning message"
            messageType="warning"
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-multiple-select-s"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            size="s"
            message="Warning message"
            messageType="warning"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Warning Select with Tooltip Warning Message</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-multiple-select-m"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            message="Warning message"
            messageType="warning"
            messageInTooltip
          />

          <WppSelect
            withFolder
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-multiple-select-s"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={multipleValue}
            size="s"
            message="Warning message"
            messageType="warning"
            messageInTooltip
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Required Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            withFolder
            required
            name="select-component"
            className={styles.selectItem}
            data-testid="required-multiple-select-m"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size M',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            message={'Text message'}
            placeholder={'Choose option'}
            value={multipleValue}
          />

          <WppSelect
            withFolder
            required
            name="select-component"
            className={styles.selectItem}
            data-testid="required-multiple-select-s"
            type="multiple"
            list={SAMPLE_LIST_MULTIPLE}
            labelConfig={{
              text: 'Size S',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            message={'Text message'}
            placeholder={'Choose option'}
            value={multipleValue}
            size="s"
          />
        </div>
      </div>

      <WppTypography type="3xl-heading">Scenarios</WppTypography>

      <div className={styles.scenarios}>
        <ChangingValue type="multiple" />
        <TestingSearch type="multiple" />
        <DependableSelects type="multiple" />
        <DropdownWidth type="multiple" />
        <TestingTruncation type="multiple" />
        <LoadingData type="multiple" />
        <TestingEvents type="multiple" />
        <TestingMethods type="multiple" />
        <MaximumSelectedItems />
        <PlacingSelectInModal type="multiple" />
        <DynamicErrorState type="multiple" />
      </div>

      <div className={styles.selectsContainer}>
        {Array.from({ length: 200 }, (_, i) => (
          <WppSelect
            withFolder
            key={i}
            type="multiple"
            className={styles.selectItem}
            list={SAMPLE_LIST_1}
            value={multipleValue}
          />
        ))}
      </div>
    </div>
  )
}

export default MultipleSelect
