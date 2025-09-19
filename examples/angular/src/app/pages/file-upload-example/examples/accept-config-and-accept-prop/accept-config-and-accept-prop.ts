import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'accept-config-and-prop-example',
  templateUrl: './accept-config-and-accept-prop.html',
  styleUrls: ['./../../file-upload.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptConfigAndAcceptProp {
  public acceptPNGandHTM = {
    'image/png': ['.png'],
    'text/html': ['.htm'],
  }
  public file = []

  handleFileUploadChange = (event: Event) => {
    this.file = (event as CustomEvent).detail.value
  }
}
