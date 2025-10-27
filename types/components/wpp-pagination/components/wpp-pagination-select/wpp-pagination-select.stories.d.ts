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
export declare const Select: StoryObj<Components.WppPaginationSelect>;
export declare const Input: StoryObj<Components.WppPaginationSelect>;
