import { newSpecPage } from '@stencil/core/testing'
import { WppMenuGroup } from '../wpp-menu-group'

describe('wpp-menu-group', () => {
  it('renders base component', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group></wpp-menu-group>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render header when it was provided', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group header="Actions"></wpp-menu-group>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render divider when flag was enabled', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group header="Actions" with-divider></wpp-menu-group>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
