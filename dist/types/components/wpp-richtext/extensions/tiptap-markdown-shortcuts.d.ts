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
import { Extension } from '@tiptap/core';
export declare const TiptapMarkdownShortcuts: Extension<any, any>;
