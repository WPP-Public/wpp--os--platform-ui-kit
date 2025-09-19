import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-uploadVC.html',
  styleUrls: ['./file-uploadVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadVC {
  public hasError = false
  public errorMessage = ''
  public state: string | undefined = ''
  public spanishLocale = {
    label: 'Escoge un archivo',
    text: 'para subirlo o arrastrarlo aquí',
    info: (accept: string, size: number) => `Solamente ${accept} archivo a ${size} MB o menos`,
    sizeError: 'El archivo supera el límite de tamaño',
    formatError: 'Formato erróneo',
  }
  public twoLineLocale = {
    label: 'Choose a file',
    text: 'to upload or drag it here, only .jpg, .jpeg, .png can be uploaded',
    info: () => `Only .jpg, .jpeg, .png file at 50 MB or less. Supported formats include JPEG, JPG, PNG.`,
    sizeError: 'File exceeds size limit',
    formatError: 'Wrong format',
  }
  public acceptBMP = ['.bmp']
  public acceptAll = []
  public acceptVideo = ['.mov', '.avi']

  public handleFileUploadChange = (event: Event) => {
    console.log('event :>> ', (event as CustomEvent).detail)
  }

  public handleFileUploadErrorChange = (event: Event) => {
    console.log('event :>> ', (event as CustomEvent).detail)
    if ((event as CustomEvent).detail.hasError) {
      this.hasError = (event as CustomEvent).detail.hasError
      this.errorMessage = `${(event as CustomEvent).detail.errorFiles.length} files have to be successfully uploaded`
      this.state = 'error'

      return
    }

    this.hasError = false
    this.errorMessage = ''
    this.state = undefined
  }
}
