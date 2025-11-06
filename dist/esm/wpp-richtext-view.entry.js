import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { m as marked_umd } from './marked.umd-2f5023bc.js';
import { f as formats, s as sources, Q as Quill } from './types-112bed55.js';
import { T as TurndownService } from './turndown.browser.es-8ae0014d.js';
import './utils-f3870f15.js';
import './consts-4b0f734e.js';
import './wpp-icon-attach-ab8b7b8e.js';
import './WppIcon-d0aab502.js';
import './wpp-icon-blockquote-e23da51b.js';
import './wpp-icon-bold-dfebe5db.js';
import './wpp-icon-code-view-354ec303.js';
import './wpp-icon-float-center-c44367d6.js';
import './wpp-icon-float-left-5837d66e.js';
import './wpp-icon-float-right-d24356e9.js';
import './wpp-icon-h1-72b1c973.js';
import './wpp-icon-h2-60de8d2b.js';
import './wpp-icon-video-clip-9526562d.js';
import './wpp-icon-indent-decrease-ca6662f3.js';
import './wpp-icon-indent-increase-632fb35e.js';
import './wpp-icon-italic-03fb8f41.js';
import './wpp-icon-link-a3db6929.js';
import './wpp-icon-ordered-list-6c165c5e.js';
import './wpp-icon-redo-87eac29f.js';
import './wpp-icon-strike-through-a5f63a7d.js';
import './wpp-icon-text-alignment-center-9c95e8c5.js';
import './wpp-icon-text-alignment-justify-d3ea8e91.js';
import './wpp-icon-text-alignment-left-682862b4.js';
import './wpp-icon-text-alignment-right-8f616d52.js';
import './wpp-icon-underline-9b2e6d1b.js';
import './wpp-icon-undo-59ed85c2.js';
import './wpp-icon-unordered-list-83325b10.js';
import './wpp-progress-indicator-83078fdc.js';
import './_commonjsHelpers-ba3f0406.js';
import './wpp-icon-chevron-987d4c5e.js';
import './wpp-icon-gallery-abc3646e.js';
import './lodash-66b76943.js';
import './wpp-action-button-eea7b2ce.js';
import './common-69c8ea89.js';
import './WrappedSlot-a49aa0dd.js';
import './wpp-input-f4d242af.js';

/* eslint-disable @stencil/own-props-must-be-private, @stencil/own-methods-must-be-private */
const turndownService = new TurndownService();
const WppRichtextView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.format = 'html';
    this.debug = 'warn';
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = false;
  }
  setValue(value) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.markdown) {
      // Convert Markdown to HTML, then convert that HTML to Delta.
      const html = marked_umd.marked(value);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.text) {
      this.quill.setText(value, sources.api);
    }
    else if (this.format === formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), sources.api);
      }
      catch (e) {
        this.quill.setText(value, sources.api);
      }
    }
    else {
      this.quill.setText(value, sources.api);
    }
  }
  getValue() {
    const text = this.quill.getText();
    const content = this.quill.getContents();
    let html = this.containerElement.children[0].innerHTML || '';
    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = '';
    }
    if (this.format === 'html') {
      return html;
    }
    else if (this.format === 'markdown') {
      // Convert the rendered HTML back to Markdown
      return turndownService.turndown(html);
    }
    else if (this.format === 'text') {
      return text;
    }
    else if (this.format === 'json') {
      try {
        return JSON.stringify(content);
      }
      catch (e) {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    const modules = this.modules
      ? JSON.parse(this.modules)
      : {
        toolbar: false,
      };
    if (modules.toolbar) {
      modules.toolbar = false;
    }
    this.quill = new Quill(this.containerElement, {
      debug: this.debug,
      modules,
      readOnly: true,
      theme: 'wpp',
      formats: this.formats,
      strict: this.strict,
    });
    if (this.styles) {
      const styles = JSON.parse(this.styles);
      Object.keys(styles).forEach((key) => {
        this.containerElement?.style.setProperty(key, styles[key]);
      });
    }
    this.containerElement?.classList.add('quill-view');
    if (this.value) {
      this.setValue(this.value);
      this.quill['history'].clear();
    }
  }
  updateStyle(newValue, oldValue) {
    if (!this.containerElement) {
      return;
    }
    if (oldValue) {
      const old = JSON.parse(oldValue);
      Object.keys(old).forEach((key) => {
        this.containerElement?.style.setProperty(key, '');
      });
    }
    if (newValue) {
      const value = JSON.parse(newValue);
      Object.keys(value).forEach((key) => {
        this.containerElement?.style.setProperty(key, value[key]);
      });
    }
  }
  updateContent(newValue) {
    const value = this.getValue();
    if (Object.values(formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const newContentString = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== newContentString;
      }
      catch {
        return null;
      }
      if (!changed) {
        return null;
      }
    }
    this.setValue(newValue);
  }
  render() {
    return (h(Host, null, h("wpp-quill-styles-v2-22-0", null), h("wpp-richtext-common-styles-v2-22-0", null), this.preserveWhitespace ? (h("pre", { ref: (el) => (this.containerElement = el) })) : (h("div", { ref: (el) => (this.containerElement = el) }))));
  }
  static get registryIs() { return "wpp-richtext-view-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};

export { WppRichtextView as wpp_richtext_view };
