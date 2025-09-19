import { Component } from '@angular/core'

@Component({
  selector: 'overlay-example',
  templateUrl: './overlay-example.page.html',
  styleUrls: ['./overlay-example.page.scss'],
})
export class OverlayExamplePage {
  isVisible = true

  handleOverlayChange() {
    console.log('Overlay Clicked:')
  }

  toggleOverlay(): void {
    this.isVisible = !this.isVisible
  }
}
