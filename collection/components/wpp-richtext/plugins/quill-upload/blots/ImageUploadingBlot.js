import { Constants } from '../utils'
import MediaUploadingBlot from './MediaUploadingBlot'
import ImageBlot from './ImageBlot'

class ImageUploadingBlot extends MediaUploadingBlot {
  static regularBlot = ImageBlot
}

ImageUploadingBlot.blotName = Constants.blots.imageUploading
ImageUploadingBlot.className = 'ql-image-uploading'
ImageUploadingBlot.tagName = 'img'

export default ImageUploadingBlot
