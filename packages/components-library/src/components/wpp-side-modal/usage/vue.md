```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppSideModal } from '@platform-ui-kit/components-library-vue'

const isSideModalOpen = ref(false)

const handleOpenSideModal = () => (isSideModalOpen.value = true)
const handleCloseSideModal = () => (isSideModalOpen.value = false)

// Action handlers for actionsConfig
const handleCancel = () => handleCloseSideModal()
const handleConfirm = () => alert('Confirm action clicked')
const handleRemove = () => alert('Remove action clicked')

/**
  The `actionsConfig` property is an array that can contain at most 1 of each:
    - 1 WppButton with variant = "primary" / "destructive"
    - 1 WppButton with variant = "secondary" / "destructive-secondary"
    - 1 WppActionButton with variant = "primary" / "destructive". The button also has to have an icon.
*/
const actionsConfig = [
  {
    label: 'Cancel',
    variant: 'secondary',
    onClick: handleCancel,
    size: 'm',
    name: 'Cancel-secondary-btn',
    ariaProps: { label: 'Cancel btn' },
  },
  {
    label: 'Confirm',
    variant: 'primary',
    onClick: handleConfirm,
    size: 'm',
    name: 'confirm-primary-btn',
    ariaProps: { label: 'Confirm btn' },
  },
  {
    label: 'Remove',
    variant: 'destructive',
    onClick: handleRemove,
    icon: 'wpp-icon-remove-circle',
    name: 'remove-destructive-btn',
    ariaProps: { label: 'Remove btn' },
  },
]
</script>

<template>
  <div>
    <WppButton @click="handleOpenSideModal">Open Side Modal</WppButton>

    <!-- Using actionsConfig -->
    <WppSideModal :open="isSideModalOpen" @wppSideModalClose="handleCloseSideModal" :actionsConfig="actionsConfig">
      <div slot="header">Title</div>
      <p slot="body">Body of the modal</p>
    </WppSideModal>

    <!-- Using the deprecated actions slot -->
    <WppSideModal :open="isSideModalOpen" @wppSideModalClose="handleCloseSideModal">
      <div slot="header">Title</div>
      <p slot="body">Body of the modal</p>
      <!-- Deprecated actions slot -->
      <div slot="actions">
        <WppButton variant="primary" size="s" @click="handleCloseSideModal"> Close </WppButton>
      </div>
    </WppSideModal>
  </div>
</template>

<!-- Note: The `actions` slot is deprecated and will be removed in a future release. Please use the `actionsConfig` property instead. -->
```
