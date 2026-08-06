import { proxyCustomElement, HTMLElement, createEvent, forceUpdate, h, Host, Fragment } from '@stencil/core/internal/client';
import { W as WrappedSlot } from './WrappedSlot.js';
import { u as uuidv4, k as transformToVersionedTag, g as getSlotEmptyStates, d as debounce } from './utils.js';
import { E as EVENT_SOURCE, I as INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS, a as INTERACTIVE_RIGHT_SLOT_SELECTOR, b as INTERACTIVE_RIGHT_SLOT_ROLES, P as PRESENTATION_ROLE } from './const3.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
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

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-custom-typography-height:var(--wpp-list-item-custom-typography-height, auto);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 4px 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-grey-color-800));--li-caption-text-color-selected:var(--wpp-list-item-caption-text-color-selected, var(--wpp-brand-color));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 22px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(\n    --wpp-list-item-label-text-color-selected-hover,\n    var(--wpp-brand-color-hover)\n  );--li-label-text-color-selected-active:var(\n    --wpp-list-item-label-text-color-selected-active,\n    var(--wpp-brand-color-active)\n  );--li-avatar-bg-color-selected:var(--wpp-li-avatar-bg-color-selected, var(--wpp-primary-color-200));--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-800));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 12px 0 4px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0;overflow:hidden}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]),:host .item ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon,:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item.interaction-active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.checked:not(.non-interactive,.has-toggle),:host .item .multiple:not(.non-interactive,.has-toggle),:host .item .active:not(.non-interactive,.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive,.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive,.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive,.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive,.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive,.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive,.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive,.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]),:host .item .multiple:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]),:host .item .active:not(.non-interactive,.has-toggle) ::slotted(.wpp-icon-avatar[slot=left]){--wpp-avatar-icon-bg-color:var(--li-avatar-bg-color-selected)}:host .item.checked:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption,:host .item .multiple:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption,:host .item .active:not(.non-interactive,.has-toggle).with-caption .info-wrapper .caption{color:var(--li-caption-text-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):hover .info-wrapper .caption{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .wpp-checkbox{--wpp-checkbox-bg-color-checked:var(--li-label-text-color-selected-active)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.multiple.checked:not(.non-interactive):active .info-wrapper .caption{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:start;align-items:flex-start}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0);color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:1px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-typography){margin-top:1px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-menu-context),:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-action-button){margin-top:-4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=right][type=s-body]),:host .item.disabled ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host .item.with-right-slot .info-wrapper{padding:var(--li-info-wrapper-padding)}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled,.non-interactive)){outline:none}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);background-color:var(--li-bg-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-hover);--checkbox-border-color:var(--checkbox-border-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-hover)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-200)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.has-right-slot) .item{padding:var(--li-with-right-icon-padding)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}.ul-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;padding:0;margin:0}:host(.tab-focus) .item{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);background-color:var(--li-bg-color-hover)}:host(.tab-focus) .item ::slotted([slot=left]),:host(.tab-focus) .item ::slotted([slot=right]),:host(.tab-focus) .item .fallback-icon{color:var(--li-icon-color-hover)}:host(.tab-focus) .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host([role=menuitem].tab-focus) .item,:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item{outline:none;-webkit-box-shadow:none;box-shadow:none}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active)}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon,:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host([role=menuitem].tab-focus) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]),:host([role=menuitem].tab-focus:focus-visible:not(.wpp-disabled,.non-interactive)) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--li-bg-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=left]),:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted([slot=right]),:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) .fallback-icon{color:var(--li-icon-color-active)}:host(.wpp-menu-item-active) .item:not(.checked,.active,.loading-item,.non-interactive,.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.custom-typography{height:var(--li-custom-typography-height);min-height:var(--li-height)}:host .item.custom-typography.multiple{-ms-flex-align:start;align-items:flex-start}:host .item.custom-typography.with-caption{min-height:var(--li-with-caption-height)}:host .label.custom-typography ::slotted([slot=label]){font-size:var(--wpp-list-item-label-font-size) !important;font-weight:var(--wpp-list-item-label-font-weight) !important;font-family:var(--wpp-list-item-label-font-family) !important;font-style:var(--wpp-list-item-label-font-style) !important;line-height:var(--wpp-list-item-label-line-height) !important;letter-spacing:var(--wpp-list-item-label-letter-spacing) !important;text-transform:var(--wpp-list-item-label-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-label-text-decoration) !important;text-decoration:var(--wpp-list-item-label-text-decoration) !important;color:var(--wpp-list-item-label-color) !important}:host .caption.custom-typography ::slotted([slot=caption]){font-size:var(--wpp-list-item-caption-font-size) !important;font-weight:var(--wpp-list-item-caption-font-weight) !important;font-family:var(--wpp-list-item-caption-font-family) !important;font-style:var(--wpp-list-item-caption-font-style) !important;line-height:var(--wpp-list-item-caption-line-height) !important;letter-spacing:var(--wpp-list-item-caption-letter-spacing) !important;text-transform:var(--wpp-list-item-caption-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-caption-text-decoration) !important;text-decoration:var(--wpp-list-item-caption-text-decoration) !important;color:var(--wpp-list-item-caption-color) !important}:host([data-wpp-theme=dark]){--li-label-text-color-selected:var(--wpp-primary-color-800);--li-label-text-color-selected-hover:var(--wpp-primary-color-700);--li-label-text-color-selected-active:var(--wpp-primary-color-800);--li-caption-text-color-selected:var(--wpp-primary-color-800)}:host([data-wpp-theme=dark]) .item.checked:not(.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item .multiple:not(.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item .active:not(.non-interactive,.has-toggle){--li-right-text-color:var(--wpp-primary-color-700);background-color:var(--wpp-primary-color-300)}:host([data-wpp-theme=dark]) .item:hover:not(.checked,.active,.loading-item,.non-interactive,.has-toggle){background-color:var(--wpp-grey-color-400)}:host([data-wpp-theme=dark]) .item:active:not(.checked,.active,.loading-item,.non-interactive,.has-toggle),:host([data-wpp-theme=dark]) .item:focus-visible{background-color:var(--wpp-grey-color-500)}:host(:focus-visible:not(.wpp-disabled,.non-interactive)[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}:host(.tab-focus[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}";

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
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.removeTriggerWrapperAttributes = () => {
      const menuContextTag = transformToVersionedTag('wpp-menu-context').toUpperCase();
      const menuContext = this.hostElement?.querySelector(`${menuContextTag}[slot="right"]`);
      if (menuContext) {
        let triggerWrapper = menuContext.querySelector('.trigger-wrapper');
        if (triggerWrapper) {
          triggerWrapper.removeAttribute('tabindex');
          triggerWrapper.removeAttribute('role');
        }
        else {
          this.triggerWrapperObserver = new MutationObserver(() => {
            triggerWrapper = menuContext.querySelector('.trigger-wrapper');
            if (triggerWrapper) {
              triggerWrapper.removeAttribute('tabindex');
              triggerWrapper.removeAttribute('role');
              this.triggerWrapperObserver?.disconnect();
              this.triggerWrapperObserver = undefined;
            }
          });
          this.triggerWrapperObserver.observe(menuContext, { childList: true, subtree: true });
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
          this.queueTooltipCheck();
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
      if (!this.isHostConnected())
        return;
      const hostElement = this.hostElement;
      let labelWrapper = hostElement?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = hostElement?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = hostElement?.querySelector('[slot="label"]');
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
      if (!this.isHostConnected())
        return;
      this.mounted = true;
      this.queueTooltipCheck();
      this.loading = false;
      // An item that hydrated while detached inside a menu-context Tippy popup can
      // end up with a stuck render queue: setting `loading` here updates the state
      // but never re-renders, so the host keeps the `wpp-loading` (opacity: 0) class
      // and stays invisible. Force the host to reconcile so it becomes visible.
      forceUpdate(this);
    };
    this.isHostConnected = () => this.hostElement?.isConnected ?? false;
    this.queueTooltipCheck = () => {
      if (this.tooltipAnimationFrame !== undefined)
        cancelAnimationFrame(this.tooltipAnimationFrame);
      this.tooltipAnimationFrame = requestAnimationFrame(() => {
        this.tooltipAnimationFrame = undefined;
        this.checkHasTooltip();
      });
    };
    this.clearPendingCallbacks = () => {
      if (this.focusTimeout)
        clearTimeout(this.focusTimeout);
      if (this.rightSlotIconTimeout)
        clearTimeout(this.rightSlotIconTimeout);
      if (this.toggleSlotTimeout)
        clearTimeout(this.toggleSlotTimeout);
      if (this.mountTimeout)
        clearTimeout(this.mountTimeout);
      if (this.tooltipAnimationFrame !== undefined)
        cancelAnimationFrame(this.tooltipAnimationFrame);
      this.focusTimeout = undefined;
      this.rightSlotIconTimeout = undefined;
      this.toggleSlotTimeout = undefined;
      this.mountTimeout = undefined;
      this.tooltipAnimationFrame = undefined;
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
    this.isInteractiveRightSlotElement = (eventTarget) => {
      const element = eventTarget;
      if (typeof element?.tagName !== 'string')
        return false;
      const tagName = element.tagName.toLowerCase();
      const role = element.getAttribute?.('role')?.toLowerCase();
      const tabIndex = element.getAttribute?.('tabindex');
      return (INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS.some(componentTagName => tagName === componentTagName || tagName.startsWith(`${componentTagName}-`)) ||
        (typeof element.matches === 'function' && element.matches(INTERACTIVE_RIGHT_SLOT_SELECTOR)) ||
        (role !== undefined && INTERACTIVE_RIGHT_SLOT_ROLES.includes(role)) ||
        (tabIndex !== null && Number(tabIndex) >= 0));
    };
    this.isInteractiveRightSlotEvent = (event) => {
      const composedPath = event.composedPath();
      const currentTargetIndex = composedPath.indexOf(event.currentTarget);
      const slottedContentPath = currentTargetIndex === -1 ? [event.target] : composedPath.slice(0, currentTargetIndex);
      return slottedContentPath.some(this.isInteractiveRightSlotElement);
    };
    this.handleRightWrapperClick = (event) => {
      this.eventSource = this.isInteractiveRightSlotEvent(event) ? EVENT_SOURCE.RIGHT_SLOT : null;
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
      'interaction-active': this.componentState.active,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'with-right-slot': this.hasRightSlot,
      'non-interactive': this.nonInteractive,
      'custom-typography': !!this.labelTypography || !!this.captionTypography,
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
    this.getHostRole = () => this.host.getAttribute('role') || PRESENTATION_ROLE;
    this.getHostTabIndex = () => {
      if (this.disabled || this.nonInteractive)
        return -1;
      const tabIndex = this.host.getAttribute('tabindex');
      return tabIndex === null ? 0 : Number(tabIndex);
    };
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, h(WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, h("span", { class: "highlight-text" }, this.getHighlightedText('label')))), h(WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "caption" }, h("span", { class: "highlight-text" }, this.getHighlightedText('caption'))))));
    };
    this.renderRightSlot = () => (h(WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && h("wpp-icon-chevron-v4-3-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && h("wpp-icon-tick-v4-3-0", { class: "fallback-icon", part: "icon-active" })));
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
    this.isManagedByMenuContext = () => this.host.getAttribute('role') === 'menuitem' ||
      Boolean(this.host.closest('wpp-menu-context') || this.host.closest(transformToVersionedTag('wpp-menu-context')));
    this.handleKeyDown = (event) => {
      if (this.disabled || this.nonInteractive)
        return;
      if (this.isManagedByMenuContext())
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) {
          this.updateComponentState({ active: true });
        }
        this.handleItemClick();
      }
    };
    this.handleKeyUp = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        this.updateComponentState({ active: false });
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
    this.isDarkTheme = undefined;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  /**
   * Sets focus on the list-item element.
   */
  async setFocus() {
    const hostElement = this.hostElement || this.host;
    this.focusTimeout = setTimeout(() => {
      if (!hostElement.isConnected)
        return;
      hostElement.focus();
      this.focusTimeout = undefined;
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
  onUpdateDarkTheme() {
    // In case the `list-item` component subscribed to theme changes before the parent component starts controlling the `isDarkTheme` prop.
    if (this.isDarkTheme !== undefined) {
      this.themeSubscription.stop();
    }
  }
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {});
  }
  componentWillLoad() {
    this.hostElement = this.host;
    this.updateSlotData();
    this.hasRightSlot = !!this.hostElement.querySelector('[slot="right"]');
    this.rightSlotIconTimeout = setTimeout(() => {
      if (!this.isHostConnected())
        return;
      this.hasRightSlotIcon = !!this.hostElement?.querySelector('[slot="right"].wpp-icon');
      this.rightSlotIconTimeout = undefined;
    }, 0);
    this.toggleSlotTimeout = setTimeout(() => {
      if (!this.isHostConnected())
        return;
      this.hasToggle = !!this.hostElement?.querySelector('[slot="right"].wpp-toggle');
      this.toggleSlotTimeout = undefined;
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
  connectedCallback() {
    // By default, the component will subscribe to theme changes, unless the `isDarkTheme` property is passed explicitly from the parent component (from select, autocomplete).
    // This is needed in order to avoid unnecessary subscription to theme changes for each list-item.
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.start();
    }
    this.handleComponentMount();
  }
  disconnectedCallback() {
    if (this.isDarkTheme === undefined) {
      this.themeSubscription.stop();
    }
    this.tooltipId = uuidv4();
    this.clearPendingCallbacks();
    if (this.labelObserver) {
      this.labelObserver.disconnect();
    }
    if (this.triggerWrapperObserver) {
      this.triggerWrapperObserver.disconnect();
      this.triggerWrapperObserver = undefined;
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
      this.mountTimeout = setTimeout(() => {
        this.handleComponentMount();
        this.mountTimeout = undefined;
      }, 100);
    }
    // Special state for cases when we have list items inside a context menu.
    // When hosted in a menu-context, the item hydrates while detached inside the
    // Tippy popup, so componentDidLoad's handleComponentMount bails on the
    // isHostConnected guard and the item stays stuck in the loading (opacity: 0)
    // state. The menu sets container-state='tooltipTrigger' as the popup opens,
    // but the popup may not be attached yet when this watcher fires, so defer the
    // mount to the next tick once the item is reconnected. Otherwise just run the
    // tooltip check.
    if (newContainerState === 'tooltipTrigger') {
      if (this.loading) {
        this.mountTimeout = setTimeout(() => {
          this.handleComponentMount();
          this.mountTimeout = undefined;
        }, 0);
      }
      else {
        this.queueTooltipCheck();
      }
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
    return (h(Host, { class: this.hostCssClasses(), role: this.getHostRole(), exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: this.getHostTabIndex(), ...(this.isDarkTheme !== undefined ? { 'data-wpp-theme': this.isDarkTheme ? 'dark' : 'light' } : {}), onKeyDown: this.handleKeyDown, onKeyUp: this.handleKeyUp }, this.hasSubtitleSlot && (h(WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), h("ul", { onClick: this.handleItemClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, class: this.ulWrapperCssClasses(), part: "ul-wrapper", role: this.linkConfig?.href ? PRESENTATION_ROLE : undefined }, h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (h("wpp-checkbox-v4-3-0", { isDarkTheme: this.isDarkTheme, disabled: this.disabled, checked: this.checked, indeterminate: this.indeterminate, internalState: displayState, part: "checkbox", name: this.checkboxName || 'wpp-list-item-checkbox' })) : (h(Fragment, null, this.tooltipConfig.leftSlot ? (h("wpp-tooltip-v4-3-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, warning: this.tooltipConfig.leftSlot.warning, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (h("wpp-tooltip-v4-3-0", { text: this.getSlotText('label'),
      // The tooltip anchor lives in this shadow root and is not focusable, so the
      // default `focus` trigger never fires and a truncated label stays unreadable
      // for keyboard users (SC 1.4.13). The host is the element that takes focus,
      // so it drives the tooltip while the anchor still positions it.
      config: { placement: 'right', triggerTarget: this.host, ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (h("wpp-tooltip-v4-3-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, warning: this.tooltipConfig.rightSlot.warning, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot())))));
  }
  static get registryIs() { return "wpp-list-item-v4-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "labelTypography": ["typographyLabel"],
    "isDarkTheme": ["onUpdateDarkTheme"],
    "captionTypography": ["typographyCaption"],
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"],
    "disabled": ["disabledChanged"]
  }; }
  static get style() { return wppListItemCss; }
}, [1, "wpp-list-item", "wpp-list-item-v4-3-0", {
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
    "isDarkTheme": [4, "is-dark-theme"],
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
  const components = ["wpp-list-item-v4-3-0", "wpp-action-button-v4-3-0", "wpp-checkbox-v4-3-0", "wpp-icon-chevron-v4-3-0", "wpp-icon-cross-v4-3-0", "wpp-icon-dash-v4-3-0", "wpp-icon-error-v4-3-0", "wpp-icon-info-message-v4-3-0", "wpp-icon-success-v4-3-0", "wpp-icon-tick-v4-3-0", "wpp-icon-warning-v4-3-0", "wpp-inline-message-v4-3-0", "wpp-internal-label-v4-3-0", "wpp-internal-tooltip-v4-3-0", "wpp-label-v4-3-0", "wpp-spinner-v4-3-0", "wpp-tooltip-v4-3-0", "wpp-typography-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-list-item-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppListItem);
      }
      break;
    case "wpp-action-button-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-checkbox-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-chevron-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-dash-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-tick-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-warning-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-inline-message-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppListItem as W, defineCustomElement as d, highlightWords as h };
