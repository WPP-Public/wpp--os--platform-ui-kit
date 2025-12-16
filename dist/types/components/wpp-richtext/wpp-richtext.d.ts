import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common';
import { LabelConfig } from '../wpp-label/types';
import { BaseComponent } from '../../interfaces/base-component';
import { DebugLevels, Formats, QuillInstance, RichtextChangeEventDetail, RichtextLocales, RichtextSelectionChangeEventDetail, RichtextUploadRequestEventDetail, RichtextValue } from './types';
import 'quilljs-markdown/dist/quilljs-markdown-common-style.css';
export declare class WppRichtext implements BaseComponent {
  private _locales;
  host: HTMLWppRichtextElement;
  focusType: FOCUS_TYPE;
  private enteredCharacters;
  plainText: string;
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
   * for markdown format. This prop will be removed in a future major version.
   */
  readonly preserveWhitespace: boolean;
  /**
   * DOM Element or a CSS selector for a DOM Element, within which the editor's ui elements (i.e. tooltips, etc.)
   * should be confined. Currently, it only considers left and right boundaries.
   */
  bounds: HTMLElement | string;
  /**
   * Editor value
   */
  value: RichtextValue;
  /**
   * Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.
   * Passing false disables all messages.
   */
  debug: DebugLevels;
  /**
   * Whitelist of formats to allow in the editor.
   * See [Formats](https://quilljs.com/docs/formats/) for a complete list.
   */
  readonly formats: string[];
  /**
   * Collection of modules to include and respective options.
   * The only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed (See "Usage" section of Notes)
   * See [Modules](https://quilljs.com/docs/modules/) for more information about the library's modules.
   */
  modules?: string;
  /**
   * Placeholder text to show when editor is empty.
   */
  placeholder: string;
  /**
   * DOM Element or a CSS selector for a DOM Element, specifying which container has the scrollbars
   * (i.e. `overflow-y: auto`), if has been changed from the default ql-editor with custom CSS.
   * Necessary to fix scroll jumping bugs when Quill is set to auto grow its height, and another ancestor container
   * is responsible for the scrolling.
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
   * Editor init event
   */
  readonly wppInit: EventEmitter<QuillInstance>;
  /**
   * Emitted when editor has content changes
   */
  readonly wppChange: EventEmitter<RichtextChangeEventDetail>;
  /**
   * Emitted when editor has selection changes
   */
  readonly wppSelectionChange: EventEmitter<RichtextSelectionChangeEventDetail>;
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
  readonly wppUploadRequest: EventEmitter<RichtextUploadRequestEventDetail>;
  quill: QuillInstance;
  containerElement?: HTMLDivElement | HTMLPreElement;
  selectionChangeEvent: any;
  textChangeEvent: any;
  formControlInput?: HTMLInputElement;
  private savedSelectionRange;
  private onFocusIn;
  private onFocusOut;
  private onKeyUp;
  private onMouseDown;
  private onEditorBlur;
  private onEditorFocus;
  private dragThumbnail;
  private dragElement;
  private onDragstart;
  private onDragend;
  private onDrop;
  private updateEnteredCharacters;
  private syncValueAndEmit;
  setValue(value: RichtextValue): void;
  getValue(): RichtextValue;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  updateContent(newValue: RichtextValue): void | null;
  updateDisabled(newValue: boolean): void;
  updatePlaceholder(newValue: string, oldValue: string): void;
  updateStyle(newValue: string, oldValue: string): void;
  updateCharacterLimit(): void;
  onUpdateLocales(newLocales: Partial<RichtextLocales>): void;
  componentWillLoad(): void;
  private hostCssClasses;
  private formControlCssClasses;
  private charLimitCssClasses;
  private messageCssClasses;
  render(): any;
}
