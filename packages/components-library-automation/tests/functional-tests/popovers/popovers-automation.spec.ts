import { test, expect } from '@playwright/test'
import { WppPopoversPage } from '../../../pages/popovers.page'

const wppPopoversPage = new WppPopoversPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppPopoversPage.setPage(page)
  await wppPopoversPage.init()
  await wppPopoversPage.openPage('vc/popovers')
  consoleErrors = await wppPopoversPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Popovers', () => {
  test('[WPPOPENDS-T355] Check that component is closed when clicked outside the component', async ({ page }) => {
    await wppPopoversPage.defaultPopoverTrigger.click()
    await page.locator('.app-title').click()

    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  //WPPLONOP-23791
  test('[WPPOPENDS-T825] Check the trigger button opening and closing', async ({ page }) => {
    await page.locator('[data-testid="wppButton"]').first().click()
    const rootElement = await page.locator('#root')
    const boxElement = rootElement.locator('.tippy-box')
    await expect(boxElement).toBeVisible()
    const closeBtn = await page.locator('[data-testid="wppActionButton"]').nth(1)
    await closeBtn.click()
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  //WPPLONOP-23791
  test('[WPPOPENDS-T826] Check the open popover button opening and closing', async ({ page }) => {
    await page.locator('[data-testid="wppButton"]').nth(1).click()
    const rootElement = await page.locator('#root')
    const boxElement = rootElement.locator('.tippy-box')
    await expect(boxElement).toBeVisible()
    const closeBtn = await page.locator('[data-testid="wppActionButton"]').nth(1)
    await closeBtn.click()
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  //WPPLONOP-22266
  test('[WPPOPENDS-T827] Check that popover is not opened after click or hover if popover button is disabled', async ({ page }) => {
    const popoverBtn = await page.locator('[data-testid="wppButton"]').nth(1)

    const rootElement = await page.locator('#root')
    const boxElement = rootElement.locator('.tippy-box')
    const closeBtn = await page.locator('[data-testid="wppActionButton"]').nth(1)

    await popoverBtn.click()

    await expect(boxElement).toBeVisible({visible:true})

    await closeBtn.click()

    await page.evaluate(el => (el as HTMLInputElement).disabled = true, await popoverBtn.elementHandle());

    const buttonHandle = await popoverBtn.elementHandle()
    if (!buttonHandle) {
      throw new Error('Button element not found')
    }

    await page.evaluate(el => {
      const event = new MouseEvent('click', { bubbles: true });
      el.dispatchEvent(event);
    }, buttonHandle)


    await expect(boxElement).toBeVisible({visible:false});
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()

    await popoverBtn.hover()

    await expect(boxElement).toBeVisible({visible:false})
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  test('[WPPOPENDS-T665] Check that popover should not open if trigger element is disabled', async ({ page }) => {
    const triggerToOpenPopoverBtn = await page.locator('.button.secondary.size-m').first()
    const disableEnableTriggrBtn = await page.locator('.button.primary.size-m').nth(1)
    const rootElement = await page.locator('#root')
    const boxElement = rootElement.locator('.tippy-box')

    await disableEnableTriggrBtn.click()

    const buttonHandle = await triggerToOpenPopoverBtn.elementHandle()
      if (!buttonHandle) {
        throw new Error('Button element not found')
      }

      const numberOfClicks = 3

      for (let i = 0; i < numberOfClicks; i++) {
        await page.evaluate(el => {
          const event = new MouseEvent('click', { bubbles: true })
          el.dispatchEvent(event)
        }, buttonHandle)
      }

      await expect(boxElement).toBeVisible({visible:false})
      await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  test('[WPPOPENDS-T765] Check that there is no error if click on not-interactive trigger element', async ({ page }) => {
    const iconElement = await page.locator('[data-testid="wpp-icon-chat-message"]')
    const popoverDropdown = await page.locator('.wpp-popover-content')
    const consoleMessages: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text())
      }
    })
    await wppPopoversPage.openPage('bugfixes/30643')
    await iconElement.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await expect(popoverDropdown).not.toBeVisible()
    await iconElement.click()
    await page.waitForTimeout(2000)
    expect(consoleMessages).toHaveLength(0)
    await expect(popoverDropdown).toBeVisible()
  })

  test('[WPPOPENDS-T727] Check that popover is closed after clicking CLose icon', async ({ page }) => {
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
    await wppPopoversPage.defaultPopoverTrigger.click()
    await page.waitForTimeout(1000)
    await expect(await wppPopoversPage.popoverContent).toBeVisible()
    await wppPopoversPage.popoverDropdownCloseIcon.click()
    await page.waitForTimeout(1000)
    await expect(wppPopoversPage.popoverContent).not.toBeVisible()
  })

  test('[WPPOPENDS-T1265] Check that popover is opend after clicking Avatar icon', async ({ page }) => {
    await wppPopoversPage.customPopoverTrigger.click()
    await page.waitForTimeout(1000)
    await expect(await wppPopoversPage.popoverUsersDropdownList).toBeVisible()
  })

  test('[WPPOPENDS-T1266] Check that popover is closed after clicking Avatar icon again', async ({ page }) => {
    await wppPopoversPage.customPopoverTrigger.click()
    await page.waitForTimeout(1000)
    await expect(await wppPopoversPage.popoverUsersDropdownList).toBeVisible()
    await wppPopoversPage.customPopoverTrigger.click()
    await expect(await wppPopoversPage.popoverUsersDropdownList).not.toBeVisible()
  })

  test('[WPPOPENDS-T1294] Check that it is possible to set the search value to the popover', async ({ page }) => {
    await wppPopoversPage.setSearchValueBtn.click()
    await wppPopoversPage.popoverWithContent.first().click()
    //with content
    await expect(wppPopoversPage.searchInput).toHaveValue('Test')
    await wppPopoversPage.setSearchValueBtn.click()
    await wppPopoversPage.popoverNoContent.click()
    //no content
    await expect(wppPopoversPage.searchInput.first()).toHaveValue('Test')
  })

  test('[WPPOPENDS-T1295] Check that it is possible to enable persistent search in the popover', async ({ page }) => {
    await wppPopoversPage.persistentSearchBtn.click()

    await wppPopoversPage.setSearchValueBtn.click()
    await wppPopoversPage.popoverWithContent.first().click()
    //with content
    await expect(wppPopoversPage.searchInput).toHaveValue('Test')
    await wppPopoversPage.popoverWithContent.first().click()
    await wppPopoversPage.popoverWithContent.first().click()
    await expect(wppPopoversPage.searchInput).toHaveValue('Test')
    //no content
    await wppPopoversPage.popoverNoContent.click()
    await expect(wppPopoversPage.searchInput.first()).toHaveValue('Test')
    await wppPopoversPage.popoverNoContent.first().click()
    await wppPopoversPage.popoverNoContent.first().click()
    await expect(wppPopoversPage.searchInput.first()).toHaveValue('Test')
  })

  test('[WPPOPENDS-T1296] Check that it is possible to clear the search value for popover with persistent search', async ({ page }) => {
    await wppPopoversPage.persistentSearchBtn.click()

    await wppPopoversPage.setSearchValueBtn.click()
    await wppPopoversPage.popoverWithContent.first().click()
    //with content
    await expect(wppPopoversPage.searchInput).toHaveValue('Test')
    await wppPopoversPage.clearSearchInputBtn.click()
    await expect(wppPopoversPage.searchInput).toHaveValue('')
    await wppPopoversPage.popoverWithContent.first().click()
    await wppPopoversPage.popoverWithContent.first().click()
    await expect(wppPopoversPage.searchInput).toHaveValue('')
    //no content
    await wppPopoversPage.popoverNoContent.first().click()
    await expect(wppPopoversPage.searchInput.first()).toHaveValue('')
  })
})
