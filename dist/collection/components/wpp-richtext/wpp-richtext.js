import { h, Host } from '@stencil/core';
import { Editor } from '@tiptap/core';
import { FOCUS_TYPE } from '../../types/common';
import { autoFocusElement, mergeLocales, uniquePortalId } from '../../utils/utils';
import { formats, sources, debugLevels } from './types';
import { TIPTAP_UPLOAD_REQUEST_EVENT } from './tiptap-types';
import { FONT_SIZE_OPTIONS, KEYBOARD_FOCUS_CLASS, KEYBOARD_FOCUS_EVENT, LOCALES_DEFAULTS, TOOLBAR_TOGGLE_ACTIONS, } from './const';
import { normalizeEmptyParagraphs, normalizeListHtml, extractPlainText } from './utils';
import { buildTiptapExtensions, TIPTAP_DEFAULT_TOOLBAR_ALIASES } from './tiptap-config';
import { TiptapImageUpload, UploadingImage, TiptapImageActions, executeToolbarCommand, isFormatActive, } from './extensions';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
export class WppRichtext {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    // The richtext renders in the light DOM, so the message id must be unique on the page.
    this.messageId = uniquePortalId('wpp-richtext-message');
    this.linkPromptRange = null;
    /** The toolbar Link button that opened the popup; focus returns there on Escape. `null` returns it to the editor. */
    this.linkPromptReturnFocus = null;
    /** Move focus into the URL field once the edit-mode popup has rendered. */
    this.focusLinkPromptInputOnRender = false;
    this.tiptapEditor = null;
    this.initTimerId = null;
    this.savedSelectionRange = null;
    this.previousSelectionRange = null;
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
    /**
     * Close the link tooltip when clicking outside the tooltip element.
     * Mirrors original Quill behaviour where clicking anywhere outside the
     * tooltip dismisses it.
     */
    this.onDocumentMouseDown = (e) => {
      if (!this.linkPromptOpen)
        return;
      const tooltipEl = this.host.querySelector('.ql-tooltip');
      const target = e.target;
      const inside = !!(tooltipEl && target && tooltipEl.contains(target));
      if (tooltipEl && !inside) {
        this.closeLinkPrompt();
      }
    };
    /**
     * Tab from the editor moves into the open link popup. In DOM order the controls of any video embedded in the
     * content come first, which can put the popup many Tab presses away from the link it belongs to.
     */
    this.onEditorKeyDown = (event) => {
      if (event.key !== 'Tab' || event.shiftKey || !this.linkPromptOpen)
        return false;
      event.preventDefault();
      this.focusLinkPromptFirstControl();
      return true;
    };
    this.onEditorBlur = () => {
      if (this.tiptapEditor) {
        const { from, to } = this.tiptapEditor.state.selection;
        this.savedSelectionRange = { from, to, index: from, length: to - from };
      }
    };
    this.onEditorFocus = () => {
      if (this.focusType === FOCUS_TYPE.TAB && this.savedSelectionRange && this.tiptapEditor) {
        const { from, to } = this.tiptapEditor.state.selection;
        // Setting a selection drops ProseMirror's stored marks. When a keyboard user comes back from the toolbar the
        // selection never moved, and restoring it would discard the format they just toggled there (e.g. Bold).
        if (from === this.savedSelectionRange.from && to === this.savedSelectionRange.to)
          return;
        try {
          this.tiptapEditor.commands.setTextSelection(this.savedSelectionRange);
        }
        catch {
          // Selection might be out of bounds if content changed
        }
      }
    };
    this.updateEnteredCharacters = () => {
      if (this.charactersLimit && this.tiptapEditor) {
        this.enteredCharacters = this.tiptapEditor.state.doc.textContent.length;
      }
    };
    /**
     * Roving-tabindex keyboard handling for the toolbar (WAI-ARIA Toolbar
     * pattern): arrow keys move between controls, Home/End jump to the ends.
     * Enter/Space activation is handled natively by the underlying buttons.
     */
    this.onToolbarKeyDown = (event) => {
      const navKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!navKeys.includes(event.key))
        return;
      const controls = this.getToolbarControls();
      if (controls.length === 0)
        return;
      const path = typeof event.composedPath === 'function' ? event.composedPath() : [];
      const currentIndex = controls.findIndex(c => c === event.target || path.includes(c));
      const resolved = currentIndex === -1 ? this.toolbarFocusIndex : currentIndex;
      const last = controls.length - 1;
      let next = resolved;
      switch (event.key) {
        case 'ArrowRight':
          next = resolved === last ? 0 : resolved + 1;
          break;
        case 'ArrowLeft':
          next = resolved === 0 ? last : resolved - 1;
          break;
        case 'Home':
          next = 0;
          break;
        case 'End':
          next = last;
          break;
        default:
          break;
      }
      event.preventDefault();
      this.focusToolbarControl(controls, next);
    };
    this.onToolbarAction = (actionName, event) => {
      if (!this.tiptapEditor || this.disabled)
        return;
      // A click generated by Enter or Space reports `detail === 0`. Keyboard users stay on the toolbar; a pointer click
      // still hands focus to the editor so the user can carry on typing.
      const focusEditor = event?.detail !== 0;
      if (actionName === 'image' || actionName === 'video' || actionName === 'attachment') {
        // Emit the upload request — the consumer is responsible for opening
        // a file picker and calling the callback with upload items.
        // We do NOT open a file picker here to avoid double-dialog issues.
        const detail = {
          type: actionName,
          callback: items => {
            items.forEach(item => {
              if (!this.tiptapEditor)
                return;
              const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
              this.tiptapEditor.commands.insertUploadingImage(uploadId, item.file, actionName);
              item.promise
                .then(url => {
                if (!this.tiptapEditor)
                  return;
                if (actionName === 'video') {
                  // Replace the uploading placeholder with a video node
                  this.replaceUploadingNode(uploadId, () => this.tiptapEditor.state.schema.nodes.video?.create({ src: url }));
                }
                else {
                  this.tiptapEditor.commands.resolveUploadingImage(uploadId, url);
                }
              })
                .catch(() => {
                this.tiptapEditor?.commands.failUploadingImage(uploadId);
              });
            });
          },
        };
        this.wppUploadRequest.emit(detail);
        return;
      }
      if (actionName === 'link') {
        const isActiveLink = this.tiptapEditor.isActive('link');
        const { from, to } = this.tiptapEditor.state.selection;
        if (isActiveLink) {
          executeToolbarCommand(this.tiptapEditor, 'link', undefined, focusEditor);
        }
        else {
          if (from === to) {
            return;
          }
          // Save the selection range and open the inline link UI.
          this.linkPromptRange = { from, to };
          this.linkPromptValue = '';
          this.linkPromptPreviewHref = '';
          this.linkPromptMode = 'edit';
          this.linkPromptPosition = this.computeLinkPromptPosition(from, to);
          this.linkPromptReturnFocus = event?.currentTarget ?? null;
          this.focusLinkPromptInputOnRender = true;
          this.linkPromptOpen = true;
        }
        this.updateToolbarActiveFormats(this.tiptapEditor);
        return;
      }
      executeToolbarCommand(this.tiptapEditor, actionName, undefined, focusEditor);
      this.updateToolbarActiveFormats(this.tiptapEditor);
    };
    this.onFontSizeChange = (size) => {
      if (!this.tiptapEditor || this.disabled)
        return;
      this.tiptapEditor.chain().focus().run();
      executeToolbarCommand(this.tiptapEditor, 'fontSize', size || null);
      this.updateToolbarActiveFormats(this.tiptapEditor);
    };
    this.onLinkPromptInput = (event) => {
      const detail = event.detail;
      const target = event.target;
      // wpp-input emits a wppChange CustomEvent with detail.value; native input emits Event with target.value
      if (detail && typeof detail.value !== 'undefined') {
        this.linkPromptValue = detail.value ?? '';
      }
      else {
        this.linkPromptValue = target?.value ?? '';
      }
    };
    /** Switch the link tooltip from view → edit mode. */
    this.onLinkPromptEdit = () => {
      // The Edit button is replaced by the URL field, so focus has to move there rather than drop to the page.
      this.focusLinkPromptInputOnRender = true;
      this.linkPromptMode = 'edit';
    };
    /** Remove the link mark from the current range and close the tooltip. */
    this.onLinkPromptDelete = () => {
      if (!this.tiptapEditor || !this.linkPromptRange) {
        this.closeLinkPrompt();
        return;
      }
      const { from, to } = this.linkPromptRange;
      this.tiptapEditor.chain().focus().setTextSelection({ from, to }).unsetLink().run();
      this.updateToolbarActiveFormats(this.tiptapEditor);
      this.closeLinkPrompt();
    };
    this.onLinkPromptSave = () => {
      if (!this.tiptapEditor || !this.linkPromptRange) {
        this.closeLinkPrompt();
        return;
      }
      const url = this.linkPromptValue.trim();
      if (url) {
        const { from, to } = this.linkPromptRange;
        this.tiptapEditor.chain().focus().setTextSelection({ from, to }).setLink({ href: url }).run();
        this.updateToolbarActiveFormats(this.tiptapEditor);
      }
      this.closeLinkPrompt();
    };
    /** Close the popup without changing the link and return focus to where it was opened from. */
    this.onLinkPromptCancel = () => {
      const returnFocus = this.linkPromptReturnFocus;
      this.closeLinkPrompt();
      if (returnFocus?.isConnected) {
        returnFocus.focus();
      }
      else {
        this.tiptapEditor?.commands.focus();
      }
    };
    this.onLinkPromptInputKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.onLinkPromptSave();
      }
    };
    // Escape closes the popup from any of its controls, not only the URL field. Shift+Tab from its first control goes
    // back to the editor, mirroring the Tab that brought focus in.
    this.onLinkPromptKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.onLinkPromptCancel();
      }
      else if (event.key === 'Tab' && event.shiftKey) {
        const firstControl = this.linkPromptMode === 'edit' ? this.linkPromptInput : this.linkPromptPreview;
        if (firstControl && event.composedPath().includes(firstControl)) {
          event.preventDefault();
          this.tiptapEditor?.commands.focus();
        }
      }
    };
    // `wpp-menu-context` owns the menu keyboard contract for this picker: it promotes the slotted
    // options to `role="menuitem"`, attaches its own capture-phase key handling, moves focus into the
    // list on open and restores it to the trigger on Escape/Tab. Only the open state is tracked here,
    // to drive `aria-expanded` on the trigger.
    this.fontSizeDropdownConfig = {
      onShow: () => {
        this.isFontSizePickerOpen = true;
      },
      onHide: () => {
        this.isFontSizePickerOpen = false;
      },
    };
    this.hostCssClasses = () => ({
      'wpp-richtext': true,
    });
    this.formControlCssClasses = () => ({
      'ql-form-control': true,
      active: this.active,
      [KEYBOARD_FOCUS_CLASS]: this.isEditorFocused && this.focusType === FOCUS_TYPE.TAB,
      [`${this.messageType}`]: Boolean(this.messageType),
      disabled: this.disabled,
      'label-hovered': this.isLabelHovered,
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
    this.isEditorFocused = false;
    this.isLabelHovered = false;
    this.enteredCharacters = undefined;
    this.plainText = '';
    this.toolbarActiveFormats = {};
    this.parsedToolbarItems = [];
    this.toolbarFocusIndex = 0;
    this.activeFontSize = '';
    this.isFontSizePickerOpen = false;
    this.linkPromptOpen = false;
    this.linkPromptMode = 'edit';
    this.linkPromptValue = '';
    this.linkPromptPreviewHref = '';
    this.linkPromptPosition = { top: 0, left: 0, flip: false };
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
    this.debug = debugLevels.warn;
    this.value = undefined;
    this.formats = [];
    this.modules = undefined;
    this.placeholder = 'Insert text here...';
    this.scrollingContainer = undefined;
    this.strict = true;
    this.styles = '{}';
  }
  focusLinkPromptFirstControl() {
    if (this.linkPromptMode === 'edit') {
      this.linkPromptInput?.setFocus(true);
    }
    else {
      this.linkPromptPreview?.focus();
    }
  }
  syncValueAndEmit(source) {
    const newValue = this.getValue();
    if (newValue !== this.value) {
      this.value = newValue;
      if (this.formControlInput) {
        this.formControlInput.value = this.value;
      }
      if (this.format === formats.markdown) {
        this.plainText = this.tiptapEditor ? extractPlainText(this.tiptapEditor.state.doc) : '';
      }
      else {
        this.plainText = this.value || '';
      }
      this.wppChange.emit({
        value: this.value,
        plainText: this.plainText,
        editor: this.tiptapEditor,
        source,
        name: this.name,
      });
    }
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
      const str = String(value || '');
      this.plainText = '';
      // `MarkdownManager.parse('')` produces `{ type: 'doc', content: [] }`
      // which violates the ProseMirror schema and causes `setContent` to
      // silently keep the previous document. Route empties through the
      // plain content path so the editor actually clears.
      if (!str) {
        this.tiptapEditor.commands.setContent('', noEmitOpts);
      }
      else {
        this.tiptapEditor.commands.setContent(str, { ...noEmitPreserveOpts, contentType: 'markdown' });
      }
      this.plainText = extractPlainText(this.tiptapEditor.state.doc);
    }
    else if (this.format === formats.text) {
      // For plain text, wrap in a paragraph
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
    // Only treat the canonical empty document (a single empty paragraph) as
    // empty. Tiptap's `editor.isEmpty` returns `true` for any doc whose
    // textContent is empty — including `<ul><li><p></p></li></ul>` after
    // toggling a list on a blank editor — which used to silently erase the
    // list markup from the emitted value. Pavlo's QA expects an empty list
    // to round-trip as the literal `<ol><li><br></li></ol>` /
    // `<ul><li><br></li></ul>` so the value matches the production Quill
    // editor's behaviour.
    const doc = this.tiptapEditor.state.doc;
    const isCanonicalEmpty = doc.childCount === 1 && doc.firstChild?.type.name === 'paragraph' && doc.firstChild.content.size === 0;
    if (isCanonicalEmpty) {
      return '';
    }
    if (this.format === formats.html) {
      return normalizeListHtml(html);
    }
    else if (this.format === formats.markdown) {
      return this.tiptapEditor.getMarkdown();
    }
    else if (this.format === formats.text) {
      return text;
    }
    else if (this.format === formats.json) {
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
  /**
   * Internal logger gated by the `debug` prop. Mirrors the verbosity ordering
   * Quill used so consumers that previously set `debug="info"` still see the
   * full stream of internal messages, while the default `warn` keeps the
   * console quiet for production usage.
   *
   * Order (most → least verbose): `info` > `log` > `warn` > `error`. A message
   * is printed only when its severity is at or below the configured level.
   */
  debugLog(level, ...args) {
    const order = [debugLevels.error, debugLevels.warn, debugLevels.log, debugLevels.info];
    const allowed = order.indexOf(this.debug);
    const requested = order.indexOf(level);
    if (allowed < 0 || requested < 0 || requested > allowed)
      return;
    console[level](`[wpp-richtext]`, ...args);
  }
  componentDidLoad() {
    let _parsedModules = {};
    try {
      if (this.modules) {
        _parsedModules = JSON.parse(this.modules);
      }
    }
    catch (err) {
      this.debugLog(debugLevels.error, 'failed to parse "modules" attribute', err);
      throw new Error('Cannot parse "modules" attribute');
    }
    // Build extensions from configuration
    const extensions = [
      ...buildTiptapExtensions({
        formats: this.formats,
        placeholder: this.placeholder,
        charactersLimit: this.charactersLimit,
      }),
      // Custom extensions
      UploadingImage,
      TiptapImageUpload,
      TiptapImageActions,
    ];
    // Only add upload extensions if modules enable them
    // (They are always registered but only activate on paste/drop)
    this.tiptapEditor = new Editor({
      element: this.containerElement,
      extensions,
      content: '',
      editable: !this.disabled,
      autofocus: this.autoFocus ? 'end' : false,
      injectCSS: false,
      editorProps: {
        handleKeyDown: (_view, event) => this.onEditorKeyDown(event),
      },
      onCreate: () => {
        // no-op; link detection is handled in onSelectionUpdate
      },
      onUpdate: ({ editor: _updateEditor, transaction }) => {
        if (transaction.docChanged) {
          this.updateEnteredCharacters();
          this.updateToolbarActiveFormats(_updateEditor);
          // Never emit the value while upload placeholders exist in the doc.
          // The uploadingImage node's renderHTML produces raw preview markup
          // (e.g. <video> without controls) that downstream consumers
          // (wpp-richtext-view) would parse incorrectly. Wait until all
          // uploads resolve/fail before syncing the value.
          let hasUploadingNodes = false;
          _updateEditor.state.doc.descendants(node => {
            if (node.type.name === 'uploadingImage') {
              hasUploadingNodes = true;
            }
            return !hasUploadingNodes; // short-circuit
          });
          if (hasUploadingNodes)
            return;
          this.syncValueAndEmit(sources.user);
        }
      },
      onSelectionUpdate: ({ editor }) => {
        const { from, to } = editor.state.selection;
        this.updateToolbarActiveFormats(editor);
        // Quill behaviour: on cursor placement (collapsed selection, user action),
        // detect if the cursor is inside a link. If so, show view-mode tooltip.
        // Otherwise close any open tooltip.
        this.handleSelectionLinkDetection(editor, from, to);
        this.wppSelectionChange.emit({
          editor,
          range: { from, to, index: from, length: to - from },
          oldRange: this.previousSelectionRange,
          source: sources.user,
        });
        this.previousSelectionRange = { from, to, index: from, length: to - from };
      },
      onFocus: ({ event: _event }) => {
        this.isEditorFocused = true;
        this.onEditorFocus();
      },
      onBlur: ({ event: _event }) => {
        this.isEditorFocused = false;
        this.onEditorBlur();
      },
    });
    const el = this.host;
    el.editor = this.tiptapEditor;
    el.format = this.format;
    el.name = this.name;
    // Expose the contenteditable region as a labelled multiline textbox so
    // assistive tech announces it as an editable field (WCAG 4.1.2, 1.3.1).
    // The host-level aria-* attributes never cross the shadow boundary onto
    // the real editing surface, so they must be forwarded here.
    const editorDom = this.tiptapEditor.view?.dom;
    if (editorDom) {
      editorDom.setAttribute('role', 'textbox');
      editorDom.setAttribute('aria-multiline', 'true');
    }
    this.syncEditorAria();
    this.host.addEventListener(KEYBOARD_FOCUS_EVENT, () => {
      this.focusType = FOCUS_TYPE.TAB;
    });
    if (this.styles) {
      try {
        const styles = JSON.parse(this.styles);
        Object.keys(styles).forEach((key) => {
          this.containerElement.style.setProperty(key, styles[key]);
        });
      }
      catch {
        // styles parse error — ignore
      }
    }
    if (this.value) {
      this.setValue(this.value);
      // Clear undo history so initial setValue is not undoable
      // Tiptap v3 has no clearHistory command; dispatch a fresh historyless state
      const { tr } = this.tiptapEditor.state;
      tr.setMeta('addToHistory', false);
      this.tiptapEditor.view.dispatch(tr);
    }
    this.updateEnteredCharacters();
    this.host.addEventListener('focusin', this.onFocusIn);
    this.host.addEventListener('focusout', this.onFocusOut);
    this.host.addEventListener('keyup', this.onKeyUp);
    this.host.addEventListener('mousedown', this.onMouseDown);
    // Close the link tooltip when clicking outside the tooltip element.
    document.addEventListener('mousedown', this.onDocumentMouseDown);
    // Listen for upload request events from the upload plugin
    this.host.addEventListener(TIPTAP_UPLOAD_REQUEST_EVENT, ((e) => {
      e.stopPropagation();
      e.preventDefault();
      this.wppUploadRequest.emit(e.detail);
    }));
    this.formControlInput?.addEventListener('focus', () => {
      this.tiptapEditor?.commands.focus();
    });
    if (this.autoFocus && this.tiptapEditor.view?.dom) {
      autoFocusElement(this.autoFocus, this.tiptapEditor.view.dom);
    }
    this.updateDisabled(this.disabled);
    this.initTimerId = setTimeout(() => {
      this.wppInit.emit(this.tiptapEditor);
      this.debugLog(debugLevels.info, 'editor initialised', {
        format: this.format,
        formats: this.formats,
        disabled: this.disabled,
      });
      this.initTimerId = null;
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.initTimerId !== null) {
      clearTimeout(this.initTimerId);
      this.initTimerId = null;
    }
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
    this.tiptapEditor?.destroy();
    this.tiptapEditor = null;
  }
  get _locales() {
    const merged = mergeLocales(LOCALES_DEFAULTS, this.locales);
    // `mergeLocales` is a shallow merge, so a consumer overriding a single
    // toolbar action label would otherwise drop every default. Deep-merge the
    // `toolbarActions` map so partial overrides keep the remaining defaults.
    return {
      ...merged,
      toolbarActions: { ...LOCALES_DEFAULTS.toolbarActions, ...(this.locales?.toolbarActions ?? {}) },
    };
  }
  /**
   * Keep the ARIA state of the contenteditable editing surface in sync with
   * the component props. Runs after each render so external prop changes
   * (required/messageType/message/label/disabled/placeholder) are reflected onto the
   * real inner control.
   */
  syncEditorAria() {
    const dom = this.tiptapEditor?.view?.dom;
    if (!dom)
      return;
    const accessibleName = this.labelConfig?.text || this.placeholder || this._locales.editorLabel;
    dom.setAttribute('aria-label', accessibleName);
    if (this.required) {
      dom.setAttribute('aria-required', 'true');
    }
    else {
      dom.removeAttribute('aria-required');
    }
    if (this.messageType === 'error') {
      dom.setAttribute('aria-invalid', 'true');
    }
    else {
      dom.removeAttribute('aria-invalid');
    }
    if (this.message) {
      dom.setAttribute('aria-describedby', this.messageId);
    }
    else {
      dom.removeAttribute('aria-describedby');
    }
    if (this.disabled) {
      dom.setAttribute('aria-disabled', 'true');
    }
    else {
      dom.removeAttribute('aria-disabled');
    }
  }
  componentDidRender() {
    this.syncEditorAria();
    if (this.focusLinkPromptInputOnRender && this.linkPromptInput) {
      this.focusLinkPromptInputOnRender = false;
      // The user did not click the field, so draw its focus ring to show where focus went.
      this.linkPromptInput.setFocus(true);
    }
  }
  /**
   * Human-readable accessible name for an icon-only toolbar button, sourced
   * from the merged locales so it stays translatable (WCAG 4.1.2 / 2.4.6).
   */
  getToolbarActionLabel(actionName) {
    return this._locales.toolbarActions[actionName] || actionName;
  }
  /** Enabled, focusable toolbar controls in DOM (visual) order. */
  getToolbarControls() {
    if (!this.toolbarElement)
      return [];
    return Array.from(this.toolbarElement.querySelectorAll('button.ql-toolbar-btn, .ql-size-trigger')).filter(el => !el.disabled && el.getAttribute('aria-disabled') !== 'true');
  }
  focusToolbarControl(controls, index) {
    const control = controls[index];
    if (!control)
      return;
    this.toolbarFocusIndex = index;
    const focusable = control;
    if (typeof focusable.setFocus === 'function') {
      focusable.setFocus();
    }
    else {
      control.focus();
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
    this.tiptapEditor?.setEditable(!newValue);
  }
  updatePlaceholder(newValue, oldValue) {
    if (this.tiptapEditor && newValue !== oldValue) {
      // Tiptap updates placeholder via extension configuration
      // We need to destroy and recreate placeholder extension, or update the DOM directly
      const editorDom = this.tiptapEditor.view?.dom;
      if (editorDom) {
        editorDom.setAttribute('data-placeholder', newValue);
      }
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
  componentWillLoad() {
    const rawFormat = this.host.getAttribute('format');
    if (rawFormat)
      this.format = rawFormat.replace(/^['"]|['"]$/g, '');
    this.buildToolbarConfig();
  }
  updateToolbarActiveFormats(editor) {
    const formatNames = [
      'bold',
      'italic',
      'underline',
      'strike',
      'heading1',
      'heading2',
      'blockquote',
      'codeBlock',
      'orderedList',
      'bulletList',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'alignJustify',
      'link',
    ];
    const next = {};
    for (const name of formatNames) {
      next[name] = isFormatActive(editor, name);
    }
    this.toolbarActiveFormats = next;
    // Track active font size for the picker
    const sizes = ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
    let activeSize = '';
    for (const size of sizes) {
      if (editor.isActive('fontSize', { size })) {
        activeSize = size;
        break;
      }
    }
    this.activeFontSize = activeSize;
  }
  buildToolbarConfig() {
    let _parsedModules = {};
    try {
      if (this.modules) {
        _parsedModules = JSON.parse(this.modules);
      }
    }
    catch {
      // fallback — use defaults
    }
    const toolbarConfig = (_parsedModules.toolbar || {});
    const aliases = {
      ...TIPTAP_DEFAULT_TOOLBAR_ALIASES,
      ...(toolbarConfig.aliases || {}),
    };
    // Default toolbar groups in order
    const defaultContainer = ['size', 'fontStyle', 'textBlocks', 'lists', 'align', 'embed', 'undo'];
    // If the modules contain a container array, use it; otherwise use defaults
    const container = toolbarConfig.container || defaultContainer;
    const groups = [];
    for (const item of container) {
      if (aliases[item]) {
        groups.push(aliases[item]);
      }
      else {
        groups.push([item]);
      }
    }
    this.parsedToolbarItems = groups;
    // Reset the roving focus to the first control whenever the toolbar layout
    // changes so exactly one control always keeps tabindex=0 (a stale index
    // past the new length would leave the toolbar unreachable by Tab).
    this.toolbarFocusIndex = 0;
  }
  /**
   * Replace an uploadingImage placeholder node with an arbitrary node (e.g. video).
   * Used when `resolveUploadingImage` is not appropriate because the replacement
   * is not a standard image node.
   */
  replaceUploadingNode(uploadId, createNode) {
    const editor = this.tiptapEditor;
    if (!editor)
      return;
    const { state } = editor;
    const { tr } = state;
    let found = false;
    state.doc.descendants((node, pos) => {
      if (found)
        return false; // stop after first match
      if (node.type.name === 'uploadingImage' && node.attrs.uploadId === uploadId) {
        const replacement = createNode();
        if (replacement) {
          tr.replaceWith(pos, pos + node.nodeSize, replacement);
          // Suppress undo entry — the upload resolution is not user-editable
          tr.setMeta('addToHistory', false);
          found = true;
        }
      }
    });
    if (found) {
      editor.view.dispatch(tr);
    }
  }
  getToolbarButtonIcon(actionName) {
    const iconMap = {
      bold: 'bold',
      italic: 'italic',
      underline: 'underline',
      strike: 'strike-through',
      codeBlock: 'code-view',
      blockquote: 'blockquote',
      orderedList: 'ordered-list',
      bulletList: 'unordered-list',
      outdent: 'indent-decrease',
      indent: 'indent-increase',
      heading1: 'h1',
      heading2: 'h2',
      alignLeft: 'text-alignment-left',
      alignCenter: 'text-alignment-center',
      alignRight: 'text-alignment-right',
      alignJustify: 'text-alignment-justify',
      link: 'link',
      image: 'image',
      video: 'video-clip',
      attachment: 'attach',
      undo: 'undo',
      redo: 'redo',
    };
    return iconMap[actionName] || actionName;
  }
  renderToolbarIcon(actionName) {
    const iconProps = { size: 'm', color: 'inherit' };
    switch (actionName) {
      case 'bold':
        return h("wpp-icon-bold-v4-7-0", { ...iconProps });
      case 'italic':
        return h("wpp-icon-italic-v4-7-0", { ...iconProps });
      case 'underline':
        return h("wpp-icon-underline-v4-7-0", { ...iconProps });
      case 'strike':
        return h("wpp-icon-strike-through-v4-7-0", { ...iconProps });
      case 'codeBlock':
        return h("wpp-icon-code-view-v4-7-0", { ...iconProps });
      case 'blockquote':
        return h("wpp-icon-blockquote-v4-7-0", { ...iconProps });
      case 'orderedList':
        return h("wpp-icon-ordered-list-v4-7-0", { ...iconProps });
      case 'bulletList':
        return h("wpp-icon-unordered-list-v4-7-0", { ...iconProps });
      case 'outdent':
        return h("wpp-icon-indent-decrease-v4-7-0", { ...iconProps });
      case 'indent':
        return h("wpp-icon-indent-increase-v4-7-0", { ...iconProps });
      case 'heading1':
        return h("wpp-icon-h1-v4-7-0", { ...iconProps });
      case 'heading2':
        return h("wpp-icon-h2-v4-7-0", { ...iconProps });
      case 'alignLeft':
        return h("wpp-icon-text-alignment-left-v4-7-0", { ...iconProps });
      case 'alignCenter':
        return h("wpp-icon-text-alignment-center-v4-7-0", { ...iconProps });
      case 'alignRight':
        return h("wpp-icon-text-alignment-right-v4-7-0", { ...iconProps });
      case 'alignJustify':
        return h("wpp-icon-text-alignment-justify-v4-7-0", { ...iconProps });
      case 'link':
        return h("wpp-icon-link-v4-7-0", { ...iconProps });
      case 'image':
        return h("wpp-icon-image-v4-7-0", { ...iconProps });
      case 'video':
        return h("wpp-icon-video-clip-v4-7-0", { ...iconProps });
      case 'attachment':
        return h("wpp-icon-attach-v4-7-0", { ...iconProps });
      case 'undo':
        return h("wpp-icon-undo-v4-7-0", { ...iconProps });
      case 'redo':
        return h("wpp-icon-redo-v4-7-0", { ...iconProps });
      default:
        return null;
    }
  }
  /**
   * Called on every selection update. Mirrors Quill's SELECTION_CHANGE handler:
   * when the cursor (collapsed, length=0) lands on a link, show the view-mode
   * tooltip; otherwise close it.
   */
  handleSelectionLinkDetection(editor, from, to) {
    // While the user is actively editing a link URL, don't interfere.
    if (this.linkPromptOpen && this.linkPromptMode === 'edit') {
      return;
    }
    // Only show for collapsed cursor (no range selected)
    if (from !== to) {
      if (this.linkPromptOpen) {
        this.closeLinkPrompt();
      }
      return;
    }
    const linkMarkType = editor.schema.marks.link;
    if (!linkMarkType)
      return;
    // Check if the cursor is inside a link mark
    const $pos = editor.state.doc.resolve(from);
    const marks = $pos.marks();
    const linkMark = marks.find(m => m.type === linkMarkType);
    if (linkMark) {
      // Cursor is on a link — find the range and show view tooltip
      const linkRange = this.findMarkRange(from, linkMarkType);
      if (!linkRange) {
        return;
      }
      const href = linkMark.attrs?.href ?? '';
      this.linkPromptRange = linkRange;
      this.linkPromptValue = href;
      this.linkPromptPreviewHref = href;
      this.linkPromptMode = 'view';
      this.linkPromptPosition = this.computeLinkPromptPosition(linkRange.from, linkRange.to);
      this.linkPromptOpen = true;
    }
    else {
      // Cursor is NOT on a link — close the tooltip
      if (this.linkPromptOpen) {
        this.closeLinkPrompt();
      }
    }
  }
  /**
   * Find the contiguous range around `pos` where the given mark type is active.
   */
  findMarkRange(pos, markType) {
    const editor = this.tiptapEditor;
    if (!editor)
      return null;
    const { doc } = editor.state;
    const $pos = doc.resolve(pos);
    const node = $pos.parent;
    const startOfNode = $pos.start();
    const endOfNode = $pos.end();
    const offset = $pos.parentOffset;
    let from = startOfNode + offset;
    let to = startOfNode + offset;
    let foundFrom = false;
    let foundTo = false;
    node.forEach((child, childOffset) => {
      const childFrom = startOfNode + childOffset;
      const childTo = childFrom + child.nodeSize;
      if (child.marks.some(m => m.type === markType)) {
        if (childFrom <= pos && pos <= childTo) {
          from = childFrom;
          to = childTo;
          foundFrom = true;
          foundTo = true;
        }
      }
    });
    if (!foundFrom || !foundTo)
      return null;
    if (from < startOfNode)
      from = startOfNode;
    if (to > endOfNode)
      to = endOfNode;
    return { from, to };
  }
  closeLinkPrompt() {
    this.linkPromptOpen = false;
    this.linkPromptMode = 'edit';
    this.linkPromptValue = '';
    this.linkPromptPreviewHref = '';
    this.linkPromptRange = null;
    this.linkPromptReturnFocus = null;
    this.focusLinkPromptInputOnRender = false;
  }
  /**
   * Compute the screen-relative position for the link tooltip, anchoring it
   * just below the start of the selection. Mirrors the behaviour of the
   * production Quill `.ql-tooltip` placement logic.
   */
  computeLinkPromptPosition(from, to) {
    const editor = this.tiptapEditor;
    if (!editor || !this.containerElement) {
      return { top: 0, left: 0, flip: false };
    }
    try {
      // The tooltip is `position: absolute` inside `.ql-form-control`
      // (its nearest positioned ancestor — see wpp-richtext.scss).
      // We must therefore compute `top` / `left` relative to that
      // wrapper, NOT relative to `.tiptap-editor-container`. Using the
      // editor container as the reference would shift the tooltip up by
      // the toolbar's height, making it overlap the selected text /
      // toolbar instead of sitting just below the selection.
      const startCoords = editor.view.coordsAtPos(from);
      const endCoords = editor.view.coordsAtPos(to);
      const positionedParent = this.containerElement.parentElement ?? this.containerElement;
      const parentRect = positionedParent.getBoundingClientRect();
      const tooltipHeight = 64; // approx; used only for flip heuristic
      // Anchor below the bottom of the line containing the END of the
      // selection so multi-line selections still place the tooltip below
      // the selected range. For collapsed selections from === to, so
      // this collapses to the cursor's line.
      const anchorBottom = Math.max(startCoords.bottom, endCoords.bottom);
      const anchorTop = Math.min(startCoords.top, endCoords.top);
      const top = anchorBottom - parentRect.top;
      const left = Math.max(0, startCoords.left - parentRect.left);
      const flip = anchorBottom + tooltipHeight > window.innerHeight;
      return { top: flip ? anchorTop - parentRect.top - tooltipHeight : top, left, flip };
    }
    catch {
      return { top: 0, left: 0, flip: false };
    }
  }
  renderFontSizePicker(itemIndex = 0) {
    const currentLabel = FONT_SIZE_OPTIONS.find(s => s.value === this.activeFontSize)?.label || 'S';
    return (h("wpp-menu-context-v4-7-0", { class: "ql-size-menu", dropdownConfig: this.fontSizeDropdownConfig, "data-testid": "font-size-picker" }, h("wpp-action-button-v4-7-0", { slot: "trigger-element", variant: "secondary", class: "ql-size-trigger", disabled: this.disabled, ariaProps: {
        // The name has to contain the visible size (WCAG 2.5.3 Label in Name), not only "Font size".
        label: `${this._locales.fontSizeLabel} ${currentLabel}`,
        haspopup: 'menu',
        expanded: this.isFontSizePickerOpen,
        tabIndex: !this.disabled && itemIndex === this.toolbarFocusIndex ? 0 : -1,
      } }, currentLabel, h("wpp-icon-chevron-v4-7-0", { slot: "icon-end", direction: this.isFontSizePickerOpen ? 'up' : 'down', size: "s" })), h("div", { role: "none" }, FONT_SIZE_OPTIONS.map(s => (h("wpp-list-item-v4-7-0", { class: "ql-size-option", checked: this.activeFontSize === s.value, onWppChangeListItem: () => this.onFontSizeChange(s.value) }, h("span", { slot: "label" }, s.label)))))));
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, "data-testid": "wpp-rich-text" }, h("wpp-richtext-icon-loader-v4-7-0", null), h("wpp-richtext-common-styles-v4-7-0", null), this.labelConfig?.text && (h("wpp-label-v4-7-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label", onMouseEnter: () => (this.isLabelHovered = !this.disabled), onMouseLeave: () => (this.isLabelHovered = false) })), h("div", { class: this.formControlCssClasses(), "data-testid": "rich-text-form" }, h("slot", { name: "editor-toolbar" }, this.parsedToolbarItems.length > 0 && (h("div", { class: "ql-toolbar ql-wpp", role: "toolbar", "aria-label": this._locales.toolbarLabel, "aria-disabled": this.disabled ? 'true' : undefined, ref: el => (this.toolbarElement = el), onKeyDown: this.onToolbarKeyDown }, (() => {
      // Flat, cross-group index used to drive the roving tabindex so
      // exactly one control is tabbable regardless of grouping.
      let flatIndex = -1;
      return this.parsedToolbarItems.map(group => {
        if (group.length === 0)
          return null;
        return (h("span", { class: "ql-formats" }, group.map(actionName => {
          flatIndex += 1;
          const itemIndex = flatIndex;
          if (actionName === 'fontSize') {
            return this.renderFontSizePicker(itemIndex);
          }
          const isActive = this.toolbarActiveFormats[actionName] || false;
          const cssClass = `ql-toolbar-btn ql-${actionName}${isActive ? ' ql-active' : ''}`;
          const isToggle = TOOLBAR_TOGGLE_ACTIONS.has(actionName);
          return (h("button", { type: "button", class: cssClass, tabindex: !this.disabled && itemIndex === this.toolbarFocusIndex ? 0 : -1, "aria-label": this.getToolbarActionLabel(actionName), "aria-pressed": isToggle ? String(isActive) : undefined, onClick: (event) => this.onToolbarAction(actionName, event), disabled: this.disabled }, this.renderToolbarIcon(actionName)));
        })));
      });
    })()))), h("div", { key: "tiptap-editor-container", ref: el => (this.containerElement = el), class: "tiptap-editor-container", "data-testid": "richtext-editor" }), this.linkPromptOpen && (h("div", { key: "link-tooltip", class: 'ql-tooltip' +
        (this.linkPromptMode === 'edit' ? ' ql-editing' : '') +
        (this.linkPromptPosition.flip ? ' ql-flip' : ''), "data-mode": this.linkPromptMode === 'edit' ? 'link' : undefined, "data-testid": "richtext-link-prompt", onKeyDown: this.onLinkPromptKeyDown, style: { top: `${this.linkPromptPosition.top}px`, left: `${this.linkPromptPosition.left}px` } }, h("div", { class: "ql-tooltip-wrapper" }, this.linkPromptMode === 'edit'
      ? [
        h("wpp-input-v4-7-0", { key: "link-input", ref: el => (this.linkPromptInput = el), size: "s", type: "text", placeholder: "https://", value: this.linkPromptValue, ariaProps: { label: this._locales.linkUrlLabel }, onWppChange: this.onLinkPromptInput, onKeyDown: this.onLinkPromptInputKeyDown, "data-testid": "richtext-link-prompt-input" }),
        h("wpp-action-button-v4-7-0", { key: "link-save", class: "ql-action ql-save", variant: "primary", onClick: this.onLinkPromptSave, "data-testid": "richtext-link-prompt-save" }, "Save"),
      ]
      : [
        h("a", { key: "link-preview", ref: el => (this.linkPromptPreview = el), class: "ql-preview", rel: "noopener noreferrer", target: "_blank", href: this.linkPromptPreviewHref || 'about:blank', "data-testid": "richtext-link-prompt-preview" }, this.linkPromptPreviewHref),
        h("div", { key: "link-action-buttons", class: "ql-action-buttons" }, h("wpp-action-button-v4-7-0", { class: "ql-action ql-edit", variant: "primary", onClick: this.onLinkPromptEdit, "data-testid": "richtext-link-prompt-edit" }, "Edit"), h("wpp-action-button-v4-7-0", { class: "ql-delete", variant: "destructive", onClick: this.onLinkPromptDelete, "data-testid": "richtext-link-prompt-delete" }, "Delete")),
      ]))), h("img", { class: "image-actions__proxy-image", style: { display: 'none' } }), Boolean(this.name) && (h("input", { ref: el => (this.formControlInput = el), tabindex: "-1", id: this.name, class: "form-control-input", "data-testid": "rich-text-input", disabled: this.disabled }))), (Boolean(this.message) || Boolean(this.charactersLimit)) && (h("div", { class: this.messageCssClasses(), part: "message-wrapper" }, Boolean(this.message) && (h("wpp-inline-message-v4-7-0", { id: this.messageId, message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", class: "message", "data-testid": "message" })), Boolean(this.charactersLimit) && (h("div", { class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, h("wpp-typography-v4-7-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":\u00A0"), h("wpp-typography-v4-7-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit)))))));
  }
  static get is() { return "wpp-richtext"; }
  static get registryIs() { return "wpp-richtext-v4-7-0"; }
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
          "resolved": "{ charactersEntered?: string | undefined; toolbarLabel?: string | undefined; fontSizeLabel?: string | undefined; linkUrlLabel?: string | undefined; editorLabel?: string | undefined; toolbarActions?: Record<string, string> | undefined; }",
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
              "text": "This property is no longer needed. Whitespace preservation is now the default behavior\nfor markdown format.This property will be removed in version 5.0.0."
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
      "debug": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "DebugLevels",
          "resolved": "\"error\" | \"info\" | \"log\" | \"warn\"",
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
          "text": "Debug level: `error`, `warn`, `log`, or `info`. Controls verbosity of the\ncomponent's internal console output (errors, warnings, init / state logs).\nDefaults to `warn` to match the previous Quill-based behaviour. Setting a\nhigher level (e.g. `info`) is useful while diagnosing integration issues."
        },
        "attribute": "debug",
        "reflect": false,
        "defaultValue": "debugLevels.warn"
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
          "text": "Whitelist of formats to allow in the editor.\nSee Tiptap extensions documentation for available formats."
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
          "text": "Collection of modules to include and respective options.\nThe only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed"
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
          "text": "DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars\n(i.e. `overflow-y: auto`), if has been changed from the default editor container with custom CSS."
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
      "isEditorFocused": {},
      "isLabelHovered": {},
      "enteredCharacters": {},
      "plainText": {},
      "toolbarActiveFormats": {},
      "parsedToolbarItems": {},
      "toolbarFocusIndex": {},
      "activeFontSize": {},
      "isFontSizePickerOpen": {},
      "linkPromptOpen": {},
      "linkPromptMode": {},
      "linkPromptValue": {},
      "linkPromptPreviewHref": {},
      "linkPromptPosition": {}
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
          "text": "Editor init event.\nEmits the Tiptap Editor instance (previously emitted Quill instance)."
        },
        "complexType": {
          "original": "Editor",
          "resolved": "Editor",
          "references": {
            "Editor": {
              "location": "import",
              "path": "@tiptap/core",
              "id": "../../node_modules/@tiptap/core/dist/index.d.ts::Editor"
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
          "original": "TiptapChangeEventDetail",
          "resolved": "TiptapChangeEventDetail",
          "references": {
            "TiptapChangeEventDetail": {
              "location": "import",
              "path": "./tiptap-types",
              "id": "src/components/wpp-richtext/tiptap-types.ts::TiptapChangeEventDetail"
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
          "original": "TiptapSelectionChangeEventDetail",
          "resolved": "TiptapSelectionChangeEventDetail",
          "references": {
            "TiptapSelectionChangeEventDetail": {
              "location": "import",
              "path": "./tiptap-types",
              "id": "src/components/wpp-richtext/tiptap-types.ts::TiptapSelectionChangeEventDetail"
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
          "original": "TiptapUploadRequestEventDetail",
          "resolved": "TiptapUploadRequestEventDetail",
          "references": {
            "TiptapUploadRequestEventDetail": {
              "location": "import",
              "path": "./tiptap-types",
              "id": "src/components/wpp-richtext/tiptap-types.ts::TiptapUploadRequestEventDetail"
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
      }];
  }
}
