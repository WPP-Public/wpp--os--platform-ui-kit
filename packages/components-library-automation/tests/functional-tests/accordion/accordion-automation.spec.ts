import { test, expect } from '@playwright/test'
import { WppAccordionsPage } from '../../../pages/accordions.page'

const wppAccordionPage = new WppAccordionsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppAccordionPage.setPage(page)
  await wppAccordionPage.init()
  await wppAccordionPage.openPage('accordion')
  consoleErrors = await wppAccordionPage.listenConsoleErrors(page)

  consoleErrors = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })
})

test.afterEach(async () => {
  if (consoleErrors.length > 0) {
    const errorMessages = consoleErrors.join('\n')
    test.info().annotations.push({
      type: 'error',
      description: `Console Errors:\n${errorMessages}`,
    })
  }
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Accordion', () => {
  //WPPLONOP-23051
  test('[WPPOPENDS-T756] Check that accordion component can be disabled', async () => {
    await wppAccordionPage.enableAccordion.click()
    await expect(wppAccordionPage.enabledArea).toHaveAttribute('disabled', 'false')
    await wppAccordionPage.disableAccordionBtn.click()
    await expect(wppAccordionPage.disabledArea).toHaveAttribute('disabled')
  })

  test('[WPPOPENDS-T782] Check padding between chevron and title', async () => {
    await wppAccordionPage.openPage('vc/accordions')
    await expect(wppAccordionPage.accordionExample).toHaveCSS('--accordion-icon-margin', '0 8px 0 0')
  })
})
