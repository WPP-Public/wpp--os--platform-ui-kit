import { newE2EPage } from '@stencil/core/testing'

describe('wpp-radio-group', () => {
  it('renders component', async () => {
    const page = await newE2EPage()

    await page.setContent('<wpp-radio-group></wpp-radio-group>')

    const element = await page.find('wpp-radio-group')

    expect(element).toHaveClass('hydrated')
  })

  it('sets checked state only for single clicked radio button', async () => {
    const page = await newE2EPage()

    await page.setContent(
      '<wpp-radio-group>' +
        '<wpp-radio name="contact" value="email" label="Email"></wpp-radio>' +
        '<wpp-radio name="contact" value="mail" label="Mail"></wpp-radio>' +
        '<wpp-radio name="contact" value="phone" label="Phone"></wpp-radio></wpp-radio-group>',
    )

    const radioButtons = await page.findAll('wpp-radio')

    const emailRadioButton = await page.findAll('wpp-radio >>> input[value="email"]')

    const phoneRadioButton = await page.findAll('wpp-radio >>> input[value="phone"]')

    await emailRadioButton[0].click()

    expect(await radioButtons[0].getProperty('checked')).toEqual(true)
    expect(await radioButtons[1].getProperty('checked')).toEqual(false)
    expect(await radioButtons[2].getProperty('checked')).toEqual(false)

    await phoneRadioButton[0].click()

    const radioButtonsAfterClick = await page.findAll('wpp-radio')

    expect(await radioButtonsAfterClick[0].getProperty('checked')).toEqual(false)
    expect(await radioButtonsAfterClick[1].getProperty('checked')).toEqual(false)
    expect(await radioButtonsAfterClick[2].getProperty('checked')).toEqual(true)
  })
})
