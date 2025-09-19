```vue
<script setup lang="ts">
import { ref } from "vue";

import {
  WppPillGroup,
  WppPill,
  WppAvatar,
  WppIconFavorites,
} from "@platform-ui-kit/components-library-vue";

const pillValue = ref<string>("item-a");

const handleSinglePillGroupChange = (event: CustomEvent) => {
  console.log("event.detail =>", event.detail.value);
  pillValue.value = event.detail.value;
};
</script>

<template>
  <WppPillGroup
    :labelConfig="{
      icon: 'wpp-icon-info',
      text: 'Multi Group',
      description: 'Description',
      locales: {
        optional: 'Optional',
      },
    }"
    :value="pillValue"
    @wppChange="handleSinglePillGroupChange"
  >
    <WppPill label="Item A" value="item-a" />
    <WppPill label="Item B" value="item-b" />
    <WppPill label="Item C" value="item-c" />
  </WppPillGroup>
</template>
```
