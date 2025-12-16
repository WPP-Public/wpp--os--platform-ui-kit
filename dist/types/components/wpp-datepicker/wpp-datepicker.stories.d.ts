import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
type DatepickerWithLimits = Components.WppDatepicker & {
  min: string;
  max: string;
};
declare const _default: Meta<DatepickerWithLimits>;
export default _default;
export declare const Single: StoryObj<DatepickerWithLimits>;
export declare const Range: StoryObj<DatepickerWithLimits>;
export declare const RangeWithPresets: StoryObj<DatepickerWithLimits>;
export declare const DependableDatepickers: StoryObj<DatepickerWithLimits>;
export declare const MonthsView: StoryObj<DatepickerWithLimits>;
export declare const ButtonTrigger: StoryObj<DatepickerWithLimits>;
export declare const ButtonTriggerWithActionButton: StoryObj<DatepickerWithLimits>;
