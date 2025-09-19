import { newSpecPage } from '@stencil/core/testing'
import { WppTypography } from '../wpp-typography'

describe('wpp-typography', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppTypography],
      html: `<wpp-typography></wpp-typography>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with tag h1 and "l-heading" type ', async () => {
    const page = await newSpecPage({
      components: [WppTypography],
      html: `<wpp-typography tag='h1' type='l-heading'>Preview Heading</wpp-typography>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
