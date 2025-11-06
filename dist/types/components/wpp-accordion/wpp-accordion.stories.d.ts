import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppAccordion } from './wpp-accordion';
declare const _default: Meta<typeof WppAccordion>;
export default _default;
type CardStoryArgs = Components.WppAccordion & {
  withActions: boolean;
  header: string;
  withTag: boolean;
};
export declare const Accordion: Story<CardStoryArgs>;
