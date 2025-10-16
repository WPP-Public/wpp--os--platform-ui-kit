```vue

<script setup lang="ts">
import { WppActionButton, WppIconPlus } from "@wppopen/components-library-vue"

// ...
</script>

<template>
  <WppActionButton>Primary</WppActionButton>
  <WppActionButton variant="secondary">Secondary</WppActionButton>
  <WppActionButton>
    <WppIconPlus slot="icon-start" />
    Left Icon
  </WppActionButton>
  <WppActionButton>
    Right Icon
    <WppIconPlus slot="icon-end" />
  </WppActionButton>

  <WppActionButton
    :disabled="isDisabled"
    :loading="loading"
  />

  <form @submit="handleSubmit">
    <WppActionButton type="submit">Submit</WppActionButton>
  </form>
</template>


```
