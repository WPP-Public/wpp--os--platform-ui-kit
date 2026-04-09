import { VNode } from '../../stencil-public-runtime';
import { ListItemInterface } from '../wpp-select/types';
import { GetItemKeyType } from './types';
import { ListValue } from '../wpp-list-item/types';
export declare const renderSlotsInListItem: (slots: any[], isLabelExists: boolean) => (VNode | null)[];
export declare const isSelected: (value: ListValue[], item: ListItemInterface, getItemKey?: GetItemKeyType) => boolean;
export declare const selectedOptionsByOrder: (internalList: ListItemInterface[], value: ListValue[], getItemKey?: GetItemKeyType) => ListItemInterface[];
export declare const getTempNodeWidthBasedOnLabel: (textStyles: string, label: string) => number;
