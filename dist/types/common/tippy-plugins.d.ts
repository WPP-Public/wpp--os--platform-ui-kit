import { Instance, Plugin } from 'tippy.js';
declare module 'tippy.js' {
  interface Props {
    hideOnEsc?: boolean;
    hideOnPopperBlur?: boolean;
    portalInside?: boolean;
  }
}
export declare const hideOnEsc: Plugin;
/**
 * Whether `target` is logically inside `popper`, counting the popups `popper` has spawned.
 *
 * A nested popup (a submenu) is usually appended to the document root rather than to the popper
 * that anchors it, so anything happening inside it looks, from the outside, like it happened
 * elsewhere entirely — tippy's own `getNestedPopperTree` only finds popups that really are DOM
 * descendants. Walk the popup -> anchor chain instead: if any ancestor popup is anchored inside
 * `popper`, the node is still within it.
 */
export declare const isWithinPopperTree: (popper: Element, target: Node) => boolean;
export declare const hideOnPopperBlur: {
  name: string;
  defaultValue: boolean;
  fn(instance: Instance): {
    onCreate(): void;
  };
};
export declare const portalInside: Plugin;
