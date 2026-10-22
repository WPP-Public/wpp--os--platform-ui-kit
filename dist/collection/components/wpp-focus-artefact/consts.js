export const LOCALES_DEFAULTS = {
  quoteAction: 'Quote',
  pinAction: 'Pin',
  unpinAction: 'Unpin',
  copyAction: 'Copy',
  copiedAction: 'Copied',
  downloadAction: 'Download',
  moreActionsLabel: 'More actions',
  closeAction: 'Close',
  resizeHandleLabel: 'Resize artefact',
  versionSelectorLabel: 'Version',
  bodyLabel: 'Artefact content',
};
export const DEFAULT_TITLE_ICON = 'wpp-icon-document';
export const PIN_ACTION_ID = 'pin';
export const COPY_ACTION_ID = 'copy';
// While the Copy action confirms a copy, as in chat messages: a checkmark, and `copiedAction` as its label
export const COPIED_ICON = 'wpp-icon-done';
// How long, in milliseconds, the Copy action confirms a copy before it shows Copy again
export const COPIED_CONFIRMATION_TIMEOUT = 3000;
// Minimum width of the artefact, in pixels, exposed by the resize handle and reached with the Home key.
// Keep it in sync with `--fa-min-width` in `wpp-focus-artefact.scss`, which applies it to the layout.
export const MIN_WIDTH = 440;
// Width, in pixels, that each Arrow key press on the resize handle adds to or removes from the artefact
export const RESIZE_KEYBOARD_STEP = 10;
// The width each key asks for once the resize handle is focused, from the artefact's width: a number of pixels, or
// `100%`. The stylesheet and the layout bound it, so End asks for the whole container to get the widest width allowed.
export const RESIZE_KEY_WIDTHS = new Map([
  ['ArrowLeft', width => width + RESIZE_KEYBOARD_STEP],
  ['ArrowRight', width => width - RESIZE_KEYBOARD_STEP],
  ['Home', () => MIN_WIDTH],
  ['End', () => '100%'],
]);
// While the pin is on, its icon shows that state and its label (`unpinAction`) names what a click does
export const PINNED_ICON = 'wpp-icon-pinned';
// The menus render their items in a popup appended to <body>, out of reach of the component's styles
export const MENU_LIST_STYLE = { display: 'flex', flexDirection: 'column', gap: '4px' };
/**
 * The actions always rendered in the header, in the order of the design.
 */
export const getDefaultActions = (locales) => [
  { id: 'quote', icon: 'wpp-icon-blockquote', label: locales.quoteAction },
  { id: PIN_ACTION_ID, icon: 'wpp-icon-unpinned', label: locales.pinAction },
  { id: COPY_ACTION_ID, icon: 'wpp-icon-copy', label: locales.copyAction },
  { id: 'download', icon: 'wpp-icon-download', label: locales.downloadAction },
];
