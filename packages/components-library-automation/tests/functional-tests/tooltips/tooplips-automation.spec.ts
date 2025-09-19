import { test, expect } from '@playwright/test'
import { WppTooltipsPage } from '../../../pages/tooltips.page'

const wppTooltipsPage = new WppTooltipsPage()

test.beforeEach(async ({ page }) => {
  await wppTooltipsPage.setPage(page)
  await wppTooltipsPage.init()
  await wppTooltipsPage.openPage('vc/tooltips')
})

test.describe('Tooltips', () => {
  //WPPLONOP-23295
  test('[WPPOPENDS-T828] Check that tooplip is displayed', async ({ page }) => {
    await wppTooltipsPage.rightTooltipButton.hover()
    const rightTooltip = await wppTooltipsPage.rightTooltipButton.locator('[data-testid="wppButton"]').getAttribute('aria-describedby');

    await expect(page.locator(`#${rightTooltip}`)).toBeVisible();
  })

  //WPPLONOP-23523
   test('[WPPOPENDS-T829] Check warning tooltip', async ({ page }) => {
      await wppTooltipsPage.warningTooltipBtn.first().hover()
      const warningTooltip = await wppTooltipsPage.warningTooltipBtn.first().locator('[data-testid="wppButton"]').getAttribute('aria-describedby');

      await expect(page.locator(`#${warningTooltip}`)).toBeVisible();
      await expect(wppTooltipsPage.warningTooltipBtn.first()).toHaveAttribute('text', 'Warning Message')
    })

    test('[WPPOPENDS-T1285] Check warning tooltip - Title+Text', async ({ page }) => {
      await wppTooltipsPage.warningTooltipBtn.nth(1).hover()
      const warningTooltip = await wppTooltipsPage.warningTooltipBtn.nth(1).locator('[data-testid="wppButton"]').getAttribute('aria-describedby');

      await expect(page.locator(`#${warningTooltip}`)).toBeVisible();
      await expect(wppTooltipsPage.warningTooltipBtn.nth(1)).toHaveAttribute('text', 'Warning Message')
  })
    
    //WPPLONOP-23523
    test('[WPPOPENDS-T830] Check error tooltip', async ({ page }) => {
        await wppTooltipsPage.errorTooltipBtn.first().hover()
        const errorTooltip = await wppTooltipsPage.errorTooltipBtn.first().locator('[data-testid="wppButton"]').getAttribute('aria-describedby');

        await expect(page.locator(`#${errorTooltip}`)).toBeVisible();
        await expect(wppTooltipsPage.errorTooltipBtn.first()).toHaveAttribute('text', 'Error Message')
    })

    test('[WPPOPENDS-T1284] Check error tooltip - Title+Text', async ({ page }) => {
      await wppTooltipsPage.errorTooltipBtn.nth(1).hover()
      const errorTooltip = await wppTooltipsPage.errorTooltipBtn.nth(1).locator('[data-testid="wppButton"]').getAttribute('aria-describedby');

      await expect(page.locator(`#${errorTooltip}`)).toBeVisible();
      await expect(wppTooltipsPage.errorTooltipBtn.first()).toHaveAttribute('text', 'Error Message')
  })

    //WPPLONOP-23670
    test('[WPPOPENDS-T831] Check custom content tooltip', async ({ page }) => {
        await page.locator('[data-testid="allow-html-tooltip-button"]').hover()
        const customContentTooltip = await page.locator('.tippy-box')
        await expect(customContentTooltip).toHaveAttribute('data-state', 'visible')
        await expect(customContentTooltip).toHaveAttribute('data-placement', 'right')

        const customContentTooltipContent = await page.locator('.wpp-list-item.wpp-mounted')
        await expect(customContentTooltipContent).toHaveText(['List Item', 'List Item', 'List Item'])
    })

    //WPPLONOP-23670
    test('[WPPOPENDS-T832] Check update position tooltip', async ({ page }) => {
        const updateTooltipBtn = await page.locator(':text("Click to update position")')
        await updateTooltipBtn.hover()
        const updateTooltip = await page.locator('.tippy-box')
        const updateTooltipStyle = await updateTooltip.getAttribute('data-placement')
        await expect (updateTooltipStyle).toBe('top')
        await updateTooltipBtn.click()
        const updateTooltipStyleChanged = await updateTooltip.getAttribute('data-placement')
        await expect (updateTooltipStyleChanged).toBe('bottom')
    })

    //WPPLONOP-23670
    test('[WPPOPENDS-T833] Check tooltip triggered by click', async ({ page }) => {
      const triggeredTooltipBtn = await page.getByRole('button', { name: 'Tooltip triggered by click' })
      const triggeredTooltip = await page.locator('.tippy-box')
      await expect (triggeredTooltip).toBeVisible({visible:false})
      await triggeredTooltipBtn.click()
      await expect (triggeredTooltip).toBeVisible()
  })
})