```vue

<script setup lang="ts">
import { WppFloatingButton, WppIconArrow } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppFloatingButton />
  <WppFloatingButton loading />
  <WppFloatingButton disabled />
  <WppFloatingButton>
    <WppIconArrow />
  </WppFloatingButton>

  <a href="https://savelife.in.ua/en/donate">
    <WppFloatingButton />
  </a>

  <form @submit="handleSubmit">
    <WppFloatingButton type='submit' />
  </form>
</template>


```
