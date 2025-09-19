```tsx
import React, { useState } from 'react'
import { WppBanner } from '@platform-ui-kit/components-library-react'

export const BannerExample = () => {
  const [isToShowBanner, setIsToShowBanner] = useState(true)

  const handleBannerShowStateChange = (event: CustomEvent) => {
    setIsToShowBanner(event.detail.show)
  }

  return (
    <>
      <WppBanner type="information" show={isToShowBanner} closable onWppClose={handleBannerShowStateChange}>
        Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of
        text.
      </WppBanner>
    </>
  )
}
```
