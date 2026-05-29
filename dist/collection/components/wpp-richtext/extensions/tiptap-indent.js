/**
 * @file Custom indent extension for Tiptap paragraph indentation
 * @description Adds indent/outdent support for paragraphs (non-list content).
 *   Quill supported paragraph indentation via indent classes. This extension
 *   adds an `indent` attribute to Paragraph nodes and renders it as margin-left.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
export const TiptapIndent = Extension.create({
  name: 'indent',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      minLevel: 0,
      maxLevel: 8,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              // Parse Quill indent classes (ql-indent-1 through ql-indent-8)
              const cls = element.className || '';
              const match = cls.match(/ql-indent-(\d+)/);
              if (match) {
                return parseInt(match[1], 10);
              }
              // Parse inline margin-left style
              const marginLeft = element.style?.marginLeft;
              if (marginLeft) {
                const px = parseInt(marginLeft, 10);
                if (!isNaN(px) && px > 0) {
                  return Math.min(Math.round(px / 30), this.options.maxLevel);
                }
              }
              return 0;
            },
            renderHTML: (attributes) => {
              const indent = attributes.indent;
              if (!indent || indent <= 0)
                return {};
              return {
                style: `margin-left: ${indent * 30}px`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      increaseIndent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { from, to } = selection;
        let changed = false;
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent < this.options.maxLevel) {
              if (dispatch) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent + 1,
                });
              }
              changed = true;
            }
          }
        });
        return changed;
      },
      decreaseIndent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { from, to } = selection;
        let changed = false;
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent > this.options.minLevel) {
              if (dispatch) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent - 1,
                });
              }
              changed = true;
            }
          }
        });
        return changed;
      },
    };
  },
});
