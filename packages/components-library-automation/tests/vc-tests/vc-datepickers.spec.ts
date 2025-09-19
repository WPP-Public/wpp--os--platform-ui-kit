import { expect } from '@playwright/test'
import { WppDatepickersPage } from '../../pages/datepickers.page'
import test from './../../utils'

const wppDatepickersPage = new WppDatepickersPage()

test.beforeEach(async ({ page }) => {
  await wppDatepickersPage.setPage(page)
  await wppDatepickersPage.init()
  await wppDatepickersPage.openPage('vc/datepicker')
  await wppDatepickersPage.setViewportSize(1280, 720)
})

test.describe('WPP Datepicker', () => {
  test('[WPPOPENDS-T301] Check that the component passes the visual check', async () => {
    await expect(wppDatepickersPage.datepickers).toHaveScreenshot()
  })

  test('[WPPOPENDS-T302] Check that the date can be entered into the input', async ({ page }) => {
    await wppDatepickersPage.datepickerInput.click()
    await wppDatepickersPage.datepickerInput.type('07082022-07122022', { delay: 100 })
    await page.waitForTimeout(1000)

    await expect(wppDatepickersPage.datepickers).toHaveScreenshot()
  })
})
