import { EventEmitter } from '../../stencil-public-runtime';
import { AvatarConfig, ChatInputConfig, ChatMessage, MessageStatus } from './types';
import type { ChatConversationMessageActionClickDetail, ChatConversationMessageLocales } from './components/types';
import { ActionsMenuToggleEventDetail, ChatInputActionItemClickEventDetail, MessageChangeEventDetail, SendEventDetail, ChatInputModelOptionsEventDetail, ChatInputSelectableModel } from '../wpp-chat/components/wpp-chat-input/types';
import { FileUploadEventDetail } from '../wpp-file-upload/types';
/**
 * @slot - Message elements composed by the consumer, rendered above the composer.
 * @slot input-references - Reference chips (e.g. `wpp-chat-reference`) stacked above the composer's
 * textarea. Use this to show a quoted reply after the `wppMessageActionClick` quote action.
 */
export declare class WppChatConversation {
  host: HTMLWppChatConversationElement;
  private messageElementsMap;
  private conversationContainerRef?;
  /**
   * Defines the list of messages in the conversation.
   */
  messages: ChatMessage[];
  /**
   * Defines the avatar configuration for the assistant.
   * @deprecated - The component should no longer render an avatar for the AI model.
   */
  assistantAvatarConfig: AvatarConfig | false;
  /**
   * Defines the avatar configuration for the user.
   * @deprecated - The component should no longer render an avatar for the user.
   */
  userAvatarConfig: AvatarConfig | false;
  /**
   * Defines the configuration for the chat input.
   */
  chatInputConfig: ChatInputConfig;
  /**
   * Partial translation overrides applied to every message's footer. A message can override this
   * for itself via `ChatMessage.locales`.
   */
  locales?: Partial<ChatConversationMessageLocales>;
  /**
   * Appends a chunk of text to the last message.
   */
  appendChunk(chunk: string): Promise<void>;
  /**
   * Completes the stream for the last message.
   */
  completeStream(): Promise<void>;
  /**
   * Sets the status of the last message.
   */
  setStatus(status: MessageStatus): Promise<void>;
  /**
   * Handles changes in the messages prop and scrolls to the bottom.
   */
  handleMessagesChange(): void;
  /**
   * Emitted when the user clicks the "Send" button.
   */
  readonly wppSend: EventEmitter<SendEventDetail>;
  /**
   * Emitted when the user clicks the "Stop" button while an AI response is generating.
   */
  readonly wppStop: EventEmitter<void>;
  /**
   * Emitted when the value of the input changes.
   */
  readonly wppChange: EventEmitter<FileUploadEventDetail>;
  /**
   * Emitted when the message in the input message changes.
   */
  readonly wppMessageChanged: EventEmitter<MessageChangeEventDetail>;
  /**
   * Emitted when a footer action (Quote / Copy / Pin, or a custom one) is clicked on a message this
   * component renders from its `messages` prop. Re-emitted from `wpp-chat-conversation-message`,
   * whose own event does not bubble, so the declarative `[messages]` path can reach it.
   */
  readonly wppMessageActionClick: EventEmitter<ChatConversationMessageActionClickDetail>;
  /**
   * Emitted when the consolidated actions menu (the `wpp-icon-plus` dropdown
   * configured via `chatInputConfig.actions`) opens or closes.
   */
  readonly wppActionsMenuToggle: EventEmitter<ActionsMenuToggleEventDetail>;
  /**
   * Emitted when an entry inside the consolidated actions menu is clicked.
   * The detail is the originating `ChatInputAction` object.
   */
  readonly wppActionsMenuItemClick: EventEmitter<ChatInputActionItemClickEventDetail>;
  /**
   * Re-emitted from the chat input: the model picked from its selector.
   */
  readonly wppModelSelect: EventEmitter<ChatInputSelectableModel>;
  /**
   * Re-emitted from the chat input: the "Select model or agent" action, shown when
   * `chatInputConfig.models` is empty.
   */
  readonly wppModelBrowse: EventEmitter<void>;
  /**
   * Re-emitted from the chat input: a reasoning level was picked. The detail carries the
   * resulting state of the whole selection.
   */
  readonly wppReasoningSelect: EventEmitter<ChatInputModelOptionsEventDetail>;
  /**
   * Re-emitted from the chat input: a verbosity level was picked, with the same payload as
   * `wppReasoningSelect`.
   */
  readonly wppVerbositySelect: EventEmitter<ChatInputModelOptionsEventDetail>;
  private getLastMessageElement;
  /**
   * Scrolls the conversation to the bottom. Use this when composing messages via the slot — the component
   * does not auto-scroll on slot changes.
   */
  scrollToBottom(): Promise<void>;
  private scrollContainerToBottom;
  private shouldRenderAvatar;
  private inputWrapperCssClasses;
  render(): any;
}
