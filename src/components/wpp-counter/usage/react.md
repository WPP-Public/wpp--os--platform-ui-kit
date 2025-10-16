```tsx
import React, { useState } from 'react'

import { WppCounter, WppTypography } from '@wppopen/components-library-react'
import { CounterChangeEventDetail } from '@wppopen/components-library'

export const CounterExample = () => {
  const [value, setValue] = useState(5)

  const handleCounterChange = (event: CustomEvent<CounterChangeEventDetail>) => {
    setValue(event.detail.value)
  }

  return (
    <>
      <WppCounter
        value={value}
        onWppChange={handleCounterChange}
        format={{
          searchValue: /(.)(?=(\d{3})+$)/g,
          replaceValue: '$1 ',
        }}
      />
      <WppTypography type="m-strong">Our current value is: {value}</WppTypography>
    </>
  )
}
```
