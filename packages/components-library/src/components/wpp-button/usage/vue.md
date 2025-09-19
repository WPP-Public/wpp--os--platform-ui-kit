```vue

<script setup lang="ts">
import { WppButton, WppIconArrow, WppIconPlus } from "@platform-ui-kit/components-library-vue"

// ...
</script>

<template>
  <WppButton>Primary</WppButton>
  <WppButton variant="secondary">Secondary</WppButton>
  <WppButton variant="destructive">Destructive</WppButton>
  <WppButton size="s">Size s</WppButton>
  <WppButton width="150px">Width 150px</WppButton>
  <WppButton>
    <WppIconPlus slot="icon-start" />
    Left Icon
  </WppButton>
  <WppButton>
    Right Icon
    <WppIconArrow slot="icon-end" />
  </WppButton>

  <WppButton inverted>Primary Inverted</WppButton>
  <WppButton inverted variant="secondary">Secondary Inverted</WppButton>

  <WppButton
    :disabled="isDisabled"
    :loading="loading"
  />

  <a href="https://savelife.in.ua/en/donate">
    <WppButton>Button</WppButton>
  </a>

  <form @submit="handleSubmit">
    <WppButton type="submit">Submit</WppButton>
  </form>
</template>


```
