import React, { useState } from 'react'
import { WppButton, WppSlider, WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './SlidersVC.module.scss'

export const SlidersVCPage = () => {
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

  const [inputWidth, setInputWidth] = useState<`${number}px` | undefined>(undefined)

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
      <div className={styles.container} data-testid="sliders">
        <div className={styles.range}>
          <h2>Range Slider - Size M</h2>
          <div className={styles.slider}>
            <WppSlider
              type="range"
              value={rangeValue}
              name="slider-1"
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
              name="slider-2"
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
              name="slider-3"
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
              max={1500}
              name="slider-4"
              step={1}
              marks
              onWppChange={handleRangeSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
              }}
              required
              continuous
              withInput
              maskOptions={[
                {
                  precision: 2,
                  decimalSeparator: '.',
                  prefix: '$',
                },
                {
                  precision: 2,
                  decimalSeparator: '.',
                  postfix: '%',
                },
              ]}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              type="range"
              value={rangeValue}
              max={1500}
              step={1}
              marks
              onWppChange={handleRangeSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ","',
              }}
              required
              continuous
              withInput
              maskOptions={[
                {
                  decimalSeparator: '.',
                  thousandSeparator: ',',
                  prefix: '$',
                },
                {
                  decimalSeparator: '.',
                  thousandSeparator: ',',
                  postfix: '%',
                },
              ]}
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
              value={rangeValue}
              marks
              min={3}
              max={10}
              onWppChange={handleRangeSliderChange}
              labelConfig={{ text: 'Range slider min' }}
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
        </div>

        <div className={styles.single}>
          <h2>Single Slider - Size M</h2>
          <div className={styles.slider}>
            <WppSlider
              value={singleValue}
              max={3}
              marks={marks}
              onWppChange={handleSingleSliderChange}
              labelConfig={{ text: 'Single slider with custom marks' }}
              required
              name="Single slider with custom marks"
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
              name="Single slider with continuous selection"
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
              max={1500}
              marks
              onWppChange={handleSingleSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
              }}
              required
              continuous
              withInput
              maskOptions={{
                precision: 2,
                decimalSeparator: '.',
                prefix: '$',
              }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              value={singleValue}
              max={1500}
              marks
              onWppChange={handleSingleSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ","',
              }}
              required
              continuous
              withInput
              maskOptions={{
                decimalSeparator: '.',
                thousandSeparator: ',',
                prefix: '$',
              }}
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

          <div className={styles.slider}>
            <WppSlider
              value={1}
              min={1}
              onWppChange={handleSingleSliderChange}
              marks={marks}
              labelConfig={{ text: 'value = min' }}
              withValue
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.container} data-testid="sliders">
        <div className={styles.range}>
          <h2>Range Slider - Size S</h2>
          <div className={styles.slider}>
            <WppSlider
              size="s"
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
              size="s"
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
              size="s"
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
              size="s"
              value={rangeValue}
              max={1500}
              step={1}
              marks
              onWppChange={handleRangeSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
              }}
              required
              continuous
              withInput
              maskOptions={[
                {
                  precision: 2,
                  decimalSeparator: '.',
                  prefix: '$',
                },
                {
                  precision: 2,
                  decimalSeparator: '.',
                  postfix: '%',
                },
              ]}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              type="range"
              size="s"
              value={rangeValue}
              max={1500}
              step={1}
              marks
              onWppChange={handleRangeSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ","',
              }}
              required
              continuous
              withInput
              maskOptions={[
                {
                  decimalSeparator: '.',
                  thousandSeparator: ',',
                  prefix: '$',
                },
                {
                  decimalSeparator: '.',
                  thousandSeparator: ',',
                  postfix: '%',
                },
              ]}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
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
              size="s"
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
              size="s"
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
              size="s"
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
              size="s"
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
              size="s"
              type="range"
              value={rangeValue}
              marks
              min={3}
              max={10}
              onWppChange={handleRangeSliderChange}
              labelConfig={{ text: 'Range slider min' }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
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
              size="s"
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
        </div>

        <div className={styles.single}>
          <h2>Single Slider - Size S</h2>
          <div className={styles.slider}>
            <WppSlider
              size="s"
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
              size="s"
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
              size="s"
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
              max={1500}
              marks
              onWppChange={handleSingleSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
              }}
              required
              continuous
              withInput
              maskOptions={{
                precision: 2,
                decimalSeparator: '.',
                prefix: '$',
              }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              value={singleValue}
              max={1500}
              marks
              onWppChange={handleSingleSliderChange}
              labelConfig={{
                text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ","',
              }}
              required
              continuous
              withInput
              maskOptions={{
                decimalSeparator: '.',
                thousandSeparator: ',',
                prefix: '$',
              }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
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
              size="s"
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
              size="s"
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
              size="s"
              value={2}
              max={3}
              onWppChange={handleSingleSliderChange}
              required
              labelConfig={{ text: 'Single slider w/o marks' }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
              value={3}
              max={3}
              onWppChange={handleSingleSliderChange}
              marks={marks}
              labelConfig={{ text: 'Single slider max value' }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
              value={1}
              max={3}
              onWppChange={handleSingleSliderChange}
              marks={marks}
              labelConfig={{ text: 'Single slider min value' }}
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
              value={3}
              max={3}
              onWppChange={handleSingleSliderChange}
              marks={marks}
              labelConfig={{ text: 'value = max' }}
              withValue
              required
            />
          </div>

          <div className={styles.slider}>
            <WppSlider
              size="s"
              value={1}
              min={1}
              onWppChange={handleSingleSliderChange}
              marks={marks}
              labelConfig={{ text: 'value = min' }}
              withValue
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.containerForInputWidth}>
        <div className={styles.sliders}>
          <h3>Sliders with inputs with different input widths:</h3>

          <WppSlider
            value={singleValue}
            className={styles.sliderItem}
            inputWidth={inputWidth}
            max={1500}
            marks
            onWppChange={handleSingleSliderChange}
            labelConfig={{
              text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
            }}
            required
            continuous
            withInput
            maskOptions={{
              precision: 2,
              decimalSeparator: '.',
              prefix: '$',
            }}
          />

          <WppSlider
            type="range"
            size="s"
            value={rangeValue}
            className={styles.sliderItem}
            inputWidth={inputWidth}
            max={1500}
            step={1}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{
              text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
            }}
            required
            continuous
            withInput
            maskOptions={[
              {
                precision: 2,
                decimalSeparator: '.',
                prefix: '$',
              },
              {
                precision: 2,
                decimalSeparator: '.',
                postfix: '%',
              },
            ]}
          />

          <WppSlider
            type="range"
            size="s"
            value={rangeValue}
            className={styles.sliderItem}
            inputWidth={inputWidth}
            max={1500}
            step={0.25}
            marks
            onWppChange={handleRangeSliderChange}
            labelConfig={{
              text: 'With inputs that have mask options. Step is: 0.25. Up to 2 decimals are allowed. Also has thousand separator as: ","',
            }}
            required
            continuous
            withInput
            maskOptions={[
              {
                precision: 2,
                thousandSeparator: ',',
                decimalSeparator: '.',
                prefix: '$',
              },
              {
                precision: 2,
                thousandSeparator: ',',
                decimalSeparator: '.',
                postfix: '%',
              },
            ]}
          />
        </div>

        <div className={styles.controls}>
          <WppTypography type="xl-heading">Change Width</WppTypography>
          <WppButton className={styles.btn} onClick={() => setInputWidth('100px')}>
            to 100px
          </WppButton>
          <WppButton className={styles.btn} onClick={() => setInputWidth('200px')}>
            to 200px
          </WppButton>
          <WppButton className={styles.btn} onClick={() => setInputWidth(undefined)}>
            to Default
          </WppButton>
        </div>
      </div>
    </>
  )
}
