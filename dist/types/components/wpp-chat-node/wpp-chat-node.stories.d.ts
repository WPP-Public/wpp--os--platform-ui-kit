import type { Meta, StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
import type { ChatNodeAction, ChatNodeLocales, ChatNodeMessageAction, ChatNodeModel } from './types';
type ChatNodeStoryArgs = Components.WppChatNode & {
  actions?: ChatNodeAction[];
  messageActions?: ChatNodeMessageAction[];
  models?: ChatNodeModel[];
  selectedModelId?: string;
  locales?: Partial<ChatNodeLocales>;
};
declare const meta: Meta<ChatNodeStoryArgs & {
  numberOfHandles: string;
}>;
export default meta;
export declare const ChatNode: StoryObj<ChatNodeStoryArgs & {
  numberOfHandles: string;
}>;
