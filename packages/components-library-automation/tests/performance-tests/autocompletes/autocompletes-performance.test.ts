import { test, expect } from '@playwright/test'
import { WppAutocompletePage } from '../../../pages/autocomplete.page'

const wppAutocompletePage = new WppAutocompletePage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppAutocompletePage.setPage(page)
  await wppAutocompletePage.init()
  consoleErrors = await wppAutocompletePage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Autocompletes Performance', () => {
  test.skip('Get performance metrics', async ({ page }) => {
    //Create a new connection to an existing CDP session to enable performance Metrics
    const session = await page.context().newCDPSession(page)

    //To tell the CDPsession to record performance metrics.
    await session.send('Performance.enable')
    await wppAutocompletePage.openPage('performance/autocompletes')
    await wppAutocompletePage.singleAutocompleteWithoutSuggestions.click()
    await wppAutocompletePage.singleAutocompleteInputWithoutSuggestions.type('a')

    console.log('=============CDP Performance Metrics===============')
    const performanceMetrics = await session.send('Performance.getMetrics')

    //Number of events on the page
    const jSEventListeners = performanceMetrics.metrics.at(5)?.value

    //Total number of page style recalculations
    const recalcStyleCount = performanceMetrics.metrics.at(21)?.value

    //Combined duration of all tasks performed by the browser
    const taskDuration = performanceMetrics.metrics.at(27)?.value

    //Used JavaScript heap size
    const jSHeapUsedSize = performanceMetrics.metrics.at(31)?.value

    //Total JavaScript heap size
    const jSHeapTotalSize = performanceMetrics.metrics.at(32)?.value

    await expect(jSEventListeners! < 9000).toBeTruthy()
    await expect(recalcStyleCount! < 30).toBeTruthy()
    await expect(taskDuration! < 2.0).toBeTruthy()
    await expect(jSHeapUsedSize! < 40000000).toBeTruthy()
    await expect(jSHeapTotalSize! < 55000000).toBeTruthy()
  })
})
