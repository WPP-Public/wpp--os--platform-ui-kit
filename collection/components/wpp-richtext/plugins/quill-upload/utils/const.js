export default {
  blots: {
    image: 'image',
    imageUploading: 'imageUploading',
    video: 'video',
    videoUploading: 'videoUploading',
    attachment: 'attachment',
    attachmentUploading: 'attachmentUploading',
  },
  progressIndicator: {
    media: {
      width: 20,
      padding: 10,
    },
  },
}

// Storage for uploading handler promises
export const Handlers = {
  __id: 0,
  generateID() {
    return `ql-upload-${this.__id++}`
  },

  // [handlerId]: uploadingPromise
}

// Map of MediaUploadingBlots used to reposition progressIndicators when needed
export const MediaUploadingBlots = {
  // [handlerId]: uploadingBlot
}
