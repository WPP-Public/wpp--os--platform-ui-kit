import { newE2EPage } from '@stencil/core/testing'

describe('wpp-toast-container', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<wpp-toast-container></wpp-toast-container>')

    const element = await page.find('wpp-toast-container')

    expect(element).toHaveClass('hydrated')
  })
})
