import { Constants, Handlers, MediaUploadingBlots } from '../utils'
import { UPLOAD_REQUEST_EVENT } from '../types'

class Uploading {
  eventsAttached = false

  constructor(quill, options) {
    this.quill = quill
    this.options = options
    this.range = null

    this.applyForToolbar()

    if (!Uploading.eventsAttached) {
      this.quill.root.addEventListener('scroll', () => this.update())
      this.quill.on('text-change', () => this.update())

      this.resizeObserver = new ResizeObserver(entries => this.update())

      Uploading.eventsAttached = true
    }
  }

  applyForToolbar() {
    const toolbar = this.quill.getModule('toolbar')

    if (toolbar) {
      toolbar.addHandler(this.constructor.handler, this.selectLocalFiles.bind(this))
    }
  }

  selectLocalFiles() {
    this.quill.editor.scroll.domNode.dispatchEvent(
      new CustomEvent(UPLOAD_REQUEST_EVENT, {
        bubbles: true,
        detail: {
          type: this.constructor.handler,
          callback: this.addFiles.bind(this),
        },
      }),
    )
  }

  addFiles(items) {
    const range = this.quill.getSelection()

    items.forEach(({ file, promise }) => {
      const handlerId = Handlers.generateID()
      const value = {
        handlerId,
        src: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      }

      Handlers[handlerId] = promise
      this.quill.insertEmbed(range.index++, this.constructor.uploadingBlotName, value, 'user')
      this.quill.setSelection(range)
    })
  }

  update() {
    Object.keys(MediaUploadingBlots).forEach(key => {
      const blot = MediaUploadingBlots[key]

      this.updateBlot(blot)
      if (!blot.__uploading_inited) {
        this.resizeObserver.observe(blot.domNode)
        blot.__uploading_inited = true
      }
    })
  }

  updateBlot(blot) {
    const container = this.quill.root.parentElement
    const blotRect = blot.domNode.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const progressPadding = Constants.progressIndicator.media.padding
    const progressWidth = Constants.progressIndicator.media.width
    const isVisible =
      progressWidth + 2 * progressPadding < blotRect.width && progressWidth + 2 * progressPadding < blotRect.height

    Object.assign(blot.progressIndicator.style, {
      display: isVisible ? 'block' : 'none',
      left: `${
        blotRect.left -
        containerRect.left +
        blotRect.width +
        container.scrollLeft -
        blot.progressIndicator.width -
        progressPadding
      }px`,
      top: `${blotRect.top - containerRect.top + container.scrollTop + Constants.progressIndicator.media.padding}px`,
    })
  }
}

export default Uploading
