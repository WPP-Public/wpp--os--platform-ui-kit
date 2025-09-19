import { test, expect } from '@playwright/test'
import { WppLoadMorePage } from '../../../pages/load-more.page'

const wppLoadMorePage = new WppLoadMorePage()

test.beforeEach(async ({ page }) => {
  await wppLoadMorePage.setPage(page)
  await wppLoadMorePage.init()
  await wppLoadMorePage.openPage('vc/load-more')
})

test.describe('Load more', () => {
  //WPPLONOP-25452
  test('[WPPOPENDS-T819] Check load more component with progress bar', async ({ page }) => {
    const loadMoreWithProgressBar = await wppLoadMorePage.loadMoreWithProgressBar
    await expect(loadMoreWithProgressBar).toHaveAttribute('show-progress-bar', 'true')
    await expect(loadMoreWithProgressBar).toHaveAttribute('increment-by', '20')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '30')
    const buttonLoadMore = page.locator('[data-testid="wppButton"]').first()
    await buttonLoadMore.click()
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '50')
    await buttonLoadMore.click()
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '70')
    await buttonLoadMore.click()
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '90')
    await buttonLoadMore.click()
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '100')
    await expect(loadMoreWithProgressBar).toHaveClass(/wpp-disabled/)
    await expect(buttonLoadMore).toHaveClass(/disabled/)
  })

  test('[WPPOPENDS-T1318] Check the accessibility of keyboard interaction', async ({ page }) => {
    const loadMoreWithProgressBar = await wppLoadMorePage.loadMoreWithProgressBar
    await expect(loadMoreWithProgressBar).toHaveAttribute('show-progress-bar', 'true')
    await expect(loadMoreWithProgressBar).toHaveAttribute('increment-by', '20')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '30')
    await page.getByRole('heading', { name: 'Load More' }).click()
    await page.keyboard.press('Tab')
    const buttonLoadMore = page.locator('[data-testid="wppButton"]').first()
    await expect(buttonLoadMore).toBeFocused()
    await expect(buttonLoadMore).toHaveCSS('background-color', 'rgb(224, 235, 255)')
    await expect(buttonLoadMore).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
                                                                                                     
    await page.keyboard.press('Enter')
    await expect(buttonLoadMore).not.toHaveCSS('box-shadow', 'rgb(rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '50')
    await expect(buttonLoadMore).not.toHaveCSS('box-shadow', 'rgb(rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
    await page.keyboard.press('Space')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '70')
    await page.keyboard.press('Enter')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '90')
    await page.keyboard.press('Enter')
    await expect(loadMoreWithProgressBar).toHaveAttribute('items-loaded', '100')
    await expect(loadMoreWithProgressBar).toHaveClass(/wpp-disabled/)
    await expect(buttonLoadMore).toHaveClass(/disabled/)
  })

  //WPPLONOP-25452
  test('[WPPOPENDS-T820] Check load more component without progress bar', async ({ page }) => {
    const loadMoreWithoutProgressBar = await wppLoadMorePage.loadMoreWithoutProgressBar
    await expect(loadMoreWithoutProgressBar).toBeVisible()
  })

  //WPPLONOP-25452
  test('[WPPOPENDS-T938] Check disabled load more component', async ({ page }) => {
    const loadMoreDisabled = await wppLoadMorePage.loadMoreDisabled
    await expect(loadMoreDisabled).toBeVisible()
    await expect (loadMoreDisabled).toHaveAttribute('show-progress-bar', 'true')
    await expect (loadMoreDisabled).toHaveAttribute('disabled')
  })
})
