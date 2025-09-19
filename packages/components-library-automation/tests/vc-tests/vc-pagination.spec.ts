import { expect } from '@playwright/test'
import { WppPaginationPage } from '../../pages/pagination.page'
import test from './../../utils'

const wppPaginationPage = new WppPaginationPage()

test.beforeEach(async ({ page }) => {
  await wppPaginationPage.setPage(page)
  await wppPaginationPage.init()
  await wppPaginationPage.openPage('vc/pagination')
  await wppPaginationPage.setViewportSize(1280, 720)
})

//Bug WPPLONOP-9116 fixed
test.describe('WPP Pagination', () => {
  test('[WPPOPENDS-T323] Check that the component passes the visual check', async ({ page }) => {
    await wppPaginationPage.paginationList.click()
    await page.waitForTimeout(200)

    await expect(wppPaginationPage.paginations).toHaveScreenshot()
  })

  test('[WPPOPENDS-T605] Check that the component is fully displayed in a card', async ({ page }) => {
    await wppPaginationPage.paginationInCard.click()
    await page.waitForTimeout(200)

    await expect(wppPaginationPage.paginations).toHaveScreenshot()
  })
})
