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

const PresetDatepickerSection = ({ format }: Props) => {
  const [parentValueSec, setParentValueSec] = useState<string[]>([])
  const [childValueSec, setChildValueSec] = useState<string[]>([])

  const handleDateChangeSec = (event: CustomEvent, el: 'child' | 'parent') => {
    if (el === 'child') {
      setChildValueSec(event.detail.formattedDate || '')
    } else {
      setParentValueSec(event.detail.formattedDate || '')

      if (MAPPED_FORMATS[format]) {
        console.log('Date', event)
        const startDate = moment(event.detail.date[0]).format(MAPPED_FORMATS[format])
        const endDate = moment(event.detail.date[1]).format(MAPPED_FORMATS[format])

        setChildValueSec([startDate, endDate])
      } else {
        console.log('Date', event)
        const startDate = moment(event.detail.date[0]).format(format.toUpperCase())
        const endDate = moment(event.detail.date[1]).format(format.toUpperCase())

        setChildValueSec([startDate, endDate])
      }
    }
  }

  const generatePreset = (days: number) => {
    const today = new Date()
    const endDate = today.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })

    const startDate = new Date(today)

    startDate.setDate(startDate.getDate() - days + 1)

    const formattedStartDate = startDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })

    return {
      label: `Last ${days} Days`,
      value: [formattedStartDate, endDate],
    }
  }

  const handleDateClear = () => {
    setParentValueSec([])
    setChildValueSec([])
  }

  return (
    <div className={styles.section}>
      <WppTypography className={styles.sectionTitle} type="xl-heading">
        Date format: {format}
      </WppTypography>

      <div className={styles.sectionContent}>
        <WppDatepicker
          range
          presets={[generatePreset(7), generatePreset(14), generatePreset(30), generatePreset(90)]}
          className={styles.datepicker}
          locale={{ dateFormat: format }}
          onWppChange={(event: CustomEvent) => handleDateChangeSec(event, 'parent')}
          onWppDateClear={handleDateClear}
          value={parentValueSec}
          toggleSelected
        />

        <WppDatepicker
          range
          presets={[generatePreset(7), generatePreset(14), generatePreset(30), generatePreset(90)]}
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

export default PresetDatepickerSection
