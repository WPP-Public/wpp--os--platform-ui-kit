'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-f99954d3.js');
const utils$1 = require('./utils-e1f17a8c.js');
const menuListConfig = require('./menuListConfig-bbde46c0.js');
require('./consts-dba6e6dd.js');
require('./tippy.esm-9d703cd4.js');

const wppColorPickerCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;border-radius:var(--wpp-border-radius-s);width:220px;padding:4px 8px}:host .anchor:hover{background-color:var(--wpp-grey-color-200);cursor:pointer}:host .anchor:active{background-color:var(--wpp-grey-color-300)}:host .anchor .color-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .anchor .color-container .color-preview{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:var(--wpp-border-radius-xs);width:24px;height:24px;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-400);margin-right:8px;overflow:hidden;position:relative}:host .anchor .color-container .color-preview .color-preview-box{position:absolute;left:0;top:0;width:100%;height:100%}:host .anchor .hex-opacity{--wpp-typography-color:var(--wpp-grey-color-800)}:host(.wpp-disabled) .anchor:hover{cursor:not-allowed;background-color:transparent}:host(.wpp-disabled) .anchor:active{background-color:transparent}:host(.wpp-disabled) .anchor .color-container .color-preview{opacity:0.4}:host(.wpp-active) .anchor{background-color:var(--wpp-grey-color-200)}";

const WppColorPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppSaveColor = index.createEvent(this, "wppSaveColor", 1);
    this.wppRemoveSavedColor = index.createEvent(this, "wppRemoveSavedColor", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.themeColorValues = [];
    this.isSavedColorPopoverOpen = false;
    this.checkInitialColorInList = () => {
      if (!this.initialColor)
        return;
      const transformedInitialValue = this.type === 'hex'
        ? { hexValue: this.initialColor, opacity: this.hexOpacity }
        : utils.rgbaToHex(this.initialColor);
      if (!transformedInitialValue.hexValue)
        return;
      for (const colorSection of this.themeColorValues) {
        if (colorSection.colors.length > 0) {
          const found = colorSection.colors.find((colorSectionItem) => colorSectionItem.some((colorItem) => {
            if (colorItem.hexValue === transformedInitialValue.hexValue &&
              colorItem.opacity === transformedInitialValue.opacity) {
              this.selectedCategory = colorSection.title;
              return true;
            }
            return false;
          }));
          if (found) {
            break;
          }
        }
      }
    };
    this.isValidInitialColor = () => {
      if (!this.initialColor)
        return false;
      if (this.type === 'hex') {
        return utils.isValid6DigitHex(this.initialColor);
      }
      return utils.isValidRgba(this.initialColor);
    };
    this.updateHexValue = () => {
      this.hexColor = utils.hsvToHex(this.hue, this.saturation, this.saturationValue).toUpperCase();
    };
    this.getRGBValues = () => {
      this.rgbInputValues = utils.hexToRgb(this.hexColor);
    };
    this.getHsvValues = () => {
      const { h, s, v } = utils.hexToHsv(this.hexColor);
      this.hue = h;
      this.saturation = s;
      this.saturationValue = v;
    };
    this.createTippyInstance = () => {
      this.tippyInstance = menuListConfig.menuListConfig({
        anchor: this.anchorEl,
        content: this.contentEl,
        triggerElementWidth: false,
        appendTo: utils$1.getHighestContainerInDOM(),
        ...utils.defaultDropdownConfig,
        ...this.dropdownConfig,
        onShow: (instance) => {
          this.isDropdownVisible = true;
          if (this.dropdownConfig.onShow) {
            return this.dropdownConfig.onShow(instance);
          }
        },
        onHide: (instance) => {
          if (this.isSavedColorPopoverOpen)
            return false;
          this.isDropdownVisible = false;
          if (this.type === 'hex') {
            this.displayValue = this.hexColor.toUpperCase();
            this.wppChange.emit({ hexValue: this.hexColor, opacity: this.internalOpacity });
          }
          else {
            const rgbaValue = utils.hexToRGBA({ hexValue: this.hexColor, opacity: this.internalOpacity });
            this.displayValue = rgbaValue;
            this.wppChange.emit(rgbaValue);
          }
          this.hexOpacity = this.internalOpacity;
          if (this.dropdownConfig.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: () => {
          this.isInComponent = false;
          this.isDropdownVisible = false;
        },
        onClickOutside: (_, event) => {
          if (!this.contentEl)
            return;
          if (this.selectTippyInstance?.popper && utils$1.isEventTargetContained(this.selectTippyInstance?.popper, event)) {
            return;
          }
          this.tippyInstance?.hide();
        },
      });
    };
    this.handleSegmentChange = (event) => {
      const { value } = event.detail;
      if (value) {
        this.activeSegment = value;
      }
    };
    this.handleClickThemeColor = (color, colorCategory) => {
      this.hexColor = color.hexValue;
      this.internalOpacity = color.opacity;
      this.selectedCategory = colorCategory;
      this.getHsvValues();
    };
    this.handleChangeTypeOfPicker = (event) => {
      const { value } = event.detail;
      this.internalType = value;
    };
    this.handleSaveColor = () => {
      const hexWithOpacity = {
        hexValue: this.hexColor,
        opacity: this.internalOpacity,
      };
      const convertedColor = utils.hexToRGBA(hexWithOpacity);
      this.wppSaveColor.emit(convertedColor);
    };
    this.handleClickSavedColor = (savedColor) => {
      if (utils.isValid6DigitHex(savedColor)) {
        // Hex Color
        this.hexColor = savedColor;
        this.internalOpacity = '100%';
      }
      else {
        // RGBA Color
        const { hexValue, opacity } = utils.rgbaToHex(savedColor);
        this.hexColor = hexValue;
        this.internalOpacity = opacity;
      }
      this.getHsvValues();
    };
    this.handleRightClick = (event) => {
      event.preventDefault();
      const popoverElement = event.currentTarget.closest(utils$1.transformToVersionedTag('wpp-popover'));
      if (popoverElement) {
        popoverElement.openPopover();
      }
    };
    this.handleRemoveSavedColor = (savedColor) => {
      this.wppRemoveSavedColor.emit(savedColor);
      if (this.currentPopoverInstance) {
        this.currentPopoverInstance.hide();
      }
    };
    this.handleInputOpacityChange = (event) => {
      const inputEl = event.target;
      this.internalOpacity = inputEl.value;
    };
    this.handleInputHexChange = (event) => {
      const inputEl = event.target;
      const formattedValue = `#${inputEl.value.toUpperCase()}`;
      if (utils.isValid6DigitHex(formattedValue)) {
        this.hexColor = formattedValue;
        this.getHsvValues();
      }
      else {
        inputEl.value = this.hexColor.replace('#', '');
        console.warn(`The value: ${inputEl.value} is not a valid 6-digit hex value!`);
      }
    };
    this.handleInputRGBChange = (event) => {
      const inputEl = event.target;
      if (inputEl.name) {
        Object.keys(this.rgbInputValues).forEach(key => {
          if (key === inputEl.name) {
            this.rgbInputValues[key] = parseInt(inputEl.value);
          }
        });
      }
      this.hexColor = utils.rgbToHex(this.rgbInputValues.red, this.rgbInputValues.green, this.rgbInputValues.blue);
      this.getHsvValues();
    };
    this.hasColorOpacity = (color) => {
      if (utils.isValid6DigitHex(color))
        return false;
      const { opacity } = utils.rgbaToHex(color);
      return opacity !== '100%';
    };
    this.handleAnchorClick = () => {
      if (!this.disabled) {
        this.tippyInstance.show();
      }
    };
    this.onFocus = (event) => {
      this.isInComponent = true;
      this.wppFocus.emit(event);
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.wppBlur.emit();
    };
    this.hostCssClasses = () => ({
      'wpp-color-picker': true,
      'wpp-disabled': this.disabled,
      'wpp-active': this.isDropdownVisible,
    });
    this.dropdownCssClasses = () => ({
      'wpp-color-picker-dropdown': true,
    });
    this.colorBoxCssClasses = (color) => ({
      'wpp-color-box': true,
      'wpp-color-box-white': color.hexValue === '#FFFFFF',
      'wpp-color-box-selected': color.hexValue === this.hexColor && this.internalOpacity === color.opacity,
    });
    this.isDropdownVisible = false;
    this.internalOpacity = undefined;
    this.hexColor = undefined;
    this.rgbInputValues = undefined;
    this.hue = undefined;
    this.saturation = undefined;
    this.saturationValue = undefined;
    this.tippyInstance = undefined;
    this.activeSegment = 'theme';
    this.displayValue = undefined;
    this.internalType = undefined;
    this.isInComponent = false;
    this.initialColor = undefined;
    this.dropdownConfig = {};
    this.type = 'hex';
    this.mode = 'theme';
    this.hexOpacity = '100%';
    this.savedColors = [];
    this.themeColors = undefined;
    this.disabled = false;
  }
  handleHueChange(event) {
    if (this.tippyInstance?.popper && utils$1.isEventTargetContained(this.tippyInstance.popper, event)) {
      this.hue = event.detail;
      this.updateHexValue();
    }
  }
  handleSaturationChange(event) {
    if (this.tippyInstance?.popper && utils$1.isEventTargetContained(this.tippyInstance.popper, event)) {
      this.saturation = event.detail.saturation;
      this.saturationValue = event.detail.saturationValue;
      this.updateHexValue();
    }
  }
  handleOpacityChange(event) {
    if (this.tippyInstance?.popper && utils$1.isEventTargetContained(this.tippyInstance.popper, event)) {
      this.internalOpacity = `${parseInt(event.detail * 100 + '')}%`;
    }
  }
  handleHexColorChange() {
    if (this.mode !== 'theme') {
      this.getRGBValues();
    }
  }
  handleHexOpacityChange() {
    if (this.type === 'hex') {
      this.internalOpacity = this.hexOpacity;
    }
  }
  handleTypeChange() {
    if (this.type === 'hex') {
      this.displayValue = utils.rgbaToHex(this.displayValue).hexValue;
    }
    else {
      this.displayValue = utils.hexToRGBA({ hexValue: this.displayValue, opacity: this.internalOpacity });
    }
    this.internalType = this.type;
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.displayValue = this.isValidInitialColor()
      ? this.initialColor
      : this.type === 'hex'
        ? utils.DEFAULT_VALUE_HEX
        : utils.DEFAULT_VALUE_RGBA;
    this.internalType = this.type;
    if (this.mode === 'theme' || this.mode === 'theme and custom') {
      this.themeColorValues = this.themeColors?.content?.light?.color
        ? utils.getColorsForSections(this.themeColors.content.light.color)
        : utils.getColorsFromThemeOnPage(this.host);
      this.checkInitialColorInList();
    }
    if (this.type === 'hex') {
      this.hexColor = this.displayValue;
      this.internalOpacity = this.hexOpacity;
    }
    else {
      const { hexValue, opacity } = utils.rgbaToHex(this.displayValue);
      this.hexColor = hexValue;
      this.internalOpacity = opacity;
    }
    this.getHsvValues();
  }
  componentDidLoad() {
    this.createTippyInstance();
  }
  render() {
    return (index.h(index.Host, { "aria-disabled": this.disabled, class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, tabindex: this.disabled ? -1 : 0 }, index.h("div", { onClick: this.handleAnchorClick, class: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, index.h("div", { class: "color-container" }, index.h("div", { class: "color-preview" }, index.h("div", { style: { backgroundColor: this.displayValue, opacity: this.type === 'hex' ? this.hexOpacity : '1' }, class: "color-preview-box" }), index.h("wpp-icon-swatch-v3-6-0", { size: "s" })), index.h("wpp-typography-v3-6-0", { type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.displayValue)), this.type === 'hex' && (index.h("wpp-typography-v3-6-0", { class: "hex-opacity", type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.hexOpacity))), index.h("div", { class: this.dropdownCssClasses(), ref: elRef => (this.contentEl = elRef) }, this.mode === 'theme and custom' && (index.h("wpp-segmented-control-v3-6-0", { width: "346px", hugContentOff: true, size: "s", value: this.activeSegment, onWppChange: this.handleSegmentChange }, index.h("wpp-segmented-control-item-v3-6-0", { variant: "text", value: "theme" }, "Theme"), index.h("wpp-segmented-control-item-v3-6-0", { variant: "text", value: "custom" }, "Custom"))), (this.mode === 'custom' || (this.mode === 'theme and custom' && this.activeSegment === 'custom')) && (index.h("div", { class: "wpp-custom-picker" }, index.h("wpp-saturation-picker-v3-6-0", { hue: this.hue, saturation: this.saturation, value: this.saturationValue }), index.h("div", { class: "wpp-bottom-pickers" }, index.h("div", { class: "wpp-sliders" }, index.h("wpp-hue-slider-v3-6-0", { hue: this.hue }), index.h("wpp-opacity-slider-v3-6-0", { hexColor: this.hexColor, opacity: parseInt(this.internalOpacity) / 100 })), index.h("div", { class: "wpp-color-preview" }, index.h("div", { class: "wpp-color", style: { backgroundColor: this.hexColor, opacity: this.internalOpacity } }), index.h("wpp-icon-swatch-v3-6-0", null))), index.h("div", { class: "wpp-controls" }, this.isDropdownVisible && (index.h("wpp-select-v3-6-0", { size: "s", required: true, type: "single", value: this.internalType, onWppChange: this.handleChangeTypeOfPicker, dropdownConfig: {
        placement: 'bottom',
        onShow: (instance) => {
          this.selectTippyInstance = instance;
        },
        onHide: () => {
          this.selectTippyInstance = undefined;
        },
      }, list: [
        { value: 'hex', label: 'Hex' },
        { value: 'rgba', label: 'RGB' },
      ] })), this.internalType === 'hex' ? (index.h("wpp-input-v3-6-0", { class: "hex-input", size: "s", name: "hexValue", value: this.hexColor.replace('#', ''), onBlur: this.handleInputHexChange })) : (index.h(index.Fragment, null, utils.RGB_INPUTS.map((inputName) => (index.h("wpp-input-v3-6-0", { key: inputName, class: `${inputName}-input`, size: "s", name: inputName, type: "text", value: String(this.rgbInputValues[inputName]), maskOptions: utils.RGB_INPUT_CONFIG, onBlur: this.handleInputRGBChange }))))), index.h("wpp-input-v3-6-0", { class: "opacity-input", size: "s", name: "opacity", type: "text", maskOptions: utils.OPACITY_INPUT_CONFIG, value: this.internalOpacity, onBlur: this.handleInputOpacityChange })), index.h("div", { class: "wpp-saved-colors" }, index.h("wpp-typography-v3-6-0", { class: "title", type: "s-strong" }, "Saved colors"), index.h("div", { class: "wpp-colors" }, this.savedColors.map((savedColor) => (index.h("wpp-popover-v3-6-0", { config: {
        trigger: '',
        onShow: instance => {
          this.currentPopoverInstance = instance;
          this.isSavedColorPopoverOpen = true;
        },
        onHide: () => {
          this.isSavedColorPopoverOpen = false;
          this.currentPopoverInstance = undefined;
        },
      } }, index.h("div", { onContextMenu: event => this.handleRightClick(event), slot: "trigger-element", class: "saved-color", key: savedColor, onClick: () => this.handleClickSavedColor(savedColor) }, index.h("div", { class: "saved-color-preview", style: { backgroundColor: savedColor } }), this.hasColorOpacity(savedColor) && index.h("wpp-icon-swatch-v3-6-0", { size: "s" })), index.h("div", { class: "popover-content" }, index.h("wpp-list-item-v3-6-0", { onWppChangeListItem: () => this.handleRemoveSavedColor(savedColor) }, index.h("span", { slot: "label" }, "Remove color")))))), this.savedColors.length < utils.MAXIMUM_NUMBER_OF_SAVED_COLORS && (index.h("wpp-icon-plus-v3-6-0", { onClick: this.handleSaveColor })))))), (this.mode === 'theme' || (this.mode === 'theme and custom' && this.activeSegment === 'theme')) &&
      this.themeColorValues.map((colorSection) => (index.h("div", { key: colorSection.title, class: "wpp-color-section" }, index.h("wpp-typography-v3-6-0", { class: "wpp-color-section-title", type: "s-strong" }, colorSection.title), colorSection.colors.map((colorSubsection) => (index.h("div", { class: "wpp-color-subsection" }, colorSubsection.map((color) => (index.h("div", { key: color.hexValue, class: this.colorBoxCssClasses(color), onClick: () => this.handleClickThemeColor(color, colorSection.title) }, index.h("div", { class: "wpp-color-box-preview", style: { backgroundColor: color.hexValue, opacity: color.opacity } }), color.opacity !== '100%' && index.h("wpp-icon-swatch-v3-6-0", { size: "s" }), this.selectedCategory === colorSection.title &&
        this.hexColor === color.hexValue &&
        this.internalOpacity === color.opacity && (index.h("wpp-icon-tick-v3-6-0", { color: utils.contrastWithWhite(this.hexColor) < 3
          ? 'var(--wpp-grey-color-900)'
          : 'var(--wpp-white-color)' }))))))))))))));
  }
  static get registryIs() { return "wpp-color-picker-v3-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "hexColor": ["handleHexColorChange"],
    "hexOpacity": ["handleHexOpacityChange"],
    "type": ["handleTypeChange"],
    "isInComponent": ["updateIsInComponent"]
  }; }
};
WppColorPicker.style = wppColorPickerCss;

exports.wpp_color_picker = WppColorPicker;
