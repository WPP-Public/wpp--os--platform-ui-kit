import { h, Fragment } from '@stencil/core';
export function renderSeekBarComponent() {
  const id = `progress-slider-${Math.random().toString(36).slice(2, 9)}`;
  return (h(Fragment, null, h("div", { class: "progress-container" }, h("div", { class: "loading-progress", style: { width: `${this.loadedPercentage}%` }, "aria-hidden": "true" }), h("label", { htmlFor: id, class: "sr-only" }, this._locales.videoProgressLabel), h("input", { ref: ref => (this.seekBarRef = ref), id: id, class: "progress-bar", type: "range", min: 0, max: this.overallVideoTime, step: 0.01, value: this.currentVideoTime, onInput: this.handleSeek, "aria-label": this._locales.videoProgressAriaLabel, "aria-valuemin": "0", "aria-valuemax": this.overallVideoTime, "aria-valuenow": this.currentVideoTime, autocomplete: "off" }))));
}
