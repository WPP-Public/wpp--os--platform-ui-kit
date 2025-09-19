import { newSpecPage } from '@stencil/core/testing'
import { WppIconCross } from '../components/add-and-remove/wpp-icon-cross/wpp-icon-cross'

describe('wpp-icon', () => {
  it('should render wpp-icon-cross component with default styles', async () => {
    const page = await newSpecPage({
      components: [WppIconCross],
      html: `<wpp-icon-cross></wpp-icon-cross>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render wpp-icon-cross with color', async () => {
    const page = await newSpecPage({
      components: [WppIconCross],
      html: `<wpp-icon-cross color="#000000"></wpp-icon-cross>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render wpp-icon-cross with different size', async () => {
    const page = await newSpecPage({
      components: [WppIconCross],
      html: `<wpp-icon-cross color="#ffffff" size="s"></wpp-icon-cross>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('width prop should overwrite size prop and set height size the same as width size', async () => {
    const page = await newSpecPage({
      components: [WppIconCross],
      html: `<wpp-icon-cross color="#ffffff" size="s" width="32"></wpp-icon-cross>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('height prop should overwrite size prop and not change width size', async () => {
    const page = await newSpecPage({
      components: [WppIconCross],
      html: `<wpp-icon-cross color="#ffffff" size="m" height="26"></wpp-icon-cross>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
