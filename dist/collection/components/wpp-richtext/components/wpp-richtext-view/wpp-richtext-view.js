import { h, Host } from '@stencil/core';
import { Editor } from '@tiptap/core';
import { formats } from '../../types';
import { buildTiptapExtensions } from '../../tiptap-config';
import { normalizeEmptyParagraphs, normalizeListHtml } from '../../utils';
export class WppRichtextView {
  constructor() {
    this.tiptapEditor = null;
    this.value = undefined;
    this.format = formats.html;
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = true;
    this.name = undefined;
  }
  setValue(value) {
    if (!this.tiptapEditor)
      return;
    const noEmitOpts = { emitUpdate: false };
    const noEmitPreserveOpts = { ...noEmitOpts, parseOptions: { preserveWhitespace: 'full' } };
    if (this.format === formats.html) {
      this.tiptapEditor.commands.setContent(normalizeEmptyParagraphs(String(value || '')), noEmitPreserveOpts);
    }
    else if (this.format === formats.markdown) {
      const md = String(value || '');
      // `MarkdownManager.parse('')` returns `{ type: 'doc', content: [] }`,
      // which violates the ProseMirror doc schema (one block-child minimum)
      // and causes `setContent` to silently no-op — the previously-rendered
      // content stays on screen, so a fully cleared editor's value (e.g.
      // after the user deletes the last character) never propagates here.
      // Route empties through the plain HTML path which DOES clear the doc.
      if (!md) {
        this.tiptapEditor.commands.setContent('', noEmitOpts);
      }
      else {
        this.tiptapEditor.commands.setContent(md, { ...noEmitPreserveOpts, contentType: 'markdown' });
      }
    }
    else if (this.format === formats.text) {
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
    else if (this.format === formats.json) {
      try {
        const content = JSON.parse(value);
        this.tiptapEditor.commands.setContent(content, noEmitOpts);
      }
      catch {
        const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
      }
    }
    else {
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
  }
  getValue() {
    if (!this.tiptapEditor)
      return '';
    const html = this.tiptapEditor.getHTML();
    const text = this.tiptapEditor.state.doc.textContent;
    if (this.tiptapEditor.isEmpty)
      return '';
    if (this.format === 'html') {
      return normalizeListHtml(html);
    }
    else if (this.format === 'markdown') {
      return this.tiptapEditor.getMarkdown();
    }
    else if (this.format === 'text') {
      return text;
    }
    else if (this.format === 'json') {
      try {
        return JSON.stringify(this.tiptapEditor.getJSON());
      }
      catch {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    const extensions = buildTiptapExtensions({
      formats: this.formats,
    });
    this.tiptapEditor = new Editor({
      element: this.containerElement,
      extensions,
      content: '',
      editable: false,
      injectCSS: false,
    });
    if (this.styles) {
      try {
        const styles = JSON.parse(this.styles);
        Object.keys(styles).forEach((key) => {
          this.containerElement?.style.setProperty(key, styles[key]);
        });
      }
      catch {
        // ignore invalid JSON styles
      }
    }
    this.containerElement?.classList.add('tiptap-view');
    if (this.value) {
      this.setValue(this.value);
    }
  }
  disconnectedCallback() {
    this.tiptapEditor?.destroy();
    this.tiptapEditor = null;
  }
  updateStyle(newValue, oldValue) {
    if (!this.containerElement) {
      return;
    }
    // Tolerate invalid JSON in either value (matches componentDidLoad behaviour);
    // a malformed `styles` prop must not throw and break the component for
    // consumers that may pass dynamic / partially-built JSON.
    if (oldValue) {
      try {
        const old = JSON.parse(oldValue);
        Object.keys(old).forEach((key) => {
          this.containerElement?.style.setProperty(key, '');
        });
      }
      catch {
        // ignore invalid previous JSON styles
      }
    }
    if (newValue) {
      try {
        const value = JSON.parse(newValue);
        Object.keys(value).forEach((key) => {
          this.containerElement?.style.setProperty(key, value[key]);
        });
      }
      catch {
        // ignore invalid new JSON styles
      }
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
    return (h(Host, null, h("wpp-richtext-common-styles-v4-1-0", null), h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get is() { return "wpp-richtext-view"; }
  static get registryIs() { return "wpp-richtext-view-v4-1-0"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-richtext-view.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-richtext-view.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "RichtextValue",
          "resolved": "string",
          "references": {
            "RichtextValue": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-richtext/types.ts::RichtextValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Editor value"
        },
        "attribute": "value",
        "reflect": true
      },
      "format": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "Formats",
          "resolved": "string",
          "references": {
            "Formats": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-richtext/types.ts::Formats"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Format of editor value"
        },
        "attribute": "format",
        "reflect": true,
        "defaultValue": "formats.html"
      },
      "formats": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whitelist of formats to allow in the editor."
        }
      },
      "modules": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Collection of modules to include and respective options."
        },
        "attribute": "modules",
        "reflect": false
      },
      "strict": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Use strict comparison for objects."
        },
        "attribute": "strict",
        "reflect": false,
        "defaultValue": "true"
      },
      "styles": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Inline styles for editor, in a JSON format"
        },
        "attribute": "styles",
        "reflect": false,
        "defaultValue": "'{}'"
      },
      "preserveWhitespace": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "This property is no longer needed. Whitespace preservation is now the default behavior\nfor markdown format. This prop will be removed in version 5.0.0."
            }],
          "text": ""
        },
        "attribute": "preserve-whitespace",
        "reflect": true,
        "defaultValue": "true"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Name of the editor instance"
        },
        "attribute": "name",
        "reflect": true
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "styles",
        "methodName": "updateStyle"
      }, {
        "propName": "value",
        "methodName": "updateContent"
      }];
  }
}
