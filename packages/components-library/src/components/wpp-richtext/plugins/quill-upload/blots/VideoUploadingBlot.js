import { Constants } from '../utils'
import MediaUploadingBlot from './MediaUploadingBlot'
import VideoBlot from './VideoBlot'

class VideoUploadingBlot extends MediaUploadingBlot {
  static regularBlot = VideoBlot
}

VideoUploadingBlot.blotName = Constants.blots.videoUploading
VideoUploadingBlot.className = 'ql-video-uploading'
VideoUploadingBlot.tagName = 'video'

export default VideoUploadingBlot
