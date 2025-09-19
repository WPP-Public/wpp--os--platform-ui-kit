```vue

<script setup lang="ts">
import { WppAvatarGroup } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <WppAvatarGroup
    maxAvatarsToDisplay="2"
    size="xs"
    withTooltip
    :avatars="[
      {
        name: 'Wickaninnish Harald',
        src: '',
      },
      {
        name: 'Gustaf Marcus',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ38ON2VKzlUNfxV-K_4J5fiGYFmi1PcER8ig&usqp=CAU',
      },
      {
        name: 'Helga Karla',
        src: '',
      },
    ]"
  />
</template>


```
