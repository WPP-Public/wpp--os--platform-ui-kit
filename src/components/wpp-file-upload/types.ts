import { MessageTypes } from '../../types/common'
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail'

export type FileValidatorHandler = (file: FileItemType) => string | null

interface FileMetaData {
  sizeError?: boolean
  formatError?: boolean
  validatorError?: string
  disabled?: boolean
  deletable?: boolean
  isLoading?: boolean
}

export interface FileBasedItemType extends File, FileMetaData {
  result?: string | ArrayBuffer | null
}

export type AcceptConfig = Record<string, string[]>

export type FileItemType =
  | FileBasedItemType
  | (FileMetaData & {
      name: string
      url: string
      size: number
      type: string
      lastModified?: number
      result?: string | ArrayBuffer | null
    })

export interface FileUploadEventDetail extends BaseFormControlEventDetail<FileItemType[]> {
  hasError: boolean
  errorFiles: FileItemType[]
  name?: string
}

export interface FileUploadItemEventDetail {
  name: string
  size: number
  index: number
}

export interface FileUploadErrorEventDetails {
  errorFiles: FileItemType[]
  errorMessage: string
  name?: string
}

export interface FileUploadLocales {
  label: string
  text: string
  info: (accept: string, size: number) => string
  sizeError: string
  formatError: string
  singleFileLimitError: string
  multipleFileLimitError: string
}

export type FileUploadItemLocales = Pick<FileUploadLocales, 'sizeError' | 'formatError'>

export enum ScrollState {
  scroll = 'scroll',
}

export type FileUploadResultFormaType = 'base64' | 'binaryString' | 'arrayBuffer'

export type FileUploadMessageType = Exclude<MessageTypes, 'information' | 'success' | 'warning' | 'brand'>

export type FileUploadTabElements = 'wrapper' | 'item'
