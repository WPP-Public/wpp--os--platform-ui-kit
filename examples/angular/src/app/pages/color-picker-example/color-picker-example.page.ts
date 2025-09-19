import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ChangeColorEventDetails, Theme } from '@platform-ui-kit/components-library'
import themeJson from '@platform-ui-kit/components-library/dist/collection/wpp-theme.json'

@Component({
  selector: 'app-color-picker-example',
  templateUrl: './color-picker-example.page.html',
  styleUrls: ['./color-picker-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerExamplePage {
  public color: string | undefined
  public savedColors: string[] = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']
  public theme: Theme = themeJson
  public initialColorHex: string = '#CC4B00'
  public initialColorRGBA: string = 'rgba(204, 75, 0, 1)'

  handleSaveColor(event: Event): void {
    const color: string = (event as CustomEvent<string>).detail

    console.log('Saving color:', color)

    this.savedColors = [...this.savedColors, color]
  }

  handleRemoveSavedColor = (event: Event) => {
    const color: string = (event as CustomEvent<string>).detail

    console.log('Removing color:', color)
    const newSavedColors = this.savedColors.filter(item => item !== color)

    console.log('Removing color:', color)

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
