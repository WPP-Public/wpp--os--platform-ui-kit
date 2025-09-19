import { newSpecPage } from '@stencil/core/testing'
import { WppTimePicker } from '../wpp-time-picker'

describe('wpp-time-picker', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker></wpp-time-picker>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with minutesInterval = 15', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker minutes-interval="15" />`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('renders component with minutesInterval = 15 and label', async () => {
    const page = await newSpecPage({
      components: [WppTimePicker],
      html: `<wpp-time-picker minutes-interval="15"></wpp-time-picker>`,
    })

    const component = page.rootInstance as any

    component.labelConfig = { text: 'Label' }

    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
})
