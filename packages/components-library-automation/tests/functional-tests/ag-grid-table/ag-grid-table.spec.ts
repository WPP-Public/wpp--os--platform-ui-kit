import { test, expect } from '@playwright/test'
import { WppAgGridTablePage } from '../../../pages/ag-grid-table.page'

const wppAgGridTablePage = new WppAgGridTablePage();
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppAgGridTablePage.setPage(page);
  await wppAgGridTablePage.init();
  await wppAgGridTablePage.openPage('ag-grid-table-pagination');
  await wppAgGridTablePage.setViewportSize(1220, 720);
  consoleErrors = await wppAgGridTablePage.listenConsoleErrors(page);
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy();
});

test.describe('Ag Grid Table', () => {
  test('[WPPOPENDS-T812] Check that items are unselected when click on the cross of the pill', async () => {
    await expect(wppAgGridTablePage.firstRow).not.toHaveAttribute('aria-selected', 'true');
    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '0 selected');

    await wppAgGridTablePage.allCheckboxes.click();

    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '80 selected');
    await expect(wppAgGridTablePage.firstRow).toHaveAttribute('aria-selected', 'true');

    await wppAgGridTablePage.removeAllSelectedCheckboxesCrossBtn.click();

    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '0 selected');
    await expect(wppAgGridTablePage.firstRow).not.toHaveAttribute('aria-selected', 'true');
  })

  test('[WPPOPENDS-T751] Check that the column can be removed and added by clicking on Action button', async ({ page }) => {
    await wppAgGridTablePage.setViewportSize(1920, 1080);
    await page.waitForTimeout(1000);
    await expect(wppAgGridTablePage.avatarColumn).toBeVisible();
    await wppAgGridTablePage.removeAvatarsColumnButton.click();
    await expect(wppAgGridTablePage.avatarColumn).not.toBeVisible();
    await wppAgGridTablePage.addAvatarsColumnButton.click();
    await expect(wppAgGridTablePage.avatarColumn).toBeVisible();
  })

  test('[WPPOPENDS-T750] Check that all items are selected when click on the checkbox in header', async () => {
    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '0 selected');
    await wppAgGridTablePage.allCheckboxes.click();
    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '80 selected');
    await wppAgGridTablePage.allCheckboxes.click();
    await expect (wppAgGridTablePage.pillButton).toHaveAttribute('label', '0 selected');
  })

  test('[WPPOPENDS-T689] Check padding between text and avatar/avatar group', async () => {
    const marginLeftAvatar = await wppAgGridTablePage.avatar.evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.marginLeft
    });
    await expect(marginLeftAvatar).toBe("12px");

    const marginLeftAvatarGroup = await wppAgGridTablePage.avatarGroup.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return style.marginLeft
      });
      await expect(marginLeftAvatarGroup).toBe("12px");
  });

  test('[WPPOPENDS-T998] Check that new items are loaded when you click the “Load more” button', async () => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(18);
    await expect(wppAgGridTablePage.progresContainer).toHaveText('10 of 80 items');
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(28);
    await expect(wppAgGridTablePage.progresContainer).toHaveText('20 of 80 items');
  });

  test('[WPPOPENDS-T999] Check that the progress bar can be hidden', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.hideProgresLineBtn.click();
    await expect(wppAgGridTablePage.progresContainer).not.toBeVisible();
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(28);
  });

  test('[WPPOPENDS-T1000] Check that the “Load more” button is not displayed if all items are loaded', async () => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.searchInput.type('D');
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.progresContainer).not.toBeVisible();
    await expect(wppAgGridTablePage.loadMoreButton).not.toBeVisible();
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(24);
  });

  test('[WPPOPENDS-T1001] Check that the viewport does not move after clicking “Load more” when the table height is fixed', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.setFixedHeightBtn.click();
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(27);
    await expect(wppAgGridTablePage.progresContainer).toHaveText('20 of 80 items');
    
    const tableScrollPosition = await wppAgGridTablePage.tableBody.evaluate(el => el.scrollTop);

    await expect(tableScrollPosition).toBe(0);
  })

  test('[WPPOPENDS-T1002] Check that newly loaded items are not displayed as selected', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.allCheckboxes.click();
    expect (wppAgGridTablePage.checkboxesOfItems.nth(16)).toBeChecked();
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(28);
    await expect(wppAgGridTablePage.checkboxesOfItems.nth(17)).not.toBeChecked();
    await expect(wppAgGridTablePage.checkboxesOfItems.nth(26)).not.toBeChecked();
  })
})

test.describe('AG Grid table - Hybrid Infinite Scroll', () => {
  test('[WPPOPENDS-T1289] Check that the Load More button is not displayed if infinite scrolling is possible', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-hybrid-infinite-scroll');
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(18);
    await expect(wppAgGridTablePage.loadMoreButton).not.toBeVisible();
    await wppAgGridTablePage.tableBody.evaluate((el) => el.scrollTo(0, 200));
    await page.waitForTimeout(1000);
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(29);
    await expect(wppAgGridTablePage.loadMoreButton).not.toBeVisible();
  })

  test('[WPPOPENDS-T1290] Check that the Load More button appears if 50 items are loaded', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-hybrid-infinite-scroll');
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(18);
    await expect(wppAgGridTablePage.loadMoreButton).not.toBeVisible();
    await wppAgGridTablePage.tableBody.evaluate((el) => el.scrollTo(0, 200));
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.tableBody.evaluate((el) => el.scrollTo(0, 5000));
    await page.waitForTimeout(2000);

    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(38);
    await expect(wppAgGridTablePage.loadMoreButton).toBeVisible();
  })

  test('[WPPOPENDS-T1291] Check that new items are loaded when the Load More button is pressed', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-hybrid-infinite-scroll');
    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(18);
    await expect(wppAgGridTablePage.loadMoreButton).not.toBeVisible();
    await wppAgGridTablePage.tableBody.evaluate((el) => el.scrollTo(0, 200));
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.tableBody.evaluate((el) => el.scrollTo(0, 5000));
    await page.waitForTimeout(2000);

    await expect(wppAgGridTablePage.checkboxesOfItems).toHaveCount(38);
    await expect(wppAgGridTablePage.loadMoreButton).toBeVisible();
    await wppAgGridTablePage.loadMoreButton.click();
    await expect(wppAgGridTablePage.progresContainer).toHaveText('75 of 80 items');
  })
})
