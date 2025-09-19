```tsx
import { WppModal, WppButton } from '@platform-ui-kit/components-library-react'

export const ModalExample = () => (
  <WppModal open={isOpen}>
    <div slot="header">Title</div>
    <p slot="body">Body of the modal</p>
    <div slot="actions">
      <WppButton variant="primary" size="s" onClick={handleCloseModal}>
        Close
      </WppButton>
    </div>
  </WppModal>
)
```
