```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppColorPicker, WppTypography } from '@platform-ui-kit/components-library-vue'

const SAVED_COLORS = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']
const color = ref<string | undefined>(undefined)
const savedColors = ref<string[]>(SAVED_COLORS)

const handleSaveColor = (event: CustomEvent<string>) => {
  console.log('Saving color:', event.detail)
  const newColor = event.detail
  savedColors.value = [...savedColors.value, newColor]
}

const handleRemoveSavedColor = (event: CustomEvent<string>) => {
  console.log('Removing color:', event.detail)
  const color: string = event.detail
  const newSavedColors = savedColors.value.filter(item => item !== color)

  savedColors.value = newSavedColors
}

const handleChangeColor = (event: CustomEvent) => {
  const emittedColor = event.detail
  console.log('Changing color:', emittedColor)

  if (emittedColor === color.value) return

  if (typeof emittedColor === 'string') {
    color.value = emittedColor
  } else {
    color.value = emittedColor.hexValue
  }
}
</script>

<template>
  <div>
    <WppTypography type="2xl-heading"> Hex </WppTypography>
    <WppColorPicker
      @wppChange="handleChangeColor"
      @wppSaveColor="handleSaveColor"
      @wppRemoveSavedColor="handleRemoveSavedColor"
      :savedColors="savedColors"
      mode="theme and custom"
      type="hex"
    />
  </div>
</template>
```
