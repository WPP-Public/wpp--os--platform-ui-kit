```vue
<script setup lang="ts">
import type { CheckboxGroupChangeEvent, CheckboxGroupValue } from '@platform-ui-kit/components-library'
import { WppCheckbox, WppTypography, WppCheckboxGroup, WppButton } from '@platform-ui-kit/components-library-vue'
import type { WppCheckboxGroupCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { ref } from 'vue'

const checkboxes = ref([
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3',
  },
])
const valueRef = ref<CheckboxGroupValue[]>(['option-1', 'option-2', 'option-3'])

const handleWppChange = (event: WppCheckboxGroupCustomEvent<CheckboxGroupChangeEvent>) => {
  const eventValue = event.detail.value as CheckboxGroupValue[]

  valueRef.value = eventValue
}

const handleAddOption = () => {
  if (checkboxes.value.length < 5) {
    checkboxes.value = [
      ...checkboxes.value,
      { value: `option-${checkboxes.value.length + 1}`, text: `Option ${checkboxes.value.length + 1}` },
    ]
  }
}

const selectAllOptions = () => {
  valueRef.value = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5']
}
</script>

<template>
  <div class="checkboxes">
    <WppTypography type="xl-heading">With 3 items</WppTypography>
    <WppCheckboxGroup
      :labelConfig="{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }"
      class="checkboxGroup"
      :value="valueRef"
      @wppChange="handleWppChange"
    >
      <WppCheckbox
        v-for="checkbox in checkboxes"
        :key="checkbox.value"
        required
        :value="checkbox.value"
        :labelConfig="{ text: checkbox.text }"
      />
    </WppCheckboxGroup>

    <WppButton :style="{ marginTop: '10px' }" :disabled="checkboxes.length === 5" @click="handleAddOption">
      Add option
    </WppButton>
    <WppButton :style="{ marginTop: '10px' }" @click="selectAllOptions"> Select All options </WppButton>
  </div>
</template>
```
