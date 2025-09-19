import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('vc/selects-single')
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 2).toBeTruthy()
})

test.describe('Selects Single', () => {
  //WPPLONOP-24371
  test('[WPPOPENDS-T653] Check the helper text typography', async ({ page }) => {
    const helperMessage = page.locator('[class*="inline-message-wrapper"]').first()

    const fontSize = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('font-size')
    })

    const fontWeight = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('font-weight')
    })

    const color = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('color')
    })

    await expect(fontSize).toBe('12px')
    await expect(fontWeight).toBe('500')
    await expect(color).toBe('rgb(77, 83, 88)')
  })

  //WPPLONOP-24139
    test('[WPPOPENDS-T947] Check that left icon exists for component', async ({ page }) => {
    const singleSelectsWithLeftIcon = await page.locator('[data-testid="select-with-items"] >> .wpp-icon.wpp-icon-clock')
    await expect (singleSelectsWithLeftIcon).toBeVisible()
    const iconSvg = singleSelectsWithLeftIcon.locator('svg')
    await expect(iconSvg).toHaveAttribute('role', 'presentation')
    await expect(iconSvg).toHaveAttribute('width', '20')
    await expect(iconSvg).toHaveAttribute('height', '20')
  })

  test('[WPPOPENDS-T661] Check switch on and off Search field: withSearch = auto, the search bar should appear only when there are more than 10 elements in the dropdown, withSearch-false, no search bar and withSearch=true, there is search bar', async ({ page }) => {
    await wppSelectsPage.openPage('single-select')
    await wppSelectsPage.singleSelectSearchAuto.scrollIntoViewIfNeeded()
    await wppSelectsPage.singleSelectSearchAuto.click()
    await expect(wppSelectsPage.listItems).toHaveCount(20)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).toBeVisible({visible: true})
    await wppSelectsPage.singleSelectSearchAuto.click()

    await wppSelectsPage.singleSelectSearchTrue.click()
    await page.waitForTimeout(500)
    await expect(wppSelectsPage.listItems).toHaveCount(20)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).toBeVisible({visible: true})
    await wppSelectsPage.singleSelectSearchTrue.click()

    await wppSelectsPage.singleSelectSearchFalse.click()
    await page.waitForTimeout(500)
    await expect(wppSelectsPage.listItems).toHaveCount(20)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).not.toBeVisible()
    await wppSelectsPage.singleSelectSearchFalse.click()
    // 6 items in the dropdown
    await wppSelectsPage.changeCountItemsBtn.click()

    await wppSelectsPage.singleSelectSearchAuto.click()
    await page.waitForTimeout(500)
    await expect(wppSelectsPage.listItems).toHaveCount(6)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).not.toBeVisible()
    await wppSelectsPage.singleSelectSearchAuto.click()

    await wppSelectsPage.singleSelectSearchTrue.click()
    await page.waitForTimeout(500)
    await expect(wppSelectsPage.listItems).toHaveCount(6)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).toBeVisible({visible: true})
    await wppSelectsPage.singleSelectSearchTrue.click()

    await wppSelectsPage.singleSelectSearchFalse.click()
    await page.waitForTimeout(500)
    await expect(wppSelectsPage.listItems).toHaveCount(6)
    await expect (wppSelectsPage.multipleSelectWithSearchInput).not.toBeVisible()
    await wppSelectsPage.singleSelectSearchFalse.click()
  })

  test('[WPPOPENDS-T788] Check parent-child dependencies select for single select', async ({ page }) => {
    await wppSelectsPage.openPage('single-select')
    await wppSelectsPage.singleDependencyParentSelectInput.scrollIntoViewIfNeeded()
    await expect (wppSelectsPage.singleDependencyParentSelectInput).toHaveText('Select Parent Option')
    // Select parent option 1
    await wppSelectsPage.singleDependencyParentSelectInput.click()
    await wppSelectsPage.listItems.first().click()
    await page.waitForTimeout(2000)

    await expect (wppSelectsPage.singleDependencyFirstChildInput).toHaveText('Parent Option 1 - First Child - Option 1')
    await expect (wppSelectsPage.singleDependencySecondChildInput).toHaveText('Parent Option 1 - First Child - Option 1 - Second Child - Option 1')

    // Select parent option 2
    await wppSelectsPage.singleDependencyParentSelectInput.click()
    await wppSelectsPage.listItems.nth(1).click()

    await expect (wppSelectsPage.singleDependencyFirstChildInput).toHaveText('Parent Option 2 - First Child - Option 6')
    await expect (wppSelectsPage.singleDependencySecondChildInput).toHaveText('Parent Option 2 - First Child - Option 6 - Second Child - Option 11')

    // Change first child value should change second child value
    await wppSelectsPage.singleDependencyFirstChildInput.click()
    await wppSelectsPage.listItems.nth(3).click()
    await expect (wppSelectsPage.singleDependencyFirstChildInput).toHaveText('Parent Option 2 - First Child - Option 9')
    await page.waitForTimeout(2000)

    await expect (wppSelectsPage.singleDependencySecondChildInput).toHaveText('Parent Option 2 - First Child - Option 9 - Second Child - Option 17')
  })
})