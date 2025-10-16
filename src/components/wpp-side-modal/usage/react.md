```tsx
import { useState } from 'react'
import { WppSideModal, WppButton } from '@platform-ui-kit/components-library-react'

export const SideModalExample = () => {
  const [isModalOpen, setModalStatus] = useState(false)

  const handleOpenModal = () => setModalStatus(true)
  const handleCloseModal = () => setModalStatus(false)

  // Action handlers for actionsConfig
  const handleCancel = () => handleCloseModal()
  const handleConfirm = () => alert('Confirm action clicked')
  const handleRemove = () => alert('Remove action clicked')

  return (
    <>
      <WppButton onClick={handleOpenModal}>Open Modal</WppButton>

      {/* Using actionsConfig */}
      <WppSideModal
        open={isModalOpen}
        onWppSideModalClose={handleCloseModal}
        /**
          The `actionsConfig` property is an array that can contain at most 1 of each:
            - 1 WppButton with variant = "primary" / "destructive"
            - 1 WppButton with variant = "secondary" / "destructive-secondary"
            - 1 WppActionButton with variant = "primary" / "destructive". The button also has to have an icon.
         */
        actionsConfig={[
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: handleCancel,
            name: 'Cancel-secondary-btn',
            ariaProps: { label: 'Cancel btn' },
          },
          {
            label: 'Confirm',
            variant: 'primary',
            onClick: handleConfirm,
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
        ]}
      >
        <div slot="header">Title</div>
        <p slot="body">Body of the modal</p>
      </WppSideModal>

      {/* Using the deprecated actions slot */}
      <WppSideModal open={isModalOpen} onWppSideModalClose={handleCloseModal}>
        <div slot="header">Title</div>
        <p slot="body">Body of the modal</p>
        {/* Deprecated actions slot */}
        <div slot="actions">
          <WppButton variant="primary" size="s" onClick={handleCloseModal}>
            Close
          </WppButton>
        </div>
      </WppSideModal>
    </>
  )
}
```
