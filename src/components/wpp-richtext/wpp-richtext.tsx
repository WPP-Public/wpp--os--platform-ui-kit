import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core'
import { RangeStatic } from 'quill'
import deepmerge from 'deepmerge'
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import { autoFocusElement } from '../../utils/utils'
import { LabelConfig } from '../wpp-label/types'
import { BaseComponent } from '../../interfaces/base-component'
import { Quill } from './'
import {
  debugLevels,
  DebugLevels,
  Formats,
  formats,
  MediaDragElement,
  QuillInstance,
  RICHTEXT_UPLOAD_REQUEST_EVENT,
  RichtextChangeEventDetail,
  RichtextLocales,
  RichtextSelectionChangeEventDetail,
  RichtextUploadRequestEventDetail,
  RichtextValue,
  Sources,
  sources,
} from './types'
import { KEYBOARD_FOCUS_CLASS, KEYBOARD_FOCUS_EVENT, LOCALES_DEFAULTS } from './const'
import { createDragThumbnail, embedBlotInnerHtmlRegexp, exportHtml, processMarkdownValue } from './utils'
import { EventTargetProp } from './plugins/quill-image-actions/types'
import QuillMarkdown from 'quilljs-markdown'
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css'
import turndownService, { quillMarkdownOptions } from './config'

const overwriteMerge = (destination: any[], source: any[]) => source

@Component({
  tag: 'wpp-richtext',
  styleUrl: 'wpp-richtext.scss',
})
export class WppRichtext implements BaseComponent {
  private _locales: RichtextLocales = LOCALES_DEFAULTS

  @Element() host: HTMLWppRichtextElement

  @State() focusType: FOCUS_TYPE

  @State() private enteredCharacters: number

  @State() plainText: string = ''

  /**
   * Defines the component name.
   */
  @Prop({ reflect: true }) readonly name?: string

  /**
   * If the component is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) disabled: boolean = false

  /**
   * If `true`, should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: LabelConfig

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the component message.
   */
  @Prop() readonly message?: string

  /**
   * Defines the component message type.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines a maximum length threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip.
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the character limit.
   */
  @Prop() readonly charactersLimit?: number

  /**
   * Indicates locales for the component
   */
  @Prop() readonly locales: Partial<RichtextLocales> = {}

  /**
   * Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`.
   */
  @Prop() readonly warningThreshold: number = 20

  /**
   * If the component is active.
   */
  @Prop({ reflect: true }) active: boolean = false

  /**
   * Format of editor value
   * Supported formats: `html`, `markdown`, `text`, `json`
   */
  @Prop({ mutable: true, reflect: true }) format: Formats = formats.html
  /**
   * DOM Element or a CSS selector for a DOM Element, within which the editor’s ui elements (i.e. tooltips, etc.)
   * should be confined. Currently, it only considers left and right boundaries.
   */
  @Prop({ mutable: true, reflect: true }) bounds: HTMLElement | string

  /**
   * Editor value
   */
  @Prop({ mutable: true }) value: RichtextValue

  /**
   * Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.
   * Passing false disables all messages.
   */
  @Prop({ mutable: true }) debug: DebugLevels = debugLevels.warn

  /**
   * Whitelist of formats to allow in the editor.
   * See [Formats](https://quilljs.com/docs/formats/) for a complete list.
   */
  @Prop() readonly formats: string[] = []

  /**
   * Collection of modules to include and respective options.
   * The only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed (See "Usage" section of Notes)
   * See [Modules](https://quilljs.com/docs/modules/) for more information about the library's modules.
   */
  @Prop({ mutable: true }) modules?: string

  /**
   * Placeholder text to show when editor is empty.
   */
  @Prop({ mutable: true, reflect: true }) placeholder: string = 'Insert text here...'

  /**
   * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars
   * (i.e. `overflow-y: auto`), if has been changed from the default ql-editor with custom CSS.
   * Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container
   * is responsible for the scrolling.
   */
  @Prop() readonly scrollingContainer: HTMLElement | string

  /**
   * Use strict comparison for objects.
   */
  @Prop() readonly strict: boolean = true

  /**
   * Inline styles for editor, in a JSON format
   */
  @Prop({ mutable: true }) styles?: string = '{}'

  /**
   * Use `pre` HTML element as a container to preserve white space, or regular `div` element
   */
  @Prop({ mutable: true, reflect: true }) preserveWhitespace: boolean = false

  /**
   * Editor init event
   */
  @Event({ bubbles: false, composed: false }) readonly wppInit: EventEmitter<QuillInstance>

  /**
   * Emitted when editor has content changes
   */
  @Event({ bubbles: false, composed: false })
  readonly wppChange: EventEmitter<RichtextChangeEventDetail>

  /**
   * Emitted when editor has selection changes
   */
  @Event({ bubbles: false, composed: false })
  readonly wppSelectionChange: EventEmitter<RichtextSelectionChangeEventDetail>

  /**
   * Emitted when editor receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when editor looses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when user requests uploading of files
   */
  @Event({ bubbles: true, composed: false }) readonly wppUploadRequest: EventEmitter<RichtextUploadRequestEventDetail>

  @Watch('preserveWhitespace')
  handlePreserveWhitespaceChange(newVal: boolean, oldVal: boolean) {
    if (newVal !== oldVal && this.format === formats.markdown && this.value != null) {
      this.setValue(this.value, true)
      this.quill?.history?.clear?.()
    }
  }

  quill: QuillInstance
  containerElement?: HTMLDivElement | HTMLPreElement

  selectionChangeEvent: any
  textChangeEvent: any

  formControlInput?: HTMLInputElement

  private savedSelectionRange: RangeStatic

  private onFocusIn = (event: FocusEvent): void => {
    if (!this.active) {
      this.active = true
      this.wppFocus.emit(event)
    }
  }

  private onFocusOut = (event: FocusEvent): void => {
    const isInternalBlur = !event.relatedTarget || this.host.contains(event.relatedTarget as HTMLElement)

    if (!isInternalBlur) {
      this.active = false
      this.focusType = FOCUS_TYPE.NONE

      this.wppBlur.emit(event)
    } else {
      event.preventDefault()
    }
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
    }
  }

  private onMouseDown = (e: MouseEvent) => {
    this.focusType = FOCUS_TYPE.NONE
    if (this.disabled) {
      e.preventDefault()
    }
  }

  private onEditorBlur = () => {
    this.savedSelectionRange = this.quill.selection.savedRange
  }

  private onEditorFocus = () => {
    if (this.focusType === FOCUS_TYPE.TAB) {
      this.quill.selection.setRange(this.savedSelectionRange)
    }
  }

  private dragThumbnail: HTMLElement
  private dragElement: MediaDragElement | null

  private onDragstart = (e: DragEvent) => {
    // this.dragElement can be already set from outside, in imageLibrary for example
    if (!this.dragElement && e.target instanceof HTMLElement) {
      const tagName = e.target.tagName.toLowerCase()
      const eventTarget = (e.target as EventTargetProp).eventTarget

      if ((tagName && (tagName === 'img' || tagName === 'video')) || eventTarget) {
        const el = eventTarget || e.target

        //@ts-ignore typing
        const blot = el.__blot?.blot

        if (blot) {
          this.dragElement = blot.domNode as MediaDragElement
          this.quill.setSelection(this.quill.getIndex(blot), blot.length())
        }
      }
    }

    if (this.dragElement && e.dataTransfer) {
      e.dataTransfer.clearData()
      e.dataTransfer.setData('text/html', this.dragElement.outerHTML.replace(embedBlotInnerHtmlRegexp, ''))

      this.dragThumbnail = createDragThumbnail(this.dragElement)
      e.dataTransfer.setDragImage(this.dragThumbnail, 0, 0)
    }
  }

  private onDragend = () => {
    this.dragElement = null
    if (this.dragThumbnail) {
      document.body.removeChild(this.dragThumbnail)
    }
  }

  private onDrop = () => {
    const tagName = this.dragElement?.tagName.toLowerCase()

    // Workaround for Video elements
    if (tagName === 'video') {
      this.dragElement?.remove()
      this.quill.update(sources.user)
    }
  }

  private updateEnteredCharacters = () => {
    if (this.charactersLimit) {
      // -1 because Quill adds a newline character at the end even when the editor is empty
      this.enteredCharacters = this.quill.getText().length - 1
    }
  }

  private syncValueAndEmit(source: Sources) {
    const newValue = this.getValue()

    if (newValue !== this.value) {
      this.value = newValue

      if (this.formControlInput) {
        this.formControlInput.value = this.value
      }

      if (this.format === formats.markdown) {
        const { plainText } = processMarkdownValue(this.value, this.preserveWhitespace, false)

        this.plainText = plainText
      } else {
        this.plainText = (this.value as string) || ''
      }

      this.wppChange.emit({
        value: this.value,
        plainText: this.plainText,
        editor: this.quill,
        source,
        name: this.name,
      })
    }
  }

  setValue(value: RichtextValue, isInitialLoad = false) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value)

      this.quill.setContents(contents, sources.api)
    } else if (this.format === formats.markdown) {
      const str = String(value || '')
      const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(str)

      let html: string
      let plainText: string

      if (isInitialLoad || !looksLikeHtml) {
        // Treat as Markdown on initial load OR when not clearly HTML
        ;({ html, plainText } = processMarkdownValue(str, this.preserveWhitespace, isInitialLoad))
      } else {
        // Internal updates — already HTML (from the live DOM)
        html = str
        plainText = this.quill?.getText().trim() || ''
      }

      this.plainText = plainText
      const contents = this.quill.clipboard.convert(html)

      this.quill.setContents(contents, sources.api)

      // Optional cleanup of empty <li>
      const editorEl = this.quill.root
      const emptyListItems = editorEl.querySelectorAll('li')
      let removedCount = 0

      emptyListItems.forEach(li => {
        const trimmedContent = li.innerHTML.trim()

        if (trimmedContent === '<br>' || trimmedContent === '') {
          li.remove()
          removedCount++
        }
      })
      if (removedCount > 0) {
        this.quill.update(sources.api)
      }
    } else if (this.format === formats.text) {
      this.quill.setText(value, sources.api)
    } else if (this.format === formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), sources.api)
      } catch (_) {
        this.quill.setText(value, sources.api)
      }
    } else {
      this.quill.setText(value, sources.api)
    }
  }

  getValue(): RichtextValue {
    const text = this.quill!.getText()
    const content = this.quill!.getContents()

    let html: string = this.quill.root.innerHTML || ''

    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = ''
    }

    if (this.format === formats.html) {
      return exportHtml(html)
    } else if (this.format === formats.markdown) {
      return turndownService.turndown(html)
    } else if (this.format === formats.text) {
      return text
    } else if (this.format === formats.json) {
      try {
        return JSON.stringify(content)
      } catch (_) {
        return text
      }
    } else {
      return text
    }
  }

  componentDidLoad() {
    let modules: any = {}

    try {
      if (this.modules) {
        modules = JSON.parse(this.modules)
      }
    } catch (_) {
      throw new Error('Cannot parse "modules" attribute')
    }

    modules = deepmerge(Quill.DEFAULTS.modules, modules, { arrayMerge: overwriteMerge })

    const customToolbarElem = this.host.querySelector('[slot="quill-toolbar"]')

    if (customToolbarElem) {
      modules['toolbar'] = customToolbarElem
    }

    // *** Markdown Integration ***
    Quill.register('modules/QuillMarkdown', QuillMarkdown, true)
    if (this.format === formats.markdown) {
      modules.QuillMarkdown = quillMarkdownOptions
    }

    this.quill = new Quill(this.containerElement!, {
      ...Quill.DEFAULTS,
      ...{
        debug: this.debug,
        modules,
        placeholder: this.placeholder,
        theme: 'wpp',
        formats: [...Quill.DEFAULTS.formats, ...this.formats],
        bounds: this.bounds ? (this.bounds === 'self' ? this.containerElement! : this.bounds) : document.body,
        strict: this.strict,
        scrollingContainer: this.scrollingContainer,
      },
    })

    const el = this.host as any

    el.quill = this.quill
    el.format = this.format
    el.name = this.name

    // Used in quill-upload plugin
    this.quill.editor.scroll.quill = this.quill
    this.quill.wppRichtext = this

    this.host.addEventListener(KEYBOARD_FOCUS_EVENT, () => {
      this.focusType = FOCUS_TYPE.TAB
    })

    if (this.styles) {
      const styles = JSON.parse(this.styles)

      Object.keys(styles).forEach((key: string) => {
        this.containerElement!.style.setProperty(key, styles[key])
      })
    }

    // Initial load — mark empty lines only once
    if (this.value) {
      this.setValue(this.value, true) // true = initial load
      this.quill.history.clear()
    }

    this.updateEnteredCharacters()

    this.selectionChangeEvent = this.quill.on('selection-change', (range, oldRange, source) => {
      this.wppSelectionChange.emit({
        editor: this.quill,
        range,
        oldRange,
        source,
      })
    })

    this.host.addEventListener('focusin', this.onFocusIn)
    this.host.addEventListener('focusout', this.onFocusOut)
    this.host.addEventListener('keyup', this.onKeyUp)
    this.host.addEventListener('mousedown', this.onMouseDown)

    this.quill.root.addEventListener('keyup', this.onKeyUp)
    this.quill.root.addEventListener('blur', this.onEditorBlur)
    this.quill.root.addEventListener('focus', this.onEditorFocus)

    this.containerElement!.parentElement!.addEventListener('dragstart', this.onDragstart as EventListener)
    this.containerElement!.parentElement!.addEventListener('dragend', this.onDragend as EventListener)
    this.containerElement!.parentElement!.addEventListener('drop', this.onDrop as EventListener)

    this.quill.root.addEventListener(RICHTEXT_UPLOAD_REQUEST_EVENT, e => {
      e.stopPropagation()
      e.preventDefault()
      //@ts-ignore event type
      this.wppUploadRequest.emit(e.detail)
    })

    this.formControlInput?.addEventListener('focus', () => {
      this.quill.root.focus()
    })

    autoFocusElement(this.autoFocus, this.quill.root)
    this.updateDisabled(this.disabled)

    setTimeout(() => {
      this.wppInit.emit(this.quill)
    })

    // --- TEXT CHANGE HANDLER ---
    this.quill.on('text-change', (_delta, _oldDelta, source) => {
      if (source !== 'user') return

      const range = this.quill.getSelection()

      if (!range) return

      const [line, offset] = this.quill.getLine(range.index)
      const text = line.domNode.textContent || ''

      // --- Heading Logic ---
      const headingMatch = text.match(/^(#{1,6})\s/)

      if (headingMatch) {
        const level = headingMatch[1].length
        const newText = text.replace(/^(#{1,6}\s)/, '')
        const docLineStart = range.index - offset

        this.quill.deleteText(docLineStart, text.length, 'user')
        this.quill.insertText(docLineStart, newText, 'user')
        this.quill.formatLine(docLineStart, newText.length, 'header', level, 'user')
        this.syncValueAndEmit(source)

        return
      }

      // --- Intra -word emphasis Logic (asterisk-based only) ---
      // This regex uses negative lookbehind/lookahead to match only single asterisks:
      // eslint-disable-next-line no-useless-escape
      const italicRegex = /(?<!\*)\*([^\*\s]+?)\*(?!\*)/g
      const italicMatches = Array.from(text.matchAll(italicRegex)) as RegExpMatchArray[]

      if (italicMatches && italicMatches.length > 0) {
        const docLineStart = range.index - offset

        // Process the matches in reverse order using forEach
        italicMatches.reverse().forEach(match => {
          // If match.index is undefined, skip processing this match
          if (match.index === undefined) return
          // match[0] is the full matched string (e.g. "*b*")
          // match[1] is the captured content that should be italicized (e.g. "b")
          const content = match[1]
          const matchIndex = match.index // relative index in the line
          const fullMatchLength = match[0].length
          const contentLength = content.length

          // Delete the opening marker at (docLineStart + matchIndex)
          this.quill.deleteText(docLineStart + matchIndex, 1, 'user')
          // After deletion, the closing marker shifts left by one.
          const newClosingPos = matchIndex + fullMatchLength - 2

          this.quill.deleteText(docLineStart + newClosingPos, 1, 'user')
          // Apply italic formatting to the content that remains.
          this.quill.formatText(docLineStart + matchIndex, contentLength, 'italic', true, 'user')
        })

        // Reset italic toolbar formatting so subsequent typing is not left in italic.
        this.quill.format('italic', false, 'user')
        // Optionally, set the cursor at the end of the line.
        this.quill.setSelection(docLineStart + text.length, 0, 'user')
        this.syncValueAndEmit(source)

        return
      }

      this.syncValueAndEmit(source)
    })
  }

  disconnectedCallback() {
    if (this.format === formats.markdown && this.quill) {
      const markdownModule = this.quill.getModule('QuillMarkdown')

      if (markdownModule && typeof markdownModule.destroy === 'function') {
        markdownModule.destroy()
      }
    }

    if (this.selectionChangeEvent) {
      this.selectionChangeEvent.removeListener('selection-change')
    }
    if (this.textChangeEvent) {
      this.textChangeEvent.removeListener('text-change')
    }
  }

  @Watch('value')
  updateContent(newValue: RichtextValue): void | null {
    const value = this.getValue()

    this.updateEnteredCharacters()

    if (Object.values(formats).indexOf(this.format) > -1 && newValue === value) {
      return null
    } else {
      let changed = false

      try {
        const json = JSON.stringify(newValue)

        changed = JSON.stringify(value) !== json
      } catch {
        return null
      }

      if (!changed) {
        return null
      }
    }

    this.setValue(newValue)
  }

  @Watch('disabled')
  updateDisabled(newValue: boolean): void {
    this.quill?.enable(!newValue)
    this.quill?.theme.modules.toolbar?.enable(!newValue)

    // TODO Remove when will be fixed in Quill
    if (!newValue) {
      this.quill.root.setAttribute('contenteditable', 'true')
    } else {
      this.quill.root.removeAttribute('contenteditable')
    }
  }

  @Watch('placeholder')
  updatePlaceholder(newValue: string, oldValue: string): void {
    if (this.quill && newValue !== oldValue) {
      this.quill.root.dataset.placeholder = newValue
    }
  }

  @Watch('styles')
  updateStyle(newValue: string, oldValue: string): void {
    if (oldValue) {
      const old = JSON.parse(oldValue)

      Object.keys(old).forEach((key: string) => {
        this.containerElement?.style.setProperty(key, '')
      })
    }
    if (newValue) {
      const value = JSON.parse(newValue)

      Object.keys(value).forEach((key: string) => {
        this.containerElement?.style.setProperty(key, value[key])
      })
    }
  }

  @Watch('charactersLimit')
  updateCharacterLimit() {
    this.updateEnteredCharacters()
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<RichtextLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }

    const rawFormat = this.host.getAttribute('format')

    if (rawFormat) this.format = rawFormat.replace(/^['"]|['"]$/g, '') as any

    if (this.host.hasAttribute('preserve-whitespace')) {
      this.preserveWhitespace = true
    }
  }

  private hostCssClasses = () => ({
    'wpp-richtext': true,
  })

  private formControlCssClasses = () => ({
    'ql-form-control': true,
    active: this.active,
    [KEYBOARD_FOCUS_CLASS]: this.active && this.focusType === FOCUS_TYPE.TAB,
    [`${this.messageType}`]: Boolean(this.messageType),
    disabled: this.disabled,
  })

  private charLimitCssClasses = () => ({
    'characters-limit': true,
    warning: Boolean(
      this.charactersLimit &&
        this.enteredCharacters >= this.warningThreshold &&
        this.enteredCharacters <= this.charactersLimit,
    ),
    error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
  })

  private messageCssClasses = () => ({
    'messages-wrapper': true,
    'without-text-message': !!this.charactersLimit && !this.message,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        aria-disabled={this.disabled}
        aria-required={this.required}
        data-testid="wpp-rich-text"
      >
        {/* WPPOPENDS-879 WPPOPENDS-512 WPPOPENDS-311 : Force register and prevent tree shaking during build */}
        <wpp-richtext-icon-loader />

        <wpp-quill-styles />
        <wpp-richtext-common-styles />

        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            htmlFor={this.name}
            optional={!this.required}
            disabled={this.disabled}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}

        <div class={this.formControlCssClasses()} data-testid="rich-text-form">
          <slot name="quill-toolbar" quill-toolbar=""></slot>

          <div
            ref={el => (this.containerElement = el)}
            data-testid="richtext-editor"
            class={this.preserveWhitespace ? 'preserve-whitespace' : ''}
          />

          {Boolean(this.name) && (
            <input
              ref={el => (this.formControlInput = el)}
              tabindex="-1"
              id={this.name}
              class="form-control-input"
              data-testid="rich-text-input"
              disabled={this.disabled}

              // Commented out to conform behaviour of the other form components of CL
              // name={this.name}
              // value={this.value}
              // required={this.required}
            />
          )}
        </div>

        {(Boolean(this.message) || Boolean(this.charactersLimit)) && (
          <div class={this.messageCssClasses()} part="message-wrapper">
            {Boolean(this.message) && (
              <wpp-inline-message
                message={this.message}
                type={this.messageType}
                showTooltipFrom={this.maxMessageLength}
                tooltipConfig={this.tooltipConfig}
                part="message"
                class="message"
                data-testid="message"
              />
            )}
            {Boolean(this.charactersLimit) && (
              <div class={this.charLimitCssClasses()} data-testid="char-entered-label" part="limit-wrapper">
                <wpp-typography type="xs-body" tag="span" part="limit-label">
                  {this._locales.charactersEntered}:&nbsp;
                </wpp-typography>
                <wpp-typography type="xs-strong" tag="span" class="entered-characters" part="limit-text">
                  {this.enteredCharacters}/{this.charactersLimit}
                </wpp-typography>
              </div>
            )}
          </div>
        )}
      </Host>
    )
  }
}
