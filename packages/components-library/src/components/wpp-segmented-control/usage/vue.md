```vue
<script setup lang="ts">
import { ref } from "vue";

import {
  WppSegmentedControl,
  WppSegmentedControlItem,
} from "@platform-ui-kit/components-library-vue";

const currentItem = ref("1");

const handleSegmentedControlChange = (event: CustomEvent) => {
  currentItem.value = event.detail.value;
};
</script>

<template>
  <WppSegmentedControl
    :value="currentItem"
    @wppChange="handleSegmentedControlChange"
  >
    <WppSegmentedControlItem variant="text" value="a">
      Item 1
    </WppSegmentedControlItem>
    <WppSegmentedControlItem variant="text" value="b">
      Item 2
    </WppSegmentedControlItem>
    <WppSegmentedControlItem variant="text" value="3" disabled>
      Item 3
    </WppSegmentedControlItem>
    <WppSegmentedControlItem variant="text" value="4" counter="3">
      Item 4
    </WppSegmentedControlItem>
    <WppSegmentedControlItem
      variant="text"
      value="5"
      counter="3"
      disabled
    >
      Item 5
    </WppSegmentedControlItem>
  </WppSegmentedControl>
</template>
```
