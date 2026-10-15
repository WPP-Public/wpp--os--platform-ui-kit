import { MessageTypes } from '../../types/common';
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
export type FileValidatorHandler = (file: FileItemType) => string | null;
/**
 * Lifecycle status of a file, mirroring the vocabulary used by the shared
 * upload pipeline so a backend-driven status can be passed straight through.
 *
 * - `uploading`: the file is being transferred or processed. Renders the loading state.
 * - `done`: processing finished successfully.
 * - `error`: processing failed. The reason should be supplied via `processingError`.
 */
export type FileUploadStatus = 'uploading' | 'done' | 'error';
/**
 * Everything a processor is given besides the file itself.
 */
export interface FileProcessorContext {
  /**
   * Reports determinate progress for this file. Values are clamped to 0-100
   * and rounded to a whole number. Call it as often as you like; only the
   * latest value is rendered.
   */
  onProgress: (progress: number) => void;
  /**
   * Aborted when the file is removed, when `reset()` is called, or when the
   * component is destroyed. Pass it to `fetch` so in-flight work is cancelled.
   */
  signal: AbortSignal;
}
/**
 * What a processor may resolve with.
 *
 * Only these fields are applied to the file. `name`, `size`, `type` and
 * `lastModified` are deliberately excluded: a `File` exposes them as
 * getter-only properties, so assigning them throws at runtime.
 */
export interface FileProcessorResult {
  /**
   * Marks the file as failed and renders this message. Omit it (or resolve
   * nothing at all) to mark the file as successfully processed.
   */
  error?: string;
  /**
   * Location the backend stored the file at. Used to render an image preview.
   */
  url?: string;
  /**
   * Content the backend extracted for this file.
   */
  result?: string | ArrayBuffer | null;
}
/**
 * An asynchronous processing step, typically a call to your backend.
 *
 * Resolve with nothing to mark the file as done, resolve `{ error }` to fail
 * it with a message, or reject to fail it using the error's `message`.
 */
export type FileProcessorHandler = (file: FileItemType, context: FileProcessorContext) => Promise<FileProcessorResult | void>;
interface FileMetaData {
  sizeError?: boolean;
  formatError?: boolean;
  validatorError?: string;
  disabled?: boolean;
  deletable?: boolean;
  /**
   * @deprecated Use `status: 'uploading'` instead. Still honoured, but an
   * explicit `status` always takes precedence over it.
   */
  isLoading?: boolean;
  /**
   * Current processing status of the file. Set this to drive the loading,
   * success and error states from outside the component - for example from a
   * backend upload or validation pipeline.
   */
  status?: FileUploadStatus;
  /**
   * Progress of the current processing step, 0-100. Values are clamped and
   * rounded. When omitted the item falls back to the local read progress, so a
   * file that has not reported anything yet shows 0%.
   */
  progress?: number;
  /**
   * Message describing why processing failed. Rendered when `status` is
   * `error`, alongside the other validation errors.
   */
  processingError?: string;
  /**
   * Stable identifier for the file. Supply one when you already track files by
   * id so the component can keep an item mounted across status changes. When
   * omitted, an identifier is derived from the file's name, size and origin.
   */
  uid?: string;
}
export interface FileBasedItemType extends File, FileMetaData {
  result?: string | ArrayBuffer | null;
}
export type AcceptConfig = Record<string, string[]>;
/**
 * Readable names for wildcard MIME families, keyed by the pattern they describe
 * (e.g. `{ 'image/*': 'image' }`). Used for the dropzone hint, which has no extension to show
 * when an entry is a whole family.
 */
export type AcceptFamilyLabels = Record<string, string>;
export type FileItemType = FileBasedItemType | (FileMetaData & {
  name: string;
  url: string;
  size: number;
  type: string;
  lastModified?: number;
  result?: string | ArrayBuffer | null;
});
export interface FileUploadEventDetail extends BaseFormControlEventDetail<FileItemType[]> {
  hasError: boolean;
  errorFiles: FileItemType[];
  name?: string;
  /**
   * Every file, successful or not, in the order the component renders them.
   *
   * `value` and `errorFiles` are two separate lists, so rebuilding the list by
   * concatenating them pushes errored files to the end. Controlled consumers should
   * assign this back to `value` to keep files where the user put them.
   */
  files: FileItemType[];
}
export interface FileUploadItemEventDetail {
  name: string;
  size: number;
  index: number;
}
/**
 * Emitted when a file starts being processed and when it settles.
 */
export interface FileUploadProcessingEventDetail {
  name: string;
  size: number;
  index: number;
  uid: string;
  /**
   * Only present on the `end` event.
   */
  status?: FileUploadStatus;
  /**
   * Only present when the file settled with an error.
   */
  processingError?: string;
}
export interface FileUploadErrorEventDetails {
  errorFiles: FileItemType[];
  errorMessage: string;
  name?: string;
}
export interface FileUploadLocales {
  label: string;
  text: string;
  info: (accept: string, size: number) => string;
  /**
   * Readable names for wildcard MIME families shown in the hint, keyed by pattern.
   * Optional: overriding one family leaves the rest on their defaults.
   */
  acceptFamilyLabels?: AcceptFamilyLabels;
  /**
   * Hint shown when the configuration accepts any file, where there is no format to name.
   */
  infoAnyFormat?: (size: number) => string;
  sizeError: string;
  formatError: string;
  singleFileLimitError: string;
  multipleFileLimitError: string;
  /**
   * Screen-reader announcement made when a file is added successfully.
   * Defaults to '<fileName> added'.
   */
  fileAdded?: (fileName: string) => string;
  /**
   * Screen-reader announcement made when a file is removed from the list.
   * Defaults to '<fileName> removed'.
   */
  fileRemoved?: (fileName: string) => string;
  /**
   * Accessible name of the per-file delete control.
   * Defaults to 'Remove file <fileName>'.
   */
  removeFile?: (fileName: string) => string;
  /**
   * Accessible name of the progress indicator shown while a file is being processed.
   * Defaults to 'Processing <fileName>'.
   */
  uploadProgress?: (fileName: string) => string;
  /**
   * Announced once when a file finishes processing successfully.
   * Defaults to '<fileName> processed'.
   */
  processingComplete?: (fileName: string) => string;
  /**
   * Announced once when a file fails processing.
   * Defaults to '<fileName> failed: <error>'.
   */
  processingFailed?: (fileName: string, error: string) => string;
}
export type FileUploadItemLocales = Pick<FileUploadLocales, 'sizeError' | 'formatError' | 'removeFile' | 'uploadProgress'>;
/**
 * Locales once `LOCALES_DEFAULTS` has filled in every key the consumer left out. Internal use
 * only - `FileUploadLocales` stays the public shape so a consumer can keep annotating a complete
 * translation object without having to supply the accessibility strings.
 */
export type ResolvedFileUploadLocales = Required<FileUploadLocales>;
export type ResolvedFileUploadItemLocales = Required<FileUploadItemLocales>;
export declare enum ScrollState {
  scroll = "scroll"
}
export type FileUploadResultFormaType = 'base64' | 'binaryString' | 'arrayBuffer';
/**
 * Visual variant of a single `wpp-file-upload-item`.
 * - `default`: the compact single-line chip used by the standalone uploader.
 * - `chat`: the taller two-line thumbnail card used by chat parts (file name + type/progress).
 */
export type FileUploadItemVariant = 'default' | 'chat';
/**
 * Human-readable file type category shown as the subtitle of the chat variant.
 */
export type FileTypeLabel = 'Image' | 'Document' | 'Zip' | 'Spreadsheet' | 'Text' | 'Video' | 'Audio' | 'Data' | 'Presentation';
export type FileUploadMessageType = Exclude<MessageTypes, 'information' | 'success' | 'warning' | 'brand'>;
export type FileUploadTabElements = 'wrapper' | 'item';
export {};
