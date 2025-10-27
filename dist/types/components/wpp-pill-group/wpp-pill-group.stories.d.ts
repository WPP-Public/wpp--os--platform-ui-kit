import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppPillGroup>;
export default _default;
type PillTypes = Components.WppPillGroup & Components.WppPill;
export declare const Display: StoryObj<PillTypes>;
export declare const Draggable: StoryObj<PillTypes>;
export declare const SingleSelectGroup: StoryObj<PillTypes>;
export declare const MultipleSelectGroup: StoryObj<PillTypes>;
