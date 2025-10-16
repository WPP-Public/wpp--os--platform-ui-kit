```tsx
import { WppProgressIndicator } from '@wppopen/components-library-react'

export const ProgressIndicatorExample = () => (
  <>
    {/* Without value: shows indeterminate */}
    <WppProgressIndicator variant="circle" />

    {/* value=0 but forceIntermediateEmptyState=true: shows 0% empty state */}
    <WppProgressIndicator
      variant="circle"
      value={0}
      forceIntermediateEmptyState
      isShowPercentage
      label="0%"
    />

    {/* With value>0: shows defined progress */}
    <WppProgressIndicator variant="circle" value={50} />
  </>
)
```
