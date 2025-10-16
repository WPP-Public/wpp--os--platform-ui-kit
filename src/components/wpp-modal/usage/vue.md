```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppModal } from '@platform-ui-kit/components-library-vue'

const isModalOpen = ref(false)

const handleOpenModal = () => (isModalOpen.value = true)
const handleCloseModal = () => (isModalOpen.value = false)
</script>

<template>
  <div>
    <WppButton @click="handleOpenModal">Open Modal</WppButton>
    <WppModal :open="isModalOpen" @wppModalClose="handleCloseModal">
      <div slot="header">Title</div>
      <p slot="body">Body of the modal</p>
      <div slot="actions">
        <WppButton variant="primary" size="s" @click="handleCloseModal">Close</WppButton>
      </div>
    </WppModal>
  </div>
</template>
```
