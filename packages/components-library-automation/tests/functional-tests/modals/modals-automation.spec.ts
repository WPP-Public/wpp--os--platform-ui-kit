import { test, expect } from '@playwright/test'
import { WppModalsPage } from '../../../pages/modals.page'

const wppModalsPage = new WppModalsPage()

test.beforeEach(async ({ page }) => {
  await wppModalsPage.setPage(page)
  await wppModalsPage.init()
  await wppModalsPage.openPage('vc/modals')
})

test.describe('WPP Modals', () => {
  test('[WPPOPENDS-T260] Check that the component closes when you click outside', async () => {
    await wppModalsPage.regularModalButton.click()

    await expect(wppModalsPage.regularModal.locator('.header')).toBeVisible()
    await expect(wppModalsPage.regularModal).toHaveJSProperty('open', true)
    //click outside
    await wppModalsPage.regularModal.locator('.overlay-color').click({ position: { x: 0, y: 0 } })

    await expect(wppModalsPage.regularModal.locator('.header')).not.toBeVisible()
    await expect(wppModalsPage.regularModal).toHaveJSProperty('open', false)
  })

  //WPPLONOP-23900
  test('[WPPOPENDS-T939] Check that the component is not cut when zooming a page', async ({ page }) => {
    await wppModalsPage.fullScreenModalWithControlsButton.click()
    const zoomFactor = 2.0
    const initialViewportWidth = 1280
    const initialViewportHeight = 800
    await page.setViewportSize({
      width: Math.floor(initialViewportWidth / zoomFactor),
      height: Math.floor(initialViewportHeight / zoomFactor),
    })
    const cancelBtn = await page.locator('[data-testid="fullscreen-side-modal-with-controls-m-size"] >> .button.secondary.size-m')
    await expect(cancelBtn).toBeVisible()
    const submitBtn = await page.locator('[data-testid="fullscreen-side-modal-with-controls-m-size"] >> .button.primary.size-m').nth(2)
    await expect(submitBtn).toBeVisible()
    const pageTitleLocator = await page.locator('[data-testid="fullscreen-side-modal-with-controls-m-size"] >> div:has-text("Page Title")')
    await expect(pageTitleLocator).toBeVisible()
  })

  //WPPLONOP-22745
  test('[WPPOPENDS-T823] Check that header slot is rendered correctly as tag, not a div', async ({ page }) => {
    await wppModalsPage.fullScreenModalWithoutControlsButton.click()
    const titlePage = await page.locator(':has-text("Fourth Page Title")[slot="header"]').nth(1)
    await titlePage.hover()
    const tagName = await titlePage.evaluate(element => element.tagName)
    await expect(tagName.toLowerCase()).toEqual('div')
  })

  test('[WPPOPENDS-T695] Check events for opening and closing with clicking on overlay for side modal', async ({ page }) => {
    await wppModalsPage.openPage('bugfixes/32186')

    const sideModalBtn = await page.locator(':text("Open Side Modal")').first()
    const overlay = await page.locator('.modal-overlay').first()

    // Check that the "onWppModalOpenStart" and "onWppModalOpenComplete" events are present when the modal opens for side modal
    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await sideModalBtn.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)

    // Check that the "onWppModalCloseStart" and "onWppModalCloseComplete" and "wppModalClose" events are present when the modal closes by clicking on overlay for side modal
    await overlay.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(true)
  })

  test('[WPPOPENDS-T697] Check events for opening/closing with closing with clicking on Cancel button for side modal', async ({ page }) => {
    await wppModalsPage.openPage('bugfixes/32186')

    const sideModalBtn = await page.locator(':text("Open Side Modal")').first()
    // Check that the "onWppModalOpenStart" and "onWppModalOpenComplete" events are present when the modal opens for side modal
    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await sideModalBtn.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)

    // Check that the "onWppModalCloseStart" and "onWppModalCloseComplete" events are present when the modal closes by clicking on Cancel button for side modal
    await wppModalsPage.cancelBtn.nth(1).click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)
  })

  test('[WPPOPENDS-T698] Check events for opening/closing with closing with clicking on X button for side modal', async ({ page }) => {
    await wppModalsPage.openPage('bugfixes/32186')

    const sideModalBtn = await page.locator(':text("Open Side Modal")').first()
    const xBtn = await page.getByRole('dialog').getByTestId('wppActionButton')

    // Check that the "onWppModalOpenStart" and "onWppModalOpenComplete" events are present when the modal opens for side modal
    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await sideModalBtn.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)

    // Check that the "onWppModalCloseStart" and "onWppModalCloseComplete" and "wppModalClose" events are present when the modal closes by clicking on X button for side modal
    await xBtn.click({ force: true })

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(true)
  })

  test('[WPPOPENDS-T699] Check events for opening and closing with clicking on Cancel for full screen modal', async ({ page }) => {
    await wppModalsPage.openPage('bugfixes/32186')

    const fullScreenModalBtn = await page.locator(':text("Open Full Screen Modal")').first()

    // Check that the "onWppModalOpenStart" and "onWppModalOpenComplete" events are present when the modal opens for full screen modal
    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await fullScreenModalBtn.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)

    // Check that the "onWppModalCloseStart" and "onWppModalCloseComplete" events are present when the modal closes by clicking on Cancel button for full screen modal

    await wppModalsPage.cancelBtn.nth(9).click({ force: true })

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)
  })

  test('[WPPOPENDS-T700] Check events for opening and closing with clicking on Cancel button for modal', async ({ page }) => {
    await wppModalsPage.openPage('bugfixes/32186')

    const modalBtn = await page.locator(':text("Open Modal")').first()

    // Check that the "onWppModalOpenStart" and "onWppModalOpenComplete" events are present when the modal opens for modal
    const consoleMessages: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await modalBtn.click()

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventOpenEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(false)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)

    // Check that the "onWppModalCloseStart" and "onWppModalCloseComplete" events are present when the modal closes by clicking on Cancel button for modal

    await wppModalsPage.cancelBtn.nth(10).click({ force: true })

    await page.waitForTimeout(2000)

    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseStartText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.customEventCloseEndText))).toBe(true)
    expect(consoleMessages.some((msg) => msg.includes(WppModalsPage.EventTexts.eventCloseText))).toBe(false)
  })
})