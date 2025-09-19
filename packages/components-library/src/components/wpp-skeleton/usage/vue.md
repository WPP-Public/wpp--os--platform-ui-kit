```vue

<script setup lang="ts">
import { WppSkeleton } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <!-- Basic Rectangle Skeleton -->
  <WppSkeleton
    variant="rectangle"
    width="192px"
    height="80px"
  />

  <!-- Custom Layout: Card Example -->
  <div style="width: 260px; padding: 20px;">
    <WppSkeleton width="60%" height="30px" style="margin-bottom: 16px;" />
    <WppSkeleton width="90%" height="16px" style="margin-bottom: 8px;" />
    <WppSkeleton width="80%" height="16px" style="margin-bottom: 24px;" />
    <div style="display: flex; gap: 40px;">
      <WppSkeleton width="70%" height="8px" />
      <WppSkeleton width="30%" height="8px" />
    </div>
  </div>

  <!-- Custom Layout: Table Example -->
  <div style="width: 100%;">
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;">
      <WppSkeleton v-for="index in 6" :key="`header-${index}`" width="100%" height="20px" />
    </div>
    <div v-for="rowIndex in 5" :key="`row-${rowIndex}`" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 16px;">
      <WppSkeleton v-for="colIndex in 6" :key="`row-${rowIndex}-col-${colIndex}`" width="100%" height="16px" />
    </div>
  </div>

  <!-- Custom Layout: Mixed Layout -->
  <div style="display: flex; gap: 24px; align-items: center; padding: 20px;">
    <WppSkeleton variant="circle" width="50px" height="50px" />
    <div style="flex: 1;">
      <WppSkeleton width="80%" height="20px" style="margin-bottom: 8px;" />
      <WppSkeleton width="60%" height="16px;" />
    </div>
  </div>
</template>

```
