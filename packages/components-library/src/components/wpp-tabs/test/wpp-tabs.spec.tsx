import { newSpecPage } from '@stencil/core/testing'
import { WppTabs } from '../wpp-tabs'
import { WppTab } from '../components/wpp-tab/wpp-tab'

beforeEach(() => {
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(() => 'Mocking works'),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  })
})

describe('wpp-tab', () => {
  it('should render bar with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppTabs, WppTab],
      html: `<wpp-tabs value='food'>
                <wpp-tab value="houses">Houses</wpp-tab>
                <wpp-tab value="cars" disabled>Cars</wpp-tab>
                <wpp-tab value="food" counter="6">Food</wpp-tab>
            </wpp-tabs>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
