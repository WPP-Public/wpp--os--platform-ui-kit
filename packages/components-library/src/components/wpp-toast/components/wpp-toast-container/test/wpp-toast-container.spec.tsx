import { newSpecPage } from '@stencil/core/testing'
import { WppToastContainer } from '../wpp-toast-container'

describe('wpp-toast-container', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppToastContainer],
      html: `<wpp-toast-container></wpp-toast-container>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
