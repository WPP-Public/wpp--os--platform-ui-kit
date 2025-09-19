import { useState } from 'react'
import { WppButton, WppSideModal, WppSlider, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'

const SideModalPage = () => {
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
    console.log('single slider data =>', event.detail)
    setSingleValue(event.detail.value)
  }

  const handleRangeSliderChange = (event: CustomEvent) => {
    console.log('range slider data =>', event.detail)

    setRangeValue(event.detail.value)
  }

  return (
    <>
      <h3 slot="header">Page Title</h3>
      <div slot="body">
        <WppSlider type="single" continuous={true} marks={true} value={30} min={10} max={1000} step={50} />

        <h2>Range Slider</h2>
        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            step={2}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Range slider with stepped selection',
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

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            step={1}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Range slider with continuous selection' }}
            required
            continuous
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            step={1}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'With continuous selection and input' }}
            required
            continuous
            withInput
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            step={1}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'With stepped selection and input' }}
            required
            withInput
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            step={1}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Disabled input' }}
            required
            continuous
            withInput
            disabled
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Disabled Range slider' }}
            disabled
            required
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={7}
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Range slider w/o marks' }}
            required
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={rangeValue}
            max={5}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Range slider max' }}
            step={0.5}
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={[9, 9]}
            marks
            max={9}
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Range slider with single max value' }}
            required
            withValue
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            type="range"
            value={[1, 1]}
            marks
            max={9}
            onWppChange={handleRangeSliderChange}
            labelConfig={{ text: 'Range slider with single min value' }}
            required
            withValue
          />
        </div>

        <h2>Single Slider</h2>
        <div className={styles.slider}>
          <WppSlider
            value={singleValue}
            max={3}
            marks={marks}
            onWppChange={handleSingleSliderChange}
            labelConfig={{ text: 'Single slider with custom marks' }}
            required
          />
          <WppTypography className={styles.result}>Result of single slider: {singleValue}</WppTypography>
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={singleValue}
            max={3}
            marks
            onWppChange={handleSingleSliderChange}
            labelConfig={{ text: 'Single slider with continuous selection' }}
            required
            continuous
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={singleValue}
            max={3}
            marks
            onWppChange={handleSingleSliderChange}
            labelConfig={{ text: 'With continuous selection and input' }}
            required
            continuous
            withInput
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={singleValue}
            max={3}
            marks
            onWppChange={handleSingleSliderChange}
            labelConfig={{ text: 'With stepped selection and input' }}
            required
            withInput
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={2}
            max={3}
            marks
            onWppChange={handleSingleSliderChange}
            labelConfig={{ text: 'Disabled input' }}
            required
            continuous
            withInput
            disabled
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={singleValue}
            max={3}
            marks={marks}
            onWppChange={handleSingleSliderChange}
            disabled
            required
            labelConfig={{ text: 'Disabled Single slider' }}
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={2}
            max={3}
            onWppChange={handleSingleSliderChange}
            required
            labelConfig={{ text: 'Single slider w/o marks' }}
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={3}
            max={3}
            onWppChange={handleSingleSliderChange}
            marks={marks}
            labelConfig={{ text: 'Single slider max value' }}
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={1}
            max={3}
            onWppChange={handleSingleSliderChange}
            marks={marks}
            labelConfig={{ text: 'Single slider min value' }}
          />
        </div>

        <div className={styles.slider}>
          <WppSlider
            value={3}
            max={3}
            onWppChange={handleSingleSliderChange}
            marks={marks}
            labelConfig={{ text: 'value = max' }}
            withValue
            required
          />
        </div>
      </div>
    </>
  )
}

export const SliderMarkInSideModal = () => {
  const [isSideModalWithoutControlsOpen, setSideModalWithoutControlsStatus] = useState(false)

  const handleCloseSideModalWithoutControls = () => setSideModalWithoutControlsStatus(false)
  const handleOpenSideModalWithoutControls = () => setSideModalWithoutControlsStatus(true)

  return (
    <>
      <div className={styles.container}>
        <WppButton onClick={handleOpenSideModalWithoutControls} data-testid="side-modal-without-controls">
          Side Modal with Slider
        </WppButton>
        <WppSideModal
          open={isSideModalWithoutControlsOpen}
          onWppSideModalClose={handleCloseSideModalWithoutControls}
          onWppSideModalOpen={handleOpenSideModalWithoutControls}
          size="l"
        >
          <SideModalPage />
        </WppSideModal>
      </div>
    </>
  )
}
