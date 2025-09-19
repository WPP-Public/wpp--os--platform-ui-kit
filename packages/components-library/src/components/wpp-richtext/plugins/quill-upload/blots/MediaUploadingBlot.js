import UploadingBlot from './UploadingBlot'
import { Constants, Handlers, MediaUploadingBlots } from '../utils'
import { WppProgressIndicator } from '../../../../wpp-progress-indicator/wpp-progress-indicator'

class MediaUploadingBlot extends UploadingBlot {
  static formats(domNode) {
    // We still need to report unregistered embed formats
    let format = {}
    if (domNode.hasAttribute('height')) {
      format.height = domNode.getAttribute('height')
    }
    if (domNode.hasAttribute('width')) {
      format.width = domNode.getAttribute('width')
    }
    return format
  }

  format(name, value) {
    // Handle unregistered embed formats
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }

  attach() {
    super.attach()

    const handlerId = this.handlerId

    if (!this.progressIndicator) {
      this.progressIndicator = new WppProgressIndicator()
      this.progressIndicator.classList.add('ql-uploading-progress-indicator')
      this.progressIndicator.variant = 'circle'
      this.progressIndicator.width = Constants.progressIndicator.media.width
      this.scroll.quill.root.parentElement.appendChild(this.progressIndicator)
    }

    if (Handlers[handlerId]) {
      MediaUploadingBlots[handlerId] = this
    }
  }

  remove() {
    this.progressIndicator.remove()
    delete this.progressIndicator
    delete MediaUploadingBlots[this.handlerId]

    super.remove()
  }
}

MediaUploadingBlot.blotName = 'mediaUploading'
MediaUploadingBlot.className = 'ql-media-uploading'
MediaUploadingBlot.tagName = 'span'

export default MediaUploadingBlot
