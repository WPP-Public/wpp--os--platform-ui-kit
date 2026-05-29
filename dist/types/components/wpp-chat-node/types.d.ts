export type WppChatNodeSize = 's' | 'm';
export interface ChatNodeMessageAttachment {
  name: string;
  type: string;
  url?: string;
  thumbnailUrl?: string;
  alt?: string;
}
export interface ChatNodeMessageAction {
  id: string;
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface ChatNodeMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  attachments?: ChatNodeMessageAttachment[];
  actions?: ChatNodeMessageAction[];
}
export interface ChatNodeAvatarConfig {
  /** Name to show abbreviated initials */
  name?: string;
  /** Icon component name (e.g. 'wpp-icon-ai') */
  icon?: string;
  /** Avatar background color */
  color?: string;
}
export interface ChatNodeAction {
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface ChatNodeModel {
  id: string;
  label: string;
  icon?: `wpp-icon-${string}`;
}
export interface ChatNodeMessageActionClickDetail {
  message: ChatNodeMessage;
  action: ChatNodeMessageAction;
}
export interface ChatNodeLocales {
  attachAction: string;
  actionsMenu: string;
  messageInputLabel: string;
  messageInput: string;
  sendMessage: string;
  stopResponse: string;
  copyMessageAction: string;
  likeMessageAction: string;
  dislikeMessageAction: string;
  regenerateMessageAction: string;
}
