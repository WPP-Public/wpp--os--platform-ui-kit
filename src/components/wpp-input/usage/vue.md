```vue
<script setup lang="ts">
import {
  WppIconSearch,
  WppInput,
} from "@wppopen/components-library-vue";
</script>

<template>
  <WppInput
    name="wpp-input"
    placeholder="Enter text"
    data-testid="regular-m-input"
    required
    autoFocus
    :labelConfig="{
      icon: 'wpp-icon-info',
      text: 'Normal Input',
      description: 'Description',
      locales: {
        optional: 'Optional',
      },
    }"
  />

  <WppInput
    name="wpp-input"
    :labelConfig="{ text: 'Error Input with Search Icon' }"
    placeholder="Enter text"
    messageType="error"
    message="Error message"
    data-testid="search-icon-error-s-input"
    size="s"
    required
  >
    <WppIconSearch slot="icon-start" />
  </WppInput>
</template>
```
