/**
 * @file Tiptap image upload extension for wpp-richtext
 * @description Custom Node extension that handles image paste, drag-and-drop, and upload flow.
 *   Replaces plugins/quill-upload/ functionality. Preserves the wppUploadRequest event shape.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { TIPTAP_UPLOAD_REQUEST_EVENT } from '../tiptap-types';
/**
 * ProseMirror Plugin Key for the upload plugin
 */
const uploadPluginKey = new PluginKey('imageUpload');
/**
 * UploadingImage — a special node rendered while the image is being uploaded.
 * Shows a loading state and transitions to a regular Image node on success.
 */
export const UploadingImage = Node.create({
  name: 'uploadingImage',
  group: 'block',
  atom: true,
  draggable: false,
  selectable: true,
  addAttributes() {
    return {
      uploadId: { default: null },
      src: { default: null },
      alt: { default: '' },
      status: { default: 'uploading' },
      fileName: { default: '' },
      previewUrl: { default: null },
      fileType: { default: 'image' }, // 'image' | 'video' | 'attachment'
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-upload-id]' }];
  },
  renderHTML({ HTMLAttributes }) {
    const status = HTMLAttributes.status || 'uploading';
    const fileName = HTMLAttributes.fileName || '';
    const previewUrl = HTMLAttributes.previewUrl || null;
    const fileType = HTMLAttributes.fileType || 'image';
    // Render either <img> or <video> preview based on file type
    const previewNode = previewUrl
      ? fileType === 'video'
        ? [
          'video',
          {
            src: previewUrl,
            class: 'richtext-upload-preview',
            style: 'max-width: 100%; opacity: 0.6;',
            muted: '',
            preload: 'metadata',
          },
        ]
        : [
          'img',
          {
            src: previewUrl,
            class: 'richtext-upload-preview',
            style: 'max-width: 100%; opacity: 0.6;',
          },
        ]
      : null;
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-upload-id': HTMLAttributes.uploadId,
        'data-status': status,
        class: `richtext-uploading-image richtext-upload-${status}`,
      }),
      // Show a real preview (blob URL) while uploading — eliminates
      // the perceived delay users experienced with the spinner-only UI.
      // Falls back to the spinner when no preview is available.
      ...(previewNode ? [previewNode] : []),
      [
        'div',
        { class: 'richtext-upload-content' },
        status === 'uploading'
          ? ['span', { class: 'richtext-upload-spinner' }, '']
          : status === 'error'
            ? ['span', { class: 'richtext-upload-error-icon' }, '⚠']
            : '',
        ['span', { class: 'richtext-upload-filename' }, fileName],
      ],
    ];
  },
});
/**
 * Returns true when `mime` matches one of the configured patterns.
 * Patterns may be exact (e.g. `image/png`) or wildcard suffixes (e.g. `image/*`).
 */
function isMimeAccepted(mime, accepted) {
  if (!accepted.length)
    return true;
  return accepted.some(pattern => {
    if (pattern === mime)
      return true;
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -1); // 'image/'
      return mime.startsWith(prefix);
    }
    return false;
  });
}
/**
 * Creates a ProseMirror plugin that intercepts paste and drop events
 * to handle image file uploads.
 *
 * Files collected from the user action are validated against the configured
 * `acceptedMimeTypes` / `maxFileSize` and only the accepted ones are forwarded
 * to `emitUploadRequest`. Returning `true` prevents ProseMirror's default
 * insertion of the dropped/pasted file as plain content.
 */
function createUploadPlugin(emitUploadRequest, validate) {
  return new Plugin({
    key: uploadPluginKey,
    props: {
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        const imageFiles = items
          .filter(item => item.type.startsWith('image/'))
          .map(item => item.getAsFile())
          .filter((f) => f !== null);
        if (imageFiles.length === 0)
          return false;
        const accepted = validate(imageFiles);
        if (accepted.length === 0) {
          // Files were present but all rejected by validation — still swallow the
          // paste so the raw file blob isn't inserted as text/binary content.
          event.preventDefault();
          return true;
        }
        event.preventDefault();
        emitUploadRequest('image', accepted);
        return true;
      },
      handleDrop(view, event) {
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        if (imageFiles.length === 0)
          return false;
        const accepted = validate(imageFiles);
        if (accepted.length === 0) {
          event.preventDefault();
          return true;
        }
        event.preventDefault();
        emitUploadRequest('image', accepted);
        return true;
      },
    },
  });
}
/**
 * TiptapImageUpload — Extension that provides the upload flow for images.
 * Consumers handle the actual upload via the wppUploadRequest event.
 */
export const TiptapImageUpload = Node.create({
  name: 'imageUpload',
  addOptions() {
    return {
      maxFileSize: 0,
      acceptedMimeTypes: ['image/*'],
    };
  },
  addCommands() {
    return {
      insertUploadingImage: (id, file, fileType) => ({ commands }) => commands.insertContent({
        type: 'uploadingImage',
        attrs: {
          uploadId: id,
          status: 'uploading',
          fileName: file.name,
          previewUrl: URL.createObjectURL(file),
          fileType: fileType || (file.type.startsWith('video/') ? 'video' : 'image'),
        },
      }),
      resolveUploadingImage: (id, url) => ({ tr, state, dispatch }) => {
        let found = false;
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'uploadingImage' && node.attrs.uploadId === id) {
            if (dispatch) {
              // Create the correct node type based on what was uploaded
              const isVideo = node.attrs.fileType === 'video';
              const nodeType = isVideo ? state.schema.nodes.video : state.schema.nodes.image;
              const attrs = isVideo ? { src: url, controls: true } : { src: url };
              const resolvedNode = nodeType.create(attrs);
              tr.replaceWith(pos, pos + node.nodeSize, resolvedNode);
              // Suppress undo entry — the upload itself isn't user-editable
              tr.setMeta('addToHistory', false);
            }
            found = true;
          }
        });
        return found;
      },
      failUploadingImage: (id) => ({ tr, state, dispatch }) => {
        let found = false;
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'uploadingImage' && node.attrs.uploadId === id) {
            if (dispatch) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, status: 'error' });
              tr.setMeta('addToHistory', false);
            }
            found = true;
          }
        });
        return found;
      },
    };
  },
  addProseMirrorPlugins() {
    const editor = this.editor;
    const { maxFileSize, acceptedMimeTypes, onUploadRequest } = this.options;
    /** Resolve the host element lazily to handle shadow DOM and timing */
    function getHostElement() {
      const dom = editor.view?.dom;
      if (!dom)
        return null;
      const root = dom.getRootNode();
      if (root instanceof ShadowRoot)
        return root.host;
      return dom.closest('wpp-richtext');
    }
    /**
     * Validates pasted/dropped files against the configured options. Files that
     * exceed `maxFileSize` (when > 0) or whose MIME type does not match
     * `acceptedMimeTypes` are dropped silently from the upload request.
     */
    const validateFiles = (files) => files.filter(file => {
      if (maxFileSize > 0 && file.size > maxFileSize)
        return false;
      if (!isMimeAccepted(file.type, acceptedMimeTypes))
        return false;
      return true;
    });
    const emitUploadRequest = (type, files) => {
      const callback = (items) => {
        items.forEach(item => {
          const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
          editor.commands.insertUploadingImage(uploadId, item.file);
          item.promise
            .then(url => {
            editor.commands.resolveUploadingImage(uploadId, url);
          })
            .catch(() => {
            editor.commands.failUploadingImage(uploadId);
          });
        });
      };
      // If a custom upload handler is configured, prefer it over the
      // event-based flow. The handler receives the same callback used by the
      // default DOM-event consumer so existing upload pipelines stay compatible.
      if (onUploadRequest) {
        onUploadRequest(type, callback);
        return;
      }
      // Dispatch the event on the host element for backward compatibility.
      // The validated files are surfaced under `detail.files` so consumers can
      // distinguish upload requests by their originating files (e.g. for
      // analytics or progressive UI feedback) without having to hook the
      // ProseMirror plugin directly.
      const detail = { type, callback, files };
      const hostElement = getHostElement();
      if (hostElement) {
        const event = new CustomEvent(TIPTAP_UPLOAD_REQUEST_EVENT, {
          detail,
          bubbles: true,
          composed: false,
        });
        hostElement.dispatchEvent(event);
      }
    };
    return [createUploadPlugin(emitUploadRequest, validateFiles)];
  },
});
