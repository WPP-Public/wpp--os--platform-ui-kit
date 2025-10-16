import { default as _Quill, RangeStatic, Sources as QuillSources } from 'quill'
import { ValuesOf } from '../../types/utils'

export const Quill = _Quill as unknown as typeof _Quill & {
  DEFAULTS: Record<string, any>
}

export type QuillInstance = _Quill & {
  clipboard?: any
  history?: any
  editor?: any
  selection?: any
  theme?: any
  emitter?: any
  wppRichtext?: any
}

export type RichtextValue = string

export const debugLevels = {
  error: 'error',
  warn: 'warn',
  log: 'log',
  info: 'info',
}
export type DebugLevels = ValuesOf<typeof debugLevels>

export const formats = {
  html: 'html',
  text: 'text',
  json: 'json',
  markdown: 'markdown',
}
export type Formats = ValuesOf<typeof formats>

export const sources: Record<string, QuillSources> = {
  api: 'api',
  user: 'user',
  silent: 'silent',
}
export type Sources = ValuesOf<typeof sources>

export interface RichtextChangeEventDetail {
  editor: QuillInstance
  value: RichtextValue
  source: Sources
  name?: string
  plainText?: string
}

export interface RichtextSelectionChangeEventDetail {
  editor: QuillInstance
  range: RangeStatic
  oldRange: RangeStatic
  source: Sources
}

export interface RichtextLocales {
  charactersEntered: string
}

export {
  uploadTypes as richtextUploadTypes,
  UPLOAD_REQUEST_EVENT as RICHTEXT_UPLOAD_REQUEST_EVENT,
} from './plugins/quill-upload/types'
export type {
  UploadTypes as RichtextUploadTypes,
  UploadCallbackItem as RichtextUploadCallbackItem,
  UploadRequestEventDetail as RichtextUploadRequestEventDetail,
} from './plugins/quill-upload/types'

export type MediaDragElement = HTMLImageElement | HTMLVideoElement
