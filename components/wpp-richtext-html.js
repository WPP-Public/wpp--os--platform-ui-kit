import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './wpp-richtext-common-styles2.js';

const WppRichtextHtml$1 = /*@__PURE__*/ proxyCustomElement(class WppRichtextHtml extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.value = undefined;
  }
  /**
   * Ensure every `<img>` in the raw HTML carries an `alt` attribute. Author
   * content frequently ships images without one, which fails WCAG 1.1.1 (AXE
   * `image-alt`) once injected verbatim. Missing alts default to `""`
   * (decorative); author-provided alt text is left untouched. Parsing happens
   * in an inert `<template>`, so no scripts run and no resources load.
   */
  withImageAlts(html) {
    if (!html || typeof document === 'undefined')
      return html;
    const template = document.createElement('template');
    template.innerHTML = html;
    template.content.querySelectorAll('img:not([alt])').forEach(img => img.setAttribute('alt', ''));
    return template.innerHTML;
  }
  render() {
    const classes = `ql-container ql-wpp richtext-view-html`;
    return (h(Host, null, h("wpp-richtext-common-styles-v4-7-0", null), h("div", { class: classes, "data-testid": "richtext-editor-container" }, h("div", { class: "ql-editor", innerHTML: this.withImageAlts(this.value), "data-testid": "richtext-editor" }))));
  }
  static get registryIs() { return "wpp-richtext-html-v4-7-0"; }
}, [0, "wpp-richtext-html", "wpp-richtext-html-v4-7-0", {
    "value": [1025]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-richtext-html-v4-7-0", "wpp-richtext-common-styles-v4-7-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-richtext-html-v4-7-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRichtextHtml$1);
      }
      break;
    case "wpp-richtext-common-styles-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRichtextHtml = WppRichtextHtml$1;
const defineCustomElement = defineCustomElement$1;

export { WppRichtextHtml, defineCustomElement };
