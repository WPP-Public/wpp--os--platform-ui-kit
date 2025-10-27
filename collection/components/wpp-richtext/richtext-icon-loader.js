import { h, Host } from '@stencil/core';
export class WppRichtextIconLoader {
  render() {
    return (h(Host, null, h("div", { class: "icon-loader-container", "aria-hidden": "true", role: "presentation" }, h("wpp-icon-bold-v3-3-0", null), h("wpp-icon-italic-v3-3-0", null), h("wpp-icon-underline-v3-3-0", null), h("wpp-icon-strike-through-v3-3-0", null), h("wpp-icon-blockquote-v3-3-0", null), h("wpp-icon-code-view-v3-3-0", null), h("wpp-icon-h1-v3-3-0", null), h("wpp-icon-h2-v3-3-0", null), h("wpp-icon-ordered-list-v3-3-0", null), h("wpp-icon-unordered-list-v3-3-0", null), h("wpp-icon-text-alignment-left-v3-3-0", null), h("wpp-icon-text-alignment-center-v3-3-0", null), h("wpp-icon-text-alignment-right-v3-3-0", null), h("wpp-icon-text-alignment-justify-v3-3-0", null), h("wpp-icon-float-left-v3-3-0", null), h("wpp-icon-float-center-v3-3-0", null), h("wpp-icon-float-right-v3-3-0", null), h("wpp-icon-indent-increase-v3-3-0", null), h("wpp-icon-indent-decrease-v3-3-0", null), h("wpp-icon-link-v3-3-0", null), h("wpp-icon-undo-v3-3-0", null), h("wpp-icon-redo-v3-3-0", null), h("wpp-icon-attach-v3-3-0", null), h("wpp-icon-image-v3-3-0", null), h("wpp-icon-video-clip-v3-3-0", null), h("wpp-icon-info-v3-3-0", null))));
  }
  static get is() { return "wpp-richtext-icon-loader"; }
  static get registryIs() { return "wpp-richtext-icon-loader-v3-3-0"; }
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
