import { test, expect } from '@playwright/test'
import { WppTypographyPage } from '../../../pages/typography.page'

const wppTypographyPage = new WppTypographyPage()

test.beforeEach(async ({ page }) => {
  await wppTypographyPage.setPage(page)
  await wppTypographyPage.init()
  await wppTypographyPage.openPage('vc/typography')
})

test.describe('Typography', () => {
  test('[WPPOPENDS-T766] Check typography styles', async ({ page }) => {
    await expect (wppTypographyPage.display5xl).toHaveCSS('--wpp-default-type-font-size', '48px')
    await expect (wppTypographyPage.display5xl).toHaveCSS('--wpp-default-type-font-weight', '600')
    await expect (wppTypographyPage.display5xl).toHaveCSS('--wpp-default-type-line-height', '62px')
    await expect (wppTypographyPage.display2xsStrong).toHaveCSS('--wpp-default-type-font-size', '10px')
    await expect (wppTypographyPage.display2xsStrong).toHaveCSS('--wpp-default-type-font-weight', '700')
    await expect (wppTypographyPage.display2xsStrong).toHaveCSS('--wpp-default-type-line-height', '20px')
  })
})