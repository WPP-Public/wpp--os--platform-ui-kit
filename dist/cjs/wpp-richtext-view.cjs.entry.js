'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const marked_umd = require('./marked.umd-55b1e00e.js');
const types = require('./types-3dbf006d.js');
const turndown_browser_es = require('./turndown.browser.es-ab4eddc9.js');
require('./utils-9c925efe.js');
require('./consts-255c1066.js');
require('./wpp-icon-attach-18caec1f.js');
require('./WppIcon-be5823e9.js');
require('./wpp-icon-blockquote-3b1f65a9.js');
require('./wpp-icon-bold-8a1c9991.js');
require('./wpp-icon-code-view-77a8384b.js');
require('./wpp-icon-float-center-d9ccf8df.js');
require('./wpp-icon-float-left-91e1b2de.js');
require('./wpp-icon-float-right-8784d915.js');
require('./wpp-icon-h1-5bffca36.js');
require('./wpp-icon-h2-2597c2b7.js');
require('./wpp-icon-video-clip-906d3736.js');
require('./wpp-icon-indent-decrease-4ebb56d9.js');
require('./wpp-icon-indent-increase-b5082dc1.js');
require('./wpp-icon-italic-7ee24a77.js');
require('./wpp-icon-link-69465e77.js');
require('./wpp-icon-ordered-list-53ec5736.js');
require('./wpp-icon-redo-a3384b93.js');
require('./wpp-icon-strike-through-53689c77.js');
require('./wpp-icon-text-alignment-center-b00d0f4b.js');
require('./wpp-icon-text-alignment-justify-a30c1bf9.js');
require('./wpp-icon-text-alignment-left-316ef4ef.js');
require('./wpp-icon-text-alignment-right-6c87f495.js');
require('./wpp-icon-underline-a26a36fc.js');
require('./wpp-icon-undo-47d7786e.js');
require('./wpp-icon-unordered-list-771565fd.js');
require('./wpp-progress-indicator-56fa2d43.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./wpp-icon-chevron-38c9cfb8.js');
require('./wpp-icon-gallery-4955ec97.js');
require('./lodash-04cddce7.js');
require('./wpp-action-button-5ccf570c.js');
require('./common-ee802540.js');
require('./WrappedSlot-736c2736.js');
require('./wpp-input-5512f89c.js');

/* eslint-disable @stencil/own-props-must-be-private, @stencil/own-methods-must-be-private */
const turndownService = new turndown_browser_es.TurndownService();
const WppRichtextView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    if (this.format === types.formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, types.sources.api);
    }
    else if (this.format === types.formats.markdown) {
      // Convert Markdown to HTML, then convert that HTML to Delta.
      const html = marked_umd.marked_umd.marked(value);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, types.sources.api);
    }
    else if (this.format === types.formats.text) {
      this.quill.setText(value, types.sources.api);
    }
    else if (this.format === types.formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), types.sources.api);
      }
      catch (e) {
        this.quill.setText(value, types.sources.api);
      }
    }
    else {
      this.quill.setText(value, types.sources.api);
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
    this.quill = new types.Quill(this.containerElement, {
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
    if (Object.values(types.formats).indexOf(this.format) > -1 && newValue === value) {
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
    return (index.h(index.Host, null, index.h("wpp-quill-styles-v2-22-0", null), index.h("wpp-richtext-common-styles-v2-22-0", null), this.preserveWhitespace ? (index.h("pre", { ref: (el) => (this.containerElement = el) })) : (index.h("div", { ref: (el) => (this.containerElement = el) }))));
  }
  static get registryIs() { return "wpp-richtext-view-v2-22-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};

exports.wpp_richtext_view = WppRichtextView;
