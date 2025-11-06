import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppActionButton } from './wpp-action-button';
declare const _default: Meta<typeof WppActionButton>;
export default _default;
type WppActionButtonTypes = Components.WppActionButton & {
  showIconStart: boolean;
  showIconEnd: boolean;
  text: string;
};
export declare const Primary: Story<WppActionButtonTypes>;
export declare const Secondary: Story<WppActionButtonTypes>;
export declare const Inverted: Story<WppActionButtonTypes>;
export declare const Destructive: Story<WppActionButtonTypes>;
