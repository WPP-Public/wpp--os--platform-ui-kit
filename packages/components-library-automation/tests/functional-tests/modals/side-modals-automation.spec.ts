import { test, expect } from '@playwright/test'
import { WppModalsPage } from '../../../pages/modals.page'

const wppModalsPage = new WppModalsPage()

test.beforeEach(async ({ page }) => {
  await wppModalsPage.setPage(page)
  await wppModalsPage.init()
  await wppModalsPage.openPage('vc/modals')
})

test.describe('WPP Side Modals', () => {
  test('[WPPOPENDS-T262] Check that the component closes when you click outside', async () => {
    await wppModalsPage.sideModalWithControlsButton.click()

    await expect(wppModalsPage.sideModalWithControls.locator('.header-container')).toBeVisible()
    await expect(wppModalsPage.sideModalWithControls).toHaveJSProperty('open', true)
    //click outside
    await wppModalsPage.sideModalWithControls.locator('.overlay-color').click()

    await expect(wppModalsPage.sideModalWithControls.locator('.header-container')).not.toBeVisible()
    await expect(wppModalsPage.sideModalWithControls).toHaveJSProperty('open', false)
  })

  test('[WPPOPENDS-T744] Check that component is closed after clicking on the Close button', async () => {
    await wppModalsPage.sideModalWithControlsButton.click()
    await expect(wppModalsPage.sideModalWithControls).toHaveAttribute('open')
    await expect(wppModalsPage.sideModalWithControls).not.toHaveAttribute('open', 'false')
    await wppModalsPage.sideModalWithControls.locator('.wpp-icon.wpp-icon-cross').click()
    await expect(wppModalsPage.sideModalWithControls).toHaveAttribute('open', 'false')
  })
})
