import BlotSpec from './specs/BlotSpec';
import ImageSpec from './specs/ImageSpec';
import VideoSpec from './specs/VideoSpec';
interface ExtendsBlotSpec {
  new (): BlotSpec;
}
type Styles = Record<string, string>;
export type OverlayOptions = {
  className?: string;
  style?: Styles | null;
};
export type ResizeOptions = {
  handleClassName?: string;
  handleStyle?: Styles | null;
};
export type AlignOptions = {
  attribute?: string;
  aligner?: {
    applyStyle?: boolean;
  };
  icons?: {
    left?: string;
    center?: string;
    right?: string;
  };
  toolbar?: {
    allowDeselect?: boolean;
    mainClassName?: string;
    mainStyle?: Styles | null;
    buttonClassName?: string;
    addButtonSelectStyle?: boolean;
    buttonStyle?: Styles | null;
    svgStyle?: Styles | null;
  };
};
export type Options = {
  specs?: ExtendsBlotSpec[];
  overlay?: OverlayOptions;
  align?: AlignOptions;
  resize?: ResizeOptions;
};
declare const DefaultOptions: {
  specs: (typeof ImageSpec | typeof VideoSpec)[];
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
export default DefaultOptions;
