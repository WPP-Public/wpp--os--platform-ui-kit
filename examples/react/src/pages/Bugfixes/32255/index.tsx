import React from 'react'
import { WppFileUpload } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

export const FileUploadDeprecateAcceptExample: React.FC = () => {
  const handleFileUploadChange = (event: CustomEvent) => {
    console.log('Files uploaded successfully:', event.detail)
  }

  return (
    <div className={styles.container}>
      <h1>File Upload - Deprecate Accept Property</h1>
      <p>
        This example demonstrates the deprecation of the <code>accept</code> property in favor of{' '}
        <code>acceptConfig</code>. Use <code>acceptConfig</code> for flexible file type restrictions.
      </p>

      <div className={styles.example}>
        <h3>
          Case 1: acceptConfig=
          <span>{`{}`}</span>
        </h3>
        <WppFileUpload
          name="file-upload-all-files"
          onWppChange={handleFileUploadChange}
          acceptConfig={{}} // Allows all file formats
        />
      </div>

      <div className={styles.example}>
        <h3>Case 2: No accept or acceptConfig</h3>
        <WppFileUpload name="file-upload-default" onWppChange={handleFileUploadChange} />
        <p>Fallback to default formats: .jpg, .jpeg, .png</p>
      </div>

      <div className={styles.example}>
        <h3>
          Case 3: accept=
          <span>{`[]`}</span>
        </h3>
        <WppFileUpload
          name="file-upload-legacy"
          onWppChange={handleFileUploadChange}
          accept={[]} // Legacy usage, allows all formats
        />
      </div>

      <div className={styles.example}>
        <h3>Case 4: acceptConfig with Specific Formats</h3>
        <WppFileUpload
          name="file-upload-specific"
          onWppChange={handleFileUploadChange}
          acceptConfig={{
            'image/png': ['.png'],
            'application/pdf': ['.pdf'],
          }} // Only PNG and PDF allowed
        />
      </div>

      <div className={styles.example}>
        <h3>Case 5: both acceptConfig (png pdf) and accept (zip) added</h3>
        <WppFileUpload
          name="file-upload-specific"
          onWppChange={handleFileUploadChange}
          acceptConfig={{
            'image/png': ['.png'],
            'application/pdf': ['.pdf'],
          }} // Only PNG and PDF allowed
          accept={['.zip']} // Legacy usage, allows .zip files
        />
      </div>
    </div>
  )
}
