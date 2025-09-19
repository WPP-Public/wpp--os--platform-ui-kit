```vue

<script setup lang="ts">
import { WppIconButton, WppIconMenuMore } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppIconButton size="m">
    <WppIconMenuMore />
  </WppIconButton>

  <WppIconButton
    :disabled="isDisabled"
    :loading="loading"
  >
    <WppIconMenuMore />
  </WppIconButton>
</template>


```
