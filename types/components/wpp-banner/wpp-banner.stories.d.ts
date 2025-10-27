import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppBanner>;
export default _default;
type BannerStoryArgs = Components.WppBanner & {
  message: string;
  withActions: boolean;
};
export declare const NoTopBar: StoryObj<BannerStoryArgs>;
export declare const WithTopBar: StoryObj<BannerStoryArgs>;
