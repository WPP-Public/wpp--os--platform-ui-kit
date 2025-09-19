<script setup lang="ts">
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('cars')
const value3 = ref('')

const handleChange1 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value1.value = event.detail.value
}

const handleChange2 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value2.value = event.detail.value
}

const handleChange3 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value3.value = event.detail.value
}
</script>

<template>
  <div class="text" data-testid="text-selects">
    <h2>Text Selects</h2>
    <WppTypography type="s-body" class="label"> Regular Text Select </WppTypography>
    <WppSelect
      type="text"
      placeholder="Placeholder"
      @wppChange="handleChange1"
      :value="value1"
      :list="[
        {
          value: 'car',
          label: 'Car',
        },
        {
          value: 'house',
          label: 'House',
          disabled: true,
        },
        {
          value: 'apartment',
          label: 'Apartment',
        },
      ]"
    >
    </WppSelect>

    <WppTypography type="s-body" class="label"> Disabled Text Select </WppTypography>
    <WppSelect type="text" placeholder="Choose an Option" disabled />

    <WppTypography type="s-body" class="label"> Text Select with Options </WppTypography>
    <WppSelect
      type="text"
      placeholder="Choose an option"
      @wppChange="handleChange2"
      :value="value2"
      :list="[
        {
          value: 'house',
          label: 'House with plus',
          slots: [
            {
              type: 'wpp-icon-plus',
              props: {
                slot: 'left',
              },
            },
          ],
        },
        {
          value: 'food',
          label: 'Food again',
        },
        {
          value: 'disabled-item',
          label: 'Disabled item',
          disabled: true,
        },
        {
          value: 'cars',
          label: 'Cars more',
          slots: [
            {
              type: 'wpp-icon-success',
              props: {
                slot: 'right',
              },
            },
          ],
        },
        {
          value: 'text-plus',
          label: 'TextPlus',
          slots: [
            {
              type: 'wpp-icon-plus',
              props: {
                slot: 'left',
              },
            },
          ],
        },
        {
          value: 'just-text',
          label: 'text',
        },
      ]"
      data-testid="text-select-with-items"
    >
    </WppSelect>

    <WppTypography type="s-body" class="label"> Text Select with Auto Focus </WppTypography>
    <WppSelect
      type="text"
      placeholder="Choose an option"
      autoFocus
      @wppChange="handleChange3"
      data-testid="focus-text-select"
      :value="value3"
      :list="[
        {
          value: 'house',
          label: 'House with plus',
          slots: [
            {
              type: 'wpp-icon-plus',
              props: {
                slot: 'left',
              },
            },
          ],
        },
      ]"
    >
    </WppSelect>
  </div>
</template>

<style scoped>
.label {
  margin-top: 15px;
}

.text {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 500px;
}
</style>
