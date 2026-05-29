'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-2231f97a.js');
require('./consts-d8f5ef98.js');

const wppCounterCss = "@charset \"UTF-8\";:host{--counter-height-size-s:var(--wpp-counter-height-size-s, 32px);--counter-height-size-m:var(--wpp-counter-height-size-m, 40px);--counter-label-margin:var(--wpp-counter-label-margin, 0 0 8px 0);--counter-input-padding:var(\n    --wpp-counter-input-padding,\n    calc(9px - var(--counter-border-width)) calc(12px - var(--counter-border-width))\n  );--counter-input-width:var(--wpp-counter-input-width, 70px);--counter-input-placeholder-color:var(--wpp-counter-input-placeholder-color, var(--wpp-grey-color-700));--counter-input-text-color:var(--wpp-counter-input-text-color, var(--wpp-text-color));--counter-input-text-color-disabled:var(--wpp-counter-input-text-color-disabled, var(--wpp-text-color-disabled));--counter-increase-wrapper-padding:var(\n    --wpp-counter-increase-wrapper-padding,\n    calc(10px - var(--counter-border-width)) 9px calc(10px - var(--counter-border-width)) 9px\n  );--counter-decrease-wrapper-padding:var(\n    --wpp-counter-decrease-wrapper-padding,\n    calc(10px - var(--counter-border-width)) 9px calc(10px - var(--counter-border-width)) 9px\n  );--counter-border-radius:var(--wpp-counter-border-radius, var(--wpp-border-radius-m));--counter-bg-color:var(--wpp-counter-bg-color, transparent);--counter-bg-color-hover:var(--wpp-counter-bg-color-hover, var(--wpp-grey-color-200));--counter-bg-color-active:var(--wpp-counter-bg-color-active, var(--wpp-grey-color-300));--counter-bg-color-disabled:var(--wpp-counter-bg-color-disabled, var(--wpp-grey-color-100));--counter-border-color:var(--wpp-counter-border-color, var(--wpp-grey-color-500));--counter-border-color-hover:var(--wpp-counter-border-color-hover, var(--wpp-grey-color-700));--counter-border-color-active:var(--wpp-counter-border-color-active, var(--wpp-grey-color-800));--counter-border-color-disabled:var(--wpp-counter-border-color-disabled, var(--wpp-grey-color-400));--counter-icons-color:var(--wpp-counter-icons-color, var(--wpp-icon-color));--counter-icons-color-hover:var(--wpp-counter-icons-color-hover, var(--wpp-icon-color-hover));--counter-icons-color-active:var(--wpp-counter-icons-color-active, var(--wpp-icon-color-active));--counter-icons-color-disabled:var(--wpp-counter-icons-color-disabled, var(--wpp-icon-color-disabled));--counter-border-width:var(--wpp-counter-border-radius, var(--wpp-border-width-s));--counter-border-style:var(--wpp-counter-border-style, solid);--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color));--counter-border-color-error-hover:var(--wpp-counter-border-color-error-hover, var(--wpp-grey-color-500));--counter-border-color-warning-hover:var(--wpp-counter-border-color-warning-hover, var(--wpp-grey-color-500));--counter-icons-color-errorwarning-hover:var(\n    --wpp-counter-icons-color-errorwarning-hover,\n    var(--wpp-grey-color-600)\n  );display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .label{margin:var(--counter-label-margin)}:host .counter-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;}:host .counter-wrapper .increase-wrapper,:host .counter-wrapper .decrease-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;cursor:pointer;background-color:var(--counter-bg-color);outline:none;-webkit-box-sizing:border-box;box-sizing:border-box}:host .counter-wrapper .increase-wrapper:hover,:host .counter-wrapper .increase-wrapper.tab-focus,:host .counter-wrapper .decrease-wrapper:hover,:host .counter-wrapper .decrease-wrapper.tab-focus{background-color:var(--counter-bg-color-hover);border-color:var(--counter-border-color-hover)}:host .counter-wrapper .increase-wrapper:active,:host .counter-wrapper .increase-wrapper.pressed,:host .counter-wrapper .decrease-wrapper:active,:host .counter-wrapper .decrease-wrapper.pressed{background-color:var(--counter-bg-color-active);border-color:var(--counter-border-color-active)}:host .counter-wrapper .increase-wrapper{padding:var(--counter-increase-wrapper-padding);border:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-top-right-radius:var(--counter-border-radius);border-bottom-right-radius:var(--counter-border-radius)}:host .counter-wrapper .increase-wrapper.disabled{pointer-events:none}:host .counter-wrapper .increase-wrapper.disabled .icon-plus{color:var(--counter-icons-color-disabled)}:host .counter-wrapper .increase-wrapper:hover .icon-plus,:host .counter-wrapper .increase-wrapper.tab-focus .icon-plus{color:var(--counter-icons-color-hover)}:host .counter-wrapper .increase-wrapper.tab-focus{border-radius:0 var(--counter-border-radius) var(--counter-border-radius) 0;outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);position:relative;z-index:1}:host .counter-wrapper .increase-wrapper:active .icon-plus,:host .counter-wrapper .increase-wrapper.pressed .icon-plus{color:var(--counter-icons-color-active)}:host .counter-wrapper .decrease-wrapper{padding:var(--counter-decrease-wrapper-padding);border-top:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-bottom:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-top-left-radius:var(--counter-border-radius);border-bottom-left-radius:var(--counter-border-radius);border-right:none;padding-right:calc(9px + var(--counter-border-width))}:host .counter-wrapper .decrease-wrapper.disabled{pointer-events:none}:host .counter-wrapper .decrease-wrapper.disabled .icon-minus{color:var(--counter-icons-color-disabled)}:host .counter-wrapper .decrease-wrapper:hover .icon-minus,:host .counter-wrapper .decrease-wrapper.tab-focus .icon-minus{color:var(--counter-icons-color-hover)}:host .counter-wrapper .decrease-wrapper:hover~.counter-input,:host .counter-wrapper .decrease-wrapper.tab-focus~.counter-input{border-left-color:var(--counter-border-color-hover)}:host .counter-wrapper .decrease-wrapper:hover.error~.counter-input,:host .counter-wrapper .decrease-wrapper.tab-focus.error~.counter-input{border-left-color:var(--counter-border-color-error-hover)}:host .counter-wrapper .decrease-wrapper:hover.warning~.counter-input,:host .counter-wrapper .decrease-wrapper.tab-focus.warning~.counter-input{border-left-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper .decrease-wrapper.tab-focus{border-radius:var(--counter-border-radius) 0 0 var(--counter-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);position:relative;z-index:1;border-right:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color-hover);padding-right:9px;}:host .counter-wrapper .decrease-wrapper:active .icon-minus,:host .counter-wrapper .decrease-wrapper.pressed .icon-minus{color:var(--counter-icons-color-active)}:host .counter-wrapper .decrease-wrapper:active~.counter-input,:host .counter-wrapper .decrease-wrapper.pressed~.counter-input{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper .counter-input{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);text-align:center;padding:var(--counter-input-padding);width:var(--counter-input-width);color:var(--counter-input-text-color);background-color:var(--counter-bg-color);border:none;outline:none;margin:0;border-top:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-bottom:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color);-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;}:host .counter-wrapper .counter-input.without-counter{border-radius:var(--counter-border-radius);border-right:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color)}:host .counter-wrapper .counter-input.without-counter::-webkit-outer-spin-button,:host .counter-wrapper .counter-input.without-counter::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}:host .counter-wrapper .counter-input.without-counter[type=number]{-moz-appearance:textfield}:host .counter-wrapper .counter-input.without-counter.warning{border-left-color:var(--wpp-warning-color-400);border-right-color:var(--wpp-warning-color-400)}:host .counter-wrapper .counter-input.without-counter.error{border-left-color:var(--wpp-danger-color-400);border-right-color:var(--wpp-danger-color-400)}:host .counter-wrapper .counter-input.without-counter:hover.warning,:host .counter-wrapper .counter-input.without-counter.tab-focus.warning{border-color:var(--wpp-warning-color-500)}:host .counter-wrapper .counter-input.without-counter:hover.error,:host .counter-wrapper .counter-input.without-counter.tab-focus.error{border-color:var(--wpp-danger-color-500)}:host .counter-wrapper .counter-input.without-counter.warning{border-left-color:var(--wpp-warning-color-400);border-right-color:var(--wpp-warning-color-400)}:host .counter-wrapper .counter-input.without-counter.error{border-left-color:var(--wpp-danger-color-400);border-right-color:var(--wpp-danger-color-400)}:host .counter-wrapper .counter-input.without-counter.tab-focus{border-radius:var(--counter-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color)}:host .counter-wrapper .counter-input::-webkit-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::-moz-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input:-ms-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::-ms-input-placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input::placeholder{color:var(--counter-input-placeholder-color)}:host .counter-wrapper .counter-input:hover,:host .counter-wrapper .counter-input.tab-focus{background-color:var(--counter-bg-color-hover);border-color:var(--counter-border-color-hover)}:host .counter-wrapper .counter-input:hover~.increase-wrapper,:host .counter-wrapper .counter-input.tab-focus~.increase-wrapper{border-left-color:var(--counter-border-color-hover)}:host .counter-wrapper .counter-input:hover.error,:host .counter-wrapper .counter-input.tab-focus.error{border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color-error-hover)}:host .counter-wrapper .counter-input:hover.error~.increase-wrapper,:host .counter-wrapper .counter-input.tab-focus.error~.increase-wrapper{border-left-color:var(--counter-border-color-error-hover)}:host .counter-wrapper .counter-input:hover.warning,:host .counter-wrapper .counter-input.tab-focus.warning{border-left:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color-warning-hover)}:host .counter-wrapper .counter-input:hover.warning~.increase-wrapper,:host .counter-wrapper .counter-input.tab-focus.warning~.increase-wrapper{border-left-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper .counter-input:hover.without-counter.error,:host .counter-wrapper .counter-input.tab-focus.without-counter.error{border-left-color:var(--wpp-danger-color-500)}:host .counter-wrapper .counter-input:hover.without-counter.warning,:host .counter-wrapper .counter-input.tab-focus.without-counter.warning{border-left-color:var(--wpp-warning-color-500)}:host .counter-wrapper .counter-input.tab-focus:not(.without-counter){border-radius:0;outline:none;-webkit-box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--counter-first-border-color-focus), 0 0 0 3px var(--wpp-brand-color);z-index:1;border-left-color:var(--counter-border-color-active);border-right:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color-active)}:host .counter-wrapper .counter-input.tab-focus.error,:host .counter-wrapper .counter-input:hover:not(.without-counter).error{border-top-color:var(--wpp-danger-color-500);border-bottom-color:var(--wpp-danger-color-500)}:host .counter-wrapper .counter-input.tab-focus.warning,:host .counter-wrapper .counter-input:hover:not(.without-counter).warning{border-top-color:var(--wpp-warning-color-500);border-bottom-color:var(--wpp-warning-color-500)}:host .counter-wrapper .counter-input:focus{border-color:var(--counter-border-color-active);background-color:var(--counter-bg-color)}:host .counter-wrapper .counter-input:focus~.increase-wrapper{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper.size-s{height:var(--counter-height-size-s)}:host .counter-wrapper.size-m{height:var(--counter-height-size-m)}:host .counter-wrapper.warning .increase-wrapper,:host .counter-wrapper.warning .decrease-wrapper,:host .counter-wrapper.warning .counter-input{border-top-color:var(--wpp-warning-color-400);border-bottom-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning .decrease-wrapper{border-left-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning .increase-wrapper{border-right-color:var(--wpp-warning-color-400)}:host .counter-wrapper.warning:hover .increase-wrapper,:host .counter-wrapper.warning:hover .decrease-wrapper,:host .counter-wrapper.warning:hover .counter-input,:host .counter-wrapper.warning.tab-focus .increase-wrapper,:host .counter-wrapper.warning.tab-focus .decrease-wrapper,:host .counter-wrapper.warning.tab-focus .counter-input{border-top-color:var(--wpp-warning-color-500);border-bottom-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .decrease-wrapper,:host .counter-wrapper.warning.tab-focus .decrease-wrapper{border-left-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .increase-wrapper,:host .counter-wrapper.warning.tab-focus .increase-wrapper{border-right-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .without-counter,:host .counter-wrapper.warning.tab-focus .without-counter{border-left-color:var(--wpp-warning-color-500);border-right-color:var(--wpp-warning-color-500)}:host .counter-wrapper.warning:hover .increase-wrapper,:host .counter-wrapper.warning:hover .decrease-wrapper,:host .counter-wrapper.warning:hover .counter-input,:host .counter-wrapper.warning.tab-focus .increase-wrapper,:host .counter-wrapper.warning.tab-focus .decrease-wrapper,:host .counter-wrapper.warning.tab-focus .counter-input{background-color:var(--counter-bg-color-hover)}:host .counter-wrapper.error .increase-wrapper,:host .counter-wrapper.error .decrease-wrapper,:host .counter-wrapper.error .counter-input{border-top-color:var(--wpp-danger-color-400);border-bottom-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error .decrease-wrapper{border-left-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error .increase-wrapper{border-right-color:var(--wpp-danger-color-400)}:host .counter-wrapper.error:hover .increase-wrapper,:host .counter-wrapper.error:hover .decrease-wrapper,:host .counter-wrapper.error:hover .counter-input,:host .counter-wrapper.error.tab-focus .increase-wrapper,:host .counter-wrapper.error.tab-focus .decrease-wrapper,:host .counter-wrapper.error.tab-focus .counter-input{border-top-color:var(--wpp-danger-color-500);border-bottom-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .decrease-wrapper,:host .counter-wrapper.error.tab-focus .decrease-wrapper{border-left-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .increase-wrapper,:host .counter-wrapper.error.tab-focus .increase-wrapper{border-right-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .without-counter,:host .counter-wrapper.error.tab-focus .without-counter{border-left-color:var(--wpp-danger-color-500);border-right-color:var(--wpp-danger-color-500)}:host .counter-wrapper.error:hover .increase-wrapper,:host .counter-wrapper.error:hover .decrease-wrapper,:host .counter-wrapper.error:hover .counter-input,:host .counter-wrapper.error.tab-focus .increase-wrapper,:host .counter-wrapper.error.tab-focus .decrease-wrapper,:host .counter-wrapper.error.tab-focus .counter-input{background-color:var(--counter-bg-color-hover)}:host .counter-wrapper.error .increase-wrapper:hover,:host .counter-wrapper.error .increase-wrapper.tab-focus,:host .counter-wrapper.warning .increase-wrapper:hover,:host .counter-wrapper.warning .increase-wrapper.tab-focus{border-left-color:var(--counter-border-color-error-hover)}:host .counter-wrapper.error .increase-wrapper:hover .icon-plus,:host .counter-wrapper.error .increase-wrapper.tab-focus .icon-plus,:host .counter-wrapper.warning .increase-wrapper:hover .icon-plus,:host .counter-wrapper.warning .increase-wrapper.tab-focus .icon-plus{color:var(--counter-icons-color-errorwarning-hover)}:host .counter-wrapper.error .decrease-wrapper:hover,:host .counter-wrapper.error .decrease-wrapper.tab-focus,:host .counter-wrapper.warning .decrease-wrapper:hover,:host .counter-wrapper.warning .decrease-wrapper.tab-focus{border-right-color:var(--counter-border-color-error-hover)}:host .counter-wrapper.error .decrease-wrapper:hover .icon-minus,:host .counter-wrapper.error .decrease-wrapper.tab-focus .icon-minus,:host .counter-wrapper.warning .decrease-wrapper:hover .icon-minus,:host .counter-wrapper.warning .decrease-wrapper.tab-focus .icon-minus{color:var(--counter-icons-color-errorwarning-hover)}:host .counter-wrapper.error .decrease-wrapper:hover~.counter-input,:host .counter-wrapper.error .decrease-wrapper.tab-focus~.counter-input,:host .counter-wrapper.warning .decrease-wrapper:hover~.counter-input,:host .counter-wrapper.warning .decrease-wrapper.tab-focus~.counter-input{border-left-color:var(--counter-border-color-error-hover)}:host .counter-wrapper .decrease-wrapper:hover~.counter-input.tab-focus{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper.warning .decrease-wrapper:hover~.counter-input.tab-focus{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper.error .decrease-wrapper:hover~.counter-input.tab-focus{border-left-color:var(--counter-border-color-active)}:host .counter-wrapper .decrease-wrapper.tab-focus{border-right:var(--counter-border-width) var(--counter-border-style) var(--counter-border-color-hover);padding-right:9px;}:host .counter-wrapper .decrease-wrapper.tab-focus~.counter-input{border-left:none}:host .counter-wrapper.warning .decrease-wrapper.tab-focus{border-right-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper.error .decrease-wrapper.tab-focus{border-right-color:var(--counter-border-color-error-hover)}:host .counter-wrapper:has(.counter-input.tab-focus:not(.without-counter)) .increase-wrapper{border-left:none;padding-left:calc(9px + var(--counter-border-width));}:host .counter-wrapper.warning .counter-input.tab-focus:not(.without-counter){border-right-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper.error .counter-input.tab-focus:not(.without-counter){border-right-color:var(--counter-border-color-error-hover)}:host .counter-wrapper.warning{}:host .counter-wrapper.warning .counter-input.tab-focus:not(.without-counter),:host .counter-wrapper.warning .counter-input:focus:not(.without-counter){border-left-color:var(--counter-border-color-warning-hover);border-right-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper.warning .decrease-wrapper:hover~.counter-input.tab-focus,:host .counter-wrapper.warning .decrease-wrapper:hover~.counter-input:focus{border-left-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper.warning .counter-input:focus~.increase-wrapper{border-left-color:var(--counter-border-color-warning-hover)}:host .counter-wrapper.error .counter-input.tab-focus:not(.without-counter),:host .counter-wrapper.error .counter-input:focus:not(.without-counter){border-left-color:var(--counter-border-color-error-hover);border-right-color:var(--counter-border-color-error-hover)}:host .counter-wrapper.error .decrease-wrapper:hover~.counter-input.tab-focus,:host .counter-wrapper.error .decrease-wrapper:hover~.counter-input:focus{border-left-color:var(--counter-border-color-error-hover)}:host .counter-wrapper.error .counter-input:focus~.increase-wrapper{border-left-color:var(--counter-border-color-error-hover)}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])) .counter-wrapper{pointer-events:none}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.warning .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.warning .counter-input{border-top-color:var(--wpp-warning-color-400);border-bottom-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .decrease-wrapper{border-left-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.warning .increase-wrapper{border-right-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.error .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper.error .counter-input{border-top-color:var(--wpp-danger-color-400);border-bottom-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .decrease-wrapper{border-left-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper.error .increase-wrapper{border-right-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .without-counter.warning{border-left-color:var(--wpp-warning-color-400);border-right-color:var(--wpp-warning-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .without-counter.error{border-left-color:var(--wpp-danger-color-400);border-right-color:var(--wpp-danger-color-400)}:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input{color:var(--counter-input-text-color-disabled);cursor:not-allowed;border-color:var(--counter-border-color-disabled);background-color:var(--counter-bg-color-disabled)}:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .increase-wrapper .icon-minus,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .decrease-wrapper .icon-minus,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input .icon-plus,:host([disabled]:not([disabled=false])) .counter-wrapper .counter-input .icon-minus{color:var(--counter-icons-color-disabled)}.counter-wrapper.warning:has(.tab-focus) .increase-wrapper,.counter-wrapper.warning:has(.tab-focus) .decrease-wrapper,.counter-wrapper.warning:has(.tab-focus) .counter-input{border-top-color:var(--wpp-warning-color-500);border-bottom-color:var(--wpp-warning-color-500)}.counter-wrapper.warning:has(.tab-focus) .decrease-wrapper{border-left-color:var(--wpp-warning-color-500)}.counter-wrapper.warning:has(.tab-focus) .increase-wrapper{border-right-color:var(--wpp-warning-color-500)}.counter-wrapper.error:has(.tab-focus) .increase-wrapper,.counter-wrapper.error:has(.tab-focus) .decrease-wrapper,.counter-wrapper.error:has(.tab-focus) .counter-input{border-top-color:var(--wpp-danger-color-500);border-bottom-color:var(--wpp-danger-color-500)}.counter-wrapper.error:has(.tab-focus) .decrease-wrapper{border-left-color:var(--wpp-danger-color-500)}.counter-wrapper.error:has(.tab-focus) .increase-wrapper{border-right-color:var(--wpp-danger-color-500)}.wpp-inline-message{margin-top:4px}";

const WppCounter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.handleValidate = (event) => {
      // Any non-Tab keyboard interaction should exit the "tab highlight" mode
      if (event.key !== 'Tab') {
        this.inputRef?.classList.remove('tab-focus');
        this.focusType = common.FOCUS_TYPE.NONE;
      }
      if (event.key === 'ArrowUp') {
        if (this.value !== this.max)
          return this.addStepToValue(this.step);
      }
      if (event.key === 'ArrowDown') {
        if (this.value !== this.min)
          return this.addStepToValue(-this.step);
      }
      this.formatValue();
    };
    this.formatValue = (valueToFormat) => {
      this.formattedValue = this.format
        ? (valueToFormat || String(this.value)).replace(this.format.searchValue, this.format.replaceValue)
        : valueToFormat || String(this.value);
      return this.formattedValue;
    };
    this.onInput = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      this.inputRef?.classList.remove('tab-focus');
      const target = event.target;
      const cleaned = target.value.replace(' ', '').replace(/[^0-9.]/g, '');
      // If empty, keep view empty and don’t emit a stale value
      if (cleaned === '') {
        this.formattedValue = '';
        target.value = '';
        return;
      }
      if (Number.isInteger(this.step)) {
        const inputValue = Number(cleaned) || 0;
        // Removed the inputValue === 0 special-case that cleared the field and set formattedValue to ''. That logic conflated zero with “empty,” prevented users from entering a valid 0 when min = 0, and left this.value unchanged (stale). As a result, after clearing/typing 0 the increment used the previous value (e.g., 123 → clear → + => 124). Now we only treat the field as empty when the string is actually empty, don’t emit wppChange on empty, and baseline +/-/arrow actions from min when empty. If the user types 0: clamp to min when min > 0, or accept 0 when min = 0. This fixes the stale increment bug and aligns with the test “previously entered value is not saved when clearing the input.”
        this.value = Math.max(this.min, Math.min(this.max, inputValue));
        target.value = this.formatValue();
      }
      else {
        if (!/^-?\d*(?:[.,]\d*)?$/.test(cleaned)) {
          target.value = this.formatValue();
          return;
        }
        if (cleaned.includes('.') && cleaned.split('.')[1].length === 0) {
          target.value = this.formatValue(cleaned);
        }
        else {
          this.value = Number(cleaned);
          target.value = this.formatValue();
        }
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
      // Clear keyboard focus styling when switching to mouse modality
      this.host?.shadowRoot?.querySelectorAll('.tab-focus').forEach(el => el.classList.remove('tab-focus'));
    };
    this.onBlur = (event) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      if (this.formattedValue === '' || isNaN(this.value)) {
        this.formattedValue = String(this.min);
        this.value = this.min;
        this.wppChange.emit({ value: this.value, name: this.name });
      }
      this.wppBlur.emit(event);
    };
    this.roundToDecimal = (value, decimals) => {
      const factor = Math.pow(10, decimals);
      return Math.round(value * factor) / factor;
    };
    this.isInputEmpty = () => this.formattedValue === '' || this.inputRef?.value === '';
    this.addStepToValue = (valueOfStep) => {
      const inputIsEmpty = this.inputRef?.value === '' || this.formattedValue === '' || isNaN(this.value);
      const base = inputIsEmpty ? this.min : this.value;
      if (Number.isInteger(this.step)) {
        let next = base + valueOfStep;
        next = Math.min(this.max, Math.max(this.min, next));
        this.value = next;
      }
      else {
        const decimals = (this.step + '').split('.')[1]?.length || 0;
        let next = this.roundToDecimal(base + valueOfStep, decimals);
        next = Math.min(this.max, Math.max(this.min, next));
        this.value = next;
      }
    };
    this.increaseValue = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
      if (this.value === this.max)
        return;
      this.addStepToValue(this.step);
      if (this.value === this.max) {
        const btn = this.host.shadowRoot?.querySelector('.increase-wrapper');
        btn?.classList.remove('pressed');
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.decreaseValue = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
      if (this.value === this.min)
        return;
      this.addStepToValue(-this.step);
      if (this.value === this.min) {
        const btn = this.host.shadowRoot?.querySelector('.decrease-wrapper');
        btn?.classList.remove('pressed');
      }
      this.wppChange.emit({ value: this.value, name: this.name });
    };
    this.counterWrapperCssClasses = () => ({
      'counter-wrapper': true,
      [`${this.messageType}`]: !!this.messageType,
      [`size-${this.size}`]: true,
    });
    this.decreaseWrapperCssClasses = () => ({
      'decrease-wrapper': true,
      disabled: !this.isInputEmpty() && this.value === this.min,
    });
    this.increaseWrapperCssClasses = () => ({
      'increase-wrapper': true,
      disabled: !this.isInputEmpty() && this.value === this.max,
    });
    this.inputCssClasses = () => ({
      'counter-input': true,
      'without-counter': !this.withButtons,
      [`${this.messageType}`]: !!this.messageType,
    });
    this.hostCssClasses = () => ({
      'wpp-counter': true,
    });
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onElementFocus = (event) => {
      if (this.focusType === common.FOCUS_TYPE.TAB) {
        const target = event.currentTarget;
        target.classList.add('tab-focus');
      }
    };
    this.onElementBlur = (event) => {
      const target = event.currentTarget;
      target.classList.remove('tab-focus');
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onKeyDownButton = (event, action) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const target = event.currentTarget;
        target.classList.add('pressed');
        if (action === 'increase')
          this.increaseValue();
        else
          this.decreaseValue();
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = common.FOCUS_TYPE.TAB;
        const target = event.currentTarget;
        target.classList.add('tab-focus');
      }
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.currentTarget;
        target.classList.remove('pressed');
      }
    };
    this.formattedValue = undefined;
    this.focusType = undefined;
    this.currentFocused = null;
    this.name = undefined;
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.withButtons = true;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.size = 'm';
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.ariaProps = {};
    this.format = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.step = 1;
  }
  updateFormattedValue() {
    this.formatValue();
  }
  /**
   * Method that sets focus on the native input.
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  componentWillLoad() {
    if (!this.withButtons) {
      console.warn('[WppCounter] The `withButtons` prop is deprecated and will be removed in v5.0.0. ' +
        'The counter will always display with buttons. Use a standard input component for cases without buttons.');
    }
    this.formattedValue = String(this.value);
    this.formatValue();
  }
  componentDidLoad() {
    utils.autoFocusElement(this.autoFocus, this.inputRef);
  }
  render() {
    const messageId = this.message ? `${this.name}-message` : undefined;
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "label, body, decrease-button, decrease-icon, input, increase-button, increase-icon, message", onMouseDown: this.onMouseDown, onBlur: this.onBlur }, this.labelConfig?.text && (index.h("wpp-label-v4-1-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index.h("div", { class: this.counterWrapperCssClasses(), part: "body" }, this.withButtons && (index.h("button", { type: "button", class: this.decreaseWrapperCssClasses(), onClick: this.decreaseValue, part: "decrease-button", "aria-label": "Decrease value", disabled: (!this.isInputEmpty() && this.value === this.min) || this.disabled, tabIndex: (!this.isInputEmpty() && this.value === this.min) || this.disabled ? -1 : 0, onFocus: this.onElementFocus, onBlur: this.onElementBlur, onKeyUp: this.onKeyUp, onKeyDown: e => this.onKeyDownButton(e, 'decrease') }, index.h("wpp-icon-remove-v4-1-0", { class: "icon-minus", part: "decrease-icon" }))), index.h("input", { id: this.name, type: this.withButtons ? 'text' : 'decimal', class: this.inputCssClasses(), name: this.name, onKeyDown: this.handleValidate, value: this.formattedValue, required: this.required, disabled: this.disabled, onInput: this.onInput, onKeyUp: this.onKeyUp, ref: inputRef => (this.inputRef = inputRef), "aria-label": this.ariaProps.label || (!this.labelConfig?.text ? 'Counter value' : undefined), "aria-labelledby": this.labelConfig?.labelId || undefined, "aria-describedby": messageId, autocomplete: this.ariaProps.autocomplete || 'off', part: "input", title: "", onFocus: e => {
        this.onElementFocus(e);
        this.onFocus(e);
      }, onBlur: this.onElementBlur }), this.withButtons && (index.h("button", { type: "button", class: this.increaseWrapperCssClasses(), onClick: this.increaseValue, part: "increase-button", "aria-label": "Increase value", disabled: (!this.isInputEmpty() && this.value === this.max) || this.disabled, tabIndex: (!this.isInputEmpty() && this.value === this.max) || this.disabled ? -1 : 0, onFocus: this.onElementFocus, onBlur: this.onElementBlur, onKeyUp: this.onKeyUp, onKeyDown: e => this.onKeyDownButton(e, 'increase') }, index.h("wpp-icon-plus-v4-1-0", { class: "icon-plus", part: "increase-icon" })))), this.message && (index.h("wpp-inline-message-v4-1-0", { id: messageId, message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" }))));
  }
  static get registryIs() { return "wpp-counter-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["updateFormattedValue"]
  }; }
};
WppCounter.style = wppCounterCss;

exports.wpp_counter = WppCounter;
