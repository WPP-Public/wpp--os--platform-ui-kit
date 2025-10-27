import { default as _Quill, RangeStatic, Sources as QuillSources } from 'quill';
import { ValuesOf } from '../../types/utils';
export declare const Quill: typeof _Quill & {
  DEFAULTS: Record<string, any>;
};
export type QuillInstance = _Quill & {
  clipboard?: any;
  history?: any;
  editor?: any;
  selection?: any;
  theme?: any;
  emitter?: any;
  wppRichtext?: any;
};
export type RichtextValue = string;
export declare const debugLevels: {
  error: string;
  warn: string;
  log: string;
  info: string;
};
export type DebugLevels = ValuesOf<typeof debugLevels>;
export declare const formats: {
  html: string;
  text: string;
  json: string;
  markdown: string;
};
export type Formats = ValuesOf<typeof formats>;
export declare const sources: Record<string, QuillSources>;
export type Sources = ValuesOf<typeof sources>;
export interface RichtextChangeEventDetail {
  editor: QuillInstance;
  value: RichtextValue;
  source: Sources;
  name?: string;
  plainText?: string;
}
export interface RichtextSelectionChangeEventDetail {
  editor: QuillInstance;
  range: RangeStatic;
  oldRange: RangeStatic;
  source: Sources;
}
export interface RichtextLocales {
  charactersEntered: string;
}
export { uploadTypes as richtextUploadTypes, UPLOAD_REQUEST_EVENT as RICHTEXT_UPLOAD_REQUEST_EVENT, } from './plugins/quill-upload/types';
export type { UploadTypes as RichtextUploadTypes, UploadCallbackItem as RichtextUploadCallbackItem, UploadRequestEventDetail as RichtextUploadRequestEventDetail, } from './plugins/quill-upload/types';
export type MediaDragElement = HTMLImageElement | HTMLVideoElement;
