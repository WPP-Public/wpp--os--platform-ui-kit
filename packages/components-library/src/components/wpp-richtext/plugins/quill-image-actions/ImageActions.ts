import deepmerge from 'deepmerge'
import type { Quill } from 'quill'

import DefaultOptions, { Options } from './Options'
import Action from './actions/Action'
import BlotSpec from './specs/BlotSpec'
import { EventTargetProp } from './types'

const overwriteMerge = (destination: any[], source: any[]) => source

export default class ImageActions {
  static DefaultOptions = DefaultOptions

  quill: Quill
  Quill: typeof Quill
  options: typeof DefaultOptions
  currentSpec?: BlotSpec | null
  specs: BlotSpec[]
  overlay: HTMLElement & EventTargetProp
  actions: Action[]

  constructor(quill: Quill, options: Options = {}) {
    this.quill = quill
    this.Quill = quill.constructor as typeof Quill
    this.options = deepmerge(DefaultOptions, options, {
      arrayMerge: overwriteMerge,
    }) as typeof DefaultOptions
    this.currentSpec = null
    this.actions = []
    this.overlay = document.createElement('div')
    this.overlay.draggable = true
    this.overlay.classList.add(this.options.overlay.className)
    if (this.options.overlay.style) {
      Object.assign(this.overlay.style, this.options.overlay.style)
    }

    this.overlay.addEventListener('wheel', e => this.quill.root.scrollBy(e.deltaX, e.deltaY))

    this.quill.root.parentElement!.addEventListener('mousedown', e => {
      if (!this.overlay.contains(e.target as Node) && e.target !== this.currentSpec?.getTargetElement()) {
        this.hide()
      }
    })

    this.quill.root.parentElement!.addEventListener('focusout', e => {
      const isInternalBlur = !e.relatedTarget || this.quill.root.parentElement?.contains(e.relatedTarget as HTMLElement)

      if (!isInternalBlur) {
        this.hide()
      }
    })

    this.quill.root.addEventListener('scroll', () => this.update())
    this.quill.on('text-change', () => this.update())

    this.specs = this.options.specs.map(Class => new Class(this))
    this.specs.forEach(spec => spec.init())
  }

  withParentNode(callback: (HTMLElement: any) => any): void {
    if (this.quill.root.parentNode) {
      callback(this.quill.root.parentNode)
    }
  }

  show(spec: BlotSpec): void {
    this.currentSpec = spec
    this.currentSpec.setSelection()
    this.overlay.eventTarget = this.currentSpec.getTargetElement()
    this.setUserSelect('none')
    this.withParentNode(pn => pn.appendChild(this.overlay))
    this.repositionOverlay()
    this.createActions(spec)
  }

  hide(): void {
    if (!this.currentSpec) {
      return
    }

    this.currentSpec.onHide()
    this.currentSpec = null
    this.overlay.eventTarget = null
    this.withParentNode(pn => pn?.removeChild(this.overlay))
    this.overlay.style.setProperty('display', 'none')
    this.setUserSelect('')
    this.destroyActions()
  }

  update(): void {
    this.repositionOverlay()
    this.actions.forEach(action => action.onUpdate())
  }

  createActions(spec: BlotSpec): void {
    const actions = spec.getActions().filter(
      (ActionClass: any) =>
        !ActionClass.formats.length ||
        ActionClass.formats.some((f: string) =>
          // @ts-expect-error 2339 seems to work; apparently not part of public API
          this.quill.options.formats.includes(f),
        ),
    )

    this.actions = actions.map((ActionClass: any) => {
      const action: Action = new ActionClass(this)

      action.onCreate()

      return action
    })
  }

  destroyActions(): void {
    this.actions.forEach((action: Action) => action.onDestroy())
    this.actions = []
  }

  repositionOverlay(): void {
    if (!this.currentSpec) {
      return
    }

    const overlayTarget = this.currentSpec.getOverlayElement()

    if (!overlayTarget) {
      return
    }

    this.withParentNode(pn => {
      const specRect = overlayTarget.getBoundingClientRect()
      const parentRect = pn.getBoundingClientRect()

      Object.assign(this.overlay.style, {
        display: 'block',
        left: `${specRect.left - parentRect.left - 1 + pn.scrollLeft}px`,
        top: `${specRect.top - parentRect.top - 2 + pn.scrollTop}px`,
        width: `${specRect.width + 2}px`,
        height: `${specRect.height + 2}px`,
      })
    })
  }

  setUserSelect(value: string): void {
    const props: string[] = ['userSelect', 'mozUserSelect', 'webkitUserSelect', 'msUserSelect']

    props.forEach((prop: string) => {
      // set on contenteditable element and <html>
      this.quill.root.style.setProperty(prop, value)
      if (document.documentElement) {
        document.documentElement.style.setProperty(prop, value)
      }
    })
  }
}
