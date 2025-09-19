import { newSpecPage } from '@stencil/core/testing'
import { WppToast } from '../wpp-toast'

describe('wpp-toast', () => {
  it('renders component', async () => {
    jest.setTimeout(10000)

    const page = await newSpecPage({
      components: [WppToast],
      html: `<wpp-toast />`,
    })

    const instance = page.rootInstance

    jest.spyOn(instance, 'checkIfTextHasOneLine').mockImplementation(() => {})

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()

    await new Promise(resolve => setTimeout(resolve, 7000))
    await page.waitForChanges()

    const emitSpy = jest.spyOn(instance.wppToastComplete, 'emit')

    instance.onComplete()
    await page.waitForChanges()
    expect(emitSpy).toHaveBeenCalledWith({ currentIndex: '' })
  })
})
