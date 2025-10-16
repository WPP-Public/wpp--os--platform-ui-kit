```vue
<script setup lang="ts">
import type { ListItemInterface } from '@wppopen/components-library/src/components'
import { WppSelect, WppIconClock } from '@wppopen/components-library-vue'

const SAMPLE_LIST: ListItemInterface[] = [
  {
    label: 'This is the end',
    value: 'end',
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
    label: 'Tree',
    value: 'tree',
    checked: true,
  },
  {
    label: 'Car',
    value: 'car',
    disabled: true,
  },
  {
    label: 'House',
    value: 'house',
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
    label: 'Magazine',
    value: 'magazine',
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
    label: 'Website',
    value: 'website',
  },
]

const value = ref('')

const handleChange = event => {
  console.log('On Change single', event.detail)
  value.value = event.detail.value
}
</script>

<template>
  <WppSelect
    name="select-component"
    class="selectItem"
    data-testid="default-single-select-m"
    :list="SAMPLE_LIST"
    :label-config="{ text: 'Size M' }"
    placeholder="Choose option"
    :value="value"
    autoFocus
    @wppChange="handleChange"
  >
    <WppIconClock slot="icon-start" />
  </WppSelect>
</template>
```

### Select Combined Example

```vue
<script setup lang="ts">
import type { ListItemInterface } from '@wppopen/components-library/src/components'
import { WppSelect } from '@wppopen/components-library-vue'
import { ref } from 'vue'

export const SAMPLE_LIST: ListItemInterface[] = [
  {
    id: 1,
    label: 'None',
    value: '',
  },
  {
    id: 2,
    label: 'UAH',
    value: 'uah',
  },
  {
    id: 3,
    label: 'USD',
    value: 'usd',
  },
  {
    id: 4,
    label: 'EUR',
    value: 'eur',
  },
]

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

    <div class="variants">
      <WppSelect
        type="combined"
        name="combined-select"
        :value="value"
        :list="SAMPLE_LIST"
        :inputValue="inputValue"
        placeholder="Placeholder"
        size="m"
        :disabled="false"
        :required="true"
        :labelConfig="{ text: 'Currency' }"
        dropdownWidth="auto"
        @wppChange="handleChange"
      >
      </WppSelect>
    </div>
  </div>
</template>
```
