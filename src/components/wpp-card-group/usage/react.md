```tsx
import React from 'react'
import { WppCard, WppCardGroup, WppTypography } from '@wppopen/components-library-react'
import { CardGroupChangeEventDetail } from '@wppopen/components-library'

export const CardGroupExample = () => {
  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
  }

  const handleSingleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
  }

  return (
    <>
      <WppCardGroup multiple value={['item-a', 'item-c']} onWppChange={handleMultipleCardGroupChange}>
        <WppCard value="item-a">
          <div>
            Information about item a
          </div>
          <WppTypography slot="header">Item A</WppTypography>
        </WppCard>
        <WppCard value="item-b">
          <div>
            Information about item b
          </div>
          <WppTypography slot="header">Item B</WppTypography>
        </WppCard>
        <WppCard value="item-c">
          <div>
            Information about item c
          </div>
          <WppTypography slot="header">Item C</WppTypography>
        </WppCard>
      </WppCardGroup>

      <WppCardGroup value="item-a" withRadioOrCheckbox={false} onWppChange={handleSingleCardGroupChange}>
        <WppCard value="item-a" >
          <WppTypography slot="header">Item A</WppTypography>
        </WppCard>
        <WppCard value="item-b" >
          <WppTypography slot="header">Item B</WppTypography>
        </WppCard>
        <WppCard value="item-c" >
          <WppTypography slot="header">Item C</WppTypography>
        </WppCard>
      </WppCardGroup>
    </>
  )
}
```
