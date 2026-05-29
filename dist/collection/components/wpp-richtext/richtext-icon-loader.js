import { h, Host } from '@stencil/core';
export class WppRichtextIconLoader {
  render() {
    return (h(Host, null, h("div", { class: "icon-loader-container", "aria-hidden": "true", role: "presentation" }, h("wpp-icon-bold-v4-1-0", null), h("wpp-icon-italic-v4-1-0", null), h("wpp-icon-underline-v4-1-0", null), h("wpp-icon-strike-through-v4-1-0", null), h("wpp-icon-blockquote-v4-1-0", null), h("wpp-icon-code-view-v4-1-0", null), h("wpp-icon-h1-v4-1-0", null), h("wpp-icon-h2-v4-1-0", null), h("wpp-icon-ordered-list-v4-1-0", null), h("wpp-icon-unordered-list-v4-1-0", null), h("wpp-icon-text-alignment-left-v4-1-0", null), h("wpp-icon-text-alignment-center-v4-1-0", null), h("wpp-icon-text-alignment-right-v4-1-0", null), h("wpp-icon-text-alignment-justify-v4-1-0", null), h("wpp-icon-float-left-v4-1-0", null), h("wpp-icon-float-center-v4-1-0", null), h("wpp-icon-float-right-v4-1-0", null), h("wpp-icon-indent-increase-v4-1-0", null), h("wpp-icon-indent-decrease-v4-1-0", null), h("wpp-icon-link-v4-1-0", null), h("wpp-icon-undo-v4-1-0", null), h("wpp-icon-redo-v4-1-0", null), h("wpp-icon-attach-v4-1-0", null), h("wpp-icon-image-v4-1-0", null), h("wpp-icon-video-clip-v4-1-0", null), h("wpp-icon-info-v4-1-0", null))));
  }
  static get is() { return "wpp-richtext-icon-loader"; }
  static get registryIs() { return "wpp-richtext-icon-loader-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["richtext-icon-loader.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["richtext-icon-loader.css"]
    };
  }
  static get elementRef() { return "host"; }
}
