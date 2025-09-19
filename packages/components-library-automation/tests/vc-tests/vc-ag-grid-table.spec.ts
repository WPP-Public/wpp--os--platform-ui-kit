import { expect } from '@playwright/test'
import { WppAgGridTablePage } from '../../pages/ag-grid-table.page'
import test from './../../utils'

const wppAgGridTablePage = new WppAgGridTablePage()

test.beforeEach(async ({ page }) => {
  await wppAgGridTablePage.setPage(page)
  await wppAgGridTablePage.init()
  await wppAgGridTablePage.openPage('ag-grid-table-pagination')
  await wppAgGridTablePage.setViewportSize(1220, 720)
})

test.describe('WPP Ag Grid Table', () => {
  //Bug WPPLONOP-9116 fixed
  test('[WPPOPENDS-T509] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(6000)
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T547] Check that the sort by first name sorts ascending', async ({ page }) => {
    await wppAgGridTablePage.firstNameColumn.click()
    await page.waitForTimeout(8000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T556] Check that the sort by first name sorts descending', async ({ page }) => {
    await wppAgGridTablePage.firstNameColumn.click()
    await wppAgGridTablePage.firstNameColumn.click()
    await page.waitForTimeout(8000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T549] Check that the search shows only relevant data - Positive', async ({ page }) => {
    await page.waitForTimeout(3000)
    await wppAgGridTablePage.searchInput.type('Da')
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T557] Check that the search shows only relevant data - Entry does not exist', async ({ page }) => {
    await page.waitForTimeout(1000)
    await wppAgGridTablePage.searchInput.type('Ololo')
    await page.waitForTimeout(4000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T550] Check that the gender filter filters entries by a desired param', async ({ page }) => {
    await page.waitForTimeout(1000)
    await wppAgGridTablePage.genderFilterSelect.click()
    await wppAgGridTablePage.genderItemsFromList.filter({hasText: 'Female'}).click();
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T558] Check that the column is removed when clicked on Remove avatars column button', async ({
    page,
  }) => {
    await page.waitForTimeout(1000)
    await wppAgGridTablePage.removeAvatarsColumnButton.click()
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })
})

test.describe('WPP Ag Grid Table Infinite Scroll', () => {
  test('[WPPOPENDS-T572] Check that the component passes the visual check', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-infinite-scroll')

    await page.waitForTimeout(6000)
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T573] Check that the sort by first name sorts ascending', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-infinite-scroll')

    await wppAgGridTablePage.firstNameColumn.click()
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T574] Check that the sort by first name sorts descending', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-infinite-scroll')

    await wppAgGridTablePage.firstNameColumn.click()
    await wppAgGridTablePage.firstNameColumn.click()
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T575] Check that the search shows only relevant data - Positive', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-infinite-scroll')

    await page.waitForTimeout(3000)
    await wppAgGridTablePage.searchInput.type('Da')
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })

  test('[WPPOPENDS-T576] Check that the search shows only relevant data - Entry does not exist', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-infinite-scroll')

    await page.waitForTimeout(1000)
    await wppAgGridTablePage.searchInput.type('Ololo')
    await page.waitForTimeout(6000)

    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot()
  })
})

test.describe('WPP Ag Grid Table Load more button', () => {
  test('[WPPOPENDS-T991] Check that the component passes the visual check', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await page.waitForTimeout(7000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  })

  test('[WPPOPENDS-T992] Check that the sort by first name sorts ascending', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.firstNameColumn.click();
    await page.waitForTimeout(6000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  });

  test('[WPPOPENDS-T993] Check that the sort by first name sorts descending', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.firstNameColumn.click();
    await wppAgGridTablePage.firstNameColumn.click();
    await page.waitForTimeout(6000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  });

  test('[WPPOPENDS-T994] Check that the search shows only relevant data - Positive', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.searchInput.type('Da');
    await page.waitForTimeout(8000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  })

  test('[WPPOPENDS-T995] Check that the search shows only relevant data - Entry does not exist', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.searchInput.type('Ololo');
    await page.waitForTimeout(6000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  });

  test('[WPPOPENDS-T996] Check that the gender filter filters entries by a desired param', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.genderFilterSelect.click();
    await wppAgGridTablePage.genderItemsFromList.filter({hasText: 'Female'}).click();
    await page.waitForTimeout(6000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  });

  test('[WPPOPENDS-T997] Check that the column is removed when clicked on Remove avatars column button', async ({ page }) => {
    await wppAgGridTablePage.openPage('ag-grid-table-load-more');
    await wppAgGridTablePage.setViewportSize(1280, 720);
    await page.waitForTimeout(1000);
    await wppAgGridTablePage.removeAvatarsColumnButton.click();
    await page.waitForTimeout(8000);
    await expect(wppAgGridTablePage.agGridTable).toHaveScreenshot();
  });
})