import { Fragment, h, Host } from '@stencil/core';
import { calculateBufferProgress, formatTime } from './utils';
import { LOCALES_DEFAULTS, INIT_SPLIT_TIME_FORMAT, INIT_SPLIT_TIME_FORMAT_W_HOURS } from './const';
import { renderSeekBarComponent } from './components/wpp-seek-bar';
import { renderVideoCurrentTimeComponent } from './components/wpp-video-time';
import { renderVolumeBarComponent } from './components/wpp-volume-bar';
import { renderCaptionsComponent } from './components/wpp-captions';
import { renderAccessibilityInstructionsComponent } from './components/wpp-accessibility-instructions';
export class WppVideoPlayer {
  constructor() {
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
      this.sourceElements = src.map((src, ndx) => h("source", { src: src, type: type[ndx] }));
    };
    this.trackRender = () => {
      if (!this.caption)
        return;
      this.trackElements = (h("track", { label: this.caption.label, kind: this.caption.kind, src: this.caption.src, srclang: this.caption.srclang, default: this.caption.default }));
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
    this.renderMainPlayButton = () => (h("wpp-action-button-v3-4-0", { ref: ref => (this.initPlayButtonRef = ref), class: this.playButtonCssClasses(), onClick: this.togglePlay, variant: "inverted", ariaProps: {
        label: this.videoPlayerState === 'playing'
          ? this._locales.playButtonAriaLabel.play
          : this._locales.playButtonAriaLabel.pause,
        pressed: this.videoPlayerState === 'playing',
      } }, this.videoPlayerState !== 'playing' ? (h("wpp-icon-play-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-pause-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" }))));
    this.renderVideoTag = () => (h("video", { ref: ref => (this.videoPlayerRef = ref), id: "video-element", class: "video-player", part: "video-player", controls: false, poster: this.thumbnail, autoplay: this.controlPanelConfigDefault.autoplay, muted: !this.controlPanelConfigDefault.showVolumeButton || this.controlPanelConfigDefault.autoplay, loop: this.controlPanelConfigDefault.loop, preload: this.preload, onEnded: this.handleVideoEnded, onLoadedMetaData: this.handleMetadataLoaded, ...(this.controlPanelConfigDefault.autoplay
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "video-player, controls", onMouseMove: this.handleMouseMove, onMouseLeave: this.handleMouseLeave, ...this.videoPlayerHostSize, role: "region", "aria-label": this._locales.hostAriaLabel }, this.renderVideoTag(), this.renderMainPlayButton(), !this.controlPanelConfigDefault.autoplay && (h("div", { ref: ref => (this.controlsRef = ref), ...(this.thumbnail ? { style: { backgroundImage: `url(${this.thumbnail})` } } : {}), class: this.controlsCssClasses(), part: "controls", tabindex: "-1", ...(this.videoPlayerState !== 'idle'
        ? {
          onDblClick: this.handleControlsDblClick,
          onClick: this.handleControlsClick,
          role: 'region',
          'aria-label': this._locales.controlsAriaLabel,
        }
        : {}) }, this.videoPlayerState !== 'idle' && (h(Fragment, null, this.caption && this.renderCaptions(), h("div", { class: "controls-bar", ref: ref => (this.controlsBarRef = ref) }, h("wpp-action-button-v3-4-0", { ref: ref => (this.playPauseButtonRef = ref), class: "play-pause-button", variant: "inverted", onClick: this.togglePlay, ariaProps: {
        label: this.videoPlayerState === 'playing'
          ? this._locales.playPauseButtonArealLabels.pause
          : this._locales.playPauseButtonArealLabels.play,
        pressed: this.videoPlayerState === 'playing',
      } }, this.videoPlayerState === 'playing' ? (h("wpp-icon-pause-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-play-filled-v3-4-0", { slot: "icon-start", "aria-hidden": "true" }))), this.renderVideoTime(this.splitCurrentVideoTime), this.renderSeekBar(), this.renderVideoTime(this.splitOverallVideoTime), this.caption && (h("wpp-action-button-v3-4-0", { ref: ref => (this.captionButtonRef = ref), onClick: this.toggleCaptions, variant: "inverted", ariaProps: {
        label: this._locales.captionButtonAriaLabel,
      } }, this.isCaptionEnabled ? (h("wpp-icon-caption-on-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-caption-off-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })))), this.controlPanelConfigDefault.showVolumeButton && this.renderVolumeBar(), this.controlPanelConfigDefault.showFullscreenButton && (h("wpp-action-button-v3-4-0", { ref: ref => (this.fullScreenButtonRef = ref), onClick: this.toggleFullscreen, variant: "inverted", ariaProps: {
        label: this._locales.fullscreenButtonAriaLabel,
      } }, this.isFullscreen ? (h("wpp-icon-fullscreen-minimise-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })) : (h("wpp-icon-fullscreen-v3-4-0", { slot: "icon-start", "aria-hidden": "true" })))), this.renderAccessibilityInstructions())))))));
  }
  static get is() { return "wpp-video-player"; }
  static get registryIs() { return "wpp-video-player-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-video-player.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-video-player.css"]
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
          "text": "Represents the source of a resource."
        },
        "attribute": "src",
        "reflect": false,
        "defaultValue": "''"
      },
      "thumbnail": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Represents the thumbnail of the video."
        },
        "attribute": "thumbnail",
        "reflect": false,
        "defaultValue": "''"
      },
      "caption": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CaptionValue",
          "resolved": "undefined | { label: string; kind: string; src: string; srclang: string; default?: boolean | undefined; }",
          "references": {
            "CaptionValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::CaptionValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Represents the text or content displayed as the caption."
        }
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "VideoSourceType | VideoSourceType[]",
          "resolved": "string | string[]",
          "references": {
            "VideoSourceType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::VideoSourceType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Represents the type of video source."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'video/mp4'"
      },
      "size": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "VideoSizeDimensions",
          "resolved": "{ width: number | `${number}%`; height: number | `${number}%`; }",
          "references": {
            "VideoSizeDimensions": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::VideoSizeDimensions"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{ width: 640, height: 360 }"
      },
      "controlPanelConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ControlPanelConfig",
          "resolved": "{ showFullscreenButton?: boolean | undefined; showVolumeButton?: boolean | undefined; autoplay?: boolean | undefined; muted?: boolean | undefined; loop?: boolean | undefined; }",
          "references": {
            "ControlPanelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::ControlPanelConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configuration object for the control panel settings.\n\nIf set autoplay to `true`, the control bar will not be visible.\n`muted` and `loop` property on <video> tag will be set to true as default."
        },
        "defaultValue": "{}"
      },
      "preload": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | 'metadata'",
          "resolved": "\"auto\" | \"metadata\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Specifies the preferred loading behavior.\n\n- `'auto'`: Indicates that the browser should load the entire media content when the page loads, if possible.\n- `'metadata'`: Indicates that only the metadata (e.g., length, track list) should be preloaded."
        },
        "attribute": "preload",
        "reflect": false,
        "defaultValue": "'metadata'"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<VideoPlayerLocales>",
          "resolved": "{ notSupportedPlayer?: string | undefined; hostAriaLabel?: string | undefined; videoPlayerElement?: string | undefined; videoStates?: { playing: string; paused: string; idle: string; } | undefined; controlsAriaLabel?: string | undefined; playButtonAriaLabel?: { play: string; pause: string; } | undefined; playPauseButtonArealLabels?: { play: string; pause: string; } | undefined; captionButtonAriaLabel?: string | undefined; volumeProgressLabel?: string | undefined; volumeButtonAriaLabel?: string | undefined; fullscreenButtonAriaLabel?: string | undefined; videoProgressLabel?: string | undefined; videoProgressAriaLabel?: string | undefined; languageMenuAriaLabel?: string | undefined; videoCaptionsAriaLabel?: string | undefined; keyboardShortcutsDescription?: { title: string; playPause: string; backwardForward: string; volumeUpDown: string; captions: string; muteUnmute: string; fullscreen: string; } | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "VideoPlayerLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::VideoPlayerLocales"
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
      "jumpValues": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "JumpValues",
          "resolved": "{ videoSkipTimeValue: number; volumeSkipValue: number; }",
          "references": {
            "JumpValues": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-video-player/types.ts::JumpValues"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the jump values for the video progress bar and volume bar."
        },
        "defaultValue": "{\n    videoSkipTimeValue: 5,\n    volumeSkipValue: 0.05,\n  }"
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
          "text": "Contains the WppVideo `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "videoPlayerState": {},
      "currentVideoTime": {},
      "timeFormat": {},
      "splitCurrentVideoTime": {},
      "overallVideoTime": {},
      "splitOverallVideoTime": {},
      "loadedPercentage": {},
      "volume": {},
      "isFullscreen": {},
      "isInvisible": {},
      "isCaptionEnabled": {},
      "activeCues": {},
      "selectedLanguage": {}
    };
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
          "text": "Plays the current video using the video player reference if it is available.",
          "tags": [{
              "name": "return",
              "text": "A promise that resolves when the video begins playback."
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
          "text": "Pauses the video playback.",
          "tags": [{
              "name": "return",
              "text": "A promise that resolves when the video is successfully paused."
            }]
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "videoPlayerState",
        "methodName": "onVideoPlayerState"
      }, {
        "propName": "volume",
        "methodName": "onVolumeChange"
      }, {
        "propName": "currentVideoTime",
        "methodName": "onCurrentVideoTimeChange"
      }, {
        "propName": "selectedLanguage",
        "methodName": "onSelectedLanguageChange"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
