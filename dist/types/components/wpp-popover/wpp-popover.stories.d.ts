import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppPopover } from './wpp-popover';
import './wpp-popover-stories.css';
declare const _default: Meta<typeof WppPopover>;
export default _default;
type PopoverStoryArgs = Components.WppPopover & {
  withHeader: boolean;
  withActions: boolean;
  withScroll: boolean;
};
export declare const Popover: Story<PopoverStoryArgs>;
