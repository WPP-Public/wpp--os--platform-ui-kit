import { WppSlider, WppTypography } from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'
import styles from './index.module.scss'

const marks = [
  {
    label: '0.5',
    value: 0.5,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '1.5',
    value: 1.5,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '2.5',
    value: 2.5,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '3.5',
    value: 3.5,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '4.5',
    value: 4.5,
  },
]

const ClickSlider = () => {
  const [singleValue, setSingleValue] = useState(1.5)
  const [rangeValue, setRangeValue] = useState([1, 1.5])

  const handleRangeSliderChange = (event: CustomEvent) => {
    // console.log('range slider data =>', event.detail)

    setRangeValue(event.detail.value)
  }

  const handleSingleSliderChange = (event: CustomEvent) => {
    // console.log('single slider data =>', event.detail)

    setSingleValue(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <h2>Continuous Range Slider</h2>
        <WppSlider
          type="range"
          value={rangeValue}
          min={0.5}
          max={4.5}
          step={0.5}
          continuous
          marks={marks}
          onWppChange={handleRangeSliderChange}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Continuous range slider with step=0.5 selection',
          }}
          required
        />
        <WppTypography className={styles.result}>
          Result of range slider: {rangeValue[0]} - {rangeValue[1]}
        </WppTypography>
      </div>

      <div className={styles.slider}>
        <h2>Continuous Single Slider</h2>
        <WppSlider
          type="single"
          value={singleValue}
          min={0.5}
          max={4.5}
          step={0.5}
          continuous
          marks={marks}
          onWppChange={handleSingleSliderChange}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Continuous single slider with step=0.5 selection',
          }}
          required
        />
        <WppTypography className={styles.result}>Result of single slider: {singleValue}</WppTypography>
      </div>

      <div className={styles.slider}>
        <h2>Range Slider</h2>
        <WppSlider
          type="range"
          value={rangeValue}
          min={0.5}
          max={4.5}
          step={0.5}
          marks={marks}
          onWppChange={handleRangeSliderChange}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Range slider with step=0.5 selection',
          }}
          required
        />
        <WppTypography className={styles.result}>
          Result of range slider: {rangeValue[0]} - {rangeValue[1]}
        </WppTypography>
      </div>

      <div className={styles.slider}>
        <h2>Single Slider</h2>
        <WppSlider
          type="single"
          value={singleValue}
          min={0.5}
          max={4.5}
          step={0.5}
          marks={marks}
          onWppChange={handleSingleSliderChange}
          labelConfig={{
            icon: 'wpp-icon-info',
            text: 'Single slider with step=0.5 selection',
          }}
          required
        />
        <WppTypography className={styles.result}>Result of single slider: {singleValue}</WppTypography>
      </div>
    </div>
  )
}

export default ClickSlider
