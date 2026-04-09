import { Host, h, Fragment } from '@stencil/core';
import { getColorsFromThemeOnPage, getColorsForSections, isValid6DigitHex, defaultDropdownConfig, DEFAULT_VALUE_HEX, DEFAULT_VALUE_RGBA, hexToRGBA, contrastWithWhite, rgbaToHex, hexToHsv, hsvToHex, MAXIMUM_NUMBER_OF_SAVED_COLORS, hexToRgb, rgbToHex, RGB_INPUTS, RGB_INPUT_CONFIG, OPACITY_INPUT_CONFIG, isValidRgba, } from './utils';
import { getHighestContainerInDOM, isEventTargetContained, transformToVersionedTag } from '../../utils/utils';
import { menuListConfig } from '../../common/menuListConfig';
export class WppColorPicker {
  constructor() {
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
    return (h(Host, { "aria-disabled": this.disabled, class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, tabindex: this.disabled ? -1 : 0 }, h("div", { onClick: this.handleAnchorClick, class: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, h("div", { class: "color-container" }, h("div", { class: "color-preview" }, h("div", { style: { backgroundColor: this.displayValue, opacity: this.type === 'hex' ? this.hexOpacity : '1' }, class: "color-preview-box" }), h("wpp-icon-swatch-v4-0-0", { size: "s" })), h("wpp-typography-v4-0-0", { type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.displayValue)), this.type === 'hex' && (h("wpp-typography-v4-0-0", { class: "hex-opacity", type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.hexOpacity))), h("div", { class: this.dropdownCssClasses(), ref: elRef => (this.contentEl = elRef) }, this.mode === 'theme and custom' && (h("wpp-segmented-control-v4-0-0", { width: "346px", hugContentOff: true, size: "s", value: this.activeSegment, onWppChange: this.handleSegmentChange }, h("wpp-segmented-control-item-v4-0-0", { variant: "text", value: "theme" }, "Theme"), h("wpp-segmented-control-item-v4-0-0", { variant: "text", value: "custom" }, "Custom"))), (this.mode === 'custom' || (this.mode === 'theme and custom' && this.activeSegment === 'custom')) && (h("div", { class: "wpp-custom-picker" }, h("wpp-saturation-picker-v4-0-0", { hue: this.hue, saturation: this.saturation, value: this.saturationValue }), h("div", { class: "wpp-bottom-pickers" }, h("div", { class: "wpp-sliders" }, h("wpp-hue-slider-v4-0-0", { hue: this.hue }), h("wpp-opacity-slider-v4-0-0", { hexColor: this.hexColor, opacity: parseInt(this.internalOpacity) / 100 })), h("div", { class: "wpp-color-preview" }, h("div", { class: "wpp-color", style: { backgroundColor: this.hexColor, opacity: this.internalOpacity } }), h("wpp-icon-swatch-v4-0-0", null))), h("div", { class: "wpp-controls" }, this.isDropdownVisible && (h("wpp-select-v4-0-0", { size: "s", required: true, type: "single", value: this.internalType, onWppChange: this.handleChangeTypeOfPicker, dropdownConfig: {
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
      ] })), this.internalType === 'hex' ? (h("wpp-input-v4-0-0", { class: "hex-input", size: "s", name: "hexValue", value: this.hexColor.replace('#', ''), onBlur: this.handleInputHexChange })) : (h(Fragment, null, RGB_INPUTS.map((inputName) => (h("wpp-input-v4-0-0", { key: inputName, class: `${inputName}-input`, size: "s", name: inputName, type: "text", value: String(this.rgbInputValues[inputName]), maskOptions: RGB_INPUT_CONFIG, onBlur: this.handleInputRGBChange }))))), h("wpp-input-v4-0-0", { class: "opacity-input", size: "s", name: "opacity", type: "text", maskOptions: OPACITY_INPUT_CONFIG, value: this.internalOpacity, onBlur: this.handleInputOpacityChange })), h("div", { class: "wpp-saved-colors" }, h("wpp-typography-v4-0-0", { class: "title", type: "s-strong" }, "Saved colors"), h("div", { class: "wpp-colors" }, this.savedColors.map((savedColor) => (h("wpp-popover-v4-0-0", { config: {
        trigger: '',
        onShow: instance => {
          this.currentPopoverInstance = instance;
          this.isSavedColorPopoverOpen = true;
        },
        onHide: () => {
          this.isSavedColorPopoverOpen = false;
          this.currentPopoverInstance = undefined;
        },
      } }, h("div", { onContextMenu: event => this.handleRightClick(event), slot: "trigger-element", class: "saved-color", key: savedColor, onClick: () => this.handleClickSavedColor(savedColor) }, h("div", { class: "saved-color-preview", style: { backgroundColor: savedColor } }), this.hasColorOpacity(savedColor) && h("wpp-icon-swatch-v4-0-0", { size: "s" })), h("div", { class: "popover-content" }, h("wpp-list-item-v4-0-0", { onWppChangeListItem: () => this.handleRemoveSavedColor(savedColor) }, h("span", { slot: "label" }, "Remove color")))))), this.savedColors.length < MAXIMUM_NUMBER_OF_SAVED_COLORS && (h("wpp-icon-plus-v4-0-0", { onClick: this.handleSaveColor })))))), (this.mode === 'theme' || (this.mode === 'theme and custom' && this.activeSegment === 'theme')) &&
      this.themeColorValues.map((colorSection) => (h("div", { key: colorSection.title, class: "wpp-color-section" }, h("wpp-typography-v4-0-0", { class: "wpp-color-section-title", type: "s-strong" }, colorSection.title), colorSection.colors.map((colorSubsection) => (h("div", { class: "wpp-color-subsection" }, colorSubsection.map((color) => (h("div", { key: color.hexValue, class: this.colorBoxCssClasses(color), onClick: () => this.handleClickThemeColor(color, colorSection.title) }, h("div", { class: "wpp-color-box-preview", style: { backgroundColor: color.hexValue, opacity: color.opacity } }), color.opacity !== '100%' && h("wpp-icon-swatch-v4-0-0", { size: "s" }), this.selectedCategory === colorSection.title &&
        this.hexColor === color.hexValue &&
        this.internalOpacity === color.opacity && (h("wpp-icon-tick-v4-0-0", { color: contrastWithWhite(this.hexColor) < 3
          ? 'var(--wpp-grey-color-900)'
          : 'var(--wpp-white-color)' }))))))))))))));
  }
  static get is() { return "wpp-color-picker"; }
  static get registryIs() { return "wpp-color-picker-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-color-picker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-color-picker.css"]
    };
  }
  static get properties() {
    return {
      "initialColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Used to display the initial color of the color-picker component. The color format must respect the type of the component!"
        },
        "attribute": "initial-color",
        "reflect": false
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "type": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "ColorPickerType",
          "resolved": "\"hex\" | \"rgba\"",
          "references": {
            "ColorPickerType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-color-picker/types.ts::ColorPickerType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The type of the color-picker. The default value is 'hex', meaning that the colors will be represented\nin 'hex' format (E.g: \"#0014CC\"). The other option is 'rgba' (E.g: \"rgba(0, 20, 204, 1)\")."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'hex'"
      },
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ColorPickerMode",
          "resolved": "\"custom\" | \"theme and custom\" | \"theme\"",
          "references": {
            "ColorPickerMode": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-color-picker/types.ts::ColorPickerMode"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The mode of the color-picker. The default value is \"theme\", meaning that the color-picker will display all the\ncolors from the app's theme. When mode is \"custom\", the user will have the Saturation picker,\nHue slider and Opacity slider and can pick any color. Finally, if mode = \"theme and custom\", both \"theme\" and \"custom\" modes are enabled."
        },
        "attribute": "mode",
        "reflect": true,
        "defaultValue": "'theme'"
      },
      "hexOpacity": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The opacity value for colors that are in 'hex' format. This property will not work for color values\nthat are in 'rgba' format, as the opacity is already present in that format."
        },
        "attribute": "hex-opacity",
        "reflect": false,
        "defaultValue": "'100%'"
      },
      "savedColors": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "This property represents a list of the saved colors which are going to be displayed under the custom color-picker in the dropdown.\nThis only works for the following modes: \"custom\" and \"theme and custom\". The color values must be valid \"hex\" or \"rgba\" values."
        },
        "defaultValue": "[]"
      },
      "themeColors": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Theme",
          "resolved": "Theme | undefined",
          "references": {
            "Theme": {
              "location": "import",
              "path": "../../types/theme",
              "id": "src/types/theme.ts::Theme"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "This property represents an object that contains the theme of the application. By default, the color-picker tries to\ntake the default theme data from its environment. However, if the theme contains additional configuration from the default one,\nlike custom color palettes, you need to pass it as a property here.\nNote: For OS-based application, this data is available in the \"osContext\" object."
        },
        "defaultValue": "undefined"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the color-picker is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "isDropdownVisible": {},
      "internalOpacity": {},
      "hexColor": {},
      "rgbInputValues": {},
      "hue": {},
      "saturation": {},
      "saturationValue": {},
      "tippyInstance": {},
      "activeSegment": {},
      "displayValue": {},
      "internalType": {},
      "isInComponent": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSaveColor",
        "name": "wppSaveColor",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"plus\" icon is clicked in the \"Saved colors\" section. The value emitted is in rgba format."
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "wppRemoveSavedColor",
        "name": "wppRemoveSavedColor",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"Remove color\" options is clicked in the color's popover. The popover is opened when the color\nelement from \"Saved colors\" is clicked"
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the color-picker is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the color-picker loses focus."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the color-picker selects a color to display. This happens when the dropdown of the color-picker\nis closed."
        },
        "complexType": {
          "original": "ChangeColorEventDetails",
          "resolved": "HexValueWithOpacity | string",
          "references": {
            "ChangeColorEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-color-picker/types.ts::ChangeColorEventDetails"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "hexColor",
        "methodName": "handleHexColorChange"
      }, {
        "propName": "hexOpacity",
        "methodName": "handleHexOpacityChange"
      }, {
        "propName": "type",
        "methodName": "handleTypeChange"
      }, {
        "propName": "isInComponent",
        "methodName": "updateIsInComponent"
      }];
  }
  static get listeners() {
    return [{
        "name": "hueChanged",
        "method": "handleHueChange",
        "target": "window",
        "capture": true,
        "passive": false
      }, {
        "name": "saturationChanged",
        "method": "handleSaturationChange",
        "target": "window",
        "capture": true,
        "passive": false
      }, {
        "name": "opacityChanged",
        "method": "handleOpacityChange",
        "target": "window",
        "capture": true,
        "passive": false
      }];
  }
}
