import { expect, test } from '@playwright/test'
import { WppIconsPage } from '../../../pages/icons.page'

const wppIconsPage = new WppIconsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppIconsPage.setPage(page)
  await wppIconsPage.init()
  await wppIconsPage.openPage('vc/icons')
  consoleErrors = await wppIconsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Icons', () => {
  //WPPLONOP-24369
  test('[WPPOPENDS-T930] Check new icons: launch', async ({ page }) => {
    const launchIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-launch')
    await expect(launchIcon).toBeVisible()
    const launchIconSvg = await launchIcon.locator('svg')
    await expect(launchIconSvg).toHaveAttribute('role', 'presentation')
    await expect(launchIconSvg).toHaveAttribute('height', '20')
    await expect(launchIconSvg).toHaveAttribute('width', '20')
  })

  //WPPLONOP-24369
  test('[WPPOPENDS-T931] Check new icons: idea', async ({ page }) => {
    const ideaIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-idea')
    await expect(ideaIcon).toBeVisible()
    const ideaIconSvg = await ideaIcon.locator('svg')
    await expect(ideaIconSvg).toHaveAttribute('role', 'presentation')
    await expect(ideaIconSvg).toHaveAttribute('height', '20')
    await expect(ideaIconSvg).toHaveAttribute('width', '20')
  })

  //WPPLONOP-24369
  test('[WPPOPENDS-T932] Check new icons: sub-items', async ({ page }) => {
    const subItemsIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-sub-items')
    await expect(subItemsIcon).toBeVisible()
    const subItemsIconSvg = await subItemsIcon.locator('svg')
    await expect(subItemsIconSvg).toHaveAttribute('role', 'presentation')
    await expect(subItemsIconSvg).toHaveAttribute('height', '20')
    await expect(subItemsIconSvg).toHaveAttribute('width', '20')
  })

  //WPPLONOP-24369
  test('[WPPOPENDS-T933] Check new icons: branch-review', async ({ page }) => {
    const branchReviewIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-branch-review')
    await expect(branchReviewIcon).toBeVisible()
    const branchReviewIconSvg = await branchReviewIcon.locator('svg')
    await expect(branchReviewIconSvg).toHaveAttribute('role', 'presentation')
    await expect(branchReviewIconSvg).toHaveAttribute('height', '20')
    await expect(branchReviewIconSvg).toHaveAttribute('width', '20')
  })

  //WPPLONOP-24369
  test('[WPPOPENDS-T934] Check new icons: branch-request', async ({ page }) => {
    const branchRequestIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-branch-request')
    await expect(branchRequestIcon).toBeVisible()
    const branchRequestIconSvg = await branchRequestIcon.locator('svg')
    await expect(branchRequestIconSvg).toHaveAttribute('role', 'presentation')
    await expect(branchRequestIconSvg).toHaveAttribute('height', '20')
    await expect(branchRequestIconSvg).toHaveAttribute('width', '20')
  })

  //WPPLONOP-24369
  test('[WPPOPENDS-T935] Check new icons: hub', async ({ page }) => {
    const hubIcon = await page.locator(':has-text("Content") .wpp-icon.wpp-icon-hub')
    await expect(hubIcon).toBeVisible()
    const hubIconSvg = await hubIcon.locator('svg')
    await expect(hubIconSvg).toHaveAttribute('role', 'presentation')
    await expect(hubIconSvg).toHaveAttribute('height', '20')
    await expect(hubIconSvg).toHaveAttribute('width', '20')
  })
})
