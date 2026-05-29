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
export declare const TiptapMarkdownFix: Extension<any, any>;
