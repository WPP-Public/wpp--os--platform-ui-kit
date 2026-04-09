import { AvatarConfig, ChatAttachment, MessageRole, MessageStatus } from '../types';
import { ActionButtonDataConfig } from '../types';
import { Token } from 'marked';
import { ListItemInterface } from '../../wpp-select/types';
export declare class WppChatConversationMessage {
  host: HTMLWppChatConversationMessageElement;
  _actionButtonConfig: ActionButtonDataConfig[];
  private accumulatedText;
  private committedLength;
  private rafHandle;
  committedTokens: Token[];
  liveText: string;
  currentStatus: MessageStatus;
  finalContent: string;
  /**
   * Defines the role of the message.
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
   */
  readonly menuContextListItems: ListItemInterface[];
  /**
   * Defines the source action button configuration.
   */
  readonly sourcesActionConfig: ActionButtonDataConfig;
  /**
   * Defines the avatar configuration for the assistant avatar.
   */
  readonly assistantAvatarConfig: AvatarConfig | false;
  /**
   * Defines the avatar configuration for the user avatar.
   */
  readonly userAvatarConfig: AvatarConfig | false;
  /**
   * Defines the attachments for the message.
   */
  readonly attachments: ChatAttachment[];
  appendChunk(chunk: string): Promise<void>;
  completeStream(): Promise<void>;
  setStatus(status: MessageStatus): Promise<void>;
  onStatusChange(newValue: MessageStatus): void;
  onContentChange(newValue: string): void;
  componentWillLoad(): void;
  private scheduleRefresh;
  private refreshDisplay;
  private renderStreaming;
  private renderComplete;
  private renderAttachments;
  private renderActionButton;
  private renderMenuContextListItems;
  private hostCssClasses;
  private containerCssClasses;
  private contentCssClasses;
  private messageCssClasses;
  render(): any;
}
