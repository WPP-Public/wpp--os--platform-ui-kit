import { EventEmitter } from '../../stencil-public-runtime';
import type { ChatNodeAction, ChatNodeMessageAction, ChatNodeMessageActionClickDetail, ChatNodeAvatarConfig, ChatNodeLocales, ChatNodeMessage, ChatNodeModel, WppChatNodeSize } from './types';
/**
 * Card-style node intended for use inside a React Flow canvas.
 * It renders a chat bar footer, an optional messages body,
 * and left/right handles positioned outside the card wrapper so they are never clipped.
 *
 * Selection is driven by an `isSelected` prop.
 * Loading shows an animated gradient border.
 * Resize is handled externally by React Flow's `<NodeResizer />`.
 *
 * @slot left-icon - Optional icon rendered before the node title in the header.
 * @slot - Default slot for the messages body (e.g. chat messages list).
 * @slot handles - Slot for React Flow `<Handle>` elements. Positioned outside the card so they are not clipped.
 */
export declare class WppChatNode {
  private themeSubscription;
  host: HTMLWppChatNodeElement;
  /**
   * Defines the title of the node, displayed in the header.
   */
  readonly nodeTitle: string;
  /**
   * Defines an optional title icon rendered before the node title. Use `left-icon` slot for custom icon markup.
   */
  readonly titleIcon?: `wpp-icon-${string}`;
  /**
   * Defines whether the node is in a loading state. If true, the border animates.
   */
  readonly isLoading: boolean;
  /**
   * Defines whether the node is in the selected/active state. Shows a blue border.
   */
  readonly isSelected: boolean;
  /**
   * Defines the chat node size. `'s'` renders the compact chat bar only.
   */
  readonly size: WppChatNodeSize;
  /**
   * Defines the user avatar configuration. Set to `false` to hide the user avatar.
   */
  readonly userAvatarConfig: ChatNodeAvatarConfig | false;
  /**
   * Defines the assistant avatar configuration. Set to `false` to hide the assistant avatar.
   */
  readonly assistantAvatarConfig: ChatNodeAvatarConfig | false;
  /**
   * Defines the actions shown in the + menu.
   */
  readonly actions: ChatNodeAction[];
  /**
   * Defines the available chat models shown in the nested + menu.
   */
  readonly models: ChatNodeModel[];
  /**
   * Defines action buttons shown below assistant messages. If omitted, localized default actions are shown.
   * Set to an empty array to hide them.
   */
  readonly messageActions?: ChatNodeMessageAction[];
  /**
   * Defines the selected chat model id. If omitted, the first model is shown as selected.
   */
  readonly selectedModelId?: string;
  /**
   * Indicates the locales for the chat-node component.
   */
  readonly locales: Partial<ChatNodeLocales>;
  /**
   * Emitted when the user clicks the send button or presses Enter.
   */
  wppSend: EventEmitter<{
    message: string;
  }>;
  /**
   * Emitted when the user clicks the stop button while the node is loading.
   */
  wppStop: EventEmitter<void>;
  /**
   * Emitted when the user clicks the + (attach) button.
   */
  wppAttach: EventEmitter<void>;
  /**
   * Emitted when an action from the + menu is selected.
   */
  wppActionClick: EventEmitter<ChatNodeAction>;
  /**
   * Emitted when a chat model from the nested + menu is selected.
   */
  wppModelSelect: EventEmitter<ChatNodeModel>;
  /**
   * Emitted when a message action button is clicked.
   */
  wppMessageActionClick: EventEmitter<ChatNodeMessageActionClickDetail>;
  private inputValue;
  private messages;
  private activeModelId?;
  private isActive;
  private isWaitingForResponse;
  private defaultMessageActions;
  private _locales;
  private bodyRef?;
  private titleRef?;
  private activeStateTimer?;
  private responseWaitTimer?;
  private static unrefTimer;
  onUpdateLocales(newLocales: Partial<ChatNodeLocales>): void;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Programmatically add a message (user or assistant) to the chat body.
   */
  addMessage(message: ChatNodeMessage): Promise<void>;
  /**
   * Append text to the last assistant message (for streaming).
   */
  appendChunk(chunk: string): Promise<void>;
  private scrollToBottom;
  private handleInput;
  private handleSend;
  private handleStop;
  private handleKeyDown;
  private handleAttach;
  private handleActionClick;
  private handleModelSelect;
  private handleMessageActionClick;
  private handleNodeInteraction;
  private handleWindowPointerDown;
  private activateNode;
  private clearActiveState;
  private clearActiveStateTimer;
  private startWaitingForResponse;
  private clearWaitingForResponse;
  private clearResponseWaitTimer;
  private getSelectedModel;
  private renderIcon;
  private renderTitleIcon;
  private renderActionMenu;
  private renderChatBar;
  private renderAvatar;
  private getAttachmentKind;
  private handleAttachmentImageError;
  private renderAttachmentFallback;
  private renderMessageAttachments;
  private renderMessageActions;
  private renderMessages;
  render(): any;
}
