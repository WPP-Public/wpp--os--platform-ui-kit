import React, { useState } from 'react'
import styles from './index.module.scss'
import { WppSlider } from '@platform-ui-kit/components-library-react'

const initiallySingleValue = 1

const marks = [
  {
    value: 0.5,
    label: '50%',
  },
  {
    value: 0.6,
    label: '60%',
  },
  {
    value: 0.7,
    label: '70%',
  },
  {
    value: 0.8,
    label: '80%',
  },
  {
    value: 0.9,
    label: '90%',
  },
  {
    value: 1.0,
    label: '100%',
  },
  {
    value: 1.1,
    label: '110%',
  },
  {
    value: 1.2,
    label: '120%',
  },
  {
    value: 1.3,
    label: '130%',
  },
  {
    value: 1.4,
    label: '140%',
  },
  {
    value: 1.5,
    label: '150%',
  },
]

const SliderMarksNotVisible = () => {
  const [singleValue, setSingleValue] = useState(initiallySingleValue)

  const handleSingleSliderChange = (event: CustomEvent) => {
    console.log('single slider data =>', event.detail)

    setSingleValue(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <WppSlider
        className={styles.slider}
        value={singleValue}
        max={1.5}
        min={0.5}
        step={0.1}
        marks={marks}
        onWppChange={handleSingleSliderChange}
        labelConfig={{ text: 'Single slider with custom marks' }}
        required
      />
    </div>
  )
}

export default SliderMarksNotVisible
