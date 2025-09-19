import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'no-limitations-example',
  templateUrl: './no-limitations.html',
  styleUrls: ['./../../file-upload.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoLimitations {
  public acceptNoLimit = {}
  public acceptPropNoLimit = []
  public file = []

  handleFileUploadChange = (event: Event) => {
    this.file = (event as CustomEvent).detail.value
  }
}
