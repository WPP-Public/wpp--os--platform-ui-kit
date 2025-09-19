```vue

<script setup lang="ts">
import {
  WppActionButton,
  WppAvatar,
  WppIconChevron,
  WppIconMail,
  WppListItem,
} from '@platform-ui-kit/components-library-vue'

const handleListItemClick = (ev: CustomEvent) => console.log("change item: ", ev.detail);
</script>

<template>
  <WppListItem>
    <p slot="label">Text</p>
    <WppActionButton variant="secondary" slot="right">
      <WppIconPlus slot="icon-start" />
    </WppActionButton>
  </WppListItem>

  <WppListItem selectable @wppChangeListItem="handleListItemClick">
    <span slot="subtitle">Subtitle</span>
    <span slot="label">Text</span>
    <span slot="caption">Caption</span>
    <WppIconChevron slot="right" />
  </WppListItem>

  <WppListItem checked>
    <span slot="subtitle">Subtitle</span>
    <span slot="label">Text</span>
    <span slot="caption">Caption</span>
    <WppActionButton variant="secondary" slot="right">
      <WppIconMail slot="icon-start" />
    </WppActionButton>
    <WppAvatar
      size="s"
      src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
      slot="left"
    />
  </WppListItem>
</template>

```
