```tsx
import React from 'react'

import styles from './StickyBar.module.scss'
import { WppStickyBar, WppTypography } from '@wppopen/components-library-react'
import { validButtonsList, validTabsList } from './consts'

import {
  StickyBarButtonItem,
  StickyBarTabItem,
} from '@wppopen/components-library/dist/types/components/wpp-sticky-bar/types'
import { WppStickyBarCustomEvent } from '@wppopen/components-library/dist/types/components'

export const StickyBarPage = () => (
  <>
    <WppStickyBar
      onWppClickBackIcon={() => {
        console.log('Has Clicked Back Icon')
      }}
      onWppClickBtn={(event: WppStickyBarCustomEvent<StickyBarButtonItem>) => console.log(event)}
      onWppClickTab={(event: WppStickyBarCustomEvent<StickyBarTabItem>) => console.log(event)}
      variant="two-lines-with-tabs"
      buttons={validButtonsList}
      tabs={validTabsList}
      barTitle={'Page Title'}
    ></WppStickyBar>
    <div className={styles.container}>
      <div className={styles.additionalSpace}>
        <WppTypography type="2xl-heading">Additional space on page</WppTypography>
      </div>
    </div>
  </>
)
```

```scss
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
}

.additionalSpace {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 70%;
  height: 500vh;
  padding: 50px;
  background: rgb(173 216 230);
  border: 4px dashed gray;
  border-radius: 50px;
  opacity: 0.5;
}
```

```ts
import { StickyBarTabItem } from '@wppopen/components-library/dist/types/components/wpp-sticky-bar/types'
import { StickyBarButtonItem } from '@wppopen/components-library/dist/types/components/wpp-sticky-bar/types'

export const validButtonsList: StickyBarButtonItem[] = [
  {
    variant: 'primary',
    text: 'Primary',
  },
  {
    variant: 'secondary',
    text: 'Secondary 1',
  },
  {
    variant: 'secondary',
    text: 'Secondary 2',
  },
  {
    variant: 'action-button',
    text: 'Action Btn',
  },
]

export const validTabsList: StickyBarTabItem[] = [
  {
    text: 'Tab 1',
    value: 'tab1',
  },
  {
    text: 'Tab 2',
    value: 'tab2',
  },
  {
    text: 'Tab 3',
    value: 'tab3',
  },
  {
    text: 'Tab 4',
    value: 'tab4',
  },
  {
    text: 'Tab 5',
    value: 'tab5',
  },
]
```
