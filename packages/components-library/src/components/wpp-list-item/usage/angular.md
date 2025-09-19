#### list-item-example.page.html
```html
<div class="container">
  <div class="items">
    <wpp-typography type='xl-heading'>Single-line</wpp-typography>

    <div class="variants">
      <wpp-list-item class="item">
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <span slot="subtitle">Subtitle</span>
        <span slot="label">Lorem ipsum dolor sit amet,</span>
        <wpp-tag slot="right" label="Positive" variant="positive"></wpp-tag>
      </wpp-list-item>

      <wpp-list-item class="item" checked>
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <span slot="label">Lorem ipsum dolor sit amet,</span>
        <wpp-tag slot="right" label="Positive" variant="positive"></wpp-tag>
      </wpp-list-item>

      <wpp-list-item class="item" disabled>
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <span slot="label">Lorem ipsum dolor sit amet,</span>
        <wpp-tag slot="right" label="Positive" variant="positive"></wpp-tag>
      </wpp-list-item>
    </div>
  </div>

  <div class="items">
    <wpp-typography type='xl-heading'>Two-line</wpp-typography>

    <div class="variants">
      <wpp-list-item class="item" multiple>
        <span slot="label">Text</span>
        <span slot="caption">Caption</span>
      </wpp-list-item>

      <wpp-list-item class="item" multiple checked>
        <span slot="label">Text</span>
        <span slot="caption">Caption</span>
      </wpp-list-item>
    </div>

    <div class="variants">
      <wpp-list-item class="item">
        <span slot="subtitle">Subtitle</span>
        <span slot="label">Text</span>
        <span slot="caption">Caption</span>
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <wpp-icon-mail slot="right"></wpp-icon-mail>
      </wpp-list-item>

      <wpp-list-item class="item" checked>
        <span slot="label">Text</span>
        <span slot="caption">Caption</span>
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <wpp-icon-mail slot="right"></wpp-icon-mail>
      </wpp-list-item>

      <wpp-list-item class="item" disabled>
        <span slot="label">Text</span>
        <span slot="caption">Caption</span>
        <wpp-avatar
          size="s"
          src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
          slot="left"
        ></wpp-avatar>
        <wpp-icon-mail slot="right"></wpp-icon-mail>
      </wpp-list-item>
    </div>

    <wpp-list-item selectable class="item">
      <span slot="label">Selectable Item</span>
      <span slot="caption">Caption</span>
      <wpp-icon-more slot="right"></wpp-icon-more>
    </wpp-list-item>

    <wpp-list-item class="item" selectable multiple>
      <span slot="label">Menu context example</span>
      <span slot="caption">Context check</span>
      <wpp-menu-context slot="right">
        <wpp-action-button slot="trigger-element" variant="secondary">
          <wpp-icon-more slot="icon-start"></wpp-icon-more>
        </wpp-action-button>
        <div>
          <wpp-list-item>
            <p slot="label">Item 1</p>
          </wpp-list-item>
          <wpp-list-item>
            <p slot="label">Item 2</p>
          </wpp-list-item>
        </div>
      </wpp-menu-context>
    </wpp-list-item>
  </div>
</div>
```

#### list-item-example.page.ts
```tsx
import { Component } from '@angular/core';

@Component({…})

export class ListItemExample {
  public checked: boolean = true
  public multiple: boolean = true

  public handleListItemChange(event: CustomEvent): void {
    console.log('event :>> ', event.detail)
  }
}
```
