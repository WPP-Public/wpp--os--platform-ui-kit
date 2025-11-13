import { Host, h, Fragment } from '@stencil/core';
import { DEFAULT_SCROLL_TRESHOLD, INITIAL_BUTTONS_LIST_VALUE, MAXIMUM_ACTION_BUTTONS, MAXIMUM_PRIMARY_BUTTONS, MAXIMUM_SECONDARY_BUTTONS, MULTIPLE_ACTION_BUTTONS_ERROR, MULTIPLE_PRIMARY_BUTTONS_ERROR, TOO_MANY_SECONDARY_BUTTONS_ERROR, } from './const';
import { Z_INDEX } from '../../common/consts';
/**
 * @slot content - Should contain the content for the sticky bar. This slot is available only for the following variants: 'two-lines' and 'blank'
 */
export class WppStickyBar {
  constructor() {
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
    return (h(Host, { class: this.hostCssClasses() }, h("div", { class: "container" }, this.variant === 'blank' ? (h("slot", { name: "content" })) : (h(Fragment, null, h("div", { class: "header" }, h("div", { class: "left-area" }, this.withBackButton && (h("wpp-action-button-v3-3-1", { variant: "secondary", onClick: this.handleLeftIconClick }, h("wpp-icon-chevron-v3-3-1", { slot: "icon-start", direction: "left" }))), h("wpp-typography-v3-3-1", { class: "bar-title", type: 'm-strong' }, this.barTitle)), h("div", { class: "right-area" }, this.buttonsList.map((buttonItem, btnIndex) => {
      if (!buttonItem)
        return null;
      if (buttonItem.variant === 'action-button') {
        return (h("wpp-action-button-v3-3-1", { key: buttonItem.text, onClick: () => this.handleButtonClick(btnIndex), variant: "primary" }, buttonItem.text));
      }
      return (h("wpp-button-v3-3-1", { size: "s", onClick: () => this.handleButtonClick(btnIndex), key: buttonItem.text, variant: buttonItem.variant }, buttonItem.text));
    }))), this.variant !== 'one-line' && (h("div", { class: "body" }, this.variant === 'two-lines' ? (h("slot", { name: "content" })) : (this.tabs.length > 0 && (h("wpp-tabs-v3-3-1", { size: "s", onWppChange: this.handleTabClick, value: this.currentTab }, this.tabs.map((tabItem) => (h("wpp-tab-v3-3-1", { size: "s", key: tabItem.value, value: tabItem.value }, tabItem.text)))))))))))));
  }
  static get is() { return "wpp-sticky-bar"; }
  static get registryIs() { return "wpp-sticky-bar-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-sticky-bar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-sticky-bar.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "StickyBarVariants",
          "resolved": "\"blank\" | \"one-line\" | \"two-lines\" | \"two-lines-with-tabs\"",
          "references": {
            "StickyBarVariants": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-sticky-bar/types.ts::StickyBarVariants"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The variant of the sticky-bar. The default value is 'one-line'"
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'one-line'"
      },
      "barTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The title on the sticky bar."
        },
        "attribute": "bar-title",
        "reflect": false
      },
      "offsetFromTop": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The offset from the top edge of the screen. In most cases, this shouldn't be used, as the sticky-bar\nsearches for the os-bar and places itself right below it. Use this just when the sticky-bar\ndoes not find the os-bar."
        },
        "attribute": "offset-from-top",
        "reflect": false,
        "defaultValue": "undefined"
      },
      "zIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The zIndex of the sticky bar. The default value is 890 such that it hides below the os-bar."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.STICKY_BAR"
      },
      "withBackButton": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the sticky bar has the back button (on the left of the title).\nBy default, the back button is shown."
        },
        "attribute": "with-back-button",
        "reflect": false,
        "defaultValue": "true"
      },
      "scrollTreshold": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The distance in pixels after which the sticky bar will become visible.\nThe default value is 200px."
        },
        "attribute": "scroll-treshold",
        "reflect": false,
        "defaultValue": "DEFAULT_SCROLL_TRESHOLD"
      },
      "buttons": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "StickyBarButtonItem[]",
          "resolved": "StickyBarButtonItem[]",
          "references": {
            "StickyBarButtonItem": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-sticky-bar/types.ts::StickyBarButtonItem"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The configuration of the buttons. Based on this array with config items, buttons are placed on the sticky bar.\nThere can be at most 1 primary button, at most 2 secondary buttons and at most 1 action button."
        },
        "defaultValue": "[]"
      },
      "tabs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "StickyBarTabItem[]",
          "resolved": "StickyBarTabItem[]",
          "references": {
            "StickyBarTabItem": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-sticky-bar/types.ts::StickyBarTabItem"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The configuration of the tabs. Based on this array with config items, tabs are placed on the sticky bar.\nThis prop can only be used with the \"two-lines-with-tabs\" variant."
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "visibility": {},
      "scrollDirection": {},
      "currentTab": {},
      "currentSize": {},
      "buttonsList": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClickBackIcon",
        "name": "wppClickBackIcon",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the back icon is clicked (icon on the left of the title)."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppClickBtn",
        "name": "wppClickBtn",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when one of the buttons provided in the \"buttons\" list is clicked. This event\ncontains the details of the StickyBarButtonItem provided to the array."
        },
        "complexType": {
          "original": "StickyBarButtonItem",
          "resolved": "StickyBarButtonItem",
          "references": {
            "StickyBarButtonItem": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-sticky-bar/types.ts::StickyBarButtonItem"
            }
          }
        }
      }, {
        "method": "wppClickTab",
        "name": "wppClickTab",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when one of the tabs provided in the \"tabs\" list is clicked. This event\ncontains the details of the tab item clicked."
        },
        "complexType": {
          "original": "StickyBarTabItem",
          "resolved": "StickyBarTabItem",
          "references": {
            "StickyBarTabItem": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-sticky-bar/types.ts::StickyBarTabItem"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "buttons",
        "methodName": "updateButtons"
      }, {
        "propName": "tabs",
        "methodName": "updateTabs"
      }, {
        "propName": "offsetFromTop",
        "methodName": "updateOffset"
      }];
  }
  static get listeners() {
    return [{
        "name": "scroll",
        "method": "handleScroll",
        "target": "window",
        "capture": false,
        "passive": true
      }];
  }
}
