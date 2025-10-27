/// <reference types="node" />
import { AriaProps } from '../../types/common';
import { CaptionValue, VideoPlayerLocales, ControlPanelConfig, JumpValues, SplitTimeFormat, TimeFormats, TrackLanguage, VideoPlayerStates, VideoSizeDimensions, VideoSourceType } from './types';
export declare class WppVideoPlayer {
  host: HTMLWppVideoPlayerElement;
  private videoPlayerRef;
  private initPlayButtonRef;
  protected controlsBarRef: HTMLDivElement | undefined;
  private playPauseButtonRef;
  private fullScreenButtonRef;
  protected controlsRef: HTMLDivElement | undefined;
  protected seekBarRef: HTMLInputElement | undefined;
  protected volumeBarRef: HTMLInputElement | undefined;
  protected volumeButtonRef: HTMLWppActionButtonElement | undefined;
  protected volumeContainerRef: HTMLDivElement | undefined;
  protected volumeBarContainerRef: HTMLDivElement | undefined;
  private captionButtonRef;
  private videoPlayerHostSize;
  private videoPlayerSize;
  private aspectRatio;
  private sourceElements;
  private trackElements;
  private hideControlsTimeout;
  private hideDelay;
  private savedScrollPosition;
  private savedVolume;
  protected controlPanelConfigDefault: ControlPanelConfig;
  protected preventMouseLeaveEvent: boolean;
  protected _locales: VideoPlayerLocales;
  protected hoverTimeout: NodeJS.Timeout;
  private textTracks;
  private activeTrack;
  protected availableLanguages: TrackLanguage[];
  videoPlayerState: VideoPlayerStates;
  currentVideoTime: number;
  timeFormat: TimeFormats;
  splitCurrentVideoTime: SplitTimeFormat;
  overallVideoTime: number;
  splitOverallVideoTime: SplitTimeFormat;
  loadedPercentage: number;
  volume: number;
  isFullscreen: boolean;
  isInvisible: boolean;
  isCaptionEnabled: boolean;
  activeCues: TextTrackCue[];
  selectedLanguage: string;
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
   * If set autoplay to `true`, the control bar will not be visible.
   * `muted` and `loop` property on <video> tag will be set to true as default.
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
   * Defines the jump values for the video progress bar and volume bar.
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
  onUpdateLocales(newLocales: Partial<VideoPlayerLocales>): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private setupKeyboardEventListeners;
  private removeKeyboardEventListeners;
  private handleKeyboardInput;
  private handleTimeUpdate;
  private handleMetadataLoaded;
  private handleLoadProgress;
  protected handleSeek: (event: Event) => void;
  protected handleVolume: (event: Event) => void;
  private handlePlayStateChange;
  private handleVideoEnded;
  protected handleSliderShow: () => void;
  protected handleSliderHide: (delay: number) => void;
  private volumeSliderShow;
  private volumeSliderHide;
  private handleFullscreenChange;
  private handleMouseLeave;
  private handleMouseMove;
  private handleControlsDblClick;
  private handleControlsClick;
  private showControls;
  private hideControls;
  private updateSeekProgress;
  private showAndHideVolumeSlider;
  private setupCustomCaptions;
  private updateAvailableTracks;
  private setActiveTrack;
  private togglePlay;
  private toggleCaptions;
  protected toggleMute: () => void;
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
  render(): any;
}
