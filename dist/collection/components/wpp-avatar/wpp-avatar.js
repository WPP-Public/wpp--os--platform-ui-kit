import { h, Host, Fragment } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { AVATAR_COLORS_VARIANTS } from '../wpp-avatar-group/const';
import { transformToVersionedTag } from '../../utils/utils';
import { AVATAR_CIRCLE_BORDER_RADIUS, AVATAR_ICON_SIZE, AVATAR_SQUARE_RADIUS_TOKEN } from './const';
/**
 * @part image - Image element
 * @part icon - Icon element
 * @part content - content wrapper element
 * @part tooltip - tooltip wrapper content
 */
export class WppAvatar {
  constructor() {
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
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClick();
      }
    };
    this.renderIcon = () => {
      if (!this.icon)
        return null;
      const iconSize = AVATAR_ICON_SIZE[this.size];
      return h(transformToVersionedTag(this.icon), {
        width: iconSize,
        height: iconSize,
        part: 'icon',
      });
    };
    this.handleClick = () => {
      if (this.interactable) {
        this.wppClick.emit({ value: this.host });
      }
    };
    this.hostCssClasses = () => ({
      'wpp-avatar': true,
      interactable: this.interactable,
      'wpp-icon-avatar': !!this.icon,
      'with-tooltip': this.withTooltip,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      [`size-${this.size}`]: true,
    });
    this.contentWrapperCssClasses = () => ({
      'without-image': true,
      'interactable-wrapper': this.interactable,
      square: this.variant === 'square' || this.isAvatarIcon(),
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
    /** A tooltip is only shown for named (non-icon) avatars that opted in via `withTooltip`. */
    this.hasTooltip = () => this.withTooltip && !this.isAvatarIcon();
    /**
     * Avatars are presentational (removed from the a11y tree) when the tooltip already exposes the
     * name, or when explicitly marked via `role="presentation"`. Otherwise they expose their role,
     * tab index and label.
     */
    this.getHostAriaProps = () => this.hasTooltip() || this.role === 'presentation'
      ? { role: 'presentation' }
      : { role: this.role, tabIndex: this.index, ariaLabel: this.ariaProps.label };
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
      this.colorChange(this.color || AVATAR_COLORS_VARIANTS[Math.floor(Math.random() * AVATAR_COLORS_VARIANTS.length)]);
    }
    // Icon avatars are always rectangular (like logos), so only non-icon circle avatars use the
    // fully rounded radius; everything else follows the size-based square (rounded rectangle) radius.
    const borderRadius = this.variant === 'circle' && !this.isAvatarIcon()
      ? AVATAR_CIRCLE_BORDER_RADIUS
      : `var(--wpp-border-radius-${AVATAR_SQUARE_RADIUS_TOKEN[this.size]})`;
    this.host.style.setProperty('--avatar-border-radius', borderRadius);
  }
  render() {
    const content = this.src && !this.isImageFailedToLoad ? (h("div", { class: this.imageWrapperCssClasses(), part: "content" }, h("img", { src: this.src, alt: `${this.name} - avatar`, class: this.imageCssClasses(), onError: this.handleImageLoadFailure, part: "image" }))) : (h(Fragment, null, h("div", { class: this.contentWrapperCssClasses(), part: "content" }, this.isAvatarIcon()
      ? this.renderIcon()
      : this.amountOfHiddenAvatars
        ? `+${this.amountOfHiddenAvatars}`
        : this.getUserAbbreviation(this.name))));
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, onClick: this.handleClick, exportparts: "image, content, tooltip", ...this.getHostAriaProps() }, this.hasTooltip() ? (h("wpp-tooltip-v4-3-0", { text: this.name, config: this.tooltipConfig, part: "tooltip", ariaProps: { label: `User: ${this.name}`, role: 'button' } }, content)) : (content)));
  }
  static get is() { return "wpp-avatar"; }
  static get registryIs() { return "wpp-avatar-v4-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-avatar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-avatar.css"]
    };
  }
  static get properties() {
    return {
      "name": {
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
          "text": "Defines a username that is abbreviated if the image source is not provided."
        },
        "attribute": "name",
        "reflect": false,
        "defaultValue": "''"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AvatarSize",
          "resolved": "\"2xl\" | \"3xl\" | \"4xl\" | \"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "AvatarSize": {
              "location": "import",
              "path": "../wpp-avatar-group/types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'xs'"
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AvatarVariant",
          "resolved": "\"circle\" | \"square\"",
          "references": {
            "AvatarVariant": {
              "location": "import",
              "path": "../wpp-avatar-group/types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarVariant"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar type."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'circle'"
      },
      "src": {
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
          "tags": [],
          "text": "Defines the avatar image path."
        },
        "attribute": "src",
        "reflect": false
      },
      "icon": {
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
          "tags": [],
          "text": "Defines the avatar icon (e.g. `wpp-icon-premium`). Icon avatars are always rendered as a\nrounded rectangle (like logo avatars), regardless of the `variant` value."
        },
        "attribute": "icon",
        "reflect": false
      },
      "color": {
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
          "tags": [],
          "text": "Defines the avatar background color."
        },
        "attribute": "color",
        "reflect": false
      },
      "amountOfHiddenAvatars": {
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
          "text": "Defines and displays the number of hidden avatars."
        },
        "attribute": "amount-of-hidden-avatars",
        "reflect": false
      },
      "withTooltip": {
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
          "text": "If the avatar has a tooltip that displays the full username on hover."
        },
        "attribute": "with-tooltip",
        "reflect": false,
        "defaultValue": "false"
      },
      "interactable": {
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
          "text": "If `true`, the avatar is interactable (have hover effect)."
        },
        "attribute": "interactable",
        "reflect": false,
        "defaultValue": "false"
      },
      "index": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by avatar group"
            }],
          "text": "Indicates the avatar tab index."
        },
        "attribute": "index",
        "reflect": false,
        "defaultValue": "0"
      },
      "role": {
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
          "text": "Role of the avatar component."
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'button'"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the button `aria-` props."
        },
        "defaultValue": "{}"
      },
      "tooltipConfig": {
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
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`."
        },
        "defaultValue": "{\n    placement: 'bottom',\n  }"
      }
    };
  }
  static get states() {
    return {
      "isImageFailedToLoad": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClick",
        "name": "wppClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the avatar item is clicked."
        },
        "complexType": {
          "original": "AvatarChangeEventDetail",
          "resolved": "AvatarChangeEventDetail",
          "references": {
            "AvatarChangeEventDetail": {
              "location": "import",
              "path": "../wpp-avatar-group/types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "color",
        "methodName": "colorChange"
      }, {
        "propName": "src",
        "methodName": "srcChange"
      }];
  }
}
