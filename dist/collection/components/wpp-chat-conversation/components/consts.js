export const LOCALES_DEFAULTS = {
  quoteAction: 'Reply',
  copyAction: 'Copy',
  copiedAction: 'Copied',
  pinAction: 'Pin',
  unpinAction: 'Unpin',
  tokenCountLabel: 'Token usage',
};
/**
 * How long the copy confirmation (checkmark + "Copied" label) stays visible before the button
 * reverts to its idle state.
 */
export const COPIED_CONFIRMATION_TIMEOUT = 3000;
/**
 * The footer actions rendered when a dev passes no `actionButtonsConfig`. Overrides are merged onto
 * these by `id`, so a dev can retarget one action without restating the others or preserving order.
 */
export const getDefaultActionButtons = (locales) => [
  { id: 'quote', icon: 'wpp-icon-blockquote', label: locales.quoteAction },
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyAction },
  {
    id: 'pin',
    icon: 'wpp-icon-unpinned',
    activeIcon: 'wpp-icon-pinned',
    label: locales.pinAction,
    activeLabel: locales.unpinAction,
  },
];
/**
 * A valid ARIA role parked on the host so the `role` @Prop's `MessageRole` value ("user" /
 * "assistant") never occupies the host's global `role` attribute, where it is not a valid ARIA
 * role (axe: aria-roles, critical). The prop keeps driving layout via internal state.
 */
export const HOST_ARIA_ROLE = 'group';
