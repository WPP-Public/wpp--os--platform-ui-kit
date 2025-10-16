```tsx
import { WppFloatingButton, WppIconDirections } from '@wppopen/components-library-react'

export const FloatingButtonExample = () => (
  <>
    <WppFloatingButton />
    <WppFloatingButton loading />
    <WppFloatingButton disabled />
    <WppFloatingButton>
      <WppIconDirections />
    </WppFloatingButton>

    <a href="https://savelife.in.ua/en/donate">
        <WppFloatingButton />
    </a>

    <form onSubmit={handleSubmit}>
      <WppFloatingButton type='submit' />
    </form>
  </>
)
```
