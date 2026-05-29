/**
 * @file Tiptap v3 type definitions for wpp-richtext
 * @description Replaces/extends the Quill-based types.ts during WPPOPENDS-1287 migration.
 *   All types preserve backward compatibility with the existing public API.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import type { Editor } from '@tiptap/core';
import { ValuesOf } from '../../types/utils';
/** Editor instance type exposed via wppInit event */
export type TiptapEditorInstance = Editor;
/** Selection range — replaces Quill's RangeStatic */
export interface TiptapRange {
  /** Absolute start position in the document */
  from: number;
  /** Absolute end position in the document */
  to: number;
  /**
   * @deprecated Use `from` instead. Backward-compatible alias mapping to `from`.
   * Optional so new code can construct partial ranges from `from`/`to` alone;
   * the events emitted by `wpp-richtext` still populate this field.
   * Will be removed in v5.0.0.
   */
  index?: number;
  /**
   * @deprecated Use `to - from` instead. Backward-compatible alias mapping to `to - from`.
   * Optional so new code can construct partial ranges from `from`/`to` alone;
   * the events emitted by `wpp-richtext` still populate this field.
   * Will be removed in v5.0.0.
   */
  length?: number;
}
/**
 * Change event detail — matches existing wppChange shape.
 * The `editor` field type changes from QuillInstance to TiptapEditorInstance.
 */
export interface TiptapChangeEventDetail {
  editor: TiptapEditorInstance;
  value: TiptapRichtextValue;
  source: TiptapSources;
  name?: string;
  plainText?: string;
}
/** Selection change event detail */
export interface TiptapSelectionChangeEventDetail {
  editor: TiptapEditorInstance;
  range: TiptapRange;
  oldRange: TiptapRange | null;
  source: TiptapSources;
}
/** Upload request event detail — same shape as current API */
export interface TiptapUploadRequestEventDetail {
  type: TiptapUploadTypes;
  callback: (items: TiptapUploadCallbackItem[]) => void;
  /**
   * The validated files that triggered the upload request, surfaced for
   * consumers that want to inspect the originating user action (e.g. for
   * analytics or progressive UI feedback). Optional for backward
   * compatibility — pre-existing handlers that only relied on `callback`
   * continue to work unchanged.
   */
  files?: File[];
}
export interface TiptapUploadCallbackItem {
  file: File;
  promise: Promise<string>;
}
export type TiptapRichtextValue = string;
export declare const tiptapUploadTypes: readonly ["image", "video", "attachment"];
export type TiptapUploadTypes = (typeof tiptapUploadTypes)[number];
export declare const TIPTAP_UPLOAD_REQUEST_EVENT = "upload-request";
export declare const tiptapFormats: {
  readonly html: "html";
  readonly text: "text";
  readonly json: "json";
  readonly markdown: "markdown";
};
export type TiptapFormats = ValuesOf<typeof tiptapFormats>;
export declare const tiptapSources: {
  readonly api: "api";
  readonly user: "user";
  readonly silent: "silent";
};
export type TiptapSources = ValuesOf<typeof tiptapSources>;
export interface TiptapRichtextLocales {
  charactersEntered: string;
}
/** Media element type for drag operations */
export type TiptapMediaDragElement = HTMLImageElement | HTMLVideoElement;
/**
 * Backward-compatible type aliases.
 * The Quill→Tiptap migration renamed these types internally, but external
 * consumers should be able to keep using the old names without changes.
 * @deprecated Use the Tiptap* equivalents. These aliases will be removed in v5.0.0.
 */
export type RichtextChangeEventDetail = TiptapChangeEventDetail;
export type RichtextSelectionChangeEventDetail = TiptapSelectionChangeEventDetail;
export type RichtextUploadRequestEventDetail = TiptapUploadRequestEventDetail;
