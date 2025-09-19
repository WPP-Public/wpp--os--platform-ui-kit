import React from 'react'
import styles from './index.module.scss'
import { WppTypography } from '@platform-ui-kit/components-library-react'
import SingleDatepickerSection from './components/SingleDatepickerSection'
import RangeDatepickerSection from './components/RangeDatepickerSection'
import PresetDatepickerSection from './components/PresetDatepickerSection'
import StaticDatepickerSection from './components/StaticDatepickerSection'

const DependableDatepickers = () => (
  <div className={styles.container}>
    <WppTypography className={styles.title} type="3xl-heading">
      We need to test dependable datepickers for different date formats
    </WppTypography>

    <div>
      <WppTypography className={styles.subTitle} type="2xl-heading">
        Single Datepickers
      </WppTypography>

      <SingleDatepickerSection format={'dd/MM/yyyy'} />

      <SingleDatepickerSection format={'MM/dd/yyyy'} />

      <SingleDatepickerSection format={'yyyy/MM/dd'} />

      <SingleDatepickerSection format={'MM/yyyy/dd'} />

      <SingleDatepickerSection format={'dd-MM-yyyy'} />

      <SingleDatepickerSection format={'EEEE dd MMM, yyyy'} />

      <SingleDatepickerSection format={'yyyy, MMM dd EEEE'} />

      <SingleDatepickerSection format={'MMM dd EEEE yyyy'} />

      <SingleDatepickerSection format={'MMMM dd yyyy'} />

      <WppTypography className={styles.subTitle} type="2xl-heading">
        Range Datepickers
      </WppTypography>

      <RangeDatepickerSection format={'dd/MM/yyyy'} />

      <RangeDatepickerSection format={'MM/dd/yyyy'} />

      <WppTypography className={styles.subTitle} type="2xl-heading">
        Datepickers with Presets
      </WppTypography>

      <PresetDatepickerSection format={'dd/MM/yyyy'} />

      <WppTypography className={styles.subTitle} type="2xl-heading">
        Static Datepickers
      </WppTypography>

      <StaticDatepickerSection format={'dd/MM/yyyy'} />

      <StaticDatepickerSection format={'MM/dd/yyyy'} />
    </div>
  </div>
)

export default DependableDatepickers
