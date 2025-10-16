import ImageActions from '../ImageActions'
import AlignAction from '../actions/align/AlignAction'
import ResizeAction from '../actions/ResizeAction'
import Quill from 'quill'

interface Action {
  onCreate(): void
  onDestroy(): void
  onUpdate(): void
}

interface ExtendsAction {
  new (...rest: any): Action
}

export default class BlotSpec {
  el: HTMLElement | null | undefined
  formatter: ImageActions

  constructor(formatter: ImageActions) {
    this.formatter = formatter
  }

  init(): void {}

  getActions(): ExtendsAction[] {
    return [AlignAction, ResizeAction]
  }

  getTargetElement(): HTMLElement | null | undefined {
    return null
  }

  getOverlayElement(): HTMLElement | null | undefined {
    return this.getTargetElement()
  }

  setSelection(): void {
    const blot = Quill.find(this.getTargetElement()!)

    if (blot) {
      const index = this.formatter.quill.getIndex(blot)

      this.formatter.quill.setSelection(index + blot.length(), 0)
    }
  }

  onHide(): void {}
}
