/**
 * Deepest focused element, following `activeElement` down through open shadow roots.
 *
 * `document.activeElement` only ever reports the outermost host, so a control inside a shadow
 * root — every `wpp-button`, for instance — comes back as its host element. That is not enough
 * to hand focus back to the thing that actually had it.
 */
export declare const getDeepActiveElement: () => HTMLElement | null;
/**
 * Whether focus currently sits inside a dialog, counting its slotted light-DOM content, its own
 * shadow content and the shadow content of any component nested in either.
 */
export declare const isFocusInsideDialog: (host: HTMLElement, dialog?: HTMLElement | null) => boolean;
/**
 * Wraps keyboard focus around a modal dialog, for the focus sentinels on either side of it: Tab past the last
 * control lands on the first, Shift+Tab before the first lands on the last (WAI-ARIA APG, Dialog pattern). A
 * dialog without controls takes focus itself; it is never a tab stop of its own (`tabindex="-1"`).
 */
export declare const focusDialogEdge: (dialog: HTMLElement | undefined, edge: 'first' | 'last') => void;
/**
 * Focus bookkeeping shared by the dialog components (modal, side modal, full screen modal).
 *
 * A dialog moves focus into itself when it opens and gives it back to whatever opened it when it
 * closes (WAI-ARIA APG, Dialog pattern). Without the second half focus is left on a container
 * inside a dialog that is no longer visible, so the next Tab restarts from the top of the
 * document and a screen reader user is stranded on something they cannot see.
 */
export declare const dialogFocusController: () => {
  /** Remember what had focus, before the dialog takes it away. */
  capture(): void;
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
  restore(options?: {
    withKeyboardRing?: boolean;
  }): void;
  clear(): void;
};
