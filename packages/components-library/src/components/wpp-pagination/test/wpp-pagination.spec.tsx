import { newSpecPage } from '@stencil/core/testing'
import { WppPagination } from '../wpp-pagination'
import { h } from '@stencil/core'

describe('wpp-pagination', () => {
  it('renders component with 78 pages', async () => {
    const itemsPerPage = [10, 11, 12, 13]

    const page = await newSpecPage({
      components: [WppPagination],
      template: () => <wpp-pagination count={78} itemsPerPage={itemsPerPage} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with 100 pages and with 13 itemsPerPage option', async () => {
    const itemsPerPage = [10, 11, 12, 13]

    const page = await newSpecPage({
      components: [WppPagination],
      template: () => <wpp-pagination count={100} itemsPerPage={itemsPerPage} selectedItemPerPage={13} />,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with 100 pages and with 5 active page number', async () => {
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => <wpp-pagination count={100} activePageNumber={5} />,
    })

    expect(page.root).toMatchSnapshot()
  })
})
