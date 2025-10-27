import { Constants } from '../utils'
import Uploading from './Uploading'
import Quill from 'quill'
import AttachmentBlot from '../blots/AttachmentBlot'
import AttachmentUploadingBlot from '../blots/AttachmentUploadingBlot'

Quill.register('formats/attachment', AttachmentBlot)
Quill.register('formats/attachmentUploading', AttachmentUploadingBlot)

class Attachment extends Uploading {
  static handler = Constants.blots.attachment
  static uploadingBlotName = Constants.blots.attachmentUploading
}

export default Attachment
