```tsx
import { WppModal, WppButton } from '@wppopen/components-library-react'

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  return (
    <>
      <WppButton onClick={handleOpenModal}>Open Modal</WppButton>

      <WppModal open={isModalOpen} onWppModalClose={handleCloseModal}>
        <div slot="header">Title</div>
        <p slot="body">Body of the modal</p>
        <div slot="actions">
          <WppButton variant="primary" size="s" onClick={handleCloseModal}>
            Close
          </WppButton>
        </div>
      </WppModal>
    </>
  )
}
```
