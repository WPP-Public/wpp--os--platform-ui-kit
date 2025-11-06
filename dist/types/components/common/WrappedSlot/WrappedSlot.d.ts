import { FunctionalComponent } from '../../../stencil-public-runtime';
import { JSXBase } from '../../../stencil-public-runtime';
interface Props extends JSXBase.SlotAttributes {
  wrapperClass?: JSXBase.HTMLAttributes<HTMLDivElement>['class'];
}
/**
 * Helper component that unifies slot wrapping across the project
 */
export declare const WrappedSlot: FunctionalComponent<Props>;
export {};
