import { test, expect } from '@playwright/test'
import { WppTreesPage } from '../../../pages/trees.page'

const wppTreePage = new WppTreesPage()

test.beforeEach(async ({ page }) => {
  await wppTreePage.setPage(page)
  await wppTreePage.init()
  await wppTreePage.openPage('vc/tree')
})

test.describe('Tree', () => {

  test('[WPPOPENDS-T737] Check that component can be searched for a valid item with several spaces before the search query', async ({
    page,
  }) => {
    await wppTreePage.searchInput.type('      18-20')
    const searchedResult = await page.locator(
      '[role="treeItem"][level="1"][text="Demographic"] >> [part="tree-item-title-highlighted"]',
    )
    await expect(searchedResult).toHaveText('18-20')
  })

  test('[WPPOPENDS-T738] Check that component can be searched for a valid item with several spaces after the search query', async ({
    page,
  }) => {
    await wppTreePage.searchInput.type('18-20      ')
    const searchedResult = await page.locator(
      '[role="treeItem"][level="1"][text="Demographic"] >> [part="tree-item-title-highlighted"]',
    )
    await expect(searchedResult).toHaveText('18-20')
  })

  test('[WPPOPENDS-T739] Check that component can be searched for a valid item and an item can be selected', async ({
    page,
  }) => {
    await wppTreePage.searchInput.type('18-20')
    const searchedResult = await page.locator(
      '[role="treeItem"][level="1"][text="Demographic"] >> [role="treeItem"][text="18-20"] >> [part="tree-item"]',
    )
    await searchedResult.click()
    await expect(searchedResult).toHaveClass('tree-item selected')
  })

  test('[WPPOPENDS-T741] Check that item unselected after clicking on selected item', async ({ page }) => {
    await wppTreePage.searchInput.type('18-20')
    const searchedResult = await page.locator(
      '[role="treeItem"][level="1"][text="Demographic"] >> [role="treeItem"][text="18-20"] >> [part="tree-item"]',
    )
    await searchedResult.click()
    await expect(searchedResult).toHaveClass('tree-item selected')
    await searchedResult.click()
    await expect(searchedResult).toHaveClass('tree-item')
  })

  test('[WPPOPENDS-T740] Check that No result label is displayed when searching for non-existent item', async ({
    page,
  }) => {
    const noResultLabel = await page.locator('.empty-tree-text')
    await expect(noResultLabel).not.toBeVisible()
    await wppTreePage.searchInput.type('OOOOOOOO')
    await expect(noResultLabel).toBeVisible()
    await expect(noResultLabel).toHaveText('No result')
  })

  test('[WPPOPENDS-T694] Check search for tree component', async () => {
    // custom match should return 'No result' if item text is not matched exactly: 'Octavia'
    await wppTreePage.customSearchMatchInput.type('octa')
    await expect(wppTreePage.customSearchMatchResult).toHaveText('No result')

    // custom match should return result if item text is included: 'Octavia'
    await wppTreePage.customSearchIncludeInput.type('octa')
    await expect(wppTreePage.customSearchIncludeResultHighlighted).toHaveText('Octa')
    await expect(wppTreePage.customSearchIncludeResultRemaining).toHaveText('via')
  })
})
