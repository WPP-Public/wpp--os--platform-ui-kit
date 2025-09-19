export const uploadTypes = ['image', 'video', 'attachment']
export type UploadTypes = (typeof uploadTypes)[number]
export type UploadCallbackItem = {
  file: File // Selected file from input[type="file"]
  promise: Promise<string> // should resolve to URL of uploaded file
}

export interface UploadRequestEventDetail {
  type: UploadTypes
  callback: (items: UploadCallbackItem[]) => void
}

export const UPLOAD_REQUEST_EVENT = 'upload-request'
