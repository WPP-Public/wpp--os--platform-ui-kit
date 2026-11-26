import { h, Fragment } from '@stencil/core';
/**
 * The screen-reader-only live region: the last thing that happened, whether a play-state change or
 * what a control or shortcut just changed (see `announce`). Rendered from the start, idle included:
 * a live region that appears already holding its text is not announced, so it has to exist before
 * the first "Video is playing".
 */
export function renderStatusRegionComponent() {
  return (
  // Keyed: the controls are rendered in front of it on the first play, and without a key the
  // renderer would reuse this element for the control bar and create a new region, already
  // holding its text.
  h("div", { key: "status-region", class: "sr-only announcement", role: "status", "aria-live": "polite" }, this.announcement));
}
/**
 * Screen-reader-only help text. The shortcut list is generated from the live config so it can only
 * ever describe shortcuts that actually work: the volume, mute and fullscreen keys are handled
 * solely when their control is rendered, and the seek distance comes from `jumpValues`.
 */
export function renderAccessibilityInstructionsComponent() {
  return (h(Fragment, null, !this.controlPanelConfigDefault.autoplay && (h("div", { class: "sr-only" }, h("p", null, this._locales.keyboardShortcutsDescription.title), h("ul", null, h("li", null, this._locales.keyboardShortcutsDescription.playPause), h("li", null, this._locales.keyboardShortcutsDescription.backwardForward.replace('{seconds}', String(this._jumpValues.videoSkipTimeValue))), this.controlPanelConfigDefault.showVolumeButton && (h("li", null, this._locales.keyboardShortcutsDescription.volumeUpDown)), this.caption && h("li", null, this._locales.keyboardShortcutsDescription.captions), this.controlPanelConfigDefault.showVolumeButton && (h("li", null, this._locales.keyboardShortcutsDescription.muteUnmute)), this.controlPanelConfigDefault.showFullscreenButton && (h("li", null, this._locales.keyboardShortcutsDescription.fullscreen)))))));
}
