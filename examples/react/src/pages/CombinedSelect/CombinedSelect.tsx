import React, { useState } from 'react'
import styles from '../SingleSelect/SingleSelect.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import TestingEvents from '../SingleSelect/Examples/TestingEvents'
import TestingMethods from '../SingleSelect/Examples/TestingMethods'
import ChangingValue from '../SingleSelect/Examples/ChangingValue'
import { SAMPLE_LIST_COMBINED } from '../SingleSelect/consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import DynamicErrorState from '../SingleSelect/Examples/DynamicErrorState'

const CombinedSelect = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <WppTypography type="2xl-heading">Default Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="default-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="default-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Disabled Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="disabled-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            disabled
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="disabled-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            disabled
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Error Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="error-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Error message"
            messageType="error"
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="error-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Error message"
            messageType="error"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Error Select with Tooltip Error Message</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="error-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Error message"
            messageType="error"
            messageInTooltip
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="error-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
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
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="warning-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Warning message"
            messageType="warning"
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="warning-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Warning message"
            messageType="warning"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Warning Select with Tooltip Warning Message</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="warning-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Warning message"
            messageType="warning"
            messageInTooltip
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="warning-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
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
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="required-combined-select-m"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size M',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            placeholder={'Choose option'}
            value={value}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Text message"
          />

          <WppSelect
            name="select-component"
            type="combined"
            className={styles.selectItem}
            data-testid="required-combined-select-s"
            list={SAMPLE_LIST_COMBINED}
            labelConfig={{
              text: 'Size S',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change combined', e.detail)

              setValue(e.detail.value)
            }}
            message="Text message"
          />
        </div>
      </div>

      <WppTypography type="3xl-heading">Scenarios</WppTypography>

      <div className={styles.scenarios}>
        <ChangingValue type="combined" />
        <TestingEvents type="combined" />
        <TestingMethods type="combined" />
        <DynamicErrorState type="combined" />
      </div>
    </div>
  )
}

export default CombinedSelect
