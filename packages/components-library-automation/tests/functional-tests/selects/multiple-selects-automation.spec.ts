import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('selects')
  await page.waitForTimeout(2000)
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 16).toBeTruthy()
})

test.describe('Multiple Select', () => {
  // BUG-WPPLONOP-4897
  test('[WPPOPENDS-T165] Check that component is focused when the page is opened', async ({page}) => {
    await expect(page.locator('[data-testid="focus-multiple-select"]')).toHaveAttribute('auto-focus')
  })

  // bug WPPLONOP-8769 fixed, WPPLONOP-9116 fixed
  test('[WPPOPENDS-T150] Check that Select All button can be clicked after reset', async ({ page }) => {
    await wppSelectsPage.selectAllButton.click()
    await page.locator('text=Components Library Examples').click()
    await wppSelectsPage.resetButton.click()
    await wppSelectsPage.focusMultipleSelect.click()

    await page.waitForTimeout(2000)
    await expect(wppSelectsPage.selectAllButton).not.toHaveAttribute('disabled')
  })

  // bug WPPLONOP-8649 fixed
  test('[WPPOPENDS-T151] Check the component default placeholder text', async () => {
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Choose options')
  })

  test('[WPPOPENDS-T152] Check that no items are selected after Clear All button is clicked', async ({ page }) => {
    await wppSelectsPage.selectAllButton.click()
    await wppSelectsPage.clearAllButton.click()

    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Choose options')
    await page.waitForTimeout(2000)

    const noneSelected = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').evaluateAll(elements =>
        elements.every(el => !el.classList.contains('checked'))
      );

    await expect(noneSelected).toBe(true);

    await expect(wppSelectsPage.multipleSelectWithSearchClearAllBtn).not.toBeVisible()
  })

  // bug WPPLONOP-8987 fixed
  test('[WPPOPENDS-T153] Check that all the items are selected after Select All button is clicked', async ({ page }) => {
    await wppSelectsPage.selectAllButton.click()
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('All selected')

    const validSelections = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').evaluateAll((elements) =>
      elements.every((el, index) => {
        if (index === 2) {
          return !el.classList.contains('checked');
        }
        return el.classList.contains('checked');
      })
    );

    await expect(validSelections).toBe(true);
    await expect(wppSelectsPage.selectAllButton).toHaveAttribute('disabled')
  })

  test('[WPPOPENDS-T157] Check that the Clear All button is not displayed when all the items are unselected manually', async () => {
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Choose options')
    await expect(wppSelectsPage.multipleSelectWithSearchClearAllBtn).not.toBeVisible()
  })

  // Bug WPPLONOP-8956, WPPLONOP-7992 fixed
  test('[WPPOPENDS-T154] Check that the Select All button is disabled when all the items are selected manually', async ({ page }) => {
    const items = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').elementHandles();

    for (const item of items) {
      const isDisabled = await item.getAttribute('aria-disabled') === 'true' || await item.getProperty('className').then(p => p.jsonValue()).then(c => c.includes('disabled'));

      if (!isDisabled) {
        await item.click();
        await page.waitForTimeout(500);
      }
    }

    await expect(wppSelectsPage.selectAllButton).toHaveAttribute('disabled');
  })

  // bug WPPLONOP-9060, WPPLONOP-7992 fixed, WPPLONOP-7668 fixed
  test('[WPPOPENDS-T155] Check that component can be searched for a valid item with several spaces before the search query', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type(' option 2')

    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"]')).toBeVisible()
    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"] .highlight')).toHaveText(
      'Option 2',
    )
    await expect(wppSelectsPage.multipleSelectWithSearchIconX).toBeVisible()
  })

  // bug WPPLONOP-9060, WPPLONOP-7992 fixed, WPPLONOP-7668 fixed
  test('[WPPOPENDS-T156] Check that component can be searched for a valid item with several spaces after the search query', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('option 2  ')

    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"]')).toBeVisible()
    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"] .highlight')).toHaveText(
      'Option 2',
    )
    await expect(wppSelectsPage.multipleSelectWithSearchIconX).toBeVisible()
  })

  test('[WPPOPENDS-T158] Check that component can be searched for a valid item and an item can be selected', async ({ page }) => {

    await wppSelectsPage.multipleSelectWithSearchInput.type('option 2')
    await page.waitForTimeout(1000)
    await wppSelectsPage.listItems.first().click()
    await page.locator('text=Multiple Select with search').click()

    await wppSelectsPage.focusMultipleSelect.click()
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Option 2')
    await expect(wppSelectsPage.listItems.first()).toHaveAttribute('checked')
  })

  test('[WPPOPENDS-T159] Check that the tooltip is displayed when hovered over the truncated item', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select')
    await wppSelectsPage.truncMultipleSelectM.first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await wppSelectsPage.truncMultipleSelectM.first().click()
    await wppSelectsPage.listItems.first().hover()
    await page.waitForTimeout(500)
    await expect(
      page.getByRole('tooltip').nth(1),
    ).toBeVisible()
  })

  test('[WPPOPENDS-T160] Check that component can be searched for a valid item with search query under item truncation', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select')
    await wppSelectsPage.truncMultipleSelectM.first().click()
    await page.waitForTimeout(1000)
    await wppSelectsPage.multipleSelectWithSearchInput.type('order')

    await expect(wppSelectsPage.listItems).toHaveCount(1)
    await wppSelectsPage.listItems.first().hover()
    await expect(page.getByRole('tooltip').nth(1)).toBeVisible()
    await expect(
      wppSelectsPage.listItems.first(),
    ).toHaveText('Option with a really long label in order to test truncation.Option with a really long label in order to test truncation.')
  })

  // bug WPPLONOP-3765 fixed
  test('[WPPOPENDS-T161] Check that component is fully visible when placed inside the accordion', async ({ page }) => {
    await page.locator('text=Components Library Examples').click()
    await wppSelectsPage.selectInAccordion.click()

    await expect(
      page.locator('[data-testid="select-in-accordion"] [part="clear-all-button"]').first(),
    ).not.toBeVisible()
    await expect(wppSelectsPage.selectAllButton).toBeVisible()
  })

  test('[WPPOPENDS-T162] Check that Nothing Found label is displayed when searching for non-existent item', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('ololo')

    await expect(wppSelectsPage.listItems).toHaveCount(0)
    await expect(page.getByText('Nothing Found')).toBeVisible()
  })

  test('[WPPOPENDS-T163] Check that component is closed when clicked outside the component', async ({ page }) => {
    await expect(wppSelectsPage.listItems.first()).toBeVisible()
    await page.locator('body').click()

    await expect(wppSelectsPage.listItems.first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T164] Check that item can be unselected from the list', async ({ page }) => {
    await wppSelectsPage.listItems.first().click()

    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Option 1')
    await expect(wppSelectsPage.listItems.first()).toHaveAttribute('checked')
    await wppSelectsPage.listItems.first().click()
    await expect(wppSelectsPage.listItems.first()).not.toHaveAttribute('checked')
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Choose options')
  })

  test('[WPPOPENDS-T178] Check that "+ digit" label is displayed in the input when several items are selected', async ({ page }) => {
    await await wppSelectsPage.listItems.first().click()
    await await wppSelectsPage.listItems.nth(1).click()
    await await wppSelectsPage.listItems.nth(3).click()
    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText(
      'Option 1, Option 2, +1',
    )
  })

  // bug WPPLONOP-8735 fixed
  test.skip('[WPPOPENDS-T179] Check that array as item value can be accepted', async ({ page }) => {
    await page.locator('[data-testid="focus-multiple-select"] .wpp-list-item').nth(4).click()

    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Array Value Item')
    await expect(page.locator('[data-testid="focus-multiple-select"] .wpp-list-item').nth(4)).toHaveJSProperty(
      'value',
      [5, 55],
    )
  })

  test('[WPPOPENDS-T180] Check that dropdown list is displayed to the top when there is not enough space below', async ({
    page,
  }) => {
    await wppSelectsPage.multipleTopDropdownSelect.click()

    await expect(page.locator('.tippy-box').first()).toHaveAttribute(
      'data-placement',
      'top-start',
    )
  })

  // bug WPPLONOP-9494 fixed
  test('[WPPOPENDS-T247] Check that dependable selects values are reset when the parent select is cleared [@bug-WPPLONOP-26341 ]', async ({
    page,
  }) => {
    //There is an issue with the direct navigation with webkit browser. Had to change it to clicking menu items
    await wppSelectsPage.openPage('multiple-select')
    await wppSelectsPage.dependableRegionSelect.click()
    await wppSelectsPage.listItems.first().click()
    await wppSelectsPage.dependableCountryMultipleSelect.click()
    await wppSelectsPage.listItems.first().click()
    await wppSelectsPage.listItems.nth(1).click()
    await page.locator('body').click() 
    await expect(wppSelectsPage.dependableRegionSelect).toHaveText('Europe')
    await expect(wppSelectsPage.dependableCountryMultipleSelect).toHaveText('France, Spain')

    await wppSelectsPage.dependableRegionSelect.click()
    await wppSelectsPage.listItems.first().click()
    await page.locator('body').click() 
    

    await expect(wppSelectsPage.dependableRegionSelect).toHaveText('Choose option')
    await expect(wppSelectsPage.dependableCountryMultipleSelect).toHaveText(
      'Choose option',
    )
  })
  //WPPLONOP-26339
  test('[WPPOPENDS-T290] Check that comma-separated values are displayed when showSelectAllText=false', async ({
    page,
  }) => {
    //There is an issue with the direct navigation with webkit browser. Had to change it to clicking menu items
    await wppSelectsPage.openPage('vc/selects-multiple')

    await wppSelectsPage.multipleSelectWithFolder.click()
    await wppSelectsPage.selectAllButton.click()

    await expect(wppSelectsPage.multipleSelectWithFolder).toHaveText('Option 1, Option 2, +17')
  })

  test('[WPPOPENDS-T470] Check that component display changes after the options are populated', async ({ page }) => {
    await wppSelectsPage.openPage('vc/selects-multiple')

    await wppSelectsPage.multipleSelectWithFolder.click()
    await wppSelectsPage.selectAllButton.click()

    await expect(wppSelectsPage.multipleSelectWithFolder).toHaveText('Option 1, Option 2, +17')
    await wppSelectsPage.listItems.nth(5).click()
    await expect(wppSelectsPage.multipleSelectWithFolder).toHaveText('Option 1, Option 2, +16')
  })

  //WPPLONOP-19180
  test('[WPPOPENDS-T942] Check multiple select item height when the browser window heigh is less than 800px( item height = browser height * 0.7px) and more than 800 px (item height = 412px])', async ({
    page,
  }) => {
    const multipleSelectItem = await page.locator('.wpp-select-portal').first()
    await page.setViewportSize({ width: 1280, height: 700 })
    await expect(multipleSelectItem).toHaveCSS('max-height', '372px')

    await page.setViewportSize({ width: 1280, height: 900 })
    await expect(multipleSelectItem).toHaveCSS('max-height', '372px')
  })

  //WPPLONOP-22078
  test('[WPPOPENDS-T943] Check loading items based on search', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('option 1')
    const itemCount = await wppSelectsPage.listItems.count()

    for (let i = 0; i < itemCount; i++) {
      const child = wppSelectsPage.listItems.nth(i)
      if (await child.isVisible()) {
        await expect(child).toContainText(/Option 1/)
      }
    }

    await wppSelectsPage.multipleSelectWithSearchIconX.click()

    await wppSelectsPage.multipleSelectWithSearchInput.type('option 1')

    for (let i = 0; i < itemCount; i++) {
      const child = wppSelectsPage.listItems.nth(i)
      if (await child.isVisible()) {
        await expect(child).toHaveText(/Option 1/)
      }
    }
  })

  //WPPLONOP-22181
  test('[WPPOPENDS-T944] Check property for dropdown placement', async ({ page }) => {
   
    await wppSelectsPage.multipleTopDropdownSelect.scrollIntoViewIfNeeded()
    await wppSelectsPage.multipleTopDropdownSelect.click()
    await page.waitForTimeout(1000)

    const dropDown = await page.locator('.tippy-box').nth(0)
    await expect(dropDown).toBeVisible()
    await expect(dropDown).toHaveAttribute('data-placement', 'top-start')
  })

  //WPPLONOP-22396
  test('[WPPOPENDS-T945] Check that dropdown width can be less than 196 px', async ({ page }) => {
    await page.waitForTimeout(2000)
    const multipleSelectInput = await page.locator('.wpp-select-portal')

    await multipleSelectInput.evaluate((el: HTMLElement) => {
      el.style.width = '150px'
      window.dispatchEvent(new Event('resize'))
    })

    await page.waitForTimeout(2000)
    await page.locator('body').click()
    await wppSelectsPage.multipleSelectWithSearchPlaceholderText.click()
    await page.waitForTimeout(1000)

    const dropdown = await page.locator('.wpp-select-portal')
    const dropdownWidth = await dropdown.evaluate(el => el.getBoundingClientRect().width)
    expect(dropdownWidth).toBe(150)
  })

  test('[WPPOPENDS-T711] Check that invalid values cannot be entered into search for multiple select', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type(':,.=/')
    await expect(page.getByText('Nothing Found')).toBeVisible()
  })

  test('[WPPOPENDS-T714] Check that the search is empty after clicking the Close icon', async ({ page }) => {
    await wppSelectsPage.multipleSelectWithSearchInput.type('Some')

    const valueInSearch = await wppSelectsPage.multipleSelectWithSearchInput.evaluate((element) => {
      return (element as HTMLInputElement).value
    })

    await expect(valueInSearch).toBe('Some')

    await wppSelectsPage.multipleSelectWithSearchIconX.click()
    await page.waitForTimeout(1000)

    const valueInSearchAfterDeleting = await wppSelectsPage.multipleSelectWithSearchInput.evaluate((element) => {
      return (element as HTMLInputElement).value
    })

    await expect(valueInSearchAfterDeleting).toBe('')
  })

  test('[WPPOPENDS-T712] Check that all items are unselected when clicking on the "Clear All" Button', async ({ page }) => {
    const noneSelected = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').evaluateAll(elements =>
        elements.every(el => !el.classList.contains('checked'))
      );
    await expect(noneSelected).toBe(true);

    await expect(wppSelectsPage.clearAllButton).not.toBeVisible()
    await expect(wppSelectsPage.selectAllButton).not.toHaveAttribute('disabled')

    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Choose options')

    // check clicking Clear all after clicking Select all

    await wppSelectsPage.selectAllButton.click()

    await expect(wppSelectsPage.selectAllButton).toHaveAttribute('disabled')
    await expect(wppSelectsPage.clearAllButton).toBeVisible()

    const validSelections = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').evaluateAll((elements) =>
      elements.every((el, index) => {
        if (index === 2) {
          return !el.classList.contains('checked');
        }
        return el.classList.contains('checked');
      })
    );
    await expect(validSelections).toBe(true);

    await wppSelectsPage.clearAllButton.click()
    await page.waitForTimeout(1000)

    const allChildrenAfterClearAll = await page.locator('[role="WPP-LIST-ITEM"] li.selectable').evaluateAll(elements =>
        elements.every(el => !el.classList.contains('checked'))
      );
    await expect(allChildrenAfterClearAll).toBe(true);

    await expect(wppSelectsPage.selectAllButton).not.toHaveAttribute('disabled')
    await expect(wppSelectsPage.clearAllButton).not.toBeVisible()

    // check clicking Clear all after selecting some items
    await wppSelectsPage.listItems.first().click()
    await wppSelectsPage.listItems.nth(1).click()

    await expect (wppSelectsPage.listItems.first()).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.nth(1)).toHaveAttribute('checked')

    await expect(wppSelectsPage.clearAllButton).toBeVisible()

    await expect(wppSelectsPage.multipleSelectWithSearchPlaceholderText).toHaveText('Option 1, Option 2')

    await wppSelectsPage.clearAllButton.click()
    
    await expect (wppSelectsPage.listItems.first()).not.toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.nth(1)).not.toHaveAttribute('checked')

    // check clicking Clear all after searching and selecting item

    await expect(wppSelectsPage.clearAllButton).not.toBeVisible()

    await wppSelectsPage.multipleSelectWithSearchInput.type('option 2')

    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"]')).toBeVisible()
    await expect(page.locator('[role="WPP-LIST-ITEM"][value="option-20"] .highlight')).toHaveText(
      'Option 2',
    )
    await expect(wppSelectsPage.multipleSelectWithSearchIconX).toBeVisible()

    await wppSelectsPage.listItems.first().click()

    await wppSelectsPage.clearAllButton.click()

    await expect(wppSelectsPage.listItems.first()).not.toHaveAttribute('checked')

    await expect(wppSelectsPage.clearAllButton).not.toBeVisible()
  })

  test('[WPPOPENDS-T774] Check parent-child dependencies select for Multiple Select Dropdown Dependency', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select')

    await expect (wppSelectsPage.multipleDependencyParentSelectInput).toHaveText('Select Parent Option')

    await wppSelectsPage.multipleDependencyParentSelectInput.click()
    await wppSelectsPage.multipleDependencyParentOptionA.click()
    await page.waitForTimeout(2000)

    await wppSelectsPage.multipleDependencyFirstChildInput.click()

    await expect (wppSelectsPage.listItems.first()).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.nth(1)).toHaveAttribute('checked')


    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await page.waitForTimeout(1000)

    await expect (wppSelectsPage.listItems.nth(0)).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.nth(2)).toHaveAttribute('checked')
    await page.locator('body').click()
    await page.waitForTimeout(1000)

    // select parent option B
    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await wppSelectsPage.multipleDependencyParentSelectInput.click()
    await wppSelectsPage.multipleDependencyParentOptionB.click()
    await page.waitForTimeout(2000)

    await wppSelectsPage.multipleDependencyFirstChildInput.click()
    await page.waitForTimeout(1000)

    await expect (page.getByText('Parent Option A - First Child - Option 1')).toBeVisible({visible:false})
    await expect (page.getByText('Parent Option A - First Child - Option 2')).toBeVisible({visible:false})
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 6'})).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 7'})).toHaveAttribute('checked')

    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await page.waitForTimeout(1000)
    await expect (page.getByText('Parent Option A - First Child - Option 1 - Second Child - Option 1')).toBeVisible({visible:false})
    await expect (page.getByText('Parent Option A - First Child - Option 2 - Second Child - Option 3')).toBeVisible({visible:false})
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 6 - Second Child - Option 11'})).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 7 - Second Child - Option 13'})).toHaveAttribute('checked')

    // change in first child value should result in change in second child value
    // uncheck first child values
    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await wppSelectsPage.multipleDependencyFirstChildInput.click()
    await page.waitForTimeout(1000)
    await wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 6'}).click()
    await wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 7'}).click()
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 6'})).not.toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 7'})).not.toHaveAttribute('checked')

    //select other first child values
    await wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 9'}).click()
    await wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 10'}).click()
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 9'})).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 10'})).toHaveAttribute('checked')

    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await page.waitForTimeout(2000)
    await wppSelectsPage.multipleDependencySecondChildInput.click()
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 9 - Second Child - Option 17'})).toHaveAttribute('checked')
    await expect (wppSelectsPage.listItems.filter({ hasText: 'Parent Option B - First Child - Option 10 - Second Child - Option 19'})).toHaveAttribute('checked')
  })
})