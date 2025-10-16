import { RichtextLocales } from './types'

export const KEYBOARD_FOCUS_EVENT = 'keyboard-focus'

export const KEYBOARD_FOCUS_CLASS = 'tab-focus'

export const defaultFormats: string[] = [
  'background',
  'bold',
  'color',
  'font',
  'code',
  'italic',
  'link',
  'size',
  'strike',
  'script',
  'underline',
  'blockquote',
  'header',
  'indent',
  'list',
  'align',
  'direction',
  'code-block',
  'formula',
]

export const quillImageFormats = ['float', 'width', 'height']

export const quillUploadFormats = [
  'image',
  'imageUploading',
  'video',
  'videoUploading',
  'attachment',
  'attachmentUploading',
]

export const DRAG_THUMBNAIL_MAX_SIZE = 100

export const LOCALES_DEFAULTS: RichtextLocales = {
  charactersEntered: 'Characters',
}
