import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppMenuContext } from './wpp-menu-context';
declare const _default: Meta<typeof WppMenuContext>;
export default _default;
interface Prop extends Components.WppMenuContext {
  additionalItemsCount: number;
  additionalItemsCountForFirstNestedContext: number;
  additionalItemsCountForSecondNestedContext: number;
}
export declare const MenuGroup: Story<Prop & Components.WppButton & Components.WppMenuGroup>;
