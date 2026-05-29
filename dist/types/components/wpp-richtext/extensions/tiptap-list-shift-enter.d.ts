/**
 * @file Shift+Enter behavior inside list items
 * @description By default Tiptap inserts a `hardBreak` on Shift+Enter, which
 *   inside an `<ol>`/`<ul>` produces a continuation line that is *not* numbered.
 *   Quill's behavior — which our richtext component aims to preserve — splits
 *   the list item so each new line is rendered as the next numbered/bulleted
 *   entry. This extension restores that behavior only when the selection is
 *   inside a list item; outside of lists, Shift+Enter still inserts a hardBreak.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
export declare const ListShiftEnter: Extension<any, any>;
