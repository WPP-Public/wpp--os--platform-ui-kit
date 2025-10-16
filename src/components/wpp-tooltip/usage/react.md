```tsx
import { WppTooltip } from '@wppopen/components-library-react'
import { renderToString } from 'react-dom/server'

export const TooltipExample = () => (
  <>
    <WppTooltip text="Message">
      <div>Anchor</div>
    </WppTooltip>

    <WppTooltip placement="left" header="Title" text="Message" value="42">
      <WppButton>Apply</WppButton>
    </WppTooltip>

    <WppTooltip isError placement="bottom" text="Should be a valid email">
      <WppInput
        labelConfig={labelConfig}
        value={emailValue}
      />
    </WppTooltip>
  </>
)


const renderString = renderToString(
  <div>
    <WppTypography>This Node Element is created as HTML and parsed to string</WppTypography>
    <WppButton>button</WppButton>
  </div>,
)

export const TooltipWithAllowHTML = () => (
  <WppTooltip
    config={{ placement: 'right', allowHTML: true }}
    text={renderString}
  >
    <WppButton>
      Allow HTML tooltip
    </WppButton>
  </WppTooltip>
)
```

