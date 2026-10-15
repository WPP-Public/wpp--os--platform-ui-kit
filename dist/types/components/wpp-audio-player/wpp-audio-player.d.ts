import { Event, EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE } from '../../types/common';
import { AudioPlayerLocales, AudioPlayerRateEventDetail, AudioPlayerStates, AudioPlayerTimeEventDetail, AudioPlayerVolumeEventDetail, AudioSourceType, AudioTimeFormats } from './types';
export declare class WppAudioPlayer {
  private audioRef?;
  private playbackRatePopoverRef?;
  volumeBarRef: HTMLInputElement | undefined;
  volumeButtonRef: HTMLWppActionButtonElement | undefined;
  volumeContainerRef: HTMLDivElement | undefined;
  volumeBarContainerRef: HTMLDivElement | undefined;
  private hoverTimeout;
  /** Restored when the track is unmuted, so the volume lands back where the listener left it. */
  private savedVolume;
  /** While the seek bar's thumb is dragged, it shows where the listener is heading, not the playback position. */
  private isScrubbing;
  host: HTMLWppAudioPlayerElement;
  audioPlayerState: AudioPlayerStates;
  currentAudioTime: number;
  overallAudioTime: number;
  loadedPercentage: number;
  timeFormat: AudioTimeFormats;
  isPlaybackRateOpen: boolean;
  focusType: FOCUS_TYPE;
  /**
   * Represents the source of the audio file. Several sources can be provided as fallbacks,
   * the browser picks the first one it can play.
   */
  readonly src: string | string[];
  /**
   * Optional MIME type hint for each audio source, e.g. `'audio/ogg; codecs=opus'`, matched to
   * `src` by index. The browser only uses it to skip sources it cannot play without downloading
   * them, so it mainly helps with fallback sources. Leave it out rather than guess: a wrong type
   * makes the browser skip a source it could have played.
   */
  readonly type?: AudioSourceType | AudioSourceType[];
  /**
   * If `true`, playback starts as soon as the track's metadata is loaded. Browsers may block
   * autoplay until the user has interacted with the page.
   */
  readonly autoplay: boolean;
  /**
   * If `true`, the track starts again from the beginning when it reaches the end.
   */
  readonly loop: boolean;
  /**
   * Specifies the preferred loading behavior.
   *
   * - `'auto'`: the browser loads the whole file when the page loads, if possible.
   * - `'metadata'`: only the metadata (e.g. duration) is preloaded.
   * - `'none'`: nothing is preloaded until playback is requested.
   */
  readonly preload: 'auto' | 'metadata' | 'none';
  /**
   * Defines the playback speeds offered by the playback speed menu.
   */
  readonly playbackRates: number[];
  /**
   * Defines the current playback speed. Mutable, so selecting a speed in the menu updates it.
   */
  playbackRate: number;
  /**
   * Defines the current volume, from `0` (muted) to `1`. Mutable, so moving the volume slider
   * updates it. Values outside that range are clamped.
   */
  volume: number;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<AudioPlayerLocales>;
  /**
   * Contains the WppAudioPlayer `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Emitted when the playback starts.
   */
  wppPlay: EventEmitter<void>;
  /**
   * Emitted when the playback is paused.
   */
  wppPause: EventEmitter<void>;
  /**
   * Emitted when the playback reaches the end of the track.
   */
  wppEnded: EventEmitter<void>;
  /**
   * Emitted when the playback position changes.
   */
  wppTimeUpdate: EventEmitter<AudioPlayerTimeEventDetail>;
  /**
   * Emitted when the volume changes or the track is muted/unmuted.
   */
  wppVolumeChange: EventEmitter<AudioPlayerVolumeEventDetail>;
  /**
   * Emitted when the playback speed changes.
   */
  wppPlaybackRateChange: EventEmitter<AudioPlayerRateEventDetail>;
  /**
   * Plays the current track. At the end of the track, playback starts over from the beginning.
   *
   * @return {Promise<void>} A promise that resolves when the playback is requested.
   */
  play(): Promise<void>;
  /**
   * Pauses the current track.
   *
   * @return {Promise<void>} A promise that resolves when the track is paused.
   */
  pause(): Promise<void>;
  /**
   * Moves the playback position to the given time, in seconds. The value is clamped
   * to the boundaries of the track.
   *
   * @param {number} time - The playback position to move to, in seconds.
   * @return {Promise<void>} A promise that resolves when the position is applied.
   */
  seek(time: number): Promise<void>;
  onVolumeChange(): void;
  onPlaybackRateChange(value: number): void;
  /**
   * The single keyboard flow for the whole player: a key does the same thing wherever focus sits,
   * whether that is the host, a button or either slider. The sliders' own arrow stepping is
   * cancelled so they follow the same map.
   */
  handleKeyDown(event: KeyboardEvent): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /** Public, since the shared volume bar reads its labels from here. */
  get _locales(): AudioPlayerLocales;
  /** The mute button names its click action, so the label swaps with the mute state. */
  get volumeButtonLabel(): string;
  /**
   * `volume` is public, so a consumer can hand us anything, and `HTMLMediaElement.volume` throws
   * outside 0–1. Every internal read goes through here rather than the raw prop.
   */
  private get currentVolume();
  /**
   * A source without its own type renders no `type` attribute, so the browser detects the format
   * itself instead of trusting a type borrowed from another source.
   */
  private get sourceElements();
  /**
   * The track length is only known once the metadata is in, so both the extended `HH:MM:SS` format
   * and the seek bar boundaries are resolved here rather than up front.
   */
  private handleMetadataLoaded;
  /**
   * The duration known at `loadedmetadata` is often an estimate (e.g. a variable-bitrate MP3), and
   * the browser corrects it later, often only near the end of the track. Re-reading it on every
   * `durationchange` keeps the seek bar's `max` equal to the real end, so the thumb reaches it.
   */
  private syncDuration;
  private handleTimeUpdate;
  private handleLoadProgress;
  private handlePlay;
  private handlePause;
  private handleEnded;
  private handleSeek;
  /**
   * The release is listened for on the window, since the pointer can leave the seek bar while it
   * drags the thumb, and a click that does not move the thumb fires no `change`.
   */
  private startScrubbing;
  private stopScrubbing;
  /**
   * The focus ring only follows Tab, like the action buttons' own. `:focus-visible` would also show
   * it when a hotkey is pressed after a click focused the player (Safari focuses the player even on
   * a click on one of its buttons).
   */
  private handleContainerMouseDown;
  private handleContainerKeyUp;
  private handleContainerBlur;
  handleVolume: (event: Event) => void;
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
  /**
   * Feedback for a keyboard volume change: the slider shows for a moment. While the slider itself
   * is focused it stays open instead, so the listener keeps it in view.
   */
  private revealVolumeSlider;
  private showAndHideVolumeSlider;
  private handlePlaybackRateChange;
  /** Controls that Space activates natively: real buttons and ARIA toggles such as the speed pills. */
  private isActivatedBySpace;
  /** Whole rates keep one decimal ("1.0x"), fractional ones keep their own precision ("1.25x"). */
  private formatPlaybackRate;
  private clampTime;
  /**
   * Chromium can leave `ended` false after a seek to the very end (seen with VBR MP3s), so `play()`
   * would end at once instead of starting over, as it does once the track has really ended.
   */
  private get isAtEnd();
  private clampVolume;
  /** Rounded to 2 decimals, so repeated steps don't accumulate floating point errors (e.g. 0.7999999999999998). */
  private stepVolume;
  private togglePlay;
  toggleMute: () => void;
  private skip;
  private formatTime;
  private renderAudioTag;
  private renderTime;
  private get seekProgress();
  /**
   * The rail and the buffered bar sit under the input, which carries the played portion and the
   * thumb. The input's own track is transparent past the played portion, so both layers below
   * stay visible, and it is the topmost layer so the thumb is never painted over.
   *
   * `step="any"` stops the input snapping its value to a step grid, so the thumb follows the exact
   * playback position and lands on `max` at the end. The keyboard never relies on `step`: the
   * shared `handleKeyDown` flow moves the position by `AUDIO_SKIP_TIME_VALUE` itself.
   */
  private renderSeekBar;
  private renderIconButton;
  /**
   * The volume bar is the video player's, rendered with this player as its host: the slider opens
   * on hover and on focus, a click on the button mutes. Only here the button also carries a tooltip.
   */
  private renderVolumeBar;
  private renderPlaybackRateControl;
  render(): any;
}
