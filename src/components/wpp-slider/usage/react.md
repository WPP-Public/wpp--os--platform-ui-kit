```tsx
import React, { useState } from 'react'
import { WppSlider, WppTypography } from '@wppopen/components-library-react'

import styles from './SlidersVC.module.css'

export const SliderExample = () => {
  const initiallySingleValue = 1
  const initiallyRangeValue = [3, 5]
  const marks = [
    {
      label: 'low',
      value: 1,
    },
    {
      label: 'medium',
      value: 2,
    },
    {
      label: 'rare',
      value: 3,
    },
  ]

  const [singleValue, setSingleValue] = useState(initiallySingleValue)
  const [rangeValue, setRangeValue] = useState(initiallyRangeValue)

  const handleSingleSliderChange = (event: CustomEvent) => {
    setSingleValue(event.detail.value)
  }

  const handleRangeSliderChange = (event: CustomEvent) => {
    setRangeValue(event.detail.value)
  }

  return (
    <div>
      <div>
        <WppTypography>Range slider with generated marks</WppTypography>
        <WppSlider size="s" type="range" value={rangeValue} max={7} step={2} marks onWppChange={handleRangeSliderChange} />
        <WppTypography>
          Result of range slider: {rangeValue[0]} - {rangeValue[1]}
        </WppTypography>
      </div>

      <div>
        <WppTypography>Single slider with custom marks</WppTypography>
        <WppSlider size="s" value={singleValue} max={3} marks={marks} onWppChange={handleSingleSliderChange} />
        <WppTypography>Result of single slider: {singleValue}</WppTypography>
      </div>
    </div>
  )
}
```
