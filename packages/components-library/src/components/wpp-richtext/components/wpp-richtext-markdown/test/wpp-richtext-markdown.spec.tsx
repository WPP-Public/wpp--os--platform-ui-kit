import { newSpecPage, SpecPage } from '@stencil/core/testing'
import { WppRichtextMarkdown } from '../wpp-richtext-markdown'

describe('WppRichtextMarkdown', () => {
  let page: SpecPage

  beforeEach(async () => {
    page = await newSpecPage({
      components: [WppRichtextMarkdown],
    })
  })

  it('renders with default empty value', async () => {
    await page.setContent('<wpp-richtext-markdown></wpp-richtext-markdown>')

    expect(page.root).toEqualHtml(`
      <wpp-richtext-markdown>
        <wpp-quill-styles></wpp-quill-styles>
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <pre class="richtext-markdown"></pre>
      </wpp-richtext-markdown>
    `)

    // Since no value was provided, the component property should be undefined (or empty)
    expect(page.rootInstance.value).toBeUndefined()
  })

  it('renders initial value by converting HTML to Markdown', async () => {
    // When provided with HTML content, our component uses Turndown to convert it.
    // For example, converting "<p>Hello</p>" should result in "Hello" (without extra newlines)
    await page.setContent('<wpp-richtext-markdown value="<p>Hello</p>"></wpp-richtext-markdown>')

    expect(page.root).toEqualHtml(`
      <wpp-richtext-markdown value="<p>Hello</p>">
        <wpp-quill-styles></wpp-quill-styles>
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <pre class="richtext-markdown">Hello</pre>
      </wpp-richtext-markdown>
    `)

    expect(page.rootInstance.value).toEqual('<p>Hello</p>')
  })

  it('updates value and re-renders Markdown accordingly', async () => {
    await page.setContent('<wpp-richtext-markdown value="<p>Hello</p>"></wpp-richtext-markdown>')
    const instance = page.rootInstance

    // Update the value property to new HTML content
    instance.value = '<p>Updated</p>'
    await page.waitForChanges()

    expect(page.root).toEqualHtml(`
      <wpp-richtext-markdown value="<p>Updated</p>">
        <wpp-quill-styles></wpp-quill-styles>
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <pre class="richtext-markdown">Updated</pre>
      </wpp-richtext-markdown>
    `)

    expect(page.rootInstance.value).toEqual('<p>Updated</p>')
  })
})
