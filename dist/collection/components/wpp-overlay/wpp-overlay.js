import { Host, h } from '@stencil/core';
import { Z_INDEX } from '../../common/consts';
const OVERLAY_ANIMATION_DURATION = 200;
export class WppOverlay {
  constructor() {
    this.handleClick = () => {
      this.wppClick.emit();
    };
    this.getOverlayCssClasses = () => ({
      overlay: true,
      'overlay--visible': this.isVisible,
      'overlay--hidden': this.isHidden,
    });
    this.isHidden = false;
    this.isVisible = false;
    this.zIndex = Z_INDEX.OVERLAY;
  }
  handleVisibleChange(newValue) {
    if (newValue) {
      this.isHidden = false;
    }
    else {
      setTimeout(() => {
        this.isHidden = true;
      }, OVERLAY_ANIMATION_DURATION);
    }
  }
  componentWillLoad() {
    if (!this.isVisible) {
      this.isHidden = true;
    }
  }
  render() {
    return (h(Host, null, h("div", { class: this.getOverlayCssClasses(), style: { zIndex: this.zIndex.toString() }, onClick: this.handleClick })));
  }
  static get is() { return "wpp-overlay"; }
  static get registryIs() { return "wpp-overlay-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-overlay.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-overlay.css"]
    };
  }
  static get properties() {
    return {
      "isVisible": {
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
          "text": "Controls the visibility of the overlay."
        },
        "attribute": "is-visible",
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
          "text": "Defines the z-index of the WppOverlay."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.OVERLAY"
      }
    };
  }
  static get states() {
    return {
      "isHidden": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClick",
        "name": "wppClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the overlay is clicked."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "isVisible",
        "methodName": "handleVisibleChange"
      }];
  }
}
