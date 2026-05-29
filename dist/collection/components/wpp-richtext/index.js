export { Editor as TiptapEditor } from '@tiptap/core';
export { buildTiptapExtensions } from './tiptap-config';
// Re-export toolbar utilities for consumer use
export { executeToolbarCommand, isFormatActive, TOOLBAR_ACTIONS } from './extensions';
