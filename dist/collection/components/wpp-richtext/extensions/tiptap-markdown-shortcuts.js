/**
 * @file Tiptap markdown shortcuts extension for wpp-richtext
 * @description InputRules-based auto-formatting that replaces quilljs-markdown.
 *   Handles: # → Heading, > → Blockquote, ``` → Code block, - → Bullet list,
 *   1. → Ordered list, *text* → Italic, **text** → Bold, ~~text~~ → Strikethrough,
 *   `code` → Inline code.
 *
 *   StarterKit's bold/italic/strike input rules require a whitespace or
 *   start-of-line BEFORE the opening delimiter, so mid-word markdown such as
 *   `middle~~strike~~end` or `a**b**c` is never converted.
 *
 *   This extension adds extra mid-word patterns. Each pattern uses a negative
 *   lookbehind/lookahead AGAINST the marker character so the rules cannot
 *   accidentally match inside another marker pair — e.g. the italic rule will
 *   not fire when the engine encounters the inner `*b*` of `a**b**` because
 *   the lookbehind sees `*` and the lookahead also sees `*`.
 *
 *   Bold:    `(?<!\*)\*\*(?!\*) … (?<!\*)\*\*(?!\*)`
 *   Italic:  `(?<![\*_])\*(?!\*) … \*(?!\*)`
 *   Strike:  `(?<!~)~~(?!~) … (?<!~)~~(?!~)`
 *
 *   Order matters within this extension — bold is registered before italic so
 *   that, for inputs where both could match (none with the patterns above),
 *   bold would win.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension, InputRule, markInputRule, markPasteRule } from '@tiptap/core';
/**
 * Mid-word markdown delimiter patterns for bold/italic/strike. The regex shape
 * is `<lookbehind><open>(content)<close><lookahead>$` where lookbehind/ahead
 * exclude the marker character so adjacent markers (e.g. `**` vs `*`) don't
 * cross-trigger.
 */
const MID_WORD_INPUT_PATTERNS = [
  // Bold: **text** and __text__ — opening `**` must not be preceded by `*`.
  { mark: 'bold', regex: /(?<!\*)\*\*(?!\*)([^*]+)\*\*(?!\*)$/ },
  { mark: 'bold', regex: /(?<!_)__(?!_)([^_]+)__(?!_)$/ },
  // Italic: single `*`/`_`, must not be adjacent to another marker char.
  { mark: 'italic', regex: /(?<![*_])\*(?!\*)([^*]+?)\*(?!\*)$/ },
  { mark: 'italic', regex: /(?<![*_])_(?!_)([^_]+?)_(?!_)$/ },
  // Strikethrough: `~~text~~` — opening `~~` must not be preceded by `~`.
  { mark: 'strike', regex: /(?<!~)~~(?!~)([^~]+)~~(?!~)$/ },
];
const MID_WORD_PASTE_PATTERNS = [
  { mark: 'bold', regex: /(?<!\*)\*\*(?!\*)([^*]+)\*\*(?!\*)/g },
  { mark: 'bold', regex: /(?<!_)__(?!_)([^_]+)__(?!_)/g },
  { mark: 'italic', regex: /(?<![*_])\*(?!\*)([^*]+?)\*(?!\*)/g },
  { mark: 'italic', regex: /(?<![*_])_(?!_)([^_]+?)_(?!_)/g },
  { mark: 'strike', regex: /(?<!~)~~(?!~)([^~]+)~~(?!~)/g },
];
export const TiptapMarkdownShortcuts = Extension.create({
  name: 'markdownShortcuts',
  addInputRules() {
    const rules = [];
    // Horizontal rule: --- or *** or ___ at start of line
    rules.push(new InputRule({
      find: /^([-*_]){3,}\s$/,
      handler: ({ state, range }) => {
        const { tr } = state;
        const hrNode = state.schema.nodes.horizontalRule;
        if (hrNode) {
          tr.delete(range.from, range.to);
          tr.replaceWith(range.from, range.from, hrNode.create());
        }
      },
    }));
    // Mid-word bold/italic/strike rules.
    for (const { mark, regex } of MID_WORD_INPUT_PATTERNS) {
      const type = this.editor.schema.marks[mark];
      if (type) {
        rules.push(markInputRule({ find: regex, type }));
      }
    }
    // Markdown inline link: `[text](url)` typed inline.
    //
    // CommonMark §6.3 defines an inline link as `[label](destination)`
    // with NO whitespace allowed between the closing `]` and opening `(`.
    // The production Quill build behaves the same way: typing
    // `[label] (url)` with a space leaves the literal markdown syntax in
    // place and only the bare URL is auto-linked. We follow CommonMark
    // strictly here to match production.
    //
    // The pattern requires the closing `)` to have just been typed (`$`
    // anchor), captures the link label and href, then:
    //   1. clears any link mark autolink may have applied to the URL
    //      within the matched range (Tiptap's `Link` extension's autolink
    //      can fire on `)` as a word boundary, wrapping the URL in a link
    //      mark before this rule runs);
    //   2. replaces the matched range with the label text carrying a
    //      fresh link mark pointing at the captured href;
    //   3. clears the stored link mark so subsequent typing isn't part of
    //      the new link.
    //
    // Capture groups exclude `]`, `(`, `)`, and (for href) whitespace so
    // a stray `[` earlier in the line cannot greedily consume the rest
    // of the paragraph.
    const linkMark = this.editor.schema.marks.link;
    if (linkMark) {
      rules.push(new InputRule({
        find: /\[([^\]]+)\]\(([^\s)]+)\)$/,
        handler: ({ state, range, match }) => {
          const [, label, href] = match;
          if (!label || !href)
            return;
          const { tr } = state;
          const mark = linkMark.create({ href });
          tr.removeMark(range.from, range.to, linkMark);
          tr.replaceWith(range.from, range.to, state.schema.text(label, [mark]));
          tr.removeStoredMark(linkMark);
        },
      }));
    }
    return rules;
  },
  addPasteRules() {
    const rules = [];
    for (const { mark, regex } of MID_WORD_PASTE_PATTERNS) {
      const type = this.editor.schema.marks[mark];
      if (type) {
        rules.push(markPasteRule({ find: regex, type }));
      }
    }
    return rules;
  },
});
