import { expect } from '@playwright/test'
import { WppModalsPage } from '../../pages/modals.page'
import test from './../../utils'

const wppModalsPage = new WppModalsPage()

test.beforeEach(async ({ page }) => {
  await wppModalsPage.setPage(page)
  await wppModalsPage.init()
  await wppModalsPage.openPage('vc/modals')
})

test.describe('WPP Fullscreen Modals', () => {
  test('[WPPOPENDS-T449] Check that the component passes the visual check - With Controls', async ({ page }) => {
    await wppModalsPage.fullScreenModalWithControlsButton.click()
    await page.waitForTimeout(500)

   await expect(wppModalsPage.fullScreenModalWindowWithControls).toHaveScreenshot()
  })

  test('[WPPOPENDS-T450] Check that the component passes the visual check - Without Controls', async ({ page }) => {
    await wppModalsPage.fullScreenModalWithoutControlsButton.click()
    await page.waitForTimeout(500)

    await expect(wppModalsPage.fullScreenModalWindow).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1297] Check that the full-screen modal window is 95% width and 90% height of the viewport - With Controls', async ({ page }) => {
    const viewports = [
      { width: 3840, height: 2160 },
      { width: 1920, height: 1080 },
      { width: 1080, height: 1920 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await wppModalsPage.openPage('vc/modals')

      await wppModalsPage.fullScreenModalWithControlsButton.click()

      await expect(wppModalsPage.fullScreenModalWindowWithControls).toBeVisible()

      const box = await wppModalsPage.fullScreenModalWindowWithControls.boundingBox();
      const viewport = page.viewportSize();

      const expectedWidth = viewport!.width * 0.95;
      const expectedHeight = viewport!.height * 0.90;

      expect(box!.width).toBeCloseTo(expectedWidth, 1);
      expect(box!.height).toBeCloseTo(expectedHeight, 1);

    }
  });

  test('[WPPOPENDS-T1298] Check that the full-screen modal window is 95% width and 90% height of the viewport - Without Controls', async ({ page }) => {
    const viewports = [
      { width: 3840, height: 2160 },
      { width: 1920, height: 1080 },
      { width: 1080, height: 1920 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await wppModalsPage.openPage('vc/modals')

      await wppModalsPage.fullScreenModalWithoutControlsButton.click()

      await expect(wppModalsPage.fullScreenModalWindow).toBeVisible()

      const box = await wppModalsPage.fullScreenModalWindow.boundingBox();
      const viewport = page.viewportSize();

      const expectedWidth = viewport!.width * 0.95;
      const expectedHeight = viewport!.height * 0.90;

      expect(box!.width).toBeCloseTo(expectedWidth, 1);
      expect(box!.height).toBeCloseTo(expectedHeight, 1);

    }
  });
});