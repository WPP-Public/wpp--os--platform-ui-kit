import { test, expect } from '@playwright/test'
import { WppPillsPage } from '../../../pages/pills.page'

const wppPillsPage = new WppPillsPage()

test.beforeEach(async ({ page }) => {
  await wppPillsPage.setPage(page)
  await wppPillsPage.init()
  await wppPillsPage.openPage('vc/pills')
})

test.describe('WPP Pills', () => {
  test('[WPPOPENDS-T288] Check that the cursor changes to dragging when hover on the drag icon', async () => {
    await wppPillsPage.draggablePill.locator('.wpp-icon').hover()
    await expect(wppPillsPage.draggablePill.locator('.wpp-icon')).toHaveCSS('cursor', 'grabbing')
  })

  test('[WPPOPENDS-T760] Check event in console if click close button on removable pill', async ({page}) => {
    const removablePIll = await page.locator('[label="Apple"][type="display"][removable]').first()
    await removablePIll.scrollIntoViewIfNeeded()
    const closeBtn = await removablePIll.locator('.wpp-icon.wpp-icon-cross')
    const consoleMessages: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })
    await closeBtn.click()
    await page.waitForTimeout(1000)
    await expect(consoleMessages).toEqual(expect.arrayContaining([expect.stringMatching(/^Close\s+\w+/)]))
  })
})
