import { newSpecPage } from '@stencil/core/testing'
import { WppListItem } from '../wpp-list-item'

describe('wpp-list-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label and avatar', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
                <p slot="label">Text</p>
                <wpp-avatar
                      size="s"
                      src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
                      slot="left"
                />
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label and chevron', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
               <wpp-icon-chevron slot="right" />
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label and caption', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
               <p slot="caption">Caption</p>
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label and checkbox', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item multiple>
               <p slot="label">Text</p>
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with label, caption and checkbox with checked state', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item multiple checked>
               <p slot="label">Text</p>
               <p slot="caption">Caption</p>
             </wpp-list-item>`,
    })

    await new Promise(resolve => setTimeout(resolve, 100))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
})
