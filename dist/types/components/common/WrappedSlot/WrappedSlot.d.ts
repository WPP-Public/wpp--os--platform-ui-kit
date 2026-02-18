import { FunctionalComponent } from '../../../stencil-public-runtime';
import { JSXBase } from '../../../stencil-public-runtime';
interface Props extends JSXBase.SlotAttributes {
  wrapperClass?: JSXBase.HTMLAttributes<HTMLDivElement>['class'];
  id?: string;
  part?: string;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  title?: string;
  onBlur?: (event: FocusEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  class?: string;
  onClick?: (event?: FocusEvent) => void;
}
/**
 * Helper component that unifies slot wrapping across the project
 */
export declare const WrappedSlot: FunctionalComponent<Props>;
export {};
