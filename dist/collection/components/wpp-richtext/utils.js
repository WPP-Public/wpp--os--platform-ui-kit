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
export function processMarkdownValue(value) {
  let preprocessedValue = value || '';
  // Check if the value already contains &nbsp; markers (from Turndown emptyParagraph rule)
  // If so, don't add more markers - just normalize excessive newlines
  const hasExistingMarkers = preprocessedValue.includes('&nbsp;');
  if (hasExistingMarkers) {
    // Value comes from Turndown with &nbsp; markers already in place
    // Just normalize excessive newlines around existing markers
    preprocessedValue = preprocessedValue.replace(/\n{3,}/g, '\n\n');
  }
  else {
    // Value comes from direct markdown input (no &nbsp; markers)
    // Add markers for blank lines to make them visible
    // First, normalize any 3+ newlines to exactly 2 newlines + marker
    preprocessedValue = preprocessedValue.replace(/\n{3,}/g, '\n\n&nbsp;\n\n');
    // Then, insert empty paragraph markers between all double-newline separated blocks
    preprocessedValue = preprocessedValue.replace(/\n\n/g, '\n\n&nbsp;\n\n');
  }
  // Preserve list indentation: Convert indented ordered ('  N. item') and unordered ('  - item', '  * item', '  + item') list formats to nested structure
  // This handles the Turndown output format where indentation uses 2 spaces per level
  preprocessedValue = preprocessedValue.replace(/^( {2,})(\d+\.|[-*+])\s+(.+)$/gm, (match, spaces, marker, content) => {
    const indentLevel = Math.floor(spaces.length / 2);
    return `${spaces}${marker} [[[INDENT:${indentLevel}]]]${content}`;
  });
  const md = new Marked();
  // Convert markdown to HTML
  let html = md.parse(preprocessedValue);
  // Restore list item indentation classes
  html = html.replace(/<li>(\[{3}INDENT:(\d+)\]{3})?([^<]*)/g, (_match, _fullMarker, indentLevel, content) => {
    if (indentLevel) {
      return `<li class="ql-indent-${indentLevel}">${content}`;
    }
    return `<li>${content}`;
  });
  // Normalize empty paragraphs to &nbsp; for Quill
  html = html.replace(/<p>(\s|<br\s*\/?>)*<\/p>/gi, '<p>&nbsp;</p>');
  // Extract plain text
  const tempEl = document.createElement('div');
  tempEl.innerHTML = html;
  const plainText = (tempEl.textContent || '').trim();
  return { html, plainText };
}
