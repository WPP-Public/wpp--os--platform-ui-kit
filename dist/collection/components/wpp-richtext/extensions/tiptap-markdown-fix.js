/**
 * @file Fixes for @tiptap/markdown integration bugs
 * @description
 *   Addresses issues in @tiptap/markdown where:
 *   1. Custom tokenizers (ordered list) prevent `marked.lexer()` from populating
 *      inline tokens on subsequent paragraph tokens, silently dropping content.
 *   2. Intentional blank lines (triple newlines) between blocks are collapsed to
 *      standard block separators.
 *   3. Serialized markdown output includes trailing newlines from structural
 *      empty paragraphs.
 *   @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
/**
 * Preserves intentional blank lines in markdown by inserting `&nbsp;` markers.
 * Replaces runs of 3+ consecutive newlines (i.e. one or more visible blank lines
 * between blocks) with exactly `\n\n&nbsp;\n\n`. This produces a single empty
 * paragraph node that the Paragraph extension already recognises as an intentional
 * blank line.
 *
 * The replacement is idempotent: re-parsing serialized output with blank lines
 * will stabilise after one round-trip.
 *
 * Only operates outside fenced code blocks to avoid corrupting code content.
 */
function preserveBlankLines(markdown) {
  // Split on fenced code-block boundaries, alternating between prose and code
  const parts = markdown.split(/(^```[^\n]*$[\s\S]*?^```[^\n]*$)/m);
  return parts
    .map((part, i) => {
    // Odd indices are code blocks — leave unchanged
    if (i % 2 === 1)
      return part;
    // Strip trailing whitespace from each line (outside code blocks).
    // In markdown, trailing `  ` means a hard <br>, but the Tiptap editor
    // uses hardBreak nodes instead, so leftover trailing spaces are artifacts.
    let cleaned = part.replace(/[ \t]+$/gm, '');
    // Prose sections: collapse 3+ newlines into a single blank-line marker
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n&nbsp;\n\n');
    return cleaned;
  })
    .join('');
}
/**
 * Extension that patches the MarkdownManager after the Markdown extension
 * initializes it. Fixes:
 *
 * - **Bug 1 (P0):** When a custom `markdownTokenizer` (e.g. ordered list) is
 *   registered, the `registerTokenizer` wrapper unconditionally sets
 *   `tokens: []` on the returned token. This causes `marked.Lexer` to skip
 *   inline tokenization for subsequent paragraph tokens, producing empty
 *   `<p></p>` elements. The fix monkey-patches `MarkdownManager.parse()` to
 *   re-populate empty inline tokens before parsing.
 *
 * - **Bug 2 (P1):** Standard markdown collapses multiple blank lines into a
 *   single block separator. The fix pre-processes the markdown to insert `&nbsp;`
 *   markers between consecutive blank lines, which the Paragraph extension already
 *   recognises as intentional empty paragraphs.
 *
 * - **Bug 3 (P1):** `MarkdownManager.serialize()` emits trailing `\n\n` from
 *   structural empty paragraphs. The fix trims the serialized output.
 */
export const TiptapMarkdownFix = Extension.create({
  name: 'markdownFix',
  // Run after the Markdown extension (priority 100 by default) sets up the
  // MarkdownManager, but before the editor creates the view.
  priority: 50,
  onBeforeCreate() {
    const storage = this.editor.storage.markdown;
    if (!storage?.manager)
      return;
    // Cast to `any` to access private MarkdownManager internals at runtime
    // (TS private modifiers are erased in compiled JS)
    const manager = storage.manager;
    // --- Fix Bugs 1 & 2: patch the parse pipeline ---
    const originalParse = manager.parse.bind(manager);
    manager.parse = (markdown) => {
      if (!manager.hasMarked())
        return originalParse(markdown);
      // Bug 2: preserve intentional blank lines before lexing
      const preprocessed = preserveBlankLines(markdown);
      // Run the lexer to get tokens (via the public `instance` getter)
      const tokens = manager.instance.lexer(preprocessed);
      // Bug 1: re-populate empty inline tokens for paragraph & heading tokens.
      // The custom ordered-list tokenizer's wrapper sets `tokens: []` on its
      // result, which causes `marked` to skip the inline-tokenization walk
      // for the NEXT paragraph token in the sequence.
      for (const token of tokens) {
        if ((token.type === 'paragraph' || token.type === 'heading') &&
          Array.isArray(token.tokens) &&
          token.tokens.length === 0 &&
          token.text) {
          // Re-tokenize the inline content from the text
          token.tokens = manager.lexer.inlineTokens(token.text);
        }
      }
      // Now parse the fixed tokens using the internal parseTokens method
      const content = manager.parseTokens(tokens, true);
      return { type: 'doc', content };
    };
    // --- Fix Bug 3: trim trailing newlines from serialized markdown ---
    const originalSerialize = manager.serialize.bind(manager);
    manager.serialize = (docOrContent) => {
      const result = originalSerialize(docOrContent);
      return typeof result === 'string' ? result.trim() : result;
    };
    // --- Fix Bug 4: escape inline markdown syntax in unmarked plain text ---
    //
    // `@tiptap/markdown` only HTML-encodes entities in `encodeTextForMarkdown`
    // and never escapes markdown control characters. That means any text node
    // typed into the editor that *happens* to contain valid CommonMark syntax
    // (e.g. `[label](url)`, `*emphasis*`, `` `code` ``) round-trips through
    // `serialize` → `parse` and is reborn as that formatted node in the read-
    // only view, even though the editor showed it as literal text. The
    // canonical example Pavlo flagged: type `[link](url)` in the editor →
    // editor leaves it as plain text (the InputRule didn't fire because
    // the closing `)` wasn't typed last, or the user pasted), but the view
    // re-parses the markdown and renders a real link.
    //
    // The standard `prosemirror-markdown` serializer escapes these characters
    // (``[`*\\~\[\]_]``) on every text node. Mirror that behaviour by patching
    // `encodeTextForMarkdown`. Code marks/blocks are still left untouched —
    // backslashes inside fenced/inline code would render literally per
    // CommonMark §6.1.
    const originalEncode = manager.encodeTextForMarkdown.bind(manager);
    // Match only the markdown control characters that, if left bare in
    // unmarked text, can be re-parsed as a different node/mark on a later
    // round-trip through `parse()`. This mirrors the canonical escape set
    // used by `prosemirror-markdown`'s `defaultMarkdownSerializer`. We do
    // NOT escape every punctuation character (e.g. `.`, `-`, `(`, `)`) —
    // those are only meaningful at the start of a line / inside link
    // syntax, never inline, and escaping them would clutter the output.
    const MARKDOWN_ESCAPE_RE = /[\\`*~[\]_]/g;
    manager.encodeTextForMarkdown = (text, node, parentNode) => {
      const encoded = originalEncode(text, node, parentNode);
      // Skip code contexts — the original method already returns the raw text
      // there and escaping inside ``` ``` ``` would render literal backslashes.
      const isInsideCode = (parentNode?.type != null && manager.codeTypes?.has?.(parentNode.type)) ||
        (node?.marks || []).some((m) => manager.codeTypes?.has?.(typeof m === 'string' ? m : m.type));
      if (isInsideCode)
        return encoded;
      return encoded.replace(MARKDOWN_ESCAPE_RE, '\\$&');
    };
  },
});
