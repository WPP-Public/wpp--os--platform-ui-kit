import type { Meta, StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
type WppActionButtonTypes = Components.WppActionButton & {
  showIconStart: boolean;
  showIconEnd: boolean;
  text: string;
};
declare const meta: Meta<WppActionButtonTypes>;
export default meta;
export declare const Primary: StoryObj<WppActionButtonTypes>;
export declare const Secondary: StoryObj<WppActionButtonTypes>;
export declare const Inverted: StoryObj<WppActionButtonTypes>;
export declare const Destructive: StoryObj<WppActionButtonTypes>;
