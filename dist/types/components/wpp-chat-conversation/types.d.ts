import type { Components, ListItemInterface } from '../../components';
import type { ActionButtonData } from '../wpp-floating-toolbar/types';
import type { ChatConversationMessageLocales } from './components/types';
export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'loading' | 'streaming' | 'complete';
export type AvatarConfig = Partial<Pick<Components.WppAvatar, 'name' | 'icon' | 'src' | 'color' | 'withTooltip' | 'ariaProps'>>;
export type ActionButtonDataConfig = Partial<ActionButtonData> & {
  /** Text rendered inside the button. Only used by the deprecated `sourcesActionConfig`. */
  text?: string;
  /** Tooltip text and accessible label for the button. */
  label?: string;
  /**
   * Renders the button in its active (toggled-on) state, e.g. a pinned response. Leave it
   * undefined and the action is UNCONTROLLED — the component tracks the toggle itself, so a pin
   * flips with no wiring. Set it and you own the state.
   */
  isActive?: boolean;
  /** Icon rendered while `isActive` is `true`. Falls back to `icon`. */
  activeIcon?: `wpp-icon-${string}`;
  /** Tooltip text and accessible label used while `isActive` is `true`. Falls back to `label`. */
  activeLabel?: string;
};
export type ChatAttachment = {
  name: string;
  url: string;
  type: string;
  size?: number;
  fileItemProps?: any;
};
export type ChatInputConfig = Partial<Components.WppChatInput>;
export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  status?: MessageStatus;
  attachments?: ChatAttachment[];
  actionButtonsConfig?: ActionButtonDataConfig[];
  /**
   * @deprecated Use `tokenCount` instead. The footer's trailing slot now shows the response's token
   * count. Still rendered for backwards compatibility, but suppressed whenever `tokenCount` is set.
   */
  sourcesActionConfig?: ActionButtonDataConfig;
  /**
   * @deprecated The response footer is now Quote / Copy / Pin plus the token count, with no overflow
   * menu (WPPOPENDS-1594). Still rendered for backwards compatibility; it will be removed in the
   * next major. Put any extra action in `actionButtonsConfig` instead.
   */
  menuContextListItems?: ListItemInterface[];
  /**
   * Token count for this response, already formatted for display (e.g. `'30,000'`). The footer tag is
   * rendered only when this is a non-empty string, so omit it for the Auto/Premium model options.
   */
  tokenCount?: string;
  /** Icon rendered beside `tokenCount`. Defaults to `wpp-icon-premium`. */
  tokenCountIcon?: `wpp-icon-${string}`;
  /** Partial translation overrides for the message's footer, merged over the English defaults. */
  locales?: Partial<ChatConversationMessageLocales>;
};
