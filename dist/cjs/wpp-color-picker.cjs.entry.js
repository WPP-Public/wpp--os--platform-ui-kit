'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const utils = require('./utils-a9e9b7c3.js');
const utils$1 = require('./utils-8b2c3bc1.js');
const menuListConfig = require('./menuListConfig-ebbec952.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
require('./consts-d8f5ef98.js');
require('./tippy.esm-9d703cd4.js');
require('./theme-observer-4179316e.js');

const wppColorPickerCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;border-radius:var(--wpp-border-radius-s);width:220px;padding:4px 8px}:host .anchor:hover{background-color:var(--wpp-grey-color-200);cursor:pointer}:host .anchor:active{background-color:var(--wpp-grey-color-300)}:host .anchor .color-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .anchor .color-container .color-preview{-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:var(--wpp-border-radius-xs);width:24px;height:24px;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-400);margin-right:8px;overflow:hidden;position:relative}:host .anchor .color-container .color-preview .color-preview-box{position:absolute;left:0;top:0;width:100%;height:100%}:host(:focus-visible){border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-disabled) .anchor:hover{cursor:not-allowed;background-color:transparent}:host(.wpp-disabled) .anchor:active{background-color:transparent}:host(.wpp-disabled) .anchor .color-container .color-preview{opacity:0.4}:host(.wpp-active) .anchor{background-color:var(--wpp-grey-color-200)}";

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
    // Focus moves into the popup only when the keyboard opened it; a pointer user keeps focus where it was.
    this.isOpenedWithKeyboard = false;
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.contentEl);
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
        onShown: () => {
          if (this.isOpenedWithKeyboard)
            this.focusPopup();
          this.isOpenedWithKeyboard = false;
        },
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
    // Each theme section is an APG radio group: the arrow keys move to and select the previous or next swatch,
    // wrapping at the ends, and Space selects the focused one.
    this.handleThemeColorKeyDown = (event, colors, index, colorCategory) => {
      if (event.key === ' ') {
        event.preventDefault();
        this.handleClickThemeColor(colors[index], colorCategory);
        return;
      }
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      if (!step)
        return;
      event.preventDefault();
      const nextIndex = (index + step + colors.length) % colors.length;
      this.handleClickThemeColor(colors[nextIndex], colorCategory);
      event.currentTarget
        .closest('[role="radiogroup"]')
        ?.querySelectorAll('[role="radio"]')[nextIndex]?.focus();
    };
    this.isThemeColorChecked = (color, colorCategory) => this.selectedCategory === colorCategory &&
      this.hexColor === color.hexValue &&
      this.internalOpacity === color.opacity;
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
    this.getSavedColorValue = (savedColor) => utils.isValid6DigitHex(savedColor) ? { hexValue: savedColor, opacity: '100%' } : utils.rgbaToHex(savedColor);
    this.handleClickSavedColor = (savedColor) => {
      const { hexValue, opacity } = this.getSavedColorValue(savedColor);
      this.hexColor = hexValue;
      this.internalOpacity = opacity;
      this.getHsvValues();
    };
    // Enter or Space applies a saved color, Delete removes it, and the context menu key or Shift+F10 opens the
    // same menu as a right click.
    this.handleSavedColorKeyDown = (event, savedColor) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClickSavedColor(savedColor);
      }
      else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        this.handleRemoveSavedColor(savedColor);
      }
      else if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
        event.preventDefault();
        this.openSavedColorMenu(event.currentTarget);
      }
    };
    this.handleSaveColorKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      event.preventDefault();
      this.handleSaveColor();
    };
    this.handleRightClick = (event) => {
      event.preventDefault();
      this.openSavedColorMenu(event.currentTarget);
    };
    this.openSavedColorMenu = (savedColorEl) => {
      const popoverElement = savedColorEl.closest(utils$1.transformToVersionedTag('wpp-popover'));
      if (popoverElement) {
        popoverElement.openPopover();
      }
    };
    this.handleRemoveSavedColor = (savedColor) => {
      this.removedSavedColor = { color: savedColor, index: this.savedColors.indexOf(savedColor) };
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
    // The host is the trigger: a role="button" that opens the picker dialog with Enter, Space or ArrowDown, and
    // closes it again with Escape.
    this.handleHostKeyDown = (event) => {
      if (this.disabled)
        return;
      if (event.key === 'Escape' && this.isDropdownVisible) {
        event.preventDefault();
        this.tippyInstance?.hide();
        return;
      }
      if (!['Enter', ' ', 'ArrowDown'].includes(event.key) || this.isDropdownVisible)
        return;
      event.preventDefault();
      this.isOpenedWithKeyboard = true;
      this.tippyInstance?.show();
    };
    this.handlePopupKeyDown = (event) => {
      if (event.key !== 'Escape' || this.selectTippyInstance || this.isSavedColorPopoverOpen)
        return;
      event.preventDefault();
      event.stopPropagation();
      this.closePopupToTrigger();
    };
    this.closePopupToTrigger = () => {
      this.tippyInstance?.hide();
      this.host.focus();
    };
    // The popup is portaled to the end of the document, so it is not next to the trigger in the tab order.
    // Focus moves into it on keyboard open, and the sentinels at its edges close it again when Tab or Shift+Tab
    // would leave it, handing focus back to the trigger.
    this.focusPopup = () => {
      const target = this.contentEl?.querySelector('[role="tab"][tabindex="0"]') ??
        this.contentEl?.querySelector('[role="radio"][aria-checked="true"]') ??
        this.contentEl?.querySelector('[role="radio"][tabindex="0"]') ??
        this.contentEl
          ?.querySelector(utils$1.transformToVersionedTag('wpp-saturation-picker'))
          ?.shadowRoot?.querySelector('[role="slider"]');
      target?.focus();
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
    this.getRgbInputLabel = (inputName) => ({ red: this._locales.redLabel, green: this._locales.greenLabel, blue: this._locales.blueLabel })[inputName];
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
    this.locales = {};
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
      // Rounded, not truncated: 0.29 * 100 is 28.999…, which would pin a keyboard step to the value it left.
      this.internalOpacity = `${Math.round(event.detail * 100)}%`;
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
    this.themeSubscription.start();
    this.createTippyInstance();
  }
  componentDidRender() {
    if (!this.removedSavedColor || this.savedColors.includes(this.removedSavedColor.color))
      return;
    const savedColorEls = this.contentEl?.querySelectorAll('.saved-color');
    const target = savedColorEls?.[Math.min(this.removedSavedColor.index, savedColorEls.length - 1)] ??
      this.contentEl?.querySelector('.save-color');
    this.removedSavedColor = undefined;
    target?.focus();
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.tippyInstance?.destroy();
  }
  get _locales() {
    return utils$1.mergeLocales(utils.LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (index.h(index.Host, { role: "button", "aria-label": this._locales.pickerLabel(this.type === 'hex' ? `${this.displayValue}, ${this.hexOpacity}` : this.displayValue), "aria-haspopup": "dialog", "aria-expanded": this.isDropdownVisible ? 'true' : 'false', "aria-disabled": this.disabled, class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.handleHostKeyDown, tabindex: this.disabled ? -1 : 0 }, index.h("div", { onClick: this.handleAnchorClick, class: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, index.h("div", { class: "color-container" }, index.h("div", { class: "color-preview" }, index.h("div", { style: { backgroundColor: this.displayValue, opacity: this.type === 'hex' ? this.hexOpacity : '1' }, class: "color-preview-box" }), index.h("wpp-icon-swatch-v4-7-0", { size: "s" })), index.h("wpp-typography-v4-7-0", { type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : undefined }, this.displayValue)), this.type === 'hex' && (index.h("wpp-typography-v4-7-0", { class: "hex-opacity", type: "s-body", color: this.disabled ? 'var(--wpp-text-color-disabled)' : 'var(--wpp-grey-color-800)' }, this.hexOpacity))), index.h("div", { class: this.dropdownCssClasses(), ref: elRef => (this.contentEl = elRef), role: "dialog", "aria-label": this._locales.dialogLabel, onKeyDown: this.handlePopupKeyDown }, index.h("span", { class: "focus-sentinel", tabIndex: 0, onFocus: this.closePopupToTrigger }), this.mode === 'theme and custom' && (index.h("wpp-segmented-control-v4-7-0", { width: "346px", hugContentOff: true, size: "s", value: this.activeSegment, onWppChange: this.handleSegmentChange }, index.h("wpp-segmented-control-item-v4-7-0", { variant: "text", value: "theme" }, this._locales.themeTab), index.h("wpp-segmented-control-item-v4-7-0", { variant: "text", value: "custom" }, this._locales.customTab))), (this.mode === 'custom' || (this.mode === 'theme and custom' && this.activeSegment === 'custom')) && (index.h("div", { class: "wpp-custom-picker" }, index.h("wpp-saturation-picker-v4-7-0", { hue: this.hue, saturation: this.saturation, value: this.saturationValue, label: this._locales.saturationLabel, valueText: this._locales.saturationValueText(Math.round(this.saturation), Math.round(this.saturationValue)) }), index.h("div", { class: "wpp-bottom-pickers" }, index.h("div", { class: "wpp-sliders" }, index.h("wpp-hue-slider-v4-7-0", { hue: this.hue, label: this._locales.hueLabel }), index.h("wpp-opacity-slider-v4-7-0", { hexColor: this.hexColor, opacity: parseInt(this.internalOpacity) / 100, label: this._locales.opacityLabel })), index.h("div", { class: "wpp-color-preview" }, index.h("div", { class: "wpp-color", style: { backgroundColor: this.hexColor, opacity: this.internalOpacity } }), index.h("wpp-icon-swatch-v4-7-0", null))), index.h("div", { class: "wpp-controls" }, this.isDropdownVisible && (index.h("wpp-select-v4-7-0", { size: "s", required: true, type: "single", value: this.internalType, ariaProps: { label: this._locales.formatLabel }, onWppChange: this.handleChangeTypeOfPicker, dropdownConfig: {
        placement: 'bottom',
        onShow: (instance) => {
          this.selectTippyInstance = instance;
        },
        onHide: () => {
          this.selectTippyInstance = undefined;
        },
      }, list: [
        { value: 'hex', label: this._locales.hexFormat },
        { value: 'rgba', label: this._locales.rgbFormat },
      ] })), this.internalType === 'hex' ? (index.h("wpp-input-v4-7-0", { class: "hex-input", size: "s", name: "hexValue", ariaProps: { label: this._locales.hexLabel }, value: this.hexColor.replace('#', ''), onBlur: this.handleInputHexChange })) : (index.h(index.Fragment, null, utils.RGB_INPUTS.map((inputName) => (index.h("wpp-input-v4-7-0", { key: inputName, class: `${inputName}-input`, size: "s", name: inputName, type: "text", ariaProps: { label: this.getRgbInputLabel(inputName) }, value: String(this.rgbInputValues[inputName]), maskOptions: utils.RGB_INPUT_CONFIG, onBlur: this.handleInputRGBChange }))))), index.h("wpp-input-v4-7-0", { class: "opacity-input", size: "s", name: "opacity", type: "text", ariaProps: { label: this._locales.opacityLabel }, maskOptions: utils.OPACITY_INPUT_CONFIG, value: this.internalOpacity, onBlur: this.handleInputOpacityChange })), index.h("div", { class: "wpp-saved-colors" }, index.h("wpp-typography-v4-7-0", { class: "title", type: "s-strong" }, this._locales.savedColorsTitle), index.h("div", { class: "wpp-colors" }, this.savedColors.map((savedColor) => {
      const { hexValue, opacity } = this.getSavedColorValue(savedColor);
      return (index.h("wpp-popover-v4-7-0", { ariaProps: { role: 'dialog', label: this._locales.colorLabel(hexValue, opacity) }, config: {
          trigger: '',
          onShow: instance => {
            this.currentPopoverInstance = instance;
            this.isSavedColorPopoverOpen = true;
          },
          onHide: () => {
            this.isSavedColorPopoverOpen = false;
            this.currentPopoverInstance = undefined;
          },
        } }, index.h("div", { onContextMenu: event => this.handleRightClick(event), slot: "trigger-element", class: "saved-color", key: savedColor, tabIndex: 0, "aria-label": this._locales.colorLabel(hexValue, opacity), onClick: () => this.handleClickSavedColor(savedColor), onKeyDown: event => this.handleSavedColorKeyDown(event, savedColor) }, index.h("div", { class: "saved-color-preview", style: { backgroundColor: savedColor } }), this.hasColorOpacity(savedColor) && index.h("wpp-icon-swatch-v4-7-0", { size: "s" })), index.h("div", { class: "popover-content" }, index.h("wpp-list-item-v4-7-0", { onWppChangeListItem: () => this.handleRemoveSavedColor(savedColor) }, index.h("span", { slot: "label" }, this._locales.removeColorLabel)))));
    }), this.savedColors.length < utils.MAXIMUM_NUMBER_OF_SAVED_COLORS && (index.h("wpp-icon-plus-v4-7-0", { class: "save-color", role: "button", tabIndex: 0, "aria-label": this._locales.saveColorLabel, onClick: this.handleSaveColor, onKeyDown: this.handleSaveColorKeyDown })))))), (this.mode === 'theme' || (this.mode === 'theme and custom' && this.activeSegment === 'theme')) &&
      this.themeColorValues.map((colorSection) => {
        const colors = [].concat(...colorSection.colors);
        const hasCheckedColor = colors.some(color => this.isThemeColorChecked(color, colorSection.title));
        return (index.h("div", { key: colorSection.title, class: "wpp-color-section", role: "radiogroup", "aria-label": colorSection.title }, index.h("wpp-typography-v4-7-0", { class: "wpp-color-section-title", type: "s-strong", "aria-hidden": "true" }, colorSection.title), colorSection.colors.map((colorSubsection) => (index.h("div", { class: "wpp-color-subsection" }, colorSubsection.map((color) => {
          const index$1 = colors.indexOf(color);
          const isChecked = this.isThemeColorChecked(color, colorSection.title);
          return (index.h("div", { key: color.hexValue, class: this.colorBoxCssClasses(color), role: "radio", "aria-checked": isChecked ? 'true' : 'false', "aria-label": this._locales.colorLabel(color.hexValue, color.opacity), tabIndex: isChecked || (!hasCheckedColor && index$1 === 0) ? 0 : -1, onClick: () => this.handleClickThemeColor(color, colorSection.title), onKeyDown: event => this.handleThemeColorKeyDown(event, colors, index$1, colorSection.title) }, index.h("div", { class: "wpp-color-box-preview", style: { backgroundColor: color.hexValue, opacity: color.opacity } }), color.opacity !== '100%' && index.h("wpp-icon-swatch-v4-7-0", { size: "s" }), isChecked && (index.h("wpp-icon-tick-v4-7-0", { color: utils.contrastWithWhite(this.hexColor) < 3
              ? 'var(--wpp-grey-color-900)'
              : 'var(--wpp-white-color)' }))));
        }))))));
      }), index.h("span", { class: "focus-sentinel", tabIndex: 0, onFocus: this.closePopupToTrigger }))));
  }
  static get registryIs() { return "wpp-color-picker-v4-7-0"; }
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
