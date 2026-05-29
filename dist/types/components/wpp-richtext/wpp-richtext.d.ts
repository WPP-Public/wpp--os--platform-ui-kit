import { EventEmitter } from '../../stencil-public-runtime';
import { Editor } from '@tiptap/core';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { LabelConfig } from '../wpp-label/types';
import { BaseComponent } from '../../interfaces/base-component';
import { Formats, RichtextLocales, RichtextValue, DebugLevels } from './types';
import type { TiptapChangeEventDetail, TiptapSelectionChangeEventDetail, TiptapUploadRequestEventDetail } from './tiptap-types';
export declare class WppRichtext implements BaseComponent {
  private _locales;
  private themeSubscription;
  host: HTMLWppRichtextElement;
  focusType: FOCUS_TYPE;
  private enteredCharacters;
  plainText: string;
  private toolbarActiveFormats;
  private parsedToolbarItems;
  private activeFontSize;
  private isFontSizePickerOpen;
  private linkPromptOpen;
  private linkPromptMode;
  private linkPromptValue;
  private linkPromptPreviewHref;
  private linkPromptPosition;
  private linkPromptRange;
  /**
   * Defines the component name.
   */
  readonly name?: string;
  /**
   * If the component is required.
   */
  readonly required: boolean;
  /**
   * If the component is disabled.
   */
  disabled: boolean;
  /**
   * If `true`, should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: LabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Defines the component message.
   */
  readonly message?: string;
  /**
   * Defines the component message type.
   */
  readonly messageType?: InputMessageTypes;
  /**
   * Defines a maximum length threshold warning/error messages. Once a message exceeds `maxMessageLength`, it will be truncated, with the full message shown in a tooltip.
   */
  readonly maxMessageLength?: number;
  /**
   * Defines the character limit.
   */
  readonly charactersLimit?: number;
  /**
   * Indicates locales for the component
   */
  readonly locales: Partial<RichtextLocales>;
  /**
   * Defines a char threshold after which users are notified that they are about to exceed `charactersLimit`.
   */
  readonly warningThreshold: number;
  /**
   * If the component is active.
   */
  active: boolean;
  /**
   * Format of editor value
   * Supported formats: `html`, `markdown`, `text`, `json`
   */
  format: Formats;
  /**
   * @deprecated This property is no longer needed. Whitespace preservation is now the default behavior
   * for markdown format.This property will be removed in version 5.0.0.
   */
  readonly preserveWhitespace: boolean;
  /**
   * DOM Element or a CSS selector for a DOM Element, within which the editor's ui elements (i.e. tooltips, etc.)
   * should be confined. Currently, it only considers left and right boundaries.
   */
  bounds: HTMLElement | string;
  /**
   * Debug level: `error`, `warn`, `log`, or `info`. Controls verbosity of the
   * component's internal console output (errors, warnings, init / state logs).
   * Defaults to `warn` to match the previous Quill-based behaviour. Setting a
   * higher level (e.g. `info`) is useful while diagnosing integration issues.
   */
  debug: DebugLevels;
  /**
   * Editor value
   */
  value: RichtextValue;
  /**
   * Whitelist of formats to allow in the editor.
   * See Tiptap extensions documentation for available formats.
   */
  readonly formats: string[];
  /**
   * Collection of modules to include and respective options.
   * The only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed
   */
  modules?: string;
  /**
   * Placeholder text to show when editor is empty.
   */
  placeholder: string;
  /**
   * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars
   * (i.e. `overflow-y: auto`), if has been changed from the default editor container with custom CSS.
   */
  readonly scrollingContainer: HTMLElement | string;
  /**
   * Use strict comparison for objects.
   */
  readonly strict: boolean;
  /**
   * Inline styles for editor, in a JSON format
   */
  styles?: string;
  /**
   * Editor init event.
   * Emits the Tiptap Editor instance (previously emitted Quill instance).
   */
  readonly wppInit: EventEmitter<Editor>;
  /**
   * Emitted when editor has content changes
   */
  readonly wppChange: EventEmitter<TiptapChangeEventDetail>;
  /**
   * Emitted when editor has selection changes
   */
  readonly wppSelectionChange: EventEmitter<TiptapSelectionChangeEventDetail>;
  /**
   * Emitted when editor receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when editor looses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when user requests uploading of files
   */
  readonly wppUploadRequest: EventEmitter<TiptapUploadRequestEventDetail>;
  private tiptapEditor;
  private initTimerId;
  containerElement?: HTMLDivElement | HTMLPreElement;
  formControlInput?: HTMLInputElement;
  private savedSelectionRange;
  private previousSelectionRange;
  private onFocusIn;
  private onFocusOut;
  private onKeyUp;
  private onMouseDown;
  /**
   * Close the link tooltip when clicking outside the tooltip element.
   * Mirrors original Quill behaviour where clicking anywhere outside the
   * tooltip dismisses it.
   */
  private onDocumentMouseDown;
  private onEditorBlur;
  private onEditorFocus;
  private updateEnteredCharacters;
  private syncValueAndEmit;
  setValue(value: RichtextValue): void;
  getValue(): RichtextValue;
  /**
   * Internal logger gated by the `debug` prop. Mirrors the verbosity ordering
   * Quill used so consumers that previously set `debug="info"` still see the
   * full stream of internal messages, while the default `warn` keeps the
   * console quiet for production usage.
   *
   * Order (most → least verbose): `info` > `log` > `warn` > `error`. A message
   * is printed only when its severity is at or below the configured level.
   */
  private debugLog;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  updateContent(newValue: RichtextValue): void | null;
  updateDisabled(newValue: boolean): void;
  updatePlaceholder(newValue: string, oldValue: string): void;
  updateStyle(newValue: string, oldValue: string): void;
  updateCharacterLimit(): void;
  onUpdateLocales(newLocales: Partial<RichtextLocales>): void;
  componentWillLoad(): void;
  private updateToolbarActiveFormats;
  private buildToolbarConfig;
  /**
   * Replace an uploadingImage placeholder node with an arbitrary node (e.g. video).
   * Used when `resolveUploadingImage` is not appropriate because the replacement
   * is not a standard image node.
   */
  private replaceUploadingNode;
  private onToolbarAction;
  private getToolbarButtonIcon;
  private renderToolbarIcon;
  private onFontSizeChange;
  private onLinkPromptInput;
  /**
   * Called on every selection update. Mirrors Quill's SELECTION_CHANGE handler:
   * when the cursor (collapsed, length=0) lands on a link, show the view-mode
   * tooltip; otherwise close it.
   */
  private handleSelectionLinkDetection;
  /**
   * Find the contiguous range around `pos` where the given mark type is active.
   */
  private findMarkRange;
  /** Switch the link tooltip from view → edit mode. */
  private onLinkPromptEdit;
  /** Remove the link mark from the current range and close the tooltip. */
  private onLinkPromptDelete;
  private onLinkPromptSave;
  private onLinkPromptCancel;
  private onLinkPromptKeyDown;
  private closeLinkPrompt;
  /**
   * Compute the screen-relative position for the link tooltip, anchoring it
   * just below the start of the selection. Mirrors the behaviour of the
   * production Quill `.ql-tooltip` placement logic.
   */
  private computeLinkPromptPosition;
  private fontSizeDropdownConfig;
  private renderFontSizePicker;
  private hostCssClasses;
  private formControlCssClasses;
  private hasWarning;
  private charLimitCssClasses;
  private messageCssClasses;
  render(): any;
}
