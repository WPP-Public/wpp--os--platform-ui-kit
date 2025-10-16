```tsx
import { WppTextareaInput } from '@wppopen/components-library-react'

export const TextareaInputExample = () => (
  <WppTextareaInput
    name="email"
    placeholder="Email"
    message="Email error"
    messageType="error"
    value="example@gma"
    labelConfig={{
      text: 'Enter some email info',
      icon: 'wpp-icon-mail'
    }}
  />
)
```
