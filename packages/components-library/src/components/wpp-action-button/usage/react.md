```tsx
import { WppActionButton, WppIconAddCircle } from '@platform-ui-kit/components-library-react'

export const ActionButtonExample = () => (
  <>
    <WppActionButton>Primary</WppActionButton>
    <WppActionButton variant='secondary'>Secondary</WppActionButton>
    <WppActionButton variant='destructive'>Destructive</WppActionButton>
    <WppActionButton>
      <WppIconAddCircle slot='icon-start' />
      Left Icon
    </WppActionButton>
    <WppActionButton>
      Right Icon
      <WppIconAddCircle slot='icon-end' />
    </WppActionButton>

    <WppActionButton
      disabled={isDisabled}
      loading={loading}
    />

    <form onSubmit={handleSubmit}>
      <WppActionButton type='submit'>Submit</WppActionButton>
    </form>
  </>
)
```
