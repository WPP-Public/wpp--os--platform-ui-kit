import { newSpecPage } from '@stencil/core/testing'
import { WppBackToTopButton } from '../wpp-back-to-top-button'

describe('wpp-back-to-top-button', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppBackToTopButton],
      html: `<wpp-back-to-top-button />`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
