import { newSpecPage } from '@stencil/core/testing'
import { WppFullScreenModal } from '../wpp-full-screen-modal'

describe('wpp-full-screen-modal', () => {
  it('Should render default modal', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal></wpp-full-screen-modal>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })

  it('Should render open full-screen modal', async () => {
    const page = await newSpecPage({
      components: [WppFullScreenModal],
      html: `<wpp-full-screen-modal is-open=${true}></wpp-full-screen-modal>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()
    expect(page.root).toMatchSnapshot()
  })
})
