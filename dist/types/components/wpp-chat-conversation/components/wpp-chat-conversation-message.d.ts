import { EventEmitter } from '../../../stencil-public-runtime';
import { AvatarConfig, ChatAttachment, MessageRole, MessageStatus } from '../types';
import { ActionButtonDataConfig } from '../types';
import type { ChatConversationMessageActionClickDetail, ChatConversationMessageLocales } from './types';
import { Token } from 'marked';
import { ListItemInterface } from '../../wpp-select/types';
/**
 * @part attachments - Attachments strip wrapper
 * @part file-item - Individual attachment card
 * @part custom-content - Default slot wrapper for dev-supplied content
 * @part action-toolbar - Wrapper around the footer action buttons
 * @part token-count - The trailing token-count action button
 * @part icon - Icon rendered inside a footer action button
 */
export declare class WppChatConversationMessage {
  host: HTMLWppChatConversationMessageElement;
  private accumulatedText;
  private committedLength;
  private rafHandle;
  private copyResetHandle;
  private roleObserver?;
  committedTokens: Token[];
  liveText: string;
  currentStatus: MessageStatus;
  finalContent: string;
  /** True while the copy confirmation (checkmark + "Copied") is showing. */
  isCopied: boolean;
  /**
   * Ids of toggle actions the component is tracking itself. A config item that leaves `isActive`
   * undefined is UNCONTROLLED — the component flips it so the button works with no wiring — while
   * an item that sets `isActive` explicitly stays controlled and is never written here.
   */
  toggledActionIds: string[];
  /**
   * The message role the component renders from. Held separately from the `role` @Prop because the
   * host's `role` attribute is reclaimed for a valid ARIA role — see `HOST_ARIA_ROLE`.
   */
  resolvedRole: MessageRole;
  /**
   * Defines the role of the message.
   *
   * Write-only in practice: `role` collides with the global ARIA attribute of the same name, and
   * "user"/"assistant" are not valid ARIA roles, so the component parks a valid role on the host
   * and tracks the message role internally. Reading `el.role` back therefore returns the parked
   * ARIA role, not the message role — set it, don't read it.
   */
  role: MessageRole;
  /**
   * Defines the content of the message.
   */
  content: string;
  /**
   * Defines the status of the message.
   */
  status: MessageStatus;
  /**
   * Defines the action buttons configuration.
   */
  readonly actionButtonsConfig: ActionButtonDataConfig[];
  /**
   * Defines the list items for the context menu.
   * @deprecated The response footer is now Quote / Copy / Pin plus the token count, with no overflow
   * menu (WPPOPENDS-1594). Still rendered for backwards compatibility; it will be removed in the
   * next major. Put any extra action in `actionButtonsConfig` instead.
   */
  readonly menuContextListItems: ListItemInterface[];
  /**
   * Defines the source action button configuration.
   * @deprecated Use `tokenCount` instead. The footer's trailing slot now shows the response's token
   * count. Still rendered for backwards compatibility, but suppressed whenever `tokenCount` is set.
   */
  readonly sourcesActionConfig: ActionButtonDataConfig;
  /**
   * Token count for this response, already formatted for display (e.g. `'30,000'`). The footer tag is
   * rendered only when this is a non-empty string, so omit it for the Auto/Premium model options.
   */
  readonly tokenCount?: string;
  /**
   * Icon rendered beside `tokenCount`.
   */
  readonly tokenCountIcon: `wpp-icon-${string}`;
  /**
   * Partial translation overrides for the footer, deep-merged over the English defaults.
   */
  readonly locales?: Partial<ChatConversationMessageLocales>;
  /**
   * Defines the avatar configuration for the assistant avatar.
   * @deprecated - The component should no longer render an avatar for the AI model.
   */
  readonly assistantAvatarConfig: AvatarConfig | false;
  /**
   * Defines the avatar configuration for the user avatar.
   * @deprecated - The component should no longer render an avatar for the user.
   */
  readonly userAvatarConfig: AvatarConfig | false;
  /**
   * Defines the attachments for the message.
   */
  readonly attachments: ChatAttachment[];
  /**
   * Emitted when a footer action button is clicked. The detail carries the merged action config
   * (including its `id` — `quote`, `copy` or `pin` for the built-in defaults) and the message's
   * resolved text, which is the only reliable source of that text after a streamed response.
   */
  readonly wppMessageActionClick: EventEmitter<ChatConversationMessageActionClickDetail>;
  appendChunk(chunk: string): Promise<void>;
  completeStream(): Promise<void>;
  setStatus(status: MessageStatus): Promise<void>;
  onStatusChange(newValue: MessageStatus): void;
  onContentChange(newValue: string): void;
  onRoleChange(newValue: MessageRole): void;
  componentWillLoad(): void;
  componentDidRender(): void;
  /**
   * `role` is a data prop carrying a MessageRole, but it shares its name with the global ARIA
   * attribute, so "user"/"assistant" would sit on the host as an invalid ARIA role (axe:
   * aria-roles, critical). Park a valid role there instead; `resolvedRole` keeps the real value.
   */
  private parkHostAriaRole;
  /**
   * Framework bindings re-assert `role` outside Stencil's prop lifecycle — React rewrites it on
   * every re-render — so the only reliable guard is observing the attribute itself.
   *
   * Why not the `@Watch('role')` alone: it was tried and measured. With the watcher as the sole
   * guard, hosts read `role="group"` on first paint but reverted to `role="user"`/`"assistant"`
   * after the very next React re-render (toggling any page state), because React's identical
   * re-write is not a change from Stencil's point of view once the prop already holds that value,
   * so the watcher never fires. With this observer, five consecutive forced re-renders and a raw
   * `setAttribute('role', 'assistant')` all held at `group`, and axe's aria-roles rule went from
   * 1 critical node per message to 0. mock-doc does not deliver MutationObserver records, so this
   * is verified in the browser rather than in a spec.
   *
   * Re-parking is idempotent: the guard in `parkHostAriaRole` makes the observer's own write a
   * no-op, so it cannot loop.
   */
  private observeHostAriaRole;
  disconnectedCallback(): void;
  private get _locales();
  /**
   * The footer actions as rendered: the built-in defaults with any dev override merged on top.
   *
   * Overrides are matched by `id` so config order stops being load-bearing — a dev can retarget a
   * single action without restating the others. An override with no `id` falls back to the default
   * at the same index, which keeps pre-existing positional configs (handlers only, no icons) wired.
   * Anything left over is appended as an extra action and must bring its own icon.
   */
  private get mergedActions();
  /** Controlled `isActive` when the dev supplies one, otherwise the component's own toggle state. */
  private isActionActive;
  private clearCopyReset;
  private copyMessageToClipboard;
  private handleActionClick;
  private scheduleRefresh;
  private refreshDisplay;
  private renderStreaming;
  private renderComplete;
  private renderAttachments;
  private renderActionButton;
  private hasTokenCount;
  /**
   * The DS component file renders the token count as an Action Button instance (S-Strong text,
   * ghost hover, 6px radius), so it IS a wpp-action-button here — not a styled div — and it emits
   * the same event as the other footer actions so a consumer can hook usage details onto it. The
   * only deviation from the button's defaults is the grey-600 icon, set through the button's own
   * `--wpp-action-button-secondary-icon-color` hook in SCSS (an icon `color` prop loses to the
   * button's ::slotted rule).
   */
  private renderTokenCount;
  private renderMenuContextListItems;
  private hasTextContent;
  private hostCssClasses;
  private shouldRenderAvatar;
  private containerCssClasses;
  private contentCssClasses;
  private messageCssClasses;
  render(): any;
}
