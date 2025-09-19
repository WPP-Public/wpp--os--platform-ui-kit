import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core'

import { parse, isValid, format } from 'date-fns'
import AirDatepicker from 'air-datepicker'
import defaultLocale from 'air-datepicker/locale/en'

import isEqual from 'lodash/isEqual'

import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import { autoFocusElement, getHighestContainerInDOM, transformToVersionedTag } from '../../utils/utils'

import { InlineMessage } from '../../interfaces/inline-message'
import { BaseComponent } from '../../interfaces/base-component'

import {
  AirDatepickerTypes,
  DatePickerClearEventDetail,
  DatePickerEventDetail,
  DatepickerLabelConfig,
  DatePickerView,
  IPreset,
  LocaleTypes,
} from './types'
import {
  getCurrentFormatDate,
  getFormattedDateString,
  getNextCursorPosition,
  isValidDate,
  localeToFirstDayMap,
} from './utils'
import {
  ANIMATION_DURATION,
  DATE_FORMAT,
  DATE_FORMAT_SEPARATOR_PATTERN,
  DATES_SEPARATOR,
  DAYS,
  DAYS_MIN,
  DAYS_SHORT,
  MONTHS,
  MONTHS_SHORT,
} from './consts'
import { Z_INDEX } from '../../common/consts'
import { Instance, Props } from 'tippy.js'
import { menuListConfig } from '../../common/menuListConfig'

/**
 * @part label - Label text element
 * @part datepicker-container - datepicker container element
 * @part icon-calendar - icon calendar element
 * @part datepicker-input - datepicker input element
 * @part icon-cross - icon cross wrapper
 * @part message - message element
 */
@Component({
  tag: 'wpp-datepicker',
  styleUrl: 'wpp-datepicker.scss',
  shadow: true,
})
export class WppDatepicker implements BaseComponent, InlineMessage {
  private inputRef?: HTMLInputElement

  private portalRef: HTMLElement | undefined
  private hideTimer: NodeJS.Timeout
  private previewPresetTimer: NodeJS.Timeout
  private hasClickedPreset: boolean = false
  private isDatePickerInitialized = false

  @Element() host: HTMLWppDatepickerElement

  @State() datePickerInstance: AirDatepicker

  @State() lastValidDate: string | string[]

  @State() lastAppliedDate: string[] = []

  @State() focusType: FOCUS_TYPE

  @State() hidden: boolean = true

  @State() tippyInstance: Instance

  /**
   * If the range mode is enabled.
   */
  @Prop() readonly range: boolean = false

  /**
   * If `true`, any selected date can be unselected by clicking on it again.
   */
  @Prop() readonly toggleSelected: boolean = true

  /**
   * Defines the input value.
   */
  @Prop({ mutable: true }) value: string | string[]

  /**
   * If `true`, the input should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * If the datepicker is always visible.
   */
  @Prop() readonly static: boolean = false

  /**
   * Defines the minimal datepicker date.
   */
  @Prop() readonly minDate?: string

  /**
   *  Defines the maximal datepicker date.
   */
  @Prop() readonly maxDate?: string

  /**
   * Defines the input placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * Defines datepicker view
   */
  @Prop() readonly view: DatePickerView = 'days'

  /**
   * Indicates datepicker message
   */
  @Prop() readonly message?: string

  /**
   * Indicates datepicker message type
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the tooltip configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Indicates datepicker input message maximum length
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * If `true`, the datepicker input is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If `true`, the datepicker input is disabled
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Indicates datepicker name
   */
  @Prop() readonly name?: string

  /**
   * Defines the datepicker size.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  /**
   * An array of preset date ranges that the user can quickly select from the datepicker. This
   * prop is available only for the range-datepicker. The format of the dates within each preset item
   * should match the dateFormat provided to the component.
   */
  @Prop() readonly presets: IPreset[] = []

  /**
   * Dropdown config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the datepicker locale, uses English by default.
   * @remarks
   * - `firstDay` determines the starting day of the week and acts as a fallback if `dateLocale` is not provided.
   * - `dateLocale` is used to automatically infer date-related properties, like `firstDay`.
   */
  @Prop() readonly locale: LocaleTypes = {
    days: DAYS,
    daysShort: DAYS_SHORT,
    daysMin: DAYS_MIN,
    months: MONTHS,
    monthsShort: MONTHS_SHORT,
    today: 'Today',
    clear: 'Clear',
    dateFormat: DATE_FORMAT.DAY_MONTH_YEAR,
    timeFormat: 'hh:mm aa',
    dateLocale: undefined,
    firstDay: undefined,
  }

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: DatepickerLabelConfig

  /**
   * If `true`, the wpp-datepicker-portal containing the datepicker will be appended to the `#container`
   * By default it is false, meaning that the wpp-datepicker-portal will be appended to the document.body
   * in order to avoid clipping issues by the parent
   */
  @Prop({ mutable: true }) appendToListWrapper?: boolean = false

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * Emitted when a date is chosen.
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<DatePickerEventDetail>

  /**
   * Emitted when the input loses focus
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the input receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when a date is cleared.
   */
  @Event({ bubbles: false, composed: false }) wppDateClear: EventEmitter<DatePickerClearEventDetail>

  /**
   * Method that returns a datepicker instance which allows manipulating all props and changing them as necessary. [Read more](https://air-datepicker.com/docs).
   */
  @Method()
  async getInstance(): Promise<AirDatepickerTypes> {
    return this.datePickerInstance as AirDatepickerTypes
  }

  /**
   * Method that sets focus on the input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
  }

  @Watch('lastValidDate')
  async updateDatepickerClearButton(newValidDate: string) {
    const clearButton = this.portalRef?.querySelector('.air-datepicker--buttons .button-clear') as HTMLElement
    const applyButton = this.portalRef?.querySelector('.air-datepicker--buttons .button-apply') as HTMLElement

    if (newValidDate) {
      clearButton?.classList?.remove('disabled')
    } else {
      clearButton?.classList?.add('disabled')
    }

    if (Array.isArray(newValidDate) && newValidDate.length === 2) {
      applyButton?.classList?.remove('disabled')
    } else {
      applyButton?.classList?.add('disabled')
    }
  }

  private isStringDateValid = (stringDateValue: string) => {
    const parsedDate = parse(stringDateValue, this.locale.dateFormat, new Date())

    return isValid(parsedDate) && format(parsedDate, this.locale.dateFormat) === stringDateValue
  }

  @Watch('value')
  updateValue() {
    if (this.value === '' || isEqual(this.value, [])) {
      this.clearDatePicker()

      return
    }

    if (!this.value || !this.datePickerInstance) return

    if (this.range) {
      this.setInitialDate()
    } else {
      if (!this.isStringDateValid(this.value as string)) return

      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))
      const formattedDate: Date = formatDate(this.value as string)
      const currentDatePickerValue: Date = this.datePickerInstance.selectedDates[0]

      if (isValidDate(formattedDate) && !isEqual(formattedDate, currentDatePickerValue)) {
        this.setInitialDate()
      }
    }
  }

  @Watch('range')
  updateRange() {
    this.clearDatePicker()
    this.datePickerInstance.destroy()
    this.createDateInstance()
  }

  @Watch('minDate')
  updateMinDate() {
    this.setMinMaxDate()
  }

  @Watch('maxDate')
  updateMaxDate() {
    this.setMinMaxDate()
  }

  @Watch('dropdownConfig')
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  private setInitialDate = () => {
    if (this.value === '' || isEqual(this.value, [])) {
      this.clearDatePicker()

      return
    }

    if (!this.value) return

    const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))

    if (this.range) {
      const [startDate, endDate] = this.value

      if (!startDate || !endDate) return

      if (isValidDate([formatDate(startDate), formatDate(endDate)])) {
        //@ts-ignore Due to outdated air-datepicker.d.ts
        this.datePickerInstance.selectDate([formatDate(startDate), formatDate(endDate)])
        this.lastValidDate = this.value
        this.lastAppliedDate = this.value as string[]
      }

      return
    }

    if (!Array.isArray(this.value)) {
      this.lastValidDate = this.value
      const formattedDate = formatDate(this.value as string)

      this.datePickerInstance.selectDate([formattedDate])
    }
  }

  private setMinMaxDate = () => {
    const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))

    if (this.maxDate) {
      this.datePickerInstance.update({
        maxDate: formatDate(this.maxDate),
      })
    }
    if (this.minDate) {
      this.datePickerInstance.update({
        minDate: formatDate(this.minDate),
      })
    }

    if (this.range) {
      if (this.lastAppliedDate.length < 2) return

      this.clearIfDateNotInInterval(formatDate(this.lastAppliedDate[0]), formatDate)
      this.clearIfDateNotInInterval(formatDate(this.lastAppliedDate[1]), formatDate)
    } else {
      if (!this.lastValidDate) return

      this.clearIfDateNotInInterval(formatDate(this.lastValidDate as string), formatDate)
    }
  }

  private clearIfDateNotInInterval = (dateValue: Date, formatDate: (date: string) => Date): void => {
    if (formatDate(this.minDate || '') > dateValue || formatDate(this.maxDate || '') < dateValue) {
      this.clearDatePicker()
    }
  }

  componentWillLoad() {
    if (!this.isDefaultDateFormat()) {
      if (this.range) {
        console.warn(
          `Warning: When using the range datepicker, only default date formats can be applied. For example, ` +
            `MM/dd/yyyy, dd/MM/yyyy, and other variations using only MM, dd, yyyy with '/' or '.' separators. ` +
            `Default format ${DATE_FORMAT.DAY_MONTH_YEAR} will be used instead.`,
        )
      } else {
        console.warn(
          `Warning: When using the datepicker with a different format than the default one, the input becomes read-only. Our default formats are: MM/dd/yyyy, dd/MM/yyyy, and other variations using only MM, dd, yyyy with '/' or '.' separators.`,
        )
      }
    }
  }

  componentDidLoad() {
    this.createDateInstance()
    this.setInitialDate()
    this.setMinMaxDate()

    const datepickerEl = this.host.shadowRoot?.querySelector('[part="datepicker"]')

    if (datepickerEl) {
      this.portalRef?.appendChild(datepickerEl)
    }

    if (!this.static) {
      this.createTippyInstance()
    }

    autoFocusElement(this.autoFocus, this.inputRef)
  }

  disconnectedCallback() {
    this.tippyInstance?.destroy()
  }

  /**
   * Determines the first day of the week based on `dateLocale`, `firstDay`, or falls back to default.
   * @returns {0 | 1 | 2 | 3 | 4 | 5 | 6} The first day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  private determineFirstDay(): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    if (this.locale.dateLocale) {
      const mappedFirstDay = localeToFirstDayMap[this.locale.dateLocale]

      if (mappedFirstDay !== undefined) {
        return mappedFirstDay
      } else {
        console.warn(
          `Unknown dateLocale: "${this.locale.dateLocale}". Defaulting to firstDay: Monday (1). ` +
            `Ensure the dateLocale is correctly mapped in localeToFirstDayMap.`,
        )
      }
    }

    return this.locale.firstDay ?? 1 // Default to Monday (ISO 8601) if no valid value is found
  }

  private hasPresets = () => this.range && this.presets.length > 0

  private getDatepickerView = (): DatePickerView => (this.range ? 'days' : this.view)

  private getDateFormatSeparator = (dateFormat: string): string => {
    const match = dateFormat.match(DATE_FORMAT_SEPARATOR_PATTERN)

    return match ? match[0] : '/'
  }

  private isDefaultDateFormatSeparator = (separator: string) => ['/', '.'].includes(separator)

  private isDefaultDateFormat = (): boolean => {
    const baseFormat = ['dd', 'MM', 'yyyy'].sort()
    const separator = this.getDateFormatSeparator(this.locale.dateFormat)

    if (this.isDefaultDateFormatSeparator(separator)) {
      const separatedDate = this.locale.dateFormat.split(separator).sort()

      return JSON.stringify(baseFormat) === JSON.stringify(separatedDate)
    }

    return false
  }

  private getDateFormat = (): string => {
    if (this.range) {
      return this.isDefaultDateFormat() ? this.locale.dateFormat : DATE_FORMAT.DAY_MONTH_YEAR
    }

    return this.locale.dateFormat
  }

  private createDateInstance = () => {
    if (!this.inputRef || this.isDatePickerInitialized) return

    const buttonApply = {
      content: 'Apply',
      className: 'disabled button-apply',
      attrs: {
        tabindex: '-1',
      },
      onClick: () => {
        this.wppChange.emit({
          date: this.datePickerInstance.selectedDates,
          formattedDate: this.datePickerInstance.selectedDates.map(selectedDate =>
            this.datePickerInstance.formatDate(selectedDate, this.getDateFormat()),
          ),
          name: this.name,
        })
        if (this.range && Array.isArray(this.lastValidDate)) {
          this.lastAppliedDate = this.lastValidDate
        }

        if (this.tippyInstance) this.tippyInstance.hide()
      },
    }

    const buttonCancel = {
      content: 'Clear',
      className: 'disabled button-clear',
      attrs: {
        tabindex: '-1',
      },
      onClick: () => {
        this.clearDatePicker()
      },
    }

    const buttonsConfig = {
      buttons: [buttonCancel, buttonApply],
    }

    const IconChevron = transformToVersionedTag('wpp-icon-chevron')
    const firstDay = this.determineFirstDay()

    this.datePickerInstance = new AirDatepicker(this.inputRef, {
      container: this.portalRef,
      range: this.range,
      toggleSelected: this.toggleSelected
        ? () => !this.range || this.datePickerInstance.selectedDates.length === 2
        : false,
      multipleDatesSeparator: DATES_SEPARATOR,
      autoClose: !this.range,
      inline: true,
      locale: { ...defaultLocale, ...this.locale, firstDay },
      showOtherMonths: true,
      fixedHeight: true,
      selectOtherMonths: true,
      view: this.getDatepickerView(),
      minView: this.getDatepickerView(),
      dateFormat: this.getDateFormat(),
      position({ done }) {
        return function completeHide() {
          return setTimeout(done, ANIMATION_DURATION)
        }
      },
      navTitles: {
        days: '<p class="datepicker-header">MMMM</p>,<p class="datepicker-header header-year">yyyy</p>',
        years: '<p class="years">yyyy1 - yyyy2</p>',
      },
      nextHtml: `<${IconChevron} class="nav-icon"></${IconChevron}>`,
      prevHtml: `<${IconChevron} class="nav-icon prev-icon"></${IconChevron}>`,
      onSelect: ({ date, formattedDate }) => {
        const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))

        if (!this.range) {
          this.wppChange.emit({
            date,
            formattedDate: formattedDate || '',
            name: this.name,
          })
        }

        if (!this.range && !Array.isArray(formattedDate)) {
          this.lastValidDate = formattedDate

          if (formattedDate) {
            this.datePickerInstance.setViewDate(formatDate(formattedDate))
          }

          this.tippyInstance.hide()

          return
        }
        if (formattedDate?.length) {
          const [startDate] = formattedDate

          if (formattedDate.length === 2) {
            this.portalRef?.classList.add('wpp-range-selected')
          } else {
            this.portalRef?.classList.remove('wpp-range-selected')
          }

          if (!this.hasPresets()) {
            this.datePickerInstance.setViewDate(formatDate(startDate))
          }

          this.lastValidDate = formattedDate
        }
      },
      ...(this.range ? buttonsConfig : {}),
    }) as AirDatepicker

    this.datePickerInstance['$datepicker'].setAttribute('part', 'datepicker')
    this.isDatePickerInitialized = true
  }

  private onHideGetLastAppliedValue = () => {
    if (this.lastAppliedDate.length === 2) {
      if (Array.isArray(this.lastValidDate) && this.lastValidDate.length === 1) {
        this.datePickerInstance.clear()
      }

      const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))

      this.lastValidDate = this.lastAppliedDate
      this.value = this.lastAppliedDate.join(DATES_SEPARATOR)
      this.datePickerInstance.selectDate([formatDate(this.lastAppliedDate[0]), formatDate(this.lastAppliedDate[1])])
    } else {
      this.clearDatePicker()
    }
  }

  private createTippyInstance = () => {
    if (!this.portalRef) return

    const dropdownConfig: DropdownConfig = this.dropdownConfig
    const anchor = this.inputRef as HTMLElement

    if (!anchor) return

    this.portalRef.classList.add('portal-datepicker')

    this.tippyInstance = menuListConfig({
      anchor,
      content: this.portalRef,
      maxWidth: 'none',
      zIndex: Z_INDEX.DATE_PICKER,
      hideOnClick: false,
      trigger: 'click',
      appendTo: getHighestContainerInDOM(),
      showOnCreate: this.autoFocus,
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top-start'],
              boundary: 'viewport',
              padding: 5,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              tether: true,
              tetherOffset: 0,
              altAxis: true,
              padding: 5,
            },
          },
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      },
      ...dropdownConfig,
      onShown: (instance: Instance<Props>) => {
        this.updateDatepickerClearButton(this.lastValidDate as string)

        if (this.dropdownConfig.onShown) {
          this.dropdownConfig.onShown(instance)
        }
      },
      onHidden: (instance: Instance<Props>) => {
        if (this.range) {
          this.onHideGetLastAppliedValue()
        }

        if (this.focusType === FOCUS_TYPE.NONE && this.inputRef) {
          this.inputRef?.blur()
        }

        if (this.dropdownConfig.onHidden) {
          this.dropdownConfig.onHidden(instance)
        }
      },
      onClickOutside: (instance: Instance<Props>, event: Event) => {
        if (event.target === this.host) {
          event.preventDefault()
          event.stopPropagation()

          return
        }

        this.tippyInstance.hide()

        if (this.dropdownConfig.onClickOutside) {
          this.dropdownConfig.onClickOutside(instance, event)
        }
      },
    })
  }

  private clearDatePicker = () => {
    if (!this.lastValidDate) return

    this.lastValidDate = ''
    this.lastAppliedDate = []
    this.datePickerInstance.clear()
    this.datePickerInstance.update()
    this.wppDateClear.emit({
      clear: true,
    })
  }

  private onInput = () => {
    this.focusType = FOCUS_TYPE.NONE
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE

    this.value = (event.target as HTMLInputElement).value

    this.wppBlur.emit(event)

    if (!this.lastValidDate) {
      this.value = this.lastValidDate
    }

    if (!this.range && !isValidDate(new Date(this.value)) && !Array.isArray(this.lastValidDate)) {
      return (this.value = this.lastValidDate)
    }

    if (Array.isArray(this.lastValidDate)) {
      this.value = this.lastValidDate.join(DATES_SEPARATOR)
    }
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)

    if (this.tippyInstance && !this.tippyInstance.state.isShown) {
      this.tippyInstance.show()
    }
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
    }

    const isAddedChar = event.key !== 'Backspace'

    const dateFormat = this.getDateFormat()
    const separator = this.getDateFormatSeparator(dateFormat)
    const dateAndSeparator = dateFormat.length + DATES_SEPARATOR.length
    const toDateObject = getCurrentFormatDate(dateFormat, separator)
    const getDateInfo = (date: string) => getFormattedDateString(date, dateFormat, separator)

    const dates = this.inputRef!.value.split(DATES_SEPARATOR).map(date => date.replace(/[^a-zA-Z0-9]/g, ''))
    let datesInfo = [getDateInfo(dates[0]), getDateInfo(dates[1])]
    const isAllDatesFulfilled = datesInfo.every(info => info.isAllMatchedPartsLength)
    const isOnlyFirstDateFulfilled = datesInfo[0].isAllMatchedPartsLength && !dates[1]
    let cursorPosition = this.inputRef!.selectionStart!

    // Sort dates if both fulfilled, including cursor position
    if (isAllDatesFulfilled && toDateObject(datesInfo[0].formattedDate) > toDateObject(datesInfo[1].formattedDate)) {
      datesInfo = datesInfo.reverse()
      cursorPosition = ((cursorPosition > dateAndSeparator && cursorPosition - dateAndSeparator) ||
        (cursorPosition <= dateFormat.length && cursorPosition + dateAndSeparator)) as number
    }

    const inputValue = this.range
      ? datesInfo
          .map(info => info.formattedDate)
          .join(datesInfo[0].isAllMatchedPartsLength || dates[1] ? DATES_SEPARATOR : '')
      : datesInfo[0].formattedDate

    cursorPosition = getNextCursorPosition(inputValue, cursorPosition, isAddedChar, separator)

    const inputDates = datesInfo
      .filter(info => info.isAllMatchedPartsLength)
      .map(info => toDateObject(info.formattedDate))

    if (!isEqual(inputDates, this.datePickerInstance.selectedDates)) {
      // @ts-ignore Due to outdated air-datepicker.d.ts
      this.datePickerInstance.clear({ silent: true })
      // @ts-ignore Due to outdated air-datepicker.d.ts
      this.datePickerInstance.selectDate(inputDates).then(() => {
        if (!(isOnlyFirstDateFulfilled || isAllDatesFulfilled)) {
          this.updateInput(inputValue, cursorPosition)
        }
        if (this.range && isOnlyFirstDateFulfilled) {
          this.updateInput(
            this.inputRef!.value + DATES_SEPARATOR,
            cursorPosition === dateFormat.length ? cursorPosition + DATES_SEPARATOR.length : cursorPosition,
          )
        }
      })
    }
    this.updateInput(inputValue, cursorPosition)
  }

  private updateInput = (value: string, cursorPosition: number) => {
    if (this.inputRef) {
      this.inputRef.value = value
      this.value = value
      this.inputRef.setSelectionRange(cursorPosition, cursorPosition)
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      '/',
      '|',
      ...Array.from({ length: 10 }, (_, i) => i.toString()),
    ]

    if (!allowedKeys.includes(event.key) && !event.metaKey && !event.ctrlKey) {
      event.preventDefault()
    }
  }

  private handleBlurPortal = (event: FocusEvent) => {
    if (event.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget as Node)) return

    this.hideTimer = setTimeout(() => this.tippyInstance.hide())
  }

  private handlePreviewPreset = (dateRange: string[]) => {
    if (this.previewPresetTimer) {
      clearTimeout(this.previewPresetTimer)
    }

    const formatDate = getCurrentFormatDate(this.getDateFormat(), this.getDateFormatSeparator(this.getDateFormat()))

    const [currentSelectedStartDate, currentSelectedEndDate]: Date[] | undefined[] =
      this.datePickerInstance.selectedDates

    const formattedStartDate: Date = formatDate(dateRange[0])
    const formattedEndDate: Date = formatDate(dateRange[1])

    if (
      isValidDate([formattedStartDate, formattedEndDate]) &&
      (!isEqual(currentSelectedStartDate, formattedStartDate) || !isEqual(currentSelectedEndDate, formattedEndDate))
    ) {
      this.datePickerInstance.selectDate([formattedStartDate, formattedEndDate])
      this.datePickerInstance.setViewDate(formattedStartDate)
      this.datePickerInstance.update()
    }
  }

  private handleClickCalendarIcon = () => {
    if (this.inputRef && this.tippyInstance) {
      this.inputRef.focus()
      this.tippyInstance.show()
    }
  }

  private handleClickPreset = (preset: IPreset) => {
    this.hasClickedPreset = true
    this.value = preset.value
    this.lastValidDate = preset.value
    this.lastAppliedDate = preset.value as string[]

    this.wppChange.emit({
      date: this.datePickerInstance.selectedDates,
      formattedDate: this.datePickerInstance.selectedDates.map(selectedDate =>
        this.datePickerInstance.formatDate(selectedDate, this.getDateFormat()),
      ),
      name: this.name,
    })

    this.tippyInstance?.hide()
  }

  private handleMouseLeavePreset = () => {
    if (this.hasClickedPreset) {
      this.hasClickedPreset = false

      return
    }

    this.previewPresetTimer = setTimeout(() => {
      if (this.lastAppliedDate.length > 0) {
        this.handlePreviewPreset(this.lastAppliedDate)
      } else {
        this.datePickerInstance.clear()
        this.datePickerInstance.setViewDate(new Date())
        this.lastValidDate = ''
      }
    }, 100)
  }

  private handleClickIconCross = () => {
    this.clearDatePicker()
  }

  private hostCssClasses = () => ({
    'wpp-datepicker': true,
    'wpp-disabled': this.disabled,
    [`wpp-size-${this.size}`]: true,
  })

  private inputCssClasses = () => ({
    'datepicker-input': true,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: true,
    [this.focusType]: !!this.focusType,
  })

  private iconCrossCssClasses = () => ({
    'cross-icon': true,
    disabled: this.disabled,
    [`size-${this.size}`]: true,
  })

  private iconCalendarCssClasses = () => ({
    'calendar-icon': true,
    [`size-${this.size}`]: true,
  })

  private containerClasses = () => ({
    'single-datepicker': !this.range,
    'range-datepicker': this.range,
    'has-default-format': this.isDefaultDateFormat(),
    'static-datepicker': this.static,
    'with-presets': this.hasPresets(),
  })

  private portalClasses = () => ({
    'wpp-datepicker-portal': true,
    'wpp-static-portal': this.static,
    'wpp-with-presets': this.hasPresets(),
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="label, datepicker-container, icon-calendar, datepicker-input, icon-cross, message"
      >
        {this.labelConfig?.text && (
          <wpp-label
            class="label"
            htmlFor={this.name}
            optional={!this.required}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}

        <div class={this.containerClasses()} id="container" part="datepicker-container">
          <wpp-icon-calendar
            onClick={this.handleClickCalendarIcon}
            class={this.iconCalendarCssClasses()}
            part="icon-calendar"
          />
          <input
            id="datepicker"
            type="text"
            class={this.inputCssClasses()}
            onInput={this.onInput}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onMouseDown={this.onMouseDown}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
            disabled={this.disabled}
            readOnly={!this.range && !this.isDefaultDateFormat()}
            placeholder={
              this.placeholder ||
              (this.range
                ? `${this.locale.dateFormat}${DATES_SEPARATOR}${this.locale.dateFormat}`
                : `${this.locale.dateFormat}`)
            }
            ref={inputRef => (this.inputRef = inputRef)}
            autocomplete="off"
            part="datepicker-input"
            title=""
          />
          <div
            onBlur={this.handleBlurPortal}
            onFocus={() => clearTimeout(this.hideTimer)}
            {...(this.hasPresets() ? { tabIndex: 0 } : {})}
            ref={ref => (this.portalRef = ref)}
            class={this.portalClasses()}
          >
            {this.hasPresets() && (
              <div class="wpp-presets-container">
                <div class="wpp-presets-list">
                  {this.presets.map((preset: IPreset) => (
                    <wpp-list-item
                      onMouseEnter={() => this.handlePreviewPreset(preset.value)}
                      onMouseLeave={this.handleMouseLeavePreset}
                      onWppChangeListItem={() => this.handleClickPreset(preset)}
                      class="wpp-presets-item"
                    >
                      <wpp-typography type="s-body" slot="label">
                        {preset.label}
                      </wpp-typography>
                    </wpp-list-item>
                  ))}
                </div>
                <div class="wpp-presets-footer"></div>
              </div>
            )}
          </div>
          {!!this.lastValidDate && (
            <wpp-icon-cross
              class={this.iconCrossCssClasses()}
              aria-label="Erase date"
              onClick={this.handleClickIconCross}
              part="icon-cross"
            />
          )}
          {this.message && (
            <wpp-inline-message
              class="inline-message"
              message={this.message}
              type={this.messageType}
              showTooltipFrom={this.maxMessageLength}
              tooltipConfig={this.tooltipConfig}
              part="message"
            />
          )}
        </div>
      </Host>
    )
  }
}
