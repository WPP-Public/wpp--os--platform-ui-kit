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
export declare const TiptapMarkdownPaste: Extension<any, any>;
