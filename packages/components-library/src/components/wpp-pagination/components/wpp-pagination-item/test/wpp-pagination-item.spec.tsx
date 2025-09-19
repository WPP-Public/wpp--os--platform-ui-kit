import { newSpecPage } from '@stencil/core/testing'
import { WppPaginationItem } from '../wpp-pagination-item'

describe('wpp-pagination-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number={1}></wpp-pagination-item>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with selected class and number 2', async () => {
    const page = await newSpecPage({
      components: [WppPaginationItem],
      html: `<wpp-pagination-item number={2} selected></wpp-pagination-item>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
