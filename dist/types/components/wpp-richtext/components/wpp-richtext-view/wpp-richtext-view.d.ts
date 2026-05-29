import { ComponentDidLoad } from '../../../../stencil-public-runtime';
import { Formats, RichtextValue } from '../../types';
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
   * Whitelist of formats to allow in the editor.
   */
  readonly formats: string[];
  /**
   * Collection of modules to include and respective options.
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
   * @deprecated This property is no longer needed. Whitespace preservation is now the default behavior
   * for markdown format. This prop will be removed in version 5.0.0.
   */
  preserveWhitespace: boolean;
  /**
   * Name of the editor instance
   */
  readonly name?: string;
  private tiptapEditor;
  containerElement?: HTMLDivElement | HTMLPreElement | null;
  setValue(value: RichtextValue): void;
  getValue(): RichtextValue;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  updateStyle(newValue: string, oldValue: string): void;
  updateContent(newValue: RichtextValue): void | null;
  render(): any;
}
