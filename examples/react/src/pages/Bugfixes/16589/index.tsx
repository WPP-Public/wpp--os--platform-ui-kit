import { WppButton, WppFileUpload, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useState } from 'react'
import { FileItemType, FileUploadEventDetail } from '@platform-ui-kit/components-library'
import { fileValidator } from '../../FileUpload/utils'

const FileUploadBugfix = () => {
  const [files, setFiles] = useState<FileItemType[]>([])
  const [showOnlyNewErrors, setShowOnlyNewErrors] = useState<boolean>(false)
  const [isMultiple, setIsMultiple] = useState<boolean>(true)

  const mapFileArrayToObject = (arr: FileItemType[] | undefined) =>
    arr?.map(elem => {
      if ('url' in elem) return elem

      return { name: elem.name, size: elem.size }
    })

  const transformChangeDetailToJson = (obj: FileUploadEventDetail) => {
    const value = mapFileArrayToObject(obj.value)
    const errorFiles = mapFileArrayToObject(obj.errorFiles)

    return {
      ...obj,
      value,
      errorFiles,
    }
  }

  const handleFileUploadChange = (event: CustomEvent) => {
    console.log(JSON.stringify(transformChangeDetailToJson({ ...event.detail, eventType: 'wppChange' })))
    setFiles(event.detail.value)
  }

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-16589">
            Bugfix #16589 - 2+ files with error state are uploaded
          </a>
        </h1>
      </div>
      <div>
        <div className={styles.examplesRow}>
          <WppTypography type="m-strong">
            Click the button to change the way the errors are shown on the file-upload component
          </WppTypography>
          <WppTypography class={styles.infoText}>
            - Show New errors: this option will show the error messages from the last action, discarding the old ones
            (if any)
          </WppTypography>
          <WppTypography class={styles.infoText}>
            - Show All errors: this option will show all the error messages, adding the new ones to the already existing
            list.
          </WppTypography>
          <WppButton class={styles.btn} onClick={() => setShowOnlyNewErrors(!showOnlyNewErrors)}>
            Current option: "{showOnlyNewErrors ? 'Show New' : 'Show All'}" errors
          </WppButton>

          <div className={styles.typeContainer}>
            <WppTypography class={styles.typeText}>
              Current file upload type: {isMultiple ? 'Multiple' : 'Single'}
            </WppTypography>
            <WppButton onClick={() => setIsMultiple(!isMultiple)}>Change file upload type</WppButton>
          </div>

          <WppFileUpload
            value={files}
            onWppChange={handleFileUploadChange}
            data-testid="file-upload-multiple"
            size={1}
            validator={fileValidator}
            showOnlyNewErrors={showOnlyNewErrors}
            multiple={isMultiple}
          />
          <div className={styles.empty}>
            <WppTypography type="l-strong">Empty space</WppTypography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadBugfix
