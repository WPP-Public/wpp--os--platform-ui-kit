```vue

<script setup lang="ts">
import { WppProgressIndicator } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <!-- Without value: shows indeterminate -->
  <WppProgressIndicator variant="circle" />

  <!-- value=0 but forceIntermediateEmptyState=true: shows 0% empty state -->
  <WppProgressIndicator
    variant="circle"
    value="0"
    :forceIntermediateEmptyState="true"
    isShowPercentage
    label="0%"
  />

  <!-- With value>0: shows defined progress -->
  <WppProgressIndicator variant="circle" value="50" />
</template>


```
