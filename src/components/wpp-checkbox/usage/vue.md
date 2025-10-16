```vue

<script setup lang="ts">
import { ref } from "vue";

import { WppCheckbox } from '@wppopen/components-library-vue'

const isChecked = ref(false)

const handleSubmit = (ev) => console.log("submit ev: ", ev);
</script>

<template>
  <WppCheckbox />

  <WppCheckbox
    :checked="isChecked"
    disabled="false"
    indeterminate="false"
    :labelConfig="{ text: 'Option' }"
    name="options"
    @wppChange="({ detail: { checked } }) => isChecked.value = checked"
  />

  <form @submit="handleSubmit">
    <WppCheckbox
      :checked="isChecked"
      :labelConfig="{ text: 'Option' }"
      name="options"
      @wppChange="({ detail: { checked } }) => isChecked.value = checked"
    />
  </form>
</template>

```
