/// <reference types="node" />
import { AriaProps } from '../../types/common';
import { CaptionValue, VideoPlayerLocales, ControlPanelConfig, JumpValues, TimeFormats, TrackLanguage, VideoPlayerStates, VideoSizeDimensions, VideoSourceType } from './types';
export declare class WppVideoPlayer {
  private themeSubscription;
  /** Fullscreen takes focus away like a dialog does, so it is handed back the same way. */
  private fullscreenFocus;
  /** Set on teardown: the volume slider's hide timer writes state and must not fire after it. */
  private isDisposed;
  host: HTMLWppVideoPlayerElement;
  private videoPlayerRef;
  private initPlayButtonRef;
  protected controlsBarRef: HTMLDivElement | undefined;
  private playPauseButtonRef;
  private fullScreenButtonRef;
  protected controlsRef: HTMLDivElement | undefined;
  protected seekBarRef: HTMLInputElement | undefined;
  /** Minted once per element: a fresh id on every render would keep re-pointing the seek
   *  slider's `<label for>` at a new target. */
  protected seekBarId: string;
  volumeBarRef: HTMLInputElement | undefined;
  volumeButtonRef: HTMLWppActionButtonElement | undefined;
  volumeContainerRef: HTMLDivElement | undefined;
  volumeBarContainerRef: HTMLDivElement | undefined;
  private captionButtonRef;
  private videoPlayerHostSize;
  private videoPlayerSize;
  private aspectRatio;
  private sourceElements;
  private trackElements;
  private hideControlsTimeout;
  private hideDelay;
  private savedScrollPosition;
  /** Restored by `toggleMute`. Full volume by default, so unmuting a player that started silent
   *  actually produces sound rather than restoring the silence it began with. */
  private savedVolume;
  protected controlPanelConfigDefault: ControlPanelConfig;
  protected preventMouseLeaveEvent: boolean;
  protected hoverTimeout: NodeJS.Timeout;
  private textTracks;
  private activeTrack;
  protected availableLanguages: TrackLanguage[];
  videoPlayerState: VideoPlayerStates;
  currentVideoTime: number;
  /**
   * The position the seek slider's value (`aria-valuenow`/`-valuetext`) reports. While the slider has
   * focus during playback it only follows deliberate moves, so it is not read out every second;
   * otherwise it follows the position, so focus lands on the current time. The thumb itself always
   * shows `currentVideoTime`.
   */
  spokenSeekTime: number;
  timeFormat: TimeFormats;
  overallVideoTime: number;
  loadedPercentage: number;
  volume: number;
  isFullscreen: boolean;
  isInvisible: boolean;
  isCaptionEnabled: boolean;
  /** Mirrors the slider panel's `active` class so the mute button can expose `aria-expanded`. */
  isVolumeSliderOpen: boolean;
  activeCues: TextTrackCue[];
  selectedLanguage: string;
  /**
   * The last thing that happened (a play-state change, or what a control or shortcut changed), spoken
   * through the live region. Starts as the idle state; set via `announce`.
   */
  announcement: string;
  private announcementTimeout;
  /**
   * Represents the source of a resource.
   */
  readonly src: string | string[];
  /**
   * Represents the thumbnail of the video.
   */
  readonly thumbnail?: string;
  /**
   * Represents the text or content displayed as the caption.
   */
  readonly caption?: CaptionValue;
  /**
   * Represents the type of video source.
   */
  readonly type: VideoSourceType | VideoSourceType[];
  /**
   * Represents the dimensions of a video size.
   *
   * @typedef {Object} VideoSizeDimensions
   * @property {number | `${number}%`} width - The width of the video in pixels or percentage
   * @property {number | `${number}%`} height - The height of the video in pixels or percentage
   */
  readonly size: VideoSizeDimensions;
  /**
   * Configuration object for the control panel settings.
   *
   * If set autoplay to `true`, the control bar will not be visible and the overlay play/pause
   * control stays visible instead, so an autoplaying video can still be stopped.
   * The `<video>` starts muted when `autoplay` is `true`, when `showVolumeButton` is `false`, or
   * when `muted` is set; `loop` is passed through as given.
   *
   * `autoplay` is meant for decorative or background video: it plays muted, with no control bar and
   * no way to turn sound on, and `caption` is not shown. A video whose speech or visuals carry
   * information should use the default player, which offers sound, captions and the full controls.
   */
  readonly controlPanelConfig: ControlPanelConfig;
  /**
   * Specifies the preferred loading behavior.
   *
   * - `'auto'`: Indicates that the browser should load the entire media content when the page loads, if possible.
   * - `'metadata'`: Indicates that only the metadata (e.g., length, track list) should be preloaded.
   */
  readonly preload: 'auto' | 'metadata';
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<VideoPlayerLocales>;
  /**
   * Defines the jump values for the video progress bar and volume bar: `videoSkipTimeValue` in seconds
   * (default `5`) and `volumeSkipValue` as a fraction of full volume (default `0.05`). A value left
   * out keeps its default.
   */
  readonly jumpValues: JumpValues;
  /**
   * Contains the WppVideo `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Plays the current video using the video player reference if it is available.
   *
   * @return {Promise<void>} A promise that resolves when the video begins playback.
   */
  play(): Promise<void>;
  /**
   * Pauses the video playback.
   *
   * @return {Promise<void>} A promise that resolves when the video is successfully paused.
   */
  pause(): Promise<void>;
  onVideoPlayerState(value: VideoPlayerStates, oldValue: VideoPlayerStates): void;
  onVolumeChange(value: number): void;
  onCurrentVideoTimeChange(value: number): void;
  onSelectedLanguageChange(value: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  get _locales(): VideoPlayerLocales;
  /** `jumpValues` over the defaults: one key passed alone used to leave the other undefined (NaN volume). */
  get _jumpValues(): JumpValues;
  /** Names the action the press performs, honouring a consumer's deprecated override. */
  private get playPauseLabel();
  /**
   * The shared volume bar reads the mute button's label from here. It names the click action, so
   * it swaps with the mute state — the same contract as `wpp-audio-player`, which is why the bar
   * is rendered with `withPressedState: false`: a toggle uses a flipping name or `aria-pressed`,
   * never both.
   */
  get volumeButtonLabel(): string;
  /** The seek position as spoken: the clock time and the total, e.g. "00:15 of 01:40". */
  seekValueText(timeInSeconds: number): string;
  /**
   * Speaks `text` through the live region. Callers only announce a real change. The region is
   * emptied first, because a change made without an announcement (dragging the volume, playback
   * moving on) can leave the previous message in place, and the same words again would be silent.
   */
  private announce;
  private announceVolume;
  /** One `volumeSkipValue` step up (1) or down (-1), rounded so repeated steps do not drift (0.95 - 0.05). */
  private stepVolume;
  /**
   * Moves the playback position one `videoSkipTimeValue` step back (-1) or forward (1), within the
   * video, and returns the new time. Shared by the shortcuts and the seek slider's own arrow keys.
   */
  private seekBy;
  private setupKeyboardEventListeners;
  private removeKeyboardEventListeners;
  private handleKeyboardInput;
  private handleTimeUpdate;
  private handleMetadataLoaded;
  private handleLoadProgress;
  protected handleSeek: (event: Event) => void;
  /**
   * The slider's own ←/→ step is 1% of the duration (`step="any"`, kept for smooth scrubbing): 0.1s
   * on a short clip, which leaves the spoken "00:03 of 00:10" unchanged, so the press sounds like it
   * did nothing. They move by the shortcut's distance instead, so every press says a new time.
   */
  protected handleSeekKeyDown: (event: KeyboardEvent) => void;
  handleVolume: (event: Event) => void;
  private handlePlayStateChange;
  private handleVideoEnded;
  handleSliderShow: () => void;
  handleSliderHide: (delay: number) => void;
  /** The container's `open` class keeps the mute button in its hover look while the slider shows. */
  private volumeSliderShow;
  private volumeSliderHide;
  private volumeSliderHideNow;
  /**
   * Escape closes the slider at once. A closed slider is hidden from the focus, so when the focus
   * sits on it, it is moved back to the mute button first; that focus would reopen the slider,
   * which is why the hide follows it rather than the other way round.
   */
  dismissVolumeSlider: () => void;
  private handleFullscreenChange;
  private handleMouseLeave;
  /** Reveals the controls when focus moves into them, so a focused control is never hidden. */
  private handleFocusIn;
  /** Focus has left the player, so the bar may go back to hiding on the usual delay. */
  private handleFocusOut;
  private handleMouseMove;
  private handleControlsDblClick;
  private handleControlsClick;
  private showControls;
  /**
   * Hiding the bar takes it out of the tab order, so a control the user is currently sitting on
   * must never be hidden from under them. While focus is inside the bar the timer simply starts
   * again; it hides once focus has left. `:focus-within` is used rather than `activeElement`
   * because it is the only check that crosses into the controls' own shadow roots.
   */
  private hideControlsUnlessFocused;
  private hideControls;
  private updateSeekProgress;
  private showAndHideVolumeSlider;
  private setupCustomCaptions;
  private updateAvailableTracks;
  private setActiveTrack;
  private togglePlay;
  private toggleCaptions;
  toggleMute: () => void;
  private toggleFullscreen;
  private sourceRender;
  private trackRender;
  private createSizeProps;
  private hostCssClasses;
  private controlsCssClasses;
  private playButtonCssClasses;
  /**
   * Render the main play button only for:
   * - autoplay=false && state = idle
   * - autoplay=true
   */
  private renderMainPlayButton;
  private renderVideoTag;
  private renderVideoTime;
  private renderSeekBar;
  private renderVolumeBar;
  private renderCaptions;
  private renderAccessibilityInstructions;
  private renderStatusRegion;
  render(): any;
}
