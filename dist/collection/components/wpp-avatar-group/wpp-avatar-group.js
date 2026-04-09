import { h, Host, Fragment } from '@stencil/core';
import { AVATAR_COLORS_VARIANTS } from './const';
/**
 * @part list - Avatar group list element
 * @part item - Avatar group item element
 * @part menu - Avatar group context menu element
 * @part avatar - Avatar element
 * @part hidden-item - hidden-item wrapper element
 * @part hidden-item-with-avatar - hidden-item content wrapper element
 * @part hidden-item-avatar - hidden-item avatar element
 * @part hidden-item-name - hidden-item name element
 */
export class WppAvatarGroup {
  constructor() {
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
  }
  render() {
    const avatarsWithColors = this.getAvatarsWithColors(this.avatars);
    const avatarsToDisplay = avatarsWithColors.slice(0, this.maxAvatarsToDisplay);
    const avatarsInHiddenList = avatarsWithColors.slice(this.maxAvatarsToDisplay);
    return (h(Host, { class: this.avatarGroupWrapperCssClasses(), role: "group", exportparts: "list, item, menu, avatar, hidden-item, hidden-item-with-avatar, hidden-item-avatar, hidden-item-name" }, h("ul", { class: "avatars-list", part: "list" }, avatarsToDisplay.map((avatar, avatarIndex) => (h("li", { class: {
        'avatar-item': true,
        interactable: avatar.interactable ?? true,
      }, part: "item" }, h("wpp-avatar-v4-0-0", { size: this.size, variant: this.variant, name: avatar.name, src: avatar.src, withTooltip: this.withTooltip, tooltipConfig: this.tooltipConfig, interactable: avatar.interactable ?? true, color: avatar.color, onWppClick: (event) => this.handleAvatarClick(event, avatarIndex, false) })))), this.avatars.length > this.maxAvatarsToDisplay && (h("li", { class: "avatar-item", part: "item" }, h("wpp-menu-context-v4-0-0", { externalClass: "avatar-group", listWidth: "240px", dropdownConfig: {
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
      }, part: "menu", onKeyDown: this.onKeyDown, ariaProps: { label: `+${avatarsInHiddenList.length} more list items with avatars` } }, h("wpp-avatar-v4-0-0", { amountOfHiddenAvatars: avatarsInHiddenList.length, size: this.size, variant: this.variant, slot: "trigger-element", part: "avatar" }), h(Fragment, null, avatarsInHiddenList.map((avatar, avatarIndex) => (h("wpp-list-item-v4-0-0", { key: avatar.name, onWppChangeListItem: (event) => this.handleListItemClick(event, avatarIndex + this.maxAvatarsToDisplay), value: avatar.name, nonInteractive: avatar.interactable === false, part: "hidden-item" }, h("wpp-avatar-v4-0-0", { name: avatar.name, src: avatar.src, color: avatar.color, variant: this.variant, interactable: false, role: "presentation", slot: "left", part: "hidden-item-avatar" }), h("span", { slot: "label", class: "name", part: "hidden-item-name" }, avatar.name)))))))))));
  }
  static get is() { return "wpp-avatar-group"; }
  static get registryIs() { return "wpp-avatar-group-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-avatar-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-avatar-group.css"]
    };
  }
  static get properties() {
    return {
      "avatars": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AvatarState[]",
          "resolved": "AvatarState[]",
          "references": {
            "AvatarState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarState"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines a list of avatars with specific attributes, such as name, src, color, and so on: `avatars={[{name: '', src: ''}]}`"
        },
        "defaultValue": "[]"
      },
      "maxAvatarsToDisplay": {
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
          "text": "Defines how many avatars to show before `+x`, where `x` is the number of hidden avatars."
        },
        "attribute": "max-avatars-to-display",
        "reflect": false,
        "defaultValue": "6"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'xs' | 's'",
          "resolved": "\"s\" | \"xs\"",
          "references": {}
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
              "path": "./types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarVariant"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the avatar variant."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'circle'"
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
          "text": "If the avatar has a tooltip that displays the full name on hover."
        },
        "attribute": "with-tooltip",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the tooltip configuration. Under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    placement: 'bottom',\n  }"
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
      "menuContextTippyRef": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSelectItem",
        "name": "wppSelectItem",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the avatar item is clicked."
        },
        "complexType": {
          "original": "AvatarGroupChangeEventDetail",
          "resolved": "AvatarGroupChangeEventDetail",
          "references": {
            "AvatarGroupChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-avatar-group/types.ts::AvatarGroupChangeEventDetail"
            }
          }
        }
      }];
  }
}
