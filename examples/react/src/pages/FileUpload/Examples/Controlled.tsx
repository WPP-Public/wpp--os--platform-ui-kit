import { WppButton, WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'
import { FileItemType, FileUploadEventDetail } from '@platform-ui-kit/components-library'

import { fileValidator } from '../utils'
import styles from '../FileUpload.module.scss'

export const Controlled = () => {
  const [files, setFiles] = useState<FileItemType[]>([])
  const handleFileUploadChange = (event: CustomEvent<FileUploadEventDetail>) => {
    setFiles([...(event.detail.value || []), ...event.detail.errorFiles])
  }

  const handleUpdateLoading = (loading: boolean) => () => {
    const updatedFiles = files.map((file, index) => {
      file.isLoading = index === files.length - 1 ? loading : false

      return file
    })

    setFiles(updatedFiles)
  }

  return (
    <div>
      <h3 className={styles.text}>Controlled File Upload </h3>
      <WppFileUpload
        value={files}
        onWppChange={handleFileUploadChange}
        data-testid="file-upload-multiple"
        size={1}
        validator={fileValidator}
        controlled
      />
      <WppButton onClick={handleUpdateLoading(true)}>Add loading</WppButton>
      <WppButton onClick={handleUpdateLoading(false)}>Remove loading</WppButton>
    </div>
  )
}
