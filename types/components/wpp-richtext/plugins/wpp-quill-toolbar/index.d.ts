import Quill from 'quill';
declare const QuillToolbar: any;
type QuillToolbarConfigItem = string[] | Array<string | Record<string, unknown>>;
type QuillToolbarConfig = QuillToolbarConfigItem[];
type WppToolbarConfig = (string | QuillToolbarConfigItem)[];
type Handler = (value: any) => void;
export interface ToolbarProps {
  container?: HTMLElement | WppToolbarConfig | null;
  aliases?: Record<string, QuillToolbarConfig>;
  handlers?: Record<string, Handler>;
  option?: number;
  module?: boolean;
  theme?: boolean;
}
export declare class WppQuillToolbar extends QuillToolbar {
  constructor(quill: Quill, options: Partial<ToolbarProps>);
}
export {};
