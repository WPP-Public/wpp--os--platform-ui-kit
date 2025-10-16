import { newSpecPage } from '@stencil/core/testing'
import { WppNavigationItem } from '../wpp-navigation-item'

describe('wpp-navigation-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders selected component with label Title', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item label='Title' selected />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with menu icon', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item menu />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with chevron icon', async () => {
    const page = await newSpecPage({
      components: [WppNavigationItem],
      html: `<wpp-navigation-item hasNestedItems />`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
