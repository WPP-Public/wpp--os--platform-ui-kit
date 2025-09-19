```vue
<script setup lang="ts">
import { ref } from 'vue'

import { WppBanner } from '@platform-ui-kit/components-library-vue'

const isToShowBanner = ref(true)

const handleBannerShowStateChange = (event: CustomEvent) => {
  isToShowBanner.value = event.detail.show
}
</script>

<template>
  <WppBanner type="information" :show="isToShowBanner" closable @wppClose="handleBannerShowStateChange">
    Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of text.
  </WppBanner>
</template>
```
