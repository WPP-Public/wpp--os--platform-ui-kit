import { h, Fragment } from '@stencil/core';
export function renderAccessibilityInstructionsComponent() {
  return (h(Fragment, null, h("div", { class: "sr-only", role: "status", "aria-live": "polite" }, this.videoPlayerState === 'playing'
    ? this._locales.videoStates.playing
    : this.videoPlayerState === 'paused'
      ? this._locales.videoStates.paused
      : this.videoPlayerState === 'idle'
        ? this._locales.videoStates.idle
        : ''), !this.controlPanelConfigDefault.autoplay && (h("div", { class: "sr-only", "aria-live": "polite" }, h("h2", null, this._locales.keyboardShortcutsDescription.title), h("ul", null, h("li", null, this._locales.keyboardShortcutsDescription.playPause), h("li", null, this._locales.keyboardShortcutsDescription.backwardForward), !this.controlPanelConfigDefault.showVolumeButton && (h("li", null, this._locales.keyboardShortcutsDescription.volumeUpDown)), this.caption && h("li", null, this._locales.keyboardShortcutsDescription.captions), !this.controlPanelConfigDefault.showVolumeButton && (h("li", null, this._locales.keyboardShortcutsDescription.muteUnmute)), !this.controlPanelConfigDefault.showFullscreenButton && (h("li", null, this._locales.keyboardShortcutsDescription.fullscreen)))))));
}
