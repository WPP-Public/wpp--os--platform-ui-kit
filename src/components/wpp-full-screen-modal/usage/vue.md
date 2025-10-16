```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppFullScreenModal } from '@platform-ui-kit/components-library-vue'

const isFullScreenModalOpen = ref(false)

const handleOpenFullScreenModal = () => (isFullScreenModalOpen.value = true)
const handleCloseFullScreenModal = () => (isFullScreenModalOpen.value = false)
</script>

<template>
  <div>
    <WppButton @click="handleOpenFullScreenModal">Open Modal</WppButton>
    <WppFullScreenModal :open="isFullScreenModalOpen" @WppFullScreenModalClose="handleCloseFullScreenModal">
      <div slot="header">Title</div>
      <p slot="body">Body of the modal</p>
      <div slot="actions">
        <WppButton variant="primary" size="s" @click="handleCloseFullScreenModal">Close</WppButton>
      </div>
    </WppFullScreenModal>
  </div>
</template>
```
