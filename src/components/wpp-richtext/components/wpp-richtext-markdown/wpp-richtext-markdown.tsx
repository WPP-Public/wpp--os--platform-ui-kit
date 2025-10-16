import { Component, h, Host, Prop, Watch } from '@stencil/core'
import TurndownService from 'turndown'

@Component({
  tag: 'wpp-richtext-markdown',
})
export class WppRichtextMarkdown {
  /**
   * Editor value
   */
  @Prop({ mutable: true, reflect: true }) value: string

  private markdown = ''
  private turndown = new TurndownService()

  @Watch('value')
  handleValueChange(newValue: string) {
    this.markdown = newValue ? this.turndown.turndown(newValue) : ''
  }

  connectedCallback() {
    this.handleValueChange(this.value)
  }

  render() {
    return (
      <Host>
        <wpp-quill-styles />
        <wpp-richtext-common-styles />
        <pre class="richtext-markdown">{this.markdown}</pre>
      </Host>
    )
  }
}
