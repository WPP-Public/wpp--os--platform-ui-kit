```vue
<script setup lang="ts">
import { ref } from "vue";

import {
  WppCounter,
  WppTypography,
} from "@wppopen/components-library-vue";

const initiallyValue = 1;

const value = ref(initiallyValue);
const formattedNumber = ref(String(initiallyValue));

const handleCounterChange = (event: CustomEvent) => {
  const number = event.detail.value;
  const formattedCounterNumber = String(number).replace(
    /(.)(?=(\d{3})+$)/g,
    "$1 "
  );

  value.value = number;
  formattedNumber.value = formattedCounterNumber;
};
</script>

<template>
  <h3>Counter</h3>
  <WppCounter
    min="10"
    :value="value"
    @wppChange="handleCounterChange"
    class="counter"
    max="1000000"
    data-testid="hover-counter"
    :format="{
      searchValue: /(.)(?=(\d{3})+$)/g,
      replaceValue: '$1 ',
    }"
  />
  <WppTypography tag="span" type="m-strong" class="message">
    Our current value is: {{ formattedNumber }}
  </WppTypography>
</template>
```
