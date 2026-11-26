import { h } from '@stencil/core';
export function renderCaptionsComponent() {
  const captionWrapperCssClasses = () => ({
    'captions-wrapper': true,
    'caption-enabled': this.isCaptionEnabled,
  });
  return (h("div", { class: captionWrapperCssClasses(), lang: this.caption?.srclang, ...(!this.isCaptionEnabled ? { inert: true, 'aria-hidden': 'true' } : {}) }, this.activeCues.map((cue, index) => {
    const vttCue = cue;
    const cueText = vttCue.text;
    return (h("div", { key: `cue-${index}`, class: "caption-cue" }, cueText));
  })));
}
