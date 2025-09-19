import { expect } from '@playwright/test'
import { WppModalsPage } from '../../pages/modals.page'
import test from './../../utils'

const wppModalsPage = new WppModalsPage()

test.beforeEach(async ({ page }) => {
  await wppModalsPage.setPage(page)
  await wppModalsPage.init()
  await wppModalsPage.openPage('vc/modals')
})

test.describe('WPP Side Modals', () => {
  test('[WPPOPENDS-T412] Check that the component passes the visual check - With Controls', async ({ page }) => {
    await wppModalsPage.sideModalWithControlsButton.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T418] Check that the component passes the visual check - Without Controls', async ({ page }) => {
    await wppModalsPage.sideModalWithoutControlsButton.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalSizeL).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1252] Check that the component passes the visual check - Loading buttons', async ({ page }) => {
    await wppModalsPage.triggerLoadingBtn.click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1253] Check that the component passes the visual check - Disable buttons', async ({ page }) => {
    await wppModalsPage.disableBtn.click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1254] Check that the component passes the visual check - Submit button', async ({ page }) => {
    await wppModalsPage.setConfigurationWithSubmitBtn.click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1255] Check that the component passes the visual check - Close/Submit buttons', async ({ page }) => {
    await wppModalsPage.setConfigurationWithSubmitCloseBtn.click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1256] Check that the component passes the visual check - Remove/Close/Submit buttons', async ({ page }) => {
    await wppModalsPage.setConfigurationWithSubmitCloseDeleteBtn.click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveScreenshot();
  });

  test('[WPPOPENDS-T419] Check that the hover over an avatar passes the visual check', async ({ page }) => {
    await wppModalsPage.sideModalWithoutControlsButton.click();
    await page.waitForTimeout(500);
    await wppModalsPage.modalAvatar.first().hover();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalSizeL).toHaveScreenshot();
  });

  test('[WPPOPENDS-T1257] Check that the component has correct paddings', async ({ page }) => {
    await wppModalsPage.setConfigurationBtn.nth(33).click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);

    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveCSS('--side-modal-actions-paddings', '24px 32px 24px 32px');
    await expect(wppModalsPage.sideModalWithActionsConfigSizeM).toHaveCSS('--side-modal-header-paddings', '24px 24px 20px 32px');
  });

  test('[WPPOPENDS-T1258] Check that the component has the correct background overlay color', async ({ page }) => {
    await wppModalsPage.setConfigurationBtn.nth(33).click();
    await wppModalsPage.sideModalWithActionsConfigBtn.click();
    await page.waitForTimeout(500);
  
    const bgColor = await wppModalsPage.overlayModal.evaluate(el => 
      getComputedStyle(el).getPropertyValue('--side-modal-overlay-bg-color').trim()
    );
    
    expect(bgColor).toBe('color-mix(in srgb, #A2A9B0 60%, transparent)');
  });
});
