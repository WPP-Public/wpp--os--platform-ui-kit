import type { Quill } from 'quill';
import DefaultOptions, { Options } from './Options';
import Action from './actions/Action';
import BlotSpec from './specs/BlotSpec';
import { EventTargetProp } from './types';
export default class ImageActions {
  static DefaultOptions: {
    specs: (typeof import(".").ImageSpec | typeof import(".").VideoSpec)[];
    overlay: {
      className: string;
      style: {};
    };
    align: {
      attribute: string;
      aligner: {
        applyStyle: boolean;
      };
      icons: {
        left: any;
        center: any;
        right: any;
      };
      toolbar: {
        allowDeselect: boolean;
        mainClassName: string;
        mainStyle: {};
        buttonClassName: string;
        addButtonSelectStyle: boolean;
        buttonStyle: {};
        svgStyle: {};
      };
    };
    resize: {
      handleClassName: string;
      handleStyle: {
        height: string;
        width: string;
      };
    };
  };
  quill: Quill;
  Quill: typeof Quill;
  options: typeof DefaultOptions;
  currentSpec?: BlotSpec | null;
  specs: BlotSpec[];
  overlay: HTMLElement & EventTargetProp;
  actions: Action[];
  constructor(quill: Quill, options?: Options);
  withParentNode(callback: (HTMLElement: any) => any): void;
  show(spec: BlotSpec): void;
  hide(): void;
  update(): void;
  createActions(spec: BlotSpec): void;
  destroyActions(): void;
  repositionOverlay(): void;
  setUserSelect(value: string): void;
}
