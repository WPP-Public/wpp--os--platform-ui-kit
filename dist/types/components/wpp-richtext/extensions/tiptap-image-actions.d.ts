/**
 * @file Tiptap image resize and alignment extension for wpp-richtext
 * @description Custom extension that provides click-to-select images with resize handles
 *   and alignment controls. Replaces plugins/quill-image-actions/.
 *   All overlay DOM is created INSIDE the shadow root (not document.body).
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
export interface ImageActionsOptions {
  /** CSS classes for alignment */
  alignments: string[];
  /** Show delete button on selection */
  showDeleteButton: boolean;
}
/**
 * TiptapImageActions — Extension providing image click-to-select with resize handles
 * and alignment toolbar. Replaces quill-image-actions plugin.
 */
export declare const TiptapImageActions: Extension<ImageActionsOptions, any>;
