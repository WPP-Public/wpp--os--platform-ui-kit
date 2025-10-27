import type { Meta, StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
type WppButtonTypes = Components.WppButton & {
  showIconStart: boolean;
  showIconEnd: boolean;
  text: string;
};
declare const meta: Meta<WppButtonTypes>;
export default meta;
export declare const Primary: StoryObj<WppButtonTypes>;
export declare const Secondary: StoryObj<WppButtonTypes>;
type DestructiveArgs = Components.WppButton & {
  text: string;
  secondary: boolean;
};
export declare const Destructive: StoryObj<DestructiveArgs>;
