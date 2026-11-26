export const LOCALES_DEFAULTS = {
  sortableList: 'Sortable list',
  pillGrabbed: (label, position, total) => `${label} grabbed, position ${position} of ${total}. Use the arrow keys to move it, Enter or Space to drop it, Escape to cancel.`,
  pillMoved: (label, position, total) => `${label} moved to position ${position} of ${total}.`,
  pillDropped: (label, position, total) => `${label} dropped at position ${position} of ${total}.`,
  moveCancelled: (label, position, total) => `Move cancelled. ${label} returned to position ${position} of ${total}.`,
};
