import { DRAG_THUMBNAIL_MAX_SIZE } from './const';
import { Marked } from 'marked';
export function ignoreHistory(quill, changes) {
  quill.history?.cutoff();
  if (quill.history) {
    quill.history.ignoreChange = true;
    quill.once(quill.emitter.constructor.events.EDITOR_CHANGE, () => {
      quill.history.ignoreChange = false;
    });
  }
  changes();
  quill.history?.cutoff();
}
export const embedBlotInnerHtmlRegexp = /\uFEFF.*?\uFEFF/g;
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
export const normalizeEmptyParagraphs = (html) => html.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '<p></p>');
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
export const normalizeListHtml = (html) => {
  // Strip `<p>` wrapper directly inside `<li>`. An empty `<p></p>` wrapper
  // collapses to `<br>` so empty list items match the production Quill
  // markup (`<li><br></li>`) consumers expect.
  let out = html.replace(/<li([^>]*)>\s*<p>(.*?)<\/p>\s*<\/li>/gi, (_match, attrs, inner) => `<li${attrs}>${inner.trim() === '' ? '<br>' : inner}</li>`);
  // Strip `<div><p>...</p></div>` ONLY when it appears inside an `<li>`.
  // We walk every `<li>...</li>` block and replace within it so wrappers
  // outside of lists (i.e. arbitrary consumer HTML) are left untouched.
  out = out.replace(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi, (_match, attrs, inner) => {
    const cleanedInner = inner.replace(/<div>\s*<p>(.*?)<\/p>\s*<\/div>/gi, '<div>$1</div>');
    return `<li${attrs}>${cleanedInner}</li>`;
  });
  // Strip a single trailing empty paragraph that immediately follows a list.
  // ProseMirror's schema appends a placeholder `<p></p>` after the list when
  // toggling on an empty editor (so the caret has somewhere to land after
  // the list), but the production Quill output never contained this trailer
  // and Pavlo's QA flags it. We only strip when it is the final node of the
  // document so authored trailing paragraphs after lists are preserved.
  out = out.replace(/(<\/(?:ul|ol)>)\s*<p>\s*<\/p>\s*$/i, '$1');
  return out;
};
export const exportHtml = (html) => html.replace(embedBlotInnerHtmlRegexp, '');
export function createDragThumbnail(node) {
  const dragThumbnail = node.cloneNode();
  const ratio = Math.min(1, DRAG_THUMBNAIL_MAX_SIZE / node.width, DRAG_THUMBNAIL_MAX_SIZE / node.height);
  Object.assign(dragThumbnail, {
    width: node.width * ratio,
    height: node.height * ratio,
  });
  Object.assign(dragThumbnail.style, {
    position: 'fixed',
    left: `-${DRAG_THUMBNAIL_MAX_SIZE}px`,
    top: `-${DRAG_THUMBNAIL_MAX_SIZE}px`,
  });
  document.body.appendChild(dragThumbnail);
  return dragThumbnail;
}
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
export function processMarkdownValue(value) {
  const str = String(value || '');
  if (!str.trim()) {
    return { html: '', plainText: '' };
  }
  // Use a local Marked instance so options stay scoped to this function and
  // do not mutate the global `marked` configuration shared with other code.
  const localMarked = new Marked({
    gfm: true,
    breaks: true,
  });
  // Convert markdown to HTML
  const html = localMarked.parse(str);
  // Extract plain text
  const tempEl = document.createElement('div');
  tempEl.innerHTML = html;
  const plainText = (tempEl.textContent || '').trim();
  return { html, plainText };
}
/**
 * Extracts plain text from a ProseMirror document, inserting newlines between
 * top-level block nodes. ProseMirror's `doc.textContent` concatenates all text
 * without separators, which collapses multi-block documents into a single line.
 */
export function extractPlainText(doc) {
  const blocks = [];
  doc.forEach(node => {
    const text = node.textContent;
    if (text)
      blocks.push(text);
  });
  return blocks.join('\n').trim();
}
