import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'

import styles from '../FileUpload.module.scss'

export const AcceptConfigAndAcceptProp = () => {
  const [file, setFiles] = useState([])
  const handleFileUploadChange = (event: CustomEvent) => {
    setFiles(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.text}>File Upload with provided accept config and accept prop</h3>
      <pre>
        accept=['.jpg', '.jpeg']
        <br />
        acceptConfig=
        {JSON.stringify(
          {
            'image/png': ['.png'],
            'text/html': ['.htm'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
          },
          null,
          2,
        )}
      </pre>
      <WppFileUpload
        value={file}
        onWppChange={handleFileUploadChange}
        data-testid="file-upload-multiple"
        size={1}
        accept={['.jpg', '.jpeg']}
        acceptConfig={{
          'image/png': ['.png'],
          'text/html': ['.htm'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        }}
      />
    </div>
  )
}
