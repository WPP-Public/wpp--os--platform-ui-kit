import { test, expect } from '@playwright/test'
import { WppSearchPage } from '../../../pages/search.page'

const wppSearchPage = new WppSearchPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppSearchPage.setPage(page)
  await wppSearchPage.init()
  await wppSearchPage.openPage('vc/search')
  await page.waitForTimeout(1000)
  consoleErrors = await wppSearchPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Search', () => {
  test('[WPPOPENDS-T460] Check that component can be searched for a valid item and an item can be selected', async () => {
    await wppSearchPage.regularSearch.locator('input').type('Orange')

    await expect(wppSearchPage.regularSearch.locator('.wpp-list-item:visible')).toHaveCount(1)
    await expect(wppSearchPage.regularSearch.locator('.highlight')).toHaveText('Orange')

    await wppSearchPage.regularSearch.locator('[label="Orange"]').click()

    await expect(wppSearchPage.regularSearch.locator('.dropdown-list')).not.toBeVisible()
    await expect(wppSearchPage.regularSearch.locator('.values .wpp-typography')).toHaveText('Orange')
    await expect(wppSearchPage.regularSearch.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T463] Check that component is focused when the page is opened', async () => {
    await expect(wppSearchPage.regularSearch).toBeFocused()
  })

  test('[WPPOPENDS-T456] Check that component is closed when clicked outside the component', async ({ page }) => {
    await wppSearchPage.regularSearch.locator('input').type('Kiwi')
    await page.locator('text=Size M').click()

    await expect(wppSearchPage.regularSearch.locator('.dropdown-list')).not.toBeVisible()
  })

  test('[WPPOPENDS-T457] Check that Nothing Found label is displayed when searching for non-existent item', async () => {
    await wppSearchPage.regularSearch.locator('input').type('Kiwiki')

    await expect(wppSearchPage.regularSearch.locator('.wpp-list-item:visible')).toHaveCount(1)
    await expect(wppSearchPage.regularSearch.locator('.wpp-list-item:visible').first()).toHaveText('Nothing found')
  })

  test('[WPPOPENDS-T462] Check that component can be searched for a valid item with several spaces before the search query', async () => {
    await wppSearchPage.regularSearch.locator('input').type(' water')

    await expect(wppSearchPage.regularSearch.locator('.wpp-list-item:visible')).toHaveCount(1)
    await expect(wppSearchPage.regularSearch.locator('[label="Watermelon"]')).toBeVisible()
  })

  test('[WPPOPENDS-T461] Check that component can be searched for a valid item with several spaces after the search query', async () => {
    await wppSearchPage.regularSearch.locator('input').type('pine ')

    await expect(wppSearchPage.regularSearch.locator('.wpp-list-item:visible')).toHaveCount(1)
    await expect(wppSearchPage.regularSearch.locator('[label="Pineapple"]')).toBeVisible()
  })

  test('[WPPOPENDS-T464] Check that the component can have default value', async ({ page }) => {
    await page.locator('text=Size M').click()

    await expect(wppSearchPage.regularSearch.locator('.values .wpp-typography')).toHaveText('Pineapple')
  })

  test('[WPPOPENDS-T459] Check that all the items are displayed in the list when simpleSearch=false', async () => {
    await wppSearchPage.simpleSearchOffSearch.click()
    await wppSearchPage.simpleSearchOffSearch.locator('input').type('Kiwi')

    await expect(wppSearchPage.simpleSearchOffSearch.locator('.dropdown-list')).toBeVisible()
    await expect(wppSearchPage.simpleSearchOffSearch.locator('.wpp-list-item:visible')).toHaveCount(16)
  })

  test('[WPPOPENDS-T465] Check that dropdown is displayed when component is clicked (openDropdownOnClick=true)', async () => {
    await wppSearchPage.dropdownOpenOnClickSearch.click()

    await expect(wppSearchPage.dropdownOpenOnClickSearch.locator('.dropdown-list')).toBeVisible()
    await expect(wppSearchPage.dropdownOpenOnClickSearch.locator('.wpp-list-item:visible')).toHaveCount(16)
  })

  test('[WPPOPENDS-T451] Check that input is empty after clicking on x icon', async ({ page }) => {
    await page.locator('text=Size M').click()
    await wppSearchPage.regularSearch.locator('.wpp-icon-cross').click()

    await expect(wppSearchPage.regularSearch.locator('[placeholder="Select fruits"]')).toBeVisible()
    await expect(wppSearchPage.regularSearch.locator('.wpp-icon-cross')).not.toBeVisible()
    await expect(wppSearchPage.regularSearch.locator('.dropdown-list')).not.toBeVisible()
  })

  test('[WPPOPENDS-T466] Check that dropdown is not displayed after searching when showOptions=false', async () => {
    await wppSearchPage.showOptionsOffSearch.click()
    await wppSearchPage.showOptionsOffSearch.locator('input').type('Pine')

    await expect(wppSearchPage.showOptionsOffSearch.locator('.dropdown-list')).not.toBeVisible()
  })

  test('[WPPOPENDS-T454] Check that item can be unselected from the dropdown', async () => {
    await wppSearchPage.regularSearch.locator('input').type('Pineapple')
    await wppSearchPage.regularSearch.locator('.wpp-list-item:visible').click()

    await expect(wppSearchPage.regularSearch.locator('[placeholder="Select fruits"]')).toBeVisible()
    await expect(wppSearchPage.regularSearch.locator('.wpp-icon-cross')).not.toBeVisible()
    await expect(wppSearchPage.regularSearch.locator('.dropdown-list')).not.toBeVisible()
  })

  //WPPLONOP-24143
  test('[WPPOPENDS-T949] Loading search input should have a spinner', async ({ page }) => {
    const loadingSearch = page.locator('[class*="wpp-search"][loading]').first()
    await loadingSearch.click()
    loadingSearch.locator('input').type('Pine')
    await expect(loadingSearch.locator('[class*="wpp-spinner"][role="status"]')).toBeVisible()
  })
})
