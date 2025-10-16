import Quill from 'quill'
import { Constants } from '../utils'
import Uploading from './Uploading'
import VideoBlot from '../blots/VideoBlot'
import VideoUploadingBlot from '../blots/VideoUploadingBlot'

Quill.register('formats/video', VideoBlot, true)
Quill.register('formats/videoUploading', VideoUploadingBlot)

class Video extends Uploading {
  static handler = Constants.blots.video
  static uploadingBlotName = Constants.blots.videoUploading
}

export default Video
