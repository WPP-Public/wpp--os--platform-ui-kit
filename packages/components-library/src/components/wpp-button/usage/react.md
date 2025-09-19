```tsx
import { WppButton, WppIconDirections, WppIconAddCircle } from '@platform-ui-kit/components-library-react'

export const ButtonExample = () => (
  <>
    <WppButton>Primary</WppButton>
    <WppButton variant='secondary'>Secondary</WppButton>
    <WppButton variant='destructive'>Destructive</WppButton>
    <WppButton variant='destructive-secondary'>Destructive secondary</WppButton>
    <WppButton size='s'>Size s</WppButton>
    <WppButton width='150px'>Width 150px</WppButton>
    <WppButton>
      <WppIconAddCircle slot='icon-start' />
      Left Icon
    </WppButton>
    <WppButton>
      Right Icon
      <WppIconDirections slot='icon-end' />
    </WppButton>

    <WppButton inverted>
      Primary Inverted
    </WppButton>
    <WppButton inverted variant='secondary'>Secondary Inverted</WppButton>

    <WppButton
      disabled={isDisabled}
      loading={loading}
    />

    <a href="https://savelife.in.ua/en/donate">
        <WppButton>Button</WppButton>
    </a>

    <form onSubmit={handleSubmit}>
      <WppButton type='submit'>Submit</WppButton>
    </form>
  </>
)
```
