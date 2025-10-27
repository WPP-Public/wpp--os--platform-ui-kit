import { h } from '@stencil/core';
export function renderCaptionsComponent() {
  const captionWrapperCssClasses = () => ({
    'captions-wrapper': true,
    'caption-enabled': this.isCaptionEnabled,
  });
  return (h("div", { class: captionWrapperCssClasses(), role: "region", "aria-label": this._locales.videoCaptionsAriaLabel, "aria-live": this.isCaptionEnabled ? 'polite' : 'off' }, this.activeCues.map((cue, index) => {
    const vttCue = cue;
    const cueText = vttCue.text;
    return (h("div", { key: `cue-${index}`, class: "caption-cue", "aria-atomic": "true" }, cueText));
  })));
}
