import Quill from 'quill'
import { Handlers } from '../utils'
import { ignoreHistory } from '../../../utils'

const BaseBlot = Quill.import('blots/embed')

class UploadingBlot extends BaseBlot {
  handlerId
  progressIndicator

  static create(value) {
    const domNode = super.create(value)

    if (value === true) return domNode

    domNode.src = value.src

    return domNode
  }

  static value(domNode) {
    const content = domNode.firstChild

    return {
      src: content.src,
      handlerId: content.id,
    }
  }

  constructor(domNode, value) {
    super(domNode, value)

    this.handlerId = value.handlerId
  }

  attach() {
    super.attach()

    const handlerId = this.handlerId

    if (!Handlers[handlerId]) {
      setTimeout(() => this.remove(), 0)
    } else if (!Handlers[handlerId].__uploading_blot_inited) {
      // Attach method could be called multiple times, thus ensure that we process a promise just once
      Handlers[handlerId].__uploading_blot_inited = true

      Handlers[handlerId].then(src => {
        if (this.offset() !== -1) {
          const quill = this.scroll.quill

          ignoreHistory(quill, () => {
            const formats = { ...this.formats(), ...this.attributes?.values() }
            const blotName = this.constructor.regularBlot.blotName
            const value = this.constructor.value(this.domNode)

            delete value.handlerId
            value.src = src

            const replacement = this.replaceWith(blotName, value)

            Object.keys(formats).forEach(name => {
              replacement.format(name, formats[name])
            })
          })
        }
      })
    }
  }
}

UploadingBlot.blotName = 'uploading'
UploadingBlot.className = 'ql-uploading'
UploadingBlot.tagName = 'span'

export default UploadingBlot
