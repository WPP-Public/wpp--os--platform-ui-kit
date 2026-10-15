export const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: false,
  fn(instance) {
    function onKeyDown(event) {
      if (event.code === 'Escape' && instance.state.isVisible) {
        instance.hide();
      }
    }
    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
      onDestroy() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};
/**
 * `Node.contains` and `Element.closest` both stop at a shadow boundary, and the deepest node of an
 * event path is routinely inside one — a press on a `wpp-list-item` lands on an element in its
 * shadow root. These two climb out through each shadow host so the walk below reaches the light
 * DOM it is really asking about.
 */
const containsAcrossShadowRoots = (ancestor, node) => {
  let current = node;
  while (current) {
    if (ancestor.contains(current))
      return true;
    current = current.getRootNode?.()?.host ?? null;
  }
  return false;
};
const closestAcrossShadowRoots = (node, selector) => {
  let current = node;
  while (current) {
    const match = current.closest?.(selector);
    if (match)
      return match;
    current = current.getRootNode?.()?.host ?? null;
  }
  return null;
};
/**
 * Whether `target` is logically inside `popper`, counting the popups `popper` has spawned.
 *
 * A nested popup (a submenu) is usually appended to the document root rather than to the popper
 * that anchors it, so anything happening inside it looks, from the outside, like it happened
 * elsewhere entirely — tippy's own `getNestedPopperTree` only finds popups that really are DOM
 * descendants. Walk the popup -> anchor chain instead: if any ancestor popup is anchored inside
 * `popper`, the node is still within it.
 */
export const isWithinPopperTree = (popper, target) => {
  let current = target;
  while (current) {
    if (containsAcrossShadowRoots(popper, current))
      return true;
    const popperRoot = closestAcrossShadowRoots(current, '[data-tippy-root]');
    const reference = popperRoot?._tippy?.reference;
    if (!reference || reference === current)
      return false;
    current = reference;
  }
  return false;
};
export const hideOnPopperBlur = {
  name: 'hideOnPopperBlur',
  defaultValue: false,
  fn(instance) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          if (instance.props.hideOnPopperBlur &&
            event.relatedTarget &&
            !isWithinPopperTree(instance.popper, event.relatedTarget)) {
            instance.hide();
          }
        });
      },
    };
  },
};
// Adds an attribute to the popper root so it is treated as inside the modal.
// Usage option: portalInside: boolean | string
//  - true - adds data-wpp-portal-inside
//  - false - removes attribute
//  - string (e.g., 'data-foo') -> uses custom attribute name
export const portalInside = {
  name: 'portalInside',
  defaultValue: true,
  fn(instance) {
    let lastAttrName = null;
    const toAttrName = (value) => {
      if (value === false)
        return null;
      if (typeof value === 'string') {
        // Accept either full data-* or just a token (we’ll prefix data-)
        return value.startsWith('data-') ? value : `data-${value}`;
      }
      return 'data-wpp-portal-inside';
    };
    const apply = () => {
      const popper = instance.popper;
      if (!popper)
        return;
      // Clean previous
      if (lastAttrName) {
        popper.removeAttribute(lastAttrName);
      }
      const nextAttr = toAttrName(instance.props.portalInside);
      if (nextAttr) {
        popper.setAttribute(nextAttr, '');
      }
      lastAttrName = nextAttr;
    };
    return {
      onCreate() {
        apply();
      },
      onAfterUpdate(_, partial) {
        if (Object.prototype.hasOwnProperty.call(partial, 'portalInside')) {
          apply();
        }
      },
      onDestroy() {
        const popper = instance.popper;
        if (popper && lastAttrName) {
          popper.removeAttribute(lastAttrName);
        }
      },
    };
  },
};
