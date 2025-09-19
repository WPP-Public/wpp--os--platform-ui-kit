<script setup lang="ts">
import { WppSelect } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import { SAMPLE_LIST_COMBINED } from '../../SingleSelect/consts'

const value = ref('usd')
const inputValue = ref('100')

const handleChange = (event: CustomEvent) => {
  const { value: newValue, inputValue: newInputValue } = event.detail
  value.value = newValue
  inputValue.value = newInputValue
  console.log('value :>> ', event.detail)
}
</script>

<template>
  <div class="container" data-testid="text-selects">
    <h1 class="title">Selects Combined</h1>

    <h3 class="subtitle">Size M</h3>
    <div class="variants">
      <WppSelect
        type="combined"
        name="combined-select"
        :value="value"
        :inputValue="inputValue"
        placeholder="Placeholder"
        size="m"
        :disabled="false"
        :required="true"
        :labelConfig="{ text: 'Currency' }"
        dropdownWidth="auto"
        @wppChange="handleChange"
        :list="SAMPLE_LIST_COMBINED"
      >
      </WppSelect>

      <WppSelect
        type="combined"
        name="combined-select"
        :value="value"
        :inputValue="inputValue"
        placeholder="Placeholder"
        size="m"
        :disabled="true"
        :required="true"
        dropdownWidth="auto"
        @wppChange="handleChange"
        :labelConfig="{ text: 'Currency' }"
        :list="SAMPLE_LIST_COMBINED"
      >
      </WppSelect>
    </div>

    <h3 class="subtitle">Size S</h3>
    <div class="variants">
      <WppSelect
        type="combined"
        name="combined-select"
        :value="value"
        :inputValue="inputValue"
        placeholder="Placeholder"
        size="s"
        :disabled="false"
        :required="true"
        :labelConfig="{ text: 'Currency' }"
        dropdownWidth="auto"
        @wppChange="handleChange"
        :list="SAMPLE_LIST_COMBINED"
      >
      </WppSelect>

      <WppSelect
        type="combined"
        name="combined-select"
        :value="value"
        :inputValue="inputValue"
        placeholder="Placeholder"
        size="s"
        :disabled="true"
        :required="true"
        :labelConfig="{ text: 'Currency' }"
        dropdownWidth="auto"
        @wppChange="handleChange"
        :list="SAMPLE_LIST_COMBINED"
      >
      </WppSelect>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.variants {
  display: flex;
  gap: 1rem;
}
</style>
