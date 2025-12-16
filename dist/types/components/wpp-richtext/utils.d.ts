import { MediaDragElement, QuillInstance, RichtextValue } from './types';
export declare function ignoreHistory(quill: QuillInstance, changes: () => void): void;
export declare const embedBlotInnerHtmlRegexp: RegExp;
export declare const exportHtml: (html: string) => string;
export declare function createDragThumbnail(node: MediaDragElement): MediaDragElement;
/**
 * Converts markdown to HTML using standard GFM, preserving formatting and blank lines.
 * Uses marked with breaks: true to preserve single newlines as <br>.
 *
 * Handles two different input sources:
 * - Direct markdown input: Adds &nbsp; markers for all blank lines (double newlines) to preserve empty paragraphs.
 * - Turndown output: Already has &nbsp; markers, so only normalizes excessive newlines.
 *
 * Also preserves list indentation by converting 2-space indents to ql-indent-N classes for nested lists.
 *
 * @param value - The markdown string to convert.
 * @returns An object containing:
 *   - html: The converted HTML string.
 *   - plainText: The extracted plain text.
 */
export declare function processMarkdownValue(value: RichtextValue): {
  html: string;
  plainText: string;
};
