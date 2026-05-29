/**
 * @file Custom FontSize mark extension for Tiptap
 * @description Preserves ql-size-* CSS classes on <span> elements,
 *   ensuring backward-compatibility with content created in the Quill editor.
 *   Adds setFontSize / unsetFontSize commands so the toolbar picker can apply sizes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Mark, mergeAttributes } from '@tiptap/core';
export const TiptapFontSize = Mark.create({
  name: 'fontSize',
  addOptions() {
    return {
      sizes: ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'],
    };
  },
  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => {
          const cls = element.className || '';
          const match = cls.match(/ql-size-(\S+)/);
          return match ? match[1] : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.size)
            return {};
          return { class: `ql-size-${attributes.size}` };
        },
      },
    };
  },
  parseHTML() {
    // Quill applies ql-size-* classes to multiple inline tags, not just <span>.
    // We must match all of them so font sizes are preserved when parsing legacy HTML.
    //
    // `consuming: false` is critical — without it, the first matching mark (e.g. Bold
    // for <strong>) would consume the element and prevent FontSize from also matching.
    // `priority: 60` (above the default 50) ensures FontSize is evaluated before
    // Bold/Italic/Underline so the ql-size-* class is captured before those marks
    // consume the tag.
    const tags = ['span', 'strong', 'em', 'u', 's', 'sub', 'sup'];
    return tags.map(tag => ({
      tag,
      consuming: false,
      priority: 60,
      getAttrs: (el) => {
        const cls = el.className || '';
        return /ql-size-\S+/.test(cls) ? {} : false;
      },
    }));
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setFontSize: (size) => ({ commands }) => {
        if (!size) {
          return commands.unsetMark(this.name);
        }
        return commands.setMark(this.name, { size });
      },
      unsetFontSize: () => ({ commands }) => commands.unsetMark(this.name),
    };
  },
});
