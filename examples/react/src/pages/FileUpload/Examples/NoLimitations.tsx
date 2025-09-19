import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'

import styles from '../FileUpload.module.scss'

export const NoLimitations = () => {
  const [file, setFiles] = useState([])
  const handleFileUploadChange = (event: CustomEvent) => {
    setFiles(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.text}>File Upload with no limitations</h3>
      <pre>
        accept=[]
        <br />
        acceptConfig={}
      </pre>
      <WppFileUpload
        value={file}
        onWppChange={handleFileUploadChange}
        data-testid="file-upload-multiple"
        size={50}
        // accept={[]}
        acceptConfig={{
          // 'video/x-msvideo': ['.avi'],
          'video/avi': ['.avi'],
        }}
      />
    </div>
  )
}
