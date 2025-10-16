import Quill from 'quill'
import { Constants } from '../utils'

const BlockEmbed = Quill.import('blots/block/embed')

class AttachmentBlot extends BlockEmbed {
  static create(value) {
    const domNode = super.create(value)

    domNode.href = value.src
    domNode.removeAttribute('src')
    domNode.target = '_blank'
    domNode.download = value.name
    domNode.innerHTML = value.name
    domNode.title = value.name
    domNode.dataset.size = value.size
    domNode.dataset.type = value.type
    domNode.dataset.lastModified = value.lastModified

    return domNode
  }

  static value(domNode) {
    return {
      src: domNode.href,
      name: domNode.download,
      size: domNode.dataset.size,
      type: domNode.dataset.type,
      lastModified: domNode.dataset.lastModified,
    }
  }
}

AttachmentBlot.tagName = 'a'
AttachmentBlot.blotName = Constants.blots.attachment
AttachmentBlot.className = 'ql-attachment'

export default AttachmentBlot
