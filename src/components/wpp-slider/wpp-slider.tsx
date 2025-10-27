import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core'

import { AriaProps, DropdownConfig, FOCUS_TYPE } from '../../types/common'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { BaseComponent } from '../../interfaces/base-component'

import {
  DisplayMarkState,
  HandleType,
  MarkState,
  SliderInputValue,
  SliderChangeEventDetail,
  SliderLabelConfig,
  SliderRangeType,
  SliderTypes,
  SliderValue,
  InputWidth,
} from './types'
import {
  DEFAULT_INPUT_WIDTH,
  formatDecimalWithMask,
  getDefaultMaskOptions,
  getMaskOptionsForInput,
  parseMaskedInput,
} from './const'
import { transformToVersionedTag } from '../../utils/utils'
import { MaskitoNumberParams } from '@maskito/kit/src/lib/masks/number/number-params'

interface FocusType {
  min: FOCUS_TYPE
  max: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  min: FOCUS_TYPE.NONE,
  max: FOCUS_TYPE.NONE,
})

/**
 * @part label - Label text element
 * @part control-wrapper - controls wrapper element
 * @part editable-input-wrapper - controls editable input wrapper element
 * @part input-number - input number element
 * @part input-wrapper - input wrapper element
 * @part input-min - input-min element
 * @part input-max - input-max element
 * @part divider - divider element
 * @part value - slider value text element
 * @part value-wrapper - value-wrapper element
 * @part value-divider - value-divider element
 * @part mark - mark element
 * @part mark-circle - mark bg circle element
 * @part mark-inner - mark inner element
 * @part slider - slider element
 * @part input-slider-min - input-slider-min element
 * @part input-slider-max - input-slider-max element
 * @part marks-list - marks list element
 */
@Component({
  tag: 'wpp-slider',
  styleUrl: 'wpp-slider.scss',
  shadow: true,
})
export class WppSlider implements BaseComponent, BaseFormControl<SliderValue> {
  private inputRef?: HTMLInputElement | HTMLWppInputElement
  private inputMaxRef?: HTMLWppInputElement
  private clickableAreaRef?: HTMLDivElement
  private marksListRef?: HTMLDivElement
  private segmentWidth: number = 0
  private totalWidth: number = 0

  /* For slider with type="middle-range" */
  private middleValue: number = 0

  @Element() host: HTMLWppSliderElement

  @State() tooltipTexts: Record<number, string> = {}

  @State() displayMarks: DisplayMarkState[] = []

  @State() inputValue: SliderInputValue

  @State() focusType: FocusType = getInitFocusInfo()

  // @State() internalMidRangeValue: [number, number] = [0, 0]

  /**
   * Defines the slider name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the width of the inputs in "px". Same width will apply to both inputs in the range slider.
   * The default value is "68px".
   */
  @Prop() readonly inputWidth: InputWidth = DEFAULT_INPUT_WIDTH

  /**
   * Defines the default slider value.
   */
  @Prop({ reflect: true, mutable: true }) value!: SliderValue

  /**
   * Defines the marker values between which users can move the slider.
   */
  @Prop() readonly marks: MarkState[] | boolean = false

  /**
   * Defines the slider type.
   */
  @Prop() readonly type?: SliderTypes = 'single'

  /**
   * Defines the minimum allowed slider value.
   */
  @Prop({ mutable: true }) min: number = 1

  /**
   * Defines the the maximum allowed slider value.
   */
  @Prop({ mutable: true }) max: number = 100

  /**
   * Defines the interval between slider markers.
   */
  @Prop() readonly step: number = 1

  /**
   * If the slider is continuous.
   */
  @Prop() readonly continuous: boolean = false

  /**
   * If the slider is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If the slider is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the slider has an input field that allows users to enter a value for the slider to display.
   */
  @Prop() readonly withInput: boolean = false

  /**
   * If the slider displays its current value.
   */
  @Prop() readonly withValue: boolean = false

  /**
   * Contains the slider `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: SliderLabelConfig

  /**
   * Defines the size of the slider.
   */
  @Prop() readonly size?: 's' | 'm' = 'm'

  /**
   * Defines the mask options for the inputs.
   */
  @Prop() readonly maskOptions?: MaskitoNumberParams | MaskitoNumberParams[] = undefined

  /**
   * Emitted when the slider value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<SliderChangeEventDetail>

  /**
   * Emitted when the slider is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the slider loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Watch('value')
  onUpdateValue() {
    this.inputValue = this.getSliderInputValue()
  }

  @Watch('min')
  onUpdateMinValue(newValue: number) {
    this.onUpdateMinMaxValues('min', newValue)
  }

  @Watch('max')
  onUpdateMaxValue(newValue: number) {
    this.onUpdateMinMaxValues('max', newValue)
  }

  @Watch('step')
  onUpdateStepValue(newStepValue: number) {
    this.handleType({
      single: () => {
        this.value = this.min
      },
      range: () => {
        this.value = [this.min, this.min + newStepValue]
      },
      'middle-range': () => {
        this.value = this.min
        this.middleValue = this.getMidValueRespectingStep()
      },
    })

    this.computeSegmentWidth()

    this.getDisplayMarks()
  }

  @Watch('inputValue')
  onUpdateInputValue(newInputValue: SliderInputValue) {
    if (this.type === 'single' || this.type === 'middle-range') {
      const inputMaskOptions: MaskitoNumberParams = getMaskOptionsForInput(this.type, undefined, this.maskOptions)

      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(Number(newInputValue), inputMaskOptions)
      }
    } else {
      const [minValue, maxValue] = (newInputValue as string[]).map(Number)

      const minInputMaskOptions: MaskitoNumberParams = getMaskOptionsForInput(this.type, 'min', this.maskOptions)

      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(minValue, minInputMaskOptions)
      }

      const maxInputMaskOptions: MaskitoNumberParams = getMaskOptionsForInput(this.type, 'max', this.maskOptions)

      if (this.inputMaxRef) {
        this.inputMaxRef.value = formatDecimalWithMask(maxValue, maxInputMaskOptions)
      }
    }
  }

  /**
   * Sets focus on native input
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.focus()
  }

  componentWillLoad() {
    this.getDisplayMarks()

    if (this.type === 'middle-range') {
      this.middleValue = this.getMidValueRespectingStep()
    }
  }

  componentDidLoad() {
    this.handleType({
      single: value => {
        this.inputValue = String(value)
      },
      range: value => {
        this.inputValue = value.map(String)
      },
      'middle-range': value => {
        this.inputValue = String(value)
      },
    })

    this.computeSegmentWidth()
    this.getDisplayMarks()
    this.applyTruncationToMarks()

    window.addEventListener('load', () => {
      this.computeSegmentWidth()
      this.getDisplayMarks()
      this.applyTruncationToMarks()
    })

    window.addEventListener('resize', this.applyTruncationToMarks)
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.applyTruncationToMarks)
    window.removeEventListener('load', () => {
      this.computeSegmentWidth()
      this.getDisplayMarks()
      this.applyTruncationToMarks()
    })
  }

  private getMidValueRespectingStep = (): number => {
    const range = this.max - this.min
    const half = range / 2
    // Round to the nearest valid step increment
    const stepsFromMin = Math.round(half / this.step)
    const middle = this.min + stepsFromMin * this.step

    return Math.min(this.max, Math.max(this.min, Number(middle.toFixed(2))))
  }

  private computeSegmentWidth = () => {
    if (!this.clickableAreaRef) return

    this.totalWidth = this.clickableAreaRef.clientWidth

    const numberOfSegments = Math.ceil((this.max - this.min) / this.step)

    this.segmentWidth = this.totalWidth / numberOfSegments
  }

  private onUpdateMinMaxValues = (valueType: SliderRangeType, newValue: number) => {
    this.handleType({
      single: () => {
        this.value = newValue
      },
      range: value => {
        if (valueType === 'min') {
          this.value = [Math.max(newValue, value[0]), value[1]]
        }

        if (valueType === 'max') {
          this.value = [value[0], Math.min(newValue, value[1])]
        }
      },
      'middle-range': () => {
        this.value = newValue
        this.middleValue = this.getMidValueRespectingStep()
      },
    })

    this.computeSegmentWidth()

    this.getDisplayMarks()
  }

  private handleType = <T,>(handlers: HandleType<T>) => {
    if (this.type === 'middle-range') {
      return handlers['middle-range'](this.value as number)
    }

    if (this.type === 'range' && Array.isArray(this.value)) {
      return handlers.range(this.value)
    }

    return handlers.single(this.value as number)
  }

  private getSliderInputValue = (): SliderInputValue =>
    Array.isArray(this.value) ? this.value.map(String) : String(this.value)

  private getDisplayMarks = () => {
    let marks: DisplayMarkState[]

    if (Array.isArray(this.marks)) {
      marks = this.continuous
        ? [this.marks[0], this.marks[this.marks.length - 1]]
        : (this.marks as MarkState[])
            .sort((a, b) => a.value - b.value)
            .filter(mark => mark.value <= this.max && mark.value >= this.min)
    } else {
      marks = this.continuous
        ? [
            { value: this.min, label: this.min },
            { value: this.max, label: this.max },
          ]
        : [...Array(Math.floor((this.max - this.min) / this.step) + 1)].map((_, i) => ({
            value: this.min + i * this.step,
            label: this.min + i * this.step,
          }))
    }

    marks = marks.map(mark => ({
      ...mark,
      position: this.calculateProgressBar(mark.value),
    }))

    this.displayMarks = marks
    this.applyTruncationToMarks()
  }

  /**
   * @method applyTruncationToMarks
   * Measures internal label elements to determine if text is truncated.
   * Sets tooltipTexts accordingly to enable tooltips for truncated labels.
   */
  private applyTruncationToMarks = () => {
    requestAnimationFrame(() => {
      this.computeSegmentWidth()

      const newTooltipTexts: Record<number, string> = {}
      const totalMarks = this.displayMarks.length

      const marks = this.marksListRef?.querySelectorAll(`${transformToVersionedTag('wpp-typography')}[part="label"]`)

      if (!marks) return

      this.displayMarks.forEach((mark, index) => {
        const labelElement = Array.from(marks).find(item => item.id.includes(`${mark.value}`))

        if (labelElement && typeof mark.label === 'string') {
          const typographySpan = labelElement.shadowRoot?.querySelector('[part="typography"]') as HTMLElement

          if (typographySpan) {
            const flexUnits = index === 0 || index === totalMarks - 1 ? 0.45 : 0.95
            const maxWidth = flexUnits * this.segmentWidth
            const labelContainer = labelElement.parentElement as HTMLElement

            if (labelContainer) {
              if (labelContainer.style?.setProperty) {
                labelContainer.style?.setProperty('--label-max-width', `${maxWidth}px`)
              }
            }

            const isOverflowing = typographySpan.scrollWidth > maxWidth

            if (isOverflowing) {
              newTooltipTexts[mark.value] = mark.label
            }
          }
        }
      })

      this.tooltipTexts = newTooltipTexts
    })
  }

  private updateSingleSliderValue = (nearestLowerValue: number) => {
    // This function is called only for single and middle-range sliders,
    // when the input value changes (after onBlur).
    const newValue = Math.max(Math.min(nearestLowerValue, this.max), this.min)

    if (this.value === newValue) {
      this.onUpdateInputValue(this.inputValue)
    } else {
      this.value = newValue
    }
  }

  // Function used to get the nearest lower value based on step
  private getNearestLowerValue = (value: number) => Math.floor((value - this.min) / this.step) * this.step + this.min

  private handleInputChange = (type?: SliderRangeType) => (event: Event) => {
    // We validate the value of the input only onBlur
    const target = event.target as HTMLInputElement

    const inputMaskOptions: MaskitoNumberParams = getMaskOptionsForInput(this.type, type, this.maskOptions)

    const inputValue = parseMaskedInput(target.value, inputMaskOptions)

    if (
      target.value === '' ||
      target.value === inputMaskOptions?.postfix ||
      target.value === inputMaskOptions?.prefix
    ) {
      this.handleType({
        single: value => {
          this.onUpdateInputValue(String(value))
        },
        range: value => {
          this.value = value
        },
        'middle-range': value => {
          this.onUpdateInputValue(String(value))
        },
      })

      return
    }

    const nearestLowerValue = this.getNearestLowerValue(inputValue)

    this.handleType({
      single: () => this.updateSingleSliderValue(nearestLowerValue),
      range: value => {
        if (type === 'min') {
          const newValue = Math.min(Math.max(nearestLowerValue, this.min), value[1] - this.step)

          this.value = [newValue, value[1]]
        }

        if (type === 'max') {
          const newValue = Math.max(Math.min(nearestLowerValue, this.max), value[0] + this.step)

          this.value = [value[0], newValue]
        }
      },
      'middle-range': () => this.updateSingleSliderValue(nearestLowerValue),
    })

    this.wppChange.emit({
      value: this.value,
      name: this.name,
      ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
    })
  }

  private getUpdatedFocusInfo = (type: SliderRangeType, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private getSliderType = (target: HTMLInputElement) => {
    if (target.classList.contains('min-input')) {
      return 'min'
    }

    if (target.classList.contains('max-input')) {
      return 'max'
    }

    return null
  }

  private handleBlur = (event: FocusEvent) => {
    this.focusType = getInitFocusInfo()

    const target = event.target as HTMLInputElement
    const type: SliderRangeType | null = this.getSliderType(target)

    if (type) {
      this.handleInputChange(type)(event)
    } else {
      this.handleInputChange()(event)
    }

    this.wppBlur.emit(event)
  }

  private handleFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private handleInputBlur = (type: SliderRangeType) => {
    this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.NONE)
  }

  private handleInputMouseDown = (type: SliderRangeType) => {
    this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.MOUSE)
  }

  private handleInputKeyUp = (event: KeyboardEvent, type: SliderRangeType) => {
    if (event.key === 'Tab') this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
  }

  private handleMarkClick = (event: Event, mark: MarkState) => {
    event.stopPropagation()

    this.handleType({
      single: () => {
        this.value = this.getNearestLowerValue(mark.value)
      },
      range: value => {
        const distanceToTheStart = Math.abs(value[0] - mark.value)
        const distanceToTheEnd = Math.abs(value[1] - mark.value)

        if (distanceToTheStart <= distanceToTheEnd) {
          this.value = [mark.value, value[1]]
        } else {
          this.value = [value[0], mark.value]
        }
      },
      'middle-range': () => {
        this.value = this.getNearestLowerValue(mark.value)
      },
    })

    this.wppChange.emit({
      value: this.value,
      name: this.name,
      ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
    })
  }

  private handleSliderWrapperClick = (event: MouseEvent) => {
    if (this.disabled || this.segmentWidth === 0) return

    const clickedSegmentPosition: number = 1 + event.offsetX / this.segmentWidth
    const clickedSegmentNumber = Math.trunc(clickedSegmentPosition)

    // This value determines which half of the segment was clicked. -1 means that the first half was clicked and that the clicked segment
    // is placed on the right of the mark, so we should approximate to the starting mark of the segment (left one).
    const halfOfSegment = clickedSegmentPosition >= Math.round(clickedSegmentPosition) ? -1 : 0

    const clickedValue = this.min + (clickedSegmentNumber + halfOfSegment) * this.step

    this.handleType({
      single: () => {
        this.value = Math.round(clickedValue)
        this.inputValue = String(this.value)
      },
      range: value => {
        const distanceFromEndThumb = Math.abs(clickedValue - value[1])
        const distanceFromStartThumb = Math.abs(clickedValue - value[0])

        if (distanceFromEndThumb === distanceFromStartThumb) {
          if (halfOfSegment === -1) {
            this.value = [value[0], clickedValue]
          } else {
            this.value = [clickedValue, value[1]]
          }
        }

        if (clickedValue > value[1] || distanceFromEndThumb < distanceFromStartThumb) {
          this.value = [value[0], clickedValue]
        }

        if (clickedValue < value[0] || distanceFromEndThumb > distanceFromStartThumb) {
          this.value = [clickedValue, value[1]]
        }

        this.inputValue = (this.value as number[]).map(String)
      },
      'middle-range': () => {
        this.value = Math.round(clickedValue)
        this.inputValue = String(this.value)
      },
    })

    this.wppChange.emit({
      value: this.value,
      name: this.name,
      ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
    })
  }

  private handleSingleSliderChange = (event: Event) => {
    this.value = Number((event.target as HTMLInputElement).value)
    this.inputValue = String(this.value)

    this.wppChange.emit({
      value: this.value,
      name: this.name,
      ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
    })
  }

  private handleRangeSliderChange = (type: SliderRangeType) => (event: Event) => {
    event.preventDefault()
    event.stopPropagation()

    const target = event.target as HTMLInputElement

    this.handleType({
      single: () => {},
      range: value => {
        if (type === 'min') {
          this.value = [Math.min(value[1] - this.step, Number(target.value)), value[1]]

          target.value = String(Math.min(this.value[1] - this.step, Number(target.value)))
        }

        if (type === 'max') {
          this.value = [value[0], Math.max(value[0] + this.step, Number(target.value))]

          target.value = String(Math.max(this.value[0] + this.step, Number(target.value)))
        }
      },
      'middle-range': () => {
        this.value = Number((event.target as HTMLInputElement).value)
      },
    })

    this.wppChange.emit({
      value: this.value,
      name: this.name,
      ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
    })
  }

  private isMarkInRange = (markValue: number): boolean => {
    if (this.type === 'middle-range') {
      if (this.isMiddlePointHigher()) {
        return (this.value as number) <= markValue && this.middleValue >= markValue
      }

      return (this.value as number) >= markValue && this.middleValue <= markValue
    }

    return (this.value as number[])[0] <= markValue && (this.value as number[])[1] >= markValue
  }

  private markCssClasses = (markValue: number) => ({
    'mark-item': true,
    active: this.type === 'single' ? (this.value as number) >= markValue : this.isMarkInRange(markValue),
    disabled: this.disabled,
    'middle-mark-active':
      this.type === 'middle-range' && markValue === this.middleValue && markValue !== (this.value as number),
    first: markValue === this.min,
    last: markValue === this.max,
  })

  private singleSliderWrapperCssClasses = () => ({
    'single-slider-wrapper': true,
    disabled: this.disabled,
    'middle-range-wrapper': this.type === 'middle-range',
  })

  private rangeSliderWrapperCssClasses = () => ({
    'range-slider-wrapper': true,
    disabled: this.disabled,
  })

  private controlCssClasses = () => ({
    'slider-control': true,
    'with-value': this.withValue,
    'without-label': !this.labelConfig?.text,
    disabled: this.disabled,
    [`size-${this.size}`]: true,
  })

  private hostCssClasses = () => ({
    'wpp-slider': true,
  })

  private marksListCssClasses = () => ({
    'marks-list': true,
    [`size-${this.size}`]: true,
  })

  private inputColumnCssClasses = () => ({
    'input-column': true,
    [`size-${this.size}`]: true,
  })

  private labelCssClasses = () => ({
    label: true,
    [`size-${this.size}`]: true,
  })

  private editableInputCssClasses = () => ({
    'with-input': this.withInput,
    'inputs-range': this.withInput && this.type === 'range',
    disabled: this.disabled,
    [`size-${this.size}`]: true,
  })

  private calculateProgressBar = (value: number): string => (value - this.min) * (1 / (this.max - this.min)) * 100 + '%'

  private renderControl = () => {
    const label = this.labelConfig?.text && (
      <wpp-label
        htmlFor={this.name}
        optional={!this.required}
        disabled={this.disabled}
        config={this.labelConfig}
        tooltipConfig={this.labelTooltipConfig}
        part="label"
      />
    )

    if (this.withValue && !this.withInput) {
      return (
        <div class={this.controlCssClasses()} part="control-wrapper">
          {label || <div></div>}
          {this.handleType<HTMLElement>({
            single: value => (
              <wpp-typography type="s-midi" part="value">
                {value}
              </wpp-typography>
            ),
            range: value => (
              <div class="range-value-wrapper" part="value-wrapper">
                <wpp-typography type="s-midi" part="value">
                  {value[0]}
                </wpp-typography>
                <wpp-divider part="value-divider" class={{ divider: true, disabled: this.disabled }} />
                <wpp-typography type="s-midi" part="value">
                  {value[1]}
                </wpp-typography>
              </div>
            ),
            'middle-range': value => (
              <div class="range-value-wrapper" part="value-wrapper">
                <wpp-typography type="s-midi" part="value">
                  {this.isMiddlePointHigher() ? value : this.middleValue}
                </wpp-typography>
                <wpp-divider part="value-divider" class={{ divider: true, disabled: this.disabled }} />
                <wpp-typography type="s-midi" part="value">
                  {this.isMiddlePointHigher() ? this.middleValue : value}
                </wpp-typography>
              </div>
            ),
          })}
        </div>
      )
    }

    return label
  }

  private renderSingleInput = () => (
    <wpp-input
      ref={inputRef => (this.inputRef = inputRef)}
      type="decimal"
      size={this.size}
      disabled={this.disabled}
      part="input-number"
      onBlur={this.handleBlur}
      onFocus={this.handleFocus}
      style={{ width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }}
      class={{ [`size-${this.size}`]: true }}
      maskOptions={{
        decimalPatternOptions: this.maskOptions
          ? {
              ...getDefaultMaskOptions(this.step),
              ...(this.maskOptions as MaskitoNumberParams),
            }
          : getDefaultMaskOptions(this.step),
      }}
    />
  )

  private renderEditableInput = () => (
    <div class={this.editableInputCssClasses()} part="editable-input-wrapper">
      {this.handleType<HTMLElement>({
        single: () => this.renderSingleInput(),
        range: () => (
          <div class="range-input-wrapper" part="input-wrapper">
            <wpp-input
              ref={inputRef => (this.inputRef = inputRef)}
              type="decimal"
              size={this.size}
              disabled={this.disabled}
              part="input-min"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              style={{ width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }}
              class={{ 'min-input': true, [`size-${this.size}`]: true }}
              maskOptions={{
                decimalPatternOptions:
                  this.maskOptions && (this.maskOptions as MaskitoNumberParams[])[0]
                    ? {
                        ...getDefaultMaskOptions(this.step),
                        ...(this.maskOptions as MaskitoNumberParams[])[0],
                      }
                    : getDefaultMaskOptions(this.step),
              }}
            />
            <wpp-divider class={{ 'wpp-disabled': this.disabled }} part="divider" />
            <wpp-input
              ref={inputRef => (this.inputMaxRef = inputRef)}
              type="decimal"
              size={this.size}
              disabled={this.disabled}
              part="input-max"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              style={{ width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }}
              class={{ 'max-input': true, [`size-${this.size}`]: true }}
              maskOptions={{
                decimalPatternOptions:
                  this.maskOptions && (this.maskOptions as MaskitoNumberParams[])[1]
                    ? {
                        ...getDefaultMaskOptions(this.step),
                        ...(this.maskOptions as MaskitoNumberParams[])[1],
                      }
                    : getDefaultMaskOptions(this.step),
              }}
            />
          </div>
        ),
        'middle-range': () => this.renderSingleInput(),
      })}
    </div>
  )

  private renderMarks = () => {
    if (this.displayMarks.length > 0) {
      const totalMarks = this.displayMarks.length

      const calculateDynamicOffset = (index: number, totalMarks: number): number => {
        if (index === 0 || index === totalMarks - 1) return 0

        const midpoint = Math.floor(totalMarks / 2)

        return (midpoint - index) * 2
      }

      return this.displayMarks.map((mark, index) => {
        const dynamicOffset = calculateDynamicOffset(index, totalMarks)
        const isFirstMark = index === 0
        const isLastMark = index === totalMarks - 1

        const style = {
          '--mark-left-dynamic':
            isFirstMark || isLastMark
              ? `calc(${mark.position} - var(--slider-mark-size) / 2)`
              : `calc(${mark.position} - var(--slider-mark-size) / 2 + ${dynamicOffset}px)`,
        }

        const isTruncated = !!this.tooltipTexts[mark.value]
        const labelText = mark.label !== null && mark.label !== undefined ? String(mark.label) : ''
        const tooltipPlacement = 'bottom'
        const labelContent = (
          <wpp-typography id={`mark-label-${mark.value}`} class={this.labelCssClasses()} type="xs-body" part="label">
            {labelText}
          </wpp-typography>
        )

        return (
          <div
            onClick={event => this.handleMarkClick(event, mark)}
            class={this.markCssClasses(mark.value)}
            style={style}
            part="mark"
          >
            {!this.continuous && (
              <div class="circle" part="mark-circle">
                <div class="mark" part="mark-inner" />
              </div>
            )}

            <div class="label-container">
              {isTruncated ? (
                <wpp-tooltip config={{ placement: tooltipPlacement }} text={this.tooltipTexts[mark.value]}>
                  {labelContent}
                </wpp-tooltip>
              ) : (
                labelContent
              )}
            </div>
          </div>
        )
      })
    }
  }

  private renderRangeSliders = (style: Record<string, string>, value?: any) => (
    <div class={this.rangeSliderWrapperCssClasses()} part="slider">
      <div
        ref={elRef => (this.clickableAreaRef = elRef)}
        class="slider-clickable-wrapper"
        onClick={this.handleSliderWrapperClick}
      />
      <input
        class={{ slider: true, [`min-range-${this.focusType.min}`]: true }}
        type="range"
        name={this.name}
        min={this.min}
        max={this.max}
        step={this.step}
        value={value[0]}
        required={this.required}
        disabled={this.disabled}
        aria-label={this.ariaProps.label}
        part="input-slider-min"
        style={style}
        onInput={this.handleRangeSliderChange('min')}
        onBlur={() => this.handleInputBlur('min')}
        onMouseDown={() => this.handleInputMouseDown('min')}
        onKeyUp={(event: KeyboardEvent) => this.handleInputKeyUp(event, 'min')}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
        }}
        title=""
      />
      <input
        class={{
          slider: true,
          [`max-range-${this.focusType.max}`]: true,
        }}
        type="range"
        name={this.name}
        min={this.min}
        max={this.max}
        step={this.step}
        value={value[1]}
        required={this.required}
        disabled={this.disabled}
        aria-label={this.ariaProps.label}
        part="input-slider-max"
        onInput={this.handleRangeSliderChange('max')}
        onBlur={() => this.handleInputBlur('max')}
        onMouseDown={() => this.handleInputMouseDown('max')}
        onKeyUp={(event: KeyboardEvent) => this.handleInputKeyUp(event, 'max')}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
        }}
        title=""
      />
    </div>
  )

  private renderSingleSlider = (style: Record<string, string>, value: number) => (
    <div class={this.singleSliderWrapperCssClasses()} part="slider">
      <div
        ref={elRef => (this.clickableAreaRef = elRef)}
        class="slider-clickable-wrapper"
        onClick={this.handleSliderWrapperClick}
      />
      <input
        class={{ slider: true, [`max-range-${this.focusType.max}`]: true }}
        type="range"
        name={this.name}
        id={this.name}
        min={this.min}
        max={this.max}
        step={this.step}
        value={value}
        required={this.required}
        disabled={this.disabled}
        aria-label={this.ariaProps.label}
        part="input-slider-max"
        onInput={this.handleSingleSliderChange}
        onBlur={() => this.handleInputBlur('max')}
        onKeyUp={(event: KeyboardEvent) => this.handleInputKeyUp(event, 'max')}
        onMouseDown={() => this.handleInputMouseDown('max')}
        style={style}
        title=""
      />
    </div>
  )

  // This function is used only in the middle-range slider type
  private isMiddlePointHigher = (): boolean => this.middleValue > (this.value as number)

  render() {
    const style = this.handleType<Record<string, string>>({
      single: value => ({
        '--active-single-progress-bar': this.calculateProgressBar(value),
      }),
      range: value => ({
        '--active-range-from-progress-bar': this.calculateProgressBar(value[0]),
        '--active-range-to-progress-bar': this.calculateProgressBar(value[1]),
      }),
      'middle-range': value => ({
        '--active-range-from-progress-bar': this.calculateProgressBar(
          this.isMiddlePointHigher() ? value : this.middleValue,
        ),
        '--active-range-to-progress-bar': this.calculateProgressBar(
          this.isMiddlePointHigher() ? this.middleValue : value,
        ),
      }),
    })

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="label, input-number, input-wrapper, input-min, divider, input-max, control-wrapper, editable-input-wrapper, value, value-wrapper, value-divider, mark, mark-circle, mark-inner, slider, input-slider-min, input-slider-max, marks-list"
      >
        {this.renderControl()}

        <div class="slider-container">
          <div class="slider-column">
            {this.handleType<HTMLElement>({
              single: value => this.renderSingleSlider(style, value),
              range: value => this.renderRangeSliders(style, value),
              'middle-range': value => this.renderSingleSlider(style, value),
            })}

            {this.marks && (
              <div ref={el => (this.marksListRef = el)} class={this.marksListCssClasses()} part="marks-list">
                {this.renderMarks()}
              </div>
            )}
          </div>

          {this.withInput && this.continuous && (
            <div class={this.inputColumnCssClasses()}>{this.renderEditableInput()}</div>
          )}
        </div>
      </Host>
    )
  }
}
