import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'wpp-richtext-html',
})
export class WppRichtextHtml {
  /**
   * Editor value
   */
  @Prop({ mutable: true }) value: string

  render() {
    const classes = `ql-container ql-wpp quill-view-html`

    return (
      <Host>
        <wpp-quill-styles />
        <wpp-richtext-common-styles />
        <div class={classes} data-testid="richtext-editor-container">
          <div class="ql-editor" innerHTML={this.value} data-testid="richtext-editor"></div>
        </div>
      </Host>
    )
  }
}
