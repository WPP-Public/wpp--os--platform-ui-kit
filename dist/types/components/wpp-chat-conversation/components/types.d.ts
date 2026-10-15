import type { AriaProps } from '../../../types/common';
export type ChatImageData = {
  href: string;
  alt: string;
  linkHref?: string;
};
export type ChatImageGroupToken = {
  type: 'image_group';
  raw: string;
  images: ChatImageData[];
};
/**
 * Translatable strings rendered by `wpp-chat-conversation-message`. Every key is optional on the
 * `locales` prop — provided values are deep-merged over `LOCALES_DEFAULTS`.
 */
export interface ChatConversationMessageLocales {
  /** Tooltip and accessible label for the quote action. */
  quoteAction: string;
  /** Tooltip and accessible label for the copy action in its idle state. */
  copyAction: string;
  /** Tooltip, accessible label and live-region announcement shown while the copy confirmation is visible. */
  copiedAction: string;
  /** Tooltip and accessible label for the pin action while the message is not pinned. */
  pinAction: string;
  /** Tooltip and accessible label for the pin action while the message is pinned. */
  unpinAction: string;
  /** Visually hidden label read before the token count, so the figure is not announced bare. */
  tokenCountLabel: string;
}
/**
 * Payload of the `wppMessageActionClick` event.
 *
 * Declared as a named interface (rather than an inline object type on the `@Event()`) because
 * Stencil's Angular output target resolves inline complex types poorly in the generated proxies.
 */
export interface ChatConversationMessageActionClickDetail {
  /** The merged config of the action that was clicked, including its `id`. */
  action: ChatConversationMessageAction;
  /**
   * The message's resolved text at the moment of the click.
   *
   * Supplied because the component is the only holder of the final text once a response has been
   * streamed in via `appendChunk`/`completeStream` — a consumer's own copy of `content` is still
   * the empty string it started with, so quoting from it would yield nothing.
   */
  content: string;
}
/**
 * A footer action as the component renders it: the built-in default merged with any
 * dev-supplied override of the same `id`.
 */
export interface ChatConversationMessageAction {
  /**
   * Stable identifier of the action — `quote`, `copy` and `pin` for the built-in defaults. This is
   * the key a dev-supplied override is merged on, so it is what makes config order irrelevant.
   */
  id?: string;
  /** Icon rendered in the button's idle state. */
  icon?: `wpp-icon-${string}`;
  /** Tooltip and accessible label for the idle state. */
  label?: string;
  /**
   * Whether the action is toggled on. Leave it undefined and the action is UNCONTROLLED — the
   * component tracks the toggle itself, so a pin flips with no wiring. Set it and the action is
   * controlled: the component renders exactly what you pass and you own the state.
   */
  isActive?: boolean;
  /** Icon rendered while `isActive` is `true`. */
  activeIcon?: `wpp-icon-${string}`;
  /** Tooltip and accessible label used while `isActive` is `true`. */
  activeLabel?: string;
  /** Handler supplied by the dev for this action, invoked alongside `wppMessageActionClick`. */
  onClick?: () => void;
  /** Disables the button. Forwarded to `wpp-action-button`. */
  disabled?: boolean;
  /** Puts the button in its loading state. Forwarded to `wpp-action-button`. */
  loading?: boolean;
  /** Extra `aria-` props, merged over the label and toggle state the component derives. */
  ariaProps?: AriaProps;
}
