import React, { useState } from 'react'
import { WppSlider, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

const SliderInputValidations = () => {
  const initiallySingleValue = 1
  const initiallyRangeValue = [3, 19]
  const [singleValue, setSingleValue] = useState(initiallySingleValue)
  const [rangeValue, setRangeValue] = useState(initiallyRangeValue)

  const handleSingleSliderChange = (event: CustomEvent) => {
    console.log('single slider data =>', event.detail)

    setSingleValue(event.detail.value)
  }

  const handleRangeSliderChange = (event: CustomEvent) => {
    console.log('range slider data =>', event.detail)

    setRangeValue(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <WppTypography type="2xl-heading">Slider Input Validations - 27305</WppTypography>
        <div className={styles.sliderExampleContainer}>
          <WppSlider
            type="range"
            value={rangeValue}
            min={1}
            max={199}
            step={2}
            continuous
            withInput
            onWppChange={handleRangeSliderChange}
            labelConfig={{
              text: 'Continuous range slider with inputs and stepped selection',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            required
          />
          <WppTypography className={styles.result}>
            Result of range slider: {rangeValue[0]} - {rangeValue[1]}
          </WppTypography>
        </div>

        <div style={{ marginTop: '100px' }} className={styles.sliderExampleContainer}>
          <WppSlider
            type="single"
            value={singleValue}
            min={1}
            max={199}
            step={2}
            continuous
            withInput
            onWppChange={handleSingleSliderChange}
            labelConfig={{
              text: 'Continuous single slider with inputs and stepped selection',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            required
          />
          <WppTypography className={styles.result}>Result of single slider: {singleValue}</WppTypography>
        </div>
      </div>
    </div>
  )
}

export default SliderInputValidations
