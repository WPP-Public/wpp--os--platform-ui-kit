import { ChangeDetectionStrategy, Component } from '@angular/core'

import { FileUploadEventDetail, FileUploadLocales } from '@platform-ui-kit/components-library'
import { FileItemType } from '@platform-ui-kit/components-library'

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

  public twoLineLocale: FileUploadLocales = {
    label: 'Choose a file',
    text: 'to upload or drag it here, only .jpg, .jpeg, .png can be uploaded',
    info: () => `Only .jpg, .jpeg, .png file at 50 MB or less. Supported formats include JPEG, JPG, PNG.`,
    sizeError: 'File exceeds size limit',
    formatError: 'Wrong format',
  }

  defaultValueWithUrl = {
    url: 'https://test.png',
    name: 'below_1MB-file-1.png',
    size: 171615,
    type: '',
  }

  public file = [this.defaultValueWithUrl]
  public accept = {
    'video/quicktime': ['.mov'],
    'video/x-msvideo': ['.avi'],
  }
  public acceptPNG = {
    'image/png': ['.png'],
  }
  public formatPNG = ['.png']
  public formatJPG = ['.jpg', '.jpeg']

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

    console.log(
      JSON.stringify(
        this.transformChangeDetailToJson({
          ...(event as CustomEvent).detail,
          eventType: 'wppChange',
        }),
      ),
    )
    this.hasError = false
    this.errorMessage = ''
    this.messageType = undefined
    this.file = (event as CustomEvent).detail.value
  }

  mapFileArrayToObject = (arr: FileItemType[] | undefined) =>
    arr?.map(elem => {
      if ('url' in elem) return elem

      return { name: elem.name, size: elem.size }
    })

  transformChangeDetailToJson = (obj: FileUploadEventDetail) => {
    const value = this.mapFileArrayToObject(obj.value)
    const errorFiles = this.mapFileArrayToObject(obj.errorFiles)

    return {
      ...obj,
      value,
      errorFiles,
    }
  }
}
