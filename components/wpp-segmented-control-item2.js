import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { W as WrappedSlot } from './WrappedSlot.js';
import { F as FOCUS_TYPE } from './common.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';

const wppSegmentedControlItemCss = ":host{--sc-item-height-m:var(--wpp-segmented-control-item-height-m, 40px);--sc-item-height-s:var(--wpp-segmented-control-item-height-s, 32px);--sc-item-border-radius-m:var(--wpp-segmented-control-item-border-radius-m, var(--wpp-border-radius-m));--sc-item-border-radius-s:var(--wpp-segmented-control-item-border-radius-s, var(--wpp-border-radius-s));--sc-item-icon-padding-m:var(--wpp-segmented-control-item-icon-padding-m, 6px);--sc-item-icon-padding-s:var(--wpp-segmented-control-item-icon-padding-s, 4px);--sc-item-counter-font-weight:var(--wpp-segmented-control-item-counter-font-weight, 400);--sc-item-border-width:var(--wpp-segmented-control-item-border-width, 1px);--sc-item-border-style:var(--wpp-segmented-control-item-border-style, solid);--sc-item-border-color:var(--wpp-segmented-control-item-border-color, var(--wpp-grey-color-500));--sc-item-bg-color:var(--wpp-segmented-control-item-bg-color, transparent);--sc-item-text-padding-m:var(--wpp-segmented-control-item-text-padding-m, 9px 16px);--sc-item-text-padding-s:var(--wpp-segmented-control-item-text-padding-s, 5px 12px);--sc-item-text-border-color:var(--wpp-segmented-control-item-text-border-color, var(--wpp-grey-color-500));--sc-item-text-border-color-hover:var(\n    --wpp-segmented-control-item-text-border-color-hover,\n    var(--wpp-grey-color-500)\n  );--sc-item-text-border-color-active:var(\n    --wpp-segmented-control-item-text-border-color-active,\n    var(--wpp-grey-color-500)\n  );--sc-item-text-border-color-selected:var(\n    --wpp-segmented-control-item-text-border-color-selected,\n    var(--wpp-brand-color)\n  );--sc-item-text-border-color-disabled:var(\n    --wpp-segmented-control-item-text-border-color-disabled,\n    var(--wpp-grey-color-400)\n  );--sc-item-text-color:var(--wpp-segmented-control-item-text-color, var(--wpp-text-color-info));--sc-item-text-color-hover:var(--wpp-segmented-control-item-text-color-hover, var(--wpp-text-color));--sc-item-text-color-active:var(--wpp-segmented-control-item-text-color-active, var(--wpp-text-color));--sc-item-text-color-selected:var(--wpp-segmented-control-item-text-color-selected, var(--wpp-brand-color));--sc-item-text-color-disabled:var(--wpp-segmented-control-item-text-color-disabled, var(--wpp-text-color-disabled));--sc-item-text-bg-color-hover:var(--wpp-segmented-control-item-text-bg-color-hover, var(--wpp-grey-color-200));--sc-item-text-bg-color-active:var(--wpp-segmented-control-item-text-bg-color-active, var(--wpp-grey-color-300));--sc-item-text-bg-color-selected:var(\n    --wpp-segmented-control-item-text-bg-color-selected,\n    var(--wpp-primary-color-100)\n  );--sc-item-text-bg-color-disabled:var(--wpp-segmented-control-item-text-bg-color-disabled, transparent);--sc-item-icon-border-color:var(--wpp-segmented-control-item-icon-border-color, var(--wpp-grey-color-500));--sc-item-icon-border-color-hover:var(\n    --wpp-segmented-control-item-icon-border-color-hover,\n    var(--wpp-grey-color-500)\n  );--sc-item-icon-border-color-active:var(\n    --wpp-segmented-control-item-icon-border-color-active,\n    var(--wpp-grey-color-500)\n  );--sc-item-icon-border-color-selected:var(\n    --wpp-segmented-control-item-icon-border-color-selected,\n    var(--wpp-brand-color)\n  );--sc-item-icon-border-color-disabled:var(\n    --wpp-segmented-control-item-icon-border-color-disabled,\n    var(--wpp-grey-color-400)\n  );--sc-item-icon-color:var(--wpp-segmented-control-item-icon-color, var(--wpp-icon-color));--sc-item-icon-color-hover:var(--wpp-segmented-control-item-icon-color-hover, var(--wpp-icon-color-hover));--sc-item-icon-color-active:var(--wpp-segmented-control-item-icon-color-active, var(--wpp-icon-color-active));--sc-item-icon-color-selected:var(--wpp-segmented-control-item-icon-color-selected, var(--wpp-brand-color));--sc-item-icon-color-disabled:var(--wpp-segmented-control-item-icon-color-disabled, var(--wpp-grey-color-400));--sc-item-icon-bg-color-hover:var(--wpp-segmented-control-item-icon-bg-color-hover, var(--wpp-grey-color-200));--sc-item-icon-bg-color-active:var(--wpp-segmented-control-item-icon-bg-color-active, var(--wpp-grey-color-300));--sc-item-icon-bg-color-selected:var(\n    --wpp-segmented-control-item-icon-bg-color-selected,\n    var(--wpp-primary-color-100)\n  );--sc-item-icon-bg-color-disabled:var(--wpp-segmented-control-item-icon-bg-color-disabled, transparent);--sc-item-text-border-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-border-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-text-bg-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-bg-color-selected-disabled,\n    var(--wpp-primary-color-100)\n  );--sc-item-text-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-icon-border-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-border-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-icon-bg-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-bg-color-selected-disabled,\n    var(--wpp-primary-color-100)\n  );--sc-item-icon-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;outline:none;width:100%}:host([disabled]:not([disabled=false]):active){pointer-events:none}:host(:first-child) .segmented-control-item.size-m{border-top-left-radius:var(--sc-item-border-radius-m);border-bottom-left-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-right:none}:host(:first-child) .segmented-control-item.size-s{border-top-left-radius:var(--sc-item-border-radius-s);border-bottom-left-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-right:none}:host(:first-child) .segmented-control-item.disabled{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-disabled);border-right:none}:host(:last-child) .segmented-control-item.size-m{border-top-right-radius:var(--sc-item-border-radius-m);border-bottom-right-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-left:none}:host(:last-child) .segmented-control-item.size-s{border-top-right-radius:var(--sc-item-border-radius-s);border-bottom-right-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-left:none}:host(:last-child) .segmented-control-item.disabled{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-disabled);border-left:none}:host(:first-child:last-child) .segmented-control-item.size-m{border-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}:host(:first-child:last-child) .segmented-control-item.size-s{border-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}:host(:not(:first-child,:last-child)) .segmented-control-item{border-left:none;border-right:none}.content-wrapper{display:-ms-flexbox;display:flex}.segmented-control-item{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;width:100%;color:var(--sc-item-text-color);text-overflow:ellipsis;background-color:var(--sc-item-bg-color);outline:0;cursor:pointer;white-space:nowrap;border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}.segmented-control-item.size-s{height:var(--sc-item-height-s)}.segmented-control-item.size-m{height:var(--sc-item-height-m)}.segmented-control-item .counter{padding-left:4px;font-weight:var(--sc-item-counter-font-weight)}.segmented-control-item.icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color)}.segmented-control-item.icon .counter{padding:0}.segmented-control-item.icon .content-wrapper{padding:var(--sc-item-icon-padding-m)}.segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color)}.segmented-control-item.icon.size-s .content-wrapper{padding:var(--sc-item-icon-padding-s)}.segmented-control-item.icon.size-s .content-wrapper ::slotted(*){color:var(--sc-item-icon-color)}.segmented-control-item.icon:hover{background-color:var(--sc-item-icon-bg-color-hover)}.segmented-control-item.icon:hover .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-hover)}.segmented-control-item.icon:active{background-color:var(--sc-item-icon-bg-color-active)}.segmented-control-item.icon:active .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-active)}.segmented-control-item.text{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color)}.segmented-control-item.text.size-m{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--sc-item-text-padding-m)}.segmented-control-item.text.size-s{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--sc-item-text-padding-s)}.segmented-control-item.text:hover{color:var(--sc-item-text-color-hover);background-color:var(--sc-item-text-bg-color-hover);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover)}.segmented-control-item.text:active{color:var(--sc-item-text-color-active);background-color:var(--sc-item-text-bg-color-active);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active)}:host([active]:not([active=false])) .segmented-control-item.icon{outline-offset:calc(var(--sc-item-border-width) * -1);outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color-selected);background-color:var(--sc-item-icon-bg-color-selected);-webkit-transition:background-color 500ms ease, color 500ms ease;transition:background-color 500ms ease, color 500ms ease}:host([active]:not([active=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-selected)}:host([active]:not([active=false])) .segmented-control-item.text{outline-offset:calc(var(--sc-item-border-width) * -1);outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-selected);color:var(--sc-item-text-color-selected);background-color:var(--sc-item-text-bg-color-selected);-webkit-transition:background-color 500ms ease, color 500ms ease;transition:background-color 500ms ease, color 500ms ease}:host([disabled]:not([disabled=false])) .segmented-control-item.icon{background-color:var(--sc-item-icon-bg-color-disabled);cursor:not-allowed}:host([disabled]:not([disabled=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-disabled)}:host([disabled]:not([disabled=false])) .segmented-control-item.text{color:var(--sc-item-text-color-disabled);background-color:var(--sc-item-text-bg-color-disabled);cursor:not-allowed}:host(:focus-visible) .segmented-control-item,:host(.tab-focus) .segmented-control-item{z-index:1}:host(:focus-visible) .segmented-control-item.size-s,:host(.tab-focus) .segmented-control-item.size-s{border-radius:var(--sc-item-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color)}:host(:focus-visible) .segmented-control-item.size-m,:host(.tab-focus) .segmented-control-item.size-m{border-radius:var(--sc-item-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color)}:host(:focus-visible) .segmented-control-item:not(.active),:host(.tab-focus) .segmented-control-item:not(.active){outline:none;background-color:var(--sc-item-icon-bg-color-hover)}:host(:focus-visible) .segmented-control-item:not(.active).text,:host(.tab-focus) .segmented-control-item:not(.active).text{color:var(--sc-item-text-color-hover);background-color:var(--sc-item-text-bg-color-hover);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover)}:host(:focus-visible) .segmented-control-item:not(.active).icon .content-wrapper ::slotted(*),:host(.tab-focus) .segmented-control-item:not(.active).icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-hover)}:host([data-pressed]:not([disabled],[disabled=false])) .segmented-control-item.icon{background-color:var(--sc-item-icon-bg-color-active)}:host([data-pressed]:not([disabled],[disabled=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-active)}:host([data-pressed]:not([disabled],[disabled=false])) .segmented-control-item.text{color:var(--sc-item-text-color-active);background-color:var(--sc-item-text-bg-color-active);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item{cursor:not-allowed}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.icon{cursor:not-allowed;outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-selected-disabled);background-color:var(--sc-item-icon-bg-color-selected-disabled)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-selected-disabled)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.text{cursor:not-allowed;outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color-selected-disabled);color:var(--sc-item-text-color-selected-disabled);background-color:var(--sc-item-text-bg-color-selected-disabled)}:host([data-wpp-theme=dark]){--sc-item-text-bg-color-selected:var(--wpp-primary-color-300);--sc-item-text-color-selected:var(--wpp-primary-color-800)}";

let instanceCounter = 0;
const WppSegmentedControlItem = /*@__PURE__*/ proxyCustomElement(class WppSegmentedControlItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChangeSegmentedControlItem = createEvent(this, "wppChangeSegmentedControlItem", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.isMouseClicked = false;
    this.uniqueId = `sc-tab-${++instanceCounter}`;
    this.mouseUpHandler = () => {
      this.pressed = false;
    };
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.handleClickSegmentedControl = () => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled)
        return;
      this.wppChangeSegmentedControlItem.emit({ value: this.value });
    };
    this.onFocus = (event) => {
      this.focusType = this.isMouseClicked ? FOCUS_TYPE.MOUSE : FOCUS_TYPE.TAB;
      this.isMouseClicked = false;
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = FOCUS_TYPE.NONE;
      this.pressed = false;
      this.wppBlur.emit(event);
    };
    this.onKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = true;
      }
    };
    this.onKeyUp = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        this.pressed = false;
      }
    };
    this.onMouseDown = () => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        this.focusType = FOCUS_TYPE.MOUSE;
      }
      else {
        this.isMouseClicked = true;
      }
      if (!this.disabled) {
        this.pressed = true;
        window.addEventListener('mouseup', this.mouseUpHandler, { once: true });
      }
    };
    this.cssClasses = () => ({
      'segmented-control-item': true,
      [`size-${this.size}`]: true,
      [`${this.variant}`]: true,
      active: this.active,
      disabled: this.disabled,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control-item': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.focusType = undefined;
    this.pressed = false;
    this.size = 'm';
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.variant = 'text';
    this.hugContentOff = false;
    this.ariaProps = undefined;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    window.removeEventListener('mouseup', this.mouseUpHandler);
  }
  // Roving tabindex: only the active, enabled item is tabbable
  get tabIndex() {
    if (this.disabled)
      return -1;
    return this.active ? 0 : -1;
  }
  render() {
    return (h(Host, { id: this.uniqueId, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, "aria-controls": this.ariaProps?.tab?.controls, "aria-label": this.ariaProps?.tab?.label, "aria-describedby": this.ariaProps?.tab?.describedby, "data-pressed": this.pressed ? 'true' : null, tabIndex: this.tabIndex, onClick: this.handleClickSegmentedControl, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onBlur: this.onBlur, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, class: this.hostCssClasses(), exportparts: "item" }, h("div", { class: this.cssClasses(), part: "item" }, h(WrappedSlot, { wrapperClass: "content-wrapper" }), this.variant === 'text' && this.counter > 0 && h("div", { class: "counter" }, `(${this.counter})`))));
  }
  static get registryIs() { return "wpp-segmented-control-item-v4-1-0"; }
  get host() { return this; }
  static get style() { return wppSegmentedControlItemCss; }
}, [1, "wpp-segmented-control-item", "wpp-segmented-control-item-v4-1-0", {
    "size": [1],
    "active": [516],
    "disabled": [516],
    "value": [520],
    "counter": [2],
    "variant": [1],
    "hugContentOff": [516, "hug-content-off"],
    "ariaProps": [16],
    "focusType": [32],
    "pressed": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-segmented-control-item-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-segmented-control-item-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSegmentedControlItem);
      }
      break;
  } });
}

export { WppSegmentedControlItem as W, defineCustomElement as d };
