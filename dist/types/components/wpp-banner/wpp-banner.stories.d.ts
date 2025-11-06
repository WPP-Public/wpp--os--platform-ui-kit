import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppBanner } from './wpp-banner';
declare const _default: Meta<typeof WppBanner>;
export default _default;
type BannerStoryArgs = Components.WppBanner & {
  message: string;
  withActions: boolean;
};
export declare const NoTopBar: Story<BannerStoryArgs>;
export declare const WithTopBar: Story<BannerStoryArgs>;
