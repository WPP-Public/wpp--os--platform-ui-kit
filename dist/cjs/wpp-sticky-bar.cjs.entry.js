'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const consts = require('./consts-779fd4ec.js');

const MULTIPLE_PRIMARY_BUTTONS_ERROR = 'Only one primary button allowed in the sticky bar.';
const TOO_MANY_SECONDARY_BUTTONS_ERROR = 'Only 2 secondary buttons allowed in the sticky bar.';
const MULTIPLE_ACTION_BUTTONS_ERROR = 'Only one action button allowed in the sticky bar.';
const MAXIMUM_PRIMARY_BUTTONS = 1;
const MAXIMUM_SECONDARY_BUTTONS = 2;
const MAXIMUM_ACTION_BUTTONS = 1;
const INITIAL_BUTTONS_LIST_VALUE = [null, null, null, null];
const DEFAULT_SCROLL_TRESHOLD = 200;

const wppStickyBarCss = ":host{--sticky-bar-offset-top:var(--wpp-sticky-bar-offset-top, 63px);--sticky-bar-padding:var(--wpp-sticky-bar-padding, 12px 32px);--sticky-bar-header-size:var(--wpp-sticky-bar-header-size, 32px);--sticky-bar-header-size-m:var(--wpp-sticky-bar-header-size-m, 40px);--sticky-bar-with-tabs-body-height:var(--wpp-sticky-bar-with-tabs-body-height, 36px);width:100%;position:fixed;left:0;top:0;right:0;z-index:4;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host .container{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--wpp-grey-color-000);padding:var(--sticky-bar-padding);position:relative}:host .container::before{position:absolute;content:\"\";bottom:0;left:0;width:100%;height:1px;background:var(--wpp-grey-color-300)}:host .container .header{height:var(--sticky-bar-header-size);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}:host .container .header .left-area,:host .container .header .right-area{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .container .header .left-area .wpp-action-button{margin-right:4px}:host .container .header .right-area .wpp-button,:host .container .header .right-area .wpp-action-button{margin-right:12px}:host .container .header .right-area .wpp-button:last-child,:host .container .header .right-area .wpp-action-button:last-child{margin-right:0}:host .container .body{height:var(--sticky-bar-header-size);margin-top:8px;--wpp-tabs-width:auto;--wpp-tab-width:auto}:host(.wpp-visible){-webkit-transition:0.3s ease;transition:0.3s ease;top:var(--sticky-bar-offset-top);-webkit-transform:translateY(0);transform:translateY(0)}:host(.wpp-invisible){-webkit-transition:0.3s ease;transition:0.3s ease;top:0;-webkit-transform:translateY(-100%);transform:translateY(-100%)}:host(.wpp-blank) .container{height:96px}:host(.wpp-two-lines-with-tabs) .container{padding-bottom:0}:host(.wpp-two-lines-with-tabs) .container .body{height:var(--sticky-bar-with-tabs-body-height)}";

const WppStickyBar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClickBackIcon = index.createEvent(this, "wppClickBackIcon", 1);
    this.wppClickBtn = index.createEvent(this, "wppClickBtn", 1);
    this.wppClickTab = index.createEvent(this, "wppClickTab", 1);
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
    this.zIndex = consts.Z_INDEX.STICKY_BAR;
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
    return (index.h(index.Host, { class: this.hostCssClasses() }, index.h("div", { class: "container" }, this.variant === 'blank' ? (index.h("slot", { name: "content" })) : (index.h(index.Fragment, null, index.h("div", { class: "header" }, index.h("div", { class: "left-area" }, this.withBackButton && (index.h("wpp-action-button-v3-4-0", { variant: "secondary", onClick: this.handleLeftIconClick }, index.h("wpp-icon-chevron-v3-4-0", { slot: "icon-start", direction: "left" }))), index.h("wpp-typography-v3-4-0", { class: "bar-title", type: 'm-strong' }, this.barTitle)), index.h("div", { class: "right-area" }, this.buttonsList.map((buttonItem, btnIndex) => {
      if (!buttonItem)
        return null;
      if (buttonItem.variant === 'action-button') {
        return (index.h("wpp-action-button-v3-4-0", { key: buttonItem.text, onClick: () => this.handleButtonClick(btnIndex), variant: "primary" }, buttonItem.text));
      }
      return (index.h("wpp-button-v3-4-0", { size: "s", onClick: () => this.handleButtonClick(btnIndex), key: buttonItem.text, variant: buttonItem.variant }, buttonItem.text));
    }))), this.variant !== 'one-line' && (index.h("div", { class: "body" }, this.variant === 'two-lines' ? (index.h("slot", { name: "content" })) : (this.tabs.length > 0 && (index.h("wpp-tabs-v3-4-0", { size: "s", onWppChange: this.handleTabClick, value: this.currentTab }, this.tabs.map((tabItem) => (index.h("wpp-tab-v3-4-0", { size: "s", key: tabItem.value, value: tabItem.value }, tabItem.text)))))))))))));
  }
  static get registryIs() { return "wpp-sticky-bar-v3-4-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "buttons": ["updateButtons"],
    "tabs": ["updateTabs"],
    "offsetFromTop": ["updateOffset"]
  }; }
};
WppStickyBar.style = wppStickyBarCss;

exports.wpp_sticky_bar = WppStickyBar;
