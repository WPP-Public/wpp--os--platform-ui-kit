```vue
<script setup lang="ts">
import { ref } from "vue";

import {
  WppSlider,
  WppTypography,
} from "@wppopen/components-library-vue";

const initiallySingleValue = 1;
const initiallyRangeValue = [3, 5];
const marks = [
  {
    label: "low",
    value: 1,
  },
  {
    label: "medium",
    value: 2,
  },
  {
    label: "rare",
    value: 3,
  },
];

const singleValue = ref(initiallySingleValue);
const rangeValue = ref(initiallyRangeValue);

const handleSingleSliderChange = (event: CustomEvent) => {
  console.log("single slider data =>", event.detail);

  singleValue.value = event.detail.value;
};

const handleRangeSliderChange = (event: CustomEvent) => {
  console.log("range slider data =>", event.detail);

  rangeValue.value = event.detail.value;
};
</script>

<template>
  <div class="range">
    <h2>Range Slider</h2>
    <div class="slider">
      <WppSlider
        size="s"
        type="range"
        :value="rangeValue"
        max="7"
        step="2"
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
  </div>

  <div class="single">
    <h2>Single Slider</h2>
    <div class="slider">
      <WppSlider
        size="s"
        :value="singleValue"
        max="3"
        :marks="marks"
        @wppChange="handleSingleSliderChange"
        :labelConfig="{ text: 'Single slider with custom marks' }"
        required
      />
      <WppTypography class="result">
        Result of single slider: {{ singleValue }}
      </WppTypography>
    </div>
  </div>
</template>
```
