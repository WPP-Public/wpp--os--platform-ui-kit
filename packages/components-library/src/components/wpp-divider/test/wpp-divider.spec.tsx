import { newSpecPage } from '@stencil/core/testing'
import { WppDivider } from '../wpp-divider'

describe('wpp-divider', () => {
  it('should render divider with width 300px', async () => {
    const page = await newSpecPage({
      components: [WppDivider],
      html: `<wpp-divider style="--wpp-divider-width: 300px"></wpp-divider>`,
    })

    expect(page.root).toMatchSnapshot()
  })
  it('should render vertical divider with height 300px', async () => {
    const page = await newSpecPage({
      components: [WppDivider],
      html: `<wpp-divider vertical style="--wpp-divider-height: 300px"></wpp-divider>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
