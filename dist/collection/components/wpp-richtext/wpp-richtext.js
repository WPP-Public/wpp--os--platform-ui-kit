import { h, Host } from '@stencil/core';
import deepmerge from 'deepmerge';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement } from '../../utils/utils';
import { Quill } from './';
import { debugLevels, formats, RICHTEXT_UPLOAD_REQUEST_EVENT, sources, } from './types';
import { KEYBOARD_FOCUS_CLASS, KEYBOARD_FOCUS_EVENT, LOCALES_DEFAULTS } from './const';
import { createDragThumbnail, embedBlotInnerHtmlRegexp, exportHtml, processMarkdownValue } from './utils';
import QuillMarkdown from 'quilljs-markdown';
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';
import turndownService, { quillMarkdownOptions } from './config';
const overwriteMerge = (destination, source) => source;
export class WppRichtext {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    this.onFocusIn = (event) => {
      if (!this.active) {
        this.active = true;
        this.wppFocus.emit(event);
      }
    };
    this.onFocusOut = (event) => {
      const isInternalBlur = !event.relatedTarget || this.host.contains(event.relatedTarget);
      if (!isInternalBlur) {
        this.active = false;
        this.focusType = FOCUS_TYPE.NONE;
        this.wppBlur.emit(event);
      }
      else {
        event.preventDefault();
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onMouseDown = (e) => {
      this.focusType = FOCUS_TYPE.NONE;
      if (this.disabled) {
        e.preventDefault();
      }
    };
    this.onEditorBlur = () => {
      this.savedSelectionRange = this.quill.selection.savedRange;
    };
    this.onEditorFocus = () => {
      if (this.focusType === FOCUS_TYPE.TAB) {
        this.quill.selection.setRange(this.savedSelectionRange);
      }
    };
    this.onDragstart = (e) => {
      // this.dragElement can be already set from outside, in imageLibrary for example
      if (!this.dragElement && e.target instanceof HTMLElement) {
        const tagName = e.target.tagName.toLowerCase();
        const eventTarget = e.target.eventTarget;
        if ((tagName && (tagName === 'img' || tagName === 'video')) || eventTarget) {
          const el = eventTarget || e.target;
          //@ts-ignore typing
          const blot = el.__blot?.blot;
          if (blot) {
            this.dragElement = blot.domNode;
            this.quill.setSelection(this.quill.getIndex(blot), blot.length());
          }
        }
      }
      if (this.dragElement && e.dataTransfer) {
        e.dataTransfer.clearData();
        e.dataTransfer.setData('text/html', this.dragElement.outerHTML.replace(embedBlotInnerHtmlRegexp, ''));
        this.dragThumbnail = createDragThumbnail(this.dragElement);
        e.dataTransfer.setDragImage(this.dragThumbnail, 0, 0);
      }
    };
    this.onDragend = () => {
      this.dragElement = null;
      if (this.dragThumbnail) {
        document.body.removeChild(this.dragThumbnail);
      }
    };
    this.onDrop = () => {
      const tagName = this.dragElement?.tagName.toLowerCase();
      // Workaround for Video elements
      if (tagName === 'video') {
        this.dragElement?.remove();
        this.quill.update(sources.user);
      }
    };
    this.updateEnteredCharacters = () => {
      if (this.charactersLimit) {
        // -1 because Quill adds a newline character at the end even when the editor is empty
        this.enteredCharacters = this.quill.getText().length - 1;
      }
    };
    this.hostCssClasses = () => ({
      'wpp-richtext': true,
    });
    this.formControlCssClasses = () => ({
      'ql-form-control': true,
      active: this.active,
      [KEYBOARD_FOCUS_CLASS]: this.active && this.focusType === FOCUS_TYPE.TAB,
      [`${this.messageType}`]: Boolean(this.messageType),
      disabled: this.disabled,
    });
    this.hasWarning = () => {
      if (!this.charactersLimit)
        return false;
      if (this.enteredCharacters < this.warningThreshold)
        return false;
      if (this.enteredCharacters > this.charactersLimit)
        return false;
      return true;
    };
    this.charLimitCssClasses = () => ({
      'characters-limit': true,
      warning: this.hasWarning(),
      error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
    });
    this.messageCssClasses = () => ({
      'messages-wrapper': true,
      'without-text-message': !!this.charactersLimit && !this.message,
    });
    this.focusType = undefined;
    this.enteredCharacters = undefined;
    this.plainText = '';
    this.name = undefined;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.charactersLimit = undefined;
    this.locales = {};
    this.warningThreshold = 20;
    this.active = false;
    this.format = formats.html;
    this.preserveWhitespace = true;
    this.bounds = undefined;
    this.value = undefined;
    this.debug = debugLevels.warn;
    this.formats = [];
    this.modules = undefined;
    this.placeholder = 'Insert text here...';
    this.scrollingContainer = undefined;
    this.strict = true;
    this.styles = '{}';
  }
  syncValueAndEmit(source) {
    const newValue = this.getValue();
    if (newValue !== this.value) {
      this.value = newValue;
      if (this.formControlInput) {
        this.formControlInput.value = this.value;
      }
      if (this.format === formats.markdown) {
        const { plainText } = processMarkdownValue(this.value);
        this.plainText = plainText;
      }
      else {
        this.plainText = this.value || '';
      }
      this.wppChange.emit({
        value: this.value,
        plainText: this.plainText,
        editor: this.quill,
        source,
        name: this.name,
      });
    }
  }
  setValue(value) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.markdown) {
      const str = String(value || '');
      // Process markdown: blank lines (\n\n) are preserved as visible empty paragraphs via &nbsp; markers
      const { html, plainText } = processMarkdownValue(str);
      this.plainText = plainText;
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, sources.api);
      // cleanup of empty <li>
      const editorEl = this.quill.root;
      const emptyListItems = editorEl.querySelectorAll('li');
      let removedCount = 0;
      emptyListItems.forEach(li => {
        const trimmedContent = li.innerHTML.trim();
        if (trimmedContent === '<br>' || trimmedContent === '') {
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
    let html = this.quill.root.innerHTML || '';
    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = '';
    }
    if (this.format === formats.html) {
      return exportHtml(html);
    }
    else if (this.format === formats.markdown) {
      let markdown = turndownService.turndown(html);
      // Trim leading/trailing whitespace only - preserve internal blank lines
      markdown = markdown.trim();
      return markdown;
    }
    else if (this.format === formats.text) {
      return text;
    }
    else if (this.format === formats.json) {
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
    let modules = {};
    try {
      if (this.modules) {
        modules = JSON.parse(this.modules);
      }
    }
    catch (_) {
      throw new Error('Cannot parse "modules" attribute');
    }
    modules = deepmerge(Quill.DEFAULTS.modules, modules, { arrayMerge: overwriteMerge });
    const customToolbarElem = this.host.querySelector('[slot="quill-toolbar"]');
    if (customToolbarElem) {
      modules['toolbar'] = customToolbarElem;
    }
    // *** Markdown Integration ***
    Quill.register('modules/QuillMarkdown', QuillMarkdown, true);
    if (this.format === formats.markdown) {
      modules.QuillMarkdown = quillMarkdownOptions;
    }
    this.quill = new Quill(this.containerElement, {
      ...Quill.DEFAULTS,
      ...{
        debug: this.debug,
        modules,
        placeholder: this.placeholder,
        theme: 'wpp',
        formats: [...Quill.DEFAULTS.formats, ...this.formats],
        bounds: this.bounds ? (this.bounds === 'self' ? this.containerElement : this.bounds) : document.body,
        strict: this.strict,
        scrollingContainer: this.scrollingContainer,
      },
    });
    const el = this.host;
    el.quill = this.quill;
    el.format = this.format;
    el.name = this.name;
    // Used in quill-upload plugin
    this.quill.editor.scroll.quill = this.quill;
    this.quill.wppRichtext = this;
    this.host.addEventListener(KEYBOARD_FOCUS_EVENT, () => {
      this.focusType = FOCUS_TYPE.TAB;
    });
    if (this.styles) {
      const styles = JSON.parse(this.styles);
      Object.keys(styles).forEach((key) => {
        this.containerElement.style.setProperty(key, styles[key]);
      });
    }
    if (this.value) {
      this.setValue(this.value);
      this.quill.history.clear();
    }
    this.updateEnteredCharacters();
    this.selectionChangeEvent = this.quill.on('selection-change', (range, oldRange, source) => {
      this.wppSelectionChange.emit({
        editor: this.quill,
        range,
        oldRange,
        source,
      });
    });
    this.host.addEventListener('focusin', this.onFocusIn);
    this.host.addEventListener('focusout', this.onFocusOut);
    this.host.addEventListener('keyup', this.onKeyUp);
    this.host.addEventListener('mousedown', this.onMouseDown);
    this.quill.root.addEventListener('keyup', this.onKeyUp);
    this.quill.root.addEventListener('blur', this.onEditorBlur);
    this.quill.root.addEventListener('focus', this.onEditorFocus);
    this.containerElement.parentElement.addEventListener('dragstart', this.onDragstart);
    this.containerElement.parentElement.addEventListener('dragend', this.onDragend);
    this.containerElement.parentElement.addEventListener('drop', this.onDrop);
    this.quill.root.addEventListener(RICHTEXT_UPLOAD_REQUEST_EVENT, e => {
      e.stopPropagation();
      e.preventDefault();
      //@ts-ignore event type
      this.wppUploadRequest.emit(e.detail);
    });
    this.formControlInput?.addEventListener('focus', () => {
      this.quill.root.focus();
    });
    autoFocusElement(this.autoFocus, this.quill.root);
    this.updateDisabled(this.disabled);
    setTimeout(() => {
      this.wppInit.emit(this.quill);
    });
    // --- TEXT CHANGE HANDLER ---
    this.quill.on('text-change', (_delta, _oldDelta, source) => {
      if (source !== 'user')
        return;
      const range = this.quill.getSelection();
      if (!range) {
        // Need to sync and emit value change on any user interaction
        // to ensure the editor is in a consistent state
        this.syncValueAndEmit(source);
        return;
      }
      const [line, offset] = this.quill.getLine(range.index);
      const text = line.domNode.textContent || '';
      // --- Heading Logic ---
      const headingMatch = text.match(/^(#{1,6})\s/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const newText = text.replace(/^(#{1,6}\s)/, '');
        const docLineStart = range.index - offset;
        this.quill.deleteText(docLineStart, text.length, 'user');
        this.quill.insertText(docLineStart, newText, 'user');
        this.quill.formatLine(docLineStart, newText.length, 'header', level, 'user');
        this.syncValueAndEmit(source);
        return;
      }
      // --- Intra -word emphasis Logic (asterisk-based only) ---
      // This regex uses negative lookbehind/lookahead to match only single asterisks:
      // eslint-disable-next-line no-useless-escape
      const italicRegex = /(?<!\*)\*([^\*\s]+?)\*(?!\*)/g;
      const italicMatches = Array.from(text.matchAll(italicRegex));
      if (italicMatches && italicMatches.length > 0) {
        const docLineStart = range.index - offset;
        // Process the matches in reverse order using forEach
        italicMatches.reverse().forEach(match => {
          // If match.index is undefined, skip processing this match
          if (match.index === undefined)
            return;
          // match[0] is the full matched string (e.g. "*b*")
          // match[1] is the captured content that should be italicized (e.g. "b")
          const content = match[1];
          const matchIndex = match.index; // relative index in the line
          const fullMatchLength = match[0].length;
          const contentLength = content.length;
          // Delete the opening marker at (docLineStart + matchIndex)
          this.quill.deleteText(docLineStart + matchIndex, 1, 'user');
          // After deletion, the closing marker shifts left by one.
          const newClosingPos = matchIndex + fullMatchLength - 2;
          this.quill.deleteText(docLineStart + newClosingPos, 1, 'user');
          // Apply italic formatting to the content that remains.
          this.quill.formatText(docLineStart + matchIndex, contentLength, 'italic', true, 'user');
        });
        // Reset italic toolbar formatting so subsequent typing is not left in italic.
        this.quill.format('italic', false, 'user');
        // Optionally, set the cursor at the end of the line.
        this.quill.setSelection(docLineStart + text.length, 0, 'user');
        this.syncValueAndEmit(source);
        return;
      }
      this.syncValueAndEmit(source);
    });
  }
  disconnectedCallback() {
    if (this.format === formats.markdown && this.quill) {
      const markdownModule = this.quill.getModule('QuillMarkdown');
      if (markdownModule && typeof markdownModule.destroy === 'function') {
        markdownModule.destroy();
      }
    }
    if (this.selectionChangeEvent) {
      this.selectionChangeEvent.removeListener('selection-change');
    }
    if (this.textChangeEvent) {
      this.textChangeEvent.removeListener('text-change');
    }
  }
  updateContent(newValue) {
    const value = this.getValue();
    this.updateEnteredCharacters();
    if (Object.values(formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const json = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== json;
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
  updateDisabled(newValue) {
    this.quill?.enable(!newValue);
    this.quill?.theme.modules.toolbar?.enable(!newValue);
    // TODO Remove when will be fixed in Quill
    if (!newValue) {
      this.quill.root.setAttribute('contenteditable', 'true');
    }
    else {
      this.quill.root.removeAttribute('contenteditable');
    }
  }
  updatePlaceholder(newValue, oldValue) {
    if (this.quill && newValue !== oldValue) {
      this.quill.root.dataset.placeholder = newValue;
    }
  }
  updateStyle(newValue, oldValue) {
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
  updateCharacterLimit() {
    this.updateEnteredCharacters();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    const rawFormat = this.host.getAttribute('format');
    if (rawFormat)
      this.format = rawFormat.replace(/^['"]|['"]$/g, '');
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, "data-testid": "wpp-rich-text" }, h("wpp-richtext-icon-loader-v3-6-0", null), h("wpp-quill-styles-v3-6-0", null), h("wpp-richtext-common-styles-v3-6-0", null), this.labelConfig?.text && (h("wpp-label-v3-6-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("div", { class: this.formControlCssClasses(), "data-testid": "rich-text-form" }, h("slot", { name: "quill-toolbar", "quill-toolbar": "" }), h("div", { ref: el => (this.containerElement = el), "data-testid": "richtext-editor" }), Boolean(this.name) && (h("input", { ref: el => (this.formControlInput = el), tabindex: "-1", id: this.name, class: "form-control-input", "data-testid": "rich-text-input", disabled: this.disabled }))), (Boolean(this.message) || Boolean(this.charactersLimit)) && (h("div", { class: this.messageCssClasses(), part: "message-wrapper" }, Boolean(this.message) && (h("wpp-inline-message-v3-6-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", class: "message", "data-testid": "message" })), Boolean(this.charactersLimit) && (h("div", { class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, h("wpp-typography-v3-6-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":\u00A0"), h("wpp-typography-v3-6-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit)))))));
  }
  static get is() { return "wpp-richtext"; }
  static get registryIs() { return "wpp-richtext-v3-6-0"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-richtext.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-richtext.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Defines the component name."
        },
        "attribute": "name",
        "reflect": true
      },
      "required": {
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
          "text": "If the component is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
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
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "autoFocus": {
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
          "text": "If `true`, should be focused on page load"
        },
        "attribute": "auto-focus",
        "reflect": false,
        "defaultValue": "false"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../wpp-label/types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "message": {
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
          "text": "Defines the component message."
        },
        "attribute": "message",
        "reflect": false
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputMessageTypes",
          "resolved": "\"error\" | \"warning\" | undefined",
          "references": {
            "InputMessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::InputMessageTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the component message type."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "maxMessageLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines a maximum length threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip."
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "charactersLimit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the character limit."
        },
        "attribute": "characters-limit",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<RichtextLocales>",
          "resolved": "{ charactersEntered?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "RichtextLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::RichtextLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for the component"
        },
        "defaultValue": "{}"
      },
      "warningThreshold": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`."
        },
        "attribute": "warning-threshold",
        "reflect": false,
        "defaultValue": "20"
      },
      "active": {
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
          "text": "If the component is active."
        },
        "attribute": "active",
        "reflect": true,
        "defaultValue": "false"
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
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::Formats"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Format of editor value\nSupported formats: `html`, `markdown`, `text`, `json`"
        },
        "attribute": "format",
        "reflect": true,
        "defaultValue": "formats.html"
      },
      "preserveWhitespace": {
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
          "tags": [{
              "name": "deprecated",
              "text": "This property is no longer needed. Whitespace preservation is now the default behavior\nfor markdown format. This property will be removed in version 5.0.0."
            }],
          "text": ""
        },
        "attribute": "preserve-whitespace",
        "reflect": false,
        "defaultValue": "true"
      },
      "bounds": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "HTMLElement | string",
          "resolved": "HTMLElement | string",
          "references": {
            "HTMLElement": {
              "location": "global",
              "id": "global::HTMLElement"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "DOM Element or a CSS selector for a DOM Element, within which the editor's ui elements (i.e. tooltips, etc.)\nshould be confined. Currently, it only considers left and right boundaries."
        },
        "attribute": "bounds",
        "reflect": true
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "RichtextValue",
          "resolved": "string",
          "references": {
            "RichtextValue": {
              "location": "import",
              "path": "./types",
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
        "reflect": false
      },
      "debug": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DebugLevels",
          "resolved": "string",
          "references": {
            "DebugLevels": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::DebugLevels"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.\nPassing false disables all messages."
        },
        "attribute": "debug",
        "reflect": false,
        "defaultValue": "debugLevels.warn"
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
          "text": "Whitelist of formats to allow in the editor.\nSee [Formats](https://quilljs.com/docs/formats/) for a complete list."
        },
        "defaultValue": "[]"
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
          "text": "Collection of modules to include and respective options.\nThe only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed (See \"Usage\" section of Notes)\nSee [Modules](https://quilljs.com/docs/modules/) for more information about the library's modules."
        },
        "attribute": "modules",
        "reflect": false
      },
      "placeholder": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Placeholder text to show when editor is empty."
        },
        "attribute": "placeholder",
        "reflect": true,
        "defaultValue": "'Insert text here...'"
      },
      "scrollingContainer": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "HTMLElement | string",
          "resolved": "HTMLElement | string",
          "references": {
            "HTMLElement": {
              "location": "global",
              "id": "global::HTMLElement"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars\n(i.e. `overflow-y: auto`), if has been changed from the default ql-editor with custom CSS.\nNecessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container\nis responsible for the scrolling."
        },
        "attribute": "scrolling-container",
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
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "enteredCharacters": {},
      "plainText": {}
    };
  }
  static get events() {
    return [{
        "method": "wppInit",
        "name": "wppInit",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Editor init event"
        },
        "complexType": {
          "original": "QuillInstance",
          "resolved": "Quill & { clipboard?: any; history?: any; editor?: any; selection?: any; theme?: any; emitter?: any; wppRichtext?: any; }",
          "references": {
            "QuillInstance": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::QuillInstance"
            }
          }
        }
      }, {
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when editor has content changes"
        },
        "complexType": {
          "original": "RichtextChangeEventDetail",
          "resolved": "RichtextChangeEventDetail",
          "references": {
            "RichtextChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::RichtextChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppSelectionChange",
        "name": "wppSelectionChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when editor has selection changes"
        },
        "complexType": {
          "original": "RichtextSelectionChangeEventDetail",
          "resolved": "RichtextSelectionChangeEventDetail",
          "references": {
            "RichtextSelectionChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::RichtextSelectionChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when editor receives focus"
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when editor looses focus"
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppUploadRequest",
        "name": "wppUploadRequest",
        "bubbles": true,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when user requests uploading of files"
        },
        "complexType": {
          "original": "RichtextUploadRequestEventDetail",
          "resolved": "UploadRequestEventDetail",
          "references": {
            "RichtextUploadRequestEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-richtext/types.ts::UploadRequestEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "updateContent"
      }, {
        "propName": "disabled",
        "methodName": "updateDisabled"
      }, {
        "propName": "placeholder",
        "methodName": "updatePlaceholder"
      }, {
        "propName": "styles",
        "methodName": "updateStyle"
      }, {
        "propName": "charactersLimit",
        "methodName": "updateCharacterLimit"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
