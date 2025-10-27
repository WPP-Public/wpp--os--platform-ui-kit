```vue
<script setup lang="ts">
  import { ActionButtonData } from "@wppopen/components-library";
  import {
    WppFloatingToolbar
  } from "@wppopen/components-library-vue";

  const actionButtonsConfig: ActionButtonData[] = [
    {
      icon: 'add',
      onClick: () => console.log('Add button clicked')
    }, {
      icon: 'edit',
    },
  ]
</script>

<template>
  <WppFloatingToolbar :actionButtonsConfig="actionButtonsConfig" />
</template>
```
