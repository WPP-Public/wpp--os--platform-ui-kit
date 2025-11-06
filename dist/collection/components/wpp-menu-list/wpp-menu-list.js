import { Host, h } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { transformToVersionedTag } from '../../utils/utils';
import { menuListConfig } from '../../common/menuListConfig';
import { Z_INDEX } from '../../common/consts';
/**
 * @slot trigger-element - Content that is considered the list target. Can be used on one element only and that element must be passed first. If used, other components are displayed as a list.
 *
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
export class WppMenuList {
  constructor() {
    this.createTippyInstance = () => {
      const dropdownConfig = this.dropdownConfig;
      const anchor = this.host?.children[0];
      const list = this.host?.children[1];
      if (list) {
        this.contextList = list;
      }
      if (!anchor || !this.contextList)
        return;
      this.tippyInstance = menuListConfig({
        anchor,
        content: this.contextList,
        maxWidth: 'none',
        hideOnClick: 'toggle',
        zIndex: Z_INDEX.CONTEXT_MENU,
        ...dropdownConfig,
        onHide(instance) {
          const contentSlots = this.content?.querySelector('slot');
          Array.from(contentSlots?.assignedNodes() || []).forEach(el => {
            const element = el;
            if (element.tagName === transformToVersionedTag('wpp-list-item').toUpperCase()) {
              element.setAttribute('container-state', 'hidden');
            }
          });
          return dropdownConfig.onHide?.(instance);
        },
        onMount(instance) {
          const contentSlots = this.content?.querySelector('slot');
          Array.from(contentSlots?.assignedNodes() || []).forEach(el => {
            const element = el;
            if (element.tagName === transformToVersionedTag('wpp-list-item').toUpperCase()) {
              element.setAttribute('container-state', 'shown');
            }
          });
          dropdownConfig.onMount?.(instance);
        },
        onClickOutside: (_, event) => {
          if (this.shouldCloseOnOutsideClick(event)) {
            this.tippyInstance.hide();
          }
        },
      });
    };
    this.hostCssClasses = () => ({
      'wpp-menu-list': true,
      'wpp-menu-list-wrapper': true,
    });
    this.innerWrapperCssClasses = () => ({
      'inner-wrapper': true,
      hidden: this.hidden,
    });
    this.tippyInstance = undefined;
    this.contextList = undefined;
    this.hidden = undefined;
    this.shouldCloseOnOutsideClick = () => true;
    this.dropdownConfig = {};
  }
  handleClickItem(e) {
    if (e.type === 'wppChangeListItem' && e.target.multiple) {
      return;
    }
    this.tippyInstance.hide();
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  componentWillLoad() {
    if (this.dropdownConfig?.showOnCreate)
      this.hidden = true;
  }
  componentDidLoad() {
    if (this.dropdownConfig?.showOnCreate) {
      setTimeout(() => {
        this.createTippyInstance();
        this.hidden = false;
      }, 0);
    }
    else {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "trigger, inner" }, h("slot", { name: "trigger-element", part: "trigger", class: "trigger-element" }), h("div", { class: this.innerWrapperCssClasses() }, h("slot", { part: "inner" }))));
  }
  static get is() { return "wpp-menu-list"; }
  static get registryIs() { return "wpp-menu-list-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-menu-list.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-menu-list.css"]
    };
  }
  static get properties() {
    return {
      "shouldCloseOnOutsideClick": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ShouldCloseOnOutsideClickHandler",
          "resolved": "(event: Event) => boolean",
          "references": {
            "ShouldCloseOnOutsideClickHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-menu-list/types.ts::ShouldCloseOnOutsideClickHandler"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that defines If the menu can be closed by clicking outside of it."
        },
        "defaultValue": "() => true"
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "tippyInstance": {},
      "contextList": {},
      "hidden": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "dropdownConfig",
        "methodName": "updateDropdownConfig"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClickMenuItem",
        "method": "handleClickItem",
        "target": undefined,
        "capture": true,
        "passive": false
      }, {
        "name": "wppChangeListItem",
        "method": "handleClickItem",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
