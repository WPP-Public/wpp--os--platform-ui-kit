/**
 * Deepest focused element, following `activeElement` down through open shadow roots.
 *
 * `document.activeElement` only ever reports the outermost host, so a control inside a shadow
 * root — every `wpp-button`, for instance — comes back as its host element. That is not enough
 * to hand focus back to the thing that actually had it.
 */
const getDeepActiveElement = () => {
  let node = document.activeElement;
  while (node?.shadowRoot?.activeElement) {
    node = node.shadowRoot.activeElement;
  }
  return node;
};
/**
 * Whether focus currently sits inside a dialog, counting both its slotted light-DOM content and
 * its own shadow content. `host.contains()` does not cross the shadow boundary, so the dialog
 * element has to be checked separately.
 */
const isFocusInsideDialog = (host, dialog) => {
  const active = getDeepActiveElement();
  if (!active)
    return false;
  return host.contains(active) || active === dialog || !!dialog?.contains(active);
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
const dialogFocusController = () => {
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

export { dialogFocusController as d, getDeepActiveElement as g, isFocusInsideDialog as i };
