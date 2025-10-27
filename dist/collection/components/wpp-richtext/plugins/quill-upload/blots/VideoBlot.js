import { Constants } from '../utils'
import MediaBlot from './MediaBlot'

class VideoBlot extends MediaBlot {
  static create(value) {
    const node = super.create(value)

    node.controls = true

    return node
  }
}

VideoBlot.blotName = Constants.blots.video
VideoBlot.tagName = 'video'

export default VideoBlot
