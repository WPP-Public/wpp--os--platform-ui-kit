import { test, expect } from '@playwright/test'
import { WppNavSidebarPage } from '../../../pages/nav-sidebar.page'

const wppNavSidebarPage = new WppNavSidebarPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppNavSidebarPage.setPage(page)
  await wppNavSidebarPage.init()
  await wppNavSidebarPage.openPage('vc/nav-sidebar')
  consoleErrors = await wppNavSidebarPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length <= 2).toBeTruthy()
})

test.describe('Nav Sidebar', () => {
  //WPPLONOP-14387
  test('[WPPOPENDS-T824] Check the margin between label and icon', async ({ page }) => {
    const scheduledReportingItem = await page.locator('.wpp-tooltip >> .item')
    await expect(scheduledReportingItem).toHaveCSS('column-gap', '8px')
    const scheduledReportingItemLabel = await scheduledReportingItem.locator('.label')
    await expect(scheduledReportingItemLabel).toHaveCSS('flex-grow', '1')
  })
  
  test('[WPPOPENDS-T691] Check setting active item programatically', async ({ page }) => {
    const activeBtnProjects = await page.locator('button:has-text("Go to Projects")').first()
    const projectsItem = await page.locator('[label="Projects"]')
    const activeBtnProjectOne = await page.locator('button:has-text("Go to Projects 1")')
    const projectsItemOne = await page.locator('[label="Projects 01"]')
    const activePath = await page.locator('.wpp-nav-sidebar')

    await expect (projectsItem).not.toHaveAttribute('active')
    await expect (activePath).toHaveAttribute('active-path', '/dashboard')

    // if select item which has sub-items, it should become selected, but it should not become expanded
    await activeBtnProjects.click()
    await page.waitForTimeout(2000)
    expect(projectsItem).not.toHaveAttribute('expanded')
    expect(projectsItem).toHaveAttribute('active')
    await expect (activePath).toHaveAttribute('active-path', '/projects')

    // if select sub-item, main item should be expanded and sub-item should be selected
    await activeBtnProjectOne.click()
    await page.waitForTimeout(2000)
    expect(projectsItem).toHaveAttribute('expanded')
    expect(projectsItemOne).toHaveAttribute('active')
    await expect (activePath).toHaveAttribute('active-path', '/projects1')
  })
})
