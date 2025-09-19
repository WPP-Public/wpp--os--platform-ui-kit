```tsx
import { WppIconHome, WppIconBoard, WppSegmentedControl, WppSegmentedControlItem } from '@platform-ui-kit/components-library-react'

export const SegmentedControlExample = () => (
  <>
    <WppSegmentedControl value={value}>
      <WppSegmentedControlItem value="1">Item 1</WppSegmentedControlItem>
      <WppSegmentedControlItem value="2" disabled={isDisabled}>Item 2</WppSegmentedControlItem>
      <WppSegmentedControlItem value="3" counter={counterValue}>Item 3</WppSegmentedControlItem>
      <WppSegmentedControlItem value="4">Item 4</WppSegmentedControlItem>
    </WppSegmentedControl>

    <WppSegmentedControl value={value} size="s" hugContentOff width="200px">
      <WppSegmentedControlItem value="1">Item 1</WppSegmentedControlItem>
      <WppSegmentedControlItem value="2">Long item name #2</WppSegmentedControlItem>
    </WppSegmentedControl>

    <WppSegmentedControl variant='icon' value={value}>
      <WppSegmentedControlItem variant='icon' value="1">
        <WppIconHome />
      </WppSegmentedControlItem>
      <WppSegmentedControlItem variant='icon' value="2">
        <WppIconBoard />
      </WppSegmentedControlItem>
    </WppSegmentedControl>
  </>
)
```
