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
export const ListShiftEnter = Extension.create({
  name: 'listShiftEnter',
  addKeyboardShortcuts() {
    return {
      'Shift-Enter': () => {
        const { editor } = this;
        const listItemType = editor.schema.nodes.listItem;
        if (!listItemType) {
          return false;
        }
        const { $from } = editor.state.selection;
        let inListItem = false;
        for (let depth = $from.depth; depth > 0; depth -= 1) {
          if ($from.node(depth).type === listItemType) {
            inListItem = true;
            break;
          }
        }
        if (!inListItem) {
          return false;
        }
        return editor.commands.splitListItem('listItem');
      },
    };
  },
});
