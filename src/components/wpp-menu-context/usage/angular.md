#### menu-context.example.page.html
```html
<div class="context">
  <h3>The list is the Same Width as a Button</h3>
  <wpp-menu-context [dropdownConfig]="dropdownConfig">
    <wpp-button disabled="false" slot="trigger-element" data-testid="same-width-button" class="long-button">
      Click to open
    </wpp-button>
    <div>
      <wpp-list-item>
        <wpp-icon-plus slot="left"></wpp-icon-plus>
        <p slot="label">Item 1</p>
      </wpp-list-item>
      <wpp-list-item active>
        <p slot="label">Item 2</p>
      </wpp-list-item>
      <wpp-list-item disabled>
        <p slot="label">Item 3</p>
      </wpp-list-item>
      <wpp-list-item>
        <p slot="label">Item 4</p>
        <wpp-icon-success slot="right"></wpp-icon-success>
      </wpp-list-item>
      <wpp-list-item>
        <wpp-icon-plus slot="left"></wpp-icon-plus>
        <p slot="label">withPlus</p>
      </wpp-list-item>
      <wpp-list-item>
        <p slot="label">With label</p>
      </wpp-list-item>
      <wpp-list-item value="text">
        <p slot="label">With value</p>
      </wpp-list-item>
      <wpp-list-item [linkConfig]="linkConfig">
        <p slot="label">Link</p>
      </wpp-list-item>
      <wpp-list-item [linkConfig]="linkConfig">
        <p slot="label">Link with preventDefault</p>
      </wpp-list-item>
    </div>
  </wpp-menu-context>
</div>

<div class="context">
  <h3>Expandable Nested List with Fixed Width</h3>
  <wpp-menu-context list-width="100px" [appendToListWrapper]='true'>
    <wpp-button slot="trigger-element" data-testid="fixed-width-button">
      Click to open
    </wpp-button>
    <div>
      <wpp-list-item>
        <wpp-icon-plus slot="left"></wpp-icon-plus>
        <p slot="label">Lorem ipsum dolor sit amet, consectetur</p>
      </wpp-list-item>
      <wpp-list-item>
        <p slot="label">Pellentesque venenatis eget diam sit amet dictum</p>
        <wpp-icon-cross slot="right"></wpp-icon-cross>
      </wpp-list-item>
      <wpp-menu-context [appendToListWrapper]='true'>
        <wpp-list-item slot="trigger-element" [isExtended]='true'>
          <p slot="label">Extendable Item</p>
        </wpp-list-item>
        <div>
          <wpp-menu-context [appendToListWrapper]='true'>
            <wpp-list-item slot="trigger-element" [isExtended]='true'>
              <p slot="label">SubItem 1</p>
            </wpp-list-item>
            <div>
              <wpp-list-item>
                <p slot="label">SubItem 2</p>
              </wpp-list-item>
              <wpp-list-item>
                <p slot="label">SubItem 3</p>
              </wpp-list-item>
              <wpp-list-item>
                <p slot="label">SubItem 3</p>
              </wpp-list-item>
              <wpp-list-item>
                <p slot="label">SubItem 3</p>
              </wpp-list-item>
              <wpp-list-item>
                <p slot="label">SubItem 3</p>
              </wpp-list-item>
            </div>
          </wpp-menu-context>
          <wpp-list-item disabled>
            <p slot="label">SubItem 2</p>
          </wpp-list-item>
          <wpp-list-item>
            <p slot="label">SubItem 3</p>
          </wpp-list-item>
        </div>
      </wpp-menu-context>
      <wpp-list-item>
        <p slot="label">Nulla sit amet bibendum augue curabitur non erat purus</p>
      </wpp-list-item>
    </div>
  </wpp-menu-context>
</div>
```

#### menu-context.example.page.ts
```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'menu-context-example',
  templateUrl: './menu-context-example.page.html',
  styleUrls: ['./menu-context-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContextVC {
  public dropdownConfig = { triggerElementWidth: true }
  public linkConfig = { href: 'https://google.com', target: '_blank' }
  public listWidth = '150px'
}
```
