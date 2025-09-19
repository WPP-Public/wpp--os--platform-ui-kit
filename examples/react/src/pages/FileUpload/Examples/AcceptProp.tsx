import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'

import styles from '../FileUpload.module.scss'

export const AcceptProp = () => {
  const [file, setFiles] = useState([])
  const handleFileUploadChange = (event: CustomEvent) => {
    setFiles(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.text}>File Upload with provided accept prop</h3>
      <pre>accept=['.png']</pre>
      <WppFileUpload
        value={file}
        onWppChange={handleFileUploadChange}
        data-testid="file-upload-multiple"
        size={1}
        accept={['.png']}
      />
    </div>
  )
}
