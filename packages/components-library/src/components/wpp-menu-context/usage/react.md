```tsx
import {
  WppMenuContext,
  WppListItem,
  WppButton,
  WppIconAdd,
  WppIconAddCircle,
} from '@platform-ui-kit/components-library-react'

export const MenuContextExample = () => (
  <>
    <WppMenuContext>
      <WppButton slot="trigger-element">Click to open</WppButton>
      <div>
        <WppListItem>
          <WppIconAddCircle slot="icon-start" />
          <p slot="label"></p>Item 1
        </WppListItem>
        <WppListItem><p slot="label">Item 2</p></WppListItem>
        <WppListItem><p slot="label">Item 3</p></WppListItem>
        <WppListItem><p slot="label">Item 4</p></WppListItem>
      </div>
    </WppMenuContext>

    <WppMenuContext>
      <WppButton slot="trigger-element">Click to open</WppButton>
      <div>
        <WppListItem>
          <WppIconAddCircle slot="icon-start" />
          <p slot="label">Item 1</p>
        </WppListItem>
        <WppListItem>
          <p slot="label">Item 2</p>
          <WppIconAdd slot="icon-end" />
        </WppListItem>
        <WppMenuContext>
          <WppListItem slot="trigger-element" isExtended><p slot="label">Item 3</p></WppListItem>
          <div>
            <WppListItem><p slot="label">SubItem 1</p></WppListItem>
            <WppListItem disabled><p slot="label">SubItem 2</p></WppListItem>
            <WppListItem><p slot="label">SubItem 3</p></WppListItem>
          </div>
        </WppMenuContext>
        <WppListItem><p slot="label">Item 4</p></WppListItem>
      </div>
    </WppMenuContext>
  </>
)
```
