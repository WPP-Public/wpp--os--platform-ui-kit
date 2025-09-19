import { Component, EventEmitter, Host, Prop, h, Event, State, Element, Listen, Fragment, Watch } from '@stencil/core'
import {
  ColorPickerMode,
  ColorPickerType,
  ColorSection,
  HexValueWithOpacity,
  SaturationChangeDetail,
  ChangeColorEventDetails,
} from './types'
import {
  getColorsFromThemeOnPage,
  getColorsForSections,
  isValid6DigitHex,
  defaultDropdownConfig,
  DEFAULT_VALUE_HEX,
  DEFAULT_VALUE_RGBA,
  hexToRGBA,
  contrastWithWhite,
  rgbaToHex,
  hexToHsv,
  hsvToHex,
  MAXIMUM_NUMBER_OF_SAVED_COLORS,
  hexToRgb,
  rgbToHex,
  RGB_INPUTS,
  RGB_INPUT_CONFIG,
  OPACITY_INPUT_CONFIG,
  isValidRgba,
} from './utils'
import { getHighestContainerInDOM, isEventTargetContained, transformToVersionedTag } from '../../utils/utils'
import { menuListConfig } from '../../common/menuListConfig'
import { DropdownConfig } from '../../types/common'
import { Theme } from '../../types/theme'
import { Instance } from 'tippy.js'
import { WppSegmentedControlCustomEvent, WppSelectCustomEvent } from '../../components'
import { SegmentedControlChangeEventDetail, SegmentedControlValue } from '../wpp-segmented-control/types'
import { SelectChangeEventDetail } from '../wpp-select/types'

@Component({
  tag: 'wpp-color-picker',
  styleUrl: 'wpp-color-picker.scss',
  shadow: true,
})
export class WppColorPicker {
  private themeColorValues: ColorSection[] = []
  private selectedCategory: string
  private isSavedColorPopoverOpen: boolean = false
  private anchorEl?: HTMLDivElement
  private contentEl?: HTMLDivElement
  private selectTippyInstance?: Instance

  private currentPopoverInstance?: Instance

  @Element() host: HTMLWppColorPickerElement

  @State() isDropdownVisible: boolean = false

  @State() internalOpacity: string

  @State() hexColor: string

  @State() rgbInputValues: { red: number; green: number; blue: number }

  @State() hue: number

  @State() saturation: number

  @State() saturationValue: number

  @State() tippyInstance: Instance

  @State() activeSegment: SegmentedControlValue = 'theme'

  @State() displayValue: string

  @State() internalType: ColorPickerType

  /**
   * Used to display the initial color of the color-picker component. The color format must respect the type of the component!
   */
  @Prop() readonly initialColor?: string

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * The type of the color-picker. The default value is 'hex', meaning that the colors will be represented
   * in 'hex' format (E.g: "#0014CC"). The other option is 'rgba' (E.g: "rgba(0, 20, 204, 1)").
   */
  @Prop({ mutable: true, reflect: true }) type: ColorPickerType = 'hex'

  /**
   * The mode of the color-picker. The default value is "theme", meaning that the color-picker will display all the
   * colors from the app's theme. When mode is "custom", the user will have the Saturation picker,
   * Hue slider and Opacity slider and can pick any color. Finally, if mode = "theme and custom", both "theme" and "custom" modes are enabled.
   */
  @Prop({ reflect: true }) readonly mode: ColorPickerMode = 'theme'

  /**
   * The opacity value for colors that are in 'hex' format. This property will not work for color values
   * that are in 'rgba' format, as the opacity is already present in that format.
   */
  @Prop({ mutable: true }) hexOpacity: string = '100%'

  /**
   * This property represents a list of the saved colors which are going to be displayed under the custom color-picker in the dropdown.
   * This only works for the following modes: "custom" and "theme and custom". The color values must be valid "hex" or "rgba" values.
   */
  @Prop() readonly savedColors: string[] = []

  /**
   * This property represents an object that contains the theme of the application. By default, the color-picker tries to
   * take the default theme data from its environment. However, if the theme contains additional configuration from the default one,
   * like custom color palettes, you need to pass it as a property here.
   * Note: For OS-based application, this data is available in the "osContext" object.
   */
  @Prop() readonly themeColors?: Theme = undefined

  /**
   * If the color-picker is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Emitted when the "plus" icon is clicked in the "Saved colors" section. The value emitted is in rgba format.
   */
  @Event({ bubbles: false, composed: false }) readonly wppSaveColor: EventEmitter<string>

  /**
   * Emitted when the "Remove color" options is clicked in the color's popover. The popover is opened when the color
   * element from "Saved colors" is clicked
   */
  @Event({ bubbles: false, composed: false }) readonly wppRemoveSavedColor: EventEmitter<string>

  /**
   * Emitted when the color-picker is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the color-picker loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the color-picker selects a color to display. This happens when the dropdown of the color-picker
   * is closed.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<ChangeColorEventDetails>

  @Listen('hueChanged', { target: 'window', capture: true })
  handleHueChange(event: CustomEvent<number>) {
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
      this.hue = event.detail

      this.updateHexValue()
    }
  }

  @Listen('saturationChanged', { target: 'window', capture: true })
  handleSaturationChange(event: CustomEvent<SaturationChangeDetail>) {
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
      this.saturation = event.detail.saturation
      this.saturationValue = event.detail.saturationValue

      this.updateHexValue()
    }
  }

  @Listen('opacityChanged', { target: 'window', capture: true })
  handleOpacityChange(event: CustomEvent<number>) {
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
      this.internalOpacity = `${parseInt(event.detail * 100 + '')}%`
    }
  }

  @Watch('hexColor')
  handleHexColorChange() {
    if (this.mode !== 'theme') {
      this.getRGBValues()
    }
  }

  @Watch('hexOpacity')
  handleHexOpacityChange() {
    if (this.type === 'hex') {
      this.internalOpacity = this.hexOpacity
    }
  }

  @Watch('type')
  handleTypeCahnge() {
    if (this.type === 'hex') {
      this.displayValue = rgbaToHex(this.displayValue).hexValue
    } else {
      this.displayValue = hexToRGBA({ hexValue: this.displayValue, opacity: this.internalOpacity })
    }

    this.internalType = this.type
  }

  componentWillLoad() {
    this.displayValue = this.isValidInitialColor()
      ? (this.initialColor as string)
      : this.type === 'hex'
      ? DEFAULT_VALUE_HEX
      : DEFAULT_VALUE_RGBA
    this.internalType = this.type

    if (this.mode === 'theme' || this.mode === 'theme and custom') {
      this.themeColorValues = this.themeColors?.content?.light?.color
        ? getColorsForSections(this.themeColors.content.light.color)
        : getColorsFromThemeOnPage(this.host)

      this.checkInitialColorInList()
    }

    if (this.type === 'hex') {
      this.hexColor = this.displayValue
      this.internalOpacity = this.hexOpacity
    } else {
      const { hexValue, opacity } = rgbaToHex(this.displayValue)

      this.hexColor = hexValue
      this.internalOpacity = opacity
    }

    this.getHsvValues()
  }

  componentDidLoad() {
    this.createTippyInstance()
  }

  private checkInitialColorInList = () => {
    if (!this.initialColor) return

    const transformedInitialValue: HexValueWithOpacity =
      this.type === 'hex'
        ? { hexValue: this.initialColor as string, opacity: this.hexOpacity }
        : rgbaToHex(this.initialColor as string)

    if (!transformedInitialValue.hexValue) return

    for (const colorSection of this.themeColorValues) {
      if (colorSection.colors.length > 0) {
        const found = colorSection.colors.find((colorSectionItem: HexValueWithOpacity[]) =>
          colorSectionItem.some((colorItem: HexValueWithOpacity) => {
            if (
              colorItem.hexValue === transformedInitialValue.hexValue &&
              colorItem.opacity === transformedInitialValue.opacity
            ) {
              this.selectedCategory = colorSection.title

              return true
            }

            return false
          }),
        )

        if (found) {
          break
        }
      }
    }
  }

  private isValidInitialColor = (): boolean => {
    if (!this.initialColor) return false

    if (this.type === 'hex') {
      return isValid6DigitHex(this.initialColor)
    }

    return isValidRgba(this.initialColor)
  }

  private updateHexValue = () => {
    this.hexColor = hsvToHex(this.hue, this.saturation, this.saturationValue).toUpperCase()
  }

  private getRGBValues = () => {
    this.rgbInputValues = hexToRgb(this.hexColor)
  }

  private getHsvValues = () => {
    const { h, s, v } = hexToHsv(this.hexColor)

    this.hue = h
    this.saturation = s
    this.saturationValue = v
  }

  private createTippyInstance = () => {
    this.tippyInstance = menuListConfig({
      anchor: this.anchorEl!,
      content: this.contentEl,
      triggerElementWidth: false,
      appendTo: getHighestContainerInDOM(),
      ...defaultDropdownConfig,
      ...(this.dropdownConfig as DropdownConfig),
      onShow: (instance: Instance) => {
        this.isDropdownVisible = true

        if (this.dropdownConfig.onShow) {
          return this.dropdownConfig.onShow(instance)
        }
      },
      onHide: (instance: Instance) => {
        if (this.isSavedColorPopoverOpen) return false

        this.isDropdownVisible = false

        if (this.type === 'hex') {
          this.displayValue = this.hexColor.toUpperCase()

          this.wppChange.emit({ hexValue: this.hexColor, opacity: this.internalOpacity })
        } else {
          const rgbaValue = hexToRGBA({ hexValue: this.hexColor, opacity: this.internalOpacity })

          this.displayValue = rgbaValue

          this.wppChange.emit(rgbaValue)
        }

        this.hexOpacity = this.internalOpacity

        if (this.dropdownConfig.onHide) {
          return this.dropdownConfig.onHide(instance)
        }
      },
      onHidden: () => {
        this.isDropdownVisible = false
      },
      onClickOutside: (_, event) => {
        if (!this.contentEl) return

        if (this.selectTippyInstance?.popper && isEventTargetContained(this.selectTippyInstance?.popper, event)) {
          return
        }

        this.tippyInstance?.hide()
      },
    })
  }

  private handleSegmentChange = (event: WppSegmentedControlCustomEvent<SegmentedControlChangeEventDetail>) => {
    const { value } = event.detail

    if (value) {
      this.activeSegment = value
    }
  }

  private handleClickThemeColor = (color: HexValueWithOpacity, colorCategory: string) => {
    this.hexColor = color.hexValue
    this.internalOpacity = color.opacity
    this.selectedCategory = colorCategory

    this.getHsvValues()
  }

  private handleChangeTypeOfPicker = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    const { value } = event.detail

    this.internalType = value as ColorPickerType
  }

  private handleSaveColor = () => {
    const hexWithOpacity: HexValueWithOpacity = {
      hexValue: this.hexColor,
      opacity: this.internalOpacity,
    }

    const convertedColor = hexToRGBA(hexWithOpacity)

    this.wppSaveColor.emit(convertedColor)
  }

  private handleClickSavedColor = (savedColor: string) => {
    if (isValid6DigitHex(savedColor)) {
      // Hex Color
      this.hexColor = savedColor
      this.internalOpacity = '100%'
    } else {
      // RGBA Color
      const { hexValue, opacity } = rgbaToHex(savedColor)

      this.hexColor = hexValue
      this.internalOpacity = opacity
    }

    this.getHsvValues()
  }

  private handleRightClick = (event: MouseEvent) => {
    event.preventDefault()

    const popoverElement = (event.currentTarget as HTMLElement).closest(
      transformToVersionedTag('wpp-popover'),
    ) as HTMLWppPopoverElement

    if (popoverElement) {
      popoverElement.openPopover()
    }
  }

  private handleRemoveSavedColor = (savedColor: string) => {
    this.wppRemoveSavedColor.emit(savedColor)

    if (this.currentPopoverInstance) {
      this.currentPopoverInstance.hide()
    }
  }

  private handleInputOpacityChange = (event: FocusEvent) => {
    const inputEl = event.target as HTMLWppInputElement

    this.internalOpacity = inputEl.value
  }

  private handleInputHexChange = (event: FocusEvent) => {
    const inputEl = event.target as HTMLWppInputElement
    const formattedValue = `#${inputEl.value.toUpperCase()}`

    if (isValid6DigitHex(formattedValue)) {
      this.hexColor = formattedValue

      this.getHsvValues()
    } else {
      inputEl.value = this.hexColor.replace('#', '')
      console.warn(`The value: ${inputEl.value} is not a valid 6-digit hex value!`)
    }
  }

  private handleInputRGBChange = (event: FocusEvent) => {
    const inputEl = event.target as HTMLWppInputElement

    if (inputEl.name) {
      Object.keys(this.rgbInputValues).forEach(key => {
        if (key === inputEl.name) {
          this.rgbInputValues[key as keyof typeof this.rgbInputValues] = parseInt(inputEl.value)
        }
      })
    }

    this.hexColor = rgbToHex(this.rgbInputValues.red, this.rgbInputValues.green, this.rgbInputValues.blue)
    this.getHsvValues()
  }

  private hasColorOpacity = (color: string) => {
    if (isValid6DigitHex(color)) return false

    const { opacity } = rgbaToHex(color)

    return opacity !== '100%'
  }

  private handleAnchorClick = () => {
    if (!this.disabled) {
      this.tippyInstance.show()
    }
  }

  private onFocus = (event: FocusEvent): void => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent): void => {
    this.wppBlur.emit(event)
  }

  private hostCssClasses = () => ({
    'wpp-color-picker': true,
    'wpp-disabled': this.disabled,
    'wpp-active': this.isDropdownVisible,
  })

  private dropdownCssClasses = () => ({
    'wpp-color-picker-dropdown': true,
  })

  private colorBoxCssClasses = (color: HexValueWithOpacity) => ({
    'wpp-color-box': true,
    'wpp-color-box-white': color.hexValue === '#FFFFFF',
    'wpp-color-box-selected': color.hexValue === this.hexColor && this.internalOpacity === color.opacity,
  })

  render() {
    return (
      <Host aria-disabled={this.disabled} class={this.hostCssClasses()} onFocus={this.onFocus} onBlur={this.onBlur}>
        <div onClick={this.handleAnchorClick} class="anchor" ref={anchorEl => (this.anchorEl = anchorEl)}>
          <div class="color-container">
            <div class="color-preview">
              <div
                style={{ backgroundColor: this.displayValue, opacity: this.type === 'hex' ? this.hexOpacity : '1' }}
                class="color-preview-box"
              ></div>
              <wpp-icon-swatch size="s"></wpp-icon-swatch>
            </div>
            <wpp-typography type="s-body">{this.displayValue}</wpp-typography>
          </div>
          {this.type === 'hex' && (
            <wpp-typography class="hex-opacity" type="s-body">
              {this.hexOpacity}
            </wpp-typography>
          )}
        </div>
        <div class={this.dropdownCssClasses()} ref={elRef => (this.contentEl = elRef)}>
          {this.mode === 'theme and custom' && (
            <wpp-segmented-control
              width="346px"
              hugContentOff
              size="s"
              value={this.activeSegment}
              onWppChange={this.handleSegmentChange}
            >
              <wpp-segmented-control-item variant="text" value="theme">
                Theme
              </wpp-segmented-control-item>
              <wpp-segmented-control-item variant="text" value="custom">
                Custom
              </wpp-segmented-control-item>
            </wpp-segmented-control>
          )}

          {(this.mode === 'custom' || (this.mode === 'theme and custom' && this.activeSegment === 'custom')) && (
            <div class="wpp-custom-picker">
              <wpp-saturation-picker
                hue={this.hue}
                saturation={this.saturation}
                value={this.saturationValue}
              ></wpp-saturation-picker>

              <div class="wpp-bottom-pickers">
                <div class="wpp-sliders">
                  <wpp-hue-slider hue={this.hue}></wpp-hue-slider>
                  <wpp-opacity-slider
                    hexColor={this.hexColor}
                    opacity={parseInt(this.internalOpacity) / 100}
                  ></wpp-opacity-slider>
                </div>
                <div class="wpp-color-preview">
                  <div
                    class="wpp-color"
                    style={{ backgroundColor: this.hexColor, opacity: this.internalOpacity }}
                  ></div>
                  <wpp-icon-swatch></wpp-icon-swatch>
                </div>
              </div>

              <div class="wpp-controls">
                {this.isDropdownVisible && (
                  <wpp-select
                    size="s"
                    required
                    type="single"
                    value={this.internalType}
                    onWppChange={this.handleChangeTypeOfPicker}
                    dropdownConfig={{
                      placement: 'bottom',
                      onShow: (instance: Instance) => {
                        this.selectTippyInstance = instance
                      },
                      onHide: () => {
                        this.selectTippyInstance = undefined
                      },
                    }}
                    list={[
                      { value: 'hex', label: 'Hex' },
                      { value: 'rgba', label: 'RGB' },
                    ]}
                  ></wpp-select>
                )}
                {this.internalType === 'hex' ? (
                  <wpp-input
                    class="hex-input"
                    size="s"
                    name="hexValue"
                    value={this.hexColor.replace('#', '')}
                    onBlur={this.handleInputHexChange}
                  />
                ) : (
                  <Fragment>
                    {RGB_INPUTS.map((inputName: string) => (
                      <wpp-input
                        key={inputName}
                        class={`${inputName}-input`}
                        size="s"
                        name={inputName}
                        type="decimal"
                        value={String(this.rgbInputValues[inputName as keyof typeof this.rgbInputValues])}
                        maskOptions={RGB_INPUT_CONFIG}
                        onBlur={this.handleInputRGBChange}
                      />
                    ))}
                  </Fragment>
                )}
                <wpp-input
                  class="opacity-input"
                  size="s"
                  name="opacity"
                  type="decimal"
                  maskOptions={OPACITY_INPUT_CONFIG}
                  value={this.internalOpacity}
                  onBlur={this.handleInputOpacityChange}
                />
              </div>

              <div class="wpp-saved-colors">
                <wpp-typography class="title" type="s-strong">
                  Saved colors
                </wpp-typography>
                <div class="wpp-colors">
                  {this.savedColors.map((savedColor: string) => (
                    <wpp-popover
                      config={{
                        trigger: '',
                        onShow: instance => {
                          this.currentPopoverInstance = instance
                          this.isSavedColorPopoverOpen = true
                        },
                        onHide: () => {
                          this.isSavedColorPopoverOpen = false
                          this.currentPopoverInstance = undefined
                        },
                      }}
                    >
                      <div
                        onContextMenu={event => this.handleRightClick(event)}
                        slot="trigger-element"
                        class="saved-color"
                        key={savedColor}
                        onClick={() => this.handleClickSavedColor(savedColor)}
                      >
                        <div class="saved-color-preview" style={{ backgroundColor: savedColor }}></div>
                        {this.hasColorOpacity(savedColor) && <wpp-icon-swatch size="s" />}
                      </div>
                      <div class="popover-content">
                        <wpp-list-item onWppChangeListItem={() => this.handleRemoveSavedColor(savedColor)}>
                          <span slot="label">Remove color</span>
                        </wpp-list-item>
                      </div>
                    </wpp-popover>
                  ))}
                  {this.savedColors.length < MAXIMUM_NUMBER_OF_SAVED_COLORS && (
                    <wpp-icon-plus onClick={this.handleSaveColor}></wpp-icon-plus>
                  )}
                </div>
              </div>
            </div>
          )}

          {(this.mode === 'theme' || (this.mode === 'theme and custom' && this.activeSegment === 'theme')) &&
            this.themeColorValues.map((colorSection: ColorSection) => (
              <div key={colorSection.title} class="wpp-color-section">
                <wpp-typography class="wpp-color-section-title" type="s-strong">
                  {colorSection.title}
                </wpp-typography>
                {colorSection.colors.map((colorSubsection: HexValueWithOpacity[]) => (
                  <div class="wpp-color-subsection">
                    {colorSubsection.map((color: HexValueWithOpacity) => (
                      <div
                        key={color.hexValue}
                        class={this.colorBoxCssClasses(color)}
                        onClick={() => this.handleClickThemeColor(color, colorSection.title)}
                      >
                        <div
                          class="wpp-color-box-preview"
                          style={{ backgroundColor: color.hexValue, opacity: color.opacity }}
                        ></div>
                        {color.opacity !== '100%' && <wpp-icon-swatch size="s" />}
                        {this.selectedCategory === colorSection.title &&
                          this.hexColor === color.hexValue &&
                          this.internalOpacity === color.opacity && (
                            <wpp-icon-tick
                              color={
                                contrastWithWhite(this.hexColor) < 3
                                  ? 'var(--wpp-grey-color-900)'
                                  : 'var(--wpp-white-color)'
                              }
                            ></wpp-icon-tick>
                          )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </Host>
    )
  }
}
