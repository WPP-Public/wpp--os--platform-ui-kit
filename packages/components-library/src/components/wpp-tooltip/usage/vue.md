```vue

<script setup lang="ts">
import { WppTooltip } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppTooltip text="Message">
    <div>Anchor</div>
  </WppTooltip>

  <WppTooltip placement="left" header="Title" text="Message" value="42">
    <WppButton>Apply</WppButton>
  </WppTooltip>

  <WppTooltip isError placement="bottom" text="Should be a valid email">
    <WppInput
      :value="emailValue"
      :labelConfig="labelConfig"
    />
  </WppTooltip>
</template>


```
