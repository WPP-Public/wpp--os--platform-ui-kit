```tsx
import { WppToggle } from '@wppopen/components-library-react'

export const ToggleExample = () => {
  const toggleLabelConfig={
    text: 'Email',
    icon: 'wpp-icon-info'
  }

  return (
    <>
      <WppToggle
        disabled={isDisabled}
        value={toggleValue}
        labelConfig={labelConfig}
        checked={isChecked}
        onWppChange={({ detail: { checked } }) => setChecked(checked)}
      />

      <form onSubmit={handleSubmit}>
        <WppToggle
          checked={isChecked}
          labelConfig={labelConfig}
          name="options"
          onWppChange={({ detail: { checked } }) => setChecked(checked)}
        />
      </form>
    </>
  )
}
```
