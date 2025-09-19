import { expect } from '@playwright/test'
import { WppAutocompletePage } from '../../pages/autocomplete.page'

const wppAutocompletePage = new WppAutocompletePage()
import test from './../../utils'

test.beforeEach(async ({ page }) => {
  await wppAutocompletePage.setPage(page)
  await wppAutocompletePage.init()
  await wppAutocompletePage.openPage('autocomplete')
  await wppAutocompletePage.setViewportSize(1280, 720)
})

test.describe('WPP Autocomplete', () => {
  test('[WPPOPENDS-T327] Check that the component passes the visual check', async ({ page }) => {
    //Autocomplete page takes some time to load and some browsers can't do it in time
    await page.waitForTimeout(3000)
    await expect(wppAutocompletePage.autocompletes).toHaveScreenshot()
  })

  test('[WPPOPENDS-T395] Check that the component passes the visual check - S size', async () => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await expect(wppAutocompletePage.sSizeAutocompletes.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T527] Check that the Nothing Found label is displayed when searching for the non-existent items', async ({
    page,
  }) => {
    await wppAutocompletePage.basicAutocomplete.click()
    await wppAutocompletePage.basicAutocomplete.type('XYZ')
    await page.waitForTimeout(2000)

    await expect(wppAutocompletePage.autocompletes).toHaveScreenshot()
  })

  test('[WPPOPENDS-T528] Check that clicking the Clear All button unselects all the selected items', async ({
    page,
  }) => {
    await page.waitForTimeout(500)
    await wppAutocompletePage.basicClearAllButton.click()

    await expect(wppAutocompletePage.basicAutocomplete).toHaveScreenshot()
  })

  test('[WPPOPENDS-T356] Check that the active state of extended variant passes visual check', async ({ page }) => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await page.waitForTimeout(500)
    await wppAutocompletePage.extendedAutocomplete.first().click()

    await expect(wppAutocompletePage.extendedAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T357] Check that the active state of regular variant passes visual check', async ({ page }) => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await page.waitForTimeout(500)
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await page.evaluate(() => window.scrollTo(0, 300))
    await expect(wppAutocompletePage.regularAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T512] Check that item with long label is truncated - Dropdown list', async () => {
    await wppAutocompletePage.navigateToExampleAndSearchLongLabelItem()

    await expect(wppAutocompletePage.regularAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T560] Check that item with long label is truncated - Pill', async ({ page }) => {
    await wppAutocompletePage.navigateToExampleAndSearchLongLabelItem()
    await page.evaluate(() => window.scrollTo(0, 300))
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible').click()
    await wppAutocompletePage.showMoreActionBtn.click()
    await expect(wppAutocompletePage.regularAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T511] Check that item with long label is truncated - Input - Regular', async ({ page }) => {
    await wppAutocompletePage.navigateToExampleAndSearchLongLabelItem()

    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible').click()

    //Click out the component
    await page.locator('text=Components Library Examples').click()
    await page.waitForTimeout(500)

    await expect(wppAutocompletePage.regularAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T559] Check that item with long label is truncated - Input - Extended', async ({ page }) => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await page.waitForTimeout(500)
    await wppAutocompletePage.extendedAutocomplete.first().click()
    await wppAutocompletePage.extendedAutocomplete.first().type('universe')

    await wppAutocompletePage.extendedAutocomplete.locator('.wpp-list-item:visible').click()

    //Click out the component
    await page.locator('text=Components Library Examples').click()
    await page.waitForTimeout(500)

    await expect(wppAutocompletePage.extendedAutocompleteArea.first()).toHaveScreenshot()
  })

  test('[WPPOPENDS-T413] Check that the component with inline messages passes the visual check', async ({ page }) => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await page.waitForTimeout(500)

    await expect(wppAutocompletePage.inlineMessagesAutocompletes).toHaveScreenshot()
  })

  test('[WPPOPENDS-T334] Check that the component with inline messages and loading state passes the visual check', async () => {
    await wppAutocompletePage.navigateToVCAutocompletes()

    await wppAutocompletePage.errorAutocomplete.click()
    await wppAutocompletePage.errorAutocomplete.type('a')

    await expect(wppAutocompletePage.inlineMessagesAutocompletes).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1260] Check that the +n More button is displayed when selecting multiple items - Multiple', async ({ page } ) => {
    await wppAutocompletePage.navigateToVCAutocompletes()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Avacado"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Blueberry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Cherry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Durian"]').click()
    await expect(wppAutocompletePage.showMoreActionBtn).toHaveText('+2 more')
  })

  test('[WPPOPENDS-T1261] Check that the +n More button has correct padding - Multiple', async ({ page } ) => {
    await wppAutocompletePage.navigateToVCAutocompletes()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Avacado"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Blueberry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Cherry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Durian"]').click()
    await expect(wppAutocompletePage.showMoreActionBtn).toHaveCSS('--ab-padding', '5px 8px')
  })

  test('[WPPOPENDS-T1262] Check that it is possible to display all selected pills by clicking on the +n More button - Multiple', async ({ page } ) => {
    await wppAutocompletePage.navigateToVCAutocompletes()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Avacado"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Blueberry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Cherry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Durian"]').click()
    await wppAutocompletePage.showMoreActionBtn.click()
    await expect(wppAutocompletePage.selectedPillsList).toBeVisible()
    await expect(wppAutocompletePage.selectedPillsList.locator('.wpp-pill')).toHaveCount(5)
  })

  test('[WPPOPENDS-T1263] Check that it is possible to hide all selected pills by clicking on the ShowLess button - Multiple', async ({ page } ) => {
    await wppAutocompletePage.navigateToVCAutocompletes()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Avacado"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Blueberry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Cherry"]').click()
    await wppAutocompletePage.regularAutocompleteWithoutSuggestions.locator('[label="Durian"]').click()
    await wppAutocompletePage.showMoreActionBtn.click()
    await expect(wppAutocompletePage.selectedPillsList).toBeVisible()
    await expect(wppAutocompletePage.selectedPillsList.locator('.wpp-pill')).toHaveCount(5)
    await wppAutocompletePage.showLessActionBtn.click()
    await expect(wppAutocompletePage.showMoreActionBtn).toHaveText('+2 more')
  })

  test('[WPPOPENDS-T1264] Check that the value entered in the search field is not cleared after closing the drop-down list - With persistent search', async ({ page } ) => {
    await wppAutocompletePage.navigateToVCAutocompletes()
    await wppAutocompletePage.autocompleteWithPersistentSearch.click()
    await wppAutocompletePage.autocompleteWithPersistentSearch.type('t')
    await wppAutocompletePage.autocompleteWithPersistentSearch.locator('[label="Grapefruit"]').click()
    await expect(wppAutocompletePage.autocompleteWithPersistentSearchInput).toHaveText('Grapefruit')
    await page.waitForTimeout(1000)
    await wppAutocompletePage.autocompleteWithPersistentSearch.nth(0).click()
    await expect(wppAutocompletePage.autocompleteWithPersistentSearch.getByPlaceholder('Select fruits')).toHaveValue('t')
  })
})
