import type { Meta, StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
import type { ChatNodeAction, ChatNodeLocales, ChatNodeMessageAction, ChatNodeModel } from './types';
type ChatNodeStoryArgs = Omit<Components.WppChatNode, 'selectedModel'> & {
  actions?: ChatNodeAction[];
  messageActions?: ChatNodeMessageAction[];
  models?: ChatNodeModel[];
  selectedModel?: string;
  locales?: Partial<ChatNodeLocales>;
};
declare const meta: Meta<ChatNodeStoryArgs & {
  numberOfHandles: string;
}>;
export default meta;
export declare const ChatNode: StoryObj<ChatNodeStoryArgs & {
  numberOfHandles: string;
}>;
