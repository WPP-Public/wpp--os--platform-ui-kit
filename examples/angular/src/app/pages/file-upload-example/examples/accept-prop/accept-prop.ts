import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'accept-prop-example',
  templateUrl: './accept-prop.html',
  styleUrls: ['./../../file-upload.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptProp {
  public formatPNG = ['.png']
  public file = []

  handleFileUploadChange = (event: Event) => {
    this.file = (event as CustomEvent).detail.value
  }
}
