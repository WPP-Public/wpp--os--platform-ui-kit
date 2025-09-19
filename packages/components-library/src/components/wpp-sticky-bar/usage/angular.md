```ts
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StickyBarButtonItem, StickyBarTabItem } from '@platform-ui-kit/components-library'
import { btns_list_1, tabs_list_1 } from './consts'

@Component({
  selector: 'sticky-bar-example',
  templateUrl: './sticky-bar.page.html',
  styleUrls: ['./sticky-bar.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyBarExamplePage {
  public validButtonsList: StickyBarButtonItem[] = btns_list_1 as StickyBarButtonItem[]

  public validTabsList: StickyBarTabItem[] = tabs_list_1

  public handleClickBackIcon = () => {
    console.log('Has Clicked Back Icon')
  }

  public handleClickBtn = (event: Event) => {
    console.log((event as CustomEvent).detail)
  }

  public handleClickTab = (event: Event) => {
    console.log((event as CustomEvent).detail)
  }
}
```

```html
<wpp-sticky-bar
  variant="two-lines-with-tabs"
  [tabs]="validTabsList"
  [buttons]="validButtonsList"
  [barTitle]="'Page Title'"
  (wppClickBackIcon)="handleClickBackIcon()"
  (wppClickBtn)="handleClickBtn($event)"
  (wppClickTab)="handleClickTab($event)"
></wpp-sticky-bar>
<div data-testid="sticky-bar-container" class="container">
  <div class="additionalSpace">
    <wpp-typography type="2xl-heading">Additional space on page</wpp-typography>
  </div>
</div>
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
export const btns_list_1 = [
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

export const tabs_list_1 = [
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
