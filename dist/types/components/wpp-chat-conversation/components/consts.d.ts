import type { ChatConversationMessageAction, ChatConversationMessageLocales } from './types';
export declare const LOCALES_DEFAULTS: ChatConversationMessageLocales;
/**
 * How long the copy confirmation (checkmark + "Copied" label) stays visible before the button
 * reverts to its idle state.
 */
export declare const COPIED_CONFIRMATION_TIMEOUT = 3000;
/**
 * The footer actions rendered when a dev passes no `actionButtonsConfig`. Overrides are merged onto
 * these by `id`, so a dev can retarget one action without restating the others or preserving order.
 */
export declare const getDefaultActionButtons: (locales: ChatConversationMessageLocales) => ChatConversationMessageAction[];
/**
 * A valid ARIA role parked on the host so the `role` @Prop's `MessageRole` value ("user" /
 * "assistant") never occupies the host's global `role` attribute, where it is not a valid ARIA
 * role (axe: aria-roles, critical). The prop keeps driving layout via internal state.
 */
export declare const HOST_ARIA_ROLE = "group";
