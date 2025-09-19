import { Component, ComponentDidLoad, Element, h, Host, Prop, Watch } from '@stencil/core'
import { Quill } from '../..'
import { DebugLevels, formats, Formats, QuillInstance, RichtextValue, sources } from '../../types'

import { marked } from 'marked'
import TurndownService from 'turndown'

/* eslint-disable @stencil/own-props-must-be-private, @stencil/own-methods-must-be-private */
const turndownService = new TurndownService()

@Component({
  tag: 'wpp-richtext-view',
})
export class WppRichtextView implements ComponentDidLoad {
  @Element() host: HTMLWppRichtextViewElement

  /**
   * Editor value
   */
  @Prop({ mutable: true, reflect: true }) value: RichtextValue

  /**
   * Format of editor value
   */
  @Prop({ mutable: true }) format: Formats = 'html'

  /**
   * Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.
   * Passing false disables all messages.
   */
  @Prop() readonly debug: DebugLevels = 'warn'

  /**
   * Whitelist of formats to allow in the editor.
   * See [Formats](https://quilljs.com/docs/formats/) for a complete list.
   */
  @Prop() readonly formats: string[]

  /**
   * Collection of modules to include and respective options.
   * The only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed (See "Usage" section of Notes)
   * See [Modules](https://quilljs.com/docs/modules/) for more information about the library's modules.
   */
  @Prop({ mutable: true }) modules?: string

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
  @Prop({ mutable: true }) preserveWhitespace: boolean = false

  quill: QuillInstance
  containerElement?: HTMLDivElement | HTMLPreElement | null

  setValue(value: RichtextValue) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value)

      this.quill.setContents(contents, sources.api)
    } else if (this.format === formats.markdown) {
      // Convert Markdown to HTML, then convert that HTML to Delta.
      const html = marked(value)
      const contents = this.quill.clipboard.convert(html)

      this.quill.setContents(contents, sources.api)
    } else if (this.format === formats.text) {
      this.quill.setText(value, sources.api)
    } else if (this.format === formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), sources.api)
      } catch (e) {
        this.quill.setText(value, sources.api)
      }
    } else {
      this.quill.setText(value, sources.api)
    }
  }

  getValue(): RichtextValue {
    const text = this.quill!.getText()
    const content = this.quill!.getContents()
    let html: string = this.containerElement!.children[0].innerHTML || ''

    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = ''
    }

    if (this.format === 'html') {
      return html
    } else if (this.format === 'markdown') {
      // Convert the rendered HTML back to Markdown
      return turndownService.turndown(html)
    } else if (this.format === 'text') {
      return text
    } else if (this.format === 'json') {
      try {
        return JSON.stringify(content)
      } catch (e) {
        return text
      }
    } else {
      return text
    }
  }

  componentDidLoad() {
    const modules: any = this.modules
      ? JSON.parse(this.modules)
      : {
          toolbar: false,
        }

    if (modules.toolbar) {
      modules.toolbar = false
    }

    this.quill = new Quill(this.containerElement!, {
      debug: this.debug,
      modules,
      readOnly: true,
      theme: 'wpp',
      formats: this.formats,
      strict: this.strict,
    })

    if (this.styles) {
      const styles = JSON.parse(this.styles)

      Object.keys(styles).forEach((key: string) => {
        this.containerElement?.style.setProperty(key, styles[key])
      })
    }

    this.containerElement?.classList.add('quill-view')

    if (this.value) {
      this.setValue(this.value)
      this.quill['history'].clear()
    }
  }

  @Watch('styles')
  updateStyle(newValue: string, oldValue: string): void {
    if (!this.containerElement) {
      return
    }
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

  @Watch('value')
  updateContent(newValue: RichtextValue): void | null {
    const value = this.getValue()

    if (Object.values(formats).indexOf(this.format) > -1 && newValue === value) {
      return null
    } else {
      let changed = false

      try {
        const newContentString = JSON.stringify(newValue)

        changed = JSON.stringify(value) !== newContentString
      } catch {
        return null
      }
      if (!changed) {
        return null
      }
    }
    this.setValue(newValue)
  }

  render() {
    return (
      <Host>
        <wpp-quill-styles />
        <wpp-richtext-common-styles />
        {this.preserveWhitespace ? (
          <pre ref={(el?: HTMLPreElement) => (this.containerElement = el)}></pre>
        ) : (
          <div ref={(el?: HTMLDivElement) => (this.containerElement = el)}></div>
        )}
      </Host>
    )
  }
}
