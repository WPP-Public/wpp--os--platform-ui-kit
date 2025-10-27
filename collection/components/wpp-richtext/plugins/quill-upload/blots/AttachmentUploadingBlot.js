import { Constants } from '../utils'
import AttachmentBlot from './AttachmentBlot'
import UploadingBlot from './UploadingBlot'
import { WppProgressIndicator } from '../../../../wpp-progress-indicator/wpp-progress-indicator'

class AttachmentUploadingBlot extends UploadingBlot {
  static regularBlot = AttachmentBlot

  static create(value) {
    const domNode = super.create(value)

    const progressIndicator = new WppProgressIndicator()
    progressIndicator.classList.add('ql-uploading-progress-indicator')
    progressIndicator.variant = 'circle'

    domNode.innerHTML = value.name
    domNode.title = value.name
    domNode.prepend(progressIndicator)

    domNode.dataset.name = value.name
    domNode.dataset.size = value.size
    domNode.dataset.type = value.type
    domNode.dataset.lastModified = value.lastModified

    return domNode
  }

  static value(domNode) {
    const value = super.value(domNode)

    value.name = domNode.dataset.name
    value.size = domNode.dataset.size
    value.type = domNode.dataset.type
    value.lastModified = domNode.dataset.lastModified

    return value
  }
}

AttachmentUploadingBlot.tagName = 'span'
AttachmentUploadingBlot.blotName = Constants.blots.attachmentUploading
AttachmentUploadingBlot.className = 'ql-attachment-uploading'

export default AttachmentUploadingBlot
