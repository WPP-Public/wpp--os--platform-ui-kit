import { ComponentDidLoad } from '../../../../stencil-public-runtime';
import { DebugLevels, Formats, QuillInstance, RichtextValue } from '../../types';
export declare class WppRichtextView implements ComponentDidLoad {
  host: HTMLWppRichtextViewElement;
  /**
   * Editor value
   */
  value: RichtextValue;
  /**
   * Format of editor value
   */
  format: Formats;
  /**
   * Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.
   * Passing false disables all messages.
   */
  readonly debug: DebugLevels;
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
   * Use strict comparison for objects.
   */
  readonly strict: boolean;
  /**
   * Inline styles for editor, in a JSON format
   */
  styles?: string;
  /**
   * Use `pre` HTML element as a container to preserve white space, or regular `div` element
   */
  preserveWhitespace: boolean;
  /**
   * Name of the editor instance
   */
  readonly name?: string;
  quill: QuillInstance;
  containerElement?: HTMLDivElement | HTMLPreElement | null;
  setValue(value: RichtextValue, isInitialLoad?: boolean): void;
  getValue(): RichtextValue;
  componentDidLoad(): void;
  updateStyle(newValue: string, oldValue: string): void;
  updateContent(newValue: RichtextValue): void | null;
  render(): any;
}
