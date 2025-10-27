import type { Components } from '../../components';
import type { StoryObj } from '@storybook/web-components';
type CardStoryArgs = Components.WppAccordion & {
  withActions: boolean;
  header: string;
  withTag: boolean;
  withDivider: boolean;
};
declare const _default: {
  title: string;
  component: string;
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: boolean;
      };
    };
  };
  argTypes: {
    disabled: {
      control: string;
    };
    expanded: {
      control: string;
    };
    size: {
      options: string[];
      control: string;
    };
    withTag: {
      control: string;
    };
    header: {
      control: string;
    };
    withActions: {
      control: string;
    };
    withDivider: {
      control: string;
    };
  };
};
export default _default;
export declare const Accordion: StoryObj<CardStoryArgs>;
