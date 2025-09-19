<script setup lang="ts">
import { ref } from 'vue'

import { WppSlider, WppTypography, WppButton } from '@platform-ui-kit/components-library-vue'

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

const singleValue = ref(initiallySingleValue)
const rangeValue = ref(initiallyRangeValue)
const inputWidth = ref<undefined | `${number}px`>(undefined)

const handleSingleSliderChange = (event: CustomEvent) => {
  console.log('single slider data =>', event.detail)

  singleValue.value = event.detail.value
}

const handleRangeSliderChange = (event: CustomEvent) => {
  console.log('range slider data =>', event.detail)

  rangeValue.value = event.detail.value
}

const setInputWidth = (value: `${number}px` | undefined) => {
  inputWidth.value = value
}
</script>

<template>
  <div class="container" data-testid="sliders">
    <div class="range">
      <h2>Range Slider - Size M</h2>
      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          :step="2"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            icon: 'wpp-icon-info',
            text: 'Range slider with stepped selection',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }"
          required
        />
        <WppTypography class="result">
          Result of range slider: {{ rangeValue[0] }} - {{ rangeValue[1] }}
        </WppTypography>
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with continuous selection' }"
          required
          continuous
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'With continuous selection and input' }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :maskOptions="[
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
          ]"
          :max="1500"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :maskOptions="[
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
          ]"
          :max="1500"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ,',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'With stepped selection and input' }"
          required
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Disabled input' }"
          required
          continuous
          withInput
          disabled
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Disabled Range slider' }"
          disabled
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="7"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider w/o marks' }"
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          :max="5"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider max' }"
          :step="0.5"
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="rangeValue"
          marks
          :min="3"
          :max="10"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider min' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="[9, 9]"
          marks
          :max="9"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with single max value' }"
          required
          withValue
        />
      </div>

      <div class="slider">
        <WppSlider
          type="range"
          :value="[1, 1]"
          marks
          :max="9"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with single min value' }"
          required
          withValue
        />
      </div>
    </div>

    <div class="single">
      <h2>Single Slider - Size M</h2>
      <div class="slider">
        <WppSlider
          :value="singleValue"
          :max="3"
          :marks="marks"
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Single slider with custom marks' }"
          required
        />
        <WppTypography class="result">Result of single slider: {{ singleValue }}</WppTypography>
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Single slider with continuous selection' }"
          required
          continuous
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'With continuous selection and input' }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :maskOptions="{
            precision: 2,
            decimalSeparator: '.',
            prefix: '$',
          }"
          :max="1500"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :maskOptions="{
            decimalSeparator: '.',
            thousandSeparator: ',',
            prefix: '$',
          }"
          :max="1500"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ,',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'With stepped selection and input' }"
          required
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="2"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Disabled input' }"
          required
          continuous
          withInput
          disabled
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="singleValue"
          :max="3"
          :marks="marks"
          @wppChange="handleSingleSliderChange"
          disabled
          required
          :labelConfig="{ text: 'Disabled Single slider' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="2"
          :max="3"
          @wppChange="handleSingleSliderChange"
          required
          :labelConfig="{ text: 'Single slider w/o marks' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="3"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'Single slider max value' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="1"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'Single slider min value' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="3"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'value = max' }"
          withValue
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          :value="1"
          :min="1"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'value = min' }"
          withValue
          required
        />
      </div>
    </div>
  </div>
  <div class="container" data-testid="sliders">
    <div class="range">
      <h2>Range Slider - Size S</h2>
      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          :step="2"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            icon: 'wpp-icon-info',
            text: 'Range slider with stepped selection',
            description: 'Description',
            locales: {
              optional: 'Optional',
            },
          }"
          required
        />
        <WppTypography class="result">
          Result of range slider: {{ rangeValue[0] }} - {{ rangeValue[1] }}
        </WppTypography>
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with continuous selection' }"
          required
          continuous
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'With continuous selection and input' }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :maskOptions="[
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
          ]"
          :max="1500"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :maskOptions="[
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
          ]"
          :max="1500"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ,',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'With stepped selection and input' }"
          required
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          :step="1"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Disabled input' }"
          required
          continuous
          withInput
          disabled
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Disabled Range slider' }"
          disabled
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="7"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider w/o marks' }"
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          :max="5"
          marks
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider max' }"
          :step="0.5"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="rangeValue"
          marks
          :min="3"
          :max="10"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider min' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="[9, 9]"
          marks
          :max="9"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with single max value' }"
          required
          withValue
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          type="range"
          :value="[1, 1]"
          marks
          :max="9"
          @wppChange="handleRangeSliderChange"
          :labelConfig="{ text: 'Range slider with single min value' }"
          required
          withValue
        />
      </div>
    </div>

    <div class="single">
      <h2>Single Slider - Size S</h2>
      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :max="3"
          :marks="marks"
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Single slider with custom marks' }"
          required
        />
        <WppTypography class="result">Result of single slider: {{ singleValue }}</WppTypography>
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Single slider with continuous selection' }"
          required
          continuous
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'With continuous selection and input' }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :maskOptions="{
            precision: 2,
            decimalSeparator: '.',
            prefix: '$',
          }"
          :max="1500"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :maskOptions="{
            decimalSeparator: '.',
            thousandSeparator: ',',
            prefix: '$',
          }"
          :max="1500"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{
            text: 'With inputs that have mask options. No decimals are allowed. Also has as thousand separator: ,',
          }"
          required
          continuous
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'With stepped selection and input' }"
          required
          withInput
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="2"
          :max="3"
          marks
          @wppChange="handleSingleSliderChange"
          :labelConfig="{ text: 'Disabled input' }"
          required
          continuous
          withInput
          disabled
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="singleValue"
          :max="3"
          :marks="marks"
          @wppChange="handleSingleSliderChange"
          disabled
          required
          :labelConfig="{ text: 'Disabled Single slider' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="2"
          :max="3"
          @wppChange="handleSingleSliderChange"
          required
          :labelConfig="{ text: 'Single slider w/o marks' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="3"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'Single slider max value' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="1"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'Single slider min value' }"
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="3"
          :max="3"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'value = max' }"
          withValue
          required
        />
      </div>

      <div class="slider">
        <WppSlider
          size="s"
          :value="1"
          :min="1"
          @wppChange="handleSingleSliderChange"
          :marks="marks"
          :labelConfig="{ text: 'value = min' }"
          withValue
          required
        />
      </div>
    </div>
  </div>

  <div class="containerForInputWidth">
    <div class="sliders">
      <h3>Sliders with inputs with different input widths:</h3>

      <WppSlider
        :value="singleValue"
        class="sliderItem"
        :inputWidth="inputWidth"
        :max="1500"
        marks
        @wppChange="
          {
            handleSingleSliderChange
          }
        "
        :labelConfig="{
          text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
        }"
        required
        continuous
        withInput
        :maskOptions="{
          precision: 2,
          decimalSeparator: '.',
          prefix: '$',
        }"
      />

      <WppSlider
        type="range"
        size="s"
        :value="rangeValue"
        :inputWidth="inputWidth"
        :max="1500"
        :step="1"
        marks
        @wppChange="
          {
            handleRangeSliderChange
          }
        "
        :labelConfig="{
          text: 'With inputs that have mask options. Up to 2 decimals are allowed, but they will be converted to closest integer.',
        }"
        required
        continuous
        withInput
        :maskOptions="[
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
        ]"
      />

      <WppSlider
        type="range"
        size="s"
        :value="rangeValue"
        :inputWidth="inputWidth"
        :max="1500"
        :step="0.5"
        marks
        @wppChange="
          {
            handleRangeSliderChange
          }
        "
        :labelConfig="{
          text: 'With inputs that have mask options. Step is: 0.25. Up to 2 decimals are allowed. Also has thousand separator as: ,',
        }"
        required
        continuous
        withInput
        :maskOptions="[
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
        ]"
      />
    </div>

    <div class="controls">
      <WppTypography type="xl-heading">Change Width</WppTypography>
      <WppButton class="btn" @click="setInputWidth('100px')"> to 100px </WppButton>
      <WppButton class="btn" @click="setInputWidth('200px')"> to 200px </WppButton>
      <WppButton class="btn" @click="setInputWidth(undefined)"> to Default </WppButton>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 1700px;
  padding-left: 20px;
}

.slider {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.title {
  margin-bottom: 10px;
}

.result {
  margin-top: 40px;
}

.range {
  margin-right: 30px;
  width: 600px;
}

.single {
  width: 600px;
}

.containerForInputWidth {
  padding-left: 20px;
  padding-bottom: 100px;
  display: flex;
}

.sliders {
  width: 800px;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
}

.sliderItem {
  margin: 20px 0;
}

.controls {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 20px;
}
</style>
