import Quill from 'quill'

const BaseBlot = Quill.import('blots/embed')

const supportedFormats = ['width', 'height', 'float']

class MediaBlot extends BaseBlot {
  static create(value) {
    const src = typeof value === 'object' ? value?.src : value

    const domNode = super.create(src)

    if (src === true) return domNode

    domNode.src = src

    return domNode
  }

  static value(domNode) {
    return {
      src: domNode.src || '',
    }
  }

  static formats(domNode) {
    // We still need to report unregistered embed formats
    let format = {}
    if (domNode.hasAttribute('height')) {
      // getAttribute is important here! We need attribute value, not a current dimensions
      format.height = domNode.getAttribute('height')
    }
    if (domNode.hasAttribute('width')) {
      // getAttribute is important here! We need attribute value, not a current dimensions
      format.width = domNode.getAttribute('width')
    }
    if (domNode.classList.contains('ql-float-left')) {
      format.float = 'left'
    }
    if (domNode.classList.contains('ql-float-right')) {
      format.float = 'right'
    }
    return format
  }

  format(name, value) {
    if (supportedFormats.includes(name)) {
      if (name === 'float') {
        this.domNode.classList.remove('ql-float-left', 'ql-float-right')
        if (value) {
          this.domNode.classList.add(`ql-float-${value}`)
        }
      } else {
        if (value) {
          this.domNode.setAttribute(name, value)
        } else {
          this.domNode.removeAttribute(name)
        }
      }
    } else {
      super.format(name, value)
    }
  }
}

MediaBlot.blotName = 'mediaBlot'
MediaBlot.tagName = 'img'

export default MediaBlot
