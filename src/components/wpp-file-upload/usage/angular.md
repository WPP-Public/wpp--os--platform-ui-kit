#### file-upload.page.html
```html
<div class="container" data-testid="file-uploads">
  <div class="items">
    <wpp-typography type="xl-heading" class="text">Default File Upload</wpp-typography>
    <wpp-file-upload name="file-upload" (wppChange)="handleFileUploadChange($event)"></wpp-file-upload>

    <wpp-typography type="xl-heading" class="text">Default File Upload (Single File)</wpp-typography>
    <wpp-file-upload [multiple]='isMultiple' (wppChange)="handleFileUploadChange($event)"></wpp-file-upload>

    <wpp-typography type="xl-heading" class="text">Disabled File Upload</wpp-typography>
    <wpp-file-upload disabled></wpp-file-upload>

    <wpp-typography type="xl-heading" class="text">File Upload with Spanish locale</wpp-typography>
    <wpp-file-upload
      [multiple]="isMultiple"
      (wppChange)="handleFileUploadChange($event)"
      [acceptConfig]="acceptForSpanish"
      size="9"
      [locales]="spanishLocale"
    ></wpp-file-upload>
  </div>

  <div class="items">
    <wpp-typography type="xl-heading" class="text">File Upload with no file limits</wpp-typography>
    <wpp-file-upload (wppChange)="handleFileUploadChange($event)" [acceptConfig]="acceptNoLimit" [accept]="acceptPropNoLimit" data-testid="uploader"></wpp-file-upload>

    <wpp-typography type="xl-heading" class="text">File Upload with different accept format and size</wpp-typography>
    <wpp-file-upload (wppChange)="handleFileUploadChange($event)" [acceptConfig]="accept" size="100"></wpp-file-upload>

    <wpp-typography type="xl-heading" class="text">File Upload with errors</wpp-typography>
    <wpp-file-upload
      size='1'
      (wppChange)="handleFileUploadChange($event)"
      [messageType]="messageType"
      [message]="errorMessage"
    ></wpp-file-upload>
  </div>
</div>
```

#### file-upload.page.ts
```tsx
import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FileUploadEventDetail, FileUploadLocales } from '@platform-ui-kit/components-library'

@Component({
  selector: 'file-upload-example',
  templateUrl: './file-upload.page.html',
  styleUrls: ['./file-upload.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadExamplePage {
  public spanishLocale: FileUploadLocales = {
    label: 'Escoge un archivo',
    text: 'para subirlo o arrastrarlo aquí',
    info: (accept: string, size: number) => `Solamente ${accept} archivo a ${size} MB o menos`,
    sizeError: 'El archivo supera el límite de tamaño',
    formatError: 'Formato erróneo',
  }

  public accept = {
    'video/quicktime': ['.mov'],
    'video/x-msvideo': ['.avi'],
  }
  public acceptNoLimit = {}
  public acceptForSpanish = {
    'image/png': ['.png'],
  }
  public isMultiple = false

  public hasError = false
  public errorMessage = ''
  public messageType: string | undefined = undefined

  public handleFileUploadChange(event: Event): void {
    const { hasError, errorFiles } = (event as CustomEvent<FileUploadEventDetail>).detail

    if (hasError) {
      this.hasError = true
      this.errorMessage = `${errorFiles.length} files have to be successfully uploaded`
      this.messageType = 'error'

      return
    }

    this.hasError = false
    this.errorMessage = ''
    this.messageType = undefined
  }
}
```
