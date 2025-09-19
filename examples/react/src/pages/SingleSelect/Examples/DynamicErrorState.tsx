import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppTypography, WppSelect } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const list = SAMPLE_LIST_2

const DynamicErrorState = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'error' | 'warning' | undefined>('error')
  const [messageInTooltip, setMessageInTooltip] = useState(true)

  const handleClickTrigger = (type: 'warning' | 'error' | 'info') => {
    if (type === 'warning') {
      setMessage('Warning message')
      setMessageType('warning')
    } else if (type === 'error') {
      setMessage('Error message')
      setMessageType('error')
    } else {
      setMessage('Info message')
      setMessageType(undefined)
    }
  }

  const messageInTooltipToggle = () => {
    setMessageInTooltip(!messageInTooltip)
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 11: Dynamic Error State
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
          data-testid={`dynamic-state-${type}-select-m`}
          labelConfig={{
            text: 'Size M - dropdownWidth = "auto"',
          }}
          placeholder={'Choose option'}
          value={value}
          message={message}
          messageType={messageType}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          messageInTooltip={messageInTooltip}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`dynamic-state-${type}-select-s`}
            labelConfig={{
              text: 'Size S - dropdownWidth = "auto"',
            }}
            placeholder={'Choose option'}
            size="s"
            value={value}
            message={message}
            messageType={messageType}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
            messageInTooltip={messageInTooltip}
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={() => handleClickTrigger('error')}>
          Trigger error
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => handleClickTrigger('warning')}>
          Trigger warning
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => handleClickTrigger('info')}>
          Display info message
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={messageInTooltipToggle}>
          {messageInTooltip ? 'Hide' : 'Show'} message in tooltip
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default DynamicErrorState
