import React, { useState } from 'react'
import styles from '../index.module.scss'
import { WppDatepicker, WppTypography } from '@platform-ui-kit/components-library-react'
import moment from 'moment'

interface Props {
  format: string
}

const MAPPED_FORMATS: { [key: string]: string } = {
  'EEEE dd MMM, yyyy': 'dddd DD MMM, YYYY',
  'yyyy, MMM dd EEEE': 'YYYY, MMM DD dddd',
  'MMM dd EEEE yyyy': 'MMM DD dddd YYYY',
  'MMMM dd yyyy': 'MMMM DD YYYY',
}

const StaticDatepickerSection = ({ format }: Props) => {
  const [parentValueSec, setParentValueSec] = useState<string>('')
  const [childValueSec, setChildValueSec] = useState<string>('')

  const handleDateChangeSec = (event: CustomEvent, el: 'child' | 'parent') => {
    if (el === 'child') {
      setChildValueSec(event.detail.formattedDate || '')
    } else {
      setParentValueSec(event.detail.formattedDate || '')

      if (MAPPED_FORMATS[format]) {
        setChildValueSec(event.detail.date ? moment(event.detail.date).format(MAPPED_FORMATS[format]) : '')
      } else {
        setChildValueSec(event.detail.date ? moment(event.detail.date).format(format.toUpperCase()) : '')
      }
    }
  }

  return (
    <div className={styles.section}>
      <WppTypography className={styles.sectionTitle} type="xl-heading">
        Date format: {format}
      </WppTypography>

      <div className={styles.sectionContent}>
        <WppDatepicker
          static
          className={styles.datepicker}
          locale={{ dateFormat: format }}
          onWppChange={(event: CustomEvent) => handleDateChangeSec(event, 'parent')}
          value={parentValueSec}
          toggleSelected
        />

        <WppDatepicker
          static
          className={styles.datepicker}
          locale={{ dateFormat: format }}
          onWppChange={(event: CustomEvent) => handleDateChangeSec(event, 'child')}
          value={childValueSec}
          toggleSelected
        />
      </div>
    </div>
  )
}

export default StaticDatepickerSection
