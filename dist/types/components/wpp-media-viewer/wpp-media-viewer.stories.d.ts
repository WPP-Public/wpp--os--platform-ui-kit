import type { StoryObj } from '@storybook/web-components';
import type { Components } from '../../components';
declare const meta: {
  title: string;
  component: string;
  argTypes: {
    src: {
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
    size: {
      control: "object";
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
    navigationMode: {
      control: "inline-radio";
      options: string[];
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
    controlPanelConfig: {
      control: "object";
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
    maxFileSize: {
      control: "number";
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
export default meta;
export declare const Default: StoryObj<Components.WppMediaViewer>;
export declare const Empty: StoryObj<Components.WppMediaViewer>;
