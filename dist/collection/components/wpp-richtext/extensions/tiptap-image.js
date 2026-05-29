/**
 * @file Custom Image extension for Tiptap preserving Quill attributes
 * @description Extends the base Tiptap Image to support width, height,
 *   and ql-float-* CSS classes from Quill-authored HTML.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import Image from '@tiptap/extension-image';
export const TiptapImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => {
          if (!attributes.width)
            return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute('height'),
        renderHTML: (attributes) => {
          if (!attributes.height)
            return {};
          return { height: attributes.height };
        },
      },
      float: {
        default: null,
        parseHTML: (element) => {
          const cls = element.className || '';
          const match = cls.match(/ql-float-(\S+)/);
          return match ? match[1] : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.float)
            return {};
          return { class: `ql-float-${attributes.float}` };
        },
      },
      'data-align': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-align'),
        renderHTML: (attributes) => {
          if (!attributes['data-align'])
            return {};
          return { 'data-align': attributes['data-align'] };
        },
      },
    };
  },
});
