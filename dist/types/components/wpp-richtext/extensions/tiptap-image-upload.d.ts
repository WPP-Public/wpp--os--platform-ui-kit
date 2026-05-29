/**
 * @file Tiptap image upload extension for wpp-richtext
 * @description Custom Node extension that handles image paste, drag-and-drop, and upload flow.
 *   Replaces plugins/quill-upload/ functionality. Preserves the wppUploadRequest event shape.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node } from '@tiptap/core';
import type { TiptapUploadCallbackItem, TiptapUploadTypes } from '../tiptap-types';
export interface UploadImageOptions {
  /** Maximum allowed file size in bytes (0 = unlimited) */
  maxFileSize: number;
  /** Accepted MIME types */
  acceptedMimeTypes: string[];
  /** Custom upload handler — if provided, overrides the event-based flow */
  onUploadRequest?: (type: TiptapUploadTypes, callback: (items: TiptapUploadCallbackItem[]) => void) => void;
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    uploadImage: {
      /** Insert an uploading placeholder at the current position */
      insertUploadingImage: (id: string, file: File, fileType?: TiptapUploadTypes) => ReturnType;
      /** Replace the uploading placeholder with the final image URL */
      resolveUploadingImage: (id: string, url: string) => ReturnType;
      /** Mark an upload as failed */
      failUploadingImage: (id: string) => ReturnType;
    };
  }
}
/**
 * UploadingImage — a special node rendered while the image is being uploaded.
 * Shows a loading state and transitions to a regular Image node on success.
 */
export declare const UploadingImage: Node<any, any>;
/**
 * TiptapImageUpload — Extension that provides the upload flow for images.
 * Consumers handle the actual upload via the wppUploadRequest event.
 */
export declare const TiptapImageUpload: Node<UploadImageOptions, any>;
