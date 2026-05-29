import { MediaDragElement, QuillInstance, RichtextValue } from './types';
import type { Node as PmNode } from '@tiptap/pm/model';
export declare function ignoreHistory(quill: QuillInstance, changes: () => void): void;
export declare const embedBlotInnerHtmlRegexp: RegExp;
/**
 * Normalizes Quill-style empty paragraphs and list items for Tiptap/ProseMirror.
 *
 * Quill represents empty lines as `<p><br></p>`, but when ProseMirror parses this
 * with the HardBreak extension, it creates a hardBreak node AND adds its own
 * trailing break, resulting in double-height empty lines.
 *
 * This function converts `<p><br></p>` (and variants) → `<p></p>` so ProseMirror
 * builds a correct empty paragraph node.
 *
 * Note: empty list items (`<ol><li><br></li></ol>`) are intentionally NOT
 * normalized — Tiptap's ProseMirror schema strips bare `<br>` from list items
 * and the production Quill build behaves the same way (an empty list value is
 * rendered as nothing). Adding a `<p></p>` placeholder breaks round-tripping
 * because the placeholder gets serialized back to markdown as a real list item.
 */
export declare const normalizeEmptyParagraphs: (html: string) => string;
/**
 * Normalizes Tiptap list HTML output for backward compatibility with Quill.
 *
 * Tiptap/ProseMirror wraps every list item's content in a `<p>` tag:
 *   `<li><p>text</p></li>`
 * Quill produced tight lists without the wrapper:
 *   `<li>text</li>`
 *
 * For task list items the structure is more complex:
 *   `<li ...><label>...</label><div><p>text</p></div></li>`
 * This function also strips the `<p>` wrapper nested inside `<div>` blocks
 * within list items, producing `<div>text</div>`.
 *
 * Only single-paragraph wrappers are stripped; multi-block content is preserved.
 *
 * The `<div><p>...</p></div>` cleanup is intentionally scoped to occur only
 * inside `<li>` ancestors to avoid mutating arbitrary author-provided HTML
 * that happens to use the same wrapper pattern outside of lists.
 */
export declare const normalizeListHtml: (html: string) => string;
export declare const exportHtml: (html: string) => string;
export declare function createDragThumbnail(node: MediaDragElement): MediaDragElement;
/**
 * Converts markdown to HTML using standard GFM.
 *
 * @deprecated No longer used by the Tiptap editor pipeline. The editor now uses
 * `@tiptap/markdown` for native markdown↔JSON round-trips. This function is retained
 * only for backward compatibility with any external callers or tests.
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
/**
 * Extracts plain text from a ProseMirror document, inserting newlines between
 * top-level block nodes. ProseMirror's `doc.textContent` concatenates all text
 * without separators, which collapses multi-block documents into a single line.
 */
export declare function extractPlainText(doc: PmNode): string;
