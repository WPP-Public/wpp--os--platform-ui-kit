import { newSpecPage } from '@stencil/core/testing'
import { WppSkeleton } from '../wpp-skeleton'

describe('wpp-skeleton', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppSkeleton],
      html: `<wpp-skeleton />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with custom width and height', async () => {
    const page = await newSpecPage({
      components: [WppSkeleton],
      html: `<wpp-skeleton width='99px' height='99px' />`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
