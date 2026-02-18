import { StoryObj } from '@storybook/web-components';
import { Components } from '../../../../components';
declare const _default: {
  title: string;
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: boolean;
      };
    };
  };
  argTypes: {
    count: {
      type: string;
    };
    activePageNumber: {
      type: string;
    };
  };
};
export default _default;
export declare const Default: StoryObj<Components.WppPaginationSelect>;
