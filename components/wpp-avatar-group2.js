import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { A as AVATAR_COLORS_VARIANTS, d as defineCustomElement$j } from './wpp-avatar2.js';
import { d as defineCustomElement$k } from './wpp-action-button2.js';
import { d as defineCustomElement$i } from './wpp-checkbox2.js';
import { d as defineCustomElement$h } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$g } from './wpp-icon-cross2.js';
import { d as defineCustomElement$f } from './wpp-icon-dash2.js';
import { d as defineCustomElement$e } from './wpp-icon-error2.js';
import { d as defineCustomElement$d } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$c } from './wpp-icon-success2.js';
import { d as defineCustomElement$b } from './wpp-icon-tick2.js';
import { d as defineCustomElement$a } from './wpp-icon-warning2.js';
import { d as defineCustomElement$9 } from './wpp-inline-message2.js';
import { d as defineCustomElement$8 } from './wpp-internal-label2.js';
import { d as defineCustomElement$7 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$6 } from './wpp-label2.js';
import { d as defineCustomElement$5 } from './wpp-list-item2.js';
import { d as defineCustomElement$4 } from './wpp-menu-context2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppAvatarGroupCss = ":host{--avatar-stroke-color:var(--wpp-avatar-stroke-color, var(--wpp-grey-color-000));--avatar-stroke-width:var(--wpp-avatar-stroke-width, 2px);--avatar-circle-group-margin-left-size-xs:var(--wpp-avatar-circle-group-margin-left-size-xs, -4px);--avatar-circle-group-margin-left-size-s:var(--wpp-avatar-circle-group-margin-left-size-s, -12px);--avatar-square-group-margin-left-size-xs:var(--wpp-avatar-square-group-margin-left-size-xs, -4px);--avatar-square-group-margin-left-size-s:var(--wpp-avatar-square-group-margin-left-size-s, -12px);display:-ms-inline-flexbox;display:inline-flex}:host .avatar-item{display:-ms-inline-flexbox;display:inline-flex;position:relative}:host .avatar-item.interactable:hover{z-index:1}:host .avatars-list{display:-ms-flexbox;display:flex;margin:0;padding:0;list-style-type:none}:host:host(.wpp-circle) .avatar-item{border-radius:var(--wpp-border-radius-round);-webkit-box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color);box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color)}:host:host(.wpp-circle):host(.wpp-size-xs) .avatar-item:not(:first-child){margin-left:var(--avatar-circle-group-margin-left-size-xs)}:host:host(.wpp-circle):host(.wpp-size-s) .avatar-item:not(:first-child){margin-left:var(--avatar-circle-group-margin-left-size-s)}:host:host(.wpp-square) .avatar-item{-webkit-box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color);box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color)}:host:host(.wpp-square):host(.wpp-size-xs) .avatar-item{border-radius:var(--wpp-border-radius-xs)}:host:host(.wpp-square):host(.wpp-size-xs) .avatar-item:not(:first-child){margin-left:var(--avatar-square-group-margin-left-size-xs)}:host:host(.wpp-square):host(.wpp-size-s) .avatar-item{border-radius:var(--wpp-border-radius-s)}:host:host(.wpp-square):host(.wpp-size-s) .avatar-item:not(:first-child){margin-left:var(--avatar-square-group-margin-left-size-s)}";

const WppAvatarGroup = /*@__PURE__*/ proxyCustomElement(class WppAvatarGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSelectItem = createEvent(this, "wppSelectItem", 7);
    this.avatarGroupWrapperCssClasses = () => ({
      'wpp-avatar-group': true,
      [`wpp-size-${this.size}`]: true,
      [`wpp-${this.variant}`]: true,
    });
    this.getAvatarsWithColors = (avatars) => {
      let colorIndex = 0;
      return avatars.map(avatar => {
        if (!avatar.src && !avatar.color) {
          avatar.color = AVATAR_COLORS_VARIANTS[colorIndex];
          colorIndex = colorIndex === AVATAR_COLORS_VARIANTS.length ? 0 : colorIndex + 1;
        }
        return avatar;
      });
    };
    this.handleAvatarClick = (event, avatarIndex, fromDropdown) => {
      this.wppSelectItem.emit({ value: event.detail.value, avatarIndex, fromDropdown });
    };
    this.handleListItemClick = (event, avatarIndex) => {
      const listItem = event.currentTarget;
      this.wppSelectItem.emit({ value: listItem, fromDropdown: true, avatarIndex });
    };
    this.getAvatarsList = () => (this.avatars.length ? this.avatars : this.users);
    this.users = [];
    this.avatars = [];
    this.maxAvatarsToDisplay = 6;
    this.size = 'xs';
    this.variant = 'circle';
    this.withTooltip = false;
    this.tooltipConfig = {
      placement: 'bottom',
    };
    this.dropdownConfig = {};
  }
  render() {
    const avatarsWithColors = this.getAvatarsWithColors(this.getAvatarsList());
    const avatarsToDisplay = avatarsWithColors.slice(0, this.maxAvatarsToDisplay);
    const avatarsInHiddenList = avatarsWithColors.slice(this.maxAvatarsToDisplay);
    return (h(Host, { class: this.avatarGroupWrapperCssClasses(), exportparts: "list, item, menu, avatar, hidden-item, hidden-item-with-avatar, hidden-item-avatar, hidden-item-name" }, h("ul", { class: "avatars-list", part: "list" }, avatarsToDisplay.map((avatar, avatarIndex) => (h("li", { class: {
        'avatar-item': true,
        interactable: avatar.interactable ?? false,
      }, part: "item" }, h("wpp-avatar-v2-22-0", { size: this.size, variant: this.variant, name: avatar.name, src: avatar.src, withTooltip: this.withTooltip, tooltipConfig: this.tooltipConfig, interactable: avatar.interactable, color: avatar.color, onWppClick: (event) => this.handleAvatarClick(event, avatarIndex, false) })))), this.getAvatarsList().length > this.maxAvatarsToDisplay && (h("li", { class: "avatar-item", part: "item" }, h("wpp-menu-context-v2-22-0", { externalClass: "avatar-group", listWidth: "240px", dropdownConfig: this.dropdownConfig, part: "menu" }, h("wpp-avatar-v2-22-0", { amountOfHiddenAvatars: avatarsInHiddenList.length, size: this.size, variant: this.variant, slot: "trigger-element", part: "avatar" }), h("div", null, avatarsInHiddenList.map((avatar, avatarIndex) => (h("wpp-list-item-v2-22-0", { key: avatar.name, onWppChangeListItem: (event) => this.handleListItemClick(event, avatarIndex), value: avatar.name, part: "hidden-item" }, h("wpp-avatar-v2-22-0", { name: avatar.name, src: avatar.src, color: avatar.color, variant: this.variant, interactable: avatar.interactable, index: -1, slot: "left", part: "hidden-item-avatar" }), h("span", { slot: "label", class: "name", part: "hidden-item-name" }, avatar.name)))))))))));
  }
  static get registryIs() { return "wpp-avatar-group-v2-22-0"; }
  static get style() { return wppAvatarGroupCss; }
}, [1, "wpp-avatar-group", "wpp-avatar-group-v2-22-0", {
    "users": [16],
    "avatars": [16],
    "maxAvatarsToDisplay": [2, "max-avatars-to-display"],
    "size": [1],
    "variant": [1],
    "withTooltip": [4, "with-tooltip"],
    "tooltipConfig": [1040],
    "dropdownConfig": [1040]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-avatar-group-v2-22-0", "wpp-action-button-v2-22-0", "wpp-avatar-v2-22-0", "wpp-checkbox-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-dash-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-tick-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-internal-label-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-label-v2-22-0", "wpp-list-item-v2-22-0", "wpp-menu-context-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tooltip-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-avatar-group-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppAvatarGroup);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-avatar-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-checkbox-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-dash-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-tick-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-list-item-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-menu-context-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppAvatarGroup as W, defineCustomElement as d };
