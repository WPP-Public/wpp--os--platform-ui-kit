import { EventEmitter } from '../../stencil-public-runtime';
import { AvatarConfig, ChatInputConfig, ChatMessage, MessageStatus } from './types';
import { MessageChangeEventDetail, SendEventDetail } from '../wpp-chat/components/wpp-chat-input/types';
import { FileUploadEventDetail } from '../wpp-file-upload/types';
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
   */
  assistantAvatarConfig: AvatarConfig | false;
  /**
   * Defines the avatar configuration for the user.
   */
  userAvatarConfig: AvatarConfig | false;
  /**
   * Defines the configuration for the chat input.
   */
  chatInputConfig: ChatInputConfig;
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
   * Emitted when the value of the input changes.
   */
  readonly wppChange: EventEmitter<FileUploadEventDetail>;
  /**
   * Emitted when the message in the input message changes.
   */
  readonly wppMessageChanged: EventEmitter<MessageChangeEventDetail>;
  private getLastMessageElement;
  private scrollToBottom;
  private inputWrapperCssClasses;
  render(): any;
}
