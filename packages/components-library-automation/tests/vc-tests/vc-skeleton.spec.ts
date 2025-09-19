import { expect } from '@playwright/test'
import { WppSkeletonPage } from '../../pages/skeleton.page'
import test from './../../utils'

const wppSkeletonPage = new WppSkeletonPage()

test.beforeEach(async ({ page }) => {
  await wppSkeletonPage.setPage(page)
  await wppSkeletonPage.init()
  await wppSkeletonPage.openPage('vc/skeleton')
  await wppSkeletonPage.setViewportSize(1280, 720)
})

test.describe('WPP Skeleton', () => {
  test('[WPPOPENDS-T318] Check that the component passes the visual check', async () => {
    await expect(wppSkeletonPage.skeletonTable).toHaveScreenshot()
  })
})
