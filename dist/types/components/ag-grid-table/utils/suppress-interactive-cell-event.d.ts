import type { SuppressKeyboardEventParams, SuppressMouseEventHandlingParams } from 'ag-grid-community';
export declare const suppressInteractiveCellKeyboardEvent: (params: Pick<SuppressKeyboardEventParams, 'event'>) => boolean;
export declare const suppressInteractiveCellMouseEvent: ({ event, }: Pick<SuppressMouseEventHandlingParams, 'event'>) => boolean;
