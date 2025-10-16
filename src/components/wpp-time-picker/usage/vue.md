```vue
<script setup>
import { ref } from 'vue'
import { WppButton, WppTimePicker, WppTypography } from '@wppopen/components-library-vue'

const value = ref('')
const minutesInterval = ref(15)

const handleWppChange = event => {
  console.log(event)
  value.value = event.detail.timeFormat
}

const handleWppClear = event => {
  console.log(event)
  value.value = event.detail.timeFormat
}
</script>

<template>
  <div className="container">
    <WppTypography className="title" type="xl-heading"> Time Picker </WppTypography>

    <WppTimePicker
      :value="value"
      :labelConfig="{ text: 'Label' }"
      required
      :minutesInterval="minutesInterval"
      @wppChange="handleWppChange"
      @wppClear="handleWppClear"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
}

.title {
  margin-bottom: 20px;
}
</style>
```
