import { Components } from '../../components';
import { ActionButtonData } from '../wpp-floating-toolbar/types';
export type MessageRole = 'user' | 'assistant';
export type MessageStatus = 'loading' | 'streaming' | 'complete';
export type AvatarConfig = Partial<Pick<Components.WppAvatar, 'name' | 'icon' | 'src' | 'color' | 'withTooltip' | 'ariaProps'>>;
export type ActionButtonDataConfig = Partial<ActionButtonData> & {
  text?: string;
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
  sourcesActionConfig?: ActionButtonDataConfig;
  menuContextListItems?: any[];
};
