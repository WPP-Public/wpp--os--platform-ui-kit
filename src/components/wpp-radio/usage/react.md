```tsx
import { WppRadio } from '@wppopen/components-library-react'

export const RadioExample = () => (
  <>
    <WppRadio
      disabled={isDisabled}
      value={radioButtonValue}
      labelConfig={{ text: 'Option' }}
      checked={isChecked}
      onWppChange={({ detail: { checked } }) => setChecked(checked)}
    />

    <form onSubmit={handleSubmit}>
      <WppRadio
        checked={isChecked}
        labelConfig={{ text: 'Option' }}
        name="options"
        onWppChange={({ detail: { checked } }) => setChecked(checked)}
      />
    </form>
  </>
)
```
