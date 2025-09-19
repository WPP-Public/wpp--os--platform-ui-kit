```tsx
import { WppPill } from '@platform-ui-kit/components-library-react'

export const Example = () => (
  <>
    <WppPill>Text</WppPill>

    <WppPill
      type='single'
      label="Text"
      name="chip"
      size="m"
    />

    <WppPill
      type='multiple'
      label="Text"
      name="chip1"
      disabled={isDisabled}
      checked={isChecked}
    ></WppPill>
  </>
)
```
