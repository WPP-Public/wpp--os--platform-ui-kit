```tsx
import { WppCheckbox } from '@wppopen/components-library-react'

export const CheckboxExample = () => (
  <>
    <WppCheckbox />

    <WppCheckbox
      disabled={isDisabled}
      checked={isChecked}
      indeterminate={isIndeterminate}
      labelConfig={{ text: 'Option' }}
      name="options"
      onWppChange={({ detail: { checked } }) => setChecked(checked)}
    />

    <form onSubmit={handleSubmit}>
      <WppCheckbox
        checked={isChecked}
        labelConfig={{ text: 'Option' }}
        name="options"
        onWppChange={({ detail: { checked } }) => setChecked(checked)}
      />
    </form>
  </>
)
```
