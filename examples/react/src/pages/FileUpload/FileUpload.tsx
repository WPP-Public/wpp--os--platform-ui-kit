import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'
import { FileItemType, FileUploadEventDetail } from '@platform-ui-kit/components-library'

import { AcceptProp } from './Examples/AcceptProp'
import { AcceptConfig } from './Examples/AcceptConfig'
import { AcceptConfigAndAcceptProp } from './Examples/AcceptConfigAndAcceptProp'
import { NoLimitations } from './Examples/NoLimitations'
import { Controlled } from './Examples/Controlled'

import { fileValidator } from './utils'

import styles from './FileUpload.module.scss'

const defaultValueWithUrl = {
  url: 'https://test.png',
  name: 'below_1MB-file-1.png',
  size: 171615,
  type: '',
}

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

export const FileUpload = () => {
  const [files, setFiles] = useState<FileItemType[]>([defaultValueWithUrl])
  const handleFileUploadChange = (event: CustomEvent) => {
    console.log(JSON.stringify(transformChangeDetailToJson({ ...event.detail, eventType: 'wppChange' })))
    setFiles(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <div data-testid="multiple-file-upload-container">
        <h3 className={styles.text}>Multiple File Upload </h3>
        <WppFileUpload
          value={files}
          onWppChange={handleFileUploadChange}
          data-testid="file-upload-multiple"
          size={1}
          validator={fileValidator}
        />
      </div>

      <Controlled />

      <h3 className={styles.text}>Single File Upload</h3>
      <WppFileUpload
        value={files}
        multiple={false}
        size={1}
        onWppChange={handleFileUploadChange}
        data-testid="file-upload-single"
      />

      <AcceptProp />
      <AcceptConfig />
      <AcceptConfigAndAcceptProp />
      <NoLimitations />

      <h3 className={styles.text}>File Upload with limited amount of files</h3>
      <WppFileUpload size={2} maxFiles={2} onWppChange={handleFileUploadChange} data-testid="limited-file-upload" />
    </div>
  )
}
