import BlotSpec from './BlotSpec'
import ImageActions from '../ImageActions'

export default class ImageSpec extends BlotSpec {
  el: HTMLElement | null | undefined

  constructor(formatter: ImageActions) {
    super(formatter)
    this.el = null
  }

  init(): void {
    this.formatter.quill.root.addEventListener('click', this.onClick.bind(this))
  }

  getTargetElement(): HTMLElement | null | undefined {
    return this.el
  }

  onHide(): void {
    this.el = null
  }

  onClick = (event: MouseEvent): void => {
    const el = event.target
    const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true'

    if (enabled && el instanceof HTMLElement && el.tagName === 'IMG') {
      this.el = el
      this.formatter.show(this)
    }
  }
}
