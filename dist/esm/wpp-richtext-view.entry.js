import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { p as processMarkdownValue, t as turndownService } from './config-573fe805.js';
import { f as formats, s as sources, Q as Quill } from './types-112bed55.js';
import './utils-3a5af594.js';
import './consts-9fc0a13a.js';
import './wpp-icon-unordered-list-3cc4ec10.js';
import './WppIcon-f4802cc9.js';
import './wpp-icon-video-clip-d0e54a38.js';
import './_commonjsHelpers-ba3f0406.js';
import './wpp-progress-indicator-bc27e7cc.js';
import './wpp-icon-chevron-f52580bd.js';
import './wpp-icon-gallery-6d24ee11.js';
import './lodash-66b76943.js';
import './wpp-action-button-4fca7b01.js';
import './common-69c8ea89.js';
import './WrappedSlot-629d3e4f.js';
import './wpp-input-b270e4fb.js';
import './turndown.browser.es-9f6d9c98.js';

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
    this.preserveWhitespace = true;
    this.name = undefined;
  }
  setValue(value) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.markdown) {
      const { html } = processMarkdownValue(value);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, sources.api);
      // Quill's clipboard.convert adds extra empty <p><br></p> before lists when preceded by a <p> tag
      // We need to remove these, but KEEP <p>&nbsp;</p> which are intentional blank lines
      const lists = this.quill.root.querySelectorAll('ol, ul');
      lists.forEach(list => {
        const prevElement = list.previousElementSibling;
        if (prevElement && prevElement.tagName === 'P') {
          const content = prevElement.innerHTML.trim();
          if (content === '<br>' || content === '') {
            prevElement.remove();
          }
        }
      });
      // Clean up empty list items that may have been created
      const emptyListItems = this.quill.root.querySelectorAll('li');
      let removedCount = 0;
      emptyListItems.forEach(li => {
        const liContent = li.innerHTML.trim();
        if (liContent === '<br>' || liContent === '') {
          li.remove();
          removedCount++;
        }
      });
      if (removedCount > 0) {
        this.quill.update(sources.api);
      }
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
    return (h(Host, null, h("wpp-quill-styles-v3-5-0", null), h("wpp-richtext-common-styles-v3-5-0", null), h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get registryIs() { return "wpp-richtext-view-v3-5-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};

export { WppRichtextView as wpp_richtext_view };
