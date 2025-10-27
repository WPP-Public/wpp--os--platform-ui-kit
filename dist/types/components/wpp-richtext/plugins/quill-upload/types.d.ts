export declare const uploadTypes: string[];
export type UploadTypes = (typeof uploadTypes)[number];
export type UploadCallbackItem = {
  file: File;
  promise: Promise<string>;
};
export interface UploadRequestEventDetail {
  type: UploadTypes;
  callback: (items: UploadCallbackItem[]) => void;
}
export declare const UPLOAD_REQUEST_EVENT = "upload-request";
