export var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
export const PRESENTATION_ROLE = 'presentation';
export const MENU_ITEM_ACTIVE_CLASS = 'wpp-menu-item-active';
export const INTERACTIVE_RIGHT_SLOT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[contenteditable="true"]',
].join(',');
export const INTERACTIVE_RIGHT_SLOT_ROLES = [
  'button',
  'checkbox',
  'combobox',
  'link',
  'menu',
  'menuitem',
  'option',
  'radio',
  'searchbox',
  'slider',
  'spinbutton',
  'switch',
  'tab',
  'textbox',
];
export const INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS = [
  'wpp-action-button',
  'wpp-button',
  'wpp-checkbox',
  'wpp-menu-context',
  'wpp-radio',
  'wpp-toggle',
];
