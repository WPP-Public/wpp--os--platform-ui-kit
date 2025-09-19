import React, { useState } from 'react'
import styles from './TimePicker.module.scss'
import { WppButton, WppTimePicker, WppTypography } from '@platform-ui-kit/components-library-react'

const TimePicker = () => {
  const [value, setValue] = useState<string>('')
  const [minutesInterval, setMinutesInterval] = useState<1 | 5 | 10 | 15>(15)
  const [width, setWidth] = useState<string | undefined>(undefined)

  return (
    <div id="time-picker-container" className={styles.container}>
      <div className={styles.sections}>
        <div className={styles.section}>
          <WppTypography className={styles.title} type="xl-heading">
            Size M
          </WppTypography>
          <WppTimePicker
            value={value}
            labelConfig={{ text: 'Label' }}
            required
            width={width}
            className={styles.item}
            name="time-picker"
            minutesInterval={minutesInterval}
            onWppChange={(event: any) => {
              console.log(event)
              setValue(event.detail.timeFormat)
            }}
            onWppClear={(event: any) => {
              console.log(event)
              setValue(event.detail.timeFormat)
            }}
          ></WppTimePicker>

          <WppTimePicker
            className={styles.item}
            width={width}
            disabled
            name="time-picker"
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>

          <WppTimePicker
            className={styles.item}
            width={width}
            message="Normal message"
            labelConfig={{ text: 'Label' }}
            required
            name="time-picker"
          ></WppTimePicker>
          <WppTimePicker
            className={styles.item}
            width={width}
            message="Error message"
            messageType="error"
            name="time-picker"
            minutesInterval={minutesInterval}
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>
          <WppTimePicker
            className={styles.item}
            width={width}
            name="time-picker"
            message="Warning message"
            messageType="warning"
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>
        </div>

        <div className={styles.section}>
          <WppTypography className={styles.title} type="xl-heading">
            Size S
          </WppTypography>
          <WppTimePicker
            value={value}
            labelConfig={{ text: 'Label' }}
            required
            width={width}
            className={styles.item}
            name="time-picker"
            size="s"
            minutesInterval={minutesInterval}
            onWppChange={(event: any) => {
              console.log(event)
              setValue(event.detail.timeFormat)
            }}
            onWppClear={(event: any) => {
              console.log(event)
              setValue(event.detail.timeFormat)
            }}
          ></WppTimePicker>
          <WppTimePicker
            size="s"
            className={styles.item}
            width={width}
            name="time-picker"
            disabled
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>

          <WppTimePicker
            size="s"
            className={styles.item}
            width={width}
            message="Normal message"
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>
          <WppTimePicker
            size="s"
            className={styles.item}
            width={width}
            name="time-picker"
            message="Error message"
            messageType="error"
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>
          <WppTimePicker
            size="s"
            className={styles.item}
            width={width}
            message="Warning message"
            name="time-picker"
            messageType="warning"
            labelConfig={{ text: 'Label' }}
            required
          ></WppTimePicker>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.actionsSection}>
          <WppButton className={styles.item} onClick={() => setValue('07:30')}>
            Set value to: 07:30
          </WppButton>

          <WppButton className={styles.item} onClick={() => setValue('07:45')}>
            Set value to: 07:45
          </WppButton>

          <WppButton className={styles.item} onClick={() => setValue('07:25')}>
            Set value to: 07:25
          </WppButton>

          <WppButton className={styles.item} onClick={() => setWidth(width === undefined ? '100%' : undefined)}>
            Set width to: {width === undefined ? '100%' : 'reset to default'}
          </WppButton>
        </div>
        <div className={styles.actionsSection}>
          <WppButton className={styles.item} onClick={() => setMinutesInterval(1)}>
            Set minutesInterval to: 1
          </WppButton>

          <WppButton className={styles.item} onClick={() => setMinutesInterval(5)}>
            Set minutesInterval to: 5
          </WppButton>

          <WppButton className={styles.item} onClick={() => setMinutesInterval(10)}>
            Set minutesInterval to: 10
          </WppButton>

          <WppButton className={styles.item} onClick={() => setMinutesInterval(15)}>
            Set minutesInterval to: 15
          </WppButton>
        </div>
      </div>
    </div>
  )
}

export default TimePicker
