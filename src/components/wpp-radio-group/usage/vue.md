```vue
<script setup lang="ts">
import type { RadioGroupChangeEvent, RadioGroupValue } from '@wppopen/components-library'
import { WppButton, WppRadio, WppRadioGroup, WppTypography } from '@wppopen/components-library-vue'
import type { WppRadioGroupCustomEvent } from '@wppopen/components-library/dist/types/components'
import { ref } from 'vue'

const radioGroupValue = ref<RadioGroupValue>('option-1')

const setValue = (value: RadioGroupValue) => {
  radioGroupValue.value = value
}
</script>

<template>
  <div>
    <WppTypography type="xl-heading">With truncation on warning message</WppTypography>
    <WppRadioGroup
      class="radioGroup"
      :value="radioGroupValue"
      :labelConfig="{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }"
      message="Warning message"
      messageType="warning"
      :maxMessageLength="10"
      @wppChange="(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) => setValue(e.detail.value || '')"
    >
      <WppRadio required value="option-1" :labelConfig="{ text: 'Option-1' }" />
      <WppRadio required value="option-2" :labelConfig="{ text: 'Option-2' }" />
      <WppRadio required value="option-3" :labelConfig="{ text: 'Option-3' }" />
      <WppRadio required value="option-4" :labelConfig="{ text: 'Option-4' }" />
      <WppRadio required value="option-5" :labelConfig="{ text: 'Option-5' }" />
    </WppRadioGroup>

    <div class="buttons">
      <WppButton size="s" variant="secondary" @click="setValue('option-1')"> Set option-1 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('option-2')"> Set option-2 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('option-3')"> Set option-3 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('')"> Reset </WppButton>
    </div>
  </div>
</template>

<style></style>
```
