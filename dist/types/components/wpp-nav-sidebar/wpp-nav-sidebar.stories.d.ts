import { Story, Meta } from '@storybook/web-components';
import { Components } from 'src/components';
import { WppNavSidebar } from './wpp-nav-sidebar';
declare const _default: Meta<typeof WppNavSidebar>;
export default _default;
export declare const NoLogo: Story<Components.WppNavSidebar & {
  withLogo: boolean;
  target: string;
}>;
export declare const WithLogo: Story<Components.WppNavSidebar & {
  withLogo: boolean;
  target: string;
}>;
