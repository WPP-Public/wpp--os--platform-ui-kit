import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page);
  await wppSelectsPage.init();
  await wppSelectsPage.openPage('vc/selects-multiple');
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page);
});

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 16).toBeTruthy();
});

test.describe('Selects Multiple', () => {
  //WPPLONOP-24139
  test('[WPPOPENDS-T946] Check that left icon exists for component', async ({ page }) => {
    const multipleSelectsWithLeftIcon = await page.locator('.wpp-multiple-select >> .wpp-icon.wpp-icon-clock').first();
    await expect(multipleSelectsWithLeftIcon).toBeVisible();
    const iconSvg = multipleSelectsWithLeftIcon.locator('svg');
    await expect(iconSvg).toHaveAttribute('role', 'presentation');
    await expect(iconSvg).toHaveAttribute('width', '20');
    await expect(iconSvg).toHaveAttribute('height', '20');
  });

  test('[WPPOPENDS-T1271] Check that select with search if opened has default focus on the search', async ({ page }) => {
    await wppSelectsPage.multipleSelectsWithLeftIcon.first().click();
    await expect(wppSelectsPage.multipleSelectWithSearchInput).toBeFocused();
  });

  test('[WPPOPENDS-T667] Check that when list item with falsy value in value property is selected, the name of the selected item will appear and be visible', async ({
    page,
  }) => {
    await wppSelectsPage.openPage('bugfixes/29098');

    const multipleSelectInput = await page.locator('[data-testid="wpp-select-multiple"] .overflow-container');
    const inputValue = await multipleSelectInput.evaluate(element => {
      return (element as HTMLInputElement).textContent
    });
    await expect(inputValue).toBe('Choose option');
    
    await multipleSelectInput.click();

    await expect(wppSelectsPage.listItems.first()).toHaveJSProperty('value', 0);
    
    await wppSelectsPage.listItems.first().click();

    await expect(wppSelectsPage.listItems.first()).toHaveAttribute('checked');
    await page.waitForTimeout(500);
    await expect(multipleSelectInput).toHaveText('None');
    const inputValueSelected = await multipleSelectInput.evaluate(element => {
      return (element as HTMLInputElement).textContent
    });
    await expect(inputValueSelected).toBe('None');
  });

  test('[WPPOPENDS-T658] Check that Select All and Clear All should affect All active items and should not affect disabled items', async ({
    page,
  }) => {
    // Select All button for search/not-searched/disabled items

    await wppSelectsPage.searchAndFolderMultipleSelect.click();
    await wppSelectsPage.multipleSelectWithSearchInput.type('3');
    // 2 items are searched: 1 is disabled(text = 'Option 3') and 1 is active
    await expect(wppSelectsPage.listItems).toHaveCount(2);

    await wppSelectsPage.selectAllButton.click();
    await wppSelectsPage.multipleSelectWithSearchIconX.click();

    // All active items should be checked
    await expect(wppSelectsPage.searchAndFolderMultipleSelect).toHaveText('All selected');
    // item with text 'Option 1' was not in search and should be checked
    await expect (wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 1$') })).toHaveAttribute('checked')
    // item with text 'house' was in search, but it is disabled and should not be checked
    await expect (wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 3$') })).not.toHaveAttribute('checked')

    // CLear All button for search/not-searched/disabled items

    // make unchecked random item that was not in search for searching symbol '3'
    await wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 4$') }).click();
    await expect (wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 4$') })).not.toHaveAttribute('checked')

    await expect(wppSelectsPage.searchAndFolderMultipleSelect).toHaveText('Option 1, Option 2, +16');

    await wppSelectsPage.multipleSelectWithSearchInput.type('3');
    // 2 items are searched: 1 is disabled and 1 is active; 1 active is checked
    await expect(wppSelectsPage.listItems).toHaveCount(2);
    await wppSelectsPage.clearAllButton.click();
    await wppSelectsPage.multipleSelectWithSearchIconX.click();

    // 1 newly checked item with text = "Option 6" should not be checked and Clear All button should cleared all items
    await expect(wppSelectsPage.searchAndFolderMultipleSelect).toHaveText('Choose options');
    await expect (wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 6$') })).not.toHaveAttribute('checked')
    // previously checked searched items should be unchecked now
    await expect (wppSelectsPage.listItems.filter({ hasText: new RegExp('^Option 2$') })).not.toHaveAttribute('checked')
  });

  test('[WPPOPENDS-T1267] Check that Select all button is disabled for select with limit', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select');
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await wppSelectsPage.changeLimitBtn.click();
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).click();
    await expect(wppSelectsPage.selectAllButton).toBeDisabled();
  });

  test('[WPPOPENDS-T1268] Check if all items are disabled for selection with a limit if the maximum number of selected items is reached', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select');
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await wppSelectsPage.changeLimitBtn.click();
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).click();
    await wppSelectsPage.listItems.nth(1).click();
    await wppSelectsPage.listItems.nth(3).click();
    await page.waitForTimeout(1000);
    await expect(wppSelectsPage.listItems.nth(4)).toHaveAttribute('disabled');
    await expect(wppSelectsPage.listItems.nth(5)).toHaveAttribute('disabled');
    await expect(wppSelectsPage.listItems.nth(6)).toHaveAttribute('disabled');
  });

  test('[WPPOPENDS-T1269] Check if all items are active for selection with a limit after clicking Clear All', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select');
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await wppSelectsPage.changeLimitBtn.click();
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).click();
    await wppSelectsPage.listItems.nth(1).click();
    await wppSelectsPage.listItems.nth(3).click();
    await page.waitForTimeout(1000);
    await expect(wppSelectsPage.listItems.nth(4)).toHaveAttribute('disabled');
    await expect(wppSelectsPage.listItems.nth(5)).toHaveAttribute('disabled');
    await expect(wppSelectsPage.listItems.nth(6)).toHaveAttribute('disabled');
    await wppSelectsPage.clearAllButton.click();
    await expect(wppSelectsPage.listItems.nth(1)).toHaveAttribute('selectable');
    await expect(wppSelectsPage.listItems.nth(5)).toHaveAttribute('selectable');
    await expect(wppSelectsPage.listItems.nth(6)).toHaveAttribute('selectable');
  });

  test('[WPPOPENDS-T1270] Check that when searching for items, "Select All" button is still disabled', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select');
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await wppSelectsPage.changeLimitBtn.click();
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).click();
    await wppSelectsPage.multipleSelectWithSearchInput.type('Option 1');
    await expect(wppSelectsPage.selectAllButton).toHaveAttribute('disabled');
  });
});