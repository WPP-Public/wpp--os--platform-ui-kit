import type { Meta, StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
type WppButtonTypes = Components.WppButton & {
  showIconStart: boolean;
  showIconEnd: boolean;
  text: string;
  buttonWidth: string | undefined;
};
declare const meta: Meta<WppButtonTypes>;
export default meta;
export declare const Primary: StoryObj<WppButtonTypes>;
export declare const Secondary: StoryObj<WppButtonTypes>;
export declare const Destructive: StoryObj<WppButtonTypes>;
export declare const DestructiveSecondary: StoryObj<WppButtonTypes>;
