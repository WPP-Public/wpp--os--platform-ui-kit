import type { StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
declare const _default: {
  title: string;
  component: string;
  argTypes: {
    label: {
      control: "text";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    color: {
      control: "text";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
    disabled: {
      control: "boolean";
      description: string;
      table: {
        type: {
          summary: string;
        };
        defaultValue: {
          summary: string;
        };
      };
    };
  };
};
export default _default;
export declare const Default: StoryObj<Components.WppLegend>;
