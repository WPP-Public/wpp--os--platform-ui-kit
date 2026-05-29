import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-9177bb6d.js';
import { A as AVATAR_COLORS_VARIANTS } from './const-271ccb95.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';
import { g as getSlotEmptyStates, d as debounce, e as truncate } from './utils-3463d13f.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-2f801cf6.js';
import './consts-744c144f.js';

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
          colorIndex = colorIndex === AVATAR_COLORS_VARIANTS.length - 1 ? 0 : colorIndex + 1;
        }
        return avatar;
      });
    };
    this.handleAvatarClick = (event, avatarIndex, fromDropdown) => {
      this.wppSelectItem.emit({ value: event.detail.value, avatarIndex, fromDropdown });
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (this.menuContextTippyRef) {
          this.menuContextTippyRef.show();
        }
      }
    };
    this.handleListItemClick = (event, avatarIndex) => {
      const listItem = event.currentTarget;
      this.wppSelectItem.emit({ value: listItem, fromDropdown: true, avatarIndex });
    };
    this.menuContextTippyRef = undefined;
    this.avatars = [];
    this.maxAvatarsToDisplay = 6;
    this.size = 'xs';
    this.variant = 'circle';
    this.withTooltip = false;
    this.tooltipConfig = {
      placement: 'bottom',
    };
    this.dropdownConfig = {};
    this.avatarsIndex = 0;
  }
  render() {
    const avatarsWithColors = this.getAvatarsWithColors(this.avatars);
    const avatarsToDisplay = avatarsWithColors.slice(0, this.maxAvatarsToDisplay);
    const avatarsInHiddenList = avatarsWithColors.slice(this.maxAvatarsToDisplay);
    return (h(Host, { class: this.avatarGroupWrapperCssClasses(), role: "group", exportparts: "list, item, menu, avatar, hidden-item, hidden-item-with-avatar, hidden-item-avatar, hidden-item-name" }, h("ul", { class: "avatars-list", part: "list" }, avatarsToDisplay.map((avatar, avatarIndex) => (h("li", { class: {
        'avatar-item': true,
        interactable: avatar.interactable ?? true,
      }, part: "item" }, h("wpp-avatar-v4-1-0", { size: this.size, variant: this.variant, name: avatar.name, src: avatar.src, withTooltip: this.withTooltip, tooltipConfig: this.tooltipConfig, interactable: avatar.interactable ?? true, color: avatar.color, index: this.avatarsIndex, onWppClick: (event) => this.handleAvatarClick(event, avatarIndex, false) })))), this.avatars.length > this.maxAvatarsToDisplay && (h("li", { class: "avatar-item", part: "item" }, h("wpp-menu-context-v4-1-0", { externalClass: "avatar-group", listWidth: "240px", dropdownConfig: {
        ...this.dropdownConfig,
        onShow: (instance) => {
          const firstListItem = instance.popper.querySelector('.wpp-list-item');
          if (firstListItem) {
            firstListItem.setFocus();
          }
          if (this.dropdownConfig.onShow) {
            this.dropdownConfig.onShow(instance);
          }
        },
        onCreate: (instance) => {
          this.menuContextTippyRef = instance;
        },
        onDestroy: () => {
          this.menuContextTippyRef = undefined;
        },
      }, part: "menu", onKeyDown: this.onKeyDown, ariaProps: { label: `+${avatarsInHiddenList.length} more list items with avatars` } }, h("wpp-avatar-v4-1-0", { amountOfHiddenAvatars: avatarsInHiddenList.length, size: this.size, variant: this.variant, slot: "trigger-element", part: "avatar" }), h(Fragment, null, avatarsInHiddenList.map((avatar, avatarIndex) => (h("wpp-list-item-v4-1-0", { key: avatar.name, onWppChangeListItem: (event) => this.handleListItemClick(event, avatarIndex + this.maxAvatarsToDisplay), value: avatar.name, nonInteractive: avatar.interactable === false, part: "hidden-item" }, h("wpp-avatar-v4-1-0", { name: avatar.name, src: avatar.src, color: avatar.color, variant: this.variant, interactable: false, role: "presentation", slot: "left", part: "hidden-item-avatar" }), h("span", { slot: "label", class: "name", part: "hidden-item-name" }, avatar.name)))))))))));
  }
  static get registryIs() { return "wpp-avatar-group-v4-1-0"; }
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
  static get registryIs() { return "wpp-icon-triangle-fill-v4-1-0"; }
};
WppIconTriangleFill.style = wppIconCss;

const wppTagCss = ":host{--tag-height:var(--wpp-tag-height, 24px);--tag-padding:var(--wpp-tag-padding, 2px 8px);--tag-with-icon-padding:var(--wpp-tag-with-icon-padding, 2px 8px 2px 6px);--tag-bg-opacity:var(--wpp-tag-bg-opacity, 1);--tag-border-radius:var(--wpp-tag-border-radius, var(--wpp-border-radius-xs));--tag-icon-margin:var(--wpp-tag-icon-margin, 0 4px 0 0);--tag-typography-color:var(--wpp-tag-typography-color, var(--wpp-grey-color-1000));--tag-icon-color:var(--wpp-tag-icon-color, var(--wpp-grey-color-900));--tag-neutral-color:var(--wpp-tag-neutral-color, var(--wpp-dataviz-color-seq-grey-600));--tag-neutral-bg-color:var(--wpp-tag-neutral-bg-color, var(--wpp-grey-color-300));--tag-neutral-bg-opacity:var(--wpp-tag-neutral-bg-opacity, 0.25);--tag-warning-color:var(--wpp-tag-warning-color, var(--wpp-dataviz-color-seq-warning-600));--tag-warning-bg-color:var(--wpp-tag-warning-bg-color, var(--wpp-warning-color-200));--tag-warning-bg-opacity:var(--wpp-tag-warning-bg-opacity, 0.25);--tag-positive-color:var(--wpp-tag-positive-color, var(--wpp-dataviz-color-seq-positive-600));--tag-positive-bg-color:var(--wpp-tag-positive-bg-color, var(--wpp-success-color-200));--tag-positive-bg-opacity:var(--wpp-tag-positive-bg-opacity, 0.25);--tag-negative-color:var(--wpp-tag-negative-color, var(--wpp-dataviz-color-seq-negative-600));--tag-negative-bg-color:var(--wpp-tag-negative-bg-color, var(--wpp-danger-color-200));--tag-negative-bg-opacity:var(--wpp-tag-negative-bg-opacity, 0.25);--tag-disabled-opacity:var(--wpp-tag-disabled-opacity, 0.4);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--tag-height);padding:var(--tag-padding);overflow:hidden;border-radius:var(--tag-border-radius)}:host{--wpp-typography-color:var(--tag-typography-color);--wpp-icon-color:var(--tag-icon-color);background-color:var(--wpp-white-color);position:relative}:host .icon-start ::slotted(*){color:var(--tag-icon-color);mix-blend-mode:plus-darker}:host(.wpp-warning) .overlay{background-color:var(--tag-warning-bg-color)}:host(.wpp-positive) .overlay{background-color:var(--tag-positive-bg-color)}:host(.wpp-negative) .overlay{background-color:var(--tag-negative-bg-color)}:host(.wpp-Cat-1) .overlay{background-color:var(--wpp-dataviz-color-cat-light-1)}:host(.wpp-Cat-2) .overlay{background-color:var(--wpp-dataviz-color-cat-light-2)}:host(.wpp-Cat-3) .overlay{background-color:var(--wpp-dataviz-color-cat-light-3)}:host(.wpp-Cat-4) .overlay{background-color:var(--wpp-dataviz-color-cat-light-4)}:host(.wpp-Cat-5) .overlay{background-color:var(--wpp-dataviz-color-cat-light-5)}:host(.wpp-Cat-6) .overlay{background-color:var(--wpp-dataviz-color-cat-light-6)}:host(.wpp-Cat-7) .overlay{background-color:var(--wpp-dataviz-color-cat-light-7)}:host(.wpp-Cat-8) .overlay{background-color:var(--wpp-dataviz-color-cat-light-8)}:host(.wpp-Cat-9) .overlay{background-color:var(--wpp-dataviz-color-cat-light-9)}:host(.wpp-with-icon){padding:var(--tag-with-icon-padding)}:host(.wpp-with-icon) .icon-start{z-index:1;display:-ms-flexbox;display:flex;margin:var(--tag-icon-margin)}.wpp-typography{z-index:1;display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;mix-blend-mode:plus-darker;min-width:0;max-width:100%;-ms-flex:1;flex:1}.wpp-typography::part(typography){display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;mix-blend-mode:plus-darker;max-width:100%}.wpp-typography::part(inner){display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%}.wpp-tooltip{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%}.wpp-tooltip::part(anchor){display:block;width:100%;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.label-text{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;max-width:100%}.icon-start.slot-hidden{display:none}.overlay{position:absolute;width:100%;height:100%;top:0;left:0;border-radius:var(--tag-border-radius);opacity:var(--tag-bg-opacity)}.categorical-overlay{opacity:0.4}:host(.wpp-neutral) .overlay{background-color:var(--tag-neutral-bg-color);opacity:0.6}:host(.wpp-disabled){opacity:var(--tag-disabled-opacity)}:host([data-wpp-theme=dark]){background-color:var(--wpp-grey-color-300)}";

const WppTag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.icon;
    };
    this.setLabelRef = (el) => {
      if (el === this.labelRef)
        return;
      if (this.labelRef && this.resizeObserver) {
        this.resizeObserver.unobserve(this.labelRef);
      }
      this.labelRef = el;
      if (el && this.resizeObserver) {
        this.resizeObserver.observe(el);
      }
    };
    this.checkLabelOverflow = () => {
      if (!this.labelRef)
        return;
      const el = this.labelRef;
      const isTruncated = el.scrollWidth > el.clientWidth;
      if (isTruncated !== this.isOverflowTruncated) {
        this.isOverflowTruncated = isTruncated;
      }
    };
    this.initResizeObserver = () => {
      this.resizeObserverCallback = debounce(() => this.checkLabelOverflow(), 50);
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeObserverCallback?.();
      });
      if (this.labelRef) {
        try {
          this.resizeObserver.observe(this.labelRef);
        }
        catch {
          console.error('Error observing labelRef');
        }
      }
    };
    this.getLabelText = () => {
      // Support deprecated maxLabelLength for backward compatibility
      if (this.maxLabelLength && this.maxLabelLength > 0 && this.label) {
        return truncate(this.label, this.maxLabelLength, false);
      }
      return this.label;
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
    this.renderLabel = () => {
      const displayedText = this.getLabelText();
      const originalLabel = this.label;
      if (originalLabel == null)
        return null;
      // Check if truncation happened via maxLabelLength (deprecated) or CSS overflow
      const wasMaxLengthTruncated = !!this.maxLabelLength && this.maxLabelLength > 0 && displayedText !== originalLabel;
      const shouldShowTooltip = this.isOverflowTruncated || wasMaxLengthTruncated;
      const labelNode = (h("span", { class: "label-text", part: "tooltip-text", ref: this.setLabelRef }, displayedText));
      return shouldShowTooltip ? (h("wpp-tooltip-v4-1-0", { class: "wpp-tooltip", text: originalLabel, config: this.tooltipConfig, part: "tooltip", disabled: this.disabled }, labelNode)) : (labelNode);
    };
    this.hasIconStartSlot = false;
    this.isOverflowTruncated = false;
    this.variant = undefined;
    this.maxLabelLength = 30;
    this.tooltipConfig = {};
    this.label = undefined;
    this.disabled = false;
  }
  onLabelChange() {
    this.checkLabelOverflow();
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  componentDidLoad() {
    this.initResizeObserver();
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.resizeObserver?.disconnect();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, tooltip, tooltip-text, icon-start, overlay" }, h(WrappedSlot, { wrapperClass: this.iconStartCssClasses(), name: "icon-start", onSlotchange: this.updateSlotData }), h("wpp-typography-v4-1-0", { class: "wpp-typography", type: "xs-midi", tag: "span", part: "label" }, this.renderLabel()), h("div", { class: `overlay ${this.variant?.includes('Cat-') ? 'categorical-overlay' : ''}`, part: "overlay" })));
  }
  static get registryIs() { return "wpp-tag-v4-1-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "label": ["onLabelChange"],
    "maxLabelLength": ["onLabelChange"]
  }; }
};
WppTag.style = wppTagCss;

export { WppAvatarGroup as wpp_avatar_group, WppIconTriangleFill as wpp_icon_triangle_fill, WppTag as wpp_tag };
