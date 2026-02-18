'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const common = require('./common-ee802540.js');
const _const = require('./const-e53f51b2.js');
const utils = require('./utils-27884b05.js');
require('./consts-dba6e6dd.js');

const wppAvatarCss = ":host{--avatar-size-xs:var(--wpp-avatar-size-xs, 24px);--avatar-size-s:var(--wpp-avatar-size-s, 32px);--avatar-size-m:var(--wpp-avatar-size-m, 40px);--avatar-size-l:var(--wpp-avatar-size-l, 56px);--avatar-size-xl:var(--wpp-avatar-size-xl, 72px);--avatar-size-2xl:var(--wpp-avatar-size-2xl, 120px);--avatar-size-3xl:var(--wpp-avatar-size-2xl, 176px);--avatar-size-4xl:var(--wpp-avatar-size-2xl, 240px);--avatar-size-xs-square-border-radius:var(--wpp-avatar-size-xs-square-border-radius, var(--wpp-border-radius-xs));--avatar-size-s-square-border-radius:var(--wpp-avatar-size-s-square-border-radius, var(--wpp-border-radius-s));--avatar-size-m-square-border-radius:var(--wpp-avatar-size-m-square-border-radius, var(--wpp-border-radius-m));--avatar-size-l-square-border-radius:var(--wpp-avatar-size-l-square-border-radius, var(--wpp-border-radius-m));--avatar-size-xl-square-border-radius:var(--wpp-avatar-size-xl-square-border-radius, var(--wpp-border-radius-m));--avatar-size-2xl-square-border-radius:var(--wpp-avatar-size-2xl-square-border-radius, var(--wpp-border-radius-l));--avatar-size-3xl-square-border-radius:var(--wpp-avatar-size-3xl-square-border-radius, var(--wpp-border-radius-l));--avatar-size-4xl-square-border-radius:var(--wpp-avatar-size-4xl-square-border-radius, var(--wpp-border-radius-l));--avatar-circle-border-radius:var(--wpp-avatar-circle-border-radius, 120px);--avatar-icon-border-radius:var(--wpp-avatar-icon-border-radius, 120px);--avatar-icon-bg-color:var(--wpp-avatar-icon-bg-color, var(--wpp-grey-color-200));--avatar-icon-bg-color-hover:var(--wpp-avatar-icon-bg-color-hover, var(--wpp-grey-color-300));--avatar-icon-color:var(--wpp-avatar-icon-color, var(--wpp-grey-color-800));--avatar-without-image-border-radius:var(--wpp-avatar-without-image-border-radius, 120px);--avatar-without-image-text-color:var(--wpp-avatar-without-image-text-color, var(--wpp-grey-color-000));--avatar-circle-counter-border-radius:var(--wpp-avatar-circle-counter-border-radius, 120px);--avatar-square-counter-border-radius:var(--wpp-avatar-square-counter-border-radius, 120px);--avatar-counter-text-color:var(--wpp-avatar-counter-text-color, var(--wpp-grey-color-800));--avatar-counter-text-color-hover:var(--wpp-avatar-counter-text-color-hover, var(--wpp-grey-color-900));--avatar-counter-text-color-active:var(--wpp-avatar-counter-text-color-active, var(--wpp-grey-color-900));--avatar-counter-bg-color:var(--wpp-avatar-counter-bg-color, var(--wpp-grey-color-300));--avatar-counter-bg-color-hover:var(--wpp-avatar-counter-bg-color-hover, var(--wpp-grey-color-200));--avatar-counter-bg-color-active:var(--wpp-avatar-counter-bg-color-active, var(--wpp-grey-color-300));--avatar-first-border-color-focus:var(--wpp-avatar-first-border-color-focus, var(--wpp-grey-color-000));--avatar-second-border-color-focus:var(--wpp-avatar-second-border-color-focus, var(--wpp-brand-color));--avatar-interactable-hover-background-color:var(\n    --wpp-avatar-interactable-hover-background-color,\n    rgba(255, 255, 255, 0.4)\n  );display:-ms-inline-flexbox;display:inline-flex;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:none}:host::part(content){width:100%}:host .image{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;border-radius:var(--avatar-circle-border-radius)}:host .without-image{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;background-color:var(--wpp-avatar-generated-bg-color);border-radius:var(--avatar-without-image-border-radius);color:var(--avatar-without-image-text-color);text-transform:capitalize}:host .without-image.with-amount-of-hidden-avatars{background-color:var(--avatar-counter-bg-color);border-radius:var(--avatar-circle-counter-border-radius);color:var(--avatar-counter-text-color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .without-image.with-amount-of-hidden-avatars:hover{cursor:pointer;background-color:var(--avatar-counter-bg-color-hover);color:var(--avatar-counter-text-color-hover)}:host .without-image.with-amount-of-hidden-avatars:active{background-color:var(--avatar-counter-bg-color-active);color:var(--avatar-counter-text-color-active)}:host .without-image.with-amount-of-hidden-avatars.square{border-radius:var(--avatar-square-counter-border-radius)}:host .icon-wrapper{background-color:var(--avatar-icon-bg-color)}:host .icon-wrapper .wpp-icon{color:var(--avatar-icon-color)}:host:host(.tab-focus).with-amount-of-hidden-avatars{background-color:var(--avatar-counter-bg-color-hover);color:var(--avatar-counter-text-color-hover)}:host:host(.size-xs){width:var(--avatar-size-xs);height:var(--avatar-size-xs)}:host:host(.size-xs) .without-image{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}:host:host(.size-xs) .without-image.with-amount-of-hidden-avatars{color:var(--avatar-counter-text-color)}:host:host(.size-xs) .without-image.with-amount-of-hidden-avatars:hover{background-color:var(--avatar-counter-bg-color-hover);color:var(--avatar-counter-text-color-hover)}:host:host(.size-xs) .without-image.with-amount-of-hidden-avatars:active{background-color:var(--avatar-counter-bg-color-active);color:var(--avatar-counter-text-color-active)}:host:host(.size-xs) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-xs) .square{border-radius:var(--avatar-size-xs-square-border-radius)}:host:host(.size-s){width:var(--avatar-size-s);height:var(--avatar-size-s)}:host:host(.size-s) .without-image{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}:host:host(.size-s) .without-image.with-amount-of-hidden-avatars{color:var(--avatar-counter-text-color)}:host:host(.size-s) .without-image.with-amount-of-hidden-avatars:hover{background-color:var(--avatar-counter-bg-color-hover);color:var(--avatar-counter-text-color-hover)}:host:host(.size-s) .without-image.with-amount-of-hidden-avatars:active{background-color:var(--avatar-counter-bg-color-active);color:var(--avatar-counter-text-color-active)}:host:host(.size-s) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-s) .square{border-radius:var(--avatar-size-s-square-border-radius)}:host:host(.size-m){width:var(--avatar-size-m);height:var(--avatar-size-m)}:host:host(.size-m) .without-image{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-m) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-m) .square{border-radius:var(--avatar-size-m-square-border-radius)}:host:host(.size-l){width:var(--avatar-size-l);height:var(--avatar-size-l)}:host:host(.size-l) .without-image{font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-l) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-l) .square{border-radius:var(--avatar-size-l-square-border-radius)}:host:host(.size-xl){width:var(--avatar-size-xl);height:var(--avatar-size-xl)}:host:host(.size-xl) .without-image{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-xl) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-xl) .square{border-radius:var(--avatar-size-xl-square-border-radius)}:host:host(.size-2xl){width:var(--avatar-size-2xl);height:var(--avatar-size-2xl)}:host:host(.size-2xl) .without-image{font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);font-weight:var(--wpp-typography-4xl-display-font-weight, 400);color:var(--wpp-typography-4xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-2xl) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-2xl) .square{border-radius:var(--avatar-size-2xl-square-border-radius)}:host:host(.size-3xl){width:var(--avatar-size-3xl);height:var(--avatar-size-3xl)}:host:host(.size-3xl) .without-image{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-3xl) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-3xl) .square{border-radius:var(--avatar-size-3xl-square-border-radius)}:host:host(.size-4xl){width:var(--avatar-size-4xl);height:var(--avatar-size-4xl)}:host:host(.size-4xl) .without-image{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0);color:var(--avatar-counter-text-color)}:host:host(.size-4xl) .without-image:not(.with-amount-of-hidden-avatars){color:var(--avatar-without-image-text-color)}:host:host(.size-4xl) .square{border-radius:var(--avatar-size-4xl-square-border-radius)}:host:host(.with-tooltip) .wpp-tooltip,:host:host(.with-tooltip) .wpp-tooltip::part(anchor){width:100%;outline:none}:host:host(.tab-focus) .image,:host:host(.tab-focus) .without-image{border-radius:var(--avatar-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--avatar-first-border-color-focus), 0 0 0 3px var(--avatar-second-border-color-focus);box-shadow:0 0 0 1px var(--avatar-first-border-color-focus), 0 0 0 3px var(--avatar-second-border-color-focus)}:host:host(.tab-focus) .with-amount-of-hidden-avatars{background-color:var(--avatar-counter-bg-color-hover)}:host(.interactable) .interactable-wrapper{position:relative}:host(.interactable) .interactable-wrapper:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:transparent;border-radius:var(--avatar-circle-border-radius)}:host(.interactable) .interactable-wrapper:hover{cursor:pointer;z-index:1}:host(.interactable) .interactable-wrapper:hover:before{background-color:var(--avatar-interactable-hover-background-color)}:host(.interactable) .interactable-wrapper.image-wrapper:before{border-radius:var(--avatar-circle-border-radius)}:host(.interactable) .interactable-wrapper.without-image:before{border-radius:var(--avatar-without-image-border-radius)}:host(.interactable):host(.tab-focus) .interactable-wrapper{z-index:1}:host(.interactable):host(.tab-focus) .interactable-wrapper:before{background-color:var(--avatar-interactable-hover-background-color)}:host(.interactable):host(.size-xs) .square:before{border-radius:var(--avatar-size-xs-square-border-radius)}:host(.interactable):host(.size-s) .square:before{border-radius:var(--avatar-size-s-square-border-radius)}:host(.interactable):host(.size-m) .square:before{border-radius:var(--avatar-size-m-square-border-radius)}:host(.interactable):host(.size-l) .square:before{border-radius:var(--avatar-size-l-square-border-radius)}:host(.interactable):host(.size-xl) .square:before{border-radius:var(--avatar-size-xl-square-border-radius)}:host(.interactable):host(.size-2xl) .square:before{border-radius:var(--avatar-size-2xl-square-border-radius)}:host(.interactable):host(.size-3xl) .square:before{border-radius:var(--avatar-size-3xl-square-border-radius)}:host(.interactable):host(.size-4xl) .square:before{border-radius:var(--avatar-size-4xl-square-border-radius)}:host(.interactable) .with-amount-of-hidden-avatars:before{content:none}";

const WppAvatar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClick = index.createEvent(this, "wppClick", 1);
    this.isAvatarIcon = () => !!this.icon;
    this.getUserAbbreviation = (name) => name
      .split(' ')
      .slice(0, 1)
      .map(item => item[0])
      .join('');
    this.handleImageLoadFailure = () => {
      this.isImageFailedToLoad = true;
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClick();
      }
    };
    this.getIconSize = () => {
      if (this.size === 'xs')
        return 16;
      if (this.size === 's')
        return 20;
      if (this.size === 'm')
        return 24;
      if (this.size === 'l')
        return 28;
      if (this.size === 'xl')
        return 32;
      if (this.size === '2xl')
        return 48;
      if (this.size === '3xl')
        return 56;
      if (this.size === '4xl')
        return 64;
    };
    this.renderIcon = () => {
      if (!this.icon)
        return null;
      if (this.isAvatarIcon()) {
        return index.h(utils.transformToVersionedTag(this.icon), {
          width: this.getIconSize(),
          height: this.getIconSize(),
          part: 'icon',
        });
      }
    };
    this.handleClick = () => {
      this.wppClick.emit({ value: this.host });
    };
    this.hostCssClasses = () => ({
      'wpp-avatar': true,
      interactable: this.interactable,
      'with-tooltip': this.withTooltip,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      [`size-${this.size}`]: true,
    });
    this.contentWrapperCssClasses = () => ({
      'without-image': true,
      'interactable-wrapper': this.interactable,
      square: this.variant === 'square',
      'icon-wrapper': this.isAvatarIcon(),
      'with-amount-of-hidden-avatars': !!this.amountOfHiddenAvatars,
    });
    this.imageWrapperCssClasses = () => ({
      'image-wrapper': true,
      'interactable-wrapper': this.interactable,
      square: this.variant === 'square',
    });
    this.imageCssClasses = () => ({
      image: true,
      square: this.variant === 'square',
    });
    this.isImageFailedToLoad = false;
    this.focusType = undefined;
    this.name = '';
    this.size = 'xs';
    this.variant = 'circle';
    this.src = undefined;
    this.icon = undefined;
    this.color = undefined;
    this.amountOfHiddenAvatars = undefined;
    this.withTooltip = false;
    this.interactable = false;
    this.index = 0;
    this.role = 'button';
    this.ariaProps = {};
    this.tooltipConfig = {
      placement: 'bottom',
    };
  }
  colorChange(newValue) {
    if (!this.isAvatarIcon())
      this.host.style.setProperty('--wpp-avatar-generated-bg-color', `${newValue}`);
  }
  srcChange() {
    this.isImageFailedToLoad = false;
  }
  componentWillLoad() {
    if (!this.isAvatarIcon()) {
      this.colorChange(this.color || _const.AVATAR_COLORS_VARIANTS[Math.floor(Math.random() * _const.AVATAR_COLORS_VARIANTS.length)]);
    }
    if (this.variant === 'circle') {
      this.host.style.setProperty('--avatar-border-radius', '120px');
    }
    else {
      const size = ['xl', 'l'].includes(this.size) ? 'm' : ['2xl', '3xl', '4xl'].includes(this.size) ? 'l' : this.size;
      this.host.style.setProperty('--avatar-border-radius', `var(--wpp-border-radius-${size})`);
    }
  }
  render() {
    const content = this.src && !this.isImageFailedToLoad ? (index.h("div", { class: this.imageWrapperCssClasses(), part: "content" }, index.h("img", { src: this.src, alt: `${this.name} - avatar`, class: this.imageCssClasses(), onError: this.handleImageLoadFailure, part: "image" }))) : (index.h(index.Fragment, null, index.h("div", { class: this.contentWrapperCssClasses(), part: "content" }, this.amountOfHiddenAvatars ? `+${this.amountOfHiddenAvatars}` : this.getUserAbbreviation(this.name), this.renderIcon())));
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, onClick: this.handleClick, exportparts: "image, content, tooltip", ...((this.withTooltip && !this.isAvatarIcon()) || this.role === 'presentation'
        ? { role: 'presentation' }
        : { role: this.role, tabIndex: this.index, ariaLabel: this.ariaProps.label }) }, this.withTooltip && !this.isAvatarIcon() ? (index.h("wpp-tooltip-v3-5-0", { text: this.name, config: this.tooltipConfig, part: "tooltip", ariaProps: { label: `User: ${this.name}`, role: 'button' } }, content)) : (content)));
  }
  static get registryIs() { return "wpp-avatar-v3-5-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "color": ["colorChange"],
    "src": ["srcChange"]
  }; }
};
WppAvatar.style = wppAvatarCss;

exports.wpp_avatar = WppAvatar;
