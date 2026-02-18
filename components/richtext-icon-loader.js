import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$q } from './wpp-icon-attach2.js';
import { d as defineCustomElement$p } from './wpp-icon-blockquote2.js';
import { d as defineCustomElement$o } from './wpp-icon-bold2.js';
import { d as defineCustomElement$n } from './wpp-icon-code-view2.js';
import { d as defineCustomElement$m } from './wpp-icon-float-center2.js';
import { d as defineCustomElement$l } from './wpp-icon-float-left2.js';
import { d as defineCustomElement$k } from './wpp-icon-float-right2.js';
import { d as defineCustomElement$j } from './wpp-icon-h12.js';
import { d as defineCustomElement$i } from './wpp-icon-h22.js';
import { d as defineCustomElement$h } from './wpp-icon-image2.js';
import { d as defineCustomElement$g } from './wpp-icon-indent-decrease2.js';
import { d as defineCustomElement$f } from './wpp-icon-indent-increase2.js';
import { d as defineCustomElement$e } from './wpp-icon-info2.js';
import { d as defineCustomElement$d } from './wpp-icon-italic2.js';
import { d as defineCustomElement$c } from './wpp-icon-link2.js';
import { d as defineCustomElement$b } from './wpp-icon-ordered-list2.js';
import { d as defineCustomElement$a } from './wpp-icon-redo2.js';
import { d as defineCustomElement$9 } from './wpp-icon-strike-through2.js';
import { d as defineCustomElement$8 } from './wpp-icon-text-alignment-center2.js';
import { d as defineCustomElement$7 } from './wpp-icon-text-alignment-justify2.js';
import { d as defineCustomElement$6 } from './wpp-icon-text-alignment-left2.js';
import { d as defineCustomElement$5 } from './wpp-icon-text-alignment-right2.js';
import { d as defineCustomElement$4 } from './wpp-icon-underline2.js';
import { d as defineCustomElement$3 } from './wpp-icon-undo2.js';
import { d as defineCustomElement$2 } from './wpp-icon-unordered-list2.js';
import { d as defineCustomElement$1 } from './wpp-icon-video-clip2.js';

const richtextIconLoaderCss = ":host{position:absolute !important;width:0 !important;height:0 !important;padding:0 !important;margin:0 !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;white-space:nowrap !important;border:0 !important;visibility:hidden !important;pointer-events:none !important;z-index:-9999 !important}.icon-loader-container{position:absolute !important;left:-9999px !important;width:1px !important;height:1px !important;overflow:hidden !important}.icon-loader-container *{visibility:hidden !important;display:none !important}";

const WppRichtextIconLoader = /*@__PURE__*/ proxyCustomElement(class WppRichtextIconLoader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("div", { class: "icon-loader-container", "aria-hidden": "true", role: "presentation" }, h("wpp-icon-bold-v4-0-0", null), h("wpp-icon-italic-v4-0-0", null), h("wpp-icon-underline-v4-0-0", null), h("wpp-icon-strike-through-v4-0-0", null), h("wpp-icon-blockquote-v4-0-0", null), h("wpp-icon-code-view-v4-0-0", null), h("wpp-icon-h1-v4-0-0", null), h("wpp-icon-h2-v4-0-0", null), h("wpp-icon-ordered-list-v4-0-0", null), h("wpp-icon-unordered-list-v4-0-0", null), h("wpp-icon-text-alignment-left-v4-0-0", null), h("wpp-icon-text-alignment-center-v4-0-0", null), h("wpp-icon-text-alignment-right-v4-0-0", null), h("wpp-icon-text-alignment-justify-v4-0-0", null), h("wpp-icon-float-left-v4-0-0", null), h("wpp-icon-float-center-v4-0-0", null), h("wpp-icon-float-right-v4-0-0", null), h("wpp-icon-indent-increase-v4-0-0", null), h("wpp-icon-indent-decrease-v4-0-0", null), h("wpp-icon-link-v4-0-0", null), h("wpp-icon-undo-v4-0-0", null), h("wpp-icon-redo-v4-0-0", null), h("wpp-icon-attach-v4-0-0", null), h("wpp-icon-image-v4-0-0", null), h("wpp-icon-video-clip-v4-0-0", null), h("wpp-icon-info-v4-0-0", null))));
  }
  static get registryIs() { return "wpp-richtext-icon-loader-v4-0-0"; }
  get host() { return this; }
  static get style() { return richtextIconLoaderCss; }
}, [1, "wpp-richtext-icon-loader", "wpp-richtext-icon-loader-v4-0-0"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-richtext-icon-loader-v4-0-0", "wpp-icon-attach-v4-0-0", "wpp-icon-blockquote-v4-0-0", "wpp-icon-bold-v4-0-0", "wpp-icon-code-view-v4-0-0", "wpp-icon-float-center-v4-0-0", "wpp-icon-float-left-v4-0-0", "wpp-icon-float-right-v4-0-0", "wpp-icon-h1-v4-0-0", "wpp-icon-h2-v4-0-0", "wpp-icon-image-v4-0-0", "wpp-icon-indent-decrease-v4-0-0", "wpp-icon-indent-increase-v4-0-0", "wpp-icon-info-v4-0-0", "wpp-icon-italic-v4-0-0", "wpp-icon-link-v4-0-0", "wpp-icon-ordered-list-v4-0-0", "wpp-icon-redo-v4-0-0", "wpp-icon-strike-through-v4-0-0", "wpp-icon-text-alignment-center-v4-0-0", "wpp-icon-text-alignment-justify-v4-0-0", "wpp-icon-text-alignment-left-v4-0-0", "wpp-icon-text-alignment-right-v4-0-0", "wpp-icon-underline-v4-0-0", "wpp-icon-undo-v4-0-0", "wpp-icon-unordered-list-v4-0-0", "wpp-icon-video-clip-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-richtext-icon-loader-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRichtextIconLoader);
      }
      break;
    case "wpp-icon-attach-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-icon-blockquote-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-icon-bold-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-code-view-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-float-center-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-float-left-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-float-right-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-h1-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-h2-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-image-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-indent-decrease-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-indent-increase-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-info-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-italic-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-link-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-ordered-list-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-redo-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-strike-through-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-text-alignment-center-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-text-alignment-justify-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-text-alignment-left-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-text-alignment-right-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-underline-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-icon-undo-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-icon-unordered-list-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-icon-video-clip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppRichtextIconLoader as W, defineCustomElement as d };
