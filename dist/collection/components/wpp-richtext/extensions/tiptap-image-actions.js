/**
 * @file Tiptap image resize and alignment extension for wpp-richtext
 * @description Custom extension that provides click-to-select images with resize handles
 *   and alignment controls. Replaces plugins/quill-image-actions/.
 *   All overlay DOM is created INSIDE the shadow root (not document.body).
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
const imageActionsPluginKey = new PluginKey('imageActions');
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
export const TiptapImageActions = Extension.create({
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
      new Plugin({
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
