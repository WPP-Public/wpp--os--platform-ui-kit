```tsx
import React from 'react'

import { WppFileUpload } from '@platform-ui-kit/components-library-react'

export const FileUploadExample = () => {
  const handleFileUploadChange = (event: CustomEvent) => {
    console.log('event :>> ', event.detail.value)
  }

  return (
  <div data-testid="datepickers">
    <h3>Default File Upload</h3>
    <WppFileUpload onWppChange={handleFileUploadChange} />

    <h3>File Upload with label, description and custom width</h3>
    <WppFileUpload onWppChange={handleFileUploadChange}>
      <h3>Baseplan</h3>
      <p>Download template, fill and upload it into this area</p>
    </WppFileUpload>

    <h3>File Upload with different accept format and size</h3>
    <WppFileUpload
      onWppChange={handleFileUploadChange}
      accept={{
        'video/quicktime': ['.mov'],
        'video/x-msvideo': ['.avi'],
      }}
      size={100}
    />
    </div>
  )
}
```
