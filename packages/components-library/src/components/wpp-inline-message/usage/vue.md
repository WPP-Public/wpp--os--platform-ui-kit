```vue
<script setup lang="ts">
import { WppInlineMessage } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppInlineMessage size="s" message="Warning message" type="warning" showTooltipFrom="10" />
  <WppInlineMessage size="m" message="Warning message" type="warning" />
  <WppInlineMessage
    class="item"
    size="l"
    actionBtnText="Action"
    titleText="Title"
    message="Success Message"
    type="success"
    @wppClickCloseBtn="handleCloseBtn"
    @wppClickActionBtn="handleActionBtn"
  />
</template>
```
