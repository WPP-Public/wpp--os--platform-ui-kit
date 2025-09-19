import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { WppFloatingButton } from '../wpp-floating-button'

describe('wpp-floating-button', () => {
  it('should render primary floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => <wpp-floating-button></wpp-floating-button>,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render disabled floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => <wpp-floating-button disabled={true} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render loading floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => <wpp-floating-button loading={true} />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
