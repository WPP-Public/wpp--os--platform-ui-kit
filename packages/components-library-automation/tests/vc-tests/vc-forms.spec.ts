import { expect } from '@playwright/test'
import { WppFormsPage } from '../../pages/forms.page'
import test from './../../utils'

const wppFormsPage = new WppFormsPage()

test.beforeEach(async ({ page }) => {
  await wppFormsPage.setPage(page)
  await wppFormsPage.init()
  await wppFormsPage.openPage('form-controls')
  await wppFormsPage.setViewportSize(1280, 720)
})

test.describe('WPP Form Vanilla', () => {
  //Bug WPPLONOP-9116 fixed
  test("[WPPOPENDS-T415] Check that clicking the Reset button clears all the form's select values", async ({
    page,
  }) => {
    await wppFormsPage.selectValuesForSelects('vanilla', page)
    await wppFormsPage.checkSelectedOptions()
    //Reset values
    await wppFormsPage.resetButtonVanilla.click()

    await expect(wppFormsPage.formVanilla).toHaveScreenshot()
  })
})
