```vue
<script setup lang="ts">
import { WppMoreButton } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <div class="moreBtnSection">
    <WppMoreButton
      @wppClick="() => console.log('Clicked')"
      :ariaProps="{ label: 'More items menu' }"
      data-testid="default-more-btn-m"
      class="moreBtnItem"
    ></WppMoreButton>
    <WppMoreButton
      @wppClick="() => console.log('Clicked')"
      :ariaProps="{ label: 'More items menu' }"
      data-testid="default-more-btn-s"
      class="moreBtnItem"
      size="s"
    ></WppMoreButton>
  </div>
</template>

<style scoped>
.subtitle {
  display: block;
  margin: 10px 0;
}

.moreBtnSection {
  margin-bottom: 20px;
}

.moreBtnItem {
  margin-right: 100px;
}

.moreBtnItem:last-child {
  margin-right: 0;
}
</style>
```
