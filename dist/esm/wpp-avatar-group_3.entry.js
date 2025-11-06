import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { A as AVATAR_COLORS_VARIANTS } from './consts-141c8fd3.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';
import { W as WrappedSlot } from './WrappedSlot-a49aa0dd.js';
import { g as getSlotEmptyStates, c as truncate } from './utils-f3870f15.js';
import './consts-4b0f734e.js';

const wppAvatarGroupCss = ":host{--avatar-stroke-color:var(--wpp-avatar-stroke-color, var(--wpp-grey-color-000));--avatar-stroke-width:var(--wpp-avatar-stroke-width, 2px);--avatar-circle-group-margin-left-size-xs:var(--wpp-avatar-circle-group-margin-left-size-xs, -4px);--avatar-circle-group-margin-left-size-s:var(--wpp-avatar-circle-group-margin-left-size-s, -12px);--avatar-square-group-margin-left-size-xs:var(--wpp-avatar-square-group-margin-left-size-xs, -4px);--avatar-square-group-margin-left-size-s:var(--wpp-avatar-square-group-margin-left-size-s, -12px);display:-ms-inline-flexbox;display:inline-flex}:host .avatar-item{display:-ms-inline-flexbox;display:inline-flex;position:relative}:host .avatar-item.interactable:hover{z-index:1}:host .avatars-list{display:-ms-flexbox;display:flex;margin:0;padding:0;list-style-type:none}:host:host(.wpp-circle) .avatar-item{border-radius:var(--wpp-border-radius-round);-webkit-box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color);box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color)}:host:host(.wpp-circle):host(.wpp-size-xs) .avatar-item:not(:first-child){margin-left:var(--avatar-circle-group-margin-left-size-xs)}:host:host(.wpp-circle):host(.wpp-size-s) .avatar-item:not(:first-child){margin-left:var(--avatar-circle-group-margin-left-size-s)}:host:host(.wpp-square) .avatar-item{-webkit-box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color);box-shadow:0 0 0 var(--avatar-stroke-width) var(--avatar-stroke-color)}:host:host(.wpp-square):host(.wpp-size-xs) .avatar-item{border-radius:var(--wpp-border-radius-xs)}:host:host(.wpp-square):host(.wpp-size-xs) .avatar-item:not(:first-child){margin-left:var(--avatar-square-group-margin-left-size-xs)}:host:host(.wpp-square):host(.wpp-size-s) .avatar-item{border-radius:var(--wpp-border-radius-s)}:host:host(.wpp-square):host(.wpp-size-s) .avatar-item:not(:first-child){margin-left:var(--avatar-square-group-margin-left-size-s)}";

const WppAvatarGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};
WppAvatarGroup.style = wppAvatarGroupCss;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTriangleFill = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-triangle-fill", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.1271 9.24407C13.5876 9.64284 13.5876 10.3572 13.1271 10.7559L9.65465 13.7632C9.00701 14.3241 8 13.864 8 13.0073L8 6.99275C8 6.136 9.00701 5.67594 9.65465 6.23682L13.1271 9.24407Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-triangle-fill-v2-22-0"; }
};
WppIconTriangleFill.style = wppIconCss;

const wppTagCss = ":host{--tag-height:var(--wpp-tag-height, 24px);--tag-padding:var(--wpp-tag-padding, 2px 8px);--tag-with-icon-padding:var(--wpp-tag-with-icon-padding, 2px 8px 2px 6px);--tag-bg-opacity:var(--wpp-tag-bg-opacity, 0.25);--tag-border-radius:var(--wpp-tag-border-radius, var(--wpp-border-radius-xs));--tag-icon-margin:var(--wpp-tag-icon-margin, 0 4px 0 0);--tag-typography-color:var(--wpp-tag-typography-color, rgba(18, 22, 25, 75%));--tag-icon-color:var(--wpp-tag-icon-color, rgba(18, 22, 25, 65%));--tag-neutral-color:var(--wpp-tag-neutral-color, var(--wpp-dataviz-color-seq-grey-600));--tag-neutral-bg-color:var(--wpp-tag-neutral-bg-color, var(--wpp-dataviz-color-seq-grey-300));--tag-neutral-bg-opacity:var(--wpp-tag-neutral-bg-opacity, 0.25);--tag-warning-color:var(--wpp-tag-warning-color, var(--wpp-dataviz-color-seq-warning-600));--tag-warning-bg-color:var(--wpp-tag-warning-bg-color, var(--wpp-dataviz-color-seq-warning-300));--tag-warning-bg-opacity:var(--wpp-tag-warning-bg-opacity, 0.25);--tag-positive-color:var(--wpp-tag-positive-color, var(--wpp-dataviz-color-seq-positive-600));--tag-positive-bg-color:var(--wpp-tag-positive-bg-color, var(--wpp-dataviz-color-seq-positive-300));--tag-positive-bg-opacity:var(--wpp-tag-positive-bg-opacity, 0.25);--tag-negative-color:var(--wpp-tag-negative-color, var(--wpp-dataviz-color-seq-negative-600));--tag-negative-bg-color:var(--wpp-tag-negative-bg-color, var(--wpp-dataviz-color-seq-negative-300));--tag-negative-bg-opacity:var(--wpp-tag-negative-bg-opacity, 0.25);--tag-disabled-opacity:var(--wpp-tag-disabled-opacity, 0.5);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--tag-height);padding:var(--tag-padding);overflow:hidden;border-radius:var(--tag-border-radius)}:host{--wpp-typography-color:var(--tag-typography-color);position:relative}:host .overlay{background-color:var(--tag-bg-color);opacity:0.25}:host .icon-start ::slotted(*){color:var(--tag-icon-color);mix-blend-mode:plus-darker}:host(.wpp-warning) .overlay{background-color:var(--tag-warning-bg-color)}:host(.wpp-positive) .overlay{background-color:var(--tag-positive-bg-color)}:host(.wpp-negative) .overlay{background-color:var(--tag-negative-bg-color)}:host(.wpp-with-icon){padding:var(--tag-with-icon-padding)}:host(.wpp-with-icon) .icon-start{z-index:1;display:-ms-flexbox;display:flex;margin:var(--tag-icon-margin)}.wpp-typography{z-index:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;mix-blend-mode:plus-darker}.wpp-typography::part(typography){mix-blend-mode:plus-darker}.icon-start.slot-hidden{display:none}.overlay{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:var(--tag-border-radius);opacity:var(--tag-bg-opacity)}:host(.wpp-neutral) .overlay{background-color:var(--tag-neutral-bg-color)}:host(.wpp-disabled){opacity:var(--tag-disabled-opacity)}";

const WppTag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.updateCategoricalColor = (index) => {
      this.host.style.setProperty('--tag-color', index ? `var(--wpp-dataviz-color-cat-dark-${index})` : '');
      this.host.style.setProperty('--tag-bg-color', index ? `var(--wpp-dataviz-color-cat-neutral-${index})` : '');
    };
    this.hostCssClasses = () => ({
      'wpp-tag': true,
      ...(this.variant && { [`wpp-${this.variant}`]: true }),
      'wpp-with-icon': Boolean(this.hasIconStartSlot),
      'wpp-disabled': this.disabled,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.hasIconStartSlot = false;
    this.variant = undefined;
    this.maxLabelLength = 30;
    this.tooltipConfig = {};
    this.label = undefined;
    this.categoricalColorIndex = undefined;
    this.withIcon = false;
    this.disabled = false;
  }
  componentWillLoad() {
    this.updateCategoricalColor(this.categoricalColorIndex);
    this.updateSlotData();
  }
  updateCategoricalIndex(index) {
    this.updateCategoricalColor(index);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v2-22-0", { type: "xs-midi", tag: "span", part: "label" }, Number(this.label?.length) > this.maxLabelLength ? (h("wpp-tooltip-v2-22-0", { text: this.label, config: this.tooltipConfig, part: "tooltip" }, h("span", { part: "tooltip-text" }, truncate(this.label, this.maxLabelLength, false)))) : (this.label)), h("div", { class: "overlay", part: "overlay" })));
  }
  static get registryIs() { return "wpp-tag-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "categoricalColorIndex": ["updateCategoricalIndex"]
  }; }
};
WppTag.style = wppTagCss;

export { WppAvatarGroup as wpp_avatar_group, WppIconTriangleFill as wpp_icon_triangle_fill, WppTag as wpp_tag };
