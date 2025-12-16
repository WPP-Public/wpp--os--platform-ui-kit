import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$8 } from './wpp-action-button2.js';
import { d as defineCustomElement$7 } from './wpp-button2.js';
import { d as defineCustomElement$6 } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$5 } from './wpp-spinner2.js';
import { d as defineCustomElement$4 } from './wpp-tab2.js';
import { d as defineCustomElement$3 } from './wpp-tabs2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const MULTIPLE_PRIMARY_BUTTONS_ERROR = 'Only one primary button allowed in the sticky bar.';
const TOO_MANY_SECONDARY_BUTTONS_ERROR = 'Only 2 secondary buttons allowed in the sticky bar.';
const MULTIPLE_ACTION_BUTTONS_ERROR = 'Only one action button allowed in the sticky bar.';
const MAXIMUM_PRIMARY_BUTTONS = 1;
const MAXIMUM_SECONDARY_BUTTONS = 2;
const MAXIMUM_ACTION_BUTTONS = 1;
const INITIAL_BUTTONS_LIST_VALUE = [null, null, null, null];
const DEFAULT_SCROLL_TRESHOLD = 200;

const wppStickyBarCss = ":host{--sticky-bar-offset-top:var(--wpp-sticky-bar-offset-top, 63px);--sticky-bar-padding:var(--wpp-sticky-bar-padding, 12px 32px);--sticky-bar-header-size:var(--wpp-sticky-bar-header-size, 32px);--sticky-bar-header-size-m:var(--wpp-sticky-bar-header-size-m, 40px);--sticky-bar-with-tabs-body-height:var(--wpp-sticky-bar-with-tabs-body-height, 36px);width:100%;position:fixed;left:0;top:0;right:0;z-index:4;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host .container{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--wpp-grey-color-000);padding:var(--sticky-bar-padding);position:relative}:host .container::before{position:absolute;content:\"\";bottom:0;left:0;width:100%;height:1px;background:var(--wpp-grey-color-300)}:host .container .header{height:var(--sticky-bar-header-size);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host .container .header .left-area,:host .container .header .right-area{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .container .header .left-area .wpp-action-button{margin-right:4px}:host .container .header .right-area .wpp-button,:host .container .header .right-area .wpp-action-button{margin-right:12px}:host .container .header .right-area .wpp-button:last-child,:host .container .header .right-area .wpp-action-button:last-child{margin-right:0}:host .container .body{height:var(--sticky-bar-header-size);margin-top:8px;--wpp-tabs-width:auto;--wpp-tab-width:auto}:host(.wpp-visible){-webkit-transition:0.3s ease;transition:0.3s ease;top:var(--sticky-bar-offset-top);-webkit-transform:translateY(0);transform:translateY(0)}:host(.wpp-invisible){-webkit-transition:0.3s ease;transition:0.3s ease;top:0;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host(.wpp-blank) .container{height:96px}:host(.wpp-two-lines-with-tabs) .container{padding-bottom:0}:host(.wpp-two-lines-with-tabs) .container .body{height:var(--sticky-bar-with-tabs-body-height)}";

const WppStickyBar$1 = /*@__PURE__*/ proxyCustomElement(class WppStickyBar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClickBackIcon = createEvent(this, "wppClickBackIcon", 1);
    this.wppClickBtn = createEvent(this, "wppClickBtn", 1);
    this.wppClickTab = createEvent(this, "wppClickTab", 1);
    this.getHeightOfOsBar = () => {
      const appContainer = document.body.querySelector('div.wpp');
      if (appContainer) {
        const headerEl = appContainer.querySelector(':scope > header');
        this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${headerEl ? headerEl.clientHeight : 0}px`);
      }
    };
    this.getButtonsList = () => {
      let primaryBtns = 0;
      let secondaryBtns = 0;
      let actionBtns = 0;
      const buttonsListProxy = [...INITIAL_BUTTONS_LIST_VALUE];
      this.buttons.forEach((buttonItem) => {
        switch (buttonItem.variant) {
          case 'primary': {
            primaryBtns++;
            if (primaryBtns > MAXIMUM_PRIMARY_BUTTONS) {
              throw new Error(MULTIPLE_PRIMARY_BUTTONS_ERROR);
            }
            buttonsListProxy[3] = buttonItem;
            break;
          }
          case 'secondary': {
            secondaryBtns++;
            if (secondaryBtns > MAXIMUM_SECONDARY_BUTTONS) {
              throw new Error(TOO_MANY_SECONDARY_BUTTONS_ERROR);
            }
            buttonsListProxy[3 - secondaryBtns] = buttonItem;
            break;
          }
          default: {
            actionBtns++;
            if (actionBtns > MAXIMUM_ACTION_BUTTONS) {
              throw new Error(MULTIPLE_ACTION_BUTTONS_ERROR);
            }
            buttonsListProxy[0] = buttonItem;
            break;
          }
        }
      });
      this.buttonsList = buttonsListProxy;
    };
    this.handleLeftIconClick = () => {
      this.wppClickBackIcon.emit();
    };
    this.handleButtonClick = (btnIndex) => {
      this.wppClickBtn.emit(this.buttonsList[btnIndex] || undefined);
    };
    this.handleTabClick = (event) => {
      this.currentTab = event.detail.value;
      this.wppClickTab.emit(this.tabs.find((tabItem) => tabItem.value === event.detail.value));
    };
    this.hostCssClasses = () => ({
      'wpp-sticky-bar': true,
      [`wpp-${this.variant}`]: true,
      [`wpp-${this.visibility}`]: true,
    });
    this.visibility = '';
    this.scrollDirection = 'down';
    this.currentTab = '';
    this.currentSize = 'm';
    this.buttonsList = [];
    this.variant = 'one-line';
    this.barTitle = undefined;
    this.offsetFromTop = undefined;
    this.zIndex = Z_INDEX.STICKY_BAR;
    this.withBackButton = true;
    this.scrollTreshold = DEFAULT_SCROLL_TRESHOLD;
    this.buttons = [];
    this.tabs = [];
  }
  updateButtons() {
    this.getButtonsList();
  }
  updateTabs(newValue) {
    if (newValue.length > 0) {
      if (!newValue.find((tabItem) => tabItem.value === this.currentTab)) {
        this.currentTab = newValue[0].value;
      }
    }
    else {
      this.currentTab = '';
    }
  }
  updateOffset(newValue) {
    this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${newValue}px`);
  }
  handleScroll() {
    this.visibility = window.scrollY > this.scrollTreshold ? `visible` : `invisible`;
  }
  componentWillLoad() {
    if (this.buttons.length > 0) {
      this.getButtonsList();
    }
    if (this.tabs.length > 0) {
      this.currentTab = this.tabs[0].value;
    }
    if (this.zIndex) {
      this.host.style.zIndex = `${this.zIndex}`;
    }
  }
  componentDidLoad() {
    if (!this.offsetFromTop) {
      setTimeout(() => {
        this.getHeightOfOsBar();
      }, 0);
    }
    else {
      this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${this.offsetFromTop}px`);
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("div", { class: "container" }, this.variant === 'blank' ? (h("slot", { name: "content" })) : (h(Fragment, null, h("div", { class: "header" }, h("div", { class: "left-area" }, this.withBackButton && (h("wpp-action-button-v3-4-0", { variant: "secondary", onClick: this.handleLeftIconClick }, h("wpp-icon-chevron-v3-4-0", { slot: "icon-start", direction: "left" }))), h("wpp-typography-v3-4-0", { class: "bar-title", type: 'm-strong' }, this.barTitle)), h("div", { class: "right-area" }, this.buttonsList.map((buttonItem, btnIndex) => {
      if (!buttonItem)
        return null;
      if (buttonItem.variant === 'action-button') {
        return (h("wpp-action-button-v3-4-0", { key: buttonItem.text, onClick: () => this.handleButtonClick(btnIndex), variant: "primary" }, buttonItem.text));
      }
      return (h("wpp-button-v3-4-0", { size: "s", onClick: () => this.handleButtonClick(btnIndex), key: buttonItem.text, variant: buttonItem.variant }, buttonItem.text));
    }))), this.variant !== 'one-line' && (h("div", { class: "body" }, this.variant === 'two-lines' ? (h("slot", { name: "content" })) : (this.tabs.length > 0 && (h("wpp-tabs-v3-4-0", { size: "s", onWppChange: this.handleTabClick, value: this.currentTab }, this.tabs.map((tabItem) => (h("wpp-tab-v3-4-0", { size: "s", key: tabItem.value, value: tabItem.value }, tabItem.text)))))))))))));
  }
  static get registryIs() { return "wpp-sticky-bar-v3-4-0"; }
  get host() { return this; }
  static get watchers() { return {
    "buttons": ["updateButtons"],
    "tabs": ["updateTabs"],
    "offsetFromTop": ["updateOffset"]
  }; }
  static get style() { return wppStickyBarCss; }
}, [1, "wpp-sticky-bar", "wpp-sticky-bar-v3-4-0", {
    "variant": [1],
    "barTitle": [1, "bar-title"],
    "offsetFromTop": [2, "offset-from-top"],
    "zIndex": [2, "z-index"],
    "withBackButton": [4, "with-back-button"],
    "scrollTreshold": [2, "scroll-treshold"],
    "buttons": [16],
    "tabs": [16],
    "visibility": [32],
    "scrollDirection": [32],
    "currentTab": [32],
    "currentSize": [32],
    "buttonsList": [32]
  }, [[9, "scroll", "handleScroll"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-sticky-bar-v3-4-0", "wpp-action-button-v3-4-0", "wpp-button-v3-4-0", "wpp-icon-chevron-v3-4-0", "wpp-spinner-v3-4-0", "wpp-tab-v3-4-0", "wpp-tabs-v3-4-0", "wpp-typography-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-sticky-bar-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppStickyBar$1);
      }
      break;
    case "wpp-action-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-button-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-chevron-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-spinner-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-tab-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tabs-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppStickyBar = WppStickyBar$1;
const defineCustomElement = defineCustomElement$1;

export { WppStickyBar, defineCustomElement };
