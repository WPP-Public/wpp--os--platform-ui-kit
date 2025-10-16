```vue
<script setup>
import { WppTextareaInput } from "@wppopen/components-library-vue";
</script>

<template>
  <WppTextareaInput
    placeholder="Enter text"
    name="asd"
    charactersLimit="10"
    warningThreshold="5"
    data-testid="regular-limited-text-area"
    required
    autoFocus
    :labelConfig="{
      icon: 'wpp-icon-info',
      text: 'Regular Text Area with Limit',
      description: 'Description',
      locales: {
        optional: 'Optional',
      },
    }"
  />
</template>
```
