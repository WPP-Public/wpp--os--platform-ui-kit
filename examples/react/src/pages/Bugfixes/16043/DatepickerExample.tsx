import { useState, FC } from 'react'
import { WppDatepicker, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './DatepickerExample.module.scss'

interface DatepickerExampleProps {
  dateFormat: string
  value: string
  rangeValue: string[]
}

export const DatepickerExample: FC<DatepickerExampleProps> = props => {
  const [value, setValue] = useState(props.value)
  const [rangeValue, setRangeValue] = useState(props.rangeValue)

  return (
    <div className={styles.example}>
      <WppTypography type="xl-heading">Datepicker Format "{props.dateFormat}"</WppTypography>
      <div className={styles.content}>
        <div className={styles.datepicker}>
          <WppDatepicker
            range={false}
            required={true}
            value={value}
            labelConfig={{ text: `` }}
            locale={{
              dateFormat: props.dateFormat,
            }}
            placeholder={props.dateFormat}
            onWppChange={e => {
              console.log('Value changed:', e.detail)
              setValue(e.detail.formattedDate as string)
            }}
            onWppDateClear={() => {
              setValue('')
            }}
          />
          <WppTypography>Init value: {props.value}</WppTypography>
        </div>

        <div className={styles.datepicker}>
          <WppDatepicker
            locale={{
              dateFormat: props.dateFormat,
            }}
            range
            value={rangeValue}
            onWppChange={e => {
              console.log('Value changed:', e.detail)
              setRangeValue(e.detail.formattedDate as string[])
            }}
            onWppDateClear={() => {
              setRangeValue(['', ''])
            }}
          />
          <WppTypography>Init value: {JSON.stringify(props.rangeValue)}</WppTypography>
        </div>
      </div>
    </div>
  )
}
