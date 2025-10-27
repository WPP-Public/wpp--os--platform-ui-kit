import { Instance, Plugin } from 'tippy.js';
declare module 'tippy.js' {
  interface Props {
    hideOnEsc?: boolean;
    hideOnPopperBlur?: boolean;
    portalInside?: boolean;
  }
}
export declare const hideOnEsc: Plugin;
export declare const hideOnPopperBlur: {
  name: string;
  defaultValue: boolean;
  fn(instance: Instance): {
    onCreate(): void;
  };
};
export declare const portalInside: Plugin;
