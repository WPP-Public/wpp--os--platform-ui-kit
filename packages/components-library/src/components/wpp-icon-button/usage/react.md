```tsx
import { WppIconButton, WppIconMenuMore } from '@platform-ui-kit/components-library-react'

export const IconButtonExample = () => (
  <>
    <WppIconButton size="m">
      <WppIconMenuMore />
    </WppIconButton>

    <WppIconButton
      disabled={isDisabled}
      loading={loading}
    >
      <WppIconMenuMore />
    </WppIconButton>
  </>
)
```
