```tsx
import { WppInlineMessage } from '@platform-ui-kit/components-library-react'

export const InlineMessageExample = () => (
  <>
    <WppInlineMessage size="s" message="Warning message" type="warning" showTooltipFrom={10} />
    <WppInlineMessage size="m" message="Warning message" type="warning" />
    <WppInlineMessage
      size="l"
      actionBtnText="Action"
      hideCloseBtn={false}
      titleText="Title"
      message="Success message"
      type="success"
      onWppClickCloseBtn={() => {
        console.log('Clicked Close')
      }}
      onWppClickActionBtn={() => {
        console.log('Clicked Action Btn')
      }}
    />
  </>
)
```
