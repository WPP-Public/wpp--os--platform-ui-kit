import { DRAG_THUMBNAIL_MAX_SIZE } from './const';
import { marked } from 'marked';
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
 * Converts markdown to HTML and preserves empty lines if requested.
 * @param value - The markdown string
 * @param preserveWhitespace - Whether to preserve empty lines
 * @param isInitialLoad - Whether this is the first load (only mark empty lines then)
 */
export function processMarkdownValue(value, preserveWhitespace, isInitialLoad = false) {
  // Normalize underscores to asterisks for italics
  let preprocessedValue = value.replace(/_(\\w+)_/g, '*$1*');
  if (preserveWhitespace) {
    // Mark regular empty lines only on initial load
    if (isInitialLoad) {
      preprocessedValue = preprocessedValue.replace(/\n\s*\n/g, '\n\n[[[EMPTY_LINE_MARKER]]]\n\n');
    }
    // Always mark blank lines between block elements (only if truly blank line present)
    const gapPatterns = [
      // Heading → Heading
      /(^|\n)(#{1,6} .+)\n\s*\n\s*(#{1,6} .+)/g,
      // Heading → Paragraph/List/Blockquote
      /(^|\n)(#{1,6} .+)\n\s*\n\s*([^#])/g,
      // Paragraph → Heading
      /(^|\n)([^>\n#]+)\n\s*\n\s*(#{1,6} .+)/g,
      // List → Heading
      /(^|\n)([-*+] .+)\n\s*\n\s*(#{1,6} .+)/g,
      // List → Paragraph (but not another list item)
      /(^|\n)([-*+] .+)\n\s*\n\s*(?![-*+])([^>\n#]+)/g,
      // Ordered List → Heading
      /(^|\n)(\d+\.\s.+)\n\s*\n\s*(#{1,6} .+)/g,
      // Ordered List → Paragraph (but not another list item)
      /(^|\n)(\d+\.\s.+)\n\s*\n\s*(?!\d+\.)([^>\n#]+)/g,
      // Paragraph → List (only if real blank line)
      /(^|\n)([^>\n#]+)\n\s*\n\s*([-*+] .+)/g,
      // Paragraph → Ordered List (only if real blank line)
      /(^|\n)([^>\n#]+)\n\s*\n\s*(\d+\.\s.+)/g,
    ];
    gapPatterns.forEach(pattern => {
      preprocessedValue = preprocessedValue.replace(pattern, `$1$2\n\n[[[EMPTY_LINE_MARKER]]]\n\n$3`);
    });
    // 🚀 NEW: Handle blockquotes separately - don't insert markers inside them
    // First, temporarily replace blockquote sections to protect them
    const blockquoteBlocks = [];
    let blockquoteIndex = 0;
    // Match entire blockquote blocks (multiple consecutive lines starting with >)
    preprocessedValue = preprocessedValue.replace(/((?:^|\n)(?:>.+\n?)+)/g, match => {
      blockquoteBlocks.push(match);
      return `[[[BLOCKQUOTE_${blockquoteIndex++}]]]`;
    });
    // Now add markers around blockquotes if there's a blank line
    preprocessedValue = preprocessedValue.replace(/(^|\n)([^[\n]+)\n\s*\n\s*(\[\[\[BLOCKQUOTE_\d+\]\]\])/g, `$1$2\n\n[[[EMPTY_LINE_MARKER]]]\n\n$3`);
    preprocessedValue = preprocessedValue.replace(/(\[\[\[BLOCKQUOTE_\d+\]\]\])\n\s*\n\s*([^[\n]+)/g, `$1\n\n[[[EMPTY_LINE_MARKER]]]\n\n$2`);
    // Restore blockquotes
    blockquoteBlocks.forEach((block, index) => {
      preprocessedValue = preprocessedValue.replace(`[[[BLOCKQUOTE_${index}]]]`, block.trim());
    });
    // Deduplicate consecutive markers
    preprocessedValue = preprocessedValue.replace(/(\[\[\[EMPTY_LINE_MARKER\]\]\]\n+){2,}/g, '[[[EMPTY_LINE_MARKER]]]\n\n');
  }
  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: true,
    smartLists: true,
    tables: true,
  });
  // Convert markdown to HTML
  let html = marked(preprocessedValue);
  // Restore markers if preserveWhitespace is enabled
  if (preserveWhitespace) {
    html = html.replace(/<p>\[\[\[EMPTY_LINE_MARKER\]\]\]<\/p>/g, '<p>&nbsp;</p>');
    html = html.replace(/\[\[\[EMPTY_LINE_MARKER\]\]\]/g, '');
  }
  // Always normalize empty paragraphs (with or without <br>)
  html = html.replace(/<p>(\s|<br\s*\/?>)*<\/p>/gi, '<p>&nbsp;</p>');
  // Extract plain text
  const tempEl = document.createElement('div');
  tempEl.innerHTML = html;
  const plainText = (tempEl.textContent || '').trim();
  return { html, plainText };
}
