```tsx
import React, { useState } from 'react'
import styles from './TimePicker.module.scss'
import { WppButton, WppTimePicker, WppTypography } from '@platform-ui-kit/components-library-react'

const TimePicker = () => {
  const [value, setValue] = useState<string>('')
  const [minutesInterval, setMinutesInterval] = useState<1 | 5 | 10 | 15>(15)

  return (
    <div className={styles.container}>
      <WppTypography type="xl-heading">Time Picker</WppTypography>
      <WppTimePicker
        value={value}
        labelConfig={{ text: 'Label' }}
        required
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
    </div>
  )
}
```
