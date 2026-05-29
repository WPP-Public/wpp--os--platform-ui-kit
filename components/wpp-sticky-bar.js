import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { Z as Z_INDEX } from './consts.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { d as defineCustomElement$9 } from './wpp-action-button2.js';
import { d as defineCustomElement$8 } from './wpp-button2.js';
import { d as defineCustomElement$7 } from './wpp-divider2.js';
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

const wppStickyBarCss = ":host{--sticky-bar-offset-top:var(--wpp-sticky-bar-offset-top, 63px);width:100%;position:fixed;-webkit-box-sizing:border-box;box-sizing:border-box;left:0;top:0;right:0;z-index:4;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host .container{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--wpp-grey-color-000);padding:12px 28px;position:relative}:host .container .header{height:32px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host .container .header .left-area,:host .container .header .right-area{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .container .header .left-area .wpp-action-button{margin-right:4px}:host .container .header .right-area .wpp-button,:host .container .header .right-area .wpp-action-button{margin-right:12px}:host .container .header .right-area .wpp-button:last-child,:host .container .header .right-area .wpp-action-button:last-child{margin-right:0}:host .container .body{margin-top:8px;--wpp-tabs-width:auto;--wpp-tab-width:auto}:host .wpp-divider{position:absolute;bottom:0;left:0;right:0}@media (min-width: 1280px){:host .container{padding:12px 28px}}@media (min-width: 1366px){:host .container{padding:12px 36px}}@media (min-width: 1440px){:host .container{padding:12px 38px}}@media (min-width: 1920px){:host .container{padding:12px 54px}}:host(.wpp-sticky-bar-medium) .container .header{height:24px}:host(.wpp-sticky-bar-medium) .body{height:32px}:host(.wpp-sticky-bar-with-tabs) .container{padding-bottom:0}:host(.wpp-sticky-bar-with-tabs) .container .body{height:36px}:host(.wpp-sticky-bar-with-tabs) .container .body.has-tabs{height:auto}:host(.wpp-visible){-webkit-transition:0.3s ease;transition:0.3s ease;top:var(--sticky-bar-offset-top);-webkit-transform:translateY(0);transform:translateY(0)}:host(.wpp-invisible){-webkit-transition:0.3s ease;transition:0.3s ease;top:0;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host([data-wpp-theme=dark]) .container{background-color:var(--wpp-grey-color-100)}";

const WppStickyBar$1 = /*@__PURE__*/ proxyCustomElement(class WppStickyBar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClickBackIcon = createEvent(this, "wppClickBackIcon", 1);
    this.wppClickBtn = createEvent(this, "wppClickBtn", 1);
    this.wppClickTab = createEvent(this, "wppClickTab", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.getHeightOfOsBar = () => {
      const appContainer = document.body.querySelector('div.wpp');
      if (appContainer) {
        const headerEl = appContainer.querySelector(':scope > header');
        this.host.style.setProperty('--wpp-sticky-bar-offset-top', `${headerEl ? headerEl.clientHeight : 0}px`);
      }
    };
    this.getButtonsList = () => {
      if (!this.buttons) {
        this.buttonsList = [];
        return;
      }
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
      if (!this.buttonsList[btnIndex])
        return;
      this.wppClickBtn.emit(this.buttonsList[btnIndex] || undefined);
    };
    this.handleTabClick = (event) => {
      this.currentTab = event.detail.value;
      this.wppClickTab.emit(this.tabs.find((tabItem) => tabItem.value === event.detail.value));
    };
    this.hostCssClasses = () => ({
      'wpp-sticky-bar': true,
      [`wpp-sticky-bar-${this.variant}`]: true,
      [`wpp-${this.visibility}`]: true,
    });
    this.visibility = '';
    this.currentTab = '';
    this.buttonsList = [];
    this.variant = 'small';
    this.barTitle = undefined;
    this.offsetFromTop = undefined;
    this.zIndex = Z_INDEX.STICKY_BAR;
    this.withBackButton = true;
    this.scrollTreshold = DEFAULT_SCROLL_TRESHOLD;
    this.buttons = [];
    this.tabs = [];
    this.tabSize = 's';
  }
  updateButtons() {
    if (this.variant === 'small') {
      this.getButtonsList();
    }
  }
  updateTabs(newValue) {
    if (newValue?.length > 0) {
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
    if (this.buttons?.length > 0 && this.variant === 'small') {
      this.getButtonsList();
    }
    else {
      this.buttonsList = [];
    }
    if (this.tabs?.length > 0) {
      this.currentTab = this.tabs[0].value;
    }
    if (this.zIndex) {
      this.host.style.zIndex = `${this.zIndex}`;
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
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
    return (h(Host, { class: this.hostCssClasses() }, h("div", { class: "container" }, h("div", { class: "header" }, h("div", { class: "left-area" }, this.withBackButton && (h("wpp-action-button-v4-1-0", { variant: "secondary", onClick: this.handleLeftIconClick }, h("wpp-icon-chevron-v4-1-0", { slot: "icon-start", direction: "left" }))), h("wpp-typography-v4-1-0", { class: "bar-title", type: 'm-strong' }, this.barTitle)), this.variant === 'small' && (h("div", { class: "right-area" }, this.buttonsList.map((buttonItem, btnIndex) => {
      if (!buttonItem)
        return null;
      if (buttonItem.variant === 'action-button') {
        return (h("wpp-action-button-v4-1-0", { key: buttonItem.text, onClick: () => this.handleButtonClick(btnIndex), variant: "primary" }, buttonItem.text));
      }
      return (h("wpp-button-v4-1-0", { size: "s", onClick: () => this.handleButtonClick(btnIndex), key: buttonItem.text, variant: buttonItem.variant }, buttonItem.text));
    })))), this.variant !== 'small' ? (h("div", { class: `body ${this.tabs?.length > 0 ? 'has-tabs' : ''}` }, this.variant === 'medium' ? (h("slot", { name: "content" })) : (this.tabs?.length > 0 && (h("wpp-tabs-v4-1-0", { size: this.tabSize, onWppChange: this.handleTabClick, value: this.currentTab }, this.tabs.map((tabItem) => {
      const { text, ...restProps } = tabItem;
      return (h("wpp-tab-v4-1-0", { size: this.tabSize, key: tabItem.value, ...restProps }, tabItem.text));
    })))))) : null), h("wpp-divider-v4-1-0", null)));
  }
  static get registryIs() { return "wpp-sticky-bar-v4-1-0"; }
  get host() { return this; }
  static get watchers() { return {
    "buttons": ["updateButtons"],
    "tabs": ["updateTabs"],
    "offsetFromTop": ["updateOffset"]
  }; }
  static get style() { return wppStickyBarCss; }
}, [1, "wpp-sticky-bar", "wpp-sticky-bar-v4-1-0", {
    "variant": [1],
    "barTitle": [1, "bar-title"],
    "offsetFromTop": [2, "offset-from-top"],
    "zIndex": [2, "z-index"],
    "withBackButton": [4, "with-back-button"],
    "scrollTreshold": [2, "scroll-treshold"],
    "buttons": [16],
    "tabs": [16],
    "tabSize": [1, "tab-size"],
    "visibility": [32],
    "currentTab": [32],
    "buttonsList": [32]
  }, [[9, "scroll", "handleScroll"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-sticky-bar-v4-1-0", "wpp-action-button-v4-1-0", "wpp-button-v4-1-0", "wpp-divider-v4-1-0", "wpp-icon-chevron-v4-1-0", "wpp-spinner-v4-1-0", "wpp-tab-v4-1-0", "wpp-tabs-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-sticky-bar-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppStickyBar$1);
      }
      break;
    case "wpp-action-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-divider-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-chevron-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-tab-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tabs-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppStickyBar = WppStickyBar$1;
const defineCustomElement = defineCustomElement$1;

export { WppStickyBar, defineCustomElement };
