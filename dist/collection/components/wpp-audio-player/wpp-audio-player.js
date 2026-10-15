import { h, Host, } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { mergeLocales } from '../../utils/utils';
import { placeVolumeSlider, renderVolumeBarComponent } from '../wpp-video-player/components/wpp-volume-bar';
import { AUDIO_SKIP_TIME_VALUE, DEFAULT_PLAYBACK_RATES, LOCALES_DEFAULTS, SECONDS_IN_HOUR, SECONDS_IN_MINUTE, SPACE_ACTIVATED_ROLES, VOLUME_SKIP_VALUE, } from './const';
export class WppAudioPlayer {
  constructor() {
    /** Restored when the track is unmuted, so the volume lands back where the listener left it. */
    this.savedVolume = 1;
    /** While the seek bar's thumb is dragged, it shows where the listener is heading, not the playback position. */
    this.isScrubbing = false;
    /**
     * The track length is only known once the metadata is in, so both the extended `HH:MM:SS` format
     * and the seek bar boundaries are resolved here rather than up front.
     */
    this.handleMetadataLoaded = () => {
      if (!this.audioRef)
        return;
      this.syncDuration();
      // Browsers reject autoplay without a user gesture, so the rejection is handled here rather
      // than surfacing as an unhandled promise rejection.
      if (this.autoplay)
        this.play().catch(error => console.error('Autoplay error:', error));
    };
    /**
     * The duration known at `loadedmetadata` is often an estimate (e.g. a variable-bitrate MP3), and
     * the browser corrects it later, often only near the end of the track. Re-reading it on every
     * `durationchange` keeps the seek bar's `max` equal to the real end, so the thumb reaches it.
     */
    this.syncDuration = () => {
      if (!this.audioRef)
        return;
      const duration = Number.isFinite(this.audioRef.duration) ? this.audioRef.duration : 0;
      this.timeFormat = duration >= SECONDS_IN_HOUR ? 'extended' : 'default';
      this.overallAudioTime = duration;
    };
    this.handleTimeUpdate = () => {
      if (!this.audioRef)
        return;
      // Playback keeps reporting its position while the thumb is dragged, which would pull it back.
      if (!this.isScrubbing)
        this.currentAudioTime = this.audioRef.currentTime;
      this.wppTimeUpdate.emit({ currentTime: this.audioRef.currentTime, duration: this.overallAudioTime });
    };
    this.handleLoadProgress = () => {
      if (!this.audioRef || !this.audioRef.buffered.length || !this.overallAudioTime)
        return;
      const bufferedEnd = this.audioRef.buffered.end(this.audioRef.buffered.length - 1);
      this.loadedPercentage = Math.min((bufferedEnd / this.overallAudioTime) * 100, 100);
    };
    this.handlePlay = () => {
      this.audioPlayerState = 'playing';
      this.wppPlay.emit();
    };
    this.handlePause = () => {
      this.audioPlayerState = 'paused';
      this.wppPause.emit();
    };
    this.handleEnded = () => {
      // The last `timeupdate` can land a fraction of a second before the end, so the final position
      // is read here too, which leaves the thumb at the very end of the seek bar.
      if (this.audioRef)
        this.currentAudioTime = this.audioRef.currentTime;
      this.audioPlayerState = 'idle';
      this.wppEnded.emit();
    };
    this.handleSeek = (event) => {
      this.seek(parseFloat(event.target.value));
    };
    /**
     * The release is listened for on the window, since the pointer can leave the seek bar while it
     * drags the thumb, and a click that does not move the thumb fires no `change`.
     */
    this.startScrubbing = () => {
      this.isScrubbing = true;
      window.addEventListener('pointerup', this.stopScrubbing);
      window.addEventListener('pointercancel', this.stopScrubbing);
    };
    this.stopScrubbing = () => {
      this.isScrubbing = false;
      window.removeEventListener('pointerup', this.stopScrubbing);
      window.removeEventListener('pointercancel', this.stopScrubbing);
    };
    /**
     * The focus ring only follows Tab, like the action buttons' own. `:focus-visible` would also show
     * it when a hotkey is pressed after a click focused the player (Safari focuses the player even on
     * a click on one of its buttons).
     */
    this.handleContainerMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handleContainerKeyUp = (event) => {
      // Tab keyups from the controls inside bubble up here too; only the player itself is marked.
      if (event.key === 'Tab' && event.composedPath()[0] === event.currentTarget)
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.handleContainerBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.handleVolume = (event) => {
      this.volume = parseFloat(event.target.value);
    };
    // The slider opens on hover and on focus, and closes shortly after both leave: the same flow as
    // the video player, whose volume bar this player renders.
    this.handleSliderShow = () => this.volumeSliderShow();
    this.handleSliderHide = (delay) => this.volumeSliderHide(delay);
    /** The container's `open` class keeps the mute button in its hover look while the slider shows. */
    this.volumeSliderShow = () => {
      if (!this.volumeBarContainerRef || !this.volumeButtonRef)
        return;
      if (this.hoverTimeout)
        clearTimeout(this.hoverTimeout);
      placeVolumeSlider(this.volumeContainerRef, this.volumeBarContainerRef);
      this.volumeBarContainerRef.classList.add('active');
      this.volumeContainerRef?.classList.add('open');
    };
    this.volumeSliderHide = (delay = 300) => {
      if (this.hoverTimeout)
        clearTimeout(this.hoverTimeout);
      this.hoverTimeout = setTimeout(this.volumeSliderHideNow, delay);
    };
    this.volumeSliderHideNow = () => {
      this.volumeBarContainerRef?.classList.remove('active');
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
    /**
     * Feedback for a keyboard volume change: the slider shows for a moment. While the slider itself
     * is focused it stays open instead, so the listener keeps it in view.
     */
    this.revealVolumeSlider = (delay = 1000) => {
      if (this.volumeBarRef && this.host.shadowRoot?.activeElement === this.volumeBarRef) {
        this.handleSliderShow();
        return;
      }
      this.showAndHideVolumeSlider(delay);
    };
    this.showAndHideVolumeSlider = (delay = 1000) => {
      this.handleSliderShow();
      this.handleSliderHide(delay);
    };
    this.handlePlaybackRateChange = (event) => {
      const rate = Number(event.detail.value);
      if (!Number.isFinite(rate))
        return;
      this.playbackRate = rate;
      this.playbackRatePopoverRef?.closePopover();
    };
    /** Controls that Space activates natively: real buttons and ARIA toggles such as the speed pills. */
    this.isActivatedBySpace = (event) => event
      .composedPath()
      .some(element => element instanceof HTMLButtonElement ||
      (element instanceof HTMLElement && SPACE_ACTIVATED_ROLES.includes(element.getAttribute('role') ?? '')));
    /** Whole rates keep one decimal ("1.0x"), fractional ones keep their own precision ("1.25x"). */
    this.formatPlaybackRate = (rate) => `${Number.isInteger(rate) ? rate.toFixed(1) : rate}x`;
    this.clampTime = (time) => Math.min(Math.max(time, 0), this.overallAudioTime);
    this.clampVolume = (volume) => Math.min(Math.max(volume, 0), 1);
    /** Rounded to 2 decimals, so repeated steps don't accumulate floating point errors (e.g. 0.7999999999999998). */
    this.stepVolume = (step) => this.clampVolume(Math.round((this.currentVolume + step) * 100) / 100);
    this.togglePlay = () => {
      if (this.audioPlayerState === 'playing') {
        this.pause();
        return;
      }
      this.play().catch(error => console.error('Playback error:', error));
    };
    this.toggleMute = () => {
      if (this.currentVolume === 0) {
        this.volume = this.savedVolume;
        return;
      }
      this.savedVolume = this.currentVolume;
      this.volume = 0;
    };
    this.skip = (value) => {
      if (!this.audioRef)
        return;
      this.seek(this.audioRef.currentTime + value);
    };
    this.formatTime = (timeInSeconds) => {
      const time = Number.isFinite(timeInSeconds) && timeInSeconds > 0 ? timeInSeconds : 0;
      const formatTwoDigits = (value) => Math.floor(value).toString().padStart(2, '0');
      const hours = formatTwoDigits(time / SECONDS_IN_HOUR);
      const minutes = formatTwoDigits((time % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
      const seconds = formatTwoDigits(time % SECONDS_IN_MINUTE);
      return this.timeFormat === 'extended' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    };
    this.renderAudioTag = () => (h("audio", { ref: ref => (this.audioRef = ref), class: "audio-element", controls: false, preload: this.preload, loop: this.loop, onLoadedMetaData: this.handleMetadataLoaded, onDurationChange: this.syncDuration, onTimeUpdate: this.handleTimeUpdate, onProgress: this.handleLoadProgress, onPlay: this.handlePlay, onPause: this.handlePause, onEnded: this.handleEnded }, this.sourceElements, this._locales.notSupportedPlayer));
    this.renderTime = (time, label) => (h("wpp-typography-v4-5-0", { type: "xs-midi", class: "audio-time" }, h("span", { role: "timer", "aria-label": `${label} ${this.formatTime(time)}` }, this.formatTime(time))));
    /**
     * The rail and the buffered bar sit under the input, which carries the played portion and the
     * thumb. The input's own track is transparent past the played portion, so both layers below
     * stay visible, and it is the topmost layer so the thumb is never painted over.
     *
     * `step="any"` stops the input snapping its value to a step grid, so the thumb follows the exact
     * playback position and lands on `max` at the end. The keyboard never relies on `step`: the
     * shared `handleKeyDown` flow moves the position by `AUDIO_SKIP_TIME_VALUE` itself.
     */
    this.renderSeekBar = () => (h("div", { class: "progress-container" }, h("div", { class: "progress-rail", "aria-hidden": "true" }), h("div", { class: "loading-progress", style: { width: `${this.loadedPercentage}%` }, "aria-hidden": "true" }), h("input", { class: "progress-bar seek-bar", style: { '--progress-bar-progress': `${this.seekProgress}%` }, type: "range", min: 0, max: this.overallAudioTime || 0, step: "any", value: this.currentAudioTime, onInput: this.handleSeek, onPointerDown: this.startScrubbing, "aria-label": this._locales.progressAriaLabel, "aria-valuemin": "0", "aria-valuemax": this.overallAudioTime, "aria-valuenow": this.currentAudioTime, "aria-valuetext": this.formatTime(this.currentAudioTime), autocomplete: "off" })));
    this.renderIconButton = ({ label, icon, onClick, ariaProps = {}, }) => (h("wpp-tooltip-v4-5-0", { text: label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-5-0", { variant: "secondary", onClick: onClick, ariaProps: { label, ...ariaProps } }, icon)));
    /**
     * The volume bar is the video player's, rendered with this player as its host: the slider opens
     * on hover and on focus, a click on the button mutes. Only here the button also carries a tooltip.
     */
    this.renderVolumeBar = () => renderVolumeBarComponent.call(this, { variant: 'secondary', withTooltip: true, withPressedState: false });
    this.renderPlaybackRateControl = () => {
      const currentRate = this.formatPlaybackRate(this.playbackRate);
      const label = `${this._locales.playbackRateButtonAriaLabel} ${currentRate}`;
      return (h("wpp-popover-v4-5-0", { ref: ref => (this.playbackRatePopoverRef = ref), ariaProps: { label: this._locales.playbackRateButtonAriaLabel }, config: {
          placement: 'top-start',
          onShow: () => {
            this.isPlaybackRateOpen = true;
          },
          onHide: () => {
            this.isPlaybackRateOpen = false;
          },
        } }, h("div", { slot: "trigger-element" }, h("wpp-tooltip-v4-5-0", { text: this._locales.playbackRateButtonAriaLabel, config: { placement: 'bottom' } }, h("wpp-action-button-v4-5-0", { variant: "secondary", ariaProps: { label, haspopup: 'dialog', expanded: this.isPlaybackRateOpen } }, currentRate))), h("div", { style: { padding: '8px' } }, h("wpp-pill-group-v4-5-0", { type: "single", value: this.playbackRate, onWppChange: this.handlePlaybackRateChange, "aria-label": this._locales.playbackRateButtonAriaLabel }, this.playbackRates.map(rate => (h("wpp-pill-v4-5-0", { key: rate, value: rate, label: this.formatPlaybackRate(rate) })))))));
    };
    this.audioPlayerState = 'idle';
    this.currentAudioTime = 0;
    this.overallAudioTime = 0;
    this.loadedPercentage = 0;
    this.timeFormat = 'default';
    this.isPlaybackRateOpen = false;
    this.focusType = FOCUS_TYPE.NONE;
    this.src = '';
    this.type = undefined;
    this.autoplay = false;
    this.loop = false;
    this.preload = 'metadata';
    this.playbackRates = DEFAULT_PLAYBACK_RATES;
    this.playbackRate = 1;
    this.volume = 1;
    this.locales = {};
    this.ariaProps = {};
  }
  /**
   * Plays the current track. At the end of the track, playback starts over from the beginning.
   *
   * @return {Promise<void>} A promise that resolves when the playback is requested.
   */
  async play() {
    if (!this.audioRef)
      return;
    if (this.isAtEnd)
      await this.seek(0);
    await this.audioRef.play();
  }
  /**
   * Pauses the current track.
   *
   * @return {Promise<void>} A promise that resolves when the track is paused.
   */
  async pause() {
    this.audioRef?.pause();
  }
  /**
   * Moves the playback position to the given time, in seconds. The value is clamped
   * to the boundaries of the track.
   *
   * @param {number} time - The playback position to move to, in seconds.
   * @return {Promise<void>} A promise that resolves when the position is applied.
   */
  async seek(time) {
    if (!this.audioRef)
      return;
    const position = this.clampTime(time);
    this.audioRef.currentTime = position;
    this.currentAudioTime = position;
  }
  onVolumeChange() {
    if (!this.audioRef)
      return;
    const volume = this.currentVolume;
    this.audioRef.muted = volume === 0;
    this.audioRef.volume = volume;
    this.wppVolumeChange.emit({ volume, isMuted: volume === 0 });
  }
  onPlaybackRateChange(value) {
    if (!this.audioRef)
      return;
    this.audioRef.playbackRate = value;
    this.wppPlaybackRateChange.emit({ playbackRate: value });
  }
  /**
   * The single keyboard flow for the whole player: a key does the same thing wherever focus sits,
   * whether that is the host, a button or either slider. The sliders' own arrow stepping is
   * cancelled so they follow the same map.
   */
  handleKeyDown(event) {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey)
      return;
    switch (event.key) {
      case ' ':
        // Space already activates a focused button or pill, so toggling here would act twice.
        if (this.isActivatedBySpace(event))
          return;
        this.togglePlay();
        break;
      case 'ArrowLeft':
        this.skip(-AUDIO_SKIP_TIME_VALUE);
        break;
      case 'ArrowRight':
        this.skip(AUDIO_SKIP_TIME_VALUE);
        break;
      case 'Home':
        this.seek(0);
        break;
      case 'End':
        this.seek(this.overallAudioTime);
        break;
      case 'ArrowUp':
        this.volume = this.stepVolume(VOLUME_SKIP_VALUE);
        this.revealVolumeSlider();
        break;
      case 'ArrowDown':
        this.volume = this.stepVolume(-VOLUME_SKIP_VALUE);
        this.revealVolumeSlider();
        break;
      case 'm':
      case 'M':
        this.toggleMute();
        break;
      default:
        return;
    }
    event.preventDefault();
  }
  componentDidLoad() {
    if (!this.audioRef)
      return;
    this.audioRef.volume = this.currentVolume;
    this.audioRef.playbackRate = this.playbackRate;
  }
  disconnectedCallback() {
    if (this.hoverTimeout)
      clearTimeout(this.hoverTimeout);
    this.stopScrubbing();
  }
  /** Public, since the shared volume bar reads its labels from here. */
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /** The mute button names its click action, so the label swaps with the mute state. */
  get volumeButtonLabel() {
    return this.currentVolume === 0 ? this._locales.unmuteButtonAriaLabel : this._locales.muteButtonAriaLabel;
  }
  /**
   * `volume` is public, so a consumer can hand us anything, and `HTMLMediaElement.volume` throws
   * outside 0–1. Every internal read goes through here rather than the raw prop.
   */
  get currentVolume() {
    return this.clampVolume(this.volume);
  }
  /**
   * A source without its own type renders no `type` attribute, so the browser detects the format
   * itself instead of trusting a type borrowed from another source.
   */
  get sourceElements() {
    const sources = Array.isArray(this.src) ? this.src : [this.src];
    const types = Array.isArray(this.type) ? this.type : [this.type];
    return sources.map((source, ndx) => h("source", { src: source, type: types[ndx] }));
  }
  /**
   * Chromium can leave `ended` false after a seek to the very end (seen with VBR MP3s), so `play()`
   * would end at once instead of starting over, as it does once the track has really ended.
   */
  get isAtEnd() {
    if (!this.audioRef)
      return false;
    return this.audioRef.ended || (this.overallAudioTime > 0 && this.audioRef.currentTime >= this.overallAudioTime);
  }
  get seekProgress() {
    return this.overallAudioTime ? (this.currentAudioTime / this.overallAudioTime) * 100 : 0;
  }
  render() {
    const isPlaying = this.audioPlayerState === 'playing';
    const playPauseLabel = isPlaying ? this._locales.pauseButtonAriaLabel : this._locales.playButtonAriaLabel;
    return (h(Host, null, h("div", { class: { 'audio-player-container': true, 'tab-focus': this.focusType === FOCUS_TYPE.TAB }, role: this.ariaProps.role || 'group', "aria-label": this.ariaProps.label || this._locales.hostAriaLabel, tabIndex: 0, onMouseDown: this.handleContainerMouseDown, onKeyUp: this.handleContainerKeyUp, onBlur: this.handleContainerBlur }, this.renderAudioTag(), h("div", { class: "controls" }, h("div", { class: "timeline" }, this.renderTime(this.currentAudioTime, this._locales.currentTimeAriaLabel), this.renderSeekBar(), this.renderTime(this.overallAudioTime, this._locales.durationAriaLabel)), h("div", { class: "buttons" }, h("div", { class: "secondary-buttons" }, this.renderPlaybackRateControl()), h("div", { class: "playback-buttons" }, this.renderIconButton({
      label: this._locales.skipBackwardButtonAriaLabel,
      icon: h("wpp-icon-rewind-v4-5-0", { slot: "icon-start", "aria-hidden": "true" }),
      onClick: () => this.skip(-AUDIO_SKIP_TIME_VALUE),
    }), this.renderIconButton({
      label: playPauseLabel,
      icon: isPlaying ? (h("wpp-icon-pause-v4-5-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-play-v4-5-0", { slot: "icon-start", "aria-hidden": "true" })),
      onClick: this.togglePlay,
    }), this.renderIconButton({
      label: this._locales.skipForwardButtonAriaLabel,
      icon: h("wpp-icon-fast-forward-v4-5-0", { slot: "icon-start", "aria-hidden": "true" }),
      onClick: () => this.skip(AUDIO_SKIP_TIME_VALUE),
    })), h("div", { class: "volume-controls" }, this.renderVolumeBar()))))));
  }
  static get is() { return "wpp-audio-player"; }
  static get registryIs() { return "wpp-audio-player-v4-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-audio-player.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-audio-player.css"]
    };
  }
  static get properties() {
    return {
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Represents the source of the audio file. Several sources can be provided as fallbacks,\nthe browser picks the first one it can play."
        },
        "attribute": "src",
        "reflect": false,
        "defaultValue": "''"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "AudioSourceType | AudioSourceType[]",
          "resolved": "string | string[] | undefined",
          "references": {
            "AudioSourceType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-audio-player/types.ts::AudioSourceType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Optional MIME type hint for each audio source, e.g. `'audio/ogg; codecs=opus'`, matched to\n`src` by index. The browser only uses it to skip sources it cannot play without downloading\nthem, so it mainly helps with fallback sources. Leave it out rather than guess: a wrong type\nmakes the browser skip a source it could have played."
        },
        "attribute": "type",
        "reflect": false
      },
      "autoplay": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, playback starts as soon as the track's metadata is loaded. Browsers may block\nautoplay until the user has interacted with the page."
        },
        "attribute": "autoplay",
        "reflect": false,
        "defaultValue": "false"
      },
      "loop": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the track starts again from the beginning when it reaches the end."
        },
        "attribute": "loop",
        "reflect": false,
        "defaultValue": "false"
      },
      "preload": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | 'metadata' | 'none'",
          "resolved": "\"auto\" | \"metadata\" | \"none\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies the preferred loading behavior.\n\n- `'auto'`: the browser loads the whole file when the page loads, if possible.\n- `'metadata'`: only the metadata (e.g. duration) is preloaded.\n- `'none'`: nothing is preloaded until playback is requested."
        },
        "attribute": "preload",
        "reflect": false,
        "defaultValue": "'metadata'"
      },
      "playbackRates": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "number[]",
          "resolved": "number[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the playback speeds offered by the playback speed menu."
        },
        "defaultValue": "DEFAULT_PLAYBACK_RATES"
      },
      "playbackRate": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the current playback speed. Mutable, so selecting a speed in the menu updates it."
        },
        "attribute": "playback-rate",
        "reflect": false,
        "defaultValue": "1"
      },
      "volume": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the current volume, from `0` (muted) to `1`. Mutable, so moving the volume slider\nupdates it. Values outside that range are clamped."
        },
        "attribute": "volume",
        "reflect": false,
        "defaultValue": "1"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<AudioPlayerLocales>",
          "resolved": "{ notSupportedPlayer?: string | undefined; hostAriaLabel?: string | undefined; playButtonAriaLabel?: string | undefined; pauseButtonAriaLabel?: string | undefined; skipBackwardButtonAriaLabel?: string | undefined; skipForwardButtonAriaLabel?: string | undefined; progressAriaLabel?: string | undefined; currentTimeAriaLabel?: string | undefined; durationAriaLabel?: string | undefined; volumeProgressLabel?: string | undefined; muteButtonAriaLabel?: string | undefined; unmuteButtonAriaLabel?: string | undefined; playbackRateButtonAriaLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "AudioPlayerLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-audio-player/types.ts::AudioPlayerLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the WppAudioPlayer `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "audioPlayerState": {},
      "currentAudioTime": {},
      "overallAudioTime": {},
      "loadedPercentage": {},
      "timeFormat": {},
      "isPlaybackRateOpen": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppPlay",
        "name": "wppPlay",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the playback starts."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppPause",
        "name": "wppPause",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the playback is paused."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppEnded",
        "name": "wppEnded",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the playback reaches the end of the track."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppTimeUpdate",
        "name": "wppTimeUpdate",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the playback position changes."
        },
        "complexType": {
          "original": "AudioPlayerTimeEventDetail",
          "resolved": "AudioPlayerTimeEventDetail",
          "references": {
            "AudioPlayerTimeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-audio-player/types.ts::AudioPlayerTimeEventDetail"
            }
          }
        }
      }, {
        "method": "wppVolumeChange",
        "name": "wppVolumeChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the volume changes or the track is muted/unmuted."
        },
        "complexType": {
          "original": "AudioPlayerVolumeEventDetail",
          "resolved": "AudioPlayerVolumeEventDetail",
          "references": {
            "AudioPlayerVolumeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-audio-player/types.ts::AudioPlayerVolumeEventDetail"
            }
          }
        }
      }, {
        "method": "wppPlaybackRateChange",
        "name": "wppPlaybackRateChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the playback speed changes."
        },
        "complexType": {
          "original": "AudioPlayerRateEventDetail",
          "resolved": "AudioPlayerRateEventDetail",
          "references": {
            "AudioPlayerRateEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-audio-player/types.ts::AudioPlayerRateEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "play": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Plays the current track. At the end of the track, playback starts over from the beginning.",
          "tags": [{
              "name": "return",
              "text": "A promise that resolves when the playback is requested."
            }]
        }
      },
      "pause": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Pauses the current track.",
          "tags": [{
              "name": "return",
              "text": "A promise that resolves when the track is paused."
            }]
        }
      },
      "seek": {
        "complexType": {
          "signature": "(time: number) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "time - The playback position to move to, in seconds."
                }],
              "text": "- The playback position to move to, in seconds."
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Moves the playback position to the given time, in seconds. The value is clamped\nto the boundaries of the track.",
          "tags": [{
              "name": "param",
              "text": "time - The playback position to move to, in seconds."
            }, {
              "name": "return",
              "text": "A promise that resolves when the position is applied."
            }]
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "volume",
        "methodName": "onVolumeChange"
      }, {
        "propName": "playbackRate",
        "methodName": "onPlaybackRateChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "keydown",
        "method": "handleKeyDown",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
