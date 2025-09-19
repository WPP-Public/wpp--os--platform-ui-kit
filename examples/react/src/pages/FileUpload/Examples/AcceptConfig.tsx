import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'

import styles from '../FileUpload.module.scss'

export const AcceptConfig = () => {
  const [file, setFiles] = useState([])
  const handleFileUploadChange = (event: CustomEvent) => {
    setFiles(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.text}>File Upload with provided accept config</h3>
      <pre>
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
        acceptConfig={{
          'image/png': ['.png'],
          'text/html': ['.htm'],
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        }}
      />
    </div>
  )
}
