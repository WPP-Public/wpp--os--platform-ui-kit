var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const PRESENTATION_ROLE = 'presentation';
const MENU_ITEM_ACTIVE_CLASS = 'wpp-menu-item-active';
const INTERACTIVE_RIGHT_SLOT_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'summary',
  '[contenteditable="true"]',
].join(',');
const INTERACTIVE_RIGHT_SLOT_ROLES = [
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
const INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS = [
  'wpp-action-button',
  'wpp-button',
  'wpp-checkbox',
  'wpp-menu-context',
  'wpp-radio',
  'wpp-toggle',
];

export { EVENT_SOURCE as E, INTERACTIVE_RIGHT_SLOT_COMPONENT_TAGS as I, MENU_ITEM_ACTIVE_CLASS as M, PRESENTATION_ROLE as P, INTERACTIVE_RIGHT_SLOT_SELECTOR as a, INTERACTIVE_RIGHT_SLOT_ROLES as b };
