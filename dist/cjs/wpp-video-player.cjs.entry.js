'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const utils = require('./utils-8b2c3bc1.js');
const wppVolumeBar = require('./wpp-volume-bar-244a46da.js');
const subscribeToTheme = require('./subscribe-to-theme-f2fa6289.js');
const dialogFocus = require('./dialog-focus-43202cdc.js');
require('./consts-d8f5ef98.js');
require('./theme-observer-4179316e.js');

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const TIME_PADDING = 2;
const PADDING_CHAR = '0';
/**
 * Format time in seconds to a string representation
 * @param format - 'default' returns time as 'MM:SS', 'extended' returns 'HH:MM:SS'
 * @param timeInSeconds - Time in seconds to format
 * @returns Formatted time string in 'MM:SS' or 'HH:MM:SS' format
 * @throws Error if timeInSeconds is negative
 */
const formatTime = (format = 'default', timeInSeconds) => {
  if (timeInSeconds < 0)
    throw new Error('Time cannot be negative');
  const formatTwoDigits = (value) => Math.floor(value).toString().padStart(TIME_PADDING, PADDING_CHAR);
  const hours = formatTwoDigits(timeInSeconds / SECONDS_IN_HOUR);
  const minutes = formatTwoDigits((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = formatTwoDigits(timeInSeconds % SECONDS_IN_MINUTE);
  return format === 'extended' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};
const calculateBufferProgress = (videoPlayerRef) => {
  if (!videoPlayerRef || videoPlayerRef.buffered.length === 0) {
    return 0;
  }
  const duration = videoPlayerRef.duration;
  const currentTime = videoPlayerRef.currentTime;
  if (isNaN(duration) || duration <= 0) {
    return 0;
  }
  // Find the appropriate buffered range that contains the current time
  let bufferedEnd = 0;
  let found = false;
  for (let i = 0; i < videoPlayerRef.buffered.length; i++) {
    const start = videoPlayerRef.buffered.start(i);
    const end = videoPlayerRef.buffered.end(i);
    // If current playback a position is within this buffer range
    if (currentTime >= start && currentTime <= end) {
      bufferedEnd = end;
      found = true;
      break;
    }
    // If we haven't found a range yet and this range is ahead of a current position
    if (!found && start > currentTime) {
      bufferedEnd = start; // We'll show progress up to the next buffered segment
      found = true;
      break;
    }
  }
  // If no relevant buffer found, use the furthest buffered point
  if (!found && videoPlayerRef.buffered.length > 0) {
    bufferedEnd = videoPlayerRef.buffered.end(videoPlayerRef.buffered.length - 1);
  }
  // Calculate percentage relative to total duration
  const loadedPercentage = Math.min((bufferedEnd / duration) * 100, 100);
  return Math.round(loadedPercentage * 100) / 100;
};

const JUMP_VALUES_DEFAULTS = {
  videoSkipTimeValue: 5,
  volumeSkipValue: 0.05,
};
/**
 * Gap between emptying the announcement region and writing the next message (ms), so even a message
 * worded like the last one is a fresh change. Within one frame the browser can merge the two into none.
 */
const ANNOUNCEMENT_RESET_DELAY = 100;
const LOCALES_DEFAULTS = {
  notSupportedPlayer: 'Your browser does not support the video tag.',
  hostAriaLabel: 'Video player',
  videoPlayerElement: 'Video content',
  videoStates: {
    idle: 'Video is ready to play',
    playing: 'Video is playing',
    paused: 'Video is paused',
  },
  controlsAriaLabel: 'Video controls',
  playButtonAriaLabel: {
    play: 'Video playing',
    pause: 'Video paused',
  },
  playPauseButtonArealLabels: {
    play: 'Play',
    pause: 'Pause',
  },
  captionButtonAriaLabel: 'Toggle captions button',
  showCaptionsButtonAriaLabel: 'Show captions',
  hideCaptionsButtonAriaLabel: 'Hide captions',
  volumeProgressLabel: 'Volume',
  volumeButtonAriaLabel: 'Volume control button (toggle mute)',
  muteButtonAriaLabel: 'Mute',
  unmuteButtonAriaLabel: 'Unmute',
  fullscreenButtonAriaLabel: 'Fullscreen button',
  enterFullscreenButtonAriaLabel: 'Enter full screen',
  exitFullscreenButtonAriaLabel: 'Exit full screen',
  videoProgressLabel: 'Video progress',
  videoProgressAriaLabel: 'Seek video timeline',
  videoProgressValueText: '{current} of {total}',
  volumeAnnouncement: 'Volume {value}%',
  mutedAnnouncement: 'Muted',
  unmutedAnnouncement: 'Unmuted',
  captionsOnAnnouncement: 'Captions on',
  captionsOffAnnouncement: 'Captions off',
  fullscreenOnAnnouncement: 'Full screen',
  fullscreenOffAnnouncement: 'Exited full screen',
  currentTimeAriaLabel: 'Current time',
  durationAriaLabel: 'Total time',
  languageMenuAriaLabel: 'Language menu',
  videoCaptionsAriaLabel: 'Video captions',
  keyboardShortcutsDescription: {
    title: 'Keyboard shortcuts',
    playPause: 'Space: Play/Pause',
    backwardForward: 'Left/Right arrows: Seek backward/forward {seconds} seconds',
    volumeUpDown: 'Up/Down arrows: Increase/decrease volume',
    captions: 'C: Toggle captions',
    muteUnmute: 'M: Toggle mute',
    fullscreen: 'F: Toggle fullscreen',
  },
};

function renderSeekBarComponent() {
  return (index.h(index.Fragment, null,
    index.h("div", { class: "progress-container" },
      index.h("div", { class: "loading-progress", style: { width: `${this.loadedPercentage}%` }, "aria-hidden": "true" }),
      index.h("label", { htmlFor: this.seekBarId, class: "sr-only" }, this._locales.videoProgressLabel),
      index.h("input", { ref: ref => (this.seekBarRef = ref), id: this.seekBarId, class: "progress-bar", type: "range", min: 0, max: this.overallVideoTime, step: "any", value: this.currentVideoTime, onInput: this.handleSeek, onKeyDown: this.handleSeekKeyDown, ...(this.locales.videoProgressAriaLabel ? { 'aria-label': this.locales.videoProgressAriaLabel } : {}), "aria-valuemin": "0", "aria-valuemax": this.overallVideoTime, "aria-valuenow": this.spokenSeekTime, "aria-valuetext": this.seekValueText(this.spokenSeekTime), autocomplete: "off" }))));
}

function renderVideoCurrentTimeComponent(time, label) {
  return (index.h("wpp-typography-v4-7-0", { class: "video-time", type: "xs-body", part: "time" },
    index.h("span", { role: "timer", "aria-label": label }, time)));
}

function renderCaptionsComponent() {
  const captionWrapperCssClasses = () => ({
    'captions-wrapper': true,
    'caption-enabled': this.isCaptionEnabled,
  });
  return (index.h("div", { class: captionWrapperCssClasses(), lang: this.caption?.srclang, ...(!this.isCaptionEnabled ? { inert: true, 'aria-hidden': 'true' } : {}) }, this.activeCues.map((cue, index$1) => {
    const vttCue = cue;
    const cueText = vttCue.text;
    return (index.h("div", { key: `cue-${index$1}`, class: "caption-cue" }, cueText));
  })));
}

/**
 * The screen-reader-only live region: the last thing that happened, whether a play-state change or
 * what a control or shortcut just changed (see `announce`). Rendered from the start, idle included:
 * a live region that appears already holding its text is not announced, so it has to exist before
 * the first "Video is playing".
 */
function renderStatusRegionComponent() {
  return (
  // Keyed: the controls are rendered in front of it on the first play, and without a key the
  // renderer would reuse this element for the control bar and create a new region, already
  // holding its text.
  index.h("div", { key: "status-region", class: "sr-only announcement", role: "status", "aria-live": "polite" }, this.announcement));
}
/**
 * Screen-reader-only help text. The shortcut list is generated from the live config so it can only
 * ever describe shortcuts that actually work: the volume, mute and fullscreen keys are handled
 * solely when their control is rendered, and the seek distance comes from `jumpValues`.
 */
function renderAccessibilityInstructionsComponent() {
  return (index.h(index.Fragment, null, !this.controlPanelConfigDefault.autoplay && (index.h("div", { class: "sr-only" },
    index.h("p", null, this._locales.keyboardShortcutsDescription.title),
    index.h("ul", null,
      index.h("li", null, this._locales.keyboardShortcutsDescription.playPause),
      index.h("li", null, this._locales.keyboardShortcutsDescription.backwardForward.replace('{seconds}', String(this._jumpValues.videoSkipTimeValue))),
      this.controlPanelConfigDefault.showVolumeButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.volumeUpDown)),
      this.caption && index.h("li", null, this._locales.keyboardShortcutsDescription.captions),
      this.controlPanelConfigDefault.showVolumeButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.muteUnmute)),
      this.controlPanelConfigDefault.showFullscreenButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.fullscreen)))))));
}

const wppVideoPlayerCss = ".progress-container{width:100%;position:relative;height:4px;border-radius:8px;background-color:rgba(255, 255, 255, 0.3)}.loading-progress{position:absolute;top:0;left:0;height:100%;border-radius:8px;background-color:rgba(255, 255, 255, 0.3);z-index:1;pointer-events:none;max-width:100%}.video-time{cursor:default;color:var(--wpp-grey-color-000);font-variant-numeric:tabular-nums;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.volume-container{position:relative}.slider-container{position:absolute;top:-68px;left:50%;height:32px;width:80px;border-radius:6px;background-color:rgba(0, 0, 0, 0.6);-webkit-transform:translateX(-50%) rotate(270deg);transform:translateX(-50%) rotate(270deg);-webkit-transform-origin:center center;transform-origin:center center;opacity:0;visibility:hidden;pointer-events:none;-webkit-transition:opacity 0.15s ease-in-out, visibility 0s linear 0.15s;transition:opacity 0.15s ease-in-out, visibility 0s linear 0.15s}.slider-container.below{top:auto;bottom:-68px}.slider-container.active{opacity:1;visibility:visible;pointer-events:initial;-webkit-transition:opacity 0.15s ease-in-out, visibility 0s;transition:opacity 0.15s ease-in-out, visibility 0s}.slider-container .progress-bar{width:64px;height:auto;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.slider-container .progress-bar::-webkit-slider-thumb{width:12px;height:12px;margin-top:-4px;}.slider-container .progress-bar::-moz-range-thumb{width:12px;height:12px}.volume-container.open .volume-button::part(overlay){background-color:var(--ab-bg-color-hover);opacity:var(--ab-bg-opacity-hover)}.volume-container.open .volume-button>[slot=icon-start]{color:var(--ab-secondary-icon-color-hover)}.volume-container.open.inverted .volume-button::part(overlay){background-color:var(--ab-inverted-bg-color-hover)}.volume-container.open.inverted .volume-button>[slot=icon-start]{color:var(--ab-inverted-icon-color-hover)}@media (prefers-reduced-motion: reduce){.slider-container,.slider-container.active{-webkit-transition:none;transition:none}}.volume-container.open .volume-button::part(overlay){background-color:var(--ab-bg-color-hover);opacity:var(--ab-bg-opacity-hover)}.volume-container.open .volume-button>[slot=icon-start]{color:var(--ab-secondary-icon-color-hover)}.volume-container.open.inverted .volume-button::part(overlay){background-color:var(--ab-inverted-bg-color-hover)}.volume-container.open.inverted .volume-button>[slot=icon-start]{color:var(--ab-inverted-icon-color-hover)}@media (prefers-reduced-motion: reduce){.slider-container,.slider-container.active{-webkit-transition:none;transition:none}}.progress-bar{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;position:absolute;width:100%;height:100%;z-index:2;margin:0;padding:0;}.progress-bar:focus{outline:none}.progress-bar::-webkit-slider-runnable-track{width:100%;height:4px;border-radius:8px;background:-webkit-gradient(linear, left top, right top, from(#fff), to(rgba(255, 255, 255, 0.3)));background:linear-gradient(to right, #fff var(--progress-bar-progress, 0%), rgba(255, 255, 255, 0.3) var(--progress-bar-progress, 0%))}.progress-bar::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none;margin-top:-4px;}.progress-bar::-moz-range-track{width:100%;height:4px;background-color:rgba(255, 255, 255, 0.3);border-radius:8px;border:none}.progress-bar::-moz-range-progress{height:4px;background-color:#fff;border-radius:8px;border:none}.progress-bar::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none}.progress-bar::-ms-track{width:100%;height:4px;background:transparent;border-color:transparent;color:transparent;border-radius:8px}.progress-bar::-ms-fill-lower{background-color:#fff;border-radius:8px}.progress-bar::-ms-fill-upper{background-color:rgba(255, 255, 255, 0.3);border-radius:8px}.progress-bar::-ms-thumb{width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none}.progress-bar:focus-visible{border-radius:4px;outline:none;-webkit-box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000);box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}.progress-bar:focus-visible::-webkit-slider-thumb{-webkit-box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000);box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}.progress-bar:focus-visible::-moz-range-thumb{box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}@media (forced-colors: active){.progress-bar:focus-visible,.progress-bar.tab-focus{outline:2px solid CanvasText}.progress-bar:focus-visible::-webkit-slider-thumb,.progress-bar.tab-focus::-webkit-slider-thumb{outline:2px solid CanvasText}.progress-bar:focus-visible::-moz-range-thumb,.progress-bar.tab-focus::-moz-range-thumb{outline:2px solid CanvasText}}.captions-wrapper{position:absolute;bottom:60px;left:0;right:0;text-align:center;z-index:10;pointer-events:none;opacity:0;visibility:hidden;-webkit-transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out, visibility 0s linear 0.15s;transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out, visibility 0s linear 0.15s}.captions-wrapper.caption-enabled{opacity:1;visibility:visible;-webkit-transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out, visibility 0s;transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out, visibility 0s}.caption-cue{display:inline-block;font-family:Arial, sans-serif;font-size:1.2rem;color:white;background-color:rgba(0, 0, 0, 0.7);padding:0.3em 0.7em;margin:0.2em;border-radius:0.2em;max-width:80%;text-shadow:1px 1px 1px black}:host{display:-ms-flexbox;display:flex;position:relative;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background-color:#000;color:#fff;outline:none}:host:host(.wpp-full-screen) .video-player{width:100% !important;height:100% !important}:host:host(.wpp-full-screen) .controls-bar{bottom:16px;width:100%;max-width:62.5%}:host:host(.wpp-full-screen) .controls:focus-visible{-webkit-box-shadow:inset 0 0 0 2px var(--wpp-brand-color), inset 0 0 0 3px var(--wpp-grey-color-000);box-shadow:inset 0 0 0 2px var(--wpp-brand-color), inset 0 0 0 3px var(--wpp-grey-color-000)}.video-player{aspect-ratio:var(--aspect-ratio, 16/9)}.controls{background-size:cover;background-position:center;cursor:pointer;position:absolute;width:100%;height:100%;-webkit-transition:opacity 0.15s ease-in-out;transition:opacity 0.15s ease-in-out}.controls:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.controls.state-idle{cursor:default;background-color:var(--wpp-grey-color-800)}.controls.state-idle .play-button{display:-ms-flexbox;display:flex}.controls.state-idle .controls-bar{opacity:0;pointer-events:none}.controls.state-playing,.controls.state-paused{background-image:none !important;background-color:transparent}.controls.state-playing .play-button,.controls.state-paused .play-button{display:none}.controls.state-playing .controls-bar,.controls.state-paused .controls-bar{opacity:1;pointer-events:initial}.controls.state-playing.invisible .controls-bar,.controls.state-paused.invisible .controls-bar{opacity:0;visibility:hidden;pointer-events:none;-webkit-transition:opacity 0.15s ease-in-out, visibility 0s linear 0.15s;transition:opacity 0.15s ease-in-out, visibility 0s linear 0.15s}.controls.state-playing.invisible .captions-wrapper,.controls.state-paused.invisible .captions-wrapper{bottom:8px}.play-button{--wpp-icon-color:#fff;border:none;cursor:pointer;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%) scale(0.875);transform:translate(-50%, -50%) scale(0.875);width:66px;height:66px;padding:2px;overflow:hidden;border-radius:50%;background-color:rgba(0, 0, 0, 0.6);-webkit-transition:background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;transition:transform 0.15s ease-in-out, background-color 0.15s ease-in-out;transition:transform 0.15s ease-in-out, background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;z-index:1}.play-button:hover{-webkit-transform:translate(-50%, -50%) scale(1);transform:translate(-50%, -50%) scale(1);background-color:rgba(0, 0, 0, 0.72)}.play-button:active{-webkit-transform:translate(-50%, -50%) scale(0.875);transform:translate(-50%, -50%) scale(0.875);background-color:rgba(0, 0, 0, 0.78)}.play-button::part(overlay){display:none}.play-button::part(button){border-radius:50%;width:100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.play-button.invisible{visibility:hidden;z-index:-1}.controls-bar{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;gap:8px;-ms-flex-align:center;align-items:center;position:absolute;bottom:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);background-color:rgba(0, 0, 0, 0.6);padding:6px 8px;border-radius:6px;width:calc(100% - 32px);-webkit-transition:opacity 0.15s ease-in-out, visibility 0s;transition:opacity 0.15s ease-in-out, visibility 0s;cursor:default;z-index:10}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host([data-wpp-theme=dark]){--wpp-prop-icon-color:var(--wpp-grey-color-1000)}:host([data-wpp-theme=dark]) .video-time{--wpp-text-color:var(--wpp-grey-color-1000);color:var(--wpp-grey-color-1000)}:host([data-wpp-theme=dark]) .wpp-icon-play-filled,:host([data-wpp-theme=dark]) .wpp-icon-pause-filled,:host([data-wpp-theme=dark]) .wpp-icon-speaker,:host([data-wpp-theme=dark]) .wpp-icon-fullscreen{color:var(--wpp-grey-color-1000)}@media (forced-colors: active){.controls:focus-visible{outline:2px solid CanvasText}:host(.wpp-full-screen) .controls:focus-visible{outline-offset:-2px}}";

const WppVideoPlayer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    /** Fullscreen takes focus away like a dialog does, so it is handed back the same way. */
    this.fullscreenFocus = dialogFocus.dialogFocusController();
    /** Set on teardown: the volume slider's hide timer writes state and must not fire after it. */
    this.isDisposed = false;
    /** Minted once per element: a fresh id on every render would keep re-pointing the seek
     *  slider's `<label for>` at a new target. */
    this.seekBarId = `progress-slider-${Math.random().toString(36).slice(2, 9)}`;
    // Sizing
    this.videoPlayerHostSize = {};
    this.videoPlayerSize = {};
    this.aspectRatio = '';
    this.hideDelay = 5000;
    this.savedScrollPosition = { x: 0, y: 0 };
    /** Restored by `toggleMute`. Full volume by default, so unmuting a player that started silent
     *  actually produces sound rather than restoring the silence it began with. */
    this.savedVolume = 1;
    this.controlPanelConfigDefault = {
      showFullscreenButton: true,
      showVolumeButton: true,
      autoplay: false,
      loop: false,
    };
    this.preventMouseLeaveEvent = false;
    this.availableLanguages = [];
    /**
     * Speaks `text` through the live region. Callers only announce a real change. The region is
     * emptied first, because a change made without an announcement (dragging the volume, playback
     * moving on) can leave the previous message in place, and the same words again would be silent.
     */
    this.announce = (text) => {
      clearTimeout(this.announcementTimeout);
      this.announcement = '';
      this.announcementTimeout = setTimeout(() => {
        this.announcementTimeout = undefined;
        if (!this.isDisposed)
          this.announcement = text;
      }, ANNOUNCEMENT_RESET_DELAY);
    };
    this.announceVolume = () => {
      this.announce(this._locales.volumeAnnouncement.replace('{value}', String(Math.round(this.volume * 100))));
    };
    /** One `volumeSkipValue` step up (1) or down (-1), rounded so repeated steps do not drift (0.95 - 0.05). */
    this.stepVolume = (direction) => Math.min(Math.max(Math.round((this.volume + direction * this._jumpValues.volumeSkipValue) * 100) / 100, 0), 1);
    /**
     * Moves the playback position one `videoSkipTimeValue` step back (-1) or forward (1), within the
     * video, and returns the new time. Shared by the shortcuts and the seek slider's own arrow keys.
     */
    this.seekBy = (direction) => {
      if (!this.videoPlayerRef)
        return this.currentVideoTime;
      const time = Math.min(Math.max(this.videoPlayerRef.currentTime + direction * this._jumpValues.videoSkipTimeValue, 0), this.overallVideoTime);
      this.videoPlayerRef.currentTime = time;
      // Without waiting for `timeupdate`, so the seek slider's value text is already the new time.
      this.currentVideoTime = time;
      this.spokenSeekTime = time;
      return time;
    };
    this.setupKeyboardEventListeners = () => {
      document.addEventListener('keydown', this.handleKeyboardInput);
    };
    this.removeKeyboardEventListeners = () => {
      document.removeEventListener('keydown', this.handleKeyboardInput);
    };
    this.handleKeyboardInput = (event) => {
      if (this.isDisposed)
        return;
      if (!this.host.matches(':focus-within') || !this.videoPlayerRef)
        return;
      // The shortcuts are plain keys. With Ctrl, Cmd or Alt held the press belongs to the browser or
      // the OS (copy, find, Back, minimise), so it is left alone.
      if (event.ctrlKey || event.metaKey || event.altKey)
        return;
      const focusedEl = this.host.shadowRoot?.activeElement;
      // For the case when autoplay=true and loop = false, to play video again with focus on the video element
      if (focusedEl === this.videoPlayerRef && event.code === 'Space') {
        this.togglePlay();
        event.preventDefault();
        return;
      }
      if (this.controlPanelConfigDefault.autoplay)
        return;
      if (this.isInvisible)
        this.showControls();
      switch (event.code) {
        case 'ArrowLeft':
        case 'ArrowRight': {
          // The seek bar handles its own ←/→ (`handleSeekKeyDown`). Without this guard the press is
          // applied twice, and announced here on top of the slider reading its own value.
          if (this.seekBarRef && focusedEl === this.seekBarRef)
            return;
          const previousTime = this.videoPlayerRef.currentTime;
          const time = this.seekBy(event.code === 'ArrowLeft' ? -1 : 1);
          // At either end nothing moves, so there is nothing to say.
          if (time !== previousTime)
            this.announce(this.seekValueText(time));
          break;
        }
        case 'ArrowDown':
        case 'ArrowUp': {
          if (!this.controlPanelConfigDefault.showVolumeButton)
            return;
          // On the volume slider too, so its ↑/↓ move by `volumeSkipValue` like everywhere else; its own
          // step stays fine-grained for dragging. The `preventDefault` below cancels the slider's step.
          const isOnVolumeSlider = !!this.volumeBarRef && focusedEl === this.volumeBarRef;
          const volume = this.stepVolume(event.code === 'ArrowUp' ? 1 : -1);
          const hasChanged = volume !== this.volume;
          this.volume = volume;
          // Silent at 0% and 100%, where nothing changed. The focused slider reads its own new value, so
          // announcing it as well would say it twice.
          if (hasChanged && !isOnVolumeSlider)
            this.announceVolume();
          this.showControls();
          if (isOnVolumeSlider) {
            this.handleSliderShow();
          }
          else {
            this.showAndHideVolumeSlider();
          }
          break;
        }
        case 'Space':
          // Remove interaction when focus on play/mute/fullscreen button's
          if ((this.initPlayButtonRef && this.initPlayButtonRef === focusedEl) ||
            (this.volumeButtonRef && this.volumeButtonRef === focusedEl) ||
            (this.fullScreenButtonRef && this.fullScreenButtonRef === focusedEl) ||
            (this.captionButtonRef && this.captionButtonRef === focusedEl) ||
            (this.playPauseButtonRef && this.playPauseButtonRef === focusedEl)) {
            return;
          }
          this.togglePlay();
          break;
        case 'KeyM':
          if (this.controlPanelConfigDefault.showVolumeButton)
            this.toggleMute();
          break;
        case 'KeyF':
          if (this.controlPanelConfigDefault.showFullscreenButton)
            this.toggleFullscreen();
          break;
        case 'KeyC':
          if (this.caption)
            this.toggleCaptions();
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    this.handleTimeUpdate = () => {
      if (!this.videoPlayerRef)
        return;
      this.currentVideoTime = this.videoPlayerRef.currentTime;
    };
    this.handleMetadataLoaded = () => {
      if (!this.videoPlayerRef)
        return;
      if (this.videoPlayerRef.duration > 3600) {
        this.timeFormat = 'extended';
      }
      this.overallVideoTime = this.videoPlayerRef.duration;
      if (this.videoPlayerRef.videoWidth && this.videoPlayerRef.videoHeight) {
        this.aspectRatio = (this.videoPlayerRef.videoWidth / this.videoPlayerRef.videoHeight).toString();
        this.videoPlayerRef.style.setProperty('--aspect-ratio', this.aspectRatio);
      }
      this.setupCustomCaptions();
    };
    this.handleLoadProgress = () => {
      if (!this.videoPlayerRef || !this.videoPlayerRef.buffered.length)
        return;
      this.loadedPercentage = calculateBufferProgress(this.videoPlayerRef);
    };
    this.handleSeek = (event) => {
      if (!this.videoPlayerRef)
        return;
      const time = parseFloat(event.target.value);
      this.videoPlayerRef.currentTime = time;
      // A drag, a click on the track or Home/End: a deliberate move, so the slider reports it even mid-play.
      this.spokenSeekTime = time;
    };
    /**
     * The slider's own ←/→ step is 1% of the duration (`step="any"`, kept for smooth scrubbing): 0.1s
     * on a short clip, which leaves the spoken "00:03 of 00:10" unchanged, so the press sounds like it
     * did nothing. They move by the shortcut's distance instead, so every press says a new time.
     */
    this.handleSeekKeyDown = (event) => {
      if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight')
        return;
      if (event.ctrlKey || event.metaKey || event.altKey)
        return;
      event.preventDefault();
      this.seekBy(event.code === 'ArrowLeft' ? -1 : 1);
    };
    this.handleVolume = (event) => {
      if (!this.videoPlayerRef)
        return;
      this.volume = parseFloat(event.target.value);
    };
    this.handlePlayStateChange = () => {
      if (!this.videoPlayerRef)
        return;
      // Follow the element rather than assuming our own state is still right: the browser pauses and
      // resumes playback on its own, and a control named from a stale state offers the wrong action.
      this.videoPlayerState = this.videoPlayerRef.paused ? 'paused' : 'playing';
      if (this.videoPlayerState === 'playing') {
        this.showControls();
      }
    };
    this.handleVideoEnded = () => {
      // The last `timeupdate` can land slightly before the end, so pin the progress to the full duration
      if (this.videoPlayerRef) {
        this.currentVideoTime = this.videoPlayerRef.duration;
      }
      // Autoplay has no controls bar, so it falls back to the main play button to replay
      if (this.controlPanelConfigDefault.autoplay) {
        this.videoPlayerState = 'idle';
        return;
      }
      this.videoPlayerState = 'paused';
    };
    this.handleSliderShow = () => this.volumeSliderShow();
    this.handleSliderHide = (delay) => this.volumeSliderHide(delay);
    /** The container's `open` class keeps the mute button in its hover look while the slider shows. */
    this.volumeSliderShow = () => {
      if (!this.volumeBarContainerRef || !this.volumeButtonRef)
        return;
      clearTimeout(this.hoverTimeout);
      wppVolumeBar.placeVolumeSlider(this.volumeContainerRef, this.volumeBarContainerRef);
      this.volumeBarContainerRef.classList.add('active');
      this.isVolumeSliderOpen = true;
      this.volumeContainerRef?.classList.add('open');
    };
    this.volumeSliderHide = (delay = 300) => {
      if (this.hoverTimeout)
        clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(this.volumeSliderHideNow, delay);
    };
    this.volumeSliderHideNow = () => {
      if (this.isDisposed)
        return;
      this.volumeBarContainerRef?.classList.remove('active');
      this.isVolumeSliderOpen = false;
      this.volumeContainerRef?.classList.remove('open');
    };
    /**
     * Escape closes the slider at once. A closed slider is hidden from the focus, so when the focus
     * sits on it, it is moved back to the mute button first; that focus would reopen the slider,
     * which is why the hide follows it rather than the other way round.
     */
    this.dismissVolumeSlider = () => {
      if (!this.volumeBarContainerRef?.classList.contains('active'))
        return;
      if (this.host.shadowRoot?.activeElement === this.volumeBarRef) {
        this.volumeButtonRef?.shadowRoot?.querySelector('button')?.focus();
      }
      if (this.hoverTimeout)
        clearTimeout(this.hoverTimeout);
      this.volumeSliderHideNow();
    };
    this.handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement;
      // This player's own state: every player listens on `document`, so any element going fullscreen
      // used to flip all of them, and would now have each one announce it.
      const isFullscreen = fullscreenElement === this.host;
      if (isFullscreen === this.isFullscreen)
        return;
      this.isFullscreen = isFullscreen;
      // A change `toggleFullscreen` has not already made, e.g. leaving with Escape through the browser.
      this.announce(isFullscreen ? this._locales.fullscreenOnAnnouncement : this._locales.fullscreenOffAnnouncement);
    };
    this.handleMouseLeave = () => {
      if (this.videoPlayerState !== 'idle')
        this.hideControls();
    };
    /** Reveals the controls when focus moves into them, so a focused control is never hidden. */
    this.handleFocusIn = () => {
      if (this.isInvisible)
        this.showControls();
    };
    /** Focus has left the player, so the bar may go back to hiding on the usual delay. */
    this.handleFocusOut = () => {
      if (!this.isInvisible)
        this.showControls();
    };
    this.handleMouseMove = () => {
      this.showControls();
    };
    this.handleControlsDblClick = (event) => {
      if (this.controlPanelConfigDefault.showFullscreenButton &&
        event.target === this.controlsRef &&
        this.videoPlayerState !== 'idle')
        this.toggleFullscreen();
    };
    this.handleControlsClick = (event) => {
      if (event.target === this.controlsRef &&
        this.videoPlayerState !== 'idle' &&
        event.target !== this.playPauseButtonRef) {
        this.controlsRef?.focus();
        this.togglePlay();
      }
    };
    this.showControls = () => {
      if (this.hideControlsTimeout) {
        window.clearTimeout(this.hideControlsTimeout);
        this.hideControlsTimeout = null;
      }
      this.isInvisible = false;
      if (this.videoPlayerState === 'playing') {
        this.hideControlsTimeout = window.setTimeout(this.hideControlsUnlessFocused, this.hideDelay);
      }
    };
    /**
     * Hiding the bar takes it out of the tab order, so a control the user is currently sitting on
     * must never be hidden from under them. While focus is inside the bar the timer simply starts
     * again; it hides once focus has left. `:focus-within` is used rather than `activeElement`
     * because it is the only check that crosses into the controls' own shadow roots.
     */
    this.hideControlsUnlessFocused = () => {
      if (this.controlsBarRef?.matches(':focus-within')) {
        this.hideControlsTimeout = window.setTimeout(this.hideControlsUnlessFocused, this.hideDelay);
        return;
      }
      this.isInvisible = true;
    };
    this.hideControls = () => {
      if (this.preventMouseLeaveEvent)
        return;
      if (this.hideControlsTimeout) {
        window.clearTimeout(this.hideControlsTimeout);
        this.hideControlsTimeout = null;
      }
      this.isInvisible = true;
    };
    this.updateSeekProgress = (value) => {
      if (!this.seekBarRef)
        return;
      const min = parseFloat(this.seekBarRef.min);
      const max = parseFloat(this.seekBarRef.max);
      const progress = max > min ? Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100) : 0;
      this.seekBarRef.style.setProperty('--progress-bar-progress', `${progress}%`);
    };
    this.showAndHideVolumeSlider = (delay = 1000) => {
      this.handleSliderShow();
      clearTimeout(this.hoverTimeout);
      this.handleSliderHide(delay);
    };
    this.setupCustomCaptions = () => {
      if (!this.videoPlayerRef || !this.caption)
        return;
      this.textTracks = this.videoPlayerRef.textTracks;
      this.updateAvailableTracks();
      this.setActiveTrack(this.selectedLanguage);
      this.videoPlayerRef.textTracks.onaddtrack = event => {
        const track = event.track;
        if (!track)
          return;
        if (track.kind === 'subtitles' || track.kind === 'captions') {
          track.mode = 'hidden';
          track.oncuechange = () => {
            if (track.activeCues) {
              this.activeCues = Array.from(track.activeCues);
            }
          };
        }
      };
    };
    this.updateAvailableTracks = () => {
      if (!this.textTracks)
        return;
      const languages = [];
      for (let i = 0; i < this.textTracks.length; i++) {
        const track = this.textTracks[i];
        if (track.kind === 'subtitles' || track.kind === 'captions') {
          languages.push({
            code: track.language,
            label: track.label || track.language,
          });
        }
      }
      this.availableLanguages = languages;
    };
    this.setActiveTrack = (languageCode) => {
      if (!this.textTracks)
        return;
      if (this.activeTrack)
        this.activeTrack.oncuechange = null;
      this.activeCues = [];
      for (let i = 0; i < this.textTracks.length; i++) {
        const track = this.textTracks[i];
        track.mode = 'disabled';
      }
      for (let i = 0; i < this.textTracks.length; i++) {
        const track = this.textTracks[i];
        if (track.language === languageCode) {
          track.mode = 'hidden';
          this.activeTrack = track;
          // Set up cue change listener
          track.oncuechange = () => {
            if (track.activeCues) {
              this.activeCues = Array.from(track.activeCues);
            }
          };
          break;
        }
      }
    };
    this.togglePlay = () => {
      this.videoPlayerState === 'playing' ? this.pause() : this.play();
    };
    // The toggles below announce their result themselves, so the button and the shortcut are heard
    // alike: screen readers rarely re-read a focused button whose name has just flipped.
    this.toggleCaptions = () => {
      if (!this.videoPlayerRef)
        return;
      this.isCaptionEnabled = !this.isCaptionEnabled;
      this.announce(this.isCaptionEnabled ? this._locales.captionsOnAnnouncement : this._locales.captionsOffAnnouncement);
    };
    this.toggleMute = () => {
      if (!this.videoPlayerRef)
        return;
      if (this.volume === 0) {
        this.volume = this.savedVolume;
      }
      else {
        this.savedVolume = this.volume;
        this.volume = 0;
      }
      this.announce(this.volume === 0 ? this._locales.mutedAnnouncement : this._locales.unmutedAnnouncement);
    };
    this.toggleFullscreen = async (event) => {
      if (!this.videoPlayerRef || !this.controlPanelConfigDefault.showFullscreenButton)
        return;
      // A click the keyboard synthesised reports `detail === 0`; the `F` shortcut calls this with no
      // event at all. Either way focus should come back wearing its ring.
      const fromKeyboard = !event || event.detail === 0;
      try {
        if (!this.isFullscreen) {
          if (this.host.requestFullscreen) {
            this.savedScrollPosition = {
              x: window.scrollX,
              y: window.scrollY,
            };
            this.fullscreenFocus.capture();
            await this.host.requestFullscreen();
          }
        }
        else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
            // Hand focus back to the control that opened fullscreen, not to the `tabindex="-1"`
            // container, which would strand a keyboard user on something they cannot see.
            this.fullscreenFocus.restore({ withKeyboardRing: fromKeyboard });
            window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y);
            window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y);
          }
        }
        this.isFullscreen = !this.isFullscreen;
        // Reached only once the switch went through; a refused request throws past this.
        this.announce(this.isFullscreen ? this._locales.fullscreenOnAnnouncement : this._locales.fullscreenOffAnnouncement);
      }
      catch (error) {
        console.error('Fullscreen error:', error);
      }
    };
    this.sourceRender = () => {
      const src = Array.isArray(this.src) ? this.src : [this.src];
      const type = Array.isArray(this.type) ? this.type : [this.type];
      this.sourceElements = src.map((src, ndx) => index.h("source", { src: src, type: type[ndx] }));
    };
    this.trackRender = () => {
      if (!this.caption)
        return;
      this.trackElements = (index.h("track", { label: this.caption.label, kind: this.caption.kind, src: this.caption.src, srclang: this.caption.srclang, default: this.caption.default }));
    };
    this.createSizeProps = () => {
      const createDimensionProps = (value, dimension) => {
        const isNumeric = typeof value === 'number';
        return {
          numeric: isNumeric ? { [dimension]: value } : {},
          style: isNumeric ? { [dimension]: `${value}px` } : { [dimension]: value },
          isNonNumeric: !isNumeric,
        };
      };
      const width = createDimensionProps(this.size.width, 'width');
      const height = createDimensionProps(this.size.height, 'height');
      this.videoPlayerHostSize = {
        style: {
          ...width.style,
          ...height.style,
        },
      };
      this.videoPlayerSize = {
        ...width.numeric,
        ...height.numeric,
        style: {
          ...(width.isNonNumeric ? { width: '100%' } : {}),
          ...(height.isNonNumeric ? { height: '100%' } : {}),
        },
      };
    };
    this.hostCssClasses = () => ({
      'wpp-video-player': true,
      'wpp-full-screen': this.isFullscreen,
      'wpp-autoplay': this.controlPanelConfigDefault.autoplay ?? false,
      [`wpp-${this.videoPlayerState}`]: true,
    });
    this.controlsCssClasses = () => ({
      controls: true,
      [`state-${this.videoPlayerState}`]: true,
      invisible: this.isInvisible,
    });
    this.playButtonCssClasses = () => ({
      'play-button': true,
      // An autoplay player renders no control bar, so this overlay button is its only way to stop a
      // video that started by itself, and its only way to replay one that has finished. It auto-hides
      // like the control bar *while the video is playing* and comes back on pointer or keyboard; the
      // <video> itself is focusable on autoplay, so there is always a way to bring it back. Once
      // playback stops it stays put, because at that point it is the only control there is — keying
      // this on the hide timer alone would leave a finished video with no way to replay it.
      // Everywhere else this is just the idle-state poster button and gives way to the control bar.
      invisible: this.controlPanelConfigDefault.autoplay
        ? this.videoPlayerState === 'playing' && this.isInvisible
        : this.videoPlayerState !== 'idle',
    });
    /**
     * Render the main play button only for:
     * - autoplay=false && state = idle
     * - autoplay=true
     */
    this.renderMainPlayButton = () => (index.h("wpp-action-button-v4-7-0", { ref: ref => (this.initPlayButtonRef = ref), class: this.playButtonCssClasses(), onClick: this.togglePlay, variant: "inverted", ariaProps: { label: this.playPauseLabel } }, this.videoPlayerState !== 'playing' ? (index.h("wpp-icon-play-filled-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-pause-filled-v4-7-0", { slot: "icon-start", "aria-hidden": "true" }))));
    this.renderVideoTag = () => (index.h("video", { ref: ref => (this.videoPlayerRef = ref), id: "video-element", class: "video-player", part: "video-player", controls: false, poster: this.thumbnail, autoplay: this.controlPanelConfigDefault.autoplay, muted: this.volume === 0, loop: this.controlPanelConfigDefault.loop, preload: this.preload, onEnded: this.handleVideoEnded, onLoadedMetaData: this.handleMetadataLoaded, ...(this.controlPanelConfigDefault.autoplay
        ? {
          onClick: this.togglePlay,
          tabindex: '0',
          'aria-label': this._locales.videoPlayerElement,
          // The browser pauses an autoplaying video on its own — scrolling it out of view is
          // enough. Without these the player's state never finds out, and the pause control ends
          // up offering to pause a video that already stopped.
          onPlay: this.handlePlayStateChange,
          onPause: this.handlePlayStateChange,
        }
        : {
          onTimeUpdate: this.handleTimeUpdate,
          onProgress: this.handleLoadProgress,
          onSeeked: this.handleLoadProgress,
          onSeeking: this.handleLoadProgress,
          onPlay: this.handlePlayStateChange,
          onPause: this.handlePlayStateChange,
        }), ...this.videoPlayerSize }, this.sourceElements, this.trackElements, this._locales.notSupportedPlayer));
    this.renderVideoTime = (timeInSeconds, label) => renderVideoCurrentTimeComponent.call(this, formatTime(this.timeFormat, timeInSeconds), label);
    this.renderSeekBar = () => renderSeekBarComponent.call(this);
    this.renderVolumeBar = () => wppVolumeBar.renderVolumeBarComponent.call(this, { withPressedState: false });
    this.renderCaptions = () => renderCaptionsComponent.call(this);
    this.renderAccessibilityInstructions = () => renderAccessibilityInstructionsComponent.call(this);
    this.renderStatusRegion = () => renderStatusRegionComponent.call(this);
    this.videoPlayerState = 'idle';
    this.currentVideoTime = 0;
    this.spokenSeekTime = 0;
    this.timeFormat = 'default';
    this.overallVideoTime = 0;
    this.loadedPercentage = 0;
    this.volume = 1;
    this.isFullscreen = false;
    this.isInvisible = false;
    this.isCaptionEnabled = false;
    this.isVolumeSliderOpen = false;
    this.activeCues = [];
    this.selectedLanguage = '';
    this.announcement = '';
    this.src = '';
    this.thumbnail = '';
    this.caption = undefined;
    this.type = 'video/mp4';
    this.size = { width: 640, height: 360 };
    this.controlPanelConfig = {};
    this.preload = 'metadata';
    this.locales = {};
    this.jumpValues = JUMP_VALUES_DEFAULTS;
    this.ariaProps = {};
  }
  /**
   * Plays the current video using the video player reference if it is available.
   *
   * @return {Promise<void>} A promise that resolves when the video begins playback.
   */
  async play() {
    this.videoPlayerRef?.play();
    this.videoPlayerState = 'playing';
  }
  /**
   * Pauses the video playback.
   *
   * @return {Promise<void>} A promise that resolves when the video is successfully paused.
   */
  async pause() {
    this.videoPlayerRef?.pause();
    this.videoPlayerState = 'paused';
  }
  onVideoPlayerState(value, oldValue) {
    if (value !== 'playing')
      this.spokenSeekTime = this.currentVideoTime;
    this.announce(this._locales.videoStates[value]);
    if (oldValue === 'idle') {
      this.controlsRef?.focus();
      // Prevent double togglePlay when user navigating with keyboard
      setTimeout(() => {
        this.setupKeyboardEventListeners();
      }, 0);
    }
    else if (oldValue === 'playing' &&
      value === 'idle' &&
      !this.controlPanelConfigDefault.autoplay &&
      !this.controlPanelConfigDefault.loop) {
      this.removeKeyboardEventListeners();
    }
  }
  onVolumeChange(value) {
    if (!this.videoPlayerRef)
      return;
    this.videoPlayerRef.muted = value === 0;
    this.videoPlayerRef.volume = value;
  }
  onCurrentVideoTimeChange(value) {
    const isSeekBarFocused = !!this.seekBarRef && this.host.shadowRoot?.activeElement === this.seekBarRef;
    if (this.videoPlayerState !== 'playing' || !isSeekBarFocused)
      this.spokenSeekTime = value;
    if (!this.videoPlayerRef)
      return;
    this.updateSeekProgress(value);
  }
  onSelectedLanguageChange(value) {
    this.setActiveTrack(value);
  }
  componentWillLoad() {
    this.announcement = this._locales.videoStates.idle;
    if (this.caption) {
      this.selectedLanguage = this.caption.srclang;
      this.isCaptionEnabled = !!this.caption.default;
    }
    this.controlPanelConfigDefault = {
      ...this.controlPanelConfigDefault,
      ...this.controlPanelConfig,
    };
    // `muted` starts the video silent but keeps the volume button, so the viewer can turn sound
    // on. Autoplay renders no controls bar and no volume button means none at all, so neither has
    // a way to turn sound off: both must start silent.
    const { autoplay, muted, showVolumeButton } = this.controlPanelConfigDefault;
    if (autoplay || muted || !showVolumeButton)
      this.volume = 0;
    this.createSizeProps();
    this.sourceRender();
    this.trackRender();
  }
  componentDidLoad() {
    // The starting volume is chosen in `componentWillLoad`, before the <video> exists, so the
    // `volume` watcher fires against a missing ref and its effect is lost. Push it on once.
    if (this.videoPlayerRef) {
      this.videoPlayerRef.volume = this.volume;
      this.videoPlayerRef.muted = this.volume === 0;
    }
    if (this.controlPanelConfigDefault.autoplay) {
      // The browser can still block autoplay, so the state waits for the <video>'s own `play` event
      // rather than assuming it: a blocked video keeps a "Play" control instead of a "Pause" that
      // does nothing. That event also starts the overlay's hide timer. Space on the focused video
      // has to work before then, so the shortcut listener goes on now rather than on leaving `idle`.
      this.setupKeyboardEventListeners();
    }
    if (!this.controlPanelConfigDefault.autoplay && this.controlPanelConfigDefault.showFullscreenButton) {
      document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    // The listener is registered on `document`, so it has to come off `document` — taking it off
    // the host left it attached for the lifetime of the page. Autoplay players register it too.
    this.removeKeyboardEventListeners();
    if (!this.controlPanelConfigDefault.autoplay && this.controlPanelConfigDefault.showFullscreenButton) {
      document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    }
    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout);
    }
    // The volume slider's hide timer writes component state when it fires, so leaving it running
    // past teardown throws inside Stencil rather than failing quietly. Same for a pending announcement.
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.announcementTimeout);
    this.fullscreenFocus.clear();
    this.isDisposed = true;
  }
  get _locales() {
    const { videoStates, playPauseButtonArealLabels, keyboardShortcutsDescription } = this.locales;
    // `mergeLocales` is a shallow spread, so merge the nested groups per key: a partial override
    // (e.g. only `videoStates.playing`) keeps the default wording for the keys it leaves out.
    return {
      ...utils.mergeLocales(LOCALES_DEFAULTS, this.locales),
      videoStates: { ...LOCALES_DEFAULTS.videoStates, ...videoStates },
      playPauseButtonArealLabels: { ...LOCALES_DEFAULTS.playPauseButtonArealLabels, ...playPauseButtonArealLabels },
      keyboardShortcutsDescription: {
        ...LOCALES_DEFAULTS.keyboardShortcutsDescription,
        ...keyboardShortcutsDescription,
      },
    };
  }
  /** `jumpValues` over the defaults: one key passed alone used to leave the other undefined (NaN volume). */
  get _jumpValues() {
    return { ...JUMP_VALUES_DEFAULTS, ...this.jumpValues };
  }
  /** Names the action the press performs, honouring a consumer's deprecated override. */
  get playPauseLabel() {
    const isPlaying = this.videoPlayerState === 'playing';
    const current = isPlaying
      ? this._locales.playPauseButtonArealLabels.pause
      : this._locales.playPauseButtonArealLabels.play;
    const legacy = this.locales.playButtonAriaLabel;
    // `mergeLocales` is a shallow spread, so a half-filled legacy object replaces the default
    // outright and leaves the other state with no name at all. Fall back per sub-key: a control
    // with no accessible name is worse than one wearing the replacement wording.
    if (legacy)
      return (isPlaying ? legacy.play : legacy.pause) ?? current;
    return current;
  }
  /**
   * The shared volume bar reads the mute button's label from here. It names the click action, so
   * it swaps with the mute state — the same contract as `wpp-audio-player`, which is why the bar
   * is rendered with `withPressedState: false`: a toggle uses a flipping name or `aria-pressed`,
   * never both.
   */
  get volumeButtonLabel() {
    // A consumer still passing the replaced key keeps their own translation until it goes in
    // v5.0.0 — deprecating it must not silently drop a string they already ship.
    return (this.locales.volumeButtonAriaLabel ??
      (this.volume === 0 ? this._locales.unmuteButtonAriaLabel : this._locales.muteButtonAriaLabel));
  }
  /** The seek position as spoken: the clock time and the total, e.g. "00:15 of 01:40". */
  seekValueText(timeInSeconds) {
    const current = formatTime(this.timeFormat, timeInSeconds);
    // A live stream has no end (`duration` is Infinity), which would be read out as "NaN:NaN".
    if (!Number.isFinite(this.overallVideoTime))
      return current;
    return this._locales.videoProgressValueText
      .replace('{current}', current)
      .replace('{total}', formatTime(this.timeFormat, this.overallVideoTime));
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "video-player, controls", onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, onFocusin: this.handleFocusIn, onFocusout: this.handleFocusOut, ...this.videoPlayerHostSize,
      // `group` rather than `region`: a region is a landmark, and a page with several players
      // used to list the same landmark name over and over. A consumer can still opt into one per
      // instance through `ariaProps`. Matches wpp-audio-player.
      role: this.ariaProps.role || 'group', "aria-label": this.ariaProps.label || this._locales.hostAriaLabel }, this.renderVideoTag(), this.renderMainPlayButton(), !this.controlPanelConfigDefault.autoplay && (index.h("div", { ref: ref => (this.controlsRef = ref), ...(this.thumbnail ? { style: { backgroundImage: `url(${this.thumbnail})` } } : {}), class: this.controlsCssClasses(), part: "controls",
      // Hiding the bar takes it out of the tab order, so without this the player has no tab
      // stop at all while it plays and the controls become unreachable by keyboard. The
      // container takes the stop instead; focusing it brings the controls back, and it hands
      // the stop straight back to them once they are visible.
      tabindex: this.isInvisible ? '0' : '-1', ...(this.videoPlayerState !== 'idle'
        ? {
          onDblClick: this.handleControlsDblClick,
          onClick: this.handleControlsClick,
          // `group`, not `region`: a region is a landmark, and this one is identical on
          // every player, so a page with several of them listed the same landmark over
          // and over. The host already carries the per-instance name.
          role: 'group',
          'aria-label': this._locales.controlsAriaLabel,
        }
        : {}) }, this.videoPlayerState !== 'idle' && (index.h(index.Fragment, null, this.caption && this.renderCaptions(), index.h("div", { class: "controls-bar", ref: ref => (this.controlsBarRef = ref), ...(this.isInvisible ? { inert: true, 'aria-hidden': 'true' } : {}) }, index.h("wpp-action-button-v4-7-0", { ref: ref => (this.playPauseButtonRef = ref), class: "play-pause-button", variant: "inverted", onClick: this.togglePlay, ariaProps: { label: this.playPauseLabel } }, this.videoPlayerState === 'playing' ? (index.h("wpp-icon-pause-filled-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-play-filled-v4-7-0", { slot: "icon-start", "aria-hidden": "true" }))), this.renderVideoTime(this.currentVideoTime, this._locales.currentTimeAriaLabel), this.renderSeekBar(), this.renderVideoTime(this.overallVideoTime, this._locales.durationAriaLabel), this.caption && (index.h("wpp-action-button-v4-7-0", { ref: ref => (this.captionButtonRef = ref), onClick: this.toggleCaptions, variant: "inverted", ariaProps: {
        label: this.locales.captionButtonAriaLabel ??
          (this.isCaptionEnabled
            ? this._locales.hideCaptionsButtonAriaLabel
            : this._locales.showCaptionsButtonAriaLabel),
      } }, this.isCaptionEnabled ? (index.h("wpp-icon-caption-on-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-caption-off-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })))), this.controlPanelConfigDefault.showVolumeButton && this.renderVolumeBar(), this.controlPanelConfigDefault.showFullscreenButton && (index.h("wpp-action-button-v4-7-0", { ref: ref => (this.fullScreenButtonRef = ref), onClick: this.toggleFullscreen, variant: "inverted", ariaProps: {
        label: this.locales.fullscreenButtonAriaLabel ??
          (this.isFullscreen
            ? this._locales.exitFullscreenButtonAriaLabel
            : this._locales.enterFullscreenButtonAriaLabel),
      } }, this.isFullscreen ? (index.h("wpp-icon-fullscreen-minimise-v4-7-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-fullscreen-v4-7-0", { slot: "icon-start", "aria-hidden": "true" }))))), this.renderAccessibilityInstructions())), this.renderStatusRegion()))));
  }
  static get registryIs() { return "wpp-video-player-v4-7-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "videoPlayerState": ["onVideoPlayerState"],
    "volume": ["onVolumeChange"],
    "currentVideoTime": ["onCurrentVideoTimeChange"],
    "selectedLanguage": ["onSelectedLanguageChange"]
  }; }
};
WppVideoPlayer.style = wppVideoPlayerCss;

exports.wpp_video_player = WppVideoPlayer;
