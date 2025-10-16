```vue
<script setup>
import { WppToggle } from "@wppopen/components-library-vue";

const labelConfig = {
  text: "Label Text",
};
</script>

<template>
  <WppToggle
    class="item"
    :labelConfig="labelConfig"
    required
    autoFocus
    data-testid="focus-toggle"
  />
</template>
```
