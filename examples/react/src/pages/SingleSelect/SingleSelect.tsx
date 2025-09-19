import React, { useState } from 'react'
import styles from './SingleSelect.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'

import { SAMPLE_LIST_2 } from './consts'
import ChangingValue from './Examples/ChangingValue'
import TestingSearch from './Examples/TestingSearch'
import DependableSelects from './Examples/DependableSelects'
import DropdownWidth from './Examples/DropdownWidth'
import TestingTruncation from './Examples/TestingTruncation'
import LoadingData from './Examples/LoadingData'
import TestingEvents from './Examples/TestingEvents'
import TestingMethods from './Examples/TestingMethods'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import PlacingSelectInModal from './Examples/PlacingSelectInModal'
import DynamicErrorState from './Examples/DynamicErrorState'

const SingleSelect = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <WppTypography type="2xl-heading">Default Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="default-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change single', e.detail)

              setValue(e.detail.value)
            }}
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="default-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            autoFocus
            size="s"
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log('On Change single', e.detail)

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
            className={styles.selectItem}
            data-testid="disabled-single-select-m"
            disabled
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="disabled-single-select-s"
            disabled
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
            size="s"
          />
        </div>
      </div>

      <div className={styles.section}>
        <WppTypography type="2xl-heading">Error Select</WppTypography>

        <div className={styles.content}>
          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="error-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            message="Error message"
            messageType="error"
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="error-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
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
            name="select-component"
            className={styles.selectItem}
            data-testid="error-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            message="Error message"
            messageType="error"
            messageInTooltip
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="error-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
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
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            message="Warning message"
            messageType="warning"
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
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
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            message="Warning message"
            messageType="warning"
            messageInTooltip
          />

          <WppSelect
            name="select-component"
            className={styles.selectItem}
            data-testid="warning-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            value={value}
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
            required
            name="select-component"
            className={styles.selectItem}
            data-testid="required-single-select-m"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size M',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            message={'Text message'}
            placeholder={'Choose option'}
            value={value}
          />

          <WppSelect
            required
            name="select-component"
            className={styles.selectItem}
            data-testid="required-single-select-s"
            list={SAMPLE_LIST_2}
            labelConfig={{
              text: 'Size S',
              icon: 'wpp-icon-info',
              description: 'Description',
            }}
            message={'Text message'}
            placeholder={'Choose option'}
            value={value}
            size="s"
          />
        </div>
      </div>

      <WppTypography type="3xl-heading">Scenarios</WppTypography>

      <div className={styles.scenarios}>
        <ChangingValue type="single" />
        <TestingSearch type="single" />
        <DependableSelects type="single" />
        <DropdownWidth type="single" />
        <TestingTruncation type="single" />
        <LoadingData type="single" />
        <TestingEvents type="single" />
        <TestingMethods type="single" />
        <PlacingSelectInModal type="single" />
        <DynamicErrorState type="single" />
      </div>

      <WppTypography type="3xl-heading">Performance testing: rendering 200 selects</WppTypography>

      <div className={styles.selectsContainer}>
        {Array.from({ length: 200 }, (_, i) => (
          <WppSelect key={i} className={styles.selectItem} list={SAMPLE_LIST_2} value={value} />
        ))}
      </div>
    </div>
  )
}

export default SingleSelect
