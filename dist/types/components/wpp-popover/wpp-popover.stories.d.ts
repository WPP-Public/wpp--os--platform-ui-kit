import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import './wpp-popover-stories.css';
declare const _default: Meta<Components.WppPopover>;
export default _default;
type PopoverStoryArgs = Components.WppPopover & {
  withHeader: boolean;
  withActions: boolean;
  withScroll: boolean;
};
export declare const Popover: StoryObj<PopoverStoryArgs>;
export declare const PopoverWithSearch: StoryObj<Components.WppPopover>;
