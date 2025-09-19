import BlotSpec from './BlotSpec'
import ImageActions from '../ImageActions'
import { EventTargetProp } from '../types'
import { ONE_PIXEL_TRANSPARENT_GIF } from '../../../../../utils/const'

const MOUSE_ENTER_ATTRIBUTE = 'data-image-actions-unclickable-bound'
const PROXY_IMAGE_CLASS = 'image-actions__proxy-image'

interface UnclickableHTMLElement extends HTMLElement {
  [MOUSE_ENTER_ATTRIBUTE]: boolean
  __blot: any
}

export default class UnclickableBlotSpec extends BlotSpec {
  selector: string
  unclickable?: UnclickableHTMLElement | null
  nextUnclickable?: UnclickableHTMLElement | null
  proxyImage: HTMLElement & EventTargetProp

  constructor(formatter: ImageActions, selector: string) {
    super(formatter)
    this.selector = selector
    this.unclickable = null
    this.nextUnclickable = null
    this.proxyImage = this.createProxyImage()
  }

  init(): void {
    const quill = this.formatter.quill

    this.formatter.quill.root.parentNode!.append(this.proxyImage)

    this.hideProxyImage()
    quill.on('text-change', this.onTextChange)
    quill.root.addEventListener('scroll', () => this.repositionProxyImage())
    this.proxyImage!.addEventListener('click', this.onProxyImageClick)
    this.proxyImage!.addEventListener('wheel', e => quill.root.scrollBy(e.deltaX, e.deltaY))
  }

  getTargetElement(): HTMLElement | null | undefined {
    return this.unclickable
  }

  getOverlayElement(): HTMLElement | null | undefined {
    return this.unclickable
  }

  onHide(): void {
    this.hideProxyImage()
    this.nextUnclickable = null
    this.unclickable = null
  }

  createProxyImage(): HTMLElement {
    const proxyImage = document.createElement('img')

    proxyImage.src = ONE_PIXEL_TRANSPARENT_GIF
    proxyImage.classList.add(PROXY_IMAGE_CLASS)

    return proxyImage
  }

  hideProxyImage(): void {
    Object.assign(this.proxyImage.style, {
      display: 'none',
    })
    this.proxyImage.eventTarget = null
  }

  repositionProxyImage(): void {
    if (this.nextUnclickable) {
      const specRect = this.nextUnclickable.getBoundingClientRect()
      const parent = this.formatter.quill.root
      const parentRect = parent.getBoundingClientRect()

      if (this.proxyImage) {
        Object.assign(this.proxyImage.style, {
          display: 'block',
          left: `${specRect.left - parentRect.left}px`,
          top: `${specRect.top - parentRect.top}px`,
          width: `${specRect.width}px`,
          height: `${specRect.height}px`,
        })
      }
    }
  }

  onTextChange = (): void => {
    const arr = Array.from(document.querySelectorAll(`${this.selector}`)) as UnclickableHTMLElement[]

    arr
      .filter(unclickable => !unclickable[MOUSE_ENTER_ATTRIBUTE])
      .forEach(unclickable => {
        unclickable[MOUSE_ENTER_ATTRIBUTE] = true
        unclickable.addEventListener('mouseenter', this.onMouseEnter)
      })
  }

  onMouseEnter = (event: MouseEvent): void => {
    const unclickable = event.target as UnclickableHTMLElement
    const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true'

    if (enabled && unclickable instanceof HTMLElement) {
      this.nextUnclickable = unclickable
      this.proxyImage.eventTarget = unclickable
      this.repositionProxyImage()
    }
  }

  onProxyImageClick = (e: MouseEvent): void => {
    const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true'

    e.stopPropagation()
    e.preventDefault()

    if (enabled) {
      this.unclickable = this.nextUnclickable
      this.nextUnclickable = null
      this.formatter.show(this)
      this.hideProxyImage()
    }
  }
}
