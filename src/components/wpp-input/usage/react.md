```tsx
import { WppInput } from '@wppopen/components-library-react'

export const TextInputExample = () => (
  <WppInput
    name="email"
    labelConfig={{ text: 'Enter your email' }}
    placeholder="Email"
    message="Email error"
    messageType="error"
    value="example@gmail."
    onWppChange={handleEmailChange}
  >
    <WppIconSearch slot="icon-start" aria-label="Search icon" onClick={() => console.log('Left icon clicked')} />
    <WppIconAdd slot="icon-end" aria-label="Clear icon" onClick={() => console.log('Right icon clicked')} />
  </WppInput>
)
```
