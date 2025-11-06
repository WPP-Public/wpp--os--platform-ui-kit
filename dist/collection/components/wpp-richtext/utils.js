import { DRAG_THUMBNAIL_MAX_SIZE } from './const';
export function ignoreHistory(quill, changes) {
  quill.history?.cutoff();
  if (quill.history) {
    quill.history.ignoreChange = true;
    quill.once(quill.emitter.constructor.events.EDITOR_CHANGE, () => {
      quill.history.ignoreChange = false;
    });
  }
  changes();
  quill.history?.cutoff();
}
export const embedBlotInnerHtmlRegexp = /\uFEFF.*?\uFEFF/g;
export const exportHtml = (html) => html.replace(embedBlotInnerHtmlRegexp, '');
export function createDragThumbnail(node) {
  const dragThumbnail = node.cloneNode();
  const ratio = Math.min(1, DRAG_THUMBNAIL_MAX_SIZE / node.width, DRAG_THUMBNAIL_MAX_SIZE / node.height);
  Object.assign(dragThumbnail, {
    width: node.width * ratio,
    height: node.height * ratio,
  });
  Object.assign(dragThumbnail.style, {
    position: 'fixed',
    left: `-${DRAG_THUMBNAIL_MAX_SIZE}px`,
    top: `-${DRAG_THUMBNAIL_MAX_SIZE}px`,
  });
  document.body.appendChild(dragThumbnail);
  return dragThumbnail;
}
