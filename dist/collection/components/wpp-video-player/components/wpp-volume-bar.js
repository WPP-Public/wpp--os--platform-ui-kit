import { h } from '@stencil/core';
/**
 * Picks the side the slider opens on, each time it opens: above the mute button by default, and
 * below it when it would leave the top of the viewport and there is more room below, like a
 * flipping popover. Both players call it before showing the slider, so it lands in place.
 *
 * The default placement is restored before measuring, so a previous flip does not skew the reading.
 */
export function placeVolumeSlider(anchor, panel) {
  if (!anchor || !panel)
    return;
  panel.classList.remove('below');
  const { top: anchorTop, bottom: anchorBottom } = anchor.getBoundingClientRect();
  const isClippedAbove = panel.getBoundingClientRect().top < 0;
  const hasMoreRoomBelow = window.innerHeight - anchorBottom > anchorTop;
  if (isClippedAbove && hasMoreRoomBelow)
    panel.classList.add('below');
}
/**
 * A mute button with a volume slider that opens while the button is hovered or focused, and closes
 * shortly after both leave. While closed the slider is hidden from the tab order and from assistive
 * technology, like a closed popover, so it is only reached through the button. Escape dismisses it.
 */
export function renderVolumeBarComponent({ variant = 'inverted', withTooltip = false, withPressedState = true } = {}) {
  const isMuted = this.volume === 0;
  const label = this.volumeButtonLabel;
  const button = (h("wpp-action-button-v4-6-0", { ref: ref => (this.volumeButtonRef = ref), class: "volume-button", variant: variant, onClick: this.toggleMute, onFocus: this.handleSliderShow, onFocusout: () => this.handleSliderHide(300), ariaProps: withPressedState ? { label, pressed: isMuted } : { label } }, isMuted ? (h("wpp-icon-speaker-mute-v4-6-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-speaker-v4-6-0", { slot: "icon-start", "aria-hidden": "true" }))));
  return (h("div", { ref: ref => (this.volumeContainerRef = ref), class: { 'volume-container': true, [variant]: true }, onMouseEnter: this.handleSliderShow, onMouseLeave: () => this.handleSliderHide(300), onKeyDown: (event) => event.key === 'Escape' && this.dismissVolumeSlider() }, withTooltip ? (h("wpp-tooltip-v4-6-0", { text: label, config: { placement: 'bottom' } }, button)) : (button), h("div", { ref: ref => (this.volumeBarContainerRef = ref), class: "slider-container" }, h("label", { htmlFor: "volume-slider", class: "sr-only" }, this._locales.volumeProgressLabel), h("input", { ref: ref => (this.volumeBarRef = ref), style: { '--progress-bar-progress': `${this.volume * 100}%` }, class: "progress-bar", id: "volume-slider", type: "range", min: 0, max: 1, step: 0.01, value: this.volume, onInput: this.handleVolume, "aria-orientation": "vertical", "aria-valuemin": "0", "aria-valuemax": "1", "aria-valuenow": this.volume.toString(), "aria-valuetext": `${Math.round(this.volume * 100)}%`, autocomplete: "off", onFocus: this.handleSliderShow, onFocusout: () => this.handleSliderHide(300) }))));
}
