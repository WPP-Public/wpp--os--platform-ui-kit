import { test, expect } from '@playwright/test'
import { WppMenuContextPage } from '../../../pages/menu-context.page'

const wppMenuContextPage = new WppMenuContextPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppMenuContextPage.setPage(page)
  await wppMenuContextPage.init()
  await wppMenuContextPage.openPage('menu-context')
  consoleErrors = await wppMenuContextPage.listenConsoleErrors(page)
  await wppMenuContextPage.contextTriggerButton.click()
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Menu Context', () => {
  test('[WPPOPENDS-T131] Check that the component is closed when the icon is clicked (left slot)', async ({ page }) => {
    await wppMenuContextPage.itemWithLeftIcon.locator('.wpp-icon-plus').click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T132] Check that the component is closed when the label is clicked (left slot)', async ({
    page,
  }) => {
    await wppMenuContextPage.itemWithLeftIcon.locator('[slot="label"]').click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T133] Check that the component is closed when the icon is clicked (right slot)', async ({
    page,
  }) => {
    await wppMenuContextPage.itemWithRightIcon.locator('.wpp-icon-cross').click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T134] Check that the component is closed when the label is clicked (right slot)', async ({
    page,
  }) => {
    await wppMenuContextPage.itemWithRightIcon.locator('[slot="label"]').click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T135] Check that the component is closed when the label is clicked (regular item)', async ({
    page,
  }) => {
    await wppMenuContextPage.regularItem.locator('[slot="label"]').click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })

  test('[WPPOPENDS-T136] Check that the component is closed when the icon is clicked (extendable item)', async ({
    page,
  }) => {
    await wppMenuContextPage.extendableItem.locator('.wpp-icon-chevron').click()

    await expect(wppMenuContextPage.contextList.first()).toBeVisible()
  })

  test('[WPPOPENDS-T137] Check that the component is closed when the label is clicked (extendable item)', async () => {
    await wppMenuContextPage.extendableItem.locator('[slot="label"]').click()

    await expect(wppMenuContextPage.contextList.first()).toBeVisible()
  })

  test('[WPPOPENDS-T138] Check that the component is not closed when the disabled item is clicked', async () => {
    await wppMenuContextPage.extendableItem.hover()
    await wppMenuContextPage.disabledItem.click()

    await expect(wppMenuContextPage.contextList.first()).toBeVisible()
    await expect(wppMenuContextPage.contextList.nth(1)).toBeVisible()
  })

  test('[WPPOPENDS-T139] Check that the component is closed when the nested icon is clicked (left slot)', async () => {
    await wppMenuContextPage.extendableItem.hover()
    await wppMenuContextPage.nestedItemLeftIcon.locator('.wpp-icon-plus').click()

    await expect(wppMenuContextPage.contextList.first()).not.toBeVisible()
    await expect(wppMenuContextPage.contextList.nth(1)).not.toBeVisible()
  })

  test('[WPPOPENDS-T140] Check that the component is closed when the nested label is clicked (left slot)', async () => {
    await wppMenuContextPage.extendableItem.hover()
    await wppMenuContextPage.nestedItemLeftIcon.locator('[slot="label"]').click()

    await expect(wppMenuContextPage.contextList.first()).not.toBeVisible()
    await expect(wppMenuContextPage.contextList.nth(1)).not.toBeVisible()
  })

  test('[WPPOPENDS-T141] Check that the component is closed when the nested icon is clicked (right slot)', async () => {
    await wppMenuContextPage.extendableItem.hover()
    await wppMenuContextPage.nestedItemRightIcon.locator('.wpp-icon-cross').click()

    await expect(wppMenuContextPage.contextList.first()).not.toBeVisible()
    await expect(wppMenuContextPage.contextList.nth(1)).not.toBeVisible()
  })

  test('[WPPOPENDS-T142] Check that the component is closed when the nested label is clicked (right slot)', async () => {
    await wppMenuContextPage.extendableItem.hover()
    await wppMenuContextPage.nestedItemRightIcon.locator('[slot="label"]').click()

    await expect(wppMenuContextPage.contextList.first()).not.toBeVisible()
    await expect(wppMenuContextPage.contextList.nth(1)).not.toBeVisible()
  })

  test('[WPPOPENDS-T143] Check that the component is closed when clicked outside the context menu', async ({
    page,
  }) => {
    await wppMenuContextPage.testLabel.click()

    await expect(page.locator('[data-testid="functional-menu-context"] .wpp-list').first()).not.toBeVisible()
  })
//WPPLONOP-27553
//WPPLONOP-19109
  test('[WPPOPENDS-T821] Check onWppChangeListItem events for menu context', async ({ page }) => {
    await wppMenuContextPage.openPage('bugfixes/19108')

    const disabledBtn = await page.locator('.trigger-wrapper.sc-wpp-menu-context.sc-wpp-menu-context-s').first()
    const enabledBtn = await page.locator('.wpp-button').nth(1)
    const rootElement = await page.locator('#root')
    const dropDownMenu = await page.locator('.wpp-list-item.wpp-mounted')
    const boxElement = rootElement.locator('.tippy-box')

    await disabledBtn.scrollIntoViewIfNeeded();

    const consoleMessages: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await disabledBtn.click()
    await expect(boxElement).toBeVisible({ visible: false })

    await enabledBtn.click()

    await expect(boxElement).toBeVisible()
    await expect(dropDownMenu).toBeVisible()

    await dropDownMenu.click()

    await page.waitForTimeout(1000)
    expect(consoleMessages).toEqual(expect.arrayContaining(['CLICK TWO']))

    await enabledBtn.click()
    await dropDownMenu.click()

    await page.waitForTimeout(1000)
    expect(consoleMessages).toEqual(expect.arrayContaining(['CLICK TWO', 'CLICK TWO']))
  })

  //WPPLONOP-22099
  test('[WPPOPENDS-T822] Check the onHide and onShow events for menu context', async ({ page }) => {
    await wppMenuContextPage.openPage('menu-context')
    const clickBtn = await page.locator('[data-testid="context-trigger-button"]')
    const dropDown = await page.locator('.tippy-box')

    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await page.evaluate(() => {
      (window as any).consoleMessages = []
      const originalLog = console.log
      console.log = (...args) => {
        (window as any).consoleMessages.push(args.join(' '))
        originalLog.apply(console, args)
      }
    })

    await clickBtn.click()
    await expect(dropDown).toBeVisible({ visible: true })

    await page.waitForFunction(() => (window as any).consoleMessages.some((msg: string) => msg.includes('Show')), { timeout: 5000 })
    const messagesAfterFirstClick = await page.evaluate(() => (window as any).consoleMessages)
    expect(messagesAfterFirstClick[messagesAfterFirstClick.length - 1]).toContain('Show')

    await clickBtn.click()
    await expect(dropDown).toBeVisible({ visible: false })

    await page.waitForFunction(() => (window as any).consoleMessages.some((msg: string) => msg.includes('Hide')), { timeout: 5000 })
    const messagesAfterSecondClick = await page.evaluate(() => (window as any).consoleMessages)
    expect(messagesAfterSecondClick[messagesAfterSecondClick.length - 1]).toContain('Hide')

  })
})
