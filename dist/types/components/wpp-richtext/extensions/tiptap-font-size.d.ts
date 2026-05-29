/**
 * @file Custom FontSize mark extension for Tiptap
 * @description Preserves ql-size-* CSS classes on <span> elements,
 *   ensuring backward-compatibility with content created in the Quill editor.
 *   Adds setFontSize / unsetFontSize commands so the toolbar picker can apply sizes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Mark } from '@tiptap/core';
export interface FontSizeOptions {
  /**
   * Allowed size values. Empty array means all values are accepted.
   */
  sizes: string[];
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set font size on the current selection.
       * Pass '' or null to remove (reset to default 'S').
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Remove font size mark from the current selection.
       */
      unsetFontSize: () => ReturnType;
    };
  }
}
export declare const TiptapFontSize: Mark<FontSizeOptions, any>;
