```tsx
import React, { useState } from 'react'
import { WppTabs, WppTab, WppTypography } from '@platform-ui-kit/components-library-react'
import { TabsChangeEventDetail } from '@platform-ui-kit/components-library'

export const TabsExample = () => {
  const [currentTab, setCurrentTab] = useState('cars')

  const handleTabChange = (event: CustomEvent<TabsChangeEventDetail>) => {
    setCurrentTab(event.detail.value)
  }

  return (
    <>
      <WppTabs value={currentTab} onWppChange={handleTabChange}>
        <WppTab value='houses'>Houses</WppTab>
        <WppTab value='cars'>Cars</WppTab>
        <WppTab disabled counter={2} value='food'>
          Food
        </WppTab>
        <WppTab value='drinks'>Drinks</WppTab>
      </WppTabs>
      {
        {
          houses: (
            <WppTypography type="xs-body-regular" className="tab-content">
              First content
            </WppTypography>
          ),
          cars: (
            <WppTypography type="xs-body-regular" className="tab-content">
              Second content
            </WppTypography>
          ),
          drinks: (
            <WppTypography type="xs-body-regular" className="tab-content">
              Fourth content
            </WppTypography>
          ),
        }[currentTab]
      }
    </>
  )
}
```
