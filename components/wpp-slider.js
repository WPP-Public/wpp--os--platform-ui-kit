import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$h } from './wpp-action-button2.js';
import { d as defineCustomElement$g } from './wpp-divider2.js';
import { d as defineCustomElement$f } from './wpp-icon-cross2.js';
import { d as defineCustomElement$e } from './wpp-icon-error2.js';
import { d as defineCustomElement$d } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$c } from './wpp-icon-search2.js';
import { d as defineCustomElement$b } from './wpp-icon-success2.js';
import { d as defineCustomElement$a } from './wpp-icon-warning2.js';
import { d as defineCustomElement$9 } from './wpp-inline-message2.js';
import { d as defineCustomElement$8 } from './wpp-input2.js';
import { d as defineCustomElement$7 } from './wpp-internal-label2.js';
import { d as defineCustomElement$6 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$5 } from './wpp-label2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const DEFAULT_INPUT_WIDTH = '68px';
const getDefaultMaskOptions = (step) => ({
  decimalSeparator: '.',
  thousandSeparator: '',
  precision: String(step).split('.')[1]?.length || 0,
});
const parseMaskedInput = (input, options) => {
  const { prefix = '', postfix = '', decimalSeparator = '.', thousandSeparator = '' } = options;
  let cleanedInput = input;
  if (prefix && cleanedInput.startsWith(prefix)) {
    cleanedInput = cleanedInput.slice(prefix.length);
  }
  if (postfix && cleanedInput.endsWith(postfix)) {
    cleanedInput = cleanedInput.slice(0, -postfix.length);
  }
  if (thousandSeparator) {
    const thousandSeparatorRegex = new RegExp(`\\${thousandSeparator}`, 'g');
    cleanedInput = cleanedInput.replace(thousandSeparatorRegex, '');
  }
  if (decimalSeparator !== '.') {
    const decimalSeparatorRegex = new RegExp(`\\${decimalSeparator}`);
    cleanedInput = cleanedInput.replace(decimalSeparatorRegex, '.');
  }
  const parsedNumber = Number(cleanedInput);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};
const formatDecimalWithMask = (value, options) => {
  const { prefix = '', postfix = '', decimalSeparator = '.', thousandSeparator = '' } = options;
  let formattedValue = String(value);
  if (decimalSeparator !== '.') {
    formattedValue = formattedValue.replace('.', decimalSeparator);
  }
  const parts = formattedValue.split(decimalSeparator);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  formattedValue = parts.join(decimalSeparator);
  return `${prefix}${formattedValue}${postfix}`;
};
const getMaskOptionsForInput = (sliderType, inputType, maskOptions) => {
  if (sliderType === 'single') {
    const options = maskOptions;
    return options ? options : { decimalSeparator: '.' };
  }
  else {
    if (inputType === 'min') {
      const options = maskOptions;
      if (!options)
        return { decimalSeparator: '.' };
      return options[0] ? options[0] : { decimalSeparator: '.' };
    }
    else {
      const options = maskOptions;
      if (!options)
        return { decimalSeparator: '.' };
      return options[1] ? options[1] : { decimalSeparator: '.' };
    }
  }
};

const wppSliderCss = ":host{--slider-width:var(--wpp-slider-width, 272px);--slider-handle-size:var(--wpp-slider-handle-size, 14px);--slider-handle-border-radius:var(--wpp-slider-handle-border-radius, var(--wpp-border-radius-round));--slider-handle-border-width:var(--wpp-slider-handle-border-width, 4px);--slider-handle-border-style:var(--wpp-slider-handle-border-style, solid);--slider-handle-border-color:var(--wpp-slider-handle-border-color, var(--wpp-brand-color));--slider-handle-border-color-hover:var(--wpp-slider-handle-border-color-hover, var(--wpp-brand-color-hover));--slider-handle-border-color-active:var(--wpp-slider-handle-border-color-active, var(--wpp-brand-color-active));--slider-handle-border-color-disabled:var(\n    --wpp-slider-handle-border-color-disabled,\n    var(--wpp-brand-color-disabled)\n  );--slider-handle-first-border-color-focus:var(\n    --wpp-slider-handle-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--slider-handle-second-border-color-focus:var(--wpp-slider-handle-second-border-color-focus, var(--wpp-brand-color));--slider-handle-bg-color:var(--wpp-slider-handle-bg-color, var(--wpp-grey-color-000));--slider-handle-bg-color-hover:var(--wpp-slider-handle-bg-color-hover, var(--wpp-primary-color-200));--slider-handle-bg-color-active:var(--wpp-slider-handle-bg-color-active, var(--wpp-brand-color-active));--slider-handle-bg-color-disabled:var(--wpp-slider-handle-bg-color-disabled, var(--wpp-grey-color-000));--slider-track-height:var(--wpp-slider-track-height, 4px);--slider-track-border-radius:var(--wpp-slider-track-border-radius, 4px);--slider-track-bg-color:var(--wpp-slider-track-bg-color, var(--wpp-grey-color-300));--slider-track-bg-color-active:var(--wpp-slider-track-bg-color-active, var(--wpp-brand-color));--slider-track-bg-color-disabled:var(--wpp-slider-track-bg-color-disabled, var(--wpp-brand-color-disabled));--slider-mark-size:var(--wpp-slider-mark-size, 8px);--slider-mark-border-radius:var(--wpp-slider-mark-border-radius, var(--wpp-border-radius-round));--slider-mark-label-margin:var(--wpp-slider-mark-label-margin, 8px);--slider-mark-label-color:var(--wpp-slider-mark-label-color, var(--wpp-text-color-info));--slider-mark-color:var(--wpp-slider-mark-color, var(--wpp-grey-color-300));--slider-mark-color-active:var(--wpp-slider-mark-color-active, var(--wpp-brand-color));--slider-mark-color-active-disabled:var(--wpp-slider-mark-color-active-disabled, var(--wpp-brand-color-disabled));--slider-mark-color-disabled:var(--wpp-slider-mark-color-disabled, var(--wpp-grey-color-300));--slider-input-text-color-disabled:var(--wpp-slider-input-text-color-disabled, var(--wpp-text-color-disabled));--slider-input-padding:var(\n    --wpp-slider-input-padding,\n    calc(5px - var(--slider-input-border-width)) calc(12px - var(--slider-input-border-width))\n  );--slider-clickable-wrapper-height:var(--wpp-slider-clickable-wrapper-height, 20px);--slider-label-margin:var(--wpp-slider-label-margin, 0 0 8px 0);--slider-value-wrapper-divider-margin:var(--wpp-slider-value-wrapper-divider-margin, 0 2px);--slider-input-wrapper-divider-margin:var(--wpp-slider-input-wrapper-divider-margin, 0 5px);--slider-divider-width:var(--wpp-slider-divider-width, 6px);--slider-divider-height:var(--wpp-slider-divider-height, 1.5px);--slider-divider-bg-color:var(--wpp-slider-divider-bg-color, var(--wpp-grey-color-600));--slider-divider-bg-color-disabled:var(--wpp-slider-divider-bg-color-disabled, var(--wpp-grey-color-500));--slider-single-input-width:var(--wpp-slider-single-input-width, 88px);--slider-range-input-width:var(--wpp-slider-range-input-width, 66px);--slider-input-border-color:var(--wpp-slider-input-border-color, var(--wpp-grey-color-600));--slider-input-border-color-hover:var(--wpp-slider-input-border-color-hover, var(--wpp-grey-color-700));--slider-input-border-color-active:var(--wpp-slider-input-border-color-active, var(--wpp-grey-color-800));--slider-input-border-color-disabled:var(--wpp-slider-input-border-color-disabled, var(--wpp-grey-color-400));--slider-input-bg-color:var(--wpp-slider-input-bg-color, transparent);--slider-input-bg-color-hover:var(--wpp-slider-input-bg-color-hover, var(--wpp-grey-color-200));--slider-input-bg-color-active:var(--wpp-slider-input-bg-color-active, var(--wpp-grey-color-000));--slider-input-bg-color-disabled:var(--wpp-slider-input-bg-color-disabled, var(--wpp-grey-color-100));--slider-input-border-width:var(--wpp-slider-input-border-width, var(--wpp-border-width-s));--slider-input-border-style:var(--wpp-slider-input-border-style, solid);--slider-editable-input-gap:var(--wpp-slider-editable-input-gap, 20px);--slider-editable-input-height:var(--wpp-slider-editable-input-height, 40px);--slider-editable-input-height-s:var(--wpp-slider-editable-input-height-s, 32px);--slider-marks-list-height:var(--wpp-slider-marks-list-height, 20px);--slider-marks-list-height-s:var(--wpp-slider-marks-list-height-s, 12px);--slider-size-s-offset:var(--wpp-slider-size-s-offset, -4px);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .slider-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;gap:var(--slider-editable-input-gap)}:host .slider-column{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--slider-width)}:host .input-column{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:var(--slider-editable-input-height)}:host .input-column.size-s{height:var(--slider-editable-input-height-s)}:host .single-slider-wrapper,:host .range-slider-wrapper,:host .middle-range-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:var(--slider-clickable-wrapper-height)}:host .single-slider-wrapper input[type=range],:host .range-slider-wrapper input[type=range],:host .middle-range-wrapper input[type=range]{-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;height:var(--slider-track-height);width:var(--slider-width);border-radius:var(--slider-track-border-radius);margin:0;-webkit-box-sizing:border-box;box-sizing:border-box}:host .single-slider-wrapper input[type=range]:disabled::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range]:disabled::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range]:disabled::-webkit-slider-thumb{pointer-events:none;background-color:var(--slider-handle-bg-color-disabled);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-disabled)}:host .single-slider-wrapper input[type=range]:disabled::-moz-range-thumb,:host .range-slider-wrapper input[type=range]:disabled::-moz-range-thumb,:host .middle-range-wrapper input[type=range]:disabled::-moz-range-thumb{pointer-events:none;background-color:var(--slider-handle-bg-color-disabled);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-disabled)}:host .single-slider-wrapper input[type=range]:disabled::-webkit-slider-runnable-track,:host .range-slider-wrapper input[type=range]:disabled::-webkit-slider-runnable-track,:host .middle-range-wrapper input[type=range]:disabled::-webkit-slider-runnable-track{cursor:not-allowed}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb{-webkit-box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus);box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover{-webkit-box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus);box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb{background-color:var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-webkit-slider-thumb:hover,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-webkit-slider-thumb:hover{background-color:var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb{box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover{box-shadow:0 0 0 var(--slider-handle-border-width) var(--slider-handle-border-color), 0 0 0 calc(var(--slider-handle-border-width) + 1px) var(--slider-handle-first-border-color-focus), 0 0 0 calc(var(--slider-handle-border-width) + 1px + 2px) var(--slider-handle-second-border-color-focus)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb{background-color:var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .single-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover,:host .range-slider-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .range-slider-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover,:host .middle-range-wrapper input[type=range].min-range-tab-focus::-moz-range-thumb:hover,:host .middle-range-wrapper input[type=range].max-range-tab-focus::-moz-range-thumb:hover{background-color:var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range]::-webkit-slider-runnable-track,:host .range-slider-wrapper input[type=range]::-webkit-slider-runnable-track,:host .middle-range-wrapper input[type=range]::-webkit-slider-runnable-track{cursor:pointer}:host .single-slider-wrapper input[type=range]::-webkit-slider-thumb,:host .range-slider-wrapper input[type=range]::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:var(--slider-handle-size);height:var(--slider-handle-size);border-radius:var(--slider-handle-border-radius);background-color:var(--slider-handle-bg-color);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;border:var(--slider-handle-border-width) solid var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range]::-webkit-slider-thumb:hover,:host .range-slider-wrapper input[type=range]::-webkit-slider-thumb:hover,:host .middle-range-wrapper input[type=range]::-webkit-slider-thumb:hover{background-color:var(--slider-handle-bg-color-hover);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-hover)}:host .single-slider-wrapper input[type=range]::-webkit-slider-thumb:active,:host .range-slider-wrapper input[type=range]::-webkit-slider-thumb:active,:host .middle-range-wrapper input[type=range]::-webkit-slider-thumb:active{background-color:var(--slider-handle-bg-color-active);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-active)}:host .single-slider-wrapper input[type=range]::-moz-range-thumb,:host .range-slider-wrapper input[type=range]::-moz-range-thumb,:host .middle-range-wrapper input[type=range]::-moz-range-thumb{box-sizing:border-box;width:var(--slider-handle-size);height:var(--slider-handle-size);border-radius:var(--slider-handle-border-radius);background-color:var(--slider-handle-bg-color);cursor:pointer;border:var(--slider-handle-border-width) solid var(--slider-handle-border-color)}:host .single-slider-wrapper input[type=range]::-moz-range-thumb:hover,:host .range-slider-wrapper input[type=range]::-moz-range-thumb:hover,:host .middle-range-wrapper input[type=range]::-moz-range-thumb:hover{background-color:var(--slider-handle-bg-color-hover);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-hover)}:host .single-slider-wrapper input[type=range]::-moz-range-thumb:active,:host .range-slider-wrapper input[type=range]::-moz-range-thumb:active,:host .middle-range-wrapper input[type=range]::-moz-range-thumb:active{background-color:var(--slider-handle-bg-color-active);border:var(--slider-handle-border-width) solid var(--slider-handle-border-color-active)}:host .single-slider-wrapper input[type=range]::-moz-range-track,:host .range-slider-wrapper input[type=range]::-moz-range-track,:host .middle-range-wrapper input[type=range]::-moz-range-track{cursor:pointer}:host .single-slider-wrapper .slider-clickable-wrapper,:host .range-slider-wrapper .slider-clickable-wrapper,:host .middle-range-wrapper .slider-clickable-wrapper{position:absolute;height:var(--slider-clickable-wrapper-height);width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);cursor:pointer}:host .single-slider-wrapper .slider,:host .range-slider-wrapper .slider,:host .middle-range-wrapper .slider{z-index:1}:host .single-slider-wrapper.disabled .slider-clickable-wrapper,:host .range-slider-wrapper.disabled .slider-clickable-wrapper,:host .middle-range-wrapper.disabled .slider-clickable-wrapper{cursor:not-allowed}:host .single-slider-wrapper input[type=range]{background:-webkit-gradient(linear, left top, right top, from(var(--slider-track-bg-color-active)), to(var(--slider-track-bg-color)));background:linear-gradient(to right, var(--slider-track-bg-color-active) var(--active-single-progress-bar), var(--slider-track-bg-color) var(--active-single-progress-bar))}:host .single-slider-wrapper input[type=range]:disabled{background:-webkit-gradient(linear, left top, right top, from(var(--slider-track-bg-color-disabled)), to(var(--slider-track-bg-color)));background:linear-gradient(to right, var(--slider-track-bg-color-disabled) var(--active-single-progress-bar), var(--slider-track-bg-color) var(--active-single-progress-bar))}:host .range-slider-wrapper,:host .middle-range-wrapper{height:var(--slider-clickable-wrapper-height);border-radius:var(--slider-track-border-radius)}:host .range-slider-wrapper.disabled,:host .middle-range-wrapper.disabled{cursor:not-allowed}:host .range-slider-wrapper input[type=range],:host .middle-range-wrapper input[type=range]{pointer-events:none;position:absolute;background:-webkit-gradient(linear, left top, right top, from(var(--slider-track-bg-color)), color-stop(var(--slider-track-bg-color-active)), color-stop(var(--slider-track-bg-color-active)), to(var(--slider-track-bg-color)));background:linear-gradient(to right, var(--slider-track-bg-color) var(--active-range-from-progress-bar), var(--slider-track-bg-color-active) var(--active-range-from-progress-bar), var(--slider-track-bg-color-active) var(--active-range-to-progress-bar), var(--slider-track-bg-color) var(--active-range-to-progress-bar))}:host .range-slider-wrapper input[type=range]:disabled,:host .middle-range-wrapper input[type=range]:disabled{background:-webkit-gradient(linear, left top, right top, from(var(--slider-track-bg-color)), color-stop(var(--slider-track-bg-color-disabled)), color-stop(var(--slider-track-bg-color-disabled)), to(var(--slider-track-bg-color)));background:linear-gradient(to right, var(--slider-track-bg-color) var(--active-range-from-progress-bar), var(--slider-track-bg-color-disabled) var(--active-range-from-progress-bar), var(--slider-track-bg-color-disabled) var(--active-range-to-progress-bar), var(--slider-track-bg-color) var(--active-range-to-progress-bar))}:host .range-slider-wrapper input[type=range]::-webkit-slider-thumb,:host .middle-range-wrapper input[type=range]::-webkit-slider-thumb{pointer-events:auto}:host .range-slider-wrapper input[type=range]::-moz-range-thumb,:host .middle-range-wrapper input[type=range]::-moz-range-thumb{pointer-events:auto}:host .marks-list{width:var(--slider-width);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative;height:var(--slider-marks-list-height)}:host .marks-list.size-s{-ms-flex-align:baseline;align-items:baseline;height:var(--slider-marks-list-height-s)}:host .marks-list .mark-item{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1}:host .marks-list .mark-item:first-child,:host .marks-list .mark-item:last-child{-ms-flex:0.5;flex:0.5}:host .marks-list .mark-item .circle{position:absolute;top:calc((var(--slider-track-height) + var(--slider-track-height) / 2 + var(--slider-mark-label-margin)) * -1);left:var(--mark-left-dynamic)}:host .marks-list .mark-item .circle .mark{width:var(--slider-mark-size);height:var(--slider-mark-size);border-radius:var(--slider-mark-border-radius);background-color:var(--slider-mark-color);cursor:pointer}:host .marks-list .mark-item .label-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;min-width:0;-ms-flex-negative:0;flex-shrink:0}:host .marks-list .mark-item .label{position:relative;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;cursor:pointer;color:var(--slider-mark-label-color);width:100%;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:var(--label-max-width, 100%)}:host .marks-list .mark-item .label.size-s{top:var(--slider-size-s-offset)}:host .marks-list .mark-item.middle-mark-active{z-index:1}:host .marks-list .mark-item.active .mark{background-color:var(--slider-mark-color-active)}:host .marks-list .mark-item.active.disabled .mark{background-color:var(--slider-mark-color-active-disabled)}:host .marks-list .mark-item.disabled{pointer-events:none}:host .marks-list .mark-item.disabled .mark{background-color:var(--slider-mark-color-disabled)}:host .marks-list .mark-item.first .label-container,:host .marks-list .mark-item.first .label{-ms-flex-pack:start;justify-content:flex-start}:host .marks-list .mark-item.last .label-container,:host .marks-list .mark-item.last .label{-ms-flex-pack:end;justify-content:flex-end}:host .marks-list .mark-item.first .circle{left:0}:host .marks-list .mark-item.last .circle{left:calc(100% - var(--slider-mark-size))}:host .with-value,:host .with-input{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .with-value .wpp-label .label-wrapper,:host .with-input .wpp-label .label-wrapper{margin:0;--label-s-strong-text-margin:0px}:host .with-value .wpp-label,:host .with-input .wpp-label{margin:0}:host .inputs-range .wpp-divider{-ms-flex-negative:0;flex-shrink:0}:host .with-value{width:var(--slider-width);-ms-flex-pack:justify;justify-content:space-between}:host .with-value.disabled .wpp-typography{pointer-events:none;color:var(--wpp-text-color-disabled)}:host .with-value .range-value-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .with-value .range-value-wrapper .wpp-divider{margin:var(--slider-value-wrapper-divider-margin)}:host .slider-control.with-value{margin-bottom:8px}:host .with-input .range-input-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .with-input .range-input-wrapper input{width:var(--slider-range-input-width)}:host .with-input .range-input-wrapper .wpp-divider{margin:var(--slider-input-wrapper-divider-margin)}:host .with-input input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--slider-single-input-width);padding:var(--slider-input-padding);text-align:end;background-color:var(--slider-input-bg-color);border:var(--slider-input-border-width) var(--slider-input-border-style) var(--slider-input-border-color);border-radius:var(--wpp-border-radius-m);outline:none}:host .with-input input:hover{background:var(--slider-input-bg-color-hover);border:var(--slider-input-border-width) var(--slider-input-border-style) var(--slider-input-border-color-hover)}:host .with-input input:active{border:var(--slider-input-border-width) var(--slider-input-border-style) var(--slider-input-border-color-active)}:host .with-input input::-webkit-input-placeholder{color:var(--slider-input-placeholder-color)}:host .with-input input::-moz-placeholder{color:var(--slider-input-placeholder-color)}:host .with-input input:-ms-input-placeholder{color:var(--slider-input-placeholder-color)}:host .with-input input::-ms-input-placeholder{color:var(--slider-input-placeholder-color)}:host .with-input input::placeholder{color:var(--slider-input-placeholder-color)}:host .with-input input:focus{background:var(--slider-input-bg-color-active);border:var(--slider-input-border-width) var(--slider-input-border-style) var(--slider-input-border-color-active)}:host .with-input input:disabled{color:var(--slider-input-text-color-disabled);background:var(--slider-input-bg-color-disabled);border:var(--slider-input-border-width) var(--slider-input-border-style) var(--slider-input-border-color-disabled);cursor:not-allowed}:host .with-input input:disabled::-webkit-input-placeholder{color:var(--slider-input-text-color-disabled)}:host .with-input input:disabled::-moz-placeholder{color:var(--slider-input-text-color-disabled)}:host .with-input input:disabled:-ms-input-placeholder{color:var(--slider-input-text-color-disabled)}:host .with-input input:disabled::-ms-input-placeholder{color:var(--slider-input-text-color-disabled)}:host .with-input input:disabled::placeholder{color:var(--slider-input-text-color-disabled)}:host .with-input input::-webkit-outer-spin-button,:host .with-input input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;appearance:none}:host .with-input input[type=number]{-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;height:var(--slider-editable-input-height)}:host .with-input input[type=number].size-s{height:var(--slider-editable-input-height-s)}:host .wpp-label{margin:var(--slider-label-margin)}:host .wpp-divider{width:var(--slider-divider-width);--divider-height:var(--slider-divider-height);--divider-bg-color:var(--slider-divider-bg-color)}:host .wpp-divider.wpp-disabled{--divider-bg-color:var(--slider-divider-bg-color-disabled)}";

const getInitFocusInfo = () => ({
  min: FOCUS_TYPE.NONE,
  max: FOCUS_TYPE.NONE,
});
const WppSlider$1 = /*@__PURE__*/ proxyCustomElement(class WppSlider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.segmentWidth = 0;
    this.totalWidth = 0;
    /* For slider with type="middle-range" */
    this.middleValue = 0;
    this.getMidValueRespectingStep = () => {
      const range = this.max - this.min;
      const half = range / 2;
      // Round to the nearest valid step increment
      const stepsFromMin = Math.round(half / this.step);
      const middle = this.min + stepsFromMin * this.step;
      return Math.min(this.max, Math.max(this.min, Number(middle.toFixed(2))));
    };
    this.computeSegmentWidth = () => {
      if (!this.clickableAreaRef)
        return;
      this.totalWidth = this.clickableAreaRef.clientWidth;
      const numberOfSegments = Math.ceil((this.max - this.min) / this.step);
      this.segmentWidth = this.totalWidth / numberOfSegments;
    };
    this.onUpdateMinMaxValues = (valueType, newValue) => {
      this.handleType({
        single: () => {
          this.value = newValue;
        },
        range: value => {
          if (valueType === 'min') {
            this.value = [Math.max(newValue, value[0]), value[1]];
          }
          if (valueType === 'max') {
            this.value = [value[0], Math.min(newValue, value[1])];
          }
        },
        'middle-range': () => {
          this.value = newValue;
          this.middleValue = this.getMidValueRespectingStep();
        },
      });
      this.computeSegmentWidth();
      this.getDisplayMarks();
    };
    this.handleType = (handlers) => {
      if (this.type === 'middle-range') {
        return handlers['middle-range'](this.value);
      }
      if (this.type === 'range' && Array.isArray(this.value)) {
        return handlers.range(this.value);
      }
      return handlers.single(this.value);
    };
    this.getSliderInputValue = () => Array.isArray(this.value) ? this.value.map(String) : String(this.value);
    this.getDisplayMarks = () => {
      let marks;
      if (Array.isArray(this.marks)) {
        marks = this.continuous
          ? [this.marks[0], this.marks[this.marks.length - 1]]
          : this.marks
            .sort((a, b) => a.value - b.value)
            .filter(mark => mark.value <= this.max && mark.value >= this.min);
      }
      else {
        marks = this.continuous
          ? [
            { value: this.min, label: this.min },
            { value: this.max, label: this.max },
          ]
          : [...Array(Math.floor((this.max - this.min) / this.step) + 1)].map((_, i) => ({
            value: this.min + i * this.step,
            label: this.min + i * this.step,
          }));
      }
      marks = marks.map(mark => ({
        ...mark,
        position: this.calculateProgressBar(mark.value),
      }));
      this.displayMarks = marks;
      this.applyTruncationToMarks();
    };
    /**
     * @method applyTruncationToMarks
     * Measures internal label elements to determine if text is truncated.
     * Sets tooltipTexts accordingly to enable tooltips for truncated labels.
     */
    this.applyTruncationToMarks = () => {
      requestAnimationFrame(() => {
        this.computeSegmentWidth();
        const newTooltipTexts = {};
        const totalMarks = this.displayMarks.length;
        const marks = this.marksListRef?.querySelectorAll(`${transformToVersionedTag('wpp-typography')}[part="label"]`);
        if (!marks)
          return;
        this.displayMarks.forEach((mark, index) => {
          const labelElement = Array.from(marks).find(item => item.id.includes(`${mark.value}`));
          if (labelElement && typeof mark.label === 'string') {
            const typographySpan = labelElement.shadowRoot?.querySelector('[part="typography"]');
            if (typographySpan) {
              const flexUnits = index === 0 || index === totalMarks - 1 ? 0.45 : 0.95;
              const maxWidth = flexUnits * this.segmentWidth;
              const labelContainer = labelElement.parentElement;
              if (labelContainer) {
                if (labelContainer.style?.setProperty) {
                  labelContainer.style?.setProperty('--label-max-width', `${maxWidth}px`);
                }
              }
              const isOverflowing = typographySpan.scrollWidth > maxWidth;
              if (isOverflowing) {
                newTooltipTexts[mark.value] = mark.label;
              }
            }
          }
        });
        this.tooltipTexts = newTooltipTexts;
      });
    };
    this.updateSingleSliderValue = (nearestLowerValue) => {
      // This function is called only for single and middle-range sliders,
      // when the input value changes (after onBlur).
      const newValue = Math.max(Math.min(nearestLowerValue, this.max), this.min);
      if (this.value === newValue) {
        this.onUpdateInputValue(this.inputValue);
      }
      else {
        this.value = newValue;
      }
    };
    // Function used to get the nearest lower value based on step
    this.getNearestLowerValue = (value) => Math.floor((value - this.min) / this.step) * this.step + this.min;
    this.handleInputChange = (type) => (event) => {
      // We validate the value of the input only onBlur
      const target = event.target;
      const inputMaskOptions = getMaskOptionsForInput(this.type, type, this.maskOptions);
      const inputValue = parseMaskedInput(target.value, inputMaskOptions);
      if (target.value === '' ||
        target.value === inputMaskOptions?.postfix ||
        target.value === inputMaskOptions?.prefix) {
        this.handleType({
          single: value => {
            this.onUpdateInputValue(String(value));
          },
          range: value => {
            this.value = value;
          },
          'middle-range': value => {
            this.onUpdateInputValue(String(value));
          },
        });
        return;
      }
      const nearestLowerValue = this.getNearestLowerValue(inputValue);
      this.handleType({
        single: () => this.updateSingleSliderValue(nearestLowerValue),
        range: value => {
          if (type === 'min') {
            const newValue = Math.min(Math.max(nearestLowerValue, this.min), value[1] - this.step);
            this.value = [newValue, value[1]];
          }
          if (type === 'max') {
            const newValue = Math.max(Math.min(nearestLowerValue, this.max), value[0] + this.step);
            this.value = [value[0], newValue];
          }
        },
        'middle-range': () => this.updateSingleSliderValue(nearestLowerValue),
      });
      this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
      });
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.getSliderType = (target) => {
      if (target.classList.contains('min-input')) {
        return 'min';
      }
      if (target.classList.contains('max-input')) {
        return 'max';
      }
      return null;
    };
    this.handleBlur = (event) => {
      this.focusType = getInitFocusInfo();
      const target = event.target;
      const type = this.getSliderType(target);
      if (type) {
        this.handleInputChange(type)(event);
      }
      else {
        this.handleInputChange()(event);
      }
      this.wppBlur.emit(event);
    };
    this.handleFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.handleInputBlur = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.NONE);
    };
    this.handleInputMouseDown = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.MOUSE);
    };
    this.handleInputKeyUp = (event, type) => {
      if (event.key === 'Tab')
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
    };
    this.handleMarkClick = (event, mark) => {
      event.stopPropagation();
      this.handleType({
        single: () => {
          this.value = this.getNearestLowerValue(mark.value);
        },
        range: value => {
          const distanceToTheStart = Math.abs(value[0] - mark.value);
          const distanceToTheEnd = Math.abs(value[1] - mark.value);
          if (distanceToTheStart <= distanceToTheEnd) {
            this.value = [mark.value, value[1]];
          }
          else {
            this.value = [value[0], mark.value];
          }
        },
        'middle-range': () => {
          this.value = this.getNearestLowerValue(mark.value);
        },
      });
      this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
      });
    };
    this.handleSliderWrapperClick = (event) => {
      if (this.disabled || this.segmentWidth === 0)
        return;
      const clickedSegmentPosition = 1 + event.offsetX / this.segmentWidth;
      const clickedSegmentNumber = Math.trunc(clickedSegmentPosition);
      // This value determines which half of the segment was clicked. -1 means that the first half was clicked and that the clicked segment
      // is placed on the right of the mark, so we should approximate to the starting mark of the segment (left one).
      const halfOfSegment = clickedSegmentPosition >= Math.round(clickedSegmentPosition) ? -1 : 0;
      const clickedValue = this.min + (clickedSegmentNumber + halfOfSegment) * this.step;
      this.handleType({
        single: () => {
          this.value = Math.round(clickedValue);
          this.inputValue = String(this.value);
        },
        range: value => {
          const distanceFromEndThumb = Math.abs(clickedValue - value[1]);
          const distanceFromStartThumb = Math.abs(clickedValue - value[0]);
          if (distanceFromEndThumb === distanceFromStartThumb) {
            if (halfOfSegment === -1) {
              this.value = [value[0], clickedValue];
            }
            else {
              this.value = [clickedValue, value[1]];
            }
          }
          if (clickedValue > value[1] || distanceFromEndThumb < distanceFromStartThumb) {
            this.value = [value[0], clickedValue];
          }
          if (clickedValue < value[0] || distanceFromEndThumb > distanceFromStartThumb) {
            this.value = [clickedValue, value[1]];
          }
          this.inputValue = this.value.map(String);
        },
        'middle-range': () => {
          this.value = Math.round(clickedValue);
          this.inputValue = String(this.value);
        },
      });
      this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
      });
    };
    this.handleSingleSliderChange = (event) => {
      this.value = Number(event.target.value);
      this.inputValue = String(this.value);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
      });
    };
    this.handleRangeSliderChange = (type) => (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      this.handleType({
        single: () => { },
        range: value => {
          if (type === 'min') {
            this.value = [Math.min(value[1] - this.step, Number(target.value)), value[1]];
            target.value = String(Math.min(this.value[1] - this.step, Number(target.value)));
          }
          if (type === 'max') {
            this.value = [value[0], Math.max(value[0] + this.step, Number(target.value))];
            target.value = String(Math.max(this.value[0] + this.step, Number(target.value)));
          }
        },
        'middle-range': () => {
          this.value = Number(event.target.value);
        },
      });
      this.wppChange.emit({
        value: this.value,
        name: this.name,
        ...(this.type === 'middle-range' ? { middleValue: this.middleValue } : {}),
      });
    };
    this.isMarkInRange = (markValue) => {
      if (this.type === 'middle-range') {
        if (this.isMiddlePointHigher()) {
          return this.value <= markValue && this.middleValue >= markValue;
        }
        return this.value >= markValue && this.middleValue <= markValue;
      }
      return this.value[0] <= markValue && this.value[1] >= markValue;
    };
    this.markCssClasses = (markValue) => ({
      'mark-item': true,
      active: this.type === 'single' ? this.value >= markValue : this.isMarkInRange(markValue),
      disabled: this.disabled,
      'middle-mark-active': this.type === 'middle-range' && markValue === this.middleValue && markValue !== this.value,
      first: markValue === this.min,
      last: markValue === this.max,
    });
    this.singleSliderWrapperCssClasses = () => ({
      'single-slider-wrapper': true,
      disabled: this.disabled,
      'middle-range-wrapper': this.type === 'middle-range',
    });
    this.rangeSliderWrapperCssClasses = () => ({
      'range-slider-wrapper': true,
      disabled: this.disabled,
    });
    this.controlCssClasses = () => ({
      'slider-control': true,
      'with-value': this.withValue,
      'without-label': !this.labelConfig?.text,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.hostCssClasses = () => ({
      'wpp-slider': true,
    });
    this.marksListCssClasses = () => ({
      'marks-list': true,
      [`size-${this.size}`]: true,
    });
    this.inputColumnCssClasses = () => ({
      'input-column': true,
      [`size-${this.size}`]: true,
    });
    this.labelCssClasses = () => ({
      label: true,
      [`size-${this.size}`]: true,
    });
    this.editableInputCssClasses = () => ({
      'with-input': this.withInput,
      'inputs-range': this.withInput && this.type === 'range',
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.calculateProgressBar = (value) => (value - this.min) * (1 / (this.max - this.min)) * 100 + '%';
    this.renderControl = () => {
      const label = this.labelConfig?.text && (h("wpp-label-v3-3-1", { htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" }));
      if (this.withValue && !this.withInput) {
        return (h("div", { class: this.controlCssClasses(), part: "control-wrapper" }, label || h("div", null), this.handleType({
          single: value => (h("wpp-typography-v3-3-1", { type: "s-midi", part: "value" }, value)),
          range: value => (h("div", { class: "range-value-wrapper", part: "value-wrapper" }, h("wpp-typography-v3-3-1", { type: "s-midi", part: "value" }, value[0]), h("wpp-divider-v3-3-1", { part: "value-divider", class: { divider: true, disabled: this.disabled } }), h("wpp-typography-v3-3-1", { type: "s-midi", part: "value" }, value[1]))),
          'middle-range': value => (h("div", { class: "range-value-wrapper", part: "value-wrapper" }, h("wpp-typography-v3-3-1", { type: "s-midi", part: "value" }, this.isMiddlePointHigher() ? value : this.middleValue), h("wpp-divider-v3-3-1", { part: "value-divider", class: { divider: true, disabled: this.disabled } }), h("wpp-typography-v3-3-1", { type: "s-midi", part: "value" }, this.isMiddlePointHigher() ? this.middleValue : value))),
        })));
      }
      return label;
    };
    this.renderSingleInput = () => (h("wpp-input-v3-3-1", { ref: inputRef => (this.inputRef = inputRef), type: "decimal", size: this.size, disabled: this.disabled, part: "input-number", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { [`size-${this.size}`]: true }, maskOptions: {
        decimalPatternOptions: this.maskOptions
          ? {
            ...getDefaultMaskOptions(this.step),
            ...this.maskOptions,
          }
          : undefined,
      } }));
    this.renderEditableInput = () => (h("div", { class: this.editableInputCssClasses(), part: "editable-input-wrapper" }, this.handleType({
      single: () => this.renderSingleInput(),
      range: () => (h("div", { class: "range-input-wrapper", part: "input-wrapper" }, h("wpp-input-v3-3-1", { ref: inputRef => (this.inputRef = inputRef), type: "decimal", size: this.size, disabled: this.disabled, part: "input-min", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { 'min-input': true, [`size-${this.size}`]: true }, maskOptions: {
          decimalPatternOptions: this.maskOptions && this.maskOptions[0]
            ? {
              ...getDefaultMaskOptions(this.step),
              ...this.maskOptions[0],
            }
            : undefined,
        } }), h("wpp-divider-v3-3-1", { class: { 'wpp-disabled': this.disabled }, part: "divider" }), h("wpp-input-v3-3-1", { ref: inputRef => (this.inputMaxRef = inputRef), type: "decimal", size: this.size, disabled: this.disabled, part: "input-max", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { 'max-input': true, [`size-${this.size}`]: true }, maskOptions: {
          decimalPatternOptions: this.maskOptions && this.maskOptions[1]
            ? {
              ...getDefaultMaskOptions(this.step),
              ...this.maskOptions[1],
            }
            : undefined,
        } }))),
      'middle-range': () => this.renderSingleInput(),
    })));
    this.renderMarks = () => {
      if (this.displayMarks.length > 0) {
        const totalMarks = this.displayMarks.length;
        const calculateDynamicOffset = (index, totalMarks) => {
          if (index === 0 || index === totalMarks - 1)
            return 0;
          const midpoint = Math.floor(totalMarks / 2);
          return (midpoint - index) * 2;
        };
        return this.displayMarks.map((mark, index) => {
          const dynamicOffset = calculateDynamicOffset(index, totalMarks);
          const isFirstMark = index === 0;
          const isLastMark = index === totalMarks - 1;
          const style = {
            '--mark-left-dynamic': isFirstMark || isLastMark
              ? `calc(${mark.position} - var(--slider-mark-size) / 2)`
              : `calc(${mark.position} - var(--slider-mark-size) / 2 + ${dynamicOffset}px)`,
          };
          const isTruncated = !!this.tooltipTexts[mark.value];
          const labelText = mark.label !== null && mark.label !== undefined ? String(mark.label) : '';
          const tooltipPlacement = 'bottom';
          const labelContent = (h("wpp-typography-v3-3-1", { id: `mark-label-${mark.value}`, class: this.labelCssClasses(), type: "xs-body", part: "label" }, labelText));
          return (h("div", { onClick: event => this.handleMarkClick(event, mark), class: this.markCssClasses(mark.value), style: style, part: "mark" }, !this.continuous && (h("div", { class: "circle", part: "mark-circle" }, h("div", { class: "mark", part: "mark-inner" }))), h("div", { class: "label-container" }, isTruncated ? (h("wpp-tooltip-v3-3-1", { config: { placement: tooltipPlacement }, text: this.tooltipTexts[mark.value] }, labelContent)) : (labelContent))));
        });
      }
    };
    this.renderRangeSliders = (style, value) => (h("div", { class: this.rangeSliderWrapperCssClasses(), part: "slider" }, h("div", { ref: elRef => (this.clickableAreaRef = elRef), class: "slider-clickable-wrapper", onClick: this.handleSliderWrapperClick }), h("input", { class: { slider: true, [`min-range-${this.focusType.min}`]: true }, type: "range", name: this.name, min: this.min, max: this.max, step: this.step, value: value[0], required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-min", style: style, onInput: this.handleRangeSliderChange('min'), onBlur: () => this.handleInputBlur('min'), onMouseDown: () => this.handleInputMouseDown('min'), onKeyUp: (event) => this.handleInputKeyUp(event, 'min'), onClick: event => {
        event.preventDefault();
        event.stopPropagation();
      }, title: "" }), h("input", { class: {
        slider: true,
        [`max-range-${this.focusType.max}`]: true,
      }, type: "range", name: this.name, min: this.min, max: this.max, step: this.step, value: value[1], required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-max", onInput: this.handleRangeSliderChange('max'), onBlur: () => this.handleInputBlur('max'), onMouseDown: () => this.handleInputMouseDown('max'), onKeyUp: (event) => this.handleInputKeyUp(event, 'max'), onClick: event => {
        event.preventDefault();
        event.stopPropagation();
      }, title: "" })));
    this.renderSingleSlider = (style, value) => (h("div", { class: this.singleSliderWrapperCssClasses(), part: "slider" }, h("div", { ref: elRef => (this.clickableAreaRef = elRef), class: "slider-clickable-wrapper", onClick: this.handleSliderWrapperClick }), h("input", { class: { slider: true, [`max-range-${this.focusType.max}`]: true }, type: "range", name: this.name, id: this.name, min: this.min, max: this.max, step: this.step, value: value, required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-max", onInput: this.handleSingleSliderChange, onBlur: () => this.handleInputBlur('max'), onKeyUp: (event) => this.handleInputKeyUp(event, 'max'), onMouseDown: () => this.handleInputMouseDown('max'), style: style, title: "" })));
    // This function is used only in the middle-range slider type
    this.isMiddlePointHigher = () => this.middleValue > this.value;
    this.tooltipTexts = {};
    this.displayMarks = [];
    this.inputValue = undefined;
    this.focusType = getInitFocusInfo();
    this.name = undefined;
    this.inputWidth = DEFAULT_INPUT_WIDTH;
    this.value = undefined;
    this.marks = false;
    this.type = 'single';
    this.min = 1;
    this.max = 100;
    this.step = 1;
    this.continuous = false;
    this.required = false;
    this.disabled = false;
    this.withInput = false;
    this.withValue = false;
    this.ariaProps = {};
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelConfig = undefined;
    this.size = 'm';
    this.maskOptions = undefined;
  }
  onUpdateValue() {
    this.inputValue = this.getSliderInputValue();
  }
  onUpdateMinValue(newValue) {
    this.onUpdateMinMaxValues('min', newValue);
  }
  onUpdateMaxValue(newValue) {
    this.onUpdateMinMaxValues('max', newValue);
  }
  onUpdateStepValue(newStepValue) {
    this.handleType({
      single: () => {
        this.value = this.min;
      },
      range: () => {
        this.value = [this.min, this.min + newStepValue];
      },
      'middle-range': () => {
        this.value = this.min;
        this.middleValue = this.getMidValueRespectingStep();
      },
    });
    this.computeSegmentWidth();
    this.getDisplayMarks();
  }
  onUpdateInputValue(newInputValue) {
    if (this.type === 'single' || this.type === 'middle-range') {
      const inputMaskOptions = getMaskOptionsForInput(this.type, undefined, this.maskOptions);
      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(Number(newInputValue), inputMaskOptions);
      }
    }
    else {
      const [minValue, maxValue] = newInputValue.map(Number);
      const minInputMaskOptions = getMaskOptionsForInput(this.type, 'min', this.maskOptions);
      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(minValue, minInputMaskOptions);
      }
      const maxInputMaskOptions = getMaskOptionsForInput(this.type, 'max', this.maskOptions);
      if (this.inputMaxRef) {
        this.inputMaxRef.value = formatDecimalWithMask(maxValue, maxInputMaskOptions);
      }
    }
  }
  /**
   * Sets focus on native input
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  componentWillLoad() {
    this.getDisplayMarks();
    if (this.type === 'middle-range') {
      this.middleValue = this.getMidValueRespectingStep();
    }
  }
  componentDidLoad() {
    this.handleType({
      single: value => {
        this.inputValue = String(value);
      },
      range: value => {
        this.inputValue = value.map(String);
      },
      'middle-range': value => {
        this.inputValue = String(value);
      },
    });
    this.computeSegmentWidth();
    this.getDisplayMarks();
    this.applyTruncationToMarks();
    window.addEventListener('load', () => {
      this.computeSegmentWidth();
      this.getDisplayMarks();
      this.applyTruncationToMarks();
    });
    window.addEventListener('resize', this.applyTruncationToMarks);
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.applyTruncationToMarks);
    window.removeEventListener('load', () => {
      this.computeSegmentWidth();
      this.getDisplayMarks();
      this.applyTruncationToMarks();
    });
  }
  render() {
    const style = this.handleType({
      single: value => ({
        '--active-single-progress-bar': this.calculateProgressBar(value),
      }),
      range: value => ({
        '--active-range-from-progress-bar': this.calculateProgressBar(value[0]),
        '--active-range-to-progress-bar': this.calculateProgressBar(value[1]),
      }),
      'middle-range': value => ({
        '--active-range-from-progress-bar': this.calculateProgressBar(this.isMiddlePointHigher() ? value : this.middleValue),
        '--active-range-to-progress-bar': this.calculateProgressBar(this.isMiddlePointHigher() ? this.middleValue : value),
      }),
    });
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, input-number, input-wrapper, input-min, divider, input-max, control-wrapper, editable-input-wrapper, value, value-wrapper, value-divider, mark, mark-circle, mark-inner, slider, input-slider-min, input-slider-max, marks-list" }, this.renderControl(), h("div", { class: "slider-container" }, h("div", { class: "slider-column" }, this.handleType({
      single: value => this.renderSingleSlider(style, value),
      range: value => this.renderRangeSliders(style, value),
      'middle-range': value => this.renderSingleSlider(style, value),
    }), this.marks && (h("div", { ref: el => (this.marksListRef = el), class: this.marksListCssClasses(), part: "marks-list" }, this.renderMarks()))), this.withInput && this.continuous && (h("div", { class: this.inputColumnCssClasses() }, this.renderEditableInput())))));
  }
  static get registryIs() { return "wpp-slider-v3-3-1"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onUpdateValue"],
    "min": ["onUpdateMinValue"],
    "max": ["onUpdateMaxValue"],
    "step": ["onUpdateStepValue"],
    "inputValue": ["onUpdateInputValue"]
  }; }
  static get style() { return wppSliderCss; }
}, [1, "wpp-slider", "wpp-slider-v3-3-1", {
    "name": [1],
    "inputWidth": [1, "input-width"],
    "value": [1538],
    "marks": [4],
    "type": [1],
    "min": [1026],
    "max": [1026],
    "step": [2],
    "continuous": [4],
    "required": [516],
    "disabled": [516],
    "withInput": [4, "with-input"],
    "withValue": [4, "with-value"],
    "ariaProps": [16],
    "labelTooltipConfig": [16],
    "labelConfig": [1040],
    "size": [1],
    "maskOptions": [16],
    "tooltipTexts": [32],
    "displayMarks": [32],
    "inputValue": [32],
    "focusType": [32],
    "setFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-slider-v3-3-1", "wpp-action-button-v3-3-1", "wpp-divider-v3-3-1", "wpp-icon-cross-v3-3-1", "wpp-icon-error-v3-3-1", "wpp-icon-info-message-v3-3-1", "wpp-icon-search-v3-3-1", "wpp-icon-success-v3-3-1", "wpp-icon-warning-v3-3-1", "wpp-inline-message-v3-3-1", "wpp-input-v3-3-1", "wpp-internal-label-v3-3-1", "wpp-internal-tooltip-v3-3-1", "wpp-label-v3-3-1", "wpp-spinner-v3-3-1", "wpp-tooltip-v3-3-1", "wpp-typography-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-slider-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSlider$1);
      }
      break;
    case "wpp-action-button-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-divider-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-cross-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-error-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-info-message-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-search-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-success-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-warning-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-inline-message-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-input-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-label-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-label-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppSlider = WppSlider$1;
const defineCustomElement = defineCustomElement$1;

export { WppSlider, defineCustomElement };
