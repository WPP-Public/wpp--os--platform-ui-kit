```vue
<script setup lang="ts">
import { WppRadio } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <WppRadio
    name="wpp-radio-2"
    class="item"
    :labelConfig="{
      icon: 'wpp-icon-info',
      text: 'Option 2',
      description: 'Description',
      locales: {
        optional: 'Optional',
      },
    }"
    required
  />
</template>
```
