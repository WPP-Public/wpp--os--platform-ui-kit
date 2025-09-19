import { test, expect } from '@playwright/test'
import { WppDatepickersPage } from '../../../pages/datepickers.page'

const wppDatepickersPage = new WppDatepickersPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppDatepickersPage.setPage(page)
  await wppDatepickersPage.init()
  await wppDatepickersPage.openPage('datepickers')
  await page.waitForTimeout(1000)
  consoleErrors = await wppDatepickersPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Datepickers', () => {
  //BUG-WPPLONOP-4897
  test('[WPPOPENDS-T101] Check that component is focused when the page is opened', async () => {
    await expect(wppDatepickersPage.initDateDatepicker).toBeFocused()
  })

  test('[WPPOPENDS-T118] Check that a valid date can be entered into the input', async () => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await wppDatepickersPage.singleSelectDatepicker.type('01/02/2023', { delay: 50 })

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '01/02/2023')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T119] Check that the full date (year, month, day) can be selected with the calendar', async ({
    page,
  }) => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    //Click on month + year label
    await page.locator('.air-datepicker-nav--title').first().click()
    //Click on year label
    await page.locator('.air-datepicker-nav--title').first().click()

    await page.locator('[data-year="2025"]:text("2025")').click()
    await page.locator('[data-month="1"]:text("Feb")').click()
    await page.locator('[data-date="5"]').first().click()

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '05/02/2025')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })
  //WPPLONOP-9515
  test('[WPPOPENDS-T120] Check that letters cannot be entered into the input', async ({page}) => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await wppDatepickersPage.singleSelectDatepicker.type('01/aaaa/2022')
    
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '01/20/22')
    await expect(wppDatepickersPage.singleDatepikerWidget).toBeVisible()
  })

  test('[WPPOPENDS-T339] Check that symbols cannot be entered into the input', async () => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await wppDatepickersPage.singleSelectDatepicker.type('01/[.,;/2022')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '01/20/22')
    await expect(wppDatepickersPage.singleSelectDatepicker).toBeVisible()
  })
  //WPPLONOP-26189
  test('[WPPOPENDS-T401] Check that non-existent date cannot be entered into the input - Single', async () => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await wppDatepickersPage.singleSelectDatepicker.type('32/32/0000')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '')
    await expect(wppDatepickersPage.singleSelectDatepicker).toBeVisible()
  })

  // bug WPPLONOP-26189 to be fixed
  test('[WPPOPENDS-T473] Check that non-existent date cannot be entered into the input - Range [@bug-WPPLONOP-26189 ]', async () => {
    await wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.rangeDatepicker.click()
    await wppDatepickersPage.rangeDatepicker.type('32320000-32320001')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '01/09/1902 – 01/09/1903')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.air-datepicker')).toBeVisible()
  })

  test('[WPPOPENDS-T121] Check that the date can be entered in a new format to the component with overridden date format', async () => {
    await wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.overriddenDateFormatDatepicker.click()
    await wppDatepickersPage.overriddenDateFormatDatepicker.type('04/23/2022')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.overriddenDateFormatDatepicker, '04/23/2022')
    await expect(wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T122] Check that click outside the component resets selected values - Apply button is not clicked', async ({
    page,
  }) => {
    await wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.rangeDatepicker.click()
    await page.locator('[data-date="20"]').first().click()
    await page.locator('[data-date="16"]').first().click()
    await wppDatepickersPage.datepickerTestLabel.click()

    //Timeout is needed because the test works faster than the input's cleared
    await page.waitForTimeout(1000)

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.air-datepicker')).not.toBeVisible()
    await expect(wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()
  })

  test('[WPPOPENDS-T123] Check that click outside the component resets selected values - Apply button is clicked', async ({
    page,
  }) => {
    await wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.rangeDatepicker.click()
    await page.locator('[data-date="20"]').first().click()
    await page.locator('[data-date="16"]').first().click()
    await page.locator('.button-apply').first().click()
    await wppDatepickersPage.rangeDatepicker.click()
    await wppDatepickersPage.datepickerTestLabel.click()

    //Timeout is needed because the test works faster than the input's cleared
    await page.waitForTimeout(1000)

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '16/02/2023 – 20/02/2023')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.air-datepicker')).not.toBeVisible()
    await expect(wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T124] Check that click outside the component resets selected values - Only start date is chosen', async ({
    page,
  }) => {
    await wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.rangeDatepicker.click()
    await page.locator('[data-date="20"]').first().click()
    await wppDatepickersPage.datepickerTestLabel.click()

    //Timeout is needed because the test works faster than the input's cleared
    await page.waitForTimeout(1000)

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.air-datepicker')).not.toBeVisible()
    await expect(wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()
  })

  test('[WPPOPENDS-T125] Check that dates outside min/max range cannot be clicked', async ({ page }) => {
    await wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.overriddenDateFormatDatepicker.click()

    //Check chevrones for month switching are missing
    await expect(wppDatepickersPage.overriddenDateFormatDatepicker.locator('.prev-icon')).not.toBeVisible()
    await expect(
      wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-chevrone').nth(1),
    ).not.toBeVisible()

    //Check several dates to be disabled/enabled/min-date/max-date
    await expect(page.locator('[data-date="19"]').first()).toHaveClass('air-datepicker-cell -day- -disabled-')
    await expect(page.locator('[data-date="28"]:text("28")').first()).toHaveClass(
      'air-datepicker-cell -day- -other-month- -disabled-',
    )
    await expect(page.locator('[data-date="8"]').first()).toHaveClass('air-datepicker-cell -day- -disabled-')
    await expect(page.locator('[data-date="20"]').first()).toHaveClass('air-datepicker-cell -day- -min-date-')
    await expect(page.locator('[data-date="27"]').first()).toHaveClass('air-datepicker-cell -day- -max-date-')
    await expect(page.locator('[data-date="23"]').first()).toHaveClass('air-datepicker-cell -day- -weekend-')

    await page.locator('[data-date="10"]').first().click()
    await page.locator('[data-date="18"]').first().click()

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.overriddenDateFormatDatepicker, '')
    await expect(wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()
  })

  test('[WPPOPENDS-T126] Check that the selected date can be edited in the input', async ({ page }) => {
    await wppDatepickersPage.initDateDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.initDateDatepicker.click()
    await wppDatepickersPage.singleDatepikerWidget.locator('[data-date="20"]').click()

    await wppDatepickersPage.initDateDatepicker.click()
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Backspace')
    }
    await wppDatepickersPage.initDateDatepicker.type('1111')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.initDateDatepicker, '11/11/2022')
    console.log(wppDatepickersPage.initDateDatepicker)
    await expect(wppDatepickersPage.initDateDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T127] Check that the date cannot be entered with wrong delimiters', async () => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await wppDatepickersPage.singleSelectDatepicker.type('03\\02\\2023')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '03/02/2023')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T128] Check that the date cannot be entered in an old format to the component with overridden date format', async ({ page }) => {
    await wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross').click()
    await page.waitForTimeout(500)
    await wppDatepickersPage.overriddenDateFormatDatepicker.click()
    await wppDatepickersPage.overriddenDateFormatDatepicker.type('24/03/2022')

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.overriddenDateFormatDatepicker, '12/03/2023')
    await expect(wppDatepickersPage.overriddenDateFormatDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T129] Check that the same start and end dates can be entered into the input', async ({ page }) => {
    await wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.rangeDatepicker.click()
    await wppDatepickersPage.rangeDatepicker.type('24/03/2023-24/03/2023', { delay: 50 })
    await page.locator('.button-apply').first().click()

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '24/03/2023 – 24/03/2023')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T130] Check that the date can be unselected from the calendar', async ({ page }) => {
    await wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross').click()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await page.locator('[data-date="20"]').first().click()

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '20/02/2023')

    await wppDatepickersPage.singleSelectDatepicker.click()
    await page.locator('[data-date="20"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()
  })

  //bug WPPLONOP-8806 fixed
  test('[WPPOPENDS-T246] Check that the same start and end dates can be selected in the calendar', async ({ page }) => {
    await await wppDatepickersPage.rangeDatepicker.scrollIntoViewIfNeeded()
    await wppDatepickersPage.rangeDatepicker.click()
    await page.locator('[data-date="16"]').nth(1).click()
    await page.locator('[data-date="16"]').first().click()
    await page.locator('.button-apply').first().click()

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '16/02/2023 – 16/02/2023')
    await expect(wppDatepickersPage.rangeDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  //bug WPPLONOP-10322 fixed
  test('[WPPOPENDS-T917] Check that the selected values are not reset after the click out the component', async ({ page }) => {
    //The date got corrupted after 2-3 click-outs. So added several attempts
    for (let i = 0; i < 4; i++) {
      await wppDatepickersPage.newFormatRangeDatepicker.click()
      await page.waitForTimeout(500)
      await wppDatepickersPage.clickoutLabel.click({ force: true })
    }

    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.newFormatRangeDatepicker, '04/11/2023 – 04/30/2023')
    await expect(wppDatepickersPage.newFormatRangeDatepicker.locator('.air-datepicker')).not.toBeVisible()
    await expect(wppDatepickersPage.newFormatRangeDatepicker.locator('.wpp-icon-cross')).toBeVisible()
  })

  test('[WPPOPENDS-T358] Check that wppDateClear event occurs only after Clear All button is clicked', async () => {
    const clearMsgs = await wppDatepickersPage.selectAndClearDates()

    await expect(clearMsgs).toMatchSnapshot()
  })
//WPPLONOP-23132
  test('[WPPOPENDS-T640] Check default placeholder value for datepickers', async () => {
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.singleSelectDatepicker, 'dd/MM/yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.overriddenDateFormatDatepicker, 'MM/dd/yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.rangeDatepicker, 'dd/MM/yyyy – dd/MM/yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.newFormatRangeDatepicker, 'MM/dd/yyyy – MM/dd/yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.initDateDatepicker, 'dd/MM/yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.rangeDatepickerPresets, 'dd/MM/yyyy – dd/MM/yyyy')
    await wppDatepickersPage.checkPlaceholder(
      wppDatepickersPage.staticRangeDatepickerPresets,
      'dd/MM/yyyy – dd/MM/yyyy',
    )
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.datepickerFullDayNameDate, 'EEEE dd MMM, yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.datepickerDayMonthYearAbbreviated, 'dd MMM yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.datepickerFullMonthDayNameDate, 'MMMM dd EEEE, yyyy')
    await wppDatepickersPage.checkPlaceholder(wppDatepickersPage.datepickerDayMonthYearShort, 'dd/MM/yy')
  })
//WPPLONOP-19337
  test('[WPPOPENDS-T641] Check that initilly selected date for format "EEEE dd MMMM, yyyy" should not be reset after clicking on date out of maxDate', async ({
    page,
  }) => {
    const initDateFullFormatDatepicker = await page.locator(
      '[data-testid="init-date-datepicker"]',
    ).nth(1)
    await initDateFullFormatDatepicker.click()
    await page.locator('[data-date="2"][data-month="4"]').first().click()
    await initDateFullFormatDatepicker.click()
    await page.locator('[data-date="29"][data-month="4"]').first().click()
    await expect(page.locator('[data-date="14"][data-month="4"]').first()).toHaveClass(/selected/)
  })
//WPPLONOP-24125
  test('[WPPOPENDS-T642] Check that for Range Datepicker with Presets date in calendar is selected after date is entered in input', async ({ page }) => {
    const rangeDatepickerPresetsInput = await page.locator('[data-testid="range-datepicker-with-presets"] >> input').first()
    await rangeDatepickerPresetsInput.scrollIntoViewIfNeeded()
    await rangeDatepickerPresetsInput.hover()
    const rangeDatepickerPresetsCLoseBtn = await page.locator('[data-testid="range-datepicker-with-presets"] >> .cross-icon').first()
    await rangeDatepickerPresetsCLoseBtn.hover()
    await rangeDatepickerPresetsCLoseBtn.click()
    await rangeDatepickerPresetsInput.click()
    await page.locator('.datepicker-input.size-m.focus').type('08/07/2024')
    const calendarDate = await page.locator('#tippy-8').getByText('8', { exact: true }).first()
    // await calendarDate.hover()
    await expect(calendarDate).toHaveClass(/-selected-/)
  })
//WPPLONOP-24125
  test('[WPPOPENDS-T643] Check that for Range Datepicker with Presets date, date in input is displayed after date is selected in calendar', async ({ page }) => {
    const rangeDatepickerPresetsInput = await page.locator('[data-testid="range-datepicker-with-presets"] >> input').first()
    await rangeDatepickerPresetsInput.scrollIntoViewIfNeeded()
    await rangeDatepickerPresetsInput.hover()
    await rangeDatepickerPresetsInput.click()
    const calendarDate = await page.locator('.wpp-datepicker-portal.wpp-with-presets.portal-datepicker.wpp-range-selected >> [data-date="12"]').first()
    // await calendarDate.hover()
    await calendarDate.click()
    await rangeDatepickerPresetsInput.hover()
    const inputValue = await rangeDatepickerPresetsInput.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    const currentMonth = await wppDatepickersPage.getCurrentMonth()
    await expect(inputValue).toBe(`12/${currentMonth}/2025`)
  })

  //WPPLONOP-19337
  //WPPLONOP-17329
  test('[WPPOPENDS-T644] Check that for datepicker with restriction value is changed after selecting a date in calendar', async ({ page }) => {
    const restrictionDatepicker = await page.locator('[data-testid="init-date-datepicker"]>> input').nth(1)
    await restrictionDatepicker.scrollIntoViewIfNeeded()
    await restrictionDatepicker.hover()
    await restrictionDatepicker.click()
    const calendarDate = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="5"][data-year="2024"]').first()
    await calendarDate.hover()
    await calendarDate.click()
    await restrictionDatepicker.hover()
    const inputValue = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValue).toBe('Sunday 05 May, 2024')

    await restrictionDatepicker.click()
    const calendarDateMax = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="27"][data-year="2024"]')
    await calendarDateMax.hover()
    await calendarDateMax.click()
    await restrictionDatepicker.hover()
    const inputValueMax = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValueMax).toBe('Monday 27 May, 2024')
  })

  //WPPLONOP-19337
  //WPPLONOP-17329
  test('[WPPOPENDS-T762] Check that for datepicker with restriction initial value is not changed after selecting a date out of range in calendar', async ({ page }) => {
    const restrictionDatepicker = await page.locator('[data-testid="init-date-datepicker"]>> input').nth(1)
    await restrictionDatepicker.scrollIntoViewIfNeeded()
    await restrictionDatepicker.click()
    const calendarDate = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="3"][data-year="2024"]').first()
    await calendarDate.click()
    const inputValue = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValue).toBe('Tuesday 14 May, 2024')

    const calendarDateMax = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="28"][data-year="2024"][data-month="4"]')
    await calendarDateMax.click()
    const inputValueMax = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValueMax).toBe('Tuesday 14 May, 2024')
  })

  //WPPLONOP-19337
  //WPPLONOP-17329
  test('[WPPOPENDS-T645] Check that for datepicker with restriction previously selected value is not changed after selecting a date out of range in calendar', async ({ page }) => {
    const restrictionDatepicker = await page.locator('[data-testid="init-date-datepicker"]>> input').nth(1)
    await restrictionDatepicker.scrollIntoViewIfNeeded()
    await restrictionDatepicker.click()
    const calendarDate = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="10"][data-year="2024"]')
    await calendarDate.click()
    const inputValue = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValue).toBe('Friday 10 May, 2024')

    await restrictionDatepicker.click()
    const calendarDateMin = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="2"][data-year="2024"][data-month="4"]')
    await calendarDateMin.click()
    const inputValueMin = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValueMin).toBe('Friday 10 May, 2024')

    await restrictionDatepicker.click()
    const calendarDateMax = await page.locator('.wpp-datepicker-portal.portal-datepicker >> [data-date="28"][data-year="2024"][data-month="4"]')
    await calendarDateMax.click()
    const inputValueMax = await restrictionDatepicker.evaluate((element) => {
      return (element as HTMLInputElement).value
    })
    await expect(inputValueMax).toBe('Friday 10 May, 2024')
  })
//WPPLONOP-24125
  test('[WPPOPENDS-T646] Check styles for range datepicker with presets', async ({ page }) => {
    const rangeDatepickerPresetsInput = await page.locator('[data-testid="range-datepicker-with-presets"] >> input').first()
    await rangeDatepickerPresetsInput.scrollIntoViewIfNeeded()
    await rangeDatepickerPresetsInput.hover()
    await rangeDatepickerPresetsInput.click()
    const calendarDateFirst = await page.locator('.wpp-datepicker-portal.wpp-with-presets.portal-datepicker.wpp-range-selected >> [data-date="12"]')
    await calendarDateFirst.hover()
    await calendarDateFirst.click()
    const calendarDateSecond = await page.locator('#tippy-8').getByText('15')
    //await calendarDateSecond.hover()
    await calendarDateSecond.click()
    const date = await page.locator('.wpp-datepicker-portal.wpp-with-presets.portal-datepicker.wpp-range-selected >> [data-date="14"]')

    await expect(date).toHaveCSS('border-top-width', '1px')
    await expect(date).toHaveCSS('border-top-style', 'solid')
    await expect(date).toHaveCSS('--adp-padding', '8px 0')
  })
//WPLONOP-22398
  test('[WPPOPENDS-T647] Check range datepickers with presets', async ({ page }) => {
    const rangeDatepickerWithPresets = await page.locator('[data-testid="range-datepicker-with-presets"] >> input').first()
    rangeDatepickerWithPresets.scrollIntoViewIfNeeded()
    const last7days = await page.locator('text="Last 7 Days"').first()
    rangeDatepickerWithPresets.scrollIntoViewIfNeeded()
    await rangeDatepickerWithPresets.click()
    await expect(last7days).toBeVisible()

    const expectedDatesInCalendar = await wppDatepickersPage.getLastSevenDaysRange()
    await last7days.scrollIntoViewIfNeeded()
    await last7days.click()

    const datesInPlaceholder = await rangeDatepickerWithPresets.evaluate((element) => {
      return (element as HTMLInputElement).value
    })

    await expect(datesInPlaceholder).toEqual(expectedDatesInCalendar)
  })

  test('[WPPOPENDS-T654] Check check that date can be selected and unselected by clicking on it', async ({ page }) => {
    //single datepicker : selected date is 21/02/2023
    await wppDatepickersPage.singleSelectDatepicker.click()
    await page.locator('[data-date="21"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()
    await wppDatepickersPage.singleSelectDatepicker.click()
    await page.locator('[data-date="21"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '21/02/2023')
    await wppDatepickersPage.singleSelectDatepicker.click()
    await page.locator('[data-date="21"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.singleSelectDatepicker, '')
    await expect(wppDatepickersPage.singleSelectDatepicker.locator('.wpp-icon-cross')).not.toBeVisible()

    //range datepicker : selected date is 19/02/2023 - 21/02/2023
    await wppDatepickersPage.rangeDatepicker.click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '19/02/2023 – 21/02/2023')
    await wppDatepickersPage.rangeDatepikerWidget.locator('[data-date="19"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '21/02/2023')
    await wppDatepickersPage.singleDatepikerWidget.locator('[data-date="19"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '19/02/2023 – 21/02/2023')
    await wppDatepickersPage.rangeDatepikerWidget.locator('[data-date="21"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '19/02/2023')
    await wppDatepickersPage.singleDatepikerWidget.locator('[data-date="21"]').first().click()
    await wppDatepickersPage.checkEnteredDate(wppDatepickersPage.rangeDatepicker, '19/02/2023 – 21/02/2023')
  })

  test('[WPPOPENDS-T693] Check that datepickers are initialised correctly', async ({ page }) => {
    const consoleMessages: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text())
      }
    })
    await page.reload()
    expect(consoleMessages.length).toBe(0)
  })
})
