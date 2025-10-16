```vue

<script setup lang="ts">
import { WppLabel } from '@wppopen/components-library-vue'
</script>

<template>
  <WppLabel :config="{ text: 'Label' }" htmlFor="name" />
  <WppLabel :config="{ text: 'Label' }" htmlFor="name" typography="s-body" />

  <WppLabel
    :config="{ text: 'Label' }"
    htmlFor="name"
    typography="s-body"
    :optional="isOptional"
    :disabled="isDisabled"
  />
</template>


```
