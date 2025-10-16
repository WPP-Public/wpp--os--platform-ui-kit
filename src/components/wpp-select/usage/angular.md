### single-select-example.page.html

```html
<div class="container">
  <div class="section">
    <wpp-typography type="2xl-heading">Default Select</wpp-typography>

    <div class="content">
      <wpp-select
        name="select-component"
        class="selectItem"
        data-testid="default-single-select-m"
        [list]="SAMPLE_LIST"
        [labelConfig]="{ text: 'Size M' }"
        placeholder="Choose option"
        [value]="value"
        [autoFocus]="true"
        (wppChange)="handleChange($event)"
      ></wpp-select>

      <wpp-select
        name="select-component"
        class="selectItem"
        data-testid="default-single-select-s"
        [list]="SAMPLE_LIST"
        [labelConfig]="{ text: 'Size S' }"
        placeholder="Choose option"
        [value]="value"
        [autoFocus]="true"
        size="s"
        (wppChange)="handleChange($event)"
      ></wpp-select>
    </div>
  </div>
</div>
```

### single-select-example.page.ts

```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ListItemInterface } from '@wppopen/components-library'

const SAMPLE_LIST: ListItemInterface[] = [
  {
    label: 'This is the end',
    value: 'end',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    label: 'Tree',
    value: 'tree',
    checked: true,
  },
  {
    label: 'Car',
    value: 'car',
    disabled: true,
  },
  {
    label: 'House',
    value: 'house',
    slots: [
      {
        type: 'wpp-icon-success',
        props: {
          slot: 'right',
        },
      },
    ],
  },
  {
    label: 'Magazine',
    value: 'magazine',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    label: 'Website',
    value: 'website',
  },
]

@Component({
  selector: 'app-single-select-example',
  templateUrl: './single-select-example.page.html',
  styleUrls: ['./single-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectPage {
  public SAMPLE_LIST: ListItemInterface[] = SAMPLE_LIST
  public value = ''

  handleChange(event: Event) {
    const customEvent = event as CustomEvent
    console.log('On Change single', customEvent.detail)
    this.value = customEvent.detail.value
  }
}
```

### single-select-example.page.scss

```scss
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;

  .section {
    width: 900px;
    margin-bottom: 40px;

    .content {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;

      .selectItem {
        width: 300px;
      }
    }
  }
}
```

### combined-select-example.page.ts

```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ListItemInterface } from '@wppopen/components-library'

const SAMPLE_LIST: ListItemInterface[] = [
  {
    id: 1,
    label: 'None',
    value: '',
  },
  {
    id: 2,
    label: 'UAH',
    value: 'uah',
  },
  {
    id: 3,
    label: 'USD',
    value: 'usd',
  },
  {
    id: 4,
    label: 'EUR',
    value: 'eur',
  },
]

@Component({
  selector: 'app-combined-select-example',
  templateUrl: './combined-select-example.page.html',
  styleUrls: ['./combined-select-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedSelectPage {
  public SAMPLE_LIST_COMBINED = SAMPLE_LIST
  public value = ''

  handleChange(event: Event) {
    const customEvent = event as CustomEvent
    console.log('On Change combined', customEvent.detail)
    this.value = customEvent.detail.value
  }
}
```

### combined-select-example.page.html

```html
<div class="container">
  <div class="section">
    <wpp-typography type="2xl-heading">Default Combined Select</wpp-typography>

    <div class="content">
      <wpp-select
        type="combined"
        name="select-component"
        class="selectItem"
        data-testid="default-combined-select-m"
        [list]="SAMPLE_LIST_COMBINED"
        [labelConfig]="{ text: 'Size M' }"
        placeholder="Choose option"
        [value]="value"
        autoFocus
        (wppChange)="handleChange($event)"
      ></wpp-select>

      <wpp-select
        type="combined"
        name="select-component"
        class="selectItem"
        data-testid="default-combined-select-s"
        [list]="SAMPLE_LIST_COMBINED"
        [labelConfig]="{ text: 'Size S' }"
        placeholder="Choose option"
        [value]="value"
        autoFocus
        size="s"
        (wppChange)="handleChange($event)"
      ></wpp-select>
    </div>
  </div>
</div>
```
