'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const richtextIconLoaderCss = ":host{position:absolute !important;width:0 !important;height:0 !important;padding:0 !important;margin:0 !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important;visibility:hidden !important;pointer-events:none !important;z-index:-9999 !important}.icon-loader-container{position:absolute !important;left:-9999px !important;width:1px !important;height:1px !important;overflow:hidden !important}.icon-loader-container *{visibility:hidden !important;display:none !important}";

const WppRichtextIconLoader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "icon-loader-container", "aria-hidden": "true", role: "presentation" }, index.h("wpp-icon-bold-v3-6-0", null), index.h("wpp-icon-italic-v3-6-0", null), index.h("wpp-icon-underline-v3-6-0", null), index.h("wpp-icon-strike-through-v3-6-0", null), index.h("wpp-icon-blockquote-v3-6-0", null), index.h("wpp-icon-code-view-v3-6-0", null), index.h("wpp-icon-h1-v3-6-0", null), index.h("wpp-icon-h2-v3-6-0", null), index.h("wpp-icon-ordered-list-v3-6-0", null), index.h("wpp-icon-unordered-list-v3-6-0", null), index.h("wpp-icon-text-alignment-left-v3-6-0", null), index.h("wpp-icon-text-alignment-center-v3-6-0", null), index.h("wpp-icon-text-alignment-right-v3-6-0", null), index.h("wpp-icon-text-alignment-justify-v3-6-0", null), index.h("wpp-icon-float-left-v3-6-0", null), index.h("wpp-icon-float-center-v3-6-0", null), index.h("wpp-icon-float-right-v3-6-0", null), index.h("wpp-icon-indent-increase-v3-6-0", null), index.h("wpp-icon-indent-decrease-v3-6-0", null), index.h("wpp-icon-link-v3-6-0", null), index.h("wpp-icon-undo-v3-6-0", null), index.h("wpp-icon-redo-v3-6-0", null), index.h("wpp-icon-attach-v3-6-0", null), index.h("wpp-icon-image-v3-6-0", null), index.h("wpp-icon-video-clip-v3-6-0", null), index.h("wpp-icon-info-v3-6-0", null))));
  }
  static get registryIs() { return "wpp-richtext-icon-loader-v3-6-0"; }
  get host() { return index.getElement(this); }
};
WppRichtextIconLoader.style = richtextIconLoaderCss;

exports.wpp_richtext_icon_loader = WppRichtextIconLoader;
