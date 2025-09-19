```tsx
import React, { useRef } from 'react'

import {
  WppPopover,
  WppTypography,
  WppButton,
  WppActionButton,
  WppIconCross,
  WppDivider,
} from '@platform-ui-kit/components-library-react'

export const PopoversVCPage = () => {
  const defaultPopoverRef = useRef<HTMLWppPopoverElement>(null)

  const handleCloseButtonClick = () => {
    defaultPopoverRef?.current?.closePopover()
  }

  const handleSubmitButtonClick = () => {
    alert('Some message')
  }

  return (
    <WppPopoverclosable
      config={{ appendTo: () => document.querySelector('#root')! }} // This config is required for React to work with different handlers like 'onClick'
      ref={defaultPopoverRef}
    >
      <WppButton variant="secondary" slot="trigger-element">
        Trigger button to open Popover
      </WppButton>
      <div>
        <div>
          <WppTypography type="m-strong">Title</WppTypography>
        </div>
        <WppDivider />
        <div>
          <WppTypography>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          </WppTypography>
        </div>
        <WppDivider />
        <div>
          <WppActionButton variant="secondary" className={styles.secondaryButton} onClick={handleCloseButtonClick}>
            Close
          </WppActionButton>
          <WppActionButton onClick={handleSubmitButtonClick}>Submit</WppActionButton>
        </div>
      </div>
    </WppPopover>
  )
}
```
