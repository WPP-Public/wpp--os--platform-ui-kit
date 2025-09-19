import { test, expect } from '@playwright/test'
import { WppDatepickersPage } from '../../../pages/datepickers.page'

const wppDatepickersPage = new WppDatepickersPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppDatepickersPage.setPage(page)
  await wppDatepickersPage.init()
  await wppDatepickersPage.openPage('vc/datepicker')
  consoleErrors = await wppDatepickersPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Datepicker', () => {
//WPPLONOP-23132
  test('[WPPOPENDS-T635] Check datepicker logic with update limits: if previously dates selected are not in updated range, dates should not be selected anymore and be disabled', async ({
    page,
  }) => {
    const startDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="5"][data-month="6"]')
    await startDatePrimary.click()
    const endDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="9"][data-month="6"]')
    await endDatePrimary.click()
    const applyBtn = page.locator('.air-datepicker-button.button-apply').nth(1)
    await applyBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
    const updateLimitsBtn = page.locator('[data-testid="wppButton"]').first()
    await updateLimitsBtn.click()
    await expect(startDatePrimary).toHaveClass(/disabled/)
    await expect(endDatePrimary).toHaveClass(/disabled/)
  })
//WPPLONOP-23132
  test('[WPPOPENDS-T636] Check datepicker logic with update limits: if previously dates selected are in updated range, dates should be without changes', async ({
    page,
  }) => {
    const startDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="16"][data-month="6"]')
    await startDatePrimary.click()
    const endDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="19"][data-month="6"]')
    await endDatePrimary.click()
    const applyBtn = page.locator('.air-datepicker-button.button-apply').nth(1)
    await applyBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
    const updateLimitsBtn = page.locator('[data-testid="wppButton"]').first()
    await updateLimitsBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
  })
//WPPLONOP-23132
  test('[WPPOPENDS-T637] Check datepicker logic with update limits: if previously selected min date is not in updated range, date should not be selected anymore', async ({
    page,
  }) => {
    const startDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="4"][data-month="6"]')
    await startDatePrimary.click()
    const endDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="4"][data-month="6"]')
    await endDatePrimary.click()
    const applyBtn = page.locator('.air-datepicker-button.button-apply').nth(1)
    await applyBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
    const updateLimitsBtn = page.locator('[data-testid="wppButton"]').first()
    await updateLimitsBtn.click()
    await expect(startDatePrimary).toHaveClass(/disabled/)
    await expect(endDatePrimary).toHaveClass(/disabled/)
  })
//WPPLONOP-23132
  test('[WPPOPENDS-T638] Check datepicker logic with update limits: if previously selected max date is in updated range, date should be without changes', async ({
    page,
  }) => {
    const startDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="20"][data-month="6"]')
    await startDatePrimary.click()
    const endDatePrimary = await page
      .locator('.range-datepicker.has-default-format.static-datepicker')
      .nth(1)
      .locator('.air-datepicker-cell[data-date="20"][data-month="6"]')
    await endDatePrimary.click()
    const applyBtn = page.locator('.air-datepicker-button.button-apply').nth(1)
    await applyBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
    const updateLimitsBtn = page.locator('[data-testid="wppButton"]').first()
    await updateLimitsBtn.click()
    await expect(startDatePrimary).toHaveClass(/selected/)
    await expect(endDatePrimary).toHaveClass(/selected/)
  })
//WPPLONOP-24031
  test('[WPPOPENDS-T639] Check that auto focus datepicker window is not closed when select dates and selected dates value before Apply are visible in input', async ({ page }) => {
    const focusDatepicker = await page.locator('[data-testid="focus-datepicker"]>> input')
    const focusDatepickerCalendar = await page.locator('#root >> .wpp-datepicker-portal.portal-datepicker.wpp-range-selected')
    await expect(focusDatepickerCalendar).toBeVisible({ visible: false })
    await focusDatepicker.hover()
    await focusDatepicker.click()
    await expect(focusDatepickerCalendar).toBeVisible({ visible: true })
    await expect(focusDatepickerCalendar).toBeVisible({ visible: true })
    const startDate = await focusDatepickerCalendar.locator('[data-date="7"]').first()
    await startDate.click()
    const endDate = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="10"]').first()
    await endDate.click()
    await expect(focusDatepickerCalendar).toBeVisible({ visible: true })
    const inputValue = await focusDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValue).toBe('07/02/2022 – 10/02/2022')
  })
})
