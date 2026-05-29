/**
 * @file Custom Video Node extension for Tiptap
 * @description Preserves <video> elements from Quill-authored HTML.
 *   Uses a NodeView wrapper with contenteditable="false" to ensure the video
 *   renders correctly (thumbnail + controls) inside a contenteditable editor.
 *   Supports src, controls, width, height attributes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node, mergeAttributes } from '@tiptap/core';
export const TiptapVideo = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
        parseHTML: (element) => element.hasAttribute('controls'),
        renderHTML: (attributes) => {
          if (!attributes.controls)
            return {};
          return { controls: '' };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width'),
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute('height'),
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'video[src]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      // Outer wrapper isolates the video from the editor's contenteditable="true"
      const wrapper = document.createElement('div');
      wrapper.setAttribute('contenteditable', 'false');
      wrapper.setAttribute('data-video-wrapper', '');
      wrapper.classList.add('richtext-video-wrapper');
      const video = document.createElement('video');
      const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === '' || value === true) {
          video.setAttribute(key, '');
        }
        else if (value != null && value !== false) {
          video.setAttribute(key, String(value));
        }
      });
      // Ensure controls and preload are set for proper thumbnail/interaction
      if (node.attrs.controls !== false) {
        video.setAttribute('controls', '');
      }
      video.setAttribute('preload', 'metadata');
      wrapper.appendChild(video);
      return {
        dom: wrapper,
        update: updatedNode => {
          if (updatedNode.type.name !== this.name)
            return false;
          video.setAttribute('src', updatedNode.attrs.src || '');
          if (updatedNode.attrs.width)
            video.setAttribute('width', String(updatedNode.attrs.width));
          if (updatedNode.attrs.height)
            video.setAttribute('height', String(updatedNode.attrs.height));
          return true;
        },
      };
    };
  },
  addCommands() {
    return {
      setVideo: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: options,
      }),
    };
  },
});
