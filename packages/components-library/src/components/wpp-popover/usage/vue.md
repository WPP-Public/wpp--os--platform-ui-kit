```vue
<script setup lang="ts">
import {
  WppPopover,
  WppTypography,
  WppButton,
  WppActionButton,
  WppIconCross,
  WppDivider,
} from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppPopover closable>
    <WppButton variant="secondary" slot="trigger-element"> Trigger button to open Popover </WppButton>
    <div>
      <div>
        <WppTypography type="m-strong">Title</WppTypography>
      </div>
      <WppDivider></WppDivider>
      <div>
        <WppTypography>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
        </WppTypography>
      </div>
      <WppDivider></WppDivider>
      <div>
        <WppActionButton variant="secondary">Button</WppActionButton>
        <WppActionButton>Button</WppActionButton>
      </div>
    </div>
  </WppPopover>
</template>
```
