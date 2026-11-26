/**
 * Deepest focused element, following `activeElement` down through open shadow roots.
 *
 * `document.activeElement` only ever reports the outermost host, so a control inside a shadow
 * root — every `wpp-button`, for instance — comes back as its host element. That is not enough
 * to hand focus back to the thing that actually had it.
 */
export const getDeepActiveElement = () => {
  let node = document.activeElement;
  while (node?.shadowRoot?.activeElement) {
    node = node.shadowRoot.activeElement;
  }
  return node;
};
/**
 * Whether `node` sits inside `container`, climbing out through every shadow root in between.
 * `contains()` stops at a shadow boundary, so the native button inside a `wpp-action-button` or a
 * slotted `wpp-button` would otherwise count as outside the dialog that holds it.
 */
const containsAcrossShadowRoots = (container, node) => {
  let current = node;
  while (current) {
    if (container.contains(current))
      return true;
    current = current.getRootNode().host;
  }
  return false;
};
/**
 * Whether focus currently sits inside a dialog, counting its slotted light-DOM content, its own
 * shadow content and the shadow content of any component nested in either.
 */
export const isFocusInsideDialog = (host, dialog) => {
  const active = getDeepActiveElement();
  if (!active)
    return false;
  return containsAcrossShadowRoots(host, active) || (!!dialog && containsAcrossShadowRoots(dialog, active));
};
const isInTabOrder = (element) => {
  if (element.hasAttribute('tabindex'))
    return element.tabIndex >= 0;
  // Browsers report 0 for an anchor without `href`, which Tab skips, and -1 for an editable region, which Tab reaches.
  if (element.tagName === 'A')
    return element.hasAttribute('href');
  return element.tabIndex >= 0 || (element.hasAttribute('contenteditable') && element.isContentEditable);
};
const isTabbable = (element) => isInTabOrder(element) &&
  !element.disabled &&
  !element.closest('fieldset')?.disabled &&
  (element.checkVisibility?.({ checkVisibilityCSS: true }) ?? true);
// The tab stops under `node` in the order they render: into open shadow roots, where the native control of a
// component such as `wpp-button` lives, and through each slot to what is assigned to it (or its fallback content).
const getTabStops = (node) => {
  const children = node.assignedElements?.({ flatten: true }) ?? Array.from((node.shadowRoot ?? node).children);
  return [...(isTabbable(node) ? [node] : []), ...children.flatMap(getTabStops)];
};
/**
 * Wraps keyboard focus around a modal dialog, for the focus sentinels on either side of it: Tab past the last
 * control lands on the first, Shift+Tab before the first lands on the last (WAI-ARIA APG, Dialog pattern). A
 * dialog without controls takes focus itself; it is never a tab stop of its own (`tabindex="-1"`).
 */
export const focusDialogEdge = (dialog, edge) => {
  if (!dialog)
    return;
  const stops = getTabStops(dialog);
  (stops[edge === 'first' ? 0 : stops.length - 1] ?? dialog).focus();
};
/**
 * Nearest ancestor that owns this element's focus state, climbing out through shadow roots.
 *
 * The captured element is the native control inside a `wpp-*` trigger, and it is the trigger that
 * decides how focus looks. Walking the host chain rather than reading `document.activeElement`
 * keeps this right when the trigger is itself nested inside another shadow root.
 */
const getFocusOwner = (node) => {
  let current = node;
  while (current) {
    const candidate = current;
    if (typeof candidate.setFocus === 'function') {
      return candidate;
    }
    const root = current.getRootNode?.();
    current = root instanceof ShadowRoot ? root.host : null;
  }
  return null;
};
/**
 * Focus bookkeeping shared by the dialog components (modal, side modal, full screen modal).
 *
 * A dialog moves focus into itself when it opens and gives it back to whatever opened it when it
 * closes (WAI-ARIA APG, Dialog pattern). Without the second half focus is left on a container
 * inside a dialog that is no longer visible, so the next Tab restarts from the top of the
 * document and a screen reader user is stranded on something they cannot see.
 */
export const dialogFocusController = () => {
  let previouslyFocused = null;
  return {
    /** Remember what had focus, before the dialog takes it away. */
    capture() {
      const active = getDeepActiveElement();
      previouslyFocused = active && active !== document.body ? active : null;
    },
    /**
     * Hand focus back, if that element is still around to take it. Anything that was removed
     * while the dialog was open is skipped rather than throwing, and focus is simply left alone.
     *
     * `withKeyboardRing` is for a dialog closed from the keyboard. Our controls do not draw their
     * focus ring from `:focus-visible` — it is a class the component sets itself — and what was
     * captured is the native control *inside* the trigger's shadow root, so focusing it directly
     * puts focus back with nothing drawn on it. Going through the trigger's own `setFocus()`
     * leaves the ring on, which a keyboard user needs to see where they landed (WCAG 2.4.7). A
     * dialog dismissed with the pointer restores focus without it, the way `:focus-visible` would.
     */
    restore(options) {
      const target = previouslyFocused;
      previouslyFocused = null;
      if (!target?.isConnected)
        return;
      if (options?.withKeyboardRing) {
        const owner = getFocusOwner(target);
        if (owner) {
          owner.setFocus();
          return;
        }
      }
      if (typeof target.focus === 'function') {
        target.focus();
      }
    },
    clear() {
      previouslyFocused = null;
    },
  };
};
