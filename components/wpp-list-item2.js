import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { W as WrappedSlot } from './WrappedSlot.js';
import { u as uuidv4, k as transformToVersionedTag, g as getSlotEmptyStates, d as debounce } from './utils.js';
import { d as defineCustomElement$h } from './wpp-action-button2.js';
import { d as defineCustomElement$g } from './wpp-checkbox2.js';
import { d as defineCustomElement$f } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$e } from './wpp-icon-cross2.js';
import { d as defineCustomElement$d } from './wpp-icon-dash2.js';
import { d as defineCustomElement$c } from './wpp-icon-error2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-tick2.js';
import { d as defineCustomElement$8 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$7 } from './wpp-inline-message2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

let IDX = 36;
let HEX = "";
while (IDX--) {
  HEX += IDX.toString(36);
}
function uid(len = 11) {
  let str = "";
  let num = len;
  while (num--) {
    str += HEX[Math.random() * 36 | 0];
  }
  return str;
}

const escapeRegexp = (term) => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`);
const termsToRegExpString = (terms) => terms.replace(/\s{2,}/g, " ").split(" ").join("|");
const regexpQuery = ({
  terms,
  matchExactly = false
}) => {
  if (typeof terms !== "string") {
    throw new TypeError("Expected a string");
  }
  const escapedTerms = escapeRegexp(terms.trim());
  return `(${matchExactly ? escapedTerms : termsToRegExpString(escapedTerms)})`;
};
const buildRegexp = ({
  terms,
  matchExactly = false
}) => {
  try {
    const fromString = /^([/~@;%#'])(.*?)\1([gimsuy]*)$/.exec(terms);
    if (fromString) {
      return new RegExp(fromString[2], fromString[3]);
    }
    return new RegExp(regexpQuery({ terms, matchExactly }), "ig");
  } catch (e) {
    throw new TypeError("Expected terms to be either a string or a RegExp!");
  }
};

const hasProp = (prop) => (obj) => obj !== null && typeof obj === "object" && prop in obj;
const hasMatch = hasProp("match");
const chunkExists = (chunk) => typeof chunk !== "undefined";
function clip({
  curr,
  next,
  prev,
  clipBy = 3
}) {
  const words = curr.text.split(" ");
  const len = words.length;
  if (curr.match || clipBy >= len) {
    return curr.text;
  }
  const ellipsis = "...";
  if (chunkExists(next) && chunkExists(prev) && hasMatch(prev) && hasMatch(next)) {
    if (len > clipBy * 2) {
      return [
        ...words.slice(0, clipBy),
        ellipsis,
        ...words.slice(-clipBy)
      ].join(" ");
    }
    return curr.text;
  }
  if (chunkExists(next) && hasMatch(next)) {
    return [ellipsis, ...words.slice(-clipBy)].join(" ");
  }
  if (chunkExists(prev) && hasMatch(prev)) {
    return [...words.slice(0, clipBy), ellipsis].join(" ");
  }
  return curr.text;
}

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const hasLength = (str) => str.length > 0;
const highlightWords = ({
  text,
  query,
  clipBy,
  matchExactly = false
}) => {
  const safeQuery = typeof query === "string" ? query.trim() : query;
  if (safeQuery === "") {
    return [
      {
        key: uid(),
        text,
        match: false
      }
    ];
  }
  const searchRegexp = buildRegexp({ terms: query, matchExactly });
  return text.split(searchRegexp).filter(hasLength).map((str) => ({
    // Compose the object for a match
    key: uid(),
    text: str,
    match: matchExactly ? str.toLowerCase() === safeQuery.toLowerCase() : searchRegexp.test(str)
  })).map((chunk, index, chunks) => __spreadValues(__spreadValues({}, chunk), typeof clipBy === "number" && {
    // We only overwrite the text if there is a clip
    text: clip(__spreadProps(__spreadValues(__spreadValues({
      curr: chunk
    }, index < chunks.length - 1 && { next: chunks[index + 1] }), index > 0 && { prev: chunks[index - 1] }), {
      // If this wasn't the first chunk, set the previous chunk
      clipBy
    }))
  }));
};

var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const PRESENTATION_ROLE = 'presentation';

/**
 * Type guard to validate theme color usage
 */
const isValidThemeColor = (color) => color.startsWith('var(--wpp-') && color.endsWith(')');
/**
 * Helper to get color value with proper CSS variable syntax
 */
const getThemeColor = (color) => {
  // If already a CSS variable, return as is
  if (color.startsWith('var(')) {
    return color;
  }
  // If it's a raw token, wrap it
  if (color.startsWith('--wpp-')) {
    return `var(${color})`;
  }
  // Otherwise return as is (for edge cases)
  return color;
};

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 0 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-text-color-info));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 24px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(\n    --wpp-list-item-label-text-color-selected-hover,\n    var(--wpp-brand-color-hover)\n  );--li-label-text-color-selected-active:var(\n    --wpp-list-item-label-text-color-selected-active,\n    var(--wpp-brand-color-active)\n  );--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-1000));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 13px 0 5px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0;padding:var(--li-info-wrapper-padding)}:host .item .info-wrapper .body-wrapper{min-width:0;overflow:hidden}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]),:host .item ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle),:host .item:focus-visible{background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item:focus-visible ::slotted([slot=left]),:host .item:focus-visible ::slotted([slot=right]),:host .item:focus-visible .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item:focus-visible ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.checked:not(.non-interactive):not(.has-toggle),:host .item .multiple:not(.non-interactive):not(.has-toggle),:host .item .active:not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:5px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start;margin-top:4px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-tag){margin-top:3px}:host .item.with-caption.multiple .right ::slotted([slot=right][type=s-body]){margin-top:4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=right][type=s-body]),:host .item.disabled ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label,:host .item .info-wrapper .caption{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item{background-color:var(--li-bg-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-active);--checkbox-border-color:var(--checkbox-border-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-200)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.has-right-slot) .item{padding:var(--li-with-right-icon-padding)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}.ul-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;padding:0;margin:0}:host .label.custom-typography ::slotted([slot=label]){font-size:var(--wpp-list-item-label-font-size) !important;font-weight:var(--wpp-list-item-label-font-weight) !important;font-family:var(--wpp-list-item-label-font-family) !important;font-style:var(--wpp-list-item-label-font-style) !important;line-height:var(--wpp-list-item-label-line-height) !important;letter-spacing:var(--wpp-list-item-label-letter-spacing) !important;text-transform:var(--wpp-list-item-label-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-label-text-decoration) !important;text-decoration:var(--wpp-list-item-label-text-decoration) !important;color:var(--wpp-list-item-label-color) !important}:host .caption.custom-typography ::slotted([slot=caption]){font-size:var(--wpp-list-item-caption-font-size) !important;font-weight:var(--wpp-list-item-caption-font-weight) !important;font-family:var(--wpp-list-item-caption-font-family) !important;font-style:var(--wpp-list-item-caption-font-style) !important;line-height:var(--wpp-list-item-caption-line-height) !important;letter-spacing:var(--wpp-list-item-caption-letter-spacing) !important;text-transform:var(--wpp-list-item-caption-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-caption-text-decoration) !important;text-decoration:var(--wpp-list-item-caption-text-decoration) !important;color:var(--wpp-list-item-caption-color) !important}";

const WppListItem = /*@__PURE__*/ proxyCustomElement(class WppListItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChangeListItem = createEvent(this, "wppChangeListItem", 1);
    this.tooltipId = uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
    this.previousLabelText = '';
    this.removeTriggerWrapperAttributes = () => {
      const menuContextTag = transformToVersionedTag('wpp-menu-context').toUpperCase();
      const menuContext = this.host.querySelector(`${menuContextTag}[slot="right"]`);
      if (menuContext) {
        let triggerWrapper = menuContext.querySelector('.trigger-wrapper');
        if (triggerWrapper) {
          triggerWrapper.removeAttribute('tabindex');
          triggerWrapper.removeAttribute('role');
        }
        else {
          const observer = new MutationObserver(() => {
            triggerWrapper = menuContext.querySelector('.trigger-wrapper');
            if (triggerWrapper) {
              triggerWrapper.removeAttribute('tabindex');
              triggerWrapper.removeAttribute('role');
              observer.disconnect();
            }
          });
          observer.observe(menuContext, { childList: true, subtree: true });
        }
      }
    };
    this.setupLabelContentObserver = () => {
      const labelEl = this.host.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      // Create a new observer that will watch for text changes
      this.labelObserver = new MutationObserver(() => {
        const currentLabelText = labelEl.textContent || '';
        if (currentLabelText !== this.previousLabelText) {
          this.previousLabelText = currentLabelText;
          this.updateSlotData();
          requestAnimationFrame(this.checkHasTooltip);
        }
      });
      // Configure the observer to watch for changes in text content and child nodes
      this.labelObserver.observe(labelEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    };
    this.checkHasTooltip = () => {
      let labelWrapper = this.host?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = this.host?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = this.host?.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      const textEl = labelEl?.shadowRoot?.querySelector('.typography');
      if (textEl) {
        this.hasTooltip = textEl.clientWidth < textEl.scrollWidth;
      }
      else {
        this.hasTooltip = labelEl.clientWidth < labelEl.scrollWidth;
      }
    };
    this.handleComponentMount = () => {
      this.mounted = true;
      requestAnimationFrame(() => {
        this.checkHasTooltip();
      });
      this.loading = false;
    };
    this.getSlotText = (slotName) => {
      const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
      return slotEl?.textContent || '';
    };
    this.subtitleSlotCssClasses = () => ({
      subtitle: true,
      'slot-hidden': !this.hasSubtitleSlot,
    });
    this.updateComponentState = (updateData) => {
      if (this.nonInteractive)
        return;
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        caption: '[slot="caption"]',
        left: '[slot="left"]',
        right: '[slot="right"]',
        subtitle: '[slot="subtitle"]',
      });
      this.hasCaptionSlot = !emptyStates.caption;
      this.hasLeftSlot = !emptyStates.left;
      this.hasRightSlot = !emptyStates.right;
      this.hasSubtitleSlot = !emptyStates.subtitle;
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled || this.nonInteractive)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest('.wpp-select-portal'),
        isAutocompleteBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-autocomplete')),
      });
    };
    this.handleRightWrapperClick = () => {
      this.eventSource = EVENT_SOURCE.RIGHT_SLOT;
    };
    this.hostCssClasses = () => ({
      'wpp-list-item': true,
      'wpp-disabled': this.disabled,
      'wpp-hidden': this.hidden,
      'wpp-mounted': this.mounted,
      'wpp-loading': this.loading,
    });
    this.itemWrapperCssClasses = () => ({
      item: true,
      checked: this.checked,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'non-interactive': this.nonInteractive,
    });
    this.labelSlotCssClasses = () => ({
      label: true,
      'slot-hidden': Boolean(this.highlight),
      'custom-typography': !!this.labelTypography,
    });
    this.leftSlotCssClasses = () => ({
      left: true,
      'slot-hidden': !this.hasLeftSlot,
    });
    this.rightSlotCssClasses = () => ({
      right: true,
      'slot-hidden': !this.hasRightSlot && !this.isExtended && !this.active,
    });
    this.captionSlotCssClasses = () => ({
      caption: true,
      'slot-hidden': !this.hasCaptionSlot || Boolean(this.highlight),
      'custom-typography': !!this.captionTypography,
    });
    this.ulWrapperCssClasses = () => ({
      'ul-wrapper': true,
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, h(WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, h("span", { class: "highlight-text" }, this.getHighlightedText('label')))), h(WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "caption" }, h("span", { class: "highlight-text" }, this.getHighlightedText('caption'))))));
    };
    this.renderRightSlot = () => (h(WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && h("wpp-icon-chevron-v3-6-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && h("wpp-icon-tick-v3-6-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (h(WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.handleMouseEnter = () => {
      this.updateComponentState({ hover: true });
    };
    this.handleMouseLeave = () => {
      this.updateComponentState({ hover: false });
    };
    this.handleMouseDown = () => {
      this.updateComponentState({ active: true });
    };
    this.handleMouseUp = () => {
      this.updateComponentState({ active: false });
    };
    this.handleKeyDown = (event) => {
      if (this.disabled || this.nonInteractive)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleItemClick();
      }
    };
    this.loading = true;
    this.mounted = false;
    this.hasCaptionSlot = false;
    this.hasLeftSlot = false;
    this.hasRightSlot = false;
    this.hasCaptionHighlight = false;
    this.hasTooltip = false;
    this.hasToggle = false;
    this.hasSubtitleSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.labelTypography = undefined;
    this.captionTypography = undefined;
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.indeterminate = false;
    this.disabled = false;
    this.highlight = '';
    this.containerState = undefined;
    this.isExtended = false;
    this.tooltipConfig = {};
    this.labelTooltipConfig = {};
    this.linkConfig = {};
    this.hidden = false;
    this.isLoadingItem = false;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  /**
   * Sets focus on the list-item element.
   */
  async setFocus() {
    setTimeout(() => {
      this.host.focus();
    }, 0);
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  typographyLabel() {
    this.applyTypographyVariables('label', this.labelTypography || {});
  }
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {});
  }
  componentWillLoad() {
    this.updateSlotData();
    this.hasRightSlot = !!this.host.querySelector('[slot="right"]');
    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon');
    }, 0);
    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle');
    }, 0);
    this.debouncedResizeHandler = debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
    this.setupLabelContentObserver();
    this.removeTriggerWrapperAttributes();
    this.typographyLabel();
    this.typographyCaption();
  }
  applyTypographyVariables(slotName, props) {
    if (!props)
      return;
    const prefix = `--wpp-list-item-${slotName}`;
    const cssAttrs = ['font-weight', 'font-size', 'font-family', 'line-height', 'letter-spacing', 'text-transform'];
    if (props.type) {
      cssAttrs.forEach(attr => {
        const varName = `--wpp-typography-${props.type}-${attr}`;
        let value = getComputedStyle(this.host).getPropertyValue(varName).trim();
        if (!value)
          value = getComputedStyle(document.body).getPropertyValue(varName).trim();
        if (value)
          this.host.style.setProperty(`${prefix}-${attr}`, value);
      });
    }
    // Only apply custom color if the component is not disabled
    if (props.color && !this.disabled) {
      // Validate and normalize the color
      const normalizedColor = getThemeColor(props.color);
      if (!isValidThemeColor(props.color)) {
        console.warn(`[WppListItem] Using non-theme color "${props.color}". ` +
          `Consider using theme colors CSS variables like "var(--wpp-brand-color)"`);
      }
      this.host.style.setProperty(`${prefix}-color`, normalizedColor);
    }
    else if (this.disabled && props.color) {
      // Remove custom color when disabled to let the disabled state color take effect
      this.host.style.removeProperty(`${prefix}-color`);
    }
  }
  disconnectedCallback() {
    this.tooltipId = uuidv4();
    if (this.labelObserver) {
      this.labelObserver.disconnect();
    }
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords({
      text: captionText,
      query: newValue || '',
      matchExactly: true,
    });
    this.hasCaptionHighlight = chunks.some(el => el.match);
  }
  handleViewChange(newContainerState) {
    if (newContainerState === 'shown') {
      this.mounted = false;
      this.loading = false;
      this.hasTooltip = false;
      setTimeout(this.handleComponentMount, 100);
    }
    // Special state for a cases when we have list items inside context menu to trigger tooltip check
    if (newContainerState === 'tooltipTrigger') {
      requestAnimationFrame(this.checkHasTooltip);
    }
  }
  disabledChanged() {
    this.typographyLabel();
    this.typographyCaption();
  }
  getHighlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords({
      text: slotText,
      query: this.highlight || '',
      matchExactly: true,
    });
    if (this.highlight && chunks.some(el => el.match)) {
      return (h("span", { class: "highlight-wrapper" }, chunks.map(({ text, match }) => match && !this.disabled ? (h("span", { key: text, class: "highlight", part: "highlight" }, text)) : (h("span", { key: text }, text)))));
    }
    return slotText;
  }
  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li';
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    const tabIndex = this.disabled ? -1 : this.nonInteractive ? -1 : 0;
    return (h(Host, { class: this.hostCssClasses(), role: PRESENTATION_ROLE, exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: tabIndex }, this.hasSubtitleSlot && (h(WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), h("ul", { onClick: this.handleItemClick, onKeyDown: this.handleKeyDown, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, class: this.ulWrapperCssClasses(), part: "ul-wrapper" }, h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (h("wpp-checkbox-v3-6-0", { disabled: this.disabled, checked: this.checked, indeterminate: this.indeterminate, internalState: displayState, part: "checkbox", name: this.checkboxName || 'wpp-list-item-checkbox' })) : (h(Fragment, null, this.tooltipConfig.leftSlot ? (h("wpp-tooltip-v3-6-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, warning: this.tooltipConfig.leftSlot.warning, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (h("wpp-tooltip-v3-6-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (h("wpp-tooltip-v3-6-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, warning: this.tooltipConfig.rightSlot.warning, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot())))));
  }
  static get registryIs() { return "wpp-list-item-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "labelTypography": ["typographyLabel"],
    "captionTypography": ["typographyCaption"],
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"],
    "disabled": ["disabledChanged"]
  }; }
  static get style() { return wppListItemCss; }
}, [1, "wpp-list-item", "wpp-list-item-v3-6-0", {
    "labelTypography": [16],
    "captionTypography": [16],
    "value": [520],
    "label": [513],
    "checked": [1540],
    "active": [516],
    "selectable": [516],
    "multiple": [516],
    "indeterminate": [516],
    "disabled": [516],
    "highlight": [513],
    "containerState": [513, "container-state"],
    "isExtended": [516, "is-extended"],
    "tooltipConfig": [16],
    "labelTooltipConfig": [16],
    "linkConfig": [16],
    "hidden": [1540],
    "isLoadingItem": [516, "is-loading-item"],
    "nonInteractive": [1540, "non-interactive"],
    "checkboxName": [513, "checkbox-name"],
    "loading": [32],
    "mounted": [32],
    "hasCaptionSlot": [32],
    "hasLeftSlot": [32],
    "hasRightSlot": [32],
    "hasCaptionHighlight": [32],
    "hasTooltip": [32],
    "hasToggle": [32],
    "hasSubtitleSlot": [32],
    "componentState": [32],
    "setFocus": [64]
  }, [[9, "resize", "onResize"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-list-item-v3-6-0", "wpp-action-button-v3-6-0", "wpp-checkbox-v3-6-0", "wpp-icon-chevron-v3-6-0", "wpp-icon-cross-v3-6-0", "wpp-icon-dash-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-info-message-v3-6-0", "wpp-icon-success-v3-6-0", "wpp-icon-tick-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-inline-message-v3-6-0", "wpp-internal-label-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-label-v3-6-0", "wpp-spinner-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-list-item-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppListItem);
      }
      break;
    case "wpp-action-button-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-checkbox-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-chevron-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-dash-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-tick-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-inline-message-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppListItem as W, defineCustomElement as d, highlightWords as h };
