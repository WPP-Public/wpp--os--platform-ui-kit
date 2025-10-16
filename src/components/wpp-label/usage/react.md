```tsx
import { WppLabel } from '@wppopen/components-library-react'

export const LabelExample = () => (
    <>
      <WppLabel config={{ text: 'Label' }} htmlFor="name" />
      <WppLabel config={{ text: 'Label' }} htmlFor="name" typography="s-body" />

      <WppLabel
        config={{ text: 'Label' }}
        htmlFor="name"
        typography="s-body"
        optional={isOptional}
        disabled={isDisabled}
      />
    </>
  )
```
