```vue
<script setup lang="ts">
import {
  WppCard,
  WppActionButton,
  WppIconMore,
  WppTypography
} from '@wppopen/components-library-vue'
</script>

<template>
  <WppCard>
    <div slot="header">
      <WppIconMore />
      <WppTypography>Header</WppTypography>
    </div>
    <div slot="actions">
      <WppActionButton variant="secondary">
        <WppIconMore slot="icon-start" direction='horizontal' />
      </WppActionButton>
    </div>
    <div>Some content</div>
  </WppCard>
</template>
```
