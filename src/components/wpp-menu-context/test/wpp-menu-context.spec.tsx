import { newSpecPage } from '@stencil/core/testing'
import { WppMenuContext } from '../wpp-menu-context'
import { WppListItem } from '../../wpp-list-item/wpp-list-item'

describe('wpp-menu-context', () => {
  it('should render empty context', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext],
      html: `<wpp-menu-context></wpp-menu-context>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })

  it('should render context with button', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="parent"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })

  it('should render context item with custom svg and default right icon', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item is-extended="${true}">
        <wpp-icon-plus slot="icon-start"></wpp-icon-plus>
        Item
      </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })

  it('should render context be the same width as anchor', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context .is-list-have-trigger-element-width=${true}>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })
})
