import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { d as debounce, j as transformToVersionedTag } from './utils-f3870f15.js';
import './consts-4b0f734e.js';

const wppTabCss = ":host{--tab-width:var(--wpp-tab-width, auto);--tab-padding-m:var(--wpp-tab-padding-m, 8px);--tab-padding-s:var(--wpp-tab-padding-s, 6px 4px);--tab-tab-font-weight:var(--wpp-tab-tab-font-weight, 400);--tab-tab-margin:var(--wpp-tab-tab-margin, 0 0 0 8px);--tab-text-color:var(--wpp-tab-text-color, var(--wpp-text-color-info));--tab-text-color-hover:var(--wpp-tab-text-color-hover, var(--wpp-brand-color-hover));--tab-text-color-active:var(--wpp-tab-text-color-active, var(--wpp-brand-color-active));--tab-text-color-selected:var(--wpp-tab-text-color-selected, var(--wpp-brand-color));--tab-text-color-disabled:var(--wpp-tab-text-color-disabled, var(--wpp-text-color-disabled));--tab-first-border-color-focus:var(--wpp-tab-first-border-color-focus, var(--wpp-grey-color-000));--tab-second-border-color-focus:var(--wpp-tab-second-border-color-focus, var(--wpp-brand-color));--tab-bg-color:var(--wpp-tab-bg-color, transparent);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;width:var(--tab-width);outline:none}:host([disabled]:not([disabled=false]):active){pointer-events:none}.wpp-tab-wrapper{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--tab-width);overflow:hidden;color:var(--tab-text-color);text-overflow:ellipsis;background-color:var(--tab-bg-color);outline:0;cursor:pointer}.wpp-tab-wrapper.tab-focus{position:relative;color:var(--tab-text-color-hover);outline:none}.wpp-tab-wrapper.tab-focus::after{border-radius:5px;outline:none;-webkit-box-shadow:0 0 0 1px var(--tab-first-border-color-focus), 0 0 0 2px var(--tab-second-border-color-focus);box-shadow:0 0 0 1px var(--tab-first-border-color-focus), 0 0 0 2px var(--tab-second-border-color-focus);position:absolute;width:calc(100% - 6px);height:calc(100% - 10px);content:\"\"}.wpp-tab-wrapper.size-m{padding:var(--tab-padding-m)}.wpp-tab-wrapper.size-s{padding:var(--tab-padding-s)}.wpp-tab-wrapper .counter{margin:var(--tab-tab-margin);font-weight:var(--tab-tab-font-weight)}.wpp-tab-wrapper:hover{color:var(--tab-text-color-hover)}.wpp-tab-wrapper:active{color:var(--tab-text-color-active)}:host([disabled]:not([disabled=false])) .wpp-tab-wrapper{color:var(--tab-text-color-disabled);cursor:not-allowed}:host([active]:not([active=false])) .wpp-tab-wrapper{color:var(--tab-text-color-selected)}";

const WppTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        this.focusType = FOCUS_TYPE.MOUSE;
      }
      else {
        this.isMouseClicked = true;
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
    });
    this.hostCssClasses = () => ({
      'wpp-tab': true,
    });
    this.focusType = undefined;
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.size = 'm';
  }
  componentDidLoad() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
  disconnectedCallback() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
  get tabIndex() {
    return this.disabled ? -1 : 0;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), tabIndex: this.tabIndex, exportparts: "wrapper, inner, counter", onClick: this.handleClickTab, onFocus: this.onFocus, onMouseDown: this.onMouseDown, onBlur: this.onBlur }, h("div", { class: this.cssClasses(), role: "option", "aria-selected": this.active ? 'true' : 'false', id: this.value, part: "wrapper" }, h("slot", { part: "inner" }), this.counter > 0 && h("div", { class: "counter", part: "counter" }, `(${this.counter})`))));
  }
  static get registryIs() { return "wpp-tab-v2-22-0"; }
  get host() { return getElement(this); }
};
WppTab.style = wppTabCss;

const TAB_MARGIN_RIGHT = 20;

const wppTabsCss = ":host{--tabs-width:var(--wpp-tabs-width, 100%);--tabs-slider-width:var(--wpp-tabs-slider-width, var(--wpp-border-width-m));--tabs-border-radius:var(--wpp-tabs-slider-border-radius, var(--wpp-border-radius-s));--tabs-slider-color:var(--wpp-tabs-slider-color, var(--wpp-grey-color-300));--tab-selected-item-slider-color:var(--wpp-tabs-selected-item-slider-color, var(--wpp-brand-color));--tab-margin-right:var(--wpp-tab-margin-right, 20px);display:block}:host ::slotted(.wpp-tab:not(:last-child)){margin-right:var(--tab-margin-right)}.wpp-tab-control-wrapper{position:relative;display:-ms-inline-flexbox;display:inline-flex;width:var(--tabs-width)}.wpp-tab-control-wrapper::after{position:absolute;bottom:-2px;width:100%;height:2px;background-color:var(--tabs-slider-color);content:\"\"}.slider{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--tab-bar-item-width);background-color:transparent;border-bottom:var(--tabs-slider-width) solid var(--tab-selected-item-slider-color);border-radius:var(--tabs-border-radius);-webkit-transform:translate(var(--tab-bar-item-transform), 0);transform:translate(var(--tab-bar-item-transform), 0);-webkit-transition:all 0.2s;transition:all 0.2s}";

const WppTabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.resizeObserver = new ResizeObserver(debounce(() => {
      this.redrawUnderline(this.position);
    }, 50));
    this.hostCssClasses = () => ({
      'wpp-tabs': true,
    });
    this.position = undefined;
    this.previousActiveTab = undefined;
    this.value = undefined;
    this.size = 'm';
  }
  handleChangeTabControlItemClick(event) {
    this.value = event.detail.value;
  }
  sizeChanged(newSize) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      tab.setAttribute('size', newSize);
    });
  }
  valueChanged(newValue) {
    this.previousActiveTab?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-tab'))).find(tab => tab.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.redrawUnderline(newValue);
    this.previousActiveTab = activeElement ?? null;
    this.wppChange.emit({ value: newValue, itemId: '' });
  }
  redrawUnderline(newPosition) {
    this.position = newPosition;
    let sumWidthOfPreviousElements = 0;
    let currentItemWidth = 0;
    let isToSumWidthOfPreviousElements = true;
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.position) {
        isToSumWidthOfPreviousElements = false;
      }
      if (isToSumWidthOfPreviousElements) {
        sumWidthOfPreviousElements += tab.clientWidth + TAB_MARGIN_RIGHT;
      }
      if (tab.value === newPosition) {
        currentItemWidth = tab.clientWidth || 0;
      }
    });
    this.host.style.setProperty('--tab-bar-item-transform', `${sumWidthOfPreviousElements}px`);
    this.host.style.setProperty('--tab-bar-item-width', `${currentItemWidth}px`);
    this.host.style.setProperty('--tab-bar-item-position', newPosition.toString());
  }
  lengthChange(newLength) {
    newLength && this.host.style.setProperty('--item-length', newLength.toString());
  }
  componentDidLoad() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.host);
    }
    let amountOfActiveTabs = 0;
    this.lengthChange(this.host.children.length);
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.value) {
        tab.setAttribute('active', 'true');
      }
      tab.setAttribute('size', this.size);
      if (tab.hasAttribute('active')) {
        amountOfActiveTabs = amountOfActiveTabs + 1;
        if (amountOfActiveTabs > 1) {
          tab.removeAttribute('active');
          return;
        }
        this.previousActiveTab = tab;
        this.redrawUnderline(tab.value);
      }
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, slider" }, h("div", { class: "wpp-tab-control-wrapper", role: "listbox", "aria-multiselectable": "false", part: "wrapper" }, h("slot", { part: "inner" })), h("div", { class: "slider", part: "slider" })));
  }
  static get registryIs() { return "wpp-tabs-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["sizeChanged"],
    "value": ["valueChanged"]
  }; }
};
WppTabs.style = wppTabsCss;

export { WppTab as wpp_tab, WppTabs as wpp_tabs };
