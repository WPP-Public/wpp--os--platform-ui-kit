import { useState } from 'react'
import styles from './index.module.scss'
import { WppSlider } from '@platform-ui-kit/components-library-react'

const marks1 = [
  { label: 'Very Low', value: 1 },
  { label: 'Low', value: 2 },
  { label: 'Moderately', value: 3 },
  { label: 'High', value: 4 },
  { label: 'Very High', value: 5 },
  { label: 'Extremely High Performance', value: 6 },
]

const marks2 = [
  { label: 'Extremely High Performance', value: 1 },
  { label: 'Moderate', value: 2 },
  { label: 'Low', value: 3 },
]

const SliderLabelOverlapIssue = () => {
  const [singleValue1, setSingleValue1] = useState(1)
  const [singleValue2, setSingleValue2] = useState(1)

  const handleSingleSliderChange1 = (event: CustomEvent) => {
    console.log('single slider data =>', event.detail)
    setSingleValue1(event.detail.value)
  }

  const handleSingleSliderChange2 = (event: CustomEvent) => {
    console.log('single slider data =>', event.detail)
    setSingleValue2(event.detail.value)
  }

  return (
    <div className={styles.slider}>
      <h2>Slider Label Overlap Issue</h2>
      <div className={styles.sliderContainer}>
        <h5>Regular slider</h5>
        <WppSlider
          name="test-slider-overlap-1"
          value={singleValue1}
          onWppChange={handleSingleSliderChange1}
          min={1}
          max={6}
          step={1}
          marks={marks1}
          withInput={true}
          withValue={true}
          size="m"
        />
      </div>

      <div className={styles.sliderContainer}>
        {/* Slider with custom width via inline style */}
        <h5>Custom width slider</h5>
        <WppSlider
          name="test-slider-overlap-2"
          value={singleValue2}
          onWppChange={handleSingleSliderChange2}
          min={1}
          max={3}
          step={1}
          marks={marks2}
          withInput={true}
          withValue={true}
          size="m"
          style={{ '--wpp-slider-width': '500px' }}
        />
      </div>
    </div>
  )
}

export default SliderLabelOverlapIssue
