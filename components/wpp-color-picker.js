import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { r as rgbaToHex, i as isValid6DigitHex, a as isValidRgba, h as hsvToHex, b as hexToRgb, c as hexToHsv, d as defaultDropdownConfig, e as hexToRGBA, f as rgbToHex, D as DEFAULT_VALUE_HEX, g as DEFAULT_VALUE_RGBA, j as getColorsForSections, k as getColorsFromThemeOnPage, R as RGB_INPUTS, l as RGB_INPUT_CONFIG, O as OPACITY_INPUT_CONFIG, M as MAXIMUM_NUMBER_OF_SAVED_COLORS, m as contrastWithWhite, n as defineCustomElement$a } from './wpp-opacity-slider2.js';
import { w as getHighestContainerInDOM, b as isEventTargetContained, k as transformToVersionedTag } from './utils.js';
import { m as menuListConfig } from './menuListConfig.js';
import { d as defineCustomElement$w } from './wpp-action-button2.js';
import { d as defineCustomElement$v } from './wpp-checkbox2.js';
import { d as defineCustomElement$u } from './wpp-divider2.js';
import { d as defineCustomElement$t } from './wpp-hue-slider2.js';
import { d as defineCustomElement$s } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$r } from './wpp-icon-cross2.js';
import { d as defineCustomElement$q } from './wpp-icon-dash2.js';
import { d as defineCustomElement$p } from './wpp-icon-error2.js';
import { d as defineCustomElement$o } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$n } from './wpp-icon-plus2.js';
import { d as defineCustomElement$m } from './wpp-icon-search2.js';
import { d as defineCustomElement$l } from './wpp-icon-success2.js';
import { d as defineCustomElement$k } from './wpp-icon-swatch2.js';
import { d as defineCustomElement$j } from './wpp-icon-tick2.js';
import { d as defineCustomElement$i } from './wpp-icon-transparent2.js';
import { d as defineCustomElement$h } from './wpp-icon-warning2.js';
import { d as defineCustomElement$g } from './wpp-inline-message2.js';
import { d as defineCustomElement$f } from './wpp-input2.js';
import { d as defineCustomElement$e } from './wpp-internal-label2.js';
import { d as defineCustomElement$d } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$c } from './wpp-label2.js';
import { d as defineCustomElement$b } from './wpp-list-item2.js';
import { d as defineCustomElement$9 } from './wpp-popover2.js';
import { d as defineCustomElement$8 } from './wpp-saturation-picker2.js';
import { d as defineCustomElement$7 } from './wpp-segmented-control2.js';
import { d as defineCustomElement$6 } from './wpp-segmented-control-item2.js';
import { d as defineCustomElement$5 } from './wpp-select2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppColorPickerCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;border-radius:var(--wpp-border-radius-s);width:220px;padding:4px 8px}:host .anchor:hover{background-color:var(--wpp-grey-color-200);cursor:pointer}:host .anchor:active{background-color:var(--wpp-grey-color-300)}:host .anchor .color-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .anchor .color-container .color-preview{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:var(--wpp-border-radius-xs);width:24px;height:24px;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-400);margin-right:8px;overflow:hidden;position:relative}:host .anchor .color-container .color-preview .color-preview-box{position:absolute;left:0;top:0;width:100%;height:100%}:host .anchor .hex-opacity{--wpp-typography-color:var(--wpp-grey-color-800)}:host(.wpp-disabled) .anchor:hover{cursor:not-allowed;background-color:transparent}:host(.wpp-disabled) .anchor:active{background-color:transparent}:host(.wpp-disabled) .anchor .color-container .color-preview{opacity:0.4}:host(.wpp-active) .anchor{background-color:var(--wpp-grey-color-200)}";

const WppColorPicker$1 = /*@__PURE__*/ proxyCustomElement(class WppColorPicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSaveColor = createEvent(this, "wppSaveColor", 1);
    this.wppRemoveSavedColor = createEvent(this, "wppRemoveSavedColor", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.themeColorValues = [];
    this.isSavedColorPopoverOpen = false;
    this.checkInitialColorInList = () => {
      if (!this.initialColor)
        return;
      const transformedInitialValue = this.type === 'hex'
        ? { hexValue: this.initialColor, opacity: this.hexOpacity }
        : rgbaToHex(this.initialColor);
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
        return isValid6DigitHex(this.initialColor);
      }
      return isValidRgba(this.initialColor);
    };
    this.updateHexValue = () => {
      this.hexColor = hsvToHex(this.hue, this.saturation, this.saturationValue).toUpperCase();
    };
    this.getRGBValues = () => {
      this.rgbInputValues = hexToRgb(this.hexColor);
    };
    this.getHsvValues = () => {
      const { h, s, v } = hexToHsv(this.hexColor);
      this.hue = h;
      this.saturation = s;
      this.saturationValue = v;
    };
    this.createTippyInstance = () => {
      this.tippyInstance = menuListConfig({
        anchor: this.anchorEl,
        content: this.contentEl,
        triggerElementWidth: false,
        appendTo: getHighestContainerInDOM(),
        ...defaultDropdownConfig,
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
            const rgbaValue = hexToRGBA({ hexValue: this.hexColor, opacity: this.internalOpacity });
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
          if (this.selectTippyInstance?.popper && isEventTargetContained(this.selectTippyInstance?.popper, event)) {
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
      const convertedColor = hexToRGBA(hexWithOpacity);
      this.wppSaveColor.emit(convertedColor);
    };
    this.handleClickSavedColor = (savedColor) => {
      if (isValid6DigitHex(savedColor)) {
        // Hex Color
        this.hexColor = savedColor;
        this.internalOpacity = '100%';
      }
      else {
        // RGBA Color
        const { hexValue, opacity } = rgbaToHex(savedColor);
        this.hexColor = hexValue;
        this.internalOpacity = opacity;
      }
      this.getHsvValues();
    };
    this.handleRightClick = (event) => {
      event.preventDefault();
      const popoverElement = event.currentTarget.closest(transformToVersionedTag('wpp-popover'));
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
      if (isValid6DigitHex(formattedValue)) {
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
      this.hexColor = rgbToHex(this.rgbInputValues.red, this.rgbInputValues.green, this.rgbInputValues.blue);
      this.getHsvValues();
    };
    this.hasColorOpacity = (color) => {
      if (isValid6DigitHex(color))
        return false;
      const { opacity } = rgbaToHex(color);
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
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
      this.hue = event.detail;
      this.updateHexValue();
    }
  }
  handleSaturationChange(event) {
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
      this.saturation = event.detail.saturation;
      this.saturationValue = event.detail.saturationValue;
      this.updateHexValue();
    }
  }
  handleOpacityChange(event) {
    if (this.tippyInstance?.popper && isEventTargetContained(this.tippyInstance.popper, event)) {
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
      this.displayValue = rgbaToHex(this.displayValue).hexValue;
    }
    else {
      this.displayValue = hexToRGBA({ hexValue: this.displayValue, opacity: this.internalOpacity });
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
        ? DEFAULT_VALUE_HEX
        : DEFAULT_VALUE_RGBA;
    this.internalType = this.type;
    if (this.mode === 'theme' || this.mode === 'theme and custom') {
      this.themeColorValues = this.themeColors?.content?.light?.color
        ? getColorsForSections(this.themeColors.content.light.color)
        : getColorsFromThemeOnPage(this.host);
      this.checkInitialColorInList();
    }
    if (this.type === 'hex') {
      this.hexColor = this.displayValue;
      this.internalOpacity = this.hexOpacity;
    }
    else {
      const { hexValue, opacity } = rgbaToHex(this.displayValue);
      this.hexColor = hexValue;
      this.internalOpacity = opacity;
    }
    this.getHsvValues();
  }
  componentDidLoad() {
    this.createTippyInstance();
  }
  render() {
    return (h(Host, { "aria-disabled": this.disabled, class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, tabindex: this.disabled ? -1 : 0 }, h("div", { onClick: this.handleAnchorClick, class: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, h("div", { class: "color-container" }, h("div", { class: "color-preview" }, h("div", { style: { backgroundColor: this.displayValue, opacity: this.type === 'hex' ? this.hexOpacity : '1' }, class: "color-preview-box" }), h("wpp-icon-swatch-v3-3-0", { size: "s" })), h("wpp-typography-v3-3-0", { type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.displayValue)), this.type === 'hex' && (h("wpp-typography-v3-3-0", { class: "hex-opacity", type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.hexOpacity))), h("div", { class: this.dropdownCssClasses(), ref: elRef => (this.contentEl = elRef) }, this.mode === 'theme and custom' && (h("wpp-segmented-control-v3-3-0", { width: "346px", hugContentOff: true, size: "s", value: this.activeSegment, onWppChange: this.handleSegmentChange }, h("wpp-segmented-control-item-v3-3-0", { variant: "text", value: "theme" }, "Theme"), h("wpp-segmented-control-item-v3-3-0", { variant: "text", value: "custom" }, "Custom"))), (this.mode === 'custom' || (this.mode === 'theme and custom' && this.activeSegment === 'custom')) && (h("div", { class: "wpp-custom-picker" }, h("wpp-saturation-picker-v3-3-0", { hue: this.hue, saturation: this.saturation, value: this.saturationValue }), h("div", { class: "wpp-bottom-pickers" }, h("div", { class: "wpp-sliders" }, h("wpp-hue-slider-v3-3-0", { hue: this.hue }), h("wpp-opacity-slider-v3-3-0", { hexColor: this.hexColor, opacity: parseInt(this.internalOpacity) / 100 })), h("div", { class: "wpp-color-preview" }, h("div", { class: "wpp-color", style: { backgroundColor: this.hexColor, opacity: this.internalOpacity } }), h("wpp-icon-swatch-v3-3-0", null))), h("div", { class: "wpp-controls" }, this.isDropdownVisible && (h("wpp-select-v3-3-0", { size: "s", required: true, type: "single", value: this.internalType, onWppChange: this.handleChangeTypeOfPicker, dropdownConfig: {
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
      ] })), this.internalType === 'hex' ? (h("wpp-input-v3-3-0", { class: "hex-input", size: "s", name: "hexValue", value: this.hexColor.replace('#', ''), onBlur: this.handleInputHexChange })) : (h(Fragment, null, RGB_INPUTS.map((inputName) => (h("wpp-input-v3-3-0", { key: inputName, class: `${inputName}-input`, size: "s", name: inputName, type: "decimal", value: String(this.rgbInputValues[inputName]), maskOptions: RGB_INPUT_CONFIG, onBlur: this.handleInputRGBChange }))))), h("wpp-input-v3-3-0", { class: "opacity-input", size: "s", name: "opacity", type: "decimal", maskOptions: OPACITY_INPUT_CONFIG, value: this.internalOpacity, onBlur: this.handleInputOpacityChange })), h("div", { class: "wpp-saved-colors" }, h("wpp-typography-v3-3-0", { class: "title", type: "s-strong" }, "Saved colors"), h("div", { class: "wpp-colors" }, this.savedColors.map((savedColor) => (h("wpp-popover-v3-3-0", { config: {
        trigger: '',
        onShow: instance => {
          this.currentPopoverInstance = instance;
          this.isSavedColorPopoverOpen = true;
        },
        onHide: () => {
          this.isSavedColorPopoverOpen = false;
          this.currentPopoverInstance = undefined;
        },
      } }, h("div", { onContextMenu: event => this.handleRightClick(event), slot: "trigger-element", class: "saved-color", key: savedColor, onClick: () => this.handleClickSavedColor(savedColor) }, h("div", { class: "saved-color-preview", style: { backgroundColor: savedColor } }), this.hasColorOpacity(savedColor) && h("wpp-icon-swatch-v3-3-0", { size: "s" })), h("div", { class: "popover-content" }, h("wpp-list-item-v3-3-0", { onWppChangeListItem: () => this.handleRemoveSavedColor(savedColor) }, h("span", { slot: "label" }, "Remove color")))))), this.savedColors.length < MAXIMUM_NUMBER_OF_SAVED_COLORS && (h("wpp-icon-plus-v3-3-0", { onClick: this.handleSaveColor })))))), (this.mode === 'theme' || (this.mode === 'theme and custom' && this.activeSegment === 'theme')) &&
      this.themeColorValues.map((colorSection) => (h("div", { key: colorSection.title, class: "wpp-color-section" }, h("wpp-typography-v3-3-0", { class: "wpp-color-section-title", type: "s-strong" }, colorSection.title), colorSection.colors.map((colorSubsection) => (h("div", { class: "wpp-color-subsection" }, colorSubsection.map((color) => (h("div", { key: color.hexValue, class: this.colorBoxCssClasses(color), onClick: () => this.handleClickThemeColor(color, colorSection.title) }, h("div", { class: "wpp-color-box-preview", style: { backgroundColor: color.hexValue, opacity: color.opacity } }), color.opacity !== '100%' && h("wpp-icon-swatch-v3-3-0", { size: "s" }), this.selectedCategory === colorSection.title &&
        this.hexColor === color.hexValue &&
        this.internalOpacity === color.opacity && (h("wpp-icon-tick-v3-3-0", { color: contrastWithWhite(this.hexColor) < 3
          ? 'var(--wpp-grey-color-900)'
          : 'var(--wpp-white-color)' }))))))))))))));
  }
  static get registryIs() { return "wpp-color-picker-v3-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "hexColor": ["handleHexColorChange"],
    "hexOpacity": ["handleHexOpacityChange"],
    "type": ["handleTypeChange"],
    "isInComponent": ["updateIsInComponent"]
  }; }
  static get style() { return wppColorPickerCss; }
}, [1, "wpp-color-picker", "wpp-color-picker-v3-3-0", {
    "initialColor": [1, "initial-color"],
    "dropdownConfig": [1040],
    "type": [1537],
    "mode": [513],
    "hexOpacity": [1025, "hex-opacity"],
    "savedColors": [16],
    "themeColors": [16],
    "disabled": [516],
    "isDropdownVisible": [32],
    "internalOpacity": [32],
    "hexColor": [32],
    "rgbInputValues": [32],
    "hue": [32],
    "saturation": [32],
    "saturationValue": [32],
    "tippyInstance": [32],
    "activeSegment": [32],
    "displayValue": [32],
    "internalType": [32],
    "isInComponent": [32]
  }, [[10, "hueChanged", "handleHueChange"], [10, "saturationChanged", "handleSaturationChange"], [10, "opacityChanged", "handleOpacityChange"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-color-picker-v3-3-0", "wpp-action-button-v3-3-0", "wpp-checkbox-v3-3-0", "wpp-divider-v3-3-0", "wpp-hue-slider-v3-3-0", "wpp-icon-chevron-v3-3-0", "wpp-icon-cross-v3-3-0", "wpp-icon-dash-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-info-message-v3-3-0", "wpp-icon-plus-v3-3-0", "wpp-icon-search-v3-3-0", "wpp-icon-success-v3-3-0", "wpp-icon-swatch-v3-3-0", "wpp-icon-tick-v3-3-0", "wpp-icon-transparent-v3-3-0", "wpp-icon-warning-v3-3-0", "wpp-inline-message-v3-3-0", "wpp-input-v3-3-0", "wpp-internal-label-v3-3-0", "wpp-internal-tooltip-v3-3-0", "wpp-label-v3-3-0", "wpp-list-item-v3-3-0", "wpp-opacity-slider-v3-3-0", "wpp-popover-v3-3-0", "wpp-saturation-picker-v3-3-0", "wpp-segmented-control-v3-3-0", "wpp-segmented-control-item-v3-3-0", "wpp-select-v3-3-0", "wpp-spinner-v3-3-0", "wpp-tooltip-v3-3-0", "wpp-typography-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-color-picker-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppColorPicker$1);
      }
      break;
    case "wpp-action-button-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "wpp-checkbox-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "wpp-divider-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "wpp-hue-slider-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "wpp-icon-chevron-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "wpp-icon-cross-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "wpp-icon-dash-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-icon-info-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-plus-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-search-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-success-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-swatch-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-tick-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-transparent-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-inline-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-input-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-internal-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-label-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-list-item-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-opacity-slider-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-popover-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-saturation-picker-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-segmented-control-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-segmented-control-item-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-select-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppColorPicker = WppColorPicker$1;
const defineCustomElement = defineCustomElement$1;

export { WppColorPicker, defineCustomElement };
