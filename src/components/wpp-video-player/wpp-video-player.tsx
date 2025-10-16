import { Component, Element, Fragment, h, Host, Method, Prop, State, Watch } from '@stencil/core'
import { AriaProps } from '../../types/common'
import {
  CalculatedVideoSize,
  CaptionValue,
  VideoPlayerLocales,
  ControlPanelConfig,
  JumpValues,
  SplitTimeFormat,
  TimeFormats,
  TrackLanguage,
  VideoPlayerStates,
  VideoSizeDimensions,
  VideoSourceType,
} from './types'
import { calculateBufferProgress, formatTime } from './utils'
import { LOCALES_DEFAULTS, INIT_SPLIT_TIME_FORMAT, INIT_SPLIT_TIME_FORMAT_W_HOURS } from './const'
import { renderSeekBarComponent } from './components/wpp-seek-bar'
import { renderVideoCurrentTimeComponent } from './components/wpp-video-time'
import { renderVolumeBarComponent } from './components/wpp-volume-bar'
import { renderCaptionsComponent } from './components/wpp-captions'
import { renderAccessibilityInstructionsComponent } from './components/wpp-accessibility-instructions'

@Component({
  tag: 'wpp-video-player',
  styleUrl: 'wpp-video-player.scss',
  shadow: true,
})
export class WppVideoPlayer {
  @Element() host: HTMLWppVideoPlayerElement

  private videoPlayerRef: HTMLVideoElement | undefined
  private initPlayButtonRef: HTMLWppActionButtonElement | undefined
  protected controlsBarRef: HTMLDivElement | undefined
  private playPauseButtonRef: HTMLWppActionButtonElement | undefined
  private fullScreenButtonRef: HTMLWppActionButtonElement | undefined
  protected controlsRef: HTMLDivElement | undefined
  protected seekBarRef: HTMLInputElement | undefined
  protected volumeBarRef: HTMLInputElement | undefined
  protected volumeButtonRef: HTMLWppActionButtonElement | undefined
  protected volumeContainerRef: HTMLDivElement | undefined
  protected volumeBarContainerRef: HTMLDivElement | undefined
  private captionButtonRef: HTMLWppActionButtonElement | undefined
  // Sizing
  private videoPlayerHostSize: CalculatedVideoSize = {}
  private videoPlayerSize: CalculatedVideoSize = {}
  private aspectRatio: string = ''
  // Other
  private sourceElements: HTMLSourceElement[]
  private trackElements: HTMLTrackElement[]
  private hideControlsTimeout: number | null
  private hideDelay: number = 5000
  private savedScrollPosition = { x: 0, y: 0 }
  private savedVolume: number = 0
  protected controlPanelConfigDefault: ControlPanelConfig = {
    showFullscreenButton: true,
    showVolumeButton: true,
    autoplay: false,
    loop: false,
  }
  protected preventMouseLeaveEvent: boolean = false
  protected _locales: VideoPlayerLocales = LOCALES_DEFAULTS
  // Volume slider
  protected hoverTimeout: NodeJS.Timeout
  // Caption
  private textTracks: TextTrackList
  private activeTrack: TextTrack
  protected availableLanguages: TrackLanguage[] = []
  // Video player state
  @State() videoPlayerState: VideoPlayerStates = 'idle'
  @State() currentVideoTime: number = 0
  @State() timeFormat: TimeFormats = 'default'
  @State() splitCurrentVideoTime: SplitTimeFormat = INIT_SPLIT_TIME_FORMAT
  @State() overallVideoTime: number = 0
  @State() splitOverallVideoTime: SplitTimeFormat = INIT_SPLIT_TIME_FORMAT
  @State() loadedPercentage: number = 0
  @State() volume: number = 1
  // Button states
  @State() isFullscreen: boolean = false
  @State() isInvisible: boolean = false
  @State() isCaptionEnabled: boolean = false
  // Caption states
  @State() activeCues: TextTrackCue[] = []
  @State() selectedLanguage: string = ''
  /**
   * Represents the source of a resource.
   */
  @Prop() readonly src: string | string[] = ''

  /**
   * Represents the thumbnail of the video.
   */
  @Prop() readonly thumbnail?: string = ''

  /**
   * Represents the text or content displayed as the caption.
   */
  @Prop() readonly caption?: CaptionValue

  /**
   * Represents the type of video source.
   */
  @Prop() readonly type: VideoSourceType | VideoSourceType[] = 'video/mp4'

  /**
   * Represents the dimensions of a video size.
   *
   * @typedef {Object} VideoSizeDimensions
   * @property {number | `${number}%`} width - The width of the video in pixels or percentage
   * @property {number | `${number}%`} height - The height of the video in pixels or percentage
   */
  @Prop() readonly size: VideoSizeDimensions = { width: 640, height: 360 }

  /**
   * Configuration object for the control panel settings.
   *
   * If set autoplay to `true`, the control bar will not be visible.
   * `muted` and `loop` property on <video> tag will be set to true as default.
   */
  @Prop() readonly controlPanelConfig: ControlPanelConfig = {}

  /**
   * Specifies the preferred loading behavior.
   *
   * - `'auto'`: Indicates that the browser should load the entire media content when the page loads, if possible.
   * - `'metadata'`: Indicates that only the metadata (e.g., length, track list) should be preloaded.
   */
  @Prop() readonly preload: 'auto' | 'metadata' = 'metadata'

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales: Partial<VideoPlayerLocales> = {}

  /**
   * Defines the jump values for the video progress bar and volume bar.
   */
  @Prop() readonly jumpValues: JumpValues = {
    videoSkipTimeValue: 5,
    volumeSkipValue: 0.05,
  }

  /**
   * Contains the WppVideo `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Plays the current video using the video player reference if it is available.
   *
   * @return {Promise<void>} A promise that resolves when the video begins playback.
   */
  @Method()
  async play() {
    this.videoPlayerRef?.play()
    this.videoPlayerState = 'playing'
  }

  /**
   * Pauses the video playback.
   *
   * @return {Promise<void>} A promise that resolves when the video is successfully paused.
   */
  @Method()
  async pause() {
    this.videoPlayerRef?.pause()
    this.videoPlayerState = 'paused'
  }

  @Watch('videoPlayerState')
  onVideoPlayerState(value: VideoPlayerStates, oldValue: VideoPlayerStates) {
    if (oldValue === 'idle') {
      this.controlsRef?.focus()
      // Prevent double togglePlay when user navigating with keyboard
      setTimeout(() => {
        this.setupKeyboardEventListeners()
      }, 0)
    } else if (
      oldValue === 'playing' &&
      value === 'idle' &&
      !this.controlPanelConfigDefault.autoplay &&
      !this.controlPanelConfigDefault.loop
    ) {
      this.removeKeyboardEventListeners()
    }
  }

  @Watch('volume')
  onVolumeChange(value: number) {
    if (!this.videoPlayerRef) return

    this.videoPlayerRef.muted = value === 0
    this.videoPlayerRef.volume = value
  }

  @Watch('currentVideoTime')
  onCurrentVideoTimeChange(value: number) {
    if (!this.videoPlayerRef) return

    this.splitCurrentVideoTime = formatTime(this.timeFormat, value, true) as SplitTimeFormat
    this.updateSeekProgress(value)
  }

  @Watch('selectedLanguage')
  onSelectedLanguageChange(value: string) {
    this.setActiveTrack(value)
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<VideoPlayerLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }

    if (this.caption) this.selectedLanguage = this.caption.srclang

    this.controlPanelConfigDefault = {
      ...this.controlPanelConfigDefault,
      ...this.controlPanelConfig,
    }

    if (!this.controlPanelConfigDefault.showVolumeButton) this.volume = 0

    this.createSizeProps()
    this.sourceRender()
    this.trackRender()
  }

  componentDidLoad() {
    if (this.controlPanelConfigDefault.autoplay) this.videoPlayerState = 'playing'

    if (!this.controlPanelConfigDefault.autoplay && this.controlPanelConfigDefault.showFullscreenButton) {
      document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    }
  }

  disconnectedCallback() {
    if (!this.controlPanelConfigDefault.autoplay) {
      this.host.removeEventListener('keydown', this.handleKeyboardInput)

      if (this.controlPanelConfigDefault.showFullscreenButton)
        document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    }

    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout)
    }
  }

  private setupKeyboardEventListeners = () => {
    document.addEventListener('keydown', this.handleKeyboardInput)
  }

  private removeKeyboardEventListeners = () => {
    document.removeEventListener('keydown', this.handleKeyboardInput)
  }

  private handleKeyboardInput = (event: KeyboardEvent) => {
    if (!this.host.matches(':focus-within') || !this.videoPlayerRef) return

    const focusedEl = this.host.shadowRoot?.activeElement

    // For the case when autoplay=true and loop = false, to play video again with focus on the video element
    if (focusedEl === this.videoPlayerRef && event.code === 'Space') {
      this.togglePlay()
      event.preventDefault()

      return
    }

    if (this.controlPanelConfigDefault.autoplay) return
    if (this.isInvisible) this.showControls()

    switch (event.code) {
      case 'ArrowLeft':
        this.videoPlayerRef.currentTime = Math.max(
          0,
          this.videoPlayerRef.currentTime - (this.jumpValues.videoSkipTimeValue ?? 0),
        )
        break

      case 'ArrowRight':
        this.videoPlayerRef.currentTime = Math.min(
          this.videoPlayerRef.currentTime + this.jumpValues.videoSkipTimeValue,
          this.overallVideoTime,
        )
        break

      case 'ArrowDown':
        if (!this.controlPanelConfigDefault.showVolumeButton) return
        this.volume = Math.max(this.volume - this.jumpValues.volumeSkipValue, 0)
        if (this.showAndHideVolumeSlider) {
          this.showControls()
          if (this.volumeBarRef === focusedEl) {
            this.handleSliderShow()
          } else {
            this.showAndHideVolumeSlider()
          }
        }
        break

      case 'ArrowUp':
        if (!this.controlPanelConfigDefault.showVolumeButton) return
        this.volume = Math.min(this.volume + this.jumpValues.volumeSkipValue, 1)
        if (this.showAndHideVolumeSlider) {
          this.showControls()
          if (this.volumeBarRef === focusedEl) {
            this.handleSliderShow()
          } else {
            this.showAndHideVolumeSlider()
          }
        }
        break

      case 'Space':
        // Remove interaction when focus on play/mute/fullscreen button's
        if (
          (this.initPlayButtonRef && this.initPlayButtonRef === focusedEl) ||
          (this.volumeButtonRef && this.volumeButtonRef === focusedEl) ||
          (this.fullScreenButtonRef && this.fullScreenButtonRef === focusedEl) ||
          (this.captionButtonRef && this.captionButtonRef === focusedEl) ||
          (this.playPauseButtonRef && this.playPauseButtonRef === focusedEl)
        ) {
          return
        }

        this.togglePlay()
        break

      case 'KeyM':
        if (this.controlPanelConfigDefault.showVolumeButton) this.toggleMute()
        break

      case 'KeyF':
        if (this.controlPanelConfigDefault.showFullscreenButton) this.toggleFullscreen()
        break

      case 'KeyC':
        if (this.caption) this.toggleCaptions()
        break

      default:
        return
    }

    event.preventDefault()
  }

  private handleTimeUpdate = () => {
    if (!this.videoPlayerRef) return

    this.currentVideoTime = this.videoPlayerRef.currentTime
  }

  private handleMetadataLoaded = () => {
    if (!this.videoPlayerRef) return

    if (this.videoPlayerRef.duration > 3600) {
      this.timeFormat = 'extended'
      this.splitCurrentVideoTime = INIT_SPLIT_TIME_FORMAT_W_HOURS
    }

    this.splitOverallVideoTime = formatTime(this.timeFormat, this.videoPlayerRef.duration, true) as SplitTimeFormat
    this.overallVideoTime = this.videoPlayerRef.duration

    if (this.videoPlayerRef.videoWidth && this.videoPlayerRef.videoHeight) {
      this.aspectRatio = (this.videoPlayerRef.videoWidth / this.videoPlayerRef.videoHeight).toString()
      this.videoPlayerRef.style.setProperty('--aspect-ratio', this.aspectRatio)
    }

    this.setupCustomCaptions()
  }

  private handleLoadProgress = () => {
    if (!this.videoPlayerRef || !this.videoPlayerRef.buffered.length) return

    this.loadedPercentage = calculateBufferProgress(this.videoPlayerRef)
  }

  protected handleSeek = (event: Event) => {
    if (!this.videoPlayerRef) return

    this.videoPlayerRef.currentTime = parseFloat((event.target as HTMLInputElement).value)
  }

  protected handleVolume = (event: Event) => {
    if (!this.videoPlayerRef) return

    this.volume = parseFloat((event.target as HTMLInputElement).value)
  }

  private handlePlayStateChange = () => {
    if (!this.videoPlayerRef) return

    if (this.videoPlayerState === 'playing') {
      this.showControls()
    }
  }

  private handleVideoEnded = () => {
    if (this.videoPlayerRef && this.controlPanelConfigDefault.autoplay && !this.controlPanelConfigDefault.loop) {
      this.videoPlayerRef.currentTime = 0
    }

    this.videoPlayerState = 'idle'
    this.hideControls()
  }

  protected handleSliderShow = () => this.volumeSliderShow()
  protected handleSliderHide = (delay: number) => this.volumeSliderHide(delay)

  private volumeSliderShow = () => {
    if (!this.volumeBarContainerRef || !this.volumeButtonRef) return
    clearTimeout(this.hoverTimeout)
    const btnEl = this.volumeButtonRef?.shadowRoot?.querySelector('.inverted') as HTMLButtonElement

    this.volumeBarContainerRef.classList.add('active')
    btnEl?.classList.add('hover-active')
  }

  private volumeSliderHide = (delay: number = 300) => {
    if (this.hoverTimeout) clearTimeout(this.hoverTimeout)

    this.hoverTimeout = setTimeout(() => {
      const btnEl = this.volumeButtonRef?.shadowRoot?.querySelector('.inverted') as HTMLButtonElement

      this.volumeBarContainerRef?.classList.remove('active')
      btnEl?.classList.remove('hover-active')
    }, delay)
  }

  private handleFullscreenChange = () => {
    this.isFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement ||
      (document as any).mozFullScreenElement
    )
  }

  private handleMouseLeave = () => {
    if (this.videoPlayerState === 'playing') this.hideControls()
  }

  private handleMouseMove = () => {
    this.showControls()
  }

  private handleControlsDblClick = (event: Event) => {
    if (
      this.controlPanelConfigDefault.showFullscreenButton &&
      event.target === this.controlsRef &&
      this.videoPlayerState !== 'idle'
    )
      this.toggleFullscreen()
  }

  private handleControlsClick = (event: Event) => {
    if (
      event.target === this.controlsRef &&
      this.videoPlayerState !== 'idle' &&
      event.target !== this.playPauseButtonRef
    ) {
      this.controlsRef?.focus()
      this.togglePlay()
    }
  }

  private showControls = () => {
    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout)
      this.hideControlsTimeout = null
    }

    this.isInvisible = false

    if (this.videoPlayerState === 'playing') {
      this.hideControlsTimeout = window.setTimeout(() => {
        this.isInvisible = true
      }, this.hideDelay)
    }
  }

  private hideControls = () => {
    if (this.preventMouseLeaveEvent) return

    if (this.hideControlsTimeout) {
      window.clearTimeout(this.hideControlsTimeout)
      this.hideControlsTimeout = null
    }
    this.isInvisible = true
  }

  private updateSeekProgress = (value: number) => {
    if (!this.seekBarRef) return

    const min = parseFloat(this.seekBarRef.min)
    const max = parseFloat(this.seekBarRef.max)
    const progress = ((value - min) / (max - min)) * 100

    this.seekBarRef.style.setProperty('--progress-bar-progress', `${progress}%`)
  }

  private showAndHideVolumeSlider = (delay: number = 1000) => {
    this.handleSliderShow()
    clearTimeout(this.hoverTimeout)
    this.handleSliderHide(delay)
  }

  private setupCustomCaptions = () => {
    if (!this.videoPlayerRef || !this.caption) return

    this.textTracks = this.videoPlayerRef.textTracks
    this.updateAvailableTracks()
    this.setActiveTrack(this.selectedLanguage)

    this.videoPlayerRef.textTracks.onaddtrack = event => {
      const track = event.track

      if (!track) return
      if (track.kind === 'subtitles' || track.kind === 'captions') {
        track.mode = 'hidden'
        track.oncuechange = () => {
          if (track.activeCues) {
            this.activeCues = Array.from(track.activeCues)
          }
        }
      }
    }
  }

  private updateAvailableTracks = () => {
    if (!this.textTracks) return

    const languages = []

    for (let i = 0; i < this.textTracks.length; i++) {
      const track = this.textTracks[i]

      if (track.kind === 'subtitles' || track.kind === 'captions') {
        languages.push({
          code: track.language,
          label: track.label || track.language,
        })
      }
    }

    this.availableLanguages = languages
  }

  private setActiveTrack = (languageCode: string) => {
    if (!this.textTracks) return

    if (this.activeTrack) this.activeTrack.oncuechange = null

    this.activeCues = []

    for (let i = 0; i < this.textTracks.length; i++) {
      const track = this.textTracks[i]

      track.mode = 'disabled'
    }

    for (let i = 0; i < this.textTracks.length; i++) {
      const track = this.textTracks[i]

      if (track.language === languageCode) {
        track.mode = 'hidden'
        this.activeTrack = track

        // Set up cue change listener
        track.oncuechange = () => {
          if (track.activeCues) {
            this.activeCues = Array.from(track.activeCues) as VTTCue[]
          }
        }

        break
      }
    }
  }

  private togglePlay = () => {
    this.videoPlayerState === 'playing' ? this.pause() : this.play()
  }

  private toggleCaptions = () => {
    if (!this.videoPlayerRef) return

    this.isCaptionEnabled = !this.isCaptionEnabled
  }

  protected toggleMute = () => {
    if (!this.videoPlayerRef) return

    if (this.volume === 0) {
      this.volume = this.savedVolume
    } else {
      this.savedVolume = this.volume
      this.volume = 0
    }
  }

  private toggleFullscreen = async () => {
    if (!this.videoPlayerRef || !this.controlPanelConfigDefault.showFullscreenButton) return

    try {
      if (!this.isFullscreen) {
        if (this.host.requestFullscreen) {
          this.savedScrollPosition = {
            x: window.scrollX,
            y: window.scrollY,
          }
          await this.host.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
          this.controlsRef?.focus()

          window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y)
          window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y)
        }
      }
      this.isFullscreen = !this.isFullscreen
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  private sourceRender = () => {
    const src = Array.isArray(this.src) ? this.src : [this.src]
    const type = Array.isArray(this.type) ? this.type : [this.type]

    this.sourceElements = src.map((src, ndx) => <source src={src} type={type[ndx]} />)
  }

  private trackRender = () => {
    if (!this.caption) return

    this.trackElements = (
      <track
        label={this.caption.label}
        kind={this.caption.kind}
        src={this.caption.src}
        srclang={this.caption.srclang}
        default={this.caption.default}
      />
    )
  }

  private createSizeProps = () => {
    const createDimensionProps = (value: number | string, dimension: 'width' | 'height') => {
      const isNumeric = typeof value === 'number'

      return {
        numeric: isNumeric ? { [dimension]: value } : {},
        style: isNumeric ? { [dimension]: `${value}px` } : { [dimension]: value },
        isNonNumeric: !isNumeric,
      }
    }

    const width = createDimensionProps(this.size.width, 'width')
    const height = createDimensionProps(this.size.height, 'height')

    this.videoPlayerHostSize = {
      style: {
        ...width.style,
        ...height.style,
      },
    }

    this.videoPlayerSize = {
      ...width.numeric,
      ...height.numeric,
      style: {
        ...(width.isNonNumeric ? { width: '100%' } : {}),
        ...(height.isNonNumeric ? { height: '100%' } : {}),
      },
    }
  }

  private hostCssClasses = () => ({
    'wpp-video-player': true,
    'wpp-full-screen': this.isFullscreen,
    'wpp-autoplay': this.controlPanelConfigDefault.autoplay ?? false,
    [`wpp-${this.videoPlayerState}`]: true,
  })

  private controlsCssClasses = () => ({
    controls: true,
    [`state-${this.videoPlayerState}`]: true,
    invisible: this.isInvisible,
  })

  private playButtonCssClasses = () => ({
    'play-button': true,
    invisible: this.videoPlayerState !== 'idle',
  })

  /**
   * Render the main play button only for:
   * - autoplay=false && state = idle
   * - autoplay=true
   */
  private renderMainPlayButton = () => (
    <wpp-action-button
      ref={ref => (this.initPlayButtonRef = ref)}
      class={this.playButtonCssClasses()}
      onClick={this.togglePlay}
      variant="inverted"
      ariaProps={{
        label:
          this.videoPlayerState === 'playing'
            ? this._locales.playButtonAriaLabel.play
            : this._locales.playButtonAriaLabel.pause,
        pressed: this.videoPlayerState === 'playing',
      }}
    >
      {this.videoPlayerState !== 'playing' ? (
        <wpp-icon-play-filled slot="icon-start" aria-hidden="true" />
      ) : (
        <wpp-icon-pause-filled slot="icon-start" aria-hidden="true" />
      )}
    </wpp-action-button>
  )

  private renderVideoTag = () => (
    <video
      ref={ref => (this.videoPlayerRef = ref)}
      id="video-element"
      class="video-player"
      part="video-player"
      controls={false}
      poster={this.thumbnail}
      autoplay={this.controlPanelConfigDefault.autoplay}
      muted={!this.controlPanelConfigDefault.showVolumeButton || this.controlPanelConfigDefault.autoplay}
      loop={this.controlPanelConfigDefault.loop}
      preload={this.preload}
      onEnded={this.handleVideoEnded}
      onLoadedMetaData={this.handleMetadataLoaded}
      {...(this.controlPanelConfigDefault.autoplay
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
          })}
      {...this.videoPlayerSize}
    >
      {this.sourceElements}
      {this.trackElements}
      {this._locales.notSupportedPlayer}
    </video>
  )
  private renderVideoTime = (time: SplitTimeFormat) => renderVideoCurrentTimeComponent.call(this, time)
  private renderSeekBar = () => renderSeekBarComponent.call(this)
  private renderVolumeBar = () => renderVolumeBarComponent.call(this)
  private renderCaptions = () => renderCaptionsComponent.call(this)
  private renderAccessibilityInstructions = () => renderAccessibilityInstructionsComponent.call(this)

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="video-player, controls"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        {...this.videoPlayerHostSize}
        role="region"
        aria-label={this._locales.hostAriaLabel}
      >
        {this.renderVideoTag()}
        {this.renderMainPlayButton()}

        {!this.controlPanelConfigDefault.autoplay && (
          <div
            ref={ref => (this.controlsRef = ref)}
            {...(this.thumbnail ? { style: { backgroundImage: `url(${this.thumbnail})` } } : {})}
            class={this.controlsCssClasses()}
            part="controls"
            tabindex="-1"
            {...(this.videoPlayerState !== 'idle'
              ? {
                  onDblClick: this.handleControlsDblClick,
                  onClick: this.handleControlsClick,
                  role: 'region',
                  'aria-label': this._locales.controlsAriaLabel,
                }
              : {})}
          >
            {this.videoPlayerState !== 'idle' && (
              <Fragment>
                {this.caption && this.renderCaptions()}

                <div class="controls-bar" ref={ref => (this.controlsBarRef = ref)}>
                  <wpp-action-button
                    ref={ref => (this.playPauseButtonRef = ref)}
                    class="play-pause-button"
                    variant="inverted"
                    onClick={this.togglePlay}
                    ariaProps={{
                      label:
                        this.videoPlayerState === 'playing'
                          ? this._locales.playPauseButtonArealLabels.pause
                          : this._locales.playPauseButtonArealLabels.play,
                      pressed: this.videoPlayerState === 'playing',
                    }}
                  >
                    {this.videoPlayerState === 'playing' ? (
                      <wpp-icon-pause-filled slot="icon-start" aria-hidden="true" />
                    ) : (
                      <wpp-icon-play-filled slot="icon-start" aria-hidden="true" />
                    )}
                  </wpp-action-button>

                  {this.renderVideoTime(this.splitCurrentVideoTime)}
                  {this.renderSeekBar()}
                  {this.renderVideoTime(this.splitOverallVideoTime)}

                  {this.caption && (
                    <wpp-action-button
                      ref={ref => (this.captionButtonRef = ref)}
                      onClick={this.toggleCaptions}
                      variant="inverted"
                      ariaProps={{
                        label: this._locales.captionButtonAriaLabel,
                      }}
                    >
                      {this.isCaptionEnabled ? (
                        <wpp-icon-caption-on slot="icon-start" aria-hidden="true" />
                      ) : (
                        <wpp-icon-caption-off slot="icon-start" aria-hidden="true" />
                      )}
                    </wpp-action-button>
                  )}

                  {this.controlPanelConfigDefault.showVolumeButton && this.renderVolumeBar()}

                  {this.controlPanelConfigDefault.showFullscreenButton && (
                    <wpp-action-button
                      ref={ref => (this.fullScreenButtonRef = ref)}
                      onClick={this.toggleFullscreen}
                      variant="inverted"
                      ariaProps={{
                        label: this._locales.fullscreenButtonAriaLabel,
                      }}
                    >
                      {this.isFullscreen ? (
                        <wpp-icon-fullscreen-minimise slot="icon-start" aria-hidden="true" />
                      ) : (
                        <wpp-icon-fullscreen slot="icon-start" aria-hidden="true" />
                      )}
                    </wpp-action-button>
                  )}
                  {this.renderAccessibilityInstructions()}
                </div>
              </Fragment>
            )}
          </div>
        )}
      </Host>
    )
  }
}
