'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-ecf423ba.js');
const index = require('./index-10e1072f.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-2231f97a.js');
const tiptapTypes = require('./tiptap-types-03d4d5ad.js');
const tiptapConfig = require('./tiptap-config-0e2d155a.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./consts-d8f5ef98.js');
require('./wpp-icon-attach-5abd3b6f.js');
require('./WppIcon-55327707.js');
require('./wpp-icon-unordered-list-d75328da.js');
require('./wpp-icon-video-clip-4873468d.js');
require('./const-09fdf30a.js');
require('./marked.umd-e1074c94.js');
require('./wpp-progress-indicator-5bccf9fe.js');
require('./wpp-icon-chevron-01139742.js');
require('./wpp-icon-gallery-5c2897b9.js');
require('./lodash-6b012aab.js');
require('./wpp-action-button-0241aba7.js');
require('./WrappedSlot-4a4ef805.js');
require('./wpp-input-533c8118.js');
require('./turndown.browser.es-eb372b89.js');

/**
 * @file Tiptap image upload extension for wpp-richtext
 * @description Custom Node extension that handles image paste, drag-and-drop, and upload flow.
 *   Replaces plugins/quill-upload/ functionality. Preserves the wppUploadRequest event shape.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * ProseMirror Plugin Key for the upload plugin
 */
const uploadPluginKey = new index.PluginKey('imageUpload');
/**
 * UploadingImage — a special node rendered while the image is being uploaded.
 * Shows a loading state and transitions to a regular Image node on success.
 */
const UploadingImage = index.Node3.create({
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
      index.mergeAttributes(HTMLAttributes, {
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
  return new index.Plugin({
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
const TiptapImageUpload = index.Node3.create({
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
        const event = new CustomEvent(tiptapTypes.TIPTAP_UPLOAD_REQUEST_EVENT, {
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

/**
 * @file Tiptap image resize and alignment extension for wpp-richtext
 * @description Custom extension that provides click-to-select images with resize handles
 *   and alignment controls. Replaces plugins/quill-image-actions/.
 *   All overlay DOM is created INSIDE the shadow root (not document.body).
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const imageActionsPluginKey = new index.PluginKey('imageActions');
function removeOverlay(storage) {
  if (!storage.activeOverlay)
    return;
  storage.activeOverlay.overlay.remove();
  storage.activeOverlay = null;
}
function createResizeHandle(position) {
  const handle = document.createElement('div');
  handle.className = `richtext-resize-handle richtext-resize-${position}`;
  handle.setAttribute('data-position', position);
  return handle;
}
function createAlignmentToolbar(img, view, storage) {
  const toolbar = document.createElement('div');
  toolbar.className = 'richtext-image-toolbar';
  const alignments = [
    { value: 'left', label: 'Align left', icon: '⬅' },
    { value: 'center', label: 'Center', icon: '⬌' },
    { value: 'right', label: 'Align right', icon: '➡' },
  ];
  alignments.forEach(({ value, label, icon }) => {
    const button = document.createElement('button');
    button.className = 'richtext-image-toolbar-btn';
    button.setAttribute('type', 'button');
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.textContent = icon;
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      // Find the image node position in the document
      const pos = view.posAtDOM(img, 0);
      if (pos === undefined)
        return;
      const resolvedPos = view.state.doc.resolve(pos);
      const node = resolvedPos.parent.type.name === 'image' ? resolvedPos.parent : view.state.doc.nodeAt(pos);
      if (node?.type.name === 'image') {
        const tr = view.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          'data-align': value,
        });
        view.dispatch(tr);
      }
      // Update the inline style
      img.style.float = value === 'center' ? 'none' : value;
      img.style.display = value === 'center' ? 'block' : '';
      img.style.marginLeft = value === 'center' ? 'auto' : '';
      img.style.marginRight = value === 'center' ? 'auto' : '';
    });
    toolbar.appendChild(button);
  });
  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'richtext-image-toolbar-btn richtext-image-delete-btn';
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('aria-label', 'Delete image');
  deleteBtn.setAttribute('title', 'Delete image');
  deleteBtn.textContent = '✕';
  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const pos = view.posAtDOM(img, 0);
    if (pos !== undefined) {
      const node = view.state.doc.nodeAt(pos);
      if (node) {
        const tr = view.state.tr.delete(pos, pos + node.nodeSize);
        view.dispatch(tr);
      }
    }
    removeOverlay(storage);
  });
  toolbar.appendChild(deleteBtn);
  return toolbar;
}
function createOverlay(img, view, container, storage) {
  removeOverlay(storage);
  const overlay = document.createElement('div');
  overlay.className = 'richtext-image-overlay';
  // Position overlay relative to the image
  const imgRect = img.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  overlay.style.position = 'absolute';
  overlay.style.left = `${imgRect.left - containerRect.left}px`;
  overlay.style.top = `${imgRect.top - containerRect.top}px`;
  overlay.style.width = `${imgRect.width}px`;
  overlay.style.height = `${imgRect.height}px`;
  // Add resize handles (4 corners)
  const handlePositions = ['nw', 'ne', 'sw', 'se'];
  const handles = handlePositions.map(pos => {
    const handle = createResizeHandle(pos);
    overlay.appendChild(handle);
    return handle;
  });
  // Add alignment + delete toolbar
  const toolbar = createAlignmentToolbar(img, view, storage);
  overlay.appendChild(toolbar);
  // Resize logic
  handles.forEach(handle => {
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = img.width;
      const startHeight = img.height;
      const aspect = startWidth / startHeight;
      const position = handle.getAttribute('data-position') || 'se';
      const onMouseMove = (moveEvent) => {
        let dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        // Maintain aspect ratio based on the dominant axis
        if (Math.abs(dx) > Math.abs(dy)) {
          // Width-dominant resize
          if (position.includes('w'))
            dx = -dx;
          const newWidth = Math.max(50, startWidth + dx);
          const newHeight = newWidth / aspect;
          img.width = Math.round(newWidth);
          img.height = Math.round(newHeight);
        }
        else {
          let adjDy = dy;
          if (position.includes('n'))
            adjDy = -adjDy;
          const newHeight = Math.max(50, startHeight + adjDy);
          const newWidth = newHeight * aspect;
          img.width = Math.round(newWidth);
          img.height = Math.round(newHeight);
        }
        // Update overlay dimensions
        overlay.style.width = `${img.width}px`;
        overlay.style.height = `${img.height}px`;
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // Update ProseMirror node attributes
        const pos = view.posAtDOM(img, 0);
        if (pos !== undefined) {
          const node = view.state.doc.nodeAt(pos);
          if (node?.type.name === 'image') {
            const tr = view.state.tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: img.width,
              height: img.height,
            });
            view.dispatch(tr);
          }
        }
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
  container.appendChild(overlay);
  storage.activeOverlay = { element: img, overlay, handles, toolbar };
}
/**
 * TiptapImageActions — Extension providing image click-to-select with resize handles
 * and alignment toolbar. Replaces quill-image-actions plugin.
 */
const TiptapImageActions = index.Extension.create({
  name: 'imageActions',
  addOptions() {
    return {
      alignments: ['left', 'center', 'right'],
      showDeleteButton: true,
    };
  },
  addStorage() {
    return {
      activeOverlay: null,
    };
  },
  addProseMirrorPlugins() {
    const editor = this.editor;
    const storage = this.storage;
    return [
      new index.Plugin({
        key: imageActionsPluginKey,
        props: {
          handleClick(view, _pos, event) {
            const target = event.target;
            if (!(target instanceof HTMLImageElement)) {
              removeOverlay(storage);
              return false;
            }
            // Find the editor container for positioning
            const container = view.dom.parentElement || view.dom;
            createOverlay(target, view, container, storage);
            return true;
          },
          handleKeyDown(_view, event) {
            // Remove overlay on any keydown — user is typing
            if (storage.activeOverlay && event.key !== 'Delete' && event.key !== 'Backspace') {
              removeOverlay(storage);
            }
            return false;
          },
        },
        view() {
          return {
            update() {
              // Reposition overlay if content changed while visible
              if (storage.activeOverlay) {
                const img = storage.activeOverlay.element;
                if (!img.isConnected) {
                  removeOverlay(storage);
                  return;
                }
                const container = editor.view.dom.parentElement || editor.view.dom;
                const imgRect = img.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                storage.activeOverlay.overlay.style.left = `${imgRect.left - containerRect.left}px`;
                storage.activeOverlay.overlay.style.top = `${imgRect.top - containerRect.top}px`;
                storage.activeOverlay.overlay.style.width = `${imgRect.width}px`;
                storage.activeOverlay.overlay.style.height = `${imgRect.height}px`;
              }
            },
            destroy() {
              removeOverlay(storage);
            },
          };
        },
      }),
    ];
  },
});

/**
 * @file Tiptap toolbar command mapping for wpp-richtext
 * @description Maps toolbar button names to Tiptap editor commands.
 *   Replaces plugins/wpp-quill-toolbar/ which provided alias resolution.
 *   Tiptap is headless — the toolbar DOM stays in the component template.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * Returns whether a particular format is active at the current selection.
 */
function isFormatActive(editor, name, attrs) {
  switch (name) {
    case 'bold':
      return editor.isActive('bold');
    case 'italic':
      return editor.isActive('italic');
    case 'underline':
      return editor.isActive('underline');
    case 'strike':
      return editor.isActive('strike');
    case 'heading1':
      return editor.isActive('heading', { level: 1 });
    case 'heading2':
      return editor.isActive('heading', { level: 2 });
    case 'heading3':
      return editor.isActive('heading', { level: 3 });
    case 'blockquote':
      return editor.isActive('blockquote');
    case 'codeBlock':
    case 'code-block':
      return editor.isActive('codeBlock');
    case 'orderedList':
    case 'ordered':
      return editor.isActive('orderedList');
    case 'bulletList':
    case 'bullet':
      return editor.isActive('bulletList');
    case 'link':
      return editor.isActive('link');
    case 'alignLeft':
      // The TextAlign extension treats `left` as the implicit default and
      // does not write the attribute on the DOM node, so a fresh paragraph
      // never matches `{ textAlign: 'left' }` strictly. Treat absence of any
      // explicit alignment as "left active" so the toolbar reflects reality.
      return (editor.isActive({ textAlign: 'left' }) ||
        (!editor.isActive({ textAlign: 'center' }) &&
          !editor.isActive({ textAlign: 'right' }) &&
          !editor.isActive({ textAlign: 'justify' })));
    case 'alignCenter':
      return editor.isActive({ textAlign: 'center' });
    case 'alignRight':
      return editor.isActive({ textAlign: 'right' });
    case 'alignJustify':
      return editor.isActive({ textAlign: 'justify' });
    case 'fontSize':
      return editor.isActive('fontSize');
    default:
      return attrs ? editor.isActive(name, attrs) : editor.isActive(name);
  }
}
/**
 * Executes a toolbar command on the editor.
 */
function executeToolbarCommand(editor, name, value) {
  const chain = editor.chain().focus();
  switch (name) {
    case 'bold':
      chain.toggleBold().run();
      break;
    case 'italic':
      chain.toggleItalic().run();
      break;
    case 'underline':
      chain.toggleUnderline().run();
      break;
    case 'strike':
      chain.toggleStrike().run();
      break;
    case 'heading1':
      chain.toggleHeading({ level: 1 }).run();
      break;
    case 'heading2':
      chain.toggleHeading({ level: 2 }).run();
      break;
    case 'heading3':
      chain.toggleHeading({ level: 3 }).run();
      break;
    case 'blockquote':
      chain.toggleBlockquote().run();
      break;
    case 'codeBlock':
    case 'code-block':
      chain.toggleCodeBlock().run();
      break;
    case 'orderedList':
    case 'ordered':
      chain.toggleOrderedList().run();
      break;
    case 'bulletList':
    case 'bullet':
      chain.toggleBulletList().run();
      break;
    case 'link': {
      if (editor.isActive('link')) {
        chain.unsetLink().run();
      }
      else if (typeof value === 'string') {
        chain.setLink({ href: value }).run();
      }
      break;
    }
    case 'image':
      // Image insertion is handled by the upload flow — this is a no-op trigger
      break;
    case 'alignLeft':
      chain.setTextAlign('left').run();
      break;
    case 'alignCenter':
      chain.setTextAlign('center').run();
      break;
    case 'alignRight':
      chain.setTextAlign('right').run();
      break;
    case 'alignJustify':
      chain.setTextAlign('justify').run();
      break;
    case 'indent':
      // Try list indent first; fall back to paragraph indent
      if (!chain.sinkListItem('listItem').run()) {
        editor.chain().focus().increaseIndent().run();
      }
      break;
    case 'outdent':
      if (!chain.liftListItem('listItem').run()) {
        editor.chain().focus().decreaseIndent().run();
      }
      break;
    case 'undo':
      chain.undo().run();
      break;
    case 'redo':
      chain.redo().run();
      break;
    case 'clean':
      chain.clearNodes().unsetAllMarks().run();
      break;
    case 'fontSize':
      // fontSize is handled by the picker, not a toggle button
      if (typeof value === 'string' && value) {
        editor.commands.setFontSize(value);
      }
      else {
        editor.commands.unsetFontSize();
      }
      break;
    default:
      console.warn(`[wpp-richtext] Unknown toolbar command: "${name}"`);
  }
}

const wppRichtextCss = "@charset \"UTF-8\";.ProseMirror{position:relative;outline:none;word-wrap:break-word;white-space:pre-wrap;white-space:break-spaces;-webkit-font-variant-ligatures:none;font-variant-ligatures:none;-webkit-font-feature-settings:\"liga\" 0;font-feature-settings:\"liga\" 0;min-height:var(--richtext-editor-min-height, 136px);padding:var(--richtext-padding, 12px 15px);overflow-y:auto;-moz-tab-size:4;-o-tab-size:4;tab-size:4;}.ProseMirror:focus{outline:none}.ProseMirror p.is-editor-empty:first-child::before{content:attr(data-placeholder);float:left;color:var(--richtext-placeholder-color, var(--wpp-grey-color-700));pointer-events:none;height:0}.ProseMirror p{margin:0}.ProseMirror p+p{margin-top:0}.ProseMirror strong,.ProseMirror b{font-weight:bold}.ProseMirror em,.ProseMirror i{font-style:italic}.ProseMirror h1,.ProseMirror h2,.ProseMirror h3,.ProseMirror h4,.ProseMirror h5,.ProseMirror h6{margin-top:0.5em;margin-bottom:0.25em;font-weight:bold}.ProseMirror h1:first-child,.ProseMirror h2:first-child,.ProseMirror h3:first-child,.ProseMirror h4:first-child,.ProseMirror h5:first-child,.ProseMirror h6:first-child{margin-top:0}.ProseMirror h1{font-size:2em}.ProseMirror h2{font-size:1.5em}.ProseMirror h3{font-size:1.17em}.ProseMirror blockquote{border-left:4px solid var(--wpp-grey-color-400);margin:0.5em 0;padding:0.5em 1em}.ProseMirror pre{background:var(--wpp-grey-color-100);border-radius:var(--wpp-border-radius-s);padding:0.75em 1em;overflow-x:auto}.ProseMirror pre code{background:none;padding:0;font-size:0.9em}.ProseMirror code{background:var(--wpp-grey-color-100);border-radius:3px;padding:0.15em 0.3em;font-size:0.9em}.ProseMirror .ql-size-2xs{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}.ProseMirror .ql-size-xs{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}.ProseMirror .ql-size-m{font-size:var(--wpp-typography-m-body-font-size, 16px);line-height:var(--wpp-typography-m-body-line-height, 24px);font-weight:var(--wpp-typography-m-body-font-weight, 400);color:var(--wpp-typography-m-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-body-letter-spacing, 0)}.ProseMirror .ql-size-l{font-size:var(--wpp-typography-l-body-font-size, 18px);line-height:var(--wpp-typography-l-body-line-height, 28px);font-weight:var(--wpp-typography-l-body-font-weight, 400);color:var(--wpp-typography-l-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-l-body-letter-spacing, 0)}.ProseMirror .ql-size-xl{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-2xl{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-3xl{font-size:var(--wpp-typography-3xl-heading-font-size, 28px);line-height:var(--wpp-typography-3xl-heading-line-height, 40px);font-weight:var(--wpp-typography-3xl-heading-font-weight, 400);color:var(--wpp-typography-3xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing, 0)}.ProseMirror .ql-size-4xl{font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);font-weight:var(--wpp-typography-4xl-display-font-weight, 400);color:var(--wpp-typography-4xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0)}.ProseMirror .ql-size-5xl{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0)}.ProseMirror li{margin:0;}.ProseMirror li>p{margin:0}.ProseMirror li:has(*.ql-size-2xs)::before{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-xs)::before{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-m)::before{font-size:var(--wpp-typography-m-body-font-size, 16px);line-height:var(--wpp-typography-m-body-line-height, 24px);font-weight:var(--wpp-typography-m-body-font-weight, 400);color:var(--wpp-typography-m-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-l)::before{font-size:var(--wpp-typography-l-body-font-size, 18px);line-height:var(--wpp-typography-l-body-line-height, 28px);font-weight:var(--wpp-typography-l-body-font-weight, 400);color:var(--wpp-typography-l-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-l-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-l-body-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-xl)::before{font-size:var(--wpp-typography-xl-heading-font-size, 20px);line-height:var(--wpp-typography-xl-heading-line-height, 32px);font-weight:var(--wpp-typography-xl-heading-font-weight, 400);color:var(--wpp-typography-xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-2xl)::before{font-size:var(--wpp-typography-2xl-heading-font-size, 24px);line-height:var(--wpp-typography-2xl-heading-line-height, 32px);font-weight:var(--wpp-typography-2xl-heading-font-weight, 400);color:var(--wpp-typography-2xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-3xl)::before{font-size:var(--wpp-typography-3xl-heading-font-size, 28px);line-height:var(--wpp-typography-3xl-heading-line-height, 40px);font-weight:var(--wpp-typography-3xl-heading-font-weight, 400);color:var(--wpp-typography-3xl-heading-color, var(--wpp-text-color));font-family:var(--wpp-typography-3xl-heading-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-3xl-heading-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-4xl)::before{font-size:var(--wpp-typography-4xl-display-font-size, 36px);line-height:var(--wpp-typography-4xl-display-line-height, 48px);font-weight:var(--wpp-typography-4xl-display-font-weight, 400);color:var(--wpp-typography-4xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-4xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-4xl-display-letter-spacing, 0)}.ProseMirror li:has(*.ql-size-5xl)::before{font-size:var(--wpp-typography-5xl-display-font-size, 48px);line-height:var(--wpp-typography-5xl-display-line-height, 62px);font-weight:var(--wpp-typography-5xl-display-font-weight, 400);color:var(--wpp-typography-5xl-display-color, var(--wpp-text-color));font-family:var(--wpp-typography-5xl-display-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-5xl-display-letter-spacing, 0)}.ProseMirror ul,.ProseMirror ol{padding-left:1.5em;margin:0.25em 0;list-style:none;}.ProseMirror ul[data-type=taskList],.ProseMirror ol[data-type=taskList]{padding-left:0}.ProseMirror ul:not([data-type=taskList])>li,.ProseMirror ol>li{position:relative;list-style-type:none;padding-left:1.5em}.ProseMirror ul:not([data-type=taskList])>li::before,.ProseMirror ol>li::before{position:absolute;left:0;width:1.2em;text-align:right;white-space:nowrap}.ProseMirror ul:not([data-type=taskList])>li::before{content:\"•\"}.ProseMirror ol{counter-reset:list-0}.ProseMirror ol>li{counter-increment:list-0}.ProseMirror ol>li::before{content:counter(list-0, decimal) \".\"}.ProseMirror ol ol{counter-reset:list-1}.ProseMirror ol ol>li{counter-increment:list-1}.ProseMirror ol ol>li::before{content:counter(list-1, lower-alpha) \".\"}.ProseMirror ol ol ol{counter-reset:list-2}.ProseMirror ol ol ol>li{counter-increment:list-2}.ProseMirror ol ol ol>li::before{content:counter(list-2, lower-roman) \".\"}.ProseMirror ul[data-type=taskList]{list-style:none;padding-left:0;margin:0.25em 0}.ProseMirror ul[data-type=taskList]>li{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:0.5em;margin:0}.ProseMirror ul[data-type=taskList]>li>label{-ms-flex:0 0 auto;flex:0 0 auto;margin-top:0.2em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ProseMirror ul[data-type=taskList]>li>label input[type=checkbox]{cursor:pointer;accent-color:var(--wpp-primary-color-500)}.ProseMirror ul[data-type=taskList]>li>div{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0}.ProseMirror ul[data-type=taskList]>li>div>p{margin:0}.ProseMirror a{color:var(--wpp-primary-color-500);text-decoration:underline;cursor:pointer}.ProseMirror img{display:inline;vertical-align:middle;max-width:100%;height:auto}.ProseMirror img.ProseMirror-selectednode{outline:2px solid var(--wpp-brand-color)}.ProseMirror .richtext-image{display:inline;vertical-align:middle;max-width:100%}.ProseMirror hr{border:none;border-top:2px solid var(--wpp-grey-color-300);margin:1em 0}.ProseMirror hr.ProseMirror-selectednode{border-top-color:var(--wpp-brand-color)}.ProseMirror table{border-collapse:collapse;width:100%;margin:0.5em 0;overflow:hidden}.ProseMirror table td,.ProseMirror table th{border:1px solid var(--wpp-grey-color-400);padding:0.5em;min-width:100px;vertical-align:top;position:relative}.ProseMirror table th{background:var(--wpp-grey-color-100);font-weight:bold}.ProseMirror table .selectedCell::after{z-index:2;position:absolute;content:\"\";inset:0;background:rgba(200, 200, 255, 0.4);pointer-events:none}.ProseMirror .text-align-left{text-align:left}.ProseMirror .text-align-center{text-align:center}.ProseMirror .text-align-right{text-align:right}.ProseMirror .text-align-justify{text-align:justify}.ProseMirror .ProseMirror-dropcursor{position:absolute;height:2px;background:var(--wpp-brand-color)}.ProseMirror .ProseMirror-gapcursor{display:none;pointer-events:none;position:absolute}.ProseMirror .ProseMirror-gapcursor::after{content:\"\";display:block;position:absolute;top:-2px;width:20px;border-top:1px solid black;-webkit-animation:ProseMirror-cursor-blink 1.1s steps(2) infinite;animation:ProseMirror-cursor-blink 1.1s steps(2) infinite}.ProseMirror.ProseMirror-focused .ProseMirror-gapcursor{display:block}.ProseMirror img[style*=\"float: left\"],.ProseMirror img[data-align=left],.ProseMirror img.ql-float-left{float:left;margin-right:var(--richtext-float-gap, 1em);margin-bottom:0.5em}.ProseMirror img[style*=\"float: right\"],.ProseMirror img[data-align=right],.ProseMirror img.ql-float-right{float:right;margin-left:var(--richtext-float-gap, 1em);margin-bottom:0.5em}.ProseMirror img[data-align=center],.ProseMirror img.ql-float-center{display:block;margin-left:auto;margin-right:auto}.ProseMirror .richtext-video-wrapper{position:relative;max-width:100%;margin:0.5em 0;line-height:0}.ProseMirror .richtext-video-wrapper video{max-width:100%;min-width:200px;min-height:150px;height:auto;display:block;pointer-events:auto}.ProseMirror .richtext-video-wrapper.ProseMirror-selectednode{outline:2px solid var(--wpp-primary-color-500);outline-offset:2px;border-radius:2px}.ProseMirror video:not(.richtext-video-wrapper video){max-width:100%;min-width:200px;min-height:150px;height:auto;display:block;margin:0.5em 0;pointer-events:auto}.ProseMirror a.ql-attachment{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:4px;padding:4px 8px;margin:2px 0;border:1px solid var(--wpp-grey-color-300);border-radius:var(--wpp-border-radius-s);background:var(--wpp-grey-color-100);color:var(--wpp-primary-color-500);text-decoration:none;font-size:0.9em;cursor:pointer}.ProseMirror a.ql-attachment:hover{background:var(--wpp-grey-color-200)}.ProseMirror a.ql-attachment::before{content:\"📎\";font-size:1em}@-webkit-keyframes ProseMirror-cursor-blink{to{visibility:hidden}}@keyframes ProseMirror-cursor-blink{to{visibility:hidden}}.richtext-uploading-image{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-height:60px;background:var(--wpp-grey-color-100);border:1px dashed var(--wpp-grey-color-400);border-radius:var(--wpp-border-radius-s);margin:0.5em 0}.richtext-uploading-image .richtext-upload-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;padding:12px}.richtext-uploading-image .richtext-upload-spinner{width:20px;height:20px;border:2px solid var(--wpp-grey-color-300);border-top-color:var(--wpp-brand-color);border-radius:50%;-webkit-animation:richtext-spin 0.8s linear infinite;animation:richtext-spin 0.8s linear infinite}.richtext-uploading-image .richtext-upload-error-icon{color:var(--wpp-danger-color-500);font-size:20px}.richtext-uploading-image .richtext-upload-filename{font-size:0.85em;color:var(--wpp-grey-color-700)}.richtext-uploading-image.richtext-upload-error{border-color:var(--wpp-danger-color-400);background:var(--wpp-danger-color-50)}@-webkit-keyframes richtext-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes richtext-spin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.richtext-image-overlay{position:absolute;z-index:10;border:2px solid var(--wpp-brand-color);pointer-events:none}.richtext-image-overlay .richtext-resize-handle{position:absolute;width:10px;height:10px;background:var(--wpp-brand-color);border:1px solid white;pointer-events:auto;z-index:11}.richtext-image-overlay .richtext-resize-handle.richtext-resize-nw{top:-5px;left:-5px;cursor:nw-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-ne{top:-5px;right:-5px;cursor:ne-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-sw{bottom:-5px;left:-5px;cursor:sw-resize}.richtext-image-overlay .richtext-resize-handle.richtext-resize-se{bottom:-5px;right:-5px;cursor:se-resize}.richtext-image-overlay .richtext-image-toolbar{position:absolute;top:-40px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);display:-ms-flexbox;display:flex;gap:2px;padding:4px;background:var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-s);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);pointer-events:auto;white-space:nowrap}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:28px;height:28px;border:none;background:transparent;border-radius:var(--wpp-border-radius-s);cursor:pointer;font-size:14px;color:var(--wpp-grey-color-600)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn:hover{background:var(--wpp-grey-color-200);color:var(--wpp-grey-color-800)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn.richtext-image-delete-btn{color:var(--wpp-danger-color-500)}.richtext-image-overlay .richtext-image-toolbar .richtext-image-toolbar-btn.richtext-image-delete-btn:hover{background:var(--wpp-danger-color-50)}.ql-toolbar.ql-wpp{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center;gap:4px;height:32px;padding:4px 12px;-webkit-box-shadow:inset 0 -1px 0 var(--richtext-border-color, var(--wpp-grey-color-500));box-shadow:inset 0 -1px 0 var(--richtext-border-color, var(--wpp-grey-color-500))}.ql-toolbar.ql-wpp::after{clear:both;content:\"\";display:table}.ql-toolbar.ql-wpp .ql-formats{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:4px;position:relative;padding:0}.ql-toolbar.ql-wpp .ql-formats:not(:last-of-type){padding-right:12px}.ql-toolbar.ql-wpp .ql-formats:not(:last-of-type)::after{content:\" \";display:block;position:absolute;right:4px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);width:1px;height:20px;background:var(--wpp-grey-color-300)}.ql-toolbar.ql-wpp button{background:none;border:none;cursor:pointer;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:24px;height:24px;padding:2px;border-radius:var(--wpp-border-radius-s);font-family:inherit;font-size:14px;color:var(--richtext-button-inactive-color, var(--wpp-grey-color-600));-webkit-transition:color 0.15s;transition:color 0.15s}.ql-toolbar.ql-wpp button:hover{color:var(--richtext-button-inactive-hover-color, var(--wpp-grey-color-700))}.ql-toolbar.ql-wpp button:active:hover{color:var(--richtext-button-inactive-click-color, var(--wpp-grey-color-800));outline:none}.ql-toolbar.ql-wpp button.ql-active{color:var(--richtext-button-active-color, var(--wpp-primary-color-500))}.ql-toolbar.ql-wpp button.ql-active:hover{color:var(--richtext-button-active-hover-color, var(--wpp-primary-color-400))}.ql-toolbar.ql-wpp button.ql-active:active{color:var(--richtext-button-active-click-color, var(--wpp-primary-color-600))}.ql-toolbar.ql-wpp button:disabled{cursor:not-allowed;opacity:0.4}.ql-toolbar.ql-wpp button svg{float:left;height:100%}.image-actions__proxy-image{display:none}.ql-toolbar.ql-wpp .ql-size-menu{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;vertical-align:middle}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger{--wpp-action-button-secondary-bg-color:transparent;--wpp-action-button-secondary-border-color:transparent;--wpp-action-button-opacity-hover:0;--wpp-action-button-opacity-active:0;width:56px;min-width:56px;font-size:13px;font-weight:500}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger::part(button){width:100%}.ql-toolbar.ql-wpp .ql-size-menu .ql-size-trigger::part(body){width:100%;-ms-flex-pack:justify;justify-content:space-between}.ql-tooltip{position:absolute;z-index:5;min-width:250px;padding:var(--richtext-tooltip-padding);border-radius:var(--wpp-border-radius-s);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--richtext-tooltip-bg-color);color:var(--richtext-tooltip-color);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);-webkit-transform:translateY(10px);transform:translateY(10px);}.ql-tooltip.ql-flip{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.ql-tooltip .ql-tooltip-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap}.ql-tooltip .ql-tooltip-wrapper::before{content:\"Visit URL:\";line-height:32px;white-space:nowrap}.ql-tooltip .ql-tooltip-wrapper a.ql-preview{max-width:100%;word-break:break-all;overflow-wrap:anywhere;line-height:32px;color:var(--wpp-primary-color-500);text-decoration:none;cursor:pointer}.ql-tooltip .ql-tooltip-wrapper a.ql-preview:hover{text-decoration:underline}.ql-tooltip .ql-tooltip-wrapper .ql-action-buttons{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;gap:8px}.ql-tooltip .ql-tooltip-wrapper .ql-action-buttons .wpp-action-button{white-space:nowrap}.ql-tooltip.ql-editing .ql-tooltip-wrapper{-ms-flex-direction:row;flex-direction:row;gap:8px}.ql-tooltip.ql-editing .ql-tooltip-wrapper::before{content:\"Enter link:\"}.ql-tooltip.ql-editing .ql-tooltip-wrapper a.ql-preview,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-action-buttons,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-delete,.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-edit{display:none}.ql-tooltip.ql-editing .ql-tooltip-wrapper wpp-input{min-width:180px;-ms-flex:1;flex:1}.ql-tooltip.ql-editing .ql-tooltip-wrapper .ql-action.ql-save{white-space:nowrap}.ql-tooltip:not(.ql-editing) .ql-tooltip-wrapper wpp-input,.ql-tooltip:not(.ql-editing) .ql-tooltip-wrapper .ql-save{display:none}.wpp-richtext{--richtext-padding:var(--wpp-richtext-padding, 12px 15px);--richtext-label-color:var(--wpp-richtext-label-color, var(--wpp-text-color-info));--richtext-characters-limit-label-color:var(--wpp-richtext-characters-limit-label-color, var(--wpp-grey-color-800));--richtext-label-margin:var(--wpp-richtext-label-margin, 0 0 8px 0);--richtext-inline-message-margin:var(--wpp-richtext-inline-message-margin, 4px 0 0 0);--richtext-placeholder-color:var(--wpp-richtext-placeholder-color, var(--wpp-grey-color-700));--richtext-text-color-disabled:var(--wpp-richtext-text-color-disabled, var(--wpp-text-color-disabled));--richtext-characters-limit-font-weight:var(--wpp-richtext-characters-limit-font-weight, 400);--richtext-warning-charecters-limit-color:var(--wpp-richtext-border-radius, var(--wpp-warning-color-500));--richtext-error-charecters-limit-color:var(--wpp-richtext-border-radius, var(--wpp-danger-color-500));--richtext-bg-color:var(--wpp-richtext-bg-color, transparent);--richtext-bg-color-hover:var(--wpp-richtext-bg-color-hover, var(--wpp-grey-color-200));--richtext-bg-color-active:var(--wpp-richtext-bg-color-active, transparent);--richtext-bg-color-disabled:var(--wpp-richtext-bg-color-disabled, var(--wpp-grey-color-100));--counter-first-border-color-focus:var(--wpp-counter-first-border-color-focus, var(--wpp-grey-color-000));--counter-second-border-color-focus:var(--wpp-counter-second-border-color-focus, var(--wpp-brand-color));--richtext-border-width:var(--wpp-richtext-border-width, var(--wpp-border-width-s));--richtext-border-style:var(--wpp-richtext-border-style, solid);--richtext-border-radius:var(--wpp-richtext-border-radius, var(--wpp-border-radius-m));--richtext-border-color:var(--wpp-richtext-border-color, var(--wpp-grey-color-500));--richtext-border-color-hover:var(--wpp-richtext-border-color-hover, var(--wpp-grey-color-700));--richtext-border-color-active:var(--wpp-richtext-border-color-active, var(--wpp-grey-color-800));--richtext-border-color-disabled:var(--wpp-richtext-border-color-disabled, var(--wpp-grey-color-400));--richtext-first-border-color-focus:var(--wpp-richtext-first-border-color-focus, var(--wpp-grey-color-000));--richtext-second-border-color-focus:var(--wpp-richtext-second-border-color-focus, var(--wpp-brand-color));--richtext-toolbar-outline-color:var(--wpp-richtext-toolbar-outline-color, var(--wpp-brand-color));--richtext-warning-border-color:var(--wpp-richtext-warning-border-color, var(--wpp-warning-color-400));--richtext-error-border-color:var(--wpp-richtext-error-border-color, var(--wpp-danger-color-400));--richtext-tooltip-padding:var(--wpp-richtext-tooltip-padding, 5px 12px);--richtext-tooltip-color:var(--wpp-richtext-tooltip-color, var(--wpp-typography-color));--richtext-tooltip-bg-color:var(--wpp-richtext-tooltip-bg-color, var(--wpp-grey-color-000));--richtext-button-inactive-color:var(--wpp-grey-color-600);--richtext-button-inactive-hover-color:var(--wpp-grey-color-700);--richtext-button-inactive-click-color:var(--wpp-grey-color-800);--richtext-button-active-color:var(--wpp-primary-color-500);--richtext-button-active-hover-color:var(--wpp-primary-color-400);--richtext-button-active-click-color:var(--wpp-primary-color-600);--richtext-button-background-color:var(--wpp-grey-color-000);--richtext-editor-min-width:var(--wpp-richtext-editor-min-width, 376px);--richtext-float-gap:1em;--richtext-editor-min-height:var(--wpp-richtext-editor-min-height, 136px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:var(--richtext-editor-min-width)}.wpp-richtext .label{margin:var(--richtext-label-margin)}.wpp-richtext .ql-form-control{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-height:0;min-width:var(--richtext-editor-min-width)}.wpp-richtext .ql-form-control.tab-focus.tab-focus{border-radius:var(--wpp-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--richtext-first-border-color-focus), 0 0 0 3px var(--richtext-second-border-color-focus);box-shadow:0 0 0 1px var(--richtext-first-border-color-focus), 0 0 0 3px var(--richtext-second-border-color-focus)}.wpp-richtext .ql-form-control,.wpp-richtext .ql-form-control .tiptap-editor-container{border:var(--richtext-border-width) var(--richtext-border-style) var(--richtext-border-color);border-radius:var(--richtext-border-radius)}.wpp-richtext .ql-form-control>slot-fb{display:contents}.wpp-richtext .ql-form-control .tiptap-editor-container{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-height:var(--richtext-editor-min-height);overflow:hidden;border-left:none;border-right:none;border-top-width:0;border-bottom-width:0}.wpp-richtext .ql-form-control:hover:not(.active),.wpp-richtext .ql-form-control:hover:not(.active) .tiptap-editor-container{border-color:var(--richtext-border-color-hover)}.wpp-richtext .ql-form-control:hover:not(.active) .tiptap-editor-container{background-color:var(--wpp-grey-color-200)}.wpp-richtext .ql-form-control.active,.wpp-richtext .ql-form-control.active .tiptap-editor-container{border-color:var(--richtext-border-color-active)}.wpp-richtext .ql-form-control.warning,.wpp-richtext .ql-form-control.warning:hover{border:var(--richtext-border-width) var(--richtext-border-style) var(--wpp-warning-color-400)}.wpp-richtext .ql-form-control.error,.wpp-richtext .ql-form-control.error:hover{border:var(--richtext-border-width) var(--richtext-border-style) var(--wpp-danger-color-400)}.wpp-richtext .ql-form-control.disabled *,.wpp-richtext .ql-form-control.disabled .ProseMirror.is-editor-empty::before,.wpp-richtext .ql-form-control.disabled:hover *,.wpp-richtext .ql-form-control.disabled:hover .ProseMirror.is-editor-empty::before{cursor:not-allowed;color:var(--richtext-text-color-disabled)}.wpp-richtext .ql-form-control.disabled,.wpp-richtext .ql-form-control.disabled .tiptap-editor-container,.wpp-richtext .ql-form-control.disabled:hover,.wpp-richtext .ql-form-control.disabled:hover .tiptap-editor-container{border-color:var(--richtext-border-color-disabled)}.wpp-richtext .ql-form-control.disabled .tiptap-editor-container,.wpp-richtext .ql-form-control.disabled:hover .tiptap-editor-container{background-color:var(--richtext-bg-color-disabled)}.wpp-richtext .ql-form-control.warning,.wpp-richtext .ql-form-control.warning:hover{border-color:var(--richtext-warning-border-color)}.wpp-richtext .ql-form-control.error,.wpp-richtext .ql-form-control.error:hover{border-color:var(--richtext-error-border-color)}.wpp-richtext .ql-form-control .form-control-input{position:absolute;left:0;bottom:0;z-index:0;opacity:0;pointer-events:none}.wpp-richtext .ProseMirror{overflow-y:auto}.wpp-richtext .messages-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;margin:var(--richtext-inline-message-margin)}.wpp-richtext .messages-wrapper.without-text-message{-ms-flex-pack:end;justify-content:flex-end}.wpp-richtext .characters-limit{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin-left:32px}.wpp-richtext .characters-limit.warning .wpp-typography{color:var(--richtext-warning-charecters-limit-color)}.wpp-richtext .characters-limit.warning .wpp-typography:first-child::part(typography){color:var(--richtext-warning-charecters-limit-color)}.wpp-richtext .characters-limit.error .wpp-typography{color:var(--richtext-error-charecters-limit-color)}.wpp-richtext .characters-limit.error .wpp-typography:first-child::part(typography){color:var(--richtext-error-charecters-limit-color)}.wpp-richtext .characters-limit .wpp-typography:first-child{--wpp-typography-color:$labelColor;white-space:nowrap}.wpp-richtext .characters-limit .wpp-typography:first-child::part(typography){color:var(--richtext-characters-limit-label-color);font-weight:var(--richtext-characters-limit-font-weight)}.wpp-richtext .characters-limit .entered-characters{margin-left:2px;white-space:nowrap}.preserve-whitespace,.preserve-whitespace .ProseMirror{white-space:pre-wrap;word-break:break-word}.wpp-richtext[data-wpp-theme=dark] .ql-form-control .tiptap-editor-container{color:var(--wpp-text-color)}";

const WppRichtext = class {
  constructor(hostRef) {
    index$1.registerInstance(this, hostRef);
    this.wppInit = index$1.createEvent(this, "wppInit", 1);
    this.wppChange = index$1.createEvent(this, "wppChange", 1);
    this.wppSelectionChange = index$1.createEvent(this, "wppSelectionChange", 1);
    this.wppFocus = index$1.createEvent(this, "wppFocus", 1);
    this.wppBlur = index$1.createEvent(this, "wppBlur", 1);
    this.wppUploadRequest = index$1.createEvent(this, "wppUploadRequest", 5);
    this._locales = tiptapConfig.LOCALES_DEFAULTS;
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.linkPromptRange = null;
    this.tiptapEditor = null;
    this.initTimerId = null;
    this.savedSelectionRange = null;
    this.previousSelectionRange = null;
    this.onFocusIn = (event) => {
      if (!this.active) {
        this.active = true;
        this.wppFocus.emit(event);
      }
    };
    this.onFocusOut = (event) => {
      const isInternalBlur = !event.relatedTarget || this.host.contains(event.relatedTarget);
      if (!isInternalBlur) {
        this.active = false;
        this.focusType = common.FOCUS_TYPE.NONE;
        this.wppBlur.emit(event);
      }
      else {
        event.preventDefault();
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = common.FOCUS_TYPE.TAB;
      }
    };
    this.onMouseDown = (e) => {
      this.focusType = common.FOCUS_TYPE.NONE;
      if (this.disabled) {
        e.preventDefault();
      }
    };
    /**
     * Close the link tooltip when clicking outside the tooltip element.
     * Mirrors original Quill behaviour where clicking anywhere outside the
     * tooltip dismisses it.
     */
    this.onDocumentMouseDown = (e) => {
      if (!this.linkPromptOpen)
        return;
      const tooltipEl = this.host.querySelector('.ql-tooltip');
      const target = e.target;
      const inside = !!(tooltipEl && target && tooltipEl.contains(target));
      if (tooltipEl && !inside) {
        this.closeLinkPrompt();
      }
    };
    this.onEditorBlur = () => {
      if (this.tiptapEditor) {
        const { from, to } = this.tiptapEditor.state.selection;
        this.savedSelectionRange = { from, to, index: from, length: to - from };
      }
    };
    this.onEditorFocus = () => {
      if (this.focusType === common.FOCUS_TYPE.TAB && this.savedSelectionRange && this.tiptapEditor) {
        try {
          this.tiptapEditor.commands.setTextSelection(this.savedSelectionRange);
        }
        catch {
          // Selection might be out of bounds if content changed
        }
      }
    };
    this.updateEnteredCharacters = () => {
      if (this.charactersLimit && this.tiptapEditor) {
        this.enteredCharacters = this.tiptapEditor.state.doc.textContent.length;
      }
    };
    this.onToolbarAction = (actionName) => {
      if (!this.tiptapEditor || this.disabled)
        return;
      if (actionName === 'image' || actionName === 'video' || actionName === 'attachment') {
        // Emit the upload request — the consumer is responsible for opening
        // a file picker and calling the callback with upload items.
        // We do NOT open a file picker here to avoid double-dialog issues.
        const detail = {
          type: actionName,
          callback: items => {
            items.forEach(item => {
              if (!this.tiptapEditor)
                return;
              const uploadId = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
              this.tiptapEditor.commands.insertUploadingImage(uploadId, item.file, actionName);
              item.promise
                .then(url => {
                if (!this.tiptapEditor)
                  return;
                if (actionName === 'video') {
                  // Replace the uploading placeholder with a video node
                  this.replaceUploadingNode(uploadId, () => this.tiptapEditor.state.schema.nodes.video?.create({ src: url }));
                }
                else {
                  this.tiptapEditor.commands.resolveUploadingImage(uploadId, url);
                }
              })
                .catch(() => {
                this.tiptapEditor?.commands.failUploadingImage(uploadId);
              });
            });
          },
        };
        this.wppUploadRequest.emit(detail);
        return;
      }
      if (actionName === 'link') {
        const isActiveLink = this.tiptapEditor.isActive('link');
        const { from, to } = this.tiptapEditor.state.selection;
        if (isActiveLink) {
          executeToolbarCommand(this.tiptapEditor, 'link');
        }
        else {
          if (from === to) {
            return;
          }
          // Save the selection range and open the inline link UI.
          this.linkPromptRange = { from, to };
          this.linkPromptValue = '';
          this.linkPromptPreviewHref = '';
          this.linkPromptMode = 'edit';
          this.linkPromptPosition = this.computeLinkPromptPosition(from, to);
          this.linkPromptOpen = true;
        }
        this.updateToolbarActiveFormats(this.tiptapEditor);
        return;
      }
      executeToolbarCommand(this.tiptapEditor, actionName);
      this.updateToolbarActiveFormats(this.tiptapEditor);
    };
    this.onFontSizeChange = (size) => {
      if (!this.tiptapEditor || this.disabled)
        return;
      this.tiptapEditor.chain().focus().run();
      executeToolbarCommand(this.tiptapEditor, 'fontSize', size || null);
      this.updateToolbarActiveFormats(this.tiptapEditor);
    };
    this.onLinkPromptInput = (event) => {
      const detail = event.detail;
      const target = event.target;
      // wpp-input emits a wppChange CustomEvent with detail.value; native input emits Event with target.value
      if (detail && typeof detail.value !== 'undefined') {
        this.linkPromptValue = detail.value ?? '';
      }
      else {
        this.linkPromptValue = target?.value ?? '';
      }
    };
    /** Switch the link tooltip from view → edit mode. */
    this.onLinkPromptEdit = () => {
      this.linkPromptMode = 'edit';
    };
    /** Remove the link mark from the current range and close the tooltip. */
    this.onLinkPromptDelete = () => {
      if (!this.tiptapEditor || !this.linkPromptRange) {
        this.closeLinkPrompt();
        return;
      }
      const { from, to } = this.linkPromptRange;
      this.tiptapEditor.chain().focus().setTextSelection({ from, to }).unsetLink().run();
      this.updateToolbarActiveFormats(this.tiptapEditor);
      this.closeLinkPrompt();
    };
    this.onLinkPromptSave = () => {
      if (!this.tiptapEditor || !this.linkPromptRange) {
        this.closeLinkPrompt();
        return;
      }
      const url = this.linkPromptValue.trim();
      if (url) {
        const { from, to } = this.linkPromptRange;
        this.tiptapEditor.chain().focus().setTextSelection({ from, to }).setLink({ href: url }).run();
        this.updateToolbarActiveFormats(this.tiptapEditor);
      }
      this.closeLinkPrompt();
    };
    this.onLinkPromptCancel = () => {
      this.closeLinkPrompt();
    };
    this.onLinkPromptKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.onLinkPromptSave();
      }
      else if (event.key === 'Escape') {
        event.preventDefault();
        this.onLinkPromptCancel();
      }
    };
    this.fontSizeDropdownConfig = {
      onShow: () => {
        this.isFontSizePickerOpen = true;
      },
      onHide: () => {
        this.isFontSizePickerOpen = false;
      },
    };
    this.hostCssClasses = () => ({
      'wpp-richtext': true,
    });
    this.formControlCssClasses = () => ({
      'ql-form-control': true,
      active: this.active,
      [tiptapConfig.KEYBOARD_FOCUS_CLASS]: this.active && this.focusType === common.FOCUS_TYPE.TAB,
      [`${this.messageType}`]: Boolean(this.messageType),
      disabled: this.disabled,
    });
    this.hasWarning = () => {
      if (!this.charactersLimit)
        return false;
      if (this.enteredCharacters < this.warningThreshold)
        return false;
      if (this.enteredCharacters > this.charactersLimit)
        return false;
      return true;
    };
    this.charLimitCssClasses = () => ({
      'characters-limit': true,
      warning: this.hasWarning(),
      error: Boolean(this.charactersLimit && this.enteredCharacters > this.charactersLimit),
    });
    this.messageCssClasses = () => ({
      'messages-wrapper': true,
      'without-text-message': !!this.charactersLimit && !this.message,
    });
    this.focusType = undefined;
    this.enteredCharacters = undefined;
    this.plainText = '';
    this.toolbarActiveFormats = {};
    this.parsedToolbarItems = [];
    this.activeFontSize = '';
    this.isFontSizePickerOpen = false;
    this.linkPromptOpen = false;
    this.linkPromptMode = 'edit';
    this.linkPromptValue = '';
    this.linkPromptPreviewHref = '';
    this.linkPromptPosition = { top: 0, left: 0, flip: false };
    this.name = undefined;
    this.required = false;
    this.disabled = false;
    this.autoFocus = false;
    this.tooltipConfig = {};
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.message = undefined;
    this.messageType = undefined;
    this.maxMessageLength = undefined;
    this.charactersLimit = undefined;
    this.locales = {};
    this.warningThreshold = 20;
    this.active = false;
    this.format = index.formats.html;
    this.preserveWhitespace = true;
    this.bounds = undefined;
    this.debug = index.debugLevels.warn;
    this.value = undefined;
    this.formats = [];
    this.modules = undefined;
    this.placeholder = 'Insert text here...';
    this.scrollingContainer = undefined;
    this.strict = true;
    this.styles = '{}';
  }
  syncValueAndEmit(source) {
    const newValue = this.getValue();
    if (newValue !== this.value) {
      this.value = newValue;
      if (this.formControlInput) {
        this.formControlInput.value = this.value;
      }
      if (this.format === index.formats.markdown) {
        this.plainText = this.tiptapEditor ? tiptapConfig.extractPlainText(this.tiptapEditor.state.doc) : '';
      }
      else {
        this.plainText = this.value || '';
      }
      this.wppChange.emit({
        value: this.value,
        plainText: this.plainText,
        editor: this.tiptapEditor,
        source,
        name: this.name,
      });
    }
  }
  setValue(value) {
    if (!this.tiptapEditor)
      return;
    const noEmitOpts = { emitUpdate: false };
    const noEmitPreserveOpts = { ...noEmitOpts, parseOptions: { preserveWhitespace: 'full' } };
    if (this.format === index.formats.html) {
      this.tiptapEditor.commands.setContent(tiptapConfig.normalizeEmptyParagraphs(String(value || '')), noEmitPreserveOpts);
    }
    else if (this.format === index.formats.markdown) {
      const str = String(value || '');
      this.plainText = '';
      // `MarkdownManager.parse('')` produces `{ type: 'doc', content: [] }`
      // which violates the ProseMirror schema and causes `setContent` to
      // silently keep the previous document. Route empties through the
      // plain content path so the editor actually clears.
      if (!str) {
        this.tiptapEditor.commands.setContent('', noEmitOpts);
      }
      else {
        this.tiptapEditor.commands.setContent(str, { ...noEmitPreserveOpts, contentType: 'markdown' });
      }
      this.plainText = tiptapConfig.extractPlainText(this.tiptapEditor.state.doc);
    }
    else if (this.format === index.formats.text) {
      // For plain text, wrap in a paragraph
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
    else if (this.format === index.formats.json) {
      try {
        const content = JSON.parse(value);
        this.tiptapEditor.commands.setContent(content, noEmitOpts);
      }
      catch {
        const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
      }
    }
    else {
      const escaped = (value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      this.tiptapEditor.commands.setContent(`<p>${escaped}</p>`, noEmitOpts);
    }
  }
  getValue() {
    if (!this.tiptapEditor)
      return '';
    const html = this.tiptapEditor.getHTML();
    const text = this.tiptapEditor.state.doc.textContent;
    // Only treat the canonical empty document (a single empty paragraph) as
    // empty. Tiptap's `editor.isEmpty` returns `true` for any doc whose
    // textContent is empty — including `<ul><li><p></p></li></ul>` after
    // toggling a list on a blank editor — which used to silently erase the
    // list markup from the emitted value. Pavlo's QA expects an empty list
    // to round-trip as the literal `<ol><li><br></li></ol>` /
    // `<ul><li><br></li></ul>` so the value matches the production Quill
    // editor's behaviour.
    const doc = this.tiptapEditor.state.doc;
    const isCanonicalEmpty = doc.childCount === 1 && doc.firstChild?.type.name === 'paragraph' && doc.firstChild.content.size === 0;
    if (isCanonicalEmpty) {
      return '';
    }
    if (this.format === index.formats.html) {
      return tiptapConfig.normalizeListHtml(html);
    }
    else if (this.format === index.formats.markdown) {
      return this.tiptapEditor.getMarkdown();
    }
    else if (this.format === index.formats.text) {
      return text;
    }
    else if (this.format === index.formats.json) {
      try {
        return JSON.stringify(this.tiptapEditor.getJSON());
      }
      catch {
        return text;
      }
    }
    else {
      return text;
    }
  }
  /**
   * Internal logger gated by the `debug` prop. Mirrors the verbosity ordering
   * Quill used so consumers that previously set `debug="info"` still see the
   * full stream of internal messages, while the default `warn` keeps the
   * console quiet for production usage.
   *
   * Order (most → least verbose): `info` > `log` > `warn` > `error`. A message
   * is printed only when its severity is at or below the configured level.
   */
  debugLog(level, ...args) {
    const order = [index.debugLevels.error, index.debugLevels.warn, index.debugLevels.log, index.debugLevels.info];
    const allowed = order.indexOf(this.debug);
    const requested = order.indexOf(level);
    if (allowed < 0 || requested < 0 || requested > allowed)
      return;
    console[level](`[wpp-richtext]`, ...args);
  }
  componentDidLoad() {
    try {
      if (this.modules) {
        JSON.parse(this.modules);
      }
    }
    catch (err) {
      this.debugLog(index.debugLevels.error, 'failed to parse "modules" attribute', err);
      throw new Error('Cannot parse "modules" attribute');
    }
    // Build extensions from configuration
    const extensions = [
      ...tiptapConfig.buildTiptapExtensions({
        formats: this.formats,
        placeholder: this.placeholder,
        charactersLimit: this.charactersLimit,
      }),
      // Custom extensions
      UploadingImage,
      TiptapImageUpload,
      TiptapImageActions,
      tiptapConfig.TiptapMarkdownShortcuts,
    ];
    // Only add upload extensions if modules enable them
    // (They are always registered but only activate on paste/drop)
    this.tiptapEditor = new index.Editor({
      element: this.containerElement,
      extensions,
      content: '',
      editable: !this.disabled,
      autofocus: this.autoFocus ? 'end' : false,
      injectCSS: false,
      onCreate: () => {
        // no-op; link detection is handled in onSelectionUpdate
      },
      onUpdate: ({ editor: _updateEditor, transaction }) => {
        if (transaction.docChanged) {
          this.updateEnteredCharacters();
          this.updateToolbarActiveFormats(_updateEditor);
          // Never emit the value while upload placeholders exist in the doc.
          // The uploadingImage node's renderHTML produces raw preview markup
          // (e.g. <video> without controls) that downstream consumers
          // (wpp-richtext-view) would parse incorrectly. Wait until all
          // uploads resolve/fail before syncing the value.
          let hasUploadingNodes = false;
          _updateEditor.state.doc.descendants(node => {
            if (node.type.name === 'uploadingImage') {
              hasUploadingNodes = true;
            }
            return !hasUploadingNodes; // short-circuit
          });
          if (hasUploadingNodes)
            return;
          this.syncValueAndEmit(index.sources.user);
        }
      },
      onSelectionUpdate: ({ editor }) => {
        const { from, to } = editor.state.selection;
        this.updateToolbarActiveFormats(editor);
        // Quill behaviour: on cursor placement (collapsed selection, user action),
        // detect if the cursor is inside a link. If so, show view-mode tooltip.
        // Otherwise close any open tooltip.
        this.handleSelectionLinkDetection(editor, from, to);
        this.wppSelectionChange.emit({
          editor,
          range: { from, to, index: from, length: to - from },
          oldRange: this.previousSelectionRange,
          source: index.sources.user,
        });
        this.previousSelectionRange = { from, to, index: from, length: to - from };
      },
      onFocus: ({ event: _event }) => {
        this.onEditorFocus();
      },
      onBlur: ({ event: _event }) => {
        this.onEditorBlur();
      },
    });
    const el = this.host;
    el.editor = this.tiptapEditor;
    el.format = this.format;
    el.name = this.name;
    this.host.addEventListener(tiptapConfig.KEYBOARD_FOCUS_EVENT, () => {
      this.focusType = common.FOCUS_TYPE.TAB;
    });
    if (this.styles) {
      try {
        const styles = JSON.parse(this.styles);
        Object.keys(styles).forEach((key) => {
          this.containerElement.style.setProperty(key, styles[key]);
        });
      }
      catch {
        // styles parse error — ignore
      }
    }
    if (this.value) {
      this.setValue(this.value);
      // Clear undo history so initial setValue is not undoable
      // Tiptap v3 has no clearHistory command; dispatch a fresh historyless state
      const { tr } = this.tiptapEditor.state;
      tr.setMeta('addToHistory', false);
      this.tiptapEditor.view.dispatch(tr);
    }
    this.updateEnteredCharacters();
    this.host.addEventListener('focusin', this.onFocusIn);
    this.host.addEventListener('focusout', this.onFocusOut);
    this.host.addEventListener('keyup', this.onKeyUp);
    this.host.addEventListener('mousedown', this.onMouseDown);
    // Close the link tooltip when clicking outside the tooltip element.
    document.addEventListener('mousedown', this.onDocumentMouseDown);
    // Listen for upload request events from the upload plugin
    this.host.addEventListener(tiptapTypes.TIPTAP_UPLOAD_REQUEST_EVENT, ((e) => {
      e.stopPropagation();
      e.preventDefault();
      this.wppUploadRequest.emit(e.detail);
    }));
    this.formControlInput?.addEventListener('focus', () => {
      this.tiptapEditor?.commands.focus();
    });
    if (this.autoFocus && this.tiptapEditor.view?.dom) {
      utils.autoFocusElement(this.autoFocus, this.tiptapEditor.view.dom);
    }
    this.updateDisabled(this.disabled);
    this.initTimerId = setTimeout(() => {
      this.wppInit.emit(this.tiptapEditor);
      this.debugLog(index.debugLevels.info, 'editor initialised', {
        format: this.format,
        formats: this.formats,
        disabled: this.disabled,
      });
      this.initTimerId = null;
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.initTimerId !== null) {
      clearTimeout(this.initTimerId);
      this.initTimerId = null;
    }
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
    this.tiptapEditor?.destroy();
    this.tiptapEditor = null;
  }
  updateContent(newValue) {
    const value = this.getValue();
    this.updateEnteredCharacters();
    if (Object.values(index.formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const json = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== json;
      }
      catch {
        return null;
      }
      if (!changed) {
        return null;
      }
    }
    this.setValue(newValue);
  }
  updateDisabled(newValue) {
    this.tiptapEditor?.setEditable(!newValue);
  }
  updatePlaceholder(newValue, oldValue) {
    if (this.tiptapEditor && newValue !== oldValue) {
      // Tiptap updates placeholder via extension configuration
      // We need to destroy and recreate placeholder extension, or update the DOM directly
      const editorDom = this.tiptapEditor.view?.dom;
      if (editorDom) {
        editorDom.setAttribute('data-placeholder', newValue);
      }
    }
  }
  updateStyle(newValue, oldValue) {
    if (oldValue) {
      const old = JSON.parse(oldValue);
      Object.keys(old).forEach((key) => {
        this.containerElement?.style.setProperty(key, '');
      });
    }
    if (newValue) {
      const value = JSON.parse(newValue);
      Object.keys(value).forEach((key) => {
        this.containerElement?.style.setProperty(key, value[key]);
      });
    }
  }
  updateCharacterLimit() {
    this.updateEnteredCharacters();
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    const rawFormat = this.host.getAttribute('format');
    if (rawFormat)
      this.format = rawFormat.replace(/^['"]|['"]$/g, '');
    this.buildToolbarConfig();
  }
  updateToolbarActiveFormats(editor) {
    const formatNames = [
      'bold',
      'italic',
      'underline',
      'strike',
      'heading1',
      'heading2',
      'blockquote',
      'codeBlock',
      'orderedList',
      'bulletList',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'alignJustify',
      'link',
    ];
    const next = {};
    for (const name of formatNames) {
      next[name] = isFormatActive(editor, name);
    }
    this.toolbarActiveFormats = next;
    // Track active font size for the picker
    const sizes = ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
    let activeSize = '';
    for (const size of sizes) {
      if (editor.isActive('fontSize', { size })) {
        activeSize = size;
        break;
      }
    }
    this.activeFontSize = activeSize;
  }
  buildToolbarConfig() {
    let _parsedModules = {};
    try {
      if (this.modules) {
        _parsedModules = JSON.parse(this.modules);
      }
    }
    catch {
      // fallback — use defaults
    }
    const toolbarConfig = (_parsedModules.toolbar || {});
    const aliases = {
      ...tiptapConfig.TIPTAP_DEFAULT_TOOLBAR_ALIASES,
      ...(toolbarConfig.aliases || {}),
    };
    // Default toolbar groups in order
    const defaultContainer = ['size', 'fontStyle', 'textBlocks', 'lists', 'align', 'embed', 'undo'];
    // If the modules contain a container array, use it; otherwise use defaults
    const container = toolbarConfig.container || defaultContainer;
    const groups = [];
    for (const item of container) {
      if (aliases[item]) {
        groups.push(aliases[item]);
      }
      else {
        groups.push([item]);
      }
    }
    this.parsedToolbarItems = groups;
  }
  /**
   * Replace an uploadingImage placeholder node with an arbitrary node (e.g. video).
   * Used when `resolveUploadingImage` is not appropriate because the replacement
   * is not a standard image node.
   */
  replaceUploadingNode(uploadId, createNode) {
    const editor = this.tiptapEditor;
    if (!editor)
      return;
    const { state } = editor;
    const { tr } = state;
    let found = false;
    state.doc.descendants((node, pos) => {
      if (found)
        return false; // stop after first match
      if (node.type.name === 'uploadingImage' && node.attrs.uploadId === uploadId) {
        const replacement = createNode();
        if (replacement) {
          tr.replaceWith(pos, pos + node.nodeSize, replacement);
          // Suppress undo entry — the upload resolution is not user-editable
          tr.setMeta('addToHistory', false);
          found = true;
        }
      }
    });
    if (found) {
      editor.view.dispatch(tr);
    }
  }
  getToolbarButtonIcon(actionName) {
    const iconMap = {
      bold: 'bold',
      italic: 'italic',
      underline: 'underline',
      strike: 'strike-through',
      codeBlock: 'code-view',
      blockquote: 'blockquote',
      orderedList: 'ordered-list',
      bulletList: 'unordered-list',
      outdent: 'indent-decrease',
      indent: 'indent-increase',
      heading1: 'h1',
      heading2: 'h2',
      alignLeft: 'text-alignment-left',
      alignCenter: 'text-alignment-center',
      alignRight: 'text-alignment-right',
      alignJustify: 'text-alignment-justify',
      link: 'link',
      image: 'image',
      video: 'video-clip',
      attachment: 'attach',
      undo: 'undo',
      redo: 'redo',
    };
    return iconMap[actionName] || actionName;
  }
  renderToolbarIcon(actionName) {
    const iconProps = { size: 'm', color: 'inherit' };
    switch (actionName) {
      case 'bold':
        return index$1.h("wpp-icon-bold-v4-1-0", { ...iconProps });
      case 'italic':
        return index$1.h("wpp-icon-italic-v4-1-0", { ...iconProps });
      case 'underline':
        return index$1.h("wpp-icon-underline-v4-1-0", { ...iconProps });
      case 'strike':
        return index$1.h("wpp-icon-strike-through-v4-1-0", { ...iconProps });
      case 'codeBlock':
        return index$1.h("wpp-icon-code-view-v4-1-0", { ...iconProps });
      case 'blockquote':
        return index$1.h("wpp-icon-blockquote-v4-1-0", { ...iconProps });
      case 'orderedList':
        return index$1.h("wpp-icon-ordered-list-v4-1-0", { ...iconProps });
      case 'bulletList':
        return index$1.h("wpp-icon-unordered-list-v4-1-0", { ...iconProps });
      case 'outdent':
        return index$1.h("wpp-icon-indent-decrease-v4-1-0", { ...iconProps });
      case 'indent':
        return index$1.h("wpp-icon-indent-increase-v4-1-0", { ...iconProps });
      case 'heading1':
        return index$1.h("wpp-icon-h1-v4-1-0", { ...iconProps });
      case 'heading2':
        return index$1.h("wpp-icon-h2-v4-1-0", { ...iconProps });
      case 'alignLeft':
        return index$1.h("wpp-icon-text-alignment-left-v4-1-0", { ...iconProps });
      case 'alignCenter':
        return index$1.h("wpp-icon-text-alignment-center-v4-1-0", { ...iconProps });
      case 'alignRight':
        return index$1.h("wpp-icon-text-alignment-right-v4-1-0", { ...iconProps });
      case 'alignJustify':
        return index$1.h("wpp-icon-text-alignment-justify-v4-1-0", { ...iconProps });
      case 'link':
        return index$1.h("wpp-icon-link-v4-1-0", { ...iconProps });
      case 'image':
        return index$1.h("wpp-icon-image-v4-1-0", { ...iconProps });
      case 'video':
        return index$1.h("wpp-icon-video-clip-v4-1-0", { ...iconProps });
      case 'attachment':
        return index$1.h("wpp-icon-attach-v4-1-0", { ...iconProps });
      case 'undo':
        return index$1.h("wpp-icon-undo-v4-1-0", { ...iconProps });
      case 'redo':
        return index$1.h("wpp-icon-redo-v4-1-0", { ...iconProps });
      default:
        return null;
    }
  }
  /**
   * Called on every selection update. Mirrors Quill's SELECTION_CHANGE handler:
   * when the cursor (collapsed, length=0) lands on a link, show the view-mode
   * tooltip; otherwise close it.
   */
  handleSelectionLinkDetection(editor, from, to) {
    // While the user is actively editing a link URL, don't interfere.
    if (this.linkPromptOpen && this.linkPromptMode === 'edit') {
      return;
    }
    // Only show for collapsed cursor (no range selected)
    if (from !== to) {
      if (this.linkPromptOpen) {
        this.closeLinkPrompt();
      }
      return;
    }
    const linkMarkType = editor.schema.marks.link;
    if (!linkMarkType)
      return;
    // Check if the cursor is inside a link mark
    const $pos = editor.state.doc.resolve(from);
    const marks = $pos.marks();
    const linkMark = marks.find(m => m.type === linkMarkType);
    if (linkMark) {
      // Cursor is on a link — find the range and show view tooltip
      const linkRange = this.findMarkRange(from, linkMarkType);
      if (!linkRange) {
        return;
      }
      const href = linkMark.attrs?.href ?? '';
      this.linkPromptRange = linkRange;
      this.linkPromptValue = href;
      this.linkPromptPreviewHref = href;
      this.linkPromptMode = 'view';
      this.linkPromptPosition = this.computeLinkPromptPosition(linkRange.from, linkRange.to);
      this.linkPromptOpen = true;
    }
    else {
      // Cursor is NOT on a link — close the tooltip
      if (this.linkPromptOpen) {
        this.closeLinkPrompt();
      }
    }
  }
  /**
   * Find the contiguous range around `pos` where the given mark type is active.
   */
  findMarkRange(pos, markType) {
    const editor = this.tiptapEditor;
    if (!editor)
      return null;
    const { doc } = editor.state;
    const $pos = doc.resolve(pos);
    const node = $pos.parent;
    const startOfNode = $pos.start();
    const endOfNode = $pos.end();
    const offset = $pos.parentOffset;
    let from = startOfNode + offset;
    let to = startOfNode + offset;
    let foundFrom = false;
    let foundTo = false;
    node.forEach((child, childOffset) => {
      const childFrom = startOfNode + childOffset;
      const childTo = childFrom + child.nodeSize;
      if (child.marks.some(m => m.type === markType)) {
        if (childFrom <= pos && pos <= childTo) {
          from = childFrom;
          to = childTo;
          foundFrom = true;
          foundTo = true;
        }
      }
    });
    if (!foundFrom || !foundTo)
      return null;
    if (from < startOfNode)
      from = startOfNode;
    if (to > endOfNode)
      to = endOfNode;
    return { from, to };
  }
  closeLinkPrompt() {
    this.linkPromptOpen = false;
    this.linkPromptMode = 'edit';
    this.linkPromptValue = '';
    this.linkPromptPreviewHref = '';
    this.linkPromptRange = null;
  }
  /**
   * Compute the screen-relative position for the link tooltip, anchoring it
   * just below the start of the selection. Mirrors the behaviour of the
   * production Quill `.ql-tooltip` placement logic.
   */
  computeLinkPromptPosition(from, to) {
    const editor = this.tiptapEditor;
    if (!editor || !this.containerElement) {
      return { top: 0, left: 0, flip: false };
    }
    try {
      // The tooltip is `position: absolute` inside `.ql-form-control`
      // (its nearest positioned ancestor — see wpp-richtext.scss).
      // We must therefore compute `top` / `left` relative to that
      // wrapper, NOT relative to `.tiptap-editor-container`. Using the
      // editor container as the reference would shift the tooltip up by
      // the toolbar's height, making it overlap the selected text /
      // toolbar instead of sitting just below the selection.
      const startCoords = editor.view.coordsAtPos(from);
      const endCoords = editor.view.coordsAtPos(to);
      const positionedParent = this.containerElement.parentElement ?? this.containerElement;
      const parentRect = positionedParent.getBoundingClientRect();
      const tooltipHeight = 64; // approx; used only for flip heuristic
      // Anchor below the bottom of the line containing the END of the
      // selection so multi-line selections still place the tooltip below
      // the selected range. For collapsed selections from === to, so
      // this collapses to the cursor's line.
      const anchorBottom = Math.max(startCoords.bottom, endCoords.bottom);
      const anchorTop = Math.min(startCoords.top, endCoords.top);
      const top = anchorBottom - parentRect.top;
      const left = Math.max(0, startCoords.left - parentRect.left);
      const flip = anchorBottom + tooltipHeight > window.innerHeight;
      return { top: flip ? anchorTop - parentRect.top - tooltipHeight : top, left, flip };
    }
    catch {
      return { top: 0, left: 0, flip: false };
    }
  }
  renderFontSizePicker() {
    const sizes = [
      { value: '2xs', label: '2XS' },
      { value: 'xs', label: 'XS' },
      { value: '', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
      { value: '3xl', label: '3XL' },
      { value: '4xl', label: '4XL' },
      { value: '5xl', label: '5XL' },
    ];
    const currentLabel = sizes.find(s => s.value === this.activeFontSize)?.label || 'S';
    return (index$1.h("wpp-menu-context-v4-1-0", { class: "ql-size-menu", dropdownConfig: this.fontSizeDropdownConfig, "data-testid": "font-size-picker" }, index$1.h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", class: "ql-size-trigger", disabled: this.disabled }, currentLabel, index$1.h("wpp-icon-chevron-v4-1-0", { slot: "icon-end", direction: this.isFontSizePickerOpen ? 'up' : 'down', size: "s" })), index$1.h("div", null, sizes.map(s => (index$1.h("wpp-list-item-v4-1-0", { checked: this.activeFontSize === s.value, onWppChangeListItem: () => this.onFontSizeChange(s.value) }, index$1.h("span", { slot: "label" }, s.label)))))));
  }
  render() {
    return (index$1.h(index$1.Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-required": this.required, "data-testid": "wpp-rich-text" }, index$1.h("wpp-richtext-icon-loader-v4-1-0", null), index$1.h("wpp-richtext-common-styles-v4-1-0", null), this.labelConfig?.text && (index$1.h("wpp-label-v4-1-0", { class: "label", htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index$1.h("div", { class: this.formControlCssClasses(), "data-testid": "rich-text-form" }, index$1.h("slot", { name: "editor-toolbar" }, this.parsedToolbarItems.length > 0 && (index$1.h("div", { class: "ql-toolbar ql-wpp", role: "toolbar", "aria-label": "Text formatting" }, this.parsedToolbarItems.map(group => {
      if (group.length === 0)
        return null;
      return (index$1.h("span", { class: "ql-formats" }, group.map(actionName => {
        if (actionName === 'fontSize') {
          return this.renderFontSizePicker();
        }
        const isActive = this.toolbarActiveFormats[actionName] || false;
        const cssClass = `ql-${actionName}${isActive ? ' ql-active' : ''}`;
        return (index$1.h("button", { type: "button", class: cssClass, tabindex: "-1", title: actionName, onClick: () => this.onToolbarAction(actionName), disabled: this.disabled }, this.renderToolbarIcon(actionName)));
      })));
    })))), this.linkPromptOpen && (index$1.h("div", { key: "link-tooltip", class: 'ql-tooltip' +
        (this.linkPromptMode === 'edit' ? ' ql-editing' : '') +
        (this.linkPromptPosition.flip ? ' ql-flip' : ''), "data-mode": this.linkPromptMode === 'edit' ? 'link' : undefined, "data-testid": "richtext-link-prompt", style: { top: `${this.linkPromptPosition.top}px`, left: `${this.linkPromptPosition.left}px` } }, index$1.h("div", { class: "ql-tooltip-wrapper" }, this.linkPromptMode === 'edit'
      ? [
        index$1.h("wpp-input-v4-1-0", { key: "link-input", size: "s", type: "text", placeholder: "https://", value: this.linkPromptValue, onWppChange: this.onLinkPromptInput, onKeyDown: this.onLinkPromptKeyDown, "data-testid": "richtext-link-prompt-input" }),
        index$1.h("wpp-action-button-v4-1-0", { key: "link-save", class: "ql-action ql-save", variant: "primary", onClick: this.onLinkPromptSave, "data-testid": "richtext-link-prompt-save" }, "Save"),
      ]
      : [
        index$1.h("a", { key: "link-preview", class: "ql-preview", rel: "noopener noreferrer", target: "_blank", href: this.linkPromptPreviewHref || 'about:blank', "data-testid": "richtext-link-prompt-preview" }, this.linkPromptPreviewHref),
        index$1.h("div", { key: "link-action-buttons", class: "ql-action-buttons" }, index$1.h("wpp-action-button-v4-1-0", { class: "ql-action ql-edit", variant: "primary", onClick: this.onLinkPromptEdit, "data-testid": "richtext-link-prompt-edit" }, "Edit"), index$1.h("wpp-action-button-v4-1-0", { class: "ql-delete", variant: "destructive", onClick: this.onLinkPromptDelete, "data-testid": "richtext-link-prompt-delete" }, "Delete")),
      ]))), index$1.h("div", { key: "tiptap-editor-container", ref: el => (this.containerElement = el), class: "tiptap-editor-container", "data-testid": "richtext-editor" }), index$1.h("img", { class: "image-actions__proxy-image", style: { display: 'none' } }), Boolean(this.name) && (index$1.h("input", { ref: el => (this.formControlInput = el), tabindex: "-1", id: this.name, class: "form-control-input", "data-testid": "rich-text-input", disabled: this.disabled }))), (Boolean(this.message) || Boolean(this.charactersLimit)) && (index$1.h("div", { class: this.messageCssClasses(), part: "message-wrapper" }, Boolean(this.message) && (index$1.h("wpp-inline-message-v4-1-0", { message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message", class: "message", "data-testid": "message" })), Boolean(this.charactersLimit) && (index$1.h("div", { class: this.charLimitCssClasses(), "data-testid": "char-entered-label", part: "limit-wrapper" }, index$1.h("wpp-typography-v4-1-0", { type: "xs-body", tag: "span", part: "limit-label" }, this._locales.charactersEntered, ":\u00A0"), index$1.h("wpp-typography-v4-1-0", { type: "xs-strong", tag: "span", class: "entered-characters", part: "limit-text" }, this.enteredCharacters, "/", this.charactersLimit)))))));
  }
  static get registryIs() { return "wpp-richtext-v4-1-0"; }
  get host() { return index$1.getElement(this); }
  static get watchers() { return {
    "value": ["updateContent"],
    "disabled": ["updateDisabled"],
    "placeholder": ["updatePlaceholder"],
    "styles": ["updateStyle"],
    "charactersLimit": ["updateCharacterLimit"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppRichtext.style = wppRichtextCss;

exports.wpp_richtext = WppRichtext;
