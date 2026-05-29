export { Editor as TiptapEditor } from '@tiptap/core';
export type { TiptapEditorInstance, TiptapChangeEventDetail, TiptapSelectionChangeEventDetail, TiptapUploadRequestEventDetail, RichtextChangeEventDetail, RichtextSelectionChangeEventDetail, RichtextUploadRequestEventDetail, } from './tiptap-types';
export { buildTiptapExtensions } from './tiptap-config';
export { executeToolbarCommand, isFormatActive, TOOLBAR_ACTIONS } from './extensions';
export type { ToolbarAction } from './extensions';
