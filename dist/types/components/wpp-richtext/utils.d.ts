import { MediaDragElement, QuillInstance, RichtextValue } from './types';
export declare function ignoreHistory(quill: QuillInstance, changes: () => void): void;
export declare const embedBlotInnerHtmlRegexp: RegExp;
export declare const exportHtml: (html: string) => string;
export declare function createDragThumbnail(node: MediaDragElement): MediaDragElement;
/**
 * Converts markdown to HTML and preserves empty lines if requested.
 * @param value - The markdown string
 * @param preserveWhitespace - Whether to preserve empty lines
 * @param isInitialLoad - Whether this is the first load (only mark empty lines then)
 */
export declare function processMarkdownValue(value: RichtextValue, preserveWhitespace: boolean, isInitialLoad?: boolean): {
  html: string;
  plainText: string;
};
