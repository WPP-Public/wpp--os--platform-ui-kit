/**
 * @file Markdown paste handler for wpp-richtext
 * @description Augments `@tiptap/markdown` so that pasted plain text
 *   containing markdown syntax is parsed and rendered as rich content rather
 *   than inserted verbatim. Tiptap's input rules in
 *   `tiptap-markdown-shortcuts.ts` only fire on keystrokes — never on paste —
 *   which is why a dedicated paste plugin is needed to restore the
 *   `quilljs-markdown` paste behaviour from the pre-migration editor.
 *
 *   The plugin only intervenes when the clipboard payload is plain text
 *   (no `text/html`), so HTML pastes from web pages, Word, or another Tiptap
 *   editor continue to flow through Tiptap's built-in HTML paste pipeline.
 *
 *   Conversion is delegated to `editor.commands.insertContent(text,
 *   { contentType: 'markdown' })` — the Markdown extension overrides
 *   `insertContent` to route through its `MarkdownManager.parse()` and pass
 *   the resulting ProseMirror document into the standard insertion flow.
 *   That handles inline-vs-block placement correctly (e.g. an inline
 *   `[label](url)` stays inline inside the host paragraph instead of forcing
 *   a new block).
 *
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
/**
 * Cheap heuristic to decide whether a pasted plain-text blob contains
 * markdown worth parsing. Avoids running the full markdown lexer on every
 * paste (e.g. someone pasting "hello world" should stay a literal paragraph).
 *
 * Patterns intentionally cover everything Pavlo's QA flagged plus the
 * common GFM-flavoured bits we already document elsewhere in the editor.
 */
/**
 * Patterns that uniquely identify markdown structural syntax. When ANY of
 * these match the pasted plain text we always parse as markdown, even if
 * the clipboard also carries a `text/html` payload. This is necessary
 * because most operating systems auto-wrap URLs in `<a>` tags inside the
 * clipboard HTML payload, so pasting `[label](https://example.com)` arrives
 * as plain text + `<a href="https://example.com">https://example.com</a>` in
 * HTML. Without this override the markdown link syntax is lost.
 */
const STRONG_MARKDOWN_PATTERNS = [
  /^[ \t]{0,3}#{1,6}[ \t]+\S/m,
  /^\S[^\n]*\n[ \t]{0,3}(?:=+|-+)[ \t]*$/m,
  /^[ \t]{0,3}>[ \t]?/m,
  /^[ \t]{0,3}(?:[-*+]|\d+[.)])[ \t]+\S/m,
  // Fenced code block — REQUIRE both opening AND closing fence on separate
  // lines. The previous pattern matched any opening fence, so pasting an
  // incomplete snippet like "``` code" (no closing line) was routed to the
  // markdown parser, which produced an empty/malformed code block and the
  // text never rendered. Demoting unbalanced fences to non-markdown lets
  // the default Tiptap paste insert them verbatim as plain text instead.
  /(?:^|\n)[ \t]{0,3}```[^\n]*\n[\s\S]*?\n[ \t]{0,3}```[ \t]*(?:\n|$)/,
  /(?:^|\n)[ \t]{0,3}~~~[^\n]*\n[\s\S]*?\n[ \t]{0,3}~~~[ \t]*(?:\n|$)/,
  /!?\[[^\]\n]+\]\([^)\n]+\)/,
  /^[ \t]{0,3}(?:\*\*\*|---|___)[ \t]*$/m, // Horizontal rule
];
/**
 * Patterns that hint at markdown but are too weak to override an HTML
 * clipboard payload (a real rich-text source could legitimately produce
 * the same characters as plain text).
 */
const WEAK_MARKDOWN_PATTERNS = [
  /`[^`\n]+`/,
  /(\*\*|__)[^\s*_][^*_\n]*\1/,
  /~~[^~\n]+~~/, // Strikethrough
];
const hasStrongMarkdown = (text) => !!text && STRONG_MARKDOWN_PATTERNS.some(re => re.test(text));
const looksLikeMarkdown = (text) => {
  if (!text)
    return false;
  return hasStrongMarkdown(text) || WEAK_MARKDOWN_PATTERNS.some(re => re.test(text));
};
/**
 * Tag names that indicate the clipboard HTML carries real rich-text
 * formatting (came from another editor / a webpage / Word / etc.) and
 * should be respected over the plain-text markdown path. Wrapper-only HTML
 * such as `<meta><div><span>...</span></div>` (the typical clipboard
 * payload from VS Code, Notepad, code blocks on GitHub, etc.) is treated
 * as plain text.
 */
const RICH_HTML_TAGS = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'ul',
  'ol',
  'li',
  'pre',
  'code',
  'strong',
  'em',
  'b',
  'i',
  'u',
  's',
  'strike',
  'del',
  'a',
  'img',
  'video',
  'iframe',
  'table',
  'tr',
  'td',
  'th',
  'hr',
]);
const htmlHasRichFormatting = (html) => {
  if (!html)
    return false;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.body.querySelectorAll('*')).some(el => RICH_HTML_TAGS.has(el.tagName.toLowerCase()));
  }
  catch {
    // If anything goes wrong with parsing, fall back to a conservative
    // regex check against the raw markup.
    return /<\s*(?:h[1-6]|blockquote|ul|ol|li|pre|code|strong|em|b|i|u|s|del|a|img|table|hr)\b/i.test(html);
  }
};
const markdownPastePluginKey = new PluginKey('wppRichtextMarkdownPaste');
/**
 * Type-erased helper that injects the Markdown-extension-only `contentType`
 * option into the `insertContent` chain command. The base `@tiptap/core`
 * type for `insertContent` does not list `contentType`, but the Markdown
 * extension augments the interface at runtime; we cast at the call site
 * rather than redeclaring the module here.
 */
const insertMarkdown = (chain, markdown) => {
  return chain.insertContent(markdown, { contentType: 'markdown' });
};
export const TiptapMarkdownPaste = Extension.create({
  name: 'wppRichtextMarkdownPaste',
  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: markdownPastePluginKey,
        props: {
          handlePaste(_view, event) {
            const clipboard = event.clipboardData;
            if (!clipboard)
              return false;
            const text = clipboard.getData('text/plain');
            if (!looksLikeMarkdown(text))
              return false;
            // Strong markdown structural syntax (headings, lists, blockquotes,
            // fenced code, link/image, hr) wins unconditionally — the OS
            // commonly auto-wraps URLs inside the clipboard's text/html as
            // <a href=...> tags, so deferring to HTML there would strip the
            // markdown link syntax. For weaker indicators (bold/italic/code
            // span/strike) we still defer when the HTML carries genuine rich
            // formatting, since the text could legitimately be plain prose
            // copied from a rich source.
            if (!hasStrongMarkdown(text)) {
              const html = clipboard.getData('text/html');
              if (htmlHasRichFormatting(html))
                return false;
            }
            // Sanity-check the Markdown extension is wired up before claiming
            // the paste — without it, falling through to Tiptap's default
            // text paste is the better outcome.
            const markdownStorage = editor.storage.markdown;
            if (!markdownStorage?.manager)
              return false;
            event.preventDefault();
            insertMarkdown(editor.chain().focus(), text).run();
            return true;
          },
        },
      }),
    ];
  },
});
