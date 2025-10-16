```ts
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ChangeColorEventDetails, Theme } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-color-picker-example',
  templateUrl: './color-picker-example.page.html',
  styleUrls: ['./color-picker-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerExamplePage {
  public color: string | undefined
  public savedColors: string[] = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']

  handleSaveColor(event: Event): void {
    const color: string = (event as CustomEvent<string>).detail
    console.log('Saving color:', color)

    this.savedColors = [...this.savedColors, color]
  }

  handleRemoveSavedColor = (event: Event) => {
    const color: string = (event as CustomEvent<string>).detail
    console.log('Removing color:', color)
    const newSavedColors = this.savedColors.filter(item => item !== color)

    this.savedColors = newSavedColors
  }

  handleChangeColor(event: Event): void {
    const emittedColor: ChangeColorEventDetails = (event as CustomEvent<ChangeColorEventDetails>).detail
    console.log('Changing color:', emittedColor)

    if (emittedColor === this.color) {
      return
    }

    if (typeof emittedColor === 'string') {
      this.color = emittedColor
    } else {
      this.color = emittedColor.hexValue
    }
  }
}
```

```html
<div>
  <wpp-typography type="2xl-heading">Hex</wpp-typography>
  <wpp-color-picker
    (wppChange)="handleChangeColor($event)"
    (wppSaveColor)="handleSaveColor($event)"
    (wppRemoveSavedColor)="handleRemoveSavedColor($event)"
    [savedColors]="savedColors"
    mode="theme and custom"
    type="hex"
  >
  </wpp-color-picker>
</div>
```
