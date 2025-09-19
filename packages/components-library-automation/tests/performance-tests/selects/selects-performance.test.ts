import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Selects Performance', () => {
  test.skip('Get performance metrics', async ({ page }) => {
    //Create a new connection to an existing CDP session to enable performance Metrics
    const session = await page.context().newCDPSession(page)

    //To tell the CDPsession to record performance metrics.
    await session.send('Performance.enable')
    await wppSelectsPage.openPage('performance/selects')
    await wppSelectsPage.focusMultipleSelect.click()

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

    console.log(performanceMetrics.metrics)

    await expect(jSEventListeners! < 11500).toBeTruthy()
    await expect(recalcStyleCount! < 30).toBeTruthy()
    await expect(taskDuration! < 3.5).toBeTruthy()
    await expect(jSHeapUsedSize! < 45000000).toBeTruthy()
    await expect(jSHeapTotalSize! < 60000000).toBeTruthy()
  })

  //Example with marks and results export to file
  test.skip('Capture performance traces by marking actions using Performance API', async ({ page, browser }) => {
    console.log('========== Start Tracing Perf ===========')
    await browser.startTracing(page, { path: './perfTraces.json', screenshots: true })
    await page.goto('https://www.google.com/')
    //Using Performanc.mark API
    await page.evaluate(() => window.performance.mark('Perf:Started'))
    await page.getByTitle('Search').click()
    await page.getByTitle('Search').fill('Playwright')

    //Using performance.mark API
    await page.evaluate(() => window.performance.mark('Perf:Ended'))

    //Performance measure
    await page.evaluate(() => window.performance.measure('overall', 'Perf:Started', 'Perf:Ended'))

    //To get all performance marks
    const getAllMarksJson = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('mark')))
    const getAllMarks = await JSON.parse(getAllMarksJson)

    console.log('window.performance.getEntriesByType("mark")', getAllMarks)

    //To get all performance measures of Google
    const getAllMeasuresJson = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType('measure')))
    const getAllMeasures = await JSON.parse(getAllMeasuresJson)

    console.log('window.performance.getEntriesByType("measure")', getAllMeasures)
    await page.getByTitle('Search').click()
    await page.getByTitle('Search').fill('Playwright')
    console.log('======= Stop Tracing ============')
    await browser.stopTracing()
  })
})
