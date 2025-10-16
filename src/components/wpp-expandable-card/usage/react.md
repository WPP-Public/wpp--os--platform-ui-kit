```tsx
import React from 'react'
import {
  WppExpandableCard,
  WppProgressIndicator,
  WppInput,
  WppTypography,
} from '@wppopen/components-library-react'
import { ExpandableCardSectionChangeEventDetail } from '@wppopen/components-library'

export const ExpandableCardExample = () => {
  const handleChange = (event: CustomEvent<ExpandableCardSectionChangeEventDetail>) => {
    console.log('e ====>', event.detail.expanded)
  }

  return (
    <>
      <WppExpandableCard expanded onWppChange={handleChange}>
        <WppTypography type="m-strong" slot="header">Governance & Ethics</WppTypography>
        <WppTypography>
          Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
          business imperative for ensuring sustainable success
        </WppTypography>
      </WppExpandableCard>

      <WppExpandableCard>
        <WppTypography type="m-strong" slot="header">What's next</WppTypography>
        <div>
          <WppTypography>
            Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
            business imperative for ensuring sustainable success
          </WppTypography>
          <WppInput />
        </div>
        <WppActionButton variant="secondary" slot="actions">
          Action
          <WppIconEdit slot="icon-start" />
        </WppActionButton>
      </WppExpandableCard>
    </>
  )
}

```
