import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppMenuContext>;
export default _default;
interface Prop extends Components.WppMenuContext {
  additionalItemsCount: number;
  additionalItemsCountForFirstNestedContext: number;
  additionalItemsCountForSecondNestedContext: number;
}
export declare const MenuGroup: StoryObj<Prop & Components.WppButton & Components.WppMenuGroup>;
