'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;
const TIME_PADDING = 2;
const PADDING_CHAR = '0';
/**
 * Format time in seconds to a string representation
 * @param format - 'default' returns time as 'MM:SS', 'extended' returns 'HH:MM:SS'
 * @param timeInSeconds - Time in seconds to format
 * @param split - If true, the time will be split into hours, minutes and seconds. If false, the time will be formatted as 'MM:SS' or 'HH:MM:SS'
 * @returns Formatted time string in 'MM:SS' or 'HH:MM:SS' format
 * @throws Error if timeInSeconds is negative
 */
const formatTime = (format = 'default', timeInSeconds, split = false) => {
  if (timeInSeconds < 0)
    throw new Error('Time cannot be negative');
  const formatTwoDigits = (value) => Math.floor(value).toString().padStart(TIME_PADDING, PADDING_CHAR);
  const hours = formatTwoDigits(timeInSeconds / SECONDS_IN_HOUR);
  const minutes = formatTwoDigits((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = formatTwoDigits(timeInSeconds % SECONDS_IN_MINUTE);
  if (split) {
    return format === 'extended' ? { hours, minutes, seconds } : { minutes, seconds };
  }
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

const INIT_SPLIT_TIME_FORMAT = {
  minutes: '00',
  seconds: '00',
};
const INIT_SPLIT_TIME_FORMAT_W_HOURS = {
  hours: '00',
  minutes: '00',
  seconds: '00',
};
const LOCALES_DEFAULTS = {
  notSupportedPlayer: 'Your browser does not support the video tag.',
  hostAriaLabel: 'Video player component',
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
  volumeProgressLabel: 'Volume',
  volumeButtonAriaLabel: 'Volume control button (toggle mute)',
  fullscreenButtonAriaLabel: 'Fullscreen button',
  videoProgressLabel: 'Video progress',
  videoProgressAriaLabel: 'Seek video timeline',
  languageMenuAriaLabel: 'Language menu',
  videoCaptionsAriaLabel: 'Video captions',
  keyboardShortcutsDescription: {
    title: 'Keyboard shortcuts',
    playPause: 'Space: Play/Pause',
    backwardForward: 'Left/Right arrows: Seek backward/forward 10 seconds',
    volumeUpDown: 'Up/Down arrows: Increase/decrease volume',
    captions: 'C: Toggle captions',
    muteUnmute: 'M: Toggle mute',
    fullscreen: 'F: Toggle fullscreen',
  },
};

function renderSeekBarComponent() {
  const id = `progress-slider-${Math.random().toString(36).slice(2, 9)}`;
  return (index.h(index.Fragment, null,
    index.h("div", { class: "progress-container" },
      index.h("div", { class: "loading-progress", style: { width: `${this.loadedPercentage}%` }, "aria-hidden": "true" }),
      index.h("label", { htmlFor: id, class: "sr-only" }, this._locales.videoProgressLabel),
      index.h("input", { ref: ref => (this.seekBarRef = ref), id: id, class: "progress-bar", type: "range", min: 0, max: this.overallVideoTime, step: 0.01, value: this.currentVideoTime, onInput: this.handleSeek, "aria-label": this._locales.videoProgressAriaLabel, "aria-valuemin": "0", "aria-valuemax": this.overallVideoTime, "aria-valuenow": this.currentVideoTime, autocomplete: "off" }))));
}

function renderVideoCurrentTimeComponent(time) {
  const ariaLabel = time.hours ? `${time.hours}:${time.minutes}:${time.seconds}` : `${time.minutes}:${time.seconds}`;
  return (index.h(index.Fragment, null,
    index.h("wpp-typography-v3-4-0", { class: "video-time", type: "xs-body" },
      index.h("span", { class: "wrapper", role: "timer", "aria-label": ariaLabel },
        time.hours && (index.h(index.Fragment, null,
          index.h("span", { class: "time-wrapper", role: "presentation" },
            index.h("span", { class: "time-placeholder", "aria-hidden": "true" }, "44"),
            index.h("span", { class: "time-value" },
              index.h("span", null, time.hours[0]),
              index.h("span", null, time.hours[1]))),
          index.h("span", { class: "time-separator", role: "presentation" }, ":"))),
        index.h("span", { class: "time-wrapper", role: "presentation" },
          index.h("span", { class: "time-placeholder", "aria-hidden": "true" }, "44"),
          index.h("span", { class: "time-value" },
            index.h("span", null, time.minutes[0]),
            index.h("span", null, time.minutes[1]))),
        index.h("span", { class: "time-separator", role: "presentation" }, ":"),
        index.h("span", { class: "time-wrapper", role: "presentation" },
          index.h("span", { class: "time-placeholder", "aria-hidden": "true" }, "44"),
          index.h("span", { class: "time-value" },
            index.h("span", null, time.seconds[0]),
            index.h("span", null, time.seconds[1])))))));
}

function renderVolumeBarComponent() {
  return (index.h("div", { ref: ref => (this.volumeContainerRef = ref), class: "volume-container", onMouseEnter: this.handleSliderShow, onMouseLeave: () => this.handleSliderHide(300) },
    index.h("wpp-action-button-v3-4-0", { ref: ref => (this.volumeButtonRef = ref), class: "volume-button", variant: "inverted", onClick: this.toggleMute, onFocus: this.handleSliderShow, onFocusout: () => this.handleSliderHide(300), ariaProps: { label: this._locales.volumeButtonAriaLabel } }, this.volume === 0 ? (index.h("wpp-icon-speaker-mute-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-speaker-v3-4-0", { slot: "icon-start", "aria-hidden": "true" }))),
    index.h("div", { ref: ref => (this.volumeBarContainerRef = ref), class: "slider-container" },
      index.h("label", { htmlFor: "volume-slider", class: "sr-only" }, this._locales.volumeProgressLabel),
      index.h("input", { ref: ref => (this.volumeBarRef = ref), style: { '--progress-bar-progress': `${this.volume * 100}%` }, class: "progress-bar", id: "volume-slider", type: "range", min: 0, max: 1, step: 0.01, value: this.volume, onInput: this.handleVolume, "aria-label": "Volume control bar", "aria-valuemin": "0", "aria-valuemax": "1", "aria-valuenow": this.volume.toString(), autocomplete: "off", onFocus: this.handleSliderShow, onFocusout: () => this.handleSliderHide(300) }))));
}

function renderCaptionsComponent() {
  const captionWrapperCssClasses = () => ({
    'captions-wrapper': true,
    'caption-enabled': this.isCaptionEnabled,
  });
  return (index.h("div", { class: captionWrapperCssClasses(), role: "region", "aria-label": this._locales.videoCaptionsAriaLabel, "aria-live": this.isCaptionEnabled ? 'polite' : 'off' }, this.activeCues.map((cue, index$1) => {
    const vttCue = cue;
    const cueText = vttCue.text;
    return (index.h("div", { key: `cue-${index$1}`, class: "caption-cue", "aria-atomic": "true" }, cueText));
  })));
}

function renderAccessibilityInstructionsComponent() {
  return (index.h(index.Fragment, null,
    index.h("div", { class: "sr-only", role: "status", "aria-live": "polite" }, this.videoPlayerState === 'playing'
      ? this._locales.videoStates.playing
      : this.videoPlayerState === 'paused'
        ? this._locales.videoStates.paused
        : this.videoPlayerState === 'idle'
          ? this._locales.videoStates.idle
          : ''),
    !this.controlPanelConfigDefault.autoplay && (index.h("div", { class: "sr-only", "aria-live": "polite" },
      index.h("h2", null, this._locales.keyboardShortcutsDescription.title),
      index.h("ul", null,
        index.h("li", null, this._locales.keyboardShortcutsDescription.playPause),
        index.h("li", null, this._locales.keyboardShortcutsDescription.backwardForward),
        !this.controlPanelConfigDefault.showVolumeButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.volumeUpDown)),
        this.caption && index.h("li", null, this._locales.keyboardShortcutsDescription.captions),
        !this.controlPanelConfigDefault.showVolumeButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.muteUnmute)),
        !this.controlPanelConfigDefault.showFullscreenButton && (index.h("li", null, this._locales.keyboardShortcutsDescription.fullscreen)))))));
}

const wppVideoPlayerCss = ".progress-container{width:100%;position:relative;height:4px;border-radius:8px;background-color:rgba(255, 255, 255, 0.3)}.loading-progress{position:absolute;top:0;left:0;height:100%;border-radius:8px;background-color:rgba(255, 255, 255, 0.3);z-index:1;pointer-events:none;max-width:100%}.video-time{cursor:default;color:var(--wpp-grey-color-000)}.wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.time-wrapper{position:relative}.time-placeholder{opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.time-value{position:absolute;top:0;left:0;width:100%;display:grid;grid-template-columns:repeat(2, 1fr);text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.volume-container{position:relative}.slider-container{position:absolute;top:-68px;left:50%;height:32px;width:80px;border-radius:6px;background-color:rgba(0, 0, 0, 0.6);-webkit-transform:translateX(-50%) rotate(270deg);transform:translateX(-50%) rotate(270deg);-webkit-transform-origin:center center;transform-origin:center center;opacity:0;pointer-events:none;-webkit-transition:opacity 0.15s ease-in-out;transition:opacity 0.15s ease-in-out}.slider-container.active{opacity:1;pointer-events:initial}.slider-container .progress-bar{width:64px;height:auto;left:50%;top:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.wpp-action-button::part(button).hover-active{color:var(--ab-inverted-text-color-hover)}.wpp-action-button::part(button).hover-active~.overlay{background-color:var(--ab-inverted-bg-color-hover)}.wpp-action-button::part(button).hover-active .icon-start ::slotted(*),.wpp-action-button::part(button).hover-active .icon-end ::slotted(*){color:var(--ab-inverted-icon-color-hover)}.progress-bar{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:transparent;position:absolute;width:100%;height:100%;z-index:2;margin:0;padding:0;}.progress-bar:focus{outline:none}.progress-bar::-webkit-slider-runnable-track{width:100%;height:4px;border-radius:8px;background:-webkit-gradient(linear, left top, right top, from(#fff), to(rgba(255, 255, 255, 0.3)));background:linear-gradient(to right, #fff var(--progress-bar-progress, 0%), rgba(255, 255, 255, 0.3) var(--progress-bar-progress, 0%))}.progress-bar::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none;margin-top:-4px;}.progress-bar::-moz-range-track{width:100%;height:4px;background-color:rgba(255, 255, 255, 0.3);border-radius:8px;border:none}.progress-bar::-moz-range-progress{height:4px;background-color:#fff;border-radius:8px;border:none}.progress-bar::-moz-range-thumb{width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none}.progress-bar::-ms-track{width:100%;height:4px;background:transparent;border-color:transparent;color:transparent;border-radius:8px}.progress-bar::-ms-fill-lower{background-color:#fff;border-radius:8px}.progress-bar::-ms-fill-upper{background-color:rgba(255, 255, 255, 0.3);border-radius:8px}.progress-bar::-ms-thumb{width:12px;height:12px;border-radius:50%;background-color:#fff;cursor:pointer;border:none}.progress-bar:focus-visible{border-radius:4px;outline:none;-webkit-box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000);box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}.progress-bar:focus-visible::-webkit-slider-thumb{-webkit-box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000);box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}.progress-bar:focus-visible::-moz-range-thumb{box-shadow:0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--wpp-grey-color-000)}@media (forced-colors: active){.progress-bar:focus-visible,.progress-bar.tab-focus{outline:2px solid CanvasText}.progress-bar:focus-visible::-webkit-slider-thumb,.progress-bar.tab-focus::-webkit-slider-thumb{outline:2px solid CanvasText}.progress-bar:focus-visible::-moz-range-thumb,.progress-bar.tab-focus::-moz-range-thumb{outline:2px solid CanvasText}}.captions-wrapper{position:absolute;bottom:60px;left:0;right:0;text-align:center;z-index:10;pointer-events:none;opacity:0;-webkit-transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out;transition:opacity 0.15s ease-in-out, bottom 0.15s ease-in-out}.captions-wrapper.caption-enabled{opacity:1}.caption-cue{display:inline-block;font-family:\"Arial\", sans-serif;font-size:1.2rem;color:white;background-color:rgba(0, 0, 0, 0.7);padding:0.3em 0.7em;margin:0.2em;border-radius:0.2em;max-width:80%;text-shadow:1px 1px 1px black}:host{display:-ms-flexbox;display:flex;position:relative;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;background-color:#000;color:#fff;outline:none}:host:host(.wpp-full-screen) .video-player{width:100% !important;height:100% !important}:host:host(.wpp-full-screen) .controls-bar{bottom:16px;width:100%;max-width:62.5%}.video-player{aspect-ratio:var(--aspect-ratio, 16/9)}.controls{background-size:cover;background-position:center;cursor:pointer;position:absolute;width:100%;height:100%;-webkit-transition:opacity 0.15s ease-in-out;transition:opacity 0.15s ease-in-out}.controls.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-900), 0 0 0 3px var(--wpp-grey-color-000);box-shadow:0 0 0 1px var(--wpp-grey-color-900), 0 0 0 3px var(--wpp-grey-color-000)}.controls.state-idle{cursor:default;background-color:var(--wpp-grey-color-800)}.controls.state-idle .play-button{display:-ms-flexbox;display:flex}.controls.state-idle .controls-bar{opacity:0;pointer-events:none}.controls.state-playing,.controls.state-paused{background-image:none !important;background-color:transparent}.controls.state-playing .play-button,.controls.state-paused .play-button{display:none}.controls.state-playing .controls-bar,.controls.state-paused .controls-bar{opacity:1;pointer-events:initial}.controls.state-playing.invisible .controls-bar{opacity:0;pointer-events:none}.controls.state-playing.invisible .captions-wrapper{bottom:8px}.play-button{--wpp-icon-color:#fff;border:none;cursor:pointer;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%) scale(0.875);transform:translate(-50%, -50%) scale(0.875);width:66px;height:66px;padding:2px;overflow:hidden;border-radius:50%;background-color:rgba(0, 0, 0, 0.6);-webkit-transition:background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;transition:background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;transition:transform 0.15s ease-in-out, background-color 0.15s ease-in-out;transition:transform 0.15s ease-in-out, background-color 0.15s ease-in-out, -webkit-transform 0.15s ease-in-out;z-index:1}.play-button:hover{-webkit-transform:translate(-50%, -50%) scale(1);transform:translate(-50%, -50%) scale(1);background-color:rgba(0, 0, 0, 0.72)}.play-button:active{-webkit-transform:translate(-50%, -50%) scale(0.875);transform:translate(-50%, -50%) scale(0.875);background-color:rgba(0, 0, 0, 0.78)}.play-button::part(overlay){display:none}.play-button::part(button){border-radius:50%;width:100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.play-button.invisible{visibility:hidden;z-index:-1}.controls-bar{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;gap:8px;-ms-flex-align:center;align-items:center;position:absolute;bottom:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);background-color:rgba(0, 0, 0, 0.6);padding:6px 8px;border-radius:6px;width:calc(100% - 32px);-webkit-transition:opacity 0.15s ease-in-out;transition:opacity 0.15s ease-in-out;cursor:default;z-index:10}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}";

const WppVideoPlayer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // Sizing
    this.videoPlayerHostSize = {};
    this.videoPlayerSize = {};
    this.aspectRatio = '';
    this.hideDelay = 5000;
    this.savedScrollPosition = { x: 0, y: 0 };
    this.savedVolume = 0;
    this.controlPanelConfigDefault = {
      showFullscreenButton: true,
      showVolumeButton: true,
      autoplay: false,
      loop: false,
    };
    this.preventMouseLeaveEvent = false;
    this._locales = LOCALES_DEFAULTS;
    this.availableLanguages = [];
    this.setupKeyboardEventListeners = () => {
      document.addEventListener('keydown', this.handleKeyboardInput);
    };
    this.removeKeyboardEventListeners = () => {
      document.removeEventListener('keydown', this.handleKeyboardInput);
    };
    this.handleKeyboardInput = (event) => {
      if (!this.host.matches(':focus-within') || !this.videoPlayerRef)
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
          this.videoPlayerRef.currentTime = Math.max(0, this.videoPlayerRef.currentTime - (this.jumpValues.videoSkipTimeValue ?? 0));
          break;
        case 'ArrowRight':
          this.videoPlayerRef.currentTime = Math.min(this.videoPlayerRef.currentTime + this.jumpValues.videoSkipTimeValue, this.overallVideoTime);
          break;
        case 'ArrowDown':
          if (!this.controlPanelConfigDefault.showVolumeButton)
            return;
          this.volume = Math.max(this.volume - this.jumpValues.volumeSkipValue, 0);
          if (this.showAndHideVolumeSlider) {
            this.showControls();
            if (this.volumeBarRef === focusedEl) {
              this.handleSliderShow();
            }
            else {
              this.showAndHideVolumeSlider();
            }
          }
          break;
        case 'ArrowUp':
          if (!this.controlPanelConfigDefault.showVolumeButton)
            return;
          this.volume = Math.min(this.volume + this.jumpValues.volumeSkipValue, 1);
          if (this.showAndHideVolumeSlider) {
            this.showControls();
            if (this.volumeBarRef === focusedEl) {
              this.handleSliderShow();
            }
            else {
              this.showAndHideVolumeSlider();
            }
          }
          break;
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
        this.splitCurrentVideoTime = INIT_SPLIT_TIME_FORMAT_W_HOURS;
      }
      this.splitOverallVideoTime = formatTime(this.timeFormat, this.videoPlayerRef.duration, true);
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
      this.videoPlayerRef.currentTime = parseFloat(event.target.value);
    };
    this.handleVolume = (event) => {
      if (!this.videoPlayerRef)
        return;
      this.volume = parseFloat(event.target.value);
    };
    this.handlePlayStateChange = () => {
      if (!this.videoPlayerRef)
        return;
      if (this.videoPlayerState === 'playing') {
        this.showControls();
      }
    };
    this.handleVideoEnded = () => {
      if (this.videoPlayerRef && this.controlPanelConfigDefault.autoplay && !this.controlPanelConfigDefault.loop) {
        this.videoPlayerRef.currentTime = 0;
      }
      this.videoPlayerState = 'idle';
      this.hideControls();
    };
    this.handleSliderShow = () => this.volumeSliderShow();
    this.handleSliderHide = (delay) => this.volumeSliderHide(delay);
    this.volumeSliderShow = () => {
      if (!this.volumeBarContainerRef || !this.volumeButtonRef)
        return;
      clearTimeout(this.hoverTimeout);
      const btnEl = this.volumeButtonRef?.shadowRoot?.querySelector('.inverted');
      this.volumeBarContainerRef.classList.add('active');
      btnEl?.classList.add('hover-active');
    };
    this.volumeSliderHide = (delay = 300) => {
      if (this.hoverTimeout)
        clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(() => {
        const btnEl = this.volumeButtonRef?.shadowRoot?.querySelector('.inverted');
        this.volumeBarContainerRef?.classList.remove('active');
        btnEl?.classList.remove('hover-active');
      }, delay);
    };
    this.handleFullscreenChange = () => {
      this.isFullscreen = !!(document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement);
    };
    this.handleMouseLeave = () => {
      if (this.videoPlayerState === 'playing')
        this.hideControls();
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
        this.hideControlsTimeout = window.setTimeout(() => {
          this.isInvisible = true;
        }, this.hideDelay);
      }
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
      const progress = ((value - min) / (max - min)) * 100;
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
    this.toggleCaptions = () => {
      if (!this.videoPlayerRef)
        return;
      this.isCaptionEnabled = !this.isCaptionEnabled;
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
    };
    this.toggleFullscreen = async () => {
      if (!this.videoPlayerRef || !this.controlPanelConfigDefault.showFullscreenButton)
        return;
      try {
        if (!this.isFullscreen) {
          if (this.host.requestFullscreen) {
            this.savedScrollPosition = {
              x: window.scrollX,
              y: window.scrollY,
            };
            await this.host.requestFullscreen();
          }
        }
        else {
          if (document.exitFullscreen) {
            await document.exitFullscreen();
            this.controlsRef?.focus();
            window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y);
            window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y);
          }
        }
        this.isFullscreen = !this.isFullscreen;
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
      invisible: this.videoPlayerState !== 'idle',
    });
    /**
     * Render the main play button only for:
     * - autoplay=false && state = idle
     * - autoplay=true
     */
    this.renderMainPlayButton = () => (index.h("wpp-action-button-v3-4-0", { ref: ref => (this.initPlayButtonRef = ref), class: this.playButtonCssClasses(), onClick: this.togglePlay, variant: "inverted", ariaProps: {
        label: this.videoPlayerState === 'playing'
          ? this._locales.playButtonAriaLabel.play
          : this._locales.playButtonAriaLabel.pause,
        pressed: this.videoPlayerState === 'playing',
      } }, this.videoPlayerState !== 'playing' ? (index.h("wpp-icon-play-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-pause-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" }))));
    this.renderVideoTag = () => (index.h("video", { ref: ref => (this.videoPlayerRef = ref), id: "video-element", class: "video-player", part: "video-player", controls: false, poster: this.thumbnail, autoplay: this.controlPanelConfigDefault.autoplay, muted: !this.controlPanelConfigDefault.showVolumeButton || this.controlPanelConfigDefault.autoplay, loop: this.controlPanelConfigDefault.loop, preload: this.preload, onEnded: this.handleVideoEnded, onLoadedMetaData: this.handleMetadataLoaded, ...(this.controlPanelConfigDefault.autoplay
        ? {
          onClick: this.togglePlay,
          tabindex: '0',
          'aria-label': this._locales.videoPlayerElement,
        }
        : {
          onTimeUpdate: this.handleTimeUpdate,
          onProgress: this.handleLoadProgress,
          onSeeked: this.handleLoadProgress,
          onSeeking: this.handleLoadProgress,
          onPlay: this.handlePlayStateChange,
          onPause: this.handlePlayStateChange,
        }), ...this.videoPlayerSize }, this.sourceElements, this.trackElements, this._locales.notSupportedPlayer));
    this.renderVideoTime = (time) => renderVideoCurrentTimeComponent.call(this, time);
    this.renderSeekBar = () => renderSeekBarComponent.call(this);
    this.renderVolumeBar = () => renderVolumeBarComponent.call(this);
    this.renderCaptions = () => renderCaptionsComponent.call(this);
    this.renderAccessibilityInstructions = () => renderAccessibilityInstructionsComponent.call(this);
    this.videoPlayerState = 'idle';
    this.currentVideoTime = 0;
    this.timeFormat = 'default';
    this.splitCurrentVideoTime = INIT_SPLIT_TIME_FORMAT;
    this.overallVideoTime = 0;
    this.splitOverallVideoTime = INIT_SPLIT_TIME_FORMAT;
    this.loadedPercentage = 0;
    this.volume = 1;
    this.isFullscreen = false;
    this.isInvisible = false;
    this.isCaptionEnabled = false;
    this.activeCues = [];
    this.selectedLanguage = '';
    this.src = '';
    this.thumbnail = '';
    this.caption = undefined;
    this.type = 'video/mp4';
    this.size = { width: 640, height: 360 };
    this.controlPanelConfig = {};
    this.preload = 'metadata';
    this.locales = {};
    this.jumpValues = {
      videoSkipTimeValue: 5,
      volumeSkipValue: 0.05,
    };
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
    if (!this.videoPlayerRef)
      return;
    this.splitCurrentVideoTime = formatTime(this.timeFormat, value, true);
    this.updateSeekProgress(value);
  }
  onSelectedLanguageChange(value) {
    this.setActiveTrack(value);
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    if (this.caption)
      this.selectedLanguage = this.caption.srclang;
    this.controlPanelConfigDefault = {
      ...this.controlPanelConfigDefault,
      ...this.controlPanelConfig,
    };
    if (!this.controlPanelConfigDefault.showVolumeButton)
      this.volume = 0;
    this.createSizeProps();
    this.sourceRender();
    this.trackRender();
  }
  componentDidLoad() {
    if (this.controlPanelConfigDefault.autoplay)
      this.videoPlayerState = 'playing';
    if (!this.controlPanelConfigDefault.autoplay && this.controlPanelConfigDefault.showFullscreenButton) {
      document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    }
  }
  disconnectedCallback() {
    if (!this.controlPanelConfigDefault.autoplay) {
      this.host.removeEventListener('keydown', this.handleKeyboardInput);
      if (this.controlPanelConfigDefault.showFullscreenButton)
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    }
    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout);
    }
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "video-player, controls", onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, ...this.videoPlayerHostSize, role: "region", "aria-label": this._locales.hostAriaLabel }, this.renderVideoTag(), this.renderMainPlayButton(), !this.controlPanelConfigDefault.autoplay && (index.h("div", { ref: ref => (this.controlsRef = ref), ...(this.thumbnail ? { style: { backgroundImage: `url(${this.thumbnail})` } } : {}), class: this.controlsCssClasses(), part: "controls", tabindex: "-1", ...(this.videoPlayerState !== 'idle'
        ? {
          onDblClick: this.handleControlsDblClick,
          onClick: this.handleControlsClick,
          role: 'region',
          'aria-label': this._locales.controlsAriaLabel,
        }
        : {}) }, this.videoPlayerState !== 'idle' && (index.h(index.Fragment, null, this.caption && this.renderCaptions(), index.h("div", { class: "controls-bar", ref: ref => (this.controlsBarRef = ref) }, index.h("wpp-action-button-v3-4-0", { ref: ref => (this.playPauseButtonRef = ref), class: "play-pause-button", variant: "inverted", onClick: this.togglePlay, ariaProps: {
        label: this.videoPlayerState === 'playing'
          ? this._locales.playPauseButtonArealLabels.pause
          : this._locales.playPauseButtonArealLabels.play,
        pressed: this.videoPlayerState === 'playing',
      } }, this.videoPlayerState === 'playing' ? (index.h("wpp-icon-pause-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-play-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" }))), this.renderVideoTime(this.splitCurrentVideoTime), this.renderSeekBar(), this.renderVideoTime(this.splitOverallVideoTime), this.caption && (index.h("wpp-action-button-v3-4-0", { ref: ref => (this.captionButtonRef = ref), onClick: this.toggleCaptions, variant: "inverted", ariaProps: {
        label: this._locales.captionButtonAriaLabel,
      } }, this.isCaptionEnabled ? (index.h("wpp-icon-caption-on-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-caption-off-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })))), this.controlPanelConfigDefault.showVolumeButton && this.renderVolumeBar(), this.controlPanelConfigDefault.showFullscreenButton && (index.h("wpp-action-button-v3-4-0", { ref: ref => (this.fullScreenButtonRef = ref), onClick: this.toggleFullscreen, variant: "inverted", ariaProps: {
        label: this._locales.fullscreenButtonAriaLabel,
      } }, this.isFullscreen ? (index.h("wpp-icon-fullscreen-minimise-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (index.h("wpp-icon-fullscreen-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })))), this.renderAccessibilityInstructions())))))));
  }
  static get registryIs() { return "wpp-video-player-v3-4-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "videoPlayerState": ["onVideoPlayerState"],
    "volume": ["onVolumeChange"],
    "currentVideoTime": ["onCurrentVideoTimeChange"],
    "selectedLanguage": ["onSelectedLanguageChange"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppVideoPlayer.style = wppVideoPlayerCss;

exports.wpp_video_player = WppVideoPlayer;
