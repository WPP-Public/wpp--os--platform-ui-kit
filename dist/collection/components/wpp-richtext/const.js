export const KEYBOARD_FOCUS_EVENT = 'keyboard-focus';
export const KEYBOARD_FOCUS_CLASS = 'tab-focus';
export const LOCALES_DEFAULTS = {
  charactersEntered: 'Characters',
  toolbarLabel: 'Text formatting',
  fontSizeLabel: 'Font size',
  linkUrlLabel: 'Link URL',
  editorLabel: 'Rich text editor',
  toolbarActions: {
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strike: 'Strikethrough',
    codeBlock: 'Code block',
    blockquote: 'Blockquote',
    orderedList: 'Ordered list',
    bulletList: 'Bulleted list',
    outdent: 'Decrease indent',
    indent: 'Increase indent',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    alignLeft: 'Align left',
    alignCenter: 'Align center',
    alignRight: 'Align right',
    alignJustify: 'Justify',
    link: 'Link',
    image: 'Insert image',
    video: 'Insert video',
    attachment: 'Insert attachment',
    undo: 'Undo',
    redo: 'Redo',
  },
};
/**
 * Toolbar actions that toggle a formatting state (bold on/off, list on/off,
 * ...). These expose `aria-pressed` reflecting their active state per the
 * WAI-ARIA Toolbar pattern. Command actions (undo/redo/image/...) are omitted
 * so they never advertise a false toggle state (WCAG 4.1.2).
 */
export const TOOLBAR_TOGGLE_ACTIONS = new Set([
  'bold',
  'italic',
  'underline',
  'strike',
  'codeBlock',
  'blockquote',
  'orderedList',
  'bulletList',
  'heading1',
  'heading2',
  'alignLeft',
  'alignCenter',
  'alignRight',
  'alignJustify',
  'link',
]);
/**
 * Font-size options for the toolbar picker, in the order they are rendered. The renderer and the
 * menu's keyboard handler both index into this, so it has to stay a single ordered source of truth.
 */
export const FONT_SIZE_OPTIONS = [
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
