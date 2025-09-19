import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class WppDatepickersPage extends BasePage {
  private _datepickers!: Locator
  private _datepickerInput!: Locator
  private _crossIcon!: Locator
  private _focusDatepicker!: Locator

  private _singleSelectDatepicker!: Locator
  private _datepickerTestLabel!: Locator
  private _overriddenDateFormatDatepicker!: Locator
  private _rangeDatepicker!: Locator
  private _initDateDatepicker!: Locator
  private _clickoutLabel!: Locator
  private _newFormatRangeDatepicker!: Locator
  private _defaultRangeDatepicker!: Locator
  private _datepickerFullDayNameDate!: Locator
  private _datepickerDayMonthYearAbbreviated!: Locator
  private _datepickerFullMonthDayNameDate!: Locator
  private _datepickerDayMonthYearShort!: Locator
  private _rangeDatepickerPresets!: Locator
  private _staticRangeDatepickerPresets!: Locator
  private _singleDatepikerWidget!: Locator
  private _rangeDatepikerWidget!: Locator

  get datepickers(): Locator {
    return this._datepickers
  }

  get datepickerInput(): Locator {
    return this._datepickerInput
  }

  get crossIcon(): Locator {
    return this._crossIcon
  }

  get focusDatepicker(): Locator {
    return this._focusDatepicker
  }

  get singleSelectDatepicker(): Locator {
    return this._singleSelectDatepicker
  }

  get datepickerTestLabel(): Locator {
    return this._datepickerTestLabel
  }

  get overriddenDateFormatDatepicker(): Locator {
    return this._overriddenDateFormatDatepicker
  }

  get rangeDatepicker(): Locator {
    return this._rangeDatepicker
  }

  get initDateDatepicker(): Locator {
    return this._initDateDatepicker
  }

  get clickoutLabel(): Locator {
    return this._clickoutLabel
  }

  get newFormatRangeDatepicker(): Locator {
    return this._newFormatRangeDatepicker
  }

  get defaultRangeDatepicker(): Locator {
    return this._defaultRangeDatepicker
  }

  get datepickerFullDayNameDate(): Locator {
    return this._datepickerFullDayNameDate
  }

  get datepickerDayMonthYearAbbreviated(): Locator {
    return this._datepickerDayMonthYearAbbreviated
  }

  get datepickerFullMonthDayNameDate(): Locator {
    return this._datepickerFullMonthDayNameDate
  }

  get datepickerDayMonthYearShort(): Locator {
    return this._datepickerDayMonthYearShort
  }

  get rangeDatepickerPresets(): Locator {
    return this._rangeDatepickerPresets
  }

  get staticRangeDatepickerPresets(): Locator {
    return this._staticRangeDatepickerPresets
  }

  get singleDatepikerWidget(): Locator {
    return this._singleDatepikerWidget
  }

  get rangeDatepikerWidget(): Locator {
    return this._rangeDatepikerWidget
  }

  async init() {
    this._datepickers = this.page.locator('[data-testid="datepickers"]')
    this._datepickerInput = this.page.locator('[data-testid="datepicker"]')
    this._crossIcon = this.page.locator('[data-testid="datepicker"] .cross-icon')
    this._focusDatepicker = this.page.locator('[data-testid="focus-datepicker"]')

    this._singleSelectDatepicker = this.page.locator('[data-testid="single-select-datepicker"]')
    this._datepickerTestLabel = this.page.locator('[data-testid="datepicker-test-label"]').first()
    this._overriddenDateFormatDatepicker = this.page.locator('[data-testid="overridden-date-format-datepicker"]')
    this._rangeDatepicker = this.page.locator('[data-testid="range-datepicker"]')
    this._initDateDatepicker = this.page.locator('h3:has-text("Datepicker with autofocus")+ *[data-testid="init-date-datepicker"]')
    this._clickoutLabel = this.page.locator('[data-testid="clickout-label"]')
    this._newFormatRangeDatepicker = this.page.locator('[data-testid="new-format-range-datepicker"]')
    this._defaultRangeDatepicker = this.page.locator('[data-testid="default-range-datepicker"]')
    this._datepickerFullDayNameDate = this.page.locator('h3:has-text("EEEE dd MMM, yyyy")+ *[data-testid="init-date-datepicker"]')
    this._datepickerDayMonthYearAbbreviated = this.page.locator('h3:has-text("dd MMM yyyy")+ *[data-testid="init-date-datepicker"]')
    this._datepickerFullMonthDayNameDate = this.page.locator('h3:has-text("MMMM dd EEEE, yyyy")+ *[data-testid="init-date-datepicker"]')
    this._datepickerDayMonthYearShort = this.page.locator('h3:has-text("dd/MM/yy")+ *[data-testid="init-date-datepicker"]')
    this._rangeDatepickerPresets = this.page.locator('h3:has-text("Range Datepicker with Presets"):not(:has-text("Static")) + *[data-testid="range-datepicker-with-presets"]');
    this._staticRangeDatepickerPresets = this.page.locator('h3:has-text("Static Range Datepicker with Presets")+ *[data-testid="range-datepicker-with-presets"]')
    this._singleDatepikerWidget = this.page.locator('.wpp-datepicker-portal.portal-datepicker')
    this._rangeDatepikerWidget = this.page.locator('.wpp-datepicker-portal.portal-datepicker.wpp-range-selected')
  }

async checkPlaceholder(pageObject:Locator, expectedPlaceholder:any) {
  const locator = pageObject.locator('#datepicker');
  await expect(locator).toHaveAttribute('placeholder', expectedPlaceholder);
}

  async checkEnteredDate(datepicker: Locator, expectedDate: string) {
    const enteredDate = await datepicker.locator('#datepicker').inputValue()

    expect(enteredDate === expectedDate).toBeTruthy()
  }

  async selectAndClearDates() {
    let clearMsg

    await this.page.on('console', msg => {
      if (msg.type() === 'log') {
        clearMsg = msg.text()
      }
    })

    //There is an issue with the direct navigation with webkit browser. Had to change it to clicking menu items
    await this.page.locator('text=Visual Comparison').click()
    await this.page.locator('text=Datepicker').nth(1).click()

    await this.page.waitForTimeout(1000)
    await this.defaultRangeDatepicker.click()
    await this.page.locator('[data-date="20"]').first().click()
    await this.page.locator('[data-date="16"]').first().click()
    await this.page.locator('.button-apply').first().click()
    await this.defaultRangeDatepicker.locator('.wpp-icon-cross').click()
    await this.page.waitForTimeout(1000)

    return clearMsg
  }

  async getLastSevenDaysRange(): Promise<string> {
    const date = new Date()
    const endDay = date.getDate()
    const endMonth = date.getMonth() + 1
    const endYear = date.getFullYear()
    
    const startDate = new Date(date)
    startDate.setDate(endDay - 6)
    const startDay = startDate.getDate()
    const startMonth = startDate.getMonth() + 1
    const startYear = startDate.getFullYear()
  
    const formatWithLeadingZero = (num: number): string => num < 10 ? '0' + num : num.toString()
  
    const formattedStartDay = formatWithLeadingZero(startDay)
    const formattedStartMonth = formatWithLeadingZero(startMonth)
    const formattedEndDay = formatWithLeadingZero(endDay)
    const formattedEndMonth = formatWithLeadingZero(endMonth)
  
    const formattedStartDate = `${formattedStartDay}/${formattedStartMonth}/${startYear}`
    const formattedEndDate = `${formattedEndDay}/${formattedEndMonth}/${endYear}`
  
    return `${formattedStartDate} – ${formattedEndDate}`
  }

  async getCurrentMonth(): Promise<string> {
    const date = new Date()
    let monthIndex = date.getMonth()
    let monthNumber = monthIndex + 1
  
    return monthNumber.toString().padStart(2, '0')
  }
}
