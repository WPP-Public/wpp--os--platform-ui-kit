/**
 * @file Custom Attachment Node extension for Tiptap
 * @description Renders <a class="ql-attachment"> elements with data attributes
 *   (data-size, data-type, data-last-modified, download, title).
 *   Preserves attachment links from Quill-authored HTML.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node, mergeAttributes } from '@tiptap/core';
export const TiptapAttachment = Node.create({
  name: 'attachment',
  inline: true,
  group: 'inline',
  content: 'inline*',
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute('href'),
      },
      target: {
        default: '_blank',
        parseHTML: (element) => element.getAttribute('target') || '_blank',
      },
      download: {
        default: null,
        parseHTML: (element) => element.getAttribute('download'),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute('title'),
      },
      rel: {
        default: 'noopener noreferrer nofollow',
        parseHTML: (element) => element.getAttribute('rel') || 'noopener noreferrer nofollow',
      },
      'data-size': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-size'),
        renderHTML: (attributes) => {
          if (!attributes['data-size'])
            return {};
          return { 'data-size': attributes['data-size'] };
        },
      },
      'data-type': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-type'),
        renderHTML: (attributes) => {
          if (!attributes['data-type'])
            return {};
          return { 'data-type': attributes['data-type'] };
        },
      },
      'data-last-modified': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-last-modified'),
        renderHTML: (attributes) => {
          if (!attributes['data-last-modified'])
            return {};
          return { 'data-last-modified': attributes['data-last-modified'] };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'a.ql-attachment',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'ql-attachment',
        rel: 'noopener noreferrer nofollow',
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setAttachment: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: {
          href: options.href,
          title: options.title || options.download,
          download: options.download,
          'data-size': options.dataSize,
          'data-type': options.dataType,
          'data-last-modified': options.dataLastModified,
        },
        content: [{ type: 'text', text: options.download || options.title || 'Attachment' }],
      }),
    };
  },
});
