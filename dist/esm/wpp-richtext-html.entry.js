import { r as registerInstance, h, H as Host } from './index-a0877c3d.js';

const WppRichtextHtml = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { WppRichtextHtml as wpp_richtext_html };
