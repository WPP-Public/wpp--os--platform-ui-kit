```tsx
import { WppFullScreenModal, WppButton } from '@platform-ui-kit/components-library-react'

export const FullScreenModalExample = () => {
  const [isFullScreenModalOpen, setFullScreenModalOpen] = useState(false)

  const handleOpenModal = () => setFullScreenModalOpen(true)
  const handleCloseModal = () => setFullScreenModalOpen(false)

  return (
    <>
      <WppButton onClick={handleOpenModal}>Open Modal</WppButton>

      <WppFullScreenModal open={isFullScreenModalOpen} onWppFullScreenModalClose={handleCloseModal}>
        <div slot="header">Title</div>
        <p slot="body">Body of the modal</p>
        <div slot="actions">
          <WppButton variant="primary" size="s" onClick={handleCloseModal}>
            Close
          </WppButton>
        </div>
      </WppFullScreenModal>
    </>
  )
}
```
