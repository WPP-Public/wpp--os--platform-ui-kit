import { Component, Host, h, Element, Prop, State, Event, EventEmitter, Watch } from '@stencil/core'
import { menuListConfig } from '../../common/menuListConfig'
import { DropdownConfig, LabelConfig } from '../../components'
import { Z_INDEX } from '../../common/consts'
import { Instance, Props } from 'tippy.js'
import { getHighestContainerInDOM } from '../../utils/utils'
import { FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import {
  DEFAULT_CHECKED_TIME_VALUES,
  DEFAULT_WIDTH_VALUE,
  HOURS,
  PLACEHOLDER,
  TOP_PADDING,
  isValidHour,
  isValidMinutes,
} from './config'
import { TimePickerChangeEventDetails } from './types'

@Component({
  tag: 'wpp-time-picker',
  styleUrl: 'wpp-time-picker.scss',
  shadow: true,
})
export class WppTimePicker {
  private tippyInstance: Instance
  private hasSelectedMinutes: boolean = false
  private previousInputValue: string

  private hasChangedHours: boolean = false
  private hasChangedMinutes: boolean = false
  private hasClearedValue: boolean = false

  private anchorRef?: HTMLDivElement
  private portalRef?: HTMLDivElement
  private inputRef?: HTMLInputElement
  private hoursSectionRef?: HTMLDivElement
  private minutesSectionRef?: HTMLDivElement

  @Element() host: HTMLWppTimePickerElement

  @State() focusType: FOCUS_TYPE = FOCUS_TYPE.NONE

  @State() showDisplayCross: boolean = true

  // Calculated in componentWillLoad and when this.minutesInterval prop changes.
  @State() generatedMinutes: string[] = []

  // Contains the index value of the checked wpp-list-items from the dropdown for both hours and minutes.
  @State() checkedTimeValues: { hoursIndex: number; minutesIndex: number } = DEFAULT_CHECKED_TIME_VALUES

  /**
   * Defines the time picker size, which differs in terms of paddings.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  /**
   * If `true`, the time picker is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * Defines the placeholder of the time picker. Placeholder is displayed when there is no value in the time picker.
   */
  @Prop() readonly placeholder: string = PLACEHOLDER

  /**
   * The width of time picker. Values can be in "px" or in "%".
   * Default value is "198px".
   */
  @Prop() readonly width: string = DEFAULT_WIDTH_VALUE

  /**
   * Value of time picker. Should always have a valid time format.
   */
  @Prop({ mutable: true }) value: string = ''

  /**
   * Defines the interval of minutes. Can take of one of the following values: 1, 5, 10, 15
   */
  @Prop({ reflect: true }) readonly minutesInterval: 1 | 5 | 10 | 15 = 5

  /**
   * Indicates label config.
   */
  @Prop({ mutable: true }) labelConfig?: LabelConfig

  /**
   * Indicates time picker name.
   */
  @Prop() readonly name?: string

  /**
   * If `true`, the datepicker input is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Dropdown config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Indicates time picker message type. This property should be used together with "messagae" property for "error" and "warning" states.
   *
   */
  @Prop({ mutable: true }) messageType?: InputMessageTypes

  /**
   * Indicates time picker message.
   */
  @Prop({ mutable: true }) message?: string

  /**
   * Indicates time picker message maximum length
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the tooltip configuration for the message below the input. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Emitted when the input receives focus
   */
  @Event({ bubbles: true, composed: true }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the input loses focus
   */
  @Event({ bubbles: true, composed: true }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the dropdown of the time picker closes. Contains details about the current value of the datepicker.
   */
  @Event({ bubbles: true, composed: true }) readonly wppChange: EventEmitter<TimePickerChangeEventDetails>

  /**
   * Emitted when the "cross" icon is clicked and the value of the time picker is cleared.
   */
  @Event({ bubbles: true, composed: true }) readonly wppClear: EventEmitter<TimePickerChangeEventDetails>

  @Watch('minutesInterval')
  onUpdateMinutesInterval() {
    this.generateMinutes()

    if (this.value !== '' && this.value !== PLACEHOLDER) {
      this.isValidTimeValue(this.value)
    }
  }

  @Watch('value')
  onUpdateValue() {
    if (!this.value || this.value === PLACEHOLDER) {
      this.showDisplayCross = false

      return
    }

    this.isValidTimeValue(this.value)

    this.showDisplayCross = true
    this.highlightItem()
  }

  componentWillLoad() {
    this.generateMinutes()

    if (this.value) {
      this.isValidTimeValue(this.value)
    }

    this.showDisplayCross = !!this.value
  }

  componentDidLoad() {
    this.createTippyInstance()
  }

  private highlightItem = () => {
    const [hoursValue, minutesValue] = this.value.split(':')

    const hoursIndex: number = HOURS.findIndex((hourItem: string) => hourItem === hoursValue)
    const minutesIndex: number = this.generatedMinutes.findIndex((minutesItem: string) => minutesItem === minutesValue)

    this.checkedTimeValues = {
      hoursIndex,
      minutesIndex,
    }
  }

  private scrollIntoView = () => {
    const [hoursValue, minutesValue] = this.value.split(':')

    const hoursEl: HTMLWppListItemElement | null | undefined = this.portalRef?.querySelector(`#hour-${hoursValue}`)
    const minutesEl: HTMLWppListItemElement | null | undefined = this.portalRef?.querySelector(
      `#minutes-${minutesValue}`,
    )

    if (hoursEl && this.hoursSectionRef) {
      this.hoursSectionRef.scrollTop = hoursEl.offsetTop - TOP_PADDING
    }

    if (minutesEl && this.minutesSectionRef) {
      this.minutesSectionRef.scrollTop = minutesEl.offsetTop - TOP_PADDING
    }
  }

  private isValidTimeValue = (timeValue: string) => {
    const [hours, minutes] = timeValue.split(':')

    if (hours === 'hh' || minutes === 'mm') return

    if (isValidHour(hours) && isValidMinutes(minutes)) {
      this.value = `${hours}:${this.roundToNearestInterval(minutes)}`

      return true
    }

    return false
  }

  private setErrorMessage = (message: string | undefined) => {
    this.message = message
    this.messageType = message ? 'error' : undefined
  }

  private createTippyInstance = () => {
    if (!this.anchorRef) return

    this.tippyInstance = menuListConfig({
      anchor: this.anchorRef,
      content: this.portalRef,
      maxWidth: 'none',
      hideOnClick: false,
      zIndex: Z_INDEX.TIME_PICKER,
      trigger: 'click',
      placement: 'bottom-start',
      offset: [0, 4],
      // Automatically attach dropdown to highest container in DOM such that there will
      // be no clipping issues.
      appendTo: () => getHighestContainerInDOM(),
      popperOptions: {
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top-start'],
            },
          },
        ],
      },
      ...this.dropdownConfig,
      onHide: (instance: Instance<Props>) => {
        if (this.value === PLACEHOLDER) {
          // If true, then no changes were made in the time picker.
          // Reverting value back to empty string to display placeholder.
          this.value = ''
        }

        if (this.inputRef) {
          if (this.inputRef.value !== this.value) {
            this.updateValueOnHide(this.inputRef.value)
          }

          this.inputRef.value = this.value
          this.inputRef.blur()
        }

        // When dropdown hides, emit values of time picker.
        const [hours, minutes] = this.value.split(':')

        this.hasSelectedMinutes = false
        this.hasChangedHours = false
        this.hasChangedMinutes = false

        this.wppChange.emit({
          timeFormat: this.value,
          hours: hours || '',
          minutes: minutes || '',
          ...(this.name ? { name: this.name } : {}),
        })

        if (this.dropdownConfig.onHide) {
          return this.dropdownConfig.onHide(instance)
        }
      },
      onShow: (instance: Instance<Props>) => {
        if (!this.host || this.disabled) return false

        if (this.host.clientWidth < 150) {
          instance.popper.style.width = '150px'
        } else {
          instance.popper.style.width = `${this.host.clientWidth}px`
        }

        // When dropdown opens, highlight text for hours
        this.selectTextInInput('hours')

        this.highlightItem()

        if (this.value !== '' && this.value !== PLACEHOLDER) {
          setTimeout(() => {
            this.scrollIntoView()
          }, 0)
        }

        if (this.dropdownConfig.onShow) {
          return this.dropdownConfig.onShow(instance)
        }
      },
      onClickOutside: (instance: Instance<Props>, event: Event) => {
        if (event.target === this.host) {
          // When clicking elements from time picker component, stop the propagation
          // of the event. The dropdown does not need to hide.
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

  private updateValueOnHide = (inputValue: string) => {
    if (this.value === '') return

    const [inputHours, inputMinutes] = inputValue.split(':')
    const [valueHours, valueMinutes] = this.value.split(':')

    if (inputHours.length === 1) {
      this.value = `0${inputHours}:${valueMinutes}`
    }

    if (inputMinutes.length === 1) {
      this.value = `${valueHours}:${this.roundToNearestInterval(inputMinutes)}`
    }
  }

  // Clears value of time picker
  private handleClickCrossIcon = (event: MouseEvent) => {
    event.stopPropagation()

    if (this.tippyInstance.state.isShown) {
      this.value = PLACEHOLDER
      this.hasClearedValue = true

      this.selectTextInInput('hours')
    } else {
      this.value = ''
    }

    this.setErrorMessage(undefined)
    this.previousInputValue = this.value
    this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES

    this.wppClear.emit({ timeFormat: '', hours: '', minutes: '', ...(this.name ? { name: this.name } : {}) })
  }

  private handleClickListItem = (value: string, type: 'hour' | 'minutes') => {
    if (!this.inputRef) return

    const [hours, minutes] = this.value.split(':')

    this.hasClearedValue = false

    if (type === 'hour') {
      this.value = `${value}:${minutes || 'mm'}`

      if (this.hasSelectedMinutes) {
        this.tippyInstance?.hide()
      } else {
        // After selecting hours, highlight text for minutes
        this.selectTextInInput('minutes')
      }
    } else {
      this.value = `${hours || 'hh'}:${value}`
      this.hasSelectedMinutes = true

      const inputHours = this.inputRef.value.split(':')[0]

      if (inputHours && inputHours.length === 1) {
        this.value = `0${inputHours}:${value}`

        this.tippyInstance?.hide()

        return
      }

      if (this.inputRef?.value.split(':'))
        if (!isValidHour(hours)) {
          this.selectTextInInput('hours')
        } else {
          this.tippyInstance?.hide()
        }
    }
  }

  private selectTextInInput = (text: 'hours' | 'minutes'): void => {
    // The input element needs to be focused before selection.
    this.inputRef?.focus()

    setTimeout(() => {
      this.inputRef?.setSelectionRange(text === 'hours' ? 0 : 3, text === 'hours' ? 2 : 5)
    }, 0)
  }

  private generateMinutes = () => {
    this.generatedMinutes.length = 0

    for (let i = 0; i * this.minutesInterval < 60; i += 1) {
      // This also adds "0" to the first 9 digits.
      this.generatedMinutes.push(String(i * this.minutesInterval).padStart(2, '0'))
    }
  }

  private onUpdateInput = (event: InputEvent) => {
    if (!this.inputRef) return

    this.setErrorMessage(undefined)

    const inputValue = (event.target as HTMLInputElement).value

    if (inputValue === '' || inputValue === ':') {
      this.value = ''
      this.inputRef.value = ''
      this.clearCheckedValue()
      this.previousInputValue = ''
      this.hasClearedValue = true

      return
    }

    if (inputValue.length === 1 && this.previousInputValue.length >= 3) {
      this.hasClearedValue = true

      return
    }

    if (this.hasClearedValue) {
      if (inputValue.length === 2) {
        const newHourValue = inputValue.includes(':') ? `0${inputValue.split(':')[0]}` : inputValue

        this.handleHourChange(inputValue, newHourValue, '')
      }
    } else {
      const shiftFocusToMinutes: boolean = inputValue.split(':').length - 1 >= 2

      if (shiftFocusToMinutes) {
        const [hours, minutes] = this.previousInputValue.split(':')

        this.handleHourChange(this.previousInputValue, hours.length === 1 ? `0${hours}` : hours, minutes)
      } else {
        const [inputHours, inputMinutes] = inputValue.split(':')
        const [valueHours, valueMinutes] = this.value.split(':')

        if (inputHours !== valueHours || this.hasChangedHours) {
          if (inputHours.length < 2) {
            this.hasChangedHours = true
            this.clearCheckedValue('hours')
          } else {
            this.handleHourChange(inputValue, inputHours, valueMinutes)
          }
        }

        if (inputMinutes !== valueMinutes || this.hasChangedMinutes) {
          if (!inputMinutes || inputMinutes.length < 2) {
            this.hasChangedMinutes = true
            this.clearCheckedValue('minutes')
          } else {
            this.handleMinuteChange(valueHours, inputMinutes)
          }
        }
      }
    }

    this.previousInputValue = inputValue
  }

  private handleHourChange = (inputValue: string, newHourValue: string, valueMinutes: string) => {
    if (!this.inputRef) return

    this.value = `${isValidHour(newHourValue) ? newHourValue : '23'}:${
      inputValue.length === 2 ? 'mm' : valueMinutes || 'mm'
    }`
    this.inputRef.value = this.value
    this.hasChangedHours = false

    this.highlightItem()
    this.scrollIntoView()

    if (this.hasSelectedMinutes) {
      this.tippyInstance?.hide()
    } else {
      this.selectTextInInput('minutes')
    }

    this.hasClearedValue = false
  }

  private handleMinuteChange = (valueHours: string, inputMinutes: string) => {
    if (!this.inputRef) return

    this.value = `${valueHours || 'hh'}:${
      isValidMinutes(inputMinutes)
        ? this.roundToNearestInterval(inputMinutes)
        : this.generatedMinutes[this.generatedMinutes.length - 1]
    }`
    this.inputRef.value = this.value
    this.hasSelectedMinutes = true
    this.hasChangedMinutes = false

    this.highlightItem()
    this.scrollIntoView()

    if (isValidHour(valueHours)) {
      this.tippyInstance?.hide()
    } else {
      this.selectTextInInput('hours')
    }
  }

  private onPaste = (event: ClipboardEvent) => {
    event.preventDefault()

    const pastedText: string | undefined = event.clipboardData?.getData('text')

    if (!pastedText) return

    const hasSemiColon: boolean = pastedText.includes(':')

    if ((pastedText.length === 4 && !hasSemiColon) || (pastedText.length === 5 && hasSemiColon)) {
      const formattedPastedText =
        pastedText.length === 4 ? `${pastedText.slice(0, 2)}:${pastedText.slice(2)}` : pastedText

      if (!this.isValidTimeValue(formattedPastedText)) {
        this.clearCheckedValue()
        this.tippyInstance?.hide()
        this.inputRef?.blur()

        this.value = pastedText
      } else {
        this.value = formattedPastedText
      }
    } else {
      this.setErrorMessage(`The value provided: ${pastedText}, is not a valid time value!`)
    }
  }

  private clearCheckedValue = (type?: 'hours' | 'minutes') => {
    if (type !== 'hours') {
      this.hasSelectedMinutes = false
    }

    if (!type) {
      this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES

      return
    }

    if (type === 'hours') {
      this.checkedTimeValues = {
        ...this.checkedTimeValues,
        hoursIndex: -1,
      }
    } else {
      this.checkedTimeValues = {
        ...this.checkedTimeValues,
        minutesIndex: -1,
      }
    }
  }

  private roundToNearestInterval = (minutes: string): string => {
    // Rounds to minutesInterval property. Also
    const num = parseInt(minutes, 10)

    let rounded = Math.round(num / this.minutesInterval) * this.minutesInterval

    if (rounded > 59) rounded = 60 - this.minutesInterval

    return rounded.toString().padStart(2, '0')
  }

  private onKeyPress = (event: KeyboardEvent) => {
    // This blocks non-digit characters and onInput will not be called.
    if (!/[0-9:]/.test(event.key)) {
      event.preventDefault()
    }
  }

  private onFocus = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.MOUSE

    if (this.value === '') {
      this.value = PLACEHOLDER
      this.previousInputValue = PLACEHOLDER
    }

    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE

    this.wppBlur.emit(event)
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
    }
  }

  private getAnchorCssClasses = () => ({
    [this.focusType]: true,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: true,
    disabled: this.disabled,
    'no-value': this.value === '' || this.value === undefined,
  })

  render() {
    return (
      <Host
        class="wpp-time-picker"
        aria-disabled={this.disabled}
        style={{ width: !this.width ? DEFAULT_WIDTH_VALUE : this.width }}
      >
        {this.labelConfig?.text && (
          <wpp-label
            typography="s-strong"
            class="label"
            htmlFor={this.name}
            optional={!this.required}
            config={this.labelConfig}
            disabled={this.disabled}
            tooltipConfig={this.labelTooltipConfig}
          />
        )}
        <div ref={el => (this.anchorRef = el)} id="anchor" class={this.getAnchorCssClasses()}>
          <div class="anchor-time">
            <wpp-icon-clock class="clock-icon"></wpp-icon-clock>
            <input
              ref={el => (this.inputRef = el)}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onKeyUp={this.onKeyUp}
              onKeyPress={this.onKeyPress}
              onPaste={this.onPaste}
              disabled={this.disabled}
              onInput={this.onUpdateInput}
              id="time-picker"
              type="text"
              placeholder={this.placeholder}
              value={this.value}
            />
          </div>

          <div class="cross-icon-container">
            {this.showDisplayCross && (
              <wpp-icon-cross class="cross-icon" aria-label="Erase time" onClick={this.handleClickCrossIcon} />
            )}
          </div>
        </div>
        <div ref={el => (this.portalRef = el)} class="wpp-time-picker-portal">
          <div ref={refEl => (this.hoursSectionRef = refEl)} class="hours section">
            {HOURS.map((hour: string, hourIndex: number) => (
              <wpp-list-item
                id={`hour-${hour}`}
                key={hour}
                checked={this.checkedTimeValues.hoursIndex === hourIndex}
                onWppChangeListItem={() => this.handleClickListItem(hour, 'hour')}
              >
                <span slot="label">{hour}</span>
              </wpp-list-item>
            ))}
          </div>
          <wpp-divider vertical />
          <div ref={refEl => (this.minutesSectionRef = refEl)} class="minutes section">
            {this.generatedMinutes.map((minutes: string, minutesIndex: number) => (
              <wpp-list-item
                id={`minutes-${minutes}`}
                key={minutes}
                checked={this.checkedTimeValues.minutesIndex === minutesIndex}
                onWppChangeListItem={() => this.handleClickListItem(minutes, 'minutes')}
              >
                <span slot="label">{minutes}</span>
              </wpp-list-item>
            ))}
          </div>
        </div>
        {this.message && (
          <wpp-inline-message
            class={!this.messageType ? 'helper-text' : ''}
            message={this.message}
            type={this.messageType}
            showTooltipFrom={this.maxMessageLength}
            tooltipConfig={this.tooltipConfig}
          />
        )}
      </Host>
    )
  }
}
