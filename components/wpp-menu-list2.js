import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, i as isEqual_1 } from './menuListConfig.js';
import { j as transformToVersionedTag } from './utils.js';
import { Z as Z_INDEX } from './consts.js';

const wppMenuListCss = ".wpp-menu-list-wrapper{position:relative;display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}:host .inner-wrapper{display:block;overflow-y:scroll;width:100%}:host .inner-wrapper.hidden{position:absolute;z-index:1;opacity:0}";

const WppMenuList = /*@__PURE__*/ proxyCustomElement(class WppMenuList extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    if (!isEqual_1(newConfig, oldConfig)) {
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
  static get registryIs() { return "wpp-menu-list-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "dropdownConfig": ["updateDropdownConfig"]
  }; }
  static get style() { return wppMenuListCss; }
}, [1, "wpp-menu-list", "wpp-menu-list-v2-22-0", {
    "shouldCloseOnOutsideClick": [16],
    "dropdownConfig": [1040],
    "tippyInstance": [32],
    "contextList": [32],
    "hidden": [32]
  }, [[2, "wppClickMenuItem", "handleClickItem"], [2, "wppChangeListItem", "handleClickItem"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-menu-list-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-menu-list-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppMenuList);
      }
      break;
  } });
}

export { WppMenuList as W, defineCustomElement as d };
