import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'accept-config-example',
  templateUrl: './accept-config.html',
  styleUrls: ['./../../file-upload.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcceptConfig {
  public acceptPNGandHTM = {
    'image/png': ['.png'],
    'text/html': ['.htm'],
  }

  public file = []

  handleFileUploadChange = (event: Event) => {
    this.file = (event as CustomEvent).detail.value
  }
}
