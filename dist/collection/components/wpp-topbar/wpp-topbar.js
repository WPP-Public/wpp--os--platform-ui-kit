import { Host, h } from '@stencil/core';
import { getSlotEmptyStates } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { Z_INDEX } from '../../common/consts';
/**
 * @slot app - May contain descriptive app data (e.g., icon, name, and so on)
 *
 * @part wrapper - Wrapper element
 * @part navigation - Navigation items
 * @part body - Main content wrapper
 * @part topbar-item - topbar item wrapper element
 * @part divider - divider element
 */
export class WppTopbar {
  constructor() {
    this.getItemsWidth = () => {
      const navigationItemsElement = this.host.shadowRoot.querySelector('.navigation');
      const topbarItems = navigationItemsElement?.querySelectorAll('.wpp-topbar-item:not([is-menu])');
      if (!topbarItems)
        return;
      this.topbarItemsWidth = Array.from(topbarItems).map(item => Math.ceil(Number(getComputedStyle(item).width?.replace('px', '')) + parseInt(getComputedStyle(item)?.marginRight)));
    };
    this.getDisplayData = () => {
      const menuWidth = 32;
      const appWrapperWidth = this.host.shadowRoot.querySelector('[part="app-wrapper"]')
        ?.clientWidth;
      let width = appWrapperWidth + menuWidth;
      let amount = 0;
      const headerWidth = this.host.shadowRoot.querySelector('.header')?.clientWidth;
      while (amount < this.navigation.length && width + this.topbarItemsWidth[amount] < headerWidth) {
        width += this.topbarItemsWidth[amount];
        amount++;
      }
      this.truncated = amount < this.navigation.length;
      this.itemsToShow = amount;
    };
    this.topbarItemClick = (e) => {
      this.wppChange.emit(e.detail);
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        app: '[slot="app"]',
        right: '[slot="right"]',
      });
      this.hasAppSlot = !emptyStates.app;
      this.hasRightSlot = !emptyStates.right;
    };
    this.wrapperCssClasses = () => ({
      wrapper: true,
    });
    this.headerCssClasses = () => ({
      header: true,
      'with-app': this.hasAppSlot,
      'without-application': !this.hasAppSlot,
    });
    this.navigationCssClasses = () => ({
      navigation: true,
      hidden: this.topbarItemsWidth.length === 0,
    });
    this.hostCssClasses = () => ({
      'wpp-topbar': true,
    });
    this.truncated = false;
    this.itemsToShow = undefined;
    this.hasAppSlot = false;
    this.hasRightSlot = false;
    this.activeItems = [];
    this.topbarItemsWidth = [];
    this.navigation = undefined;
    this.value = undefined;
    this.nativeLink = false;
    this.zIndex = Z_INDEX.TOPBAR;
  }
  // @TODO: add property dropdownConfig
  navigationChanged(newNavigation) {
    this.itemsToShow = newNavigation.length;
    setTimeout(() => {
      this.getItemsWidth();
      this.getDisplayData();
    }, 40); // 40 ms have been added to display the topbar correctly in safari, firefox.
  }
  valueChanged(newValue) {
    const tree = {
      children: this.navigation,
    };
    requestAnimationFrame(() => {
      const data = this.findInTree(newValue, tree);
      if (data.path) {
        this.activeItems = data.path ? data.path.filter(item => item) : [];
      }
      else {
        this.activeItems = [];
      }
    });
  }
  findInTree(value, tree) {
    if (tree.value === value) {
      const path = [tree.value];
      return { result: tree, path };
    }
    else {
      const treeChildren = tree.children || [];
      for (const child of treeChildren) {
        const tmp = this.findInTree(value, child);
        if (Object.keys(tmp).length !== 0 && tmp.path) {
          tmp.path.unshift(tree.value);
          return tmp;
        }
      }
      return {};
    }
  }
  componentWillLoad() {
    this.itemsToShow = this.navigation.length;
    this.updateSlotData();
    this.valueChanged(this.value);
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.getItemsWidth();
      this.getDisplayData();
      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host);
      }
    });
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.getItemsWidth();
        this.getDisplayData();
      });
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const hiddenNavigation = {
      children: this.navigation.slice(this.itemsToShow),
    };
    const isMenuActive = !!hiddenNavigation.children?.find(item => this.activeItems.includes(item.value));
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "wrapper, body, navigation, topbar-item, divider, app, right, app-wrapper, right-wrapper" }, h("div", { class: this.wrapperCssClasses(), part: "wrapper" }, h("wpp-grid-v3-6-0", { container: true }, h("wpp-grid-v3-6-0", { item: true, all: 24 }, h("div", { class: this.headerCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasAppSlot }, name: "app", onSlotchange: this.updateSlotData }), h("nav", { class: this.navigationCssClasses(), key: this.itemsToShow, part: "navigation" }, this.navigation.slice(0, this.itemsToShow).map(navigation => (h("wpp-topbar-item-v3-6-0", { navigation: navigation, firstLevel: true, active: navigation.active, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), this.truncated && (h("wpp-topbar-item-v3-6-0", { key: this.value, navigation: hiddenNavigation, firstLevel: true, menu: true, active: isMenuActive, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasRightSlot }, name: "right", onSlotchange: this.updateSlotData }))))), h("wpp-divider-v3-6-0", { part: "divider" })));
  }
  static get is() { return "wpp-topbar"; }
  static get registryIs() { return "wpp-topbar-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-topbar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-topbar.css"]
    };
  }
  static get properties() {
    return {
      "navigation": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "NavigationState[]",
          "resolved": "NavigationState[]",
          "references": {
            "NavigationState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-topbar/types.ts::NavigationState"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the navigation items, e.g. `navigation=[{ label: 'Home', value: 'home' }]`"
        }
      },
      "value": {
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
          "text": "Defines the initially active topbar item."
        },
        "attribute": "value",
        "reflect": false
      },
      "nativeLink": {
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
          "text": "If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected."
        },
        "attribute": "native-link",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the z-index of the WppTopbar."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.TOPBAR"
      }
    };
  }
  static get states() {
    return {
      "truncated": {},
      "itemsToShow": {},
      "hasAppSlot": {},
      "hasRightSlot": {},
      "activeItems": {},
      "topbarItemsWidth": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when topbar item was changed, return object like { value: 'home', path: '/home', label: 'Home' }"
        },
        "complexType": {
          "original": "TopbarChangeEventDetail",
          "resolved": "NavigationItemEventDetail",
          "references": {
            "TopbarChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-topbar/types.ts::TopbarChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "navigation",
        "methodName": "navigationChanged"
      }, {
        "propName": "value",
        "methodName": "valueChanged"
      }];
  }
}
