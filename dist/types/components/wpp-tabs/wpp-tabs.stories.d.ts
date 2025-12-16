import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
type TabsStoryArgs = {
  size: Components.WppTabs['size'];
  tablistLabel?: string;
  counter: Components.WppTab['counter'];
};
declare const _default: Meta<TabsStoryArgs>;
export default _default;
export declare const Tabs: StoryObj<Components.WppTab>;
