import { useState } from 'react'
import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import styles from './FileUploadVC.module.scss'
import { FileUploadLocales } from '@platform-ui-kit/components-library'

export const FileUploadVC = () => {
  const [hasError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileUploadChange = (event: CustomEvent) => {
    console.log(`File Upload ${event.detail.name ?? '(unnamed)'} changed:`, event.detail)
  }

  const handleFileUploadErrorChange = (event: CustomEvent) => {
    console.log(`File Upload ${event.detail.name ?? '(unnamed)'} error event:`, event.detail)
    if (event.detail.hasError) {
      setError(event.detail.hasError)
      setErrorMessage(`${event.detail.errorFiles.length} files have to be successfully uploaded`)

      return
    }

    setError(false)
    setErrorMessage('')
  }

  const spanishLocale: FileUploadLocales = {
    label: 'Escoge un archivo',
    text: 'para subirlo o arrastrarlo aquí',
    info: (accept: string, size: number) => `Solamente ${accept} archivo a ${size} MB o menos`,
    sizeError: 'El archivo supera el límite de tamaño',
    formatError: 'Formato erróneo',
  }

  const twoLineLocale: FileUploadLocales = {
    label: 'Choose a file',
    text: 'to upload or drag it here, only .jpg, .jpeg, .png can be uploaded',
    info: () => `Only .jpg, .jpeg, .png file at 50 MB or less. Supported formats include JPEG, JPG, PNG.`,
    sizeError: 'File exceeds size limit',
    formatError: 'Wrong format',
  }

  return (
    <div className={styles.container} data-testid="file-uploads">
      <div className={styles.items}>
        <h3 className={styles.text}>Default File Upload</h3>
        <WppFileUpload name="file-upload" onWppChange={handleFileUploadChange} acceptConfig={{}} />

        <h3 className={styles.text}>Default File Upload (Single File)</h3>
        <WppFileUpload name="single-upload" multiple={false} onWppChange={handleFileUploadChange} />

        <h3 className={styles.text}>Disabled File Upload</h3>
        <WppFileUpload name="disabled-upload" disabled />

        <h3 className={styles.text}>File Upload with Spanish locale</h3>
        <WppFileUpload
          name="spanish-upload"
          multiple={false}
          onWppChange={handleFileUploadChange}
          accept={['.bmp']}
          size={9}
          locales={spanishLocale}
        />

        <h3 className={styles.text}>File Upload with 2 line text info</h3>
        <WppFileUpload
          name="two-line-upload"
          onWppChange={handleFileUploadChange}
          data-testid="two-line-text-info"
          locales={twoLineLocale}
        />
      </div>

      <div className={styles.items}>
        <h3 className={styles.text}>File Upload with no file limits</h3>
        <WppFileUpload
          name="no-limits-upload"
          onWppChange={handleFileUploadChange}
          accept={[]}
          data-testid="uploader"
        />

        <h3 className={styles.text}>File Upload with label, description and custom width</h3>
        <WppFileUpload name="labeled-upload" className={styles.loader} onWppChange={handleFileUploadChange}>
          <h3 slot="label">Baseplan</h3>
          <p slot="description">Download template, fill and upload it into this area</p>
        </WppFileUpload>

        <h3 className={styles.text}>File Upload with different accept format and size</h3>
        <WppFileUpload
          name="custom-accept-upload"
          onWppChange={handleFileUploadChange}
          accept={['.mov', '.avi']}
          size={100}
        />

        <h3 className={styles.text}>File Upload with errors</h3>
        <WppFileUpload
          name="error-upload"
          onWppChange={handleFileUploadErrorChange}
          size={1}
          className={styles.fileLoader}
          messageType={hasError ? 'error' : undefined}
          message={errorMessage}
          data-testid="uploader-with-error"
        />
      </div>
    </div>
  )
}
