import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'
import * as colorTable from '../../../../components-library/src/themes/wpp.json'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('selects')
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page)
  await wppSelectsPage.singleSelect.click()
  await page.waitForTimeout(1000)
})

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 2).toBeTruthy()
})

test.describe('Single Select', () => {
  //bug WPPLONOP-8649 fixed
  test('[WPPOPENDS-T181] Check that the component has default placeholder text', async ({ page }) => {
    await expect(wppSelectsPage.singleSelect).toHaveText('Choose option')
  })

  // bug WPPLONOP-9060, WPPLONOP-7434 fixed
  test('[WPPOPENDS-T182] Check that component can be searched for a valid item with several spaces before the search query', async ({
    page,
  }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type(' option 2')
    
    await expect(
      page.locator('[role="WPP-LIST-ITEM"]').filter({ has: page.locator('text=Option 2') }).filter({ has: page.locator('text=0') })
    ).toBeVisible();
    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"] .highlight')).toHaveText(
      'Option 2',
    )
    await expect(wppSelectsPage.multipleSelectWithSearchIconX).toBeVisible()
  })

  // bug WPPLONOP-9060, WPPLONOP-7434 fixed
  test('[WPPOPENDS-T183] Check that component can be searched for a valid item with several spaces after the search query', async ({
    page,
  }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('option 2  ')
    
    await expect(
      page.locator('[role="WPP-LIST-ITEM"]').filter({ has: page.locator('text=Option 2') }).filter({ has: page.locator('text=0') })
    ).toBeVisible();
    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"] .highlight')).toHaveText(
      'Option 2',
    )
    await expect(wppSelectsPage.multipleSelectWithSearchIconX).toBeVisible()
  })

  test('[WPPOPENDS-T184] Check that component can be searched for a valid item and an item can be selected', async ({
    page,
  }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.fill('option 2')
    await page.waitForTimeout(1000)
    await wppSelectsPage.listItems.first().click()
    await expect(wppSelectsPage.singleSelect).toHaveText('Option 2')
    await page.waitForTimeout(1000)
    await wppSelectsPage.singleSelect.click()
    await page.waitForTimeout(1000)

    await expect(wppSelectsPage.listItems.nth(1)).toHaveAttribute('checked')
  })

  test('[WPPOPENDS-T185] Check that the tooltip is displayed when hovered over the truncated item', async ({
    page,
  }) => {
    await wppSelectsPage.openPage('single-select')
    await wppSelectsPage.truncSingleSelectM.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await wppSelectsPage.truncSingleSelectM.hover()
    await page.waitForTimeout(500)
    await expect(
      page.getByRole('tooltip').nth(1),
    ).toBeVisible()
  })

  test('[WPPOPENDS-T186] Check that component can be searched for a valid item with search query under item truncation', async ({
    page,
  }) => {
    await wppSelectsPage.openPage('single-select')
    await wppSelectsPage.truncSingleSelectM.click()
    await page.waitForTimeout(1000)
    await wppSelectsPage.multipleSelectWithSearchInput.type('order')

    await expect(wppSelectsPage.listItems).toHaveCount(1)
    await wppSelectsPage.listItems.first().hover()
    await expect(page.getByRole('tooltip').nth(1)).toBeVisible()
    await expect(
      wppSelectsPage.listItems.first(),
    ).toHaveText('Option with a really long label in order to test truncation.Option with a really long label in order to test truncation.')
  })

  //bug WPPLONOP-3765 fixed
  test('[WPPOPENDS-T187] Check that component is fully visible when placed inside the accordion', async ({ page }) => {
    await wppSelectsPage.singleSelect.click()
    await page.waitForTimeout(1000)
    await wppSelectsPage.singleSelectInAccordion.click()

    await expect(wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 2$')} )).toBeVisible()
  })

  test('[WPPOPENDS-T188] Check that Nothing Found label is displayed when searching for non-existent item', async ({
    page,
  }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('ololo')

    await expect(wppSelectsPage.listItems).toHaveCount(0)
    await expect(page.getByText('Nothing Found')).toBeVisible()
  })

  test('[WPPOPENDS-T189] Check that component is closed when clicked outside the component', async ({ page }) => {
    await expect(wppSelectsPage.multipleSelectWithSearchInput).toBeVisible()
    await page.getByRole('heading', { name: 'Components Library Examples' }).click()
    await page.waitForTimeout(2000)

    await expect(wppSelectsPage.multipleSelectWithSearchInput).not.toBeVisible()
  })

  // bug WPPLONOP-8735 fixed
  test.skip('[WPPOPENDS-T190] Check that array as item value can be accepted', async ({ page }) => {
    await page.locator('[data-testid="single-select"] .wpp-list-item').nth(5).click()

    await expect(wppSelectsPage.singleSelect.locator('.input-text')).toHaveText('Array Value Item')
    await expect(wppSelectsPage.singleSelect.locator('.wpp-list-item').nth(5)).toHaveJSProperty('value', [5, 55])
  })

  test('[WPPOPENDS-T191] Check that dropdown list is displayed to the top when there is not enough space below', async ({ page }) => {
    await wppSelectsPage.singleTopDropdownSelect.click()
    await page.waitForTimeout(500)
    await expect(page.locator(".tippy-box")).toHaveAttribute(
          'data-placement',
          'top-start',
        )
  })

  //bug WPPLONOP-5816 fixed
  test('[WPPOPENDS-T197] Check that an empty option can be set', async ({ page }) => {
    await wppSelectsPage.openPage('bugfixes/29098');
    
        const msingleSelectInput = await page.locator('[data-testid="wpp-select-single"] .overflow-container');
        const inputValue = await msingleSelectInput.evaluate(element => {
          return (element as HTMLInputElement).textContent
        });
        
        await expect(inputValue).toBe('Choose option');
        await msingleSelectInput.click();
        await expect(wppSelectsPage.listItems.first()).toHaveJSProperty('value', 0);
        await wppSelectsPage.listItems.first().click();
        await expect(msingleSelectInput).toHaveText('None');
        const inputValueSelected = await msingleSelectInput.evaluate(element => {
          return (element as HTMLInputElement).textContent
        });

        await expect(inputValueSelected).toBe('None');
        await msingleSelectInput.click();
        await page.waitForTimeout(1000);
        await expect(wppSelectsPage.listItems.first()).toHaveAttribute('checked');
  })

  //WPPLONOP-19180
    test('[WPPOPENDS-T948] Check single select item height when the browser window heigh is less than 800px( item height = browser height * 0.6px) and more than 800 px (item height = 372px])', async ({ page }) => {
    const singleSelectItem = await page.locator('.wpp-select-portal').nth(0)
    await page.setViewportSize({width: 1280, height: 690})
    await expect(singleSelectItem).toHaveCSS('max-height','372px')

    await page.setViewportSize({width: 1280, height: 900})
    await expect(singleSelectItem).toHaveCSS('max-height','372px')
  })

  test('[WPPOPENDS-T670] Check hint state that the placeholder has "grey-1000" colour value.', async ({}) => {
    const colorValue = colorTable.content.light.color.grey[1000]
    await expect(wppSelectsPage.focusMultipleSelect).toHaveCSS('--wpp-text-color', colorValue)
    await expect(wppSelectsPage.focusMultipleSelect).toHaveText('Choose options')

    await expect(wppSelectsPage.singleSelect).toHaveCSS('--wpp-text-color', colorValue)
    await expect(wppSelectsPage.singleSelect).toHaveText('Choose option')
  })
})