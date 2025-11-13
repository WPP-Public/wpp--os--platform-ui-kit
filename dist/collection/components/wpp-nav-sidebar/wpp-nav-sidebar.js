import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { Z_INDEX } from '../../common/consts';
/**
 * @slot - May contain only the `wpp-nav-sidebar-item` component. The default slot, without the name attribute.
 *
 * @part nav-sidebar - Sidebar navigation wrapper
 * @part body - Main content wrapper
 */
export class WppNavSidebar {
  constructor() {
    this.calculateOsBarHeight = () => {
      const headerElement = document.querySelector('.wpp > header');
      if (!headerElement)
        return;
      const headerHeight = `${headerElement?.getBoundingClientRect().height ?? 0}px`;
      this.host.style.setProperty('--wpp-nav-sidebar-top-position', headerHeight);
    };
    this.closeExpandedItemOnItemClick = () => {
      const expandedList = this.host.querySelectorAll(`${transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]:not([expanded=false])`);
      expandedList.forEach(item => {
        if (item && !item.active) {
          item.removeAttribute('expanded');
        }
      });
    };
    this.closeInactiveExpandedItem = (label) => {
      const expandedList = this.host.querySelectorAll(`${transformToVersionedTag('wpp-nav-sidebar-item')}[expanded]`);
      expandedList.forEach(item => {
        if (item.extended && item.label !== label) {
          item.removeAttribute('expanded');
        }
      });
    };
    this.setActiveItem = (path) => {
      let lastExtendedItem = null;
      this.host
        .querySelectorAll(transformToVersionedTag('wpp-nav-sidebar-item'))
        .forEach(item => {
        item.setAttribute('native-link', `${this.nativeLink}`);
        if (item.extended)
          lastExtendedItem = item;
        if (path && item.path === path) {
          item.setAttribute('active', `${true}`);
          if (item.nestedItem) {
            lastExtendedItem?.setAttribute('active', `${true}`);
            lastExtendedItem?.setAttribute('expanded', `${true}`);
          }
        }
        else {
          item.removeAttribute('active');
          item.removeAttribute('expanded');
        }
      });
      lastExtendedItem = null;
    };
    this.asideCssClasses = () => ({
      'nav-sidebar': true,
      open: true,
    });
    this.hostCssClasses = () => ({
      'wpp-nav-sidebar': true,
    });
    this.initialPath = undefined;
    this.activePath = undefined;
    this.nativeLink = false;
    this.zIndex = Z_INDEX.NAV_SIDEBAR;
  }
  handleActivePathChange(newValue) {
    this.setActiveItem(newValue);
  }
  handleItemClick(event) {
    event.stopPropagation();
    this.setActiveItem(event.detail.path);
    this.closeExpandedItemOnItemClick();
    this.wppChange.emit(event.detail);
  }
  handleExpandedClick(event) {
    event.stopPropagation();
    this.closeInactiveExpandedItem(event.detail.label);
  }
  componentWillLoad() {
    const initialPath = this.activePath || this.initialPath;
    this.setActiveItem(initialPath);
    this.calculateOsBarHeight();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "nav-sidebar, body, header-wrapper, header, ws-wrapper, ws-inner" }, h("aside", { class: this.asideCssClasses(), part: "nav-sidebar" }, h("div", { class: "nav-wrapper", part: "body" }, h(WrappedSlot, { wrapperClass: "title-wrapper", name: "header" }), h(WrappedSlot, { wrapperClass: "items-wrapper" })))));
  }
  static get is() { return "wpp-nav-sidebar"; }
  static get registryIs() { return "wpp-nav-sidebar-v3-3-1"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-nav-sidebar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-nav-sidebar.css"]
    };
  }
  static get properties() {
    return {
      "initialPath": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "initialPath is being deprecated and will be deleted in v4.0.0. Use `activePath` instead."
            }],
          "text": "Defines the initial current path."
        },
        "attribute": "initial-path",
        "reflect": false
      },
      "activePath": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "remarks",
              "text": "Use this property to programmatically set the active item in the navigation sidebar."
            }],
          "text": "Defines the current active path. Input any valid path that matches the `path` property of the sidebar items. Invalid values will have no effect and will not change the active item."
        },
        "attribute": "active-path",
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
          "text": "Defines the z-index of the WppNavSidebar."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.NAV_SIDEBAR"
      }
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
          "text": "Emitted when app routes change, return object like { path: '/home', label: 'Home' }"
        },
        "complexType": {
          "original": "NavSidebarItemEventDetail",
          "resolved": "NavSidebarItemEventDetail",
          "references": {
            "NavSidebarItemEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-nav-sidebar/types.ts::NavSidebarItemEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "activePath",
        "methodName": "handleActivePathChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClickSidebarItem",
        "method": "handleItemClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }, {
        "name": "wppClickExpandedItem",
        "method": "handleExpandedClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
