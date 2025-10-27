import { Constants } from '../utils'
import Uploading from './Uploading'
import Quill from 'quill'
import ImageBlot from '../blots/ImageBlot'
import ImageUploadingBlot from '../blots/ImageUploadingBlot'

Quill.register('formats/image', ImageBlot, true)
Quill.register('formats/imageUploading', ImageUploadingBlot)

class Image extends Uploading {
  static handler = Constants.blots.image
  static uploadingBlotName = Constants.blots.imageUploading
}

export default Image
