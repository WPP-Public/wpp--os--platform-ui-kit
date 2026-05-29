import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { k as transformToVersionedTag } from './utils.js';

const wppTabCss = ":host{--tab-width:var(--wpp-tab-width, auto);--tab-padding-m:var(--wpp-tab-padding-m, 8px);--tab-padding-s:var(--wpp-tab-padding-s, 6px 4px);--tab-tab-font-weight:var(--wpp-tab-tab-font-weight, 400);--tab-tab-margin:var(--wpp-tab-tab-margin, 0 0 0 4px);--tab-text-color:var(--wpp-tab-text-color, var(--wpp-text-color-info));--tab-text-color-hover:var(--wpp-tab-text-color-hover, var(--wpp-brand-color-hover));--tab-text-color-active:var(--wpp-tab-text-color-active, var(--wpp-brand-color-active));--tab-text-color-selected:var(--wpp-tab-text-color-selected, var(--wpp-brand-color));--tab-text-color-disabled:var(--wpp-tab-text-color-disabled, var(--wpp-text-color-disabled));--tab-first-border-color-focus:var(--wpp-tab-first-border-color-focus, var(--wpp-grey-color-000));--tab-second-border-color-focus:var(--wpp-tab-second-border-color-focus, var(--wpp-brand-color));--tab-bg-color:var(--wpp-tab-bg-color, transparent);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;width:var(--tab-width);outline:none}:host([disabled]:not([disabled=false]):active){pointer-events:none}.wpp-tab-wrapper{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--tab-width);overflow:hidden;color:var(--tab-text-color);text-overflow:ellipsis;background-color:var(--tab-bg-color);outline:0;cursor:pointer}.wpp-tab-wrapper .wpp-tab-icon{--wpp-icon-color:var(--wpp-grey-color-800);margin-right:8px}.wpp-tab-wrapper.tab-focus{position:relative;color:var(--tab-text-color-hover);outline:none}.wpp-tab-wrapper.tab-focus .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-hover)}.wpp-tab-wrapper.tab-focus::after{border-radius:5px;outline:none;-webkit-box-shadow:0 0 0 1px var(--tab-first-border-color-focus), 0 0 0 3px var(--tab-second-border-color-focus);box-shadow:0 0 0 1px var(--tab-first-border-color-focus), 0 0 0 3px var(--tab-second-border-color-focus);position:absolute;width:calc(100% - 6px);height:calc(100% - 10px);content:\"\"}.wpp-tab-wrapper.size-m{padding:var(--tab-padding-m)}.wpp-tab-wrapper.size-s{padding:var(--tab-padding-s)}.wpp-tab-wrapper .counter{margin:var(--tab-tab-margin);font-weight:var(--tab-tab-font-weight)}.wpp-tab-wrapper:hover{color:var(--tab-text-color-hover)}.wpp-tab-wrapper:hover .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-hover)}.wpp-tab-wrapper:active{color:var(--tab-text-color-active)}.wpp-tab-wrapper:active .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-active)}.wpp-icon-and-counter .wpp-tab-icon{margin-right:4px}:host([disabled]:not([disabled=false])) .wpp-tab-wrapper{color:var(--tab-text-color-disabled);cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-tab-wrapper .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-disabled)}:host([active]:not([active=false])) .wpp-tab-wrapper{color:var(--tab-text-color-selected)}:host([active]:not([active=false])) .wpp-tab-wrapper .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-selected)}:host([data-pressed=true]) .wpp-tab-wrapper,:host([active]:not([active=false])[data-pressed=true]) .wpp-tab-wrapper{color:var(--tab-text-color-active)}:host([data-pressed=true]) .wpp-tab-wrapper .wpp-tab-icon,:host([active]:not([active=false])[data-pressed=true]) .wpp-tab-wrapper .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-active)}:host([disabled]:not([disabled=false])[data-pressed=true]) .wpp-tab-wrapper{color:var(--tab-text-color-disabled)}:host([disabled]:not([disabled=false])[data-pressed=true]) .wpp-tab-wrapper .wpp-tab-icon{--wpp-icon-color:var(--tab-text-color-disabled)}";

const WppTab = /*@__PURE__*/ proxyCustomElement(class WppTab extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChangeTabControlItem = createEvent(this, "wppChangeTabControlItem", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.isMouseClicked = false;
    this.handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && document.activeElement) {
        this.host.blur();
      }
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
        window.addEventListener('mouseup', () => {
          this.pressed = false;
        }, { once: true });
      }
    };
    this.handleClickTab = () => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled)
        return;
      this.wppChangeTabControlItem.emit({ value: this.value });
    };
    this.cssClasses = () => ({
      'wpp-tab-wrapper': true,
      'wpp-tab': true,
      'tab-focus': this.focusType === 'tab-focus',
      [`size-${this.size}`]: true,
      'wpp-icon-and-counter': !!this.icon && this.counter > 0,
    });
    this.hostCssClasses = () => ({
      'wpp-tab': true,
    });
    this.focusType = undefined;
    this.pressed = false;
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.size = 'm';
    this.icon = undefined;
    this.ariaProps = undefined;
  }
  componentDidLoad() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
  // Roving tabindex: only the active, enabled tab is tabbable
  get tabIndex() {
    if (this.disabled)
      return -1;
    return this.active ? 0 : -1;
  }
  render() {
    return (h(Host, { id: this.value, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : null, "aria-controls": this.ariaProps?.tab?.controls, "aria-label": this.ariaProps?.tab?.label, "aria-describedby": this.ariaProps?.tab?.describedby, "data-pressed": this.pressed ? 'true' : null, class: this.hostCssClasses(), tabIndex: this.tabIndex, exportparts: "wrapper, inner, counter", onClick: this.handleClickTab, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onBlur: this.onBlur, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp }, h("div", { class: this.cssClasses(), part: "wrapper" }, this.icon && h(transformToVersionedTag(this.icon), { className: 'wpp-tab-icon' }), h("slot", { part: "inner" }), this.counter > 0 && h("div", { class: "counter", part: "counter" }, `(${this.counter})`))));
  }
  static get registryIs() { return "wpp-tab-v4-1-0"; }
  get host() { return this; }
  static get style() { return wppTabCss; }
}, [1, "wpp-tab", "wpp-tab-v4-1-0", {
    "active": [516],
    "disabled": [516],
    "value": [513],
    "counter": [2],
    "size": [1],
    "icon": [1],
    "ariaProps": [16],
    "focusType": [32],
    "pressed": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tab-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tab-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTab);
      }
      break;
  } });
}

export { WppTab as W, defineCustomElement as d };
