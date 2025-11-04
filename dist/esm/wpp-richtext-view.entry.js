import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { p as processMarkdownValue, t as turndownService } from './config-5578eb3c.js';
import { f as formats, s as sources, Q as Quill } from './types-112bed55.js';
import { k as transformToVersionedTag } from './utils-d423b01f.js';
import './wpp-icon-unordered-list-1985dd37.js';
import './WppIcon-f4802cc9.js';
import './wpp-icon-video-clip-b134a3cd.js';
import './_commonjsHelpers-ba3f0406.js';
import './wpp-progress-indicator-1470c3b6.js';
import './wpp-icon-chevron-3780b470.js';
import './wpp-icon-gallery-64c20319.js';
import './lodash-66b76943.js';
import './wpp-action-button-40484a42.js';
import './common-69c8ea89.js';
import './WrappedSlot-2ee5325a.js';
import './wpp-input-9437c445.js';
import './turndown.browser.es-9f6d9c98.js';
import './consts-5bf9c29f.js';

const WppRichtextView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
    this.format = formats.html;
    this.debug = 'warn';
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = false;
    this.name = undefined;
  }
  setValue(value, isInitialLoad = false) {
    if (this.format === formats.markdown) {
      const editorTag = transformToVersionedTag('wpp-richtext');
      let editorEl;
      if (this.name) {
        editorEl = document.querySelector(`${editorTag}[name="${this.name}"]`);
      }
      else {
        editorEl = document.querySelector(editorTag);
      }
      if (editorEl && editorEl.quill && editorEl.format === this.format) {
        const editorHtml = editorEl.quill.root.innerHTML;
        this.quill.root.innerHTML = editorHtml;
        return;
      }
    }
    // Fallback: process markdown into HTML for the view
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.markdown) {
      const { html } = processMarkdownValue(value, this.preserveWhitespace, isInitialLoad);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, sources.api);
      // normalize empty blocks when parsing stored value
      const normalizeNode = (node) => {
        const html = node.innerHTML.trim().toLowerCase();
        if (html === '' || html === '<br>' || html === '<br/>' || html === '<br />' || html === '&nbsp;') {
          node.innerHTML = '&nbsp;';
        }
      };
      const blocks = Array.from(this.quill.root.querySelectorAll('p, blockquote'));
      blocks.forEach(b => normalizeNode(b));
      const emptyListItems = this.quill.root.querySelectorAll('li');
      let removedCount = 0;
      emptyListItems.forEach(li => {
        const liContent = li.innerHTML.trim();
        if (liContent === '<br>' || liContent === '') {
          li.remove();
          removedCount++;
        }
      });
      if (removedCount > 0)
        this.quill.update(sources.api);
    }
    else if (this.format === formats.text) {
      this.quill.setText(value, sources.api);
    }
    else if (this.format === formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), sources.api);
      }
      catch (_) {
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
      catch (_) {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    const modules = this.modules ? JSON.parse(this.modules) : { toolbar: false };
    if (modules.toolbar)
      modules.toolbar = false;
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
      this.setValue(this.value, true);
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
    return (h(Host, null, h("wpp-quill-styles-v3-3-0", null), h("wpp-richtext-common-styles-v3-3-0", null), h("div", { ref: (el) => (this.containerElement = el), class: this.preserveWhitespace ? 'preserve-whitespace' : '' })));
  }
  static get registryIs() { return "wpp-richtext-view-v3-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};

export { WppRichtextView as wpp_richtext_view };
