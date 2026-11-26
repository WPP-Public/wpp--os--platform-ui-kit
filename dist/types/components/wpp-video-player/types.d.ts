/**
 * Common MIME types for video sources
 */
export type VideoSourceType = 'video/mp4' | 'video/webm' | 'video/ogg' | 'video/quicktime' | 'video/x-msvideo' | 'video/x-ms-wmv' | 'video/x-flv' | 'video/x-matroska' | 'application/x-mpegURL' | 'application/dash+xml' | 'video/3gpp' | 'video/3gpp2' | 'video/mp2t' | string;
export type VideoSizeDimensions = {
  width: number | `${number}%`;
  height: number | `${number}%`;
};
export type VideoPlayerLocales = {
  notSupportedPlayer: string;
  hostAriaLabel: string;
  videoPlayerElement: string;
  videoStates: {
    playing: string;
    paused: string;
    idle: string;
  };
  controlsAriaLabel: string;
  /**
   * @deprecated Named the player's state ("Video paused") rather than the button's action, so the
   * control that starts the video announced itself as "Video paused". No longer read — the overlay
   * button now uses `playPauseButtonArealLabels`. Kept for backward compatibility; removed in v5.0.0.
   */
  playButtonAriaLabel: {
    play: string;
    pause: string;
  };
  /** Names the action the press performs: `play` while paused, `pause` while playing. */
  playPauseButtonArealLabels: {
    play: string;
    pause: string;
  };
  /**
   * @deprecated Replaced by `showCaptionsButtonAriaLabel` / `hideCaptionsButtonAriaLabel`, which
   * name the action instead of the control. Kept for backward compatibility; removed in v5.0.0.
   */
  captionButtonAriaLabel: string;
  /** Caption button label while captions are off. */
  showCaptionsButtonAriaLabel: string;
  /** Caption button label while captions are on. */
  hideCaptionsButtonAriaLabel: string;
  volumeProgressLabel: string;
  /**
   * @deprecated Replaced by `muteButtonAriaLabel` / `unmuteButtonAriaLabel`, which name the action
   * and match `wpp-audio-player`. Kept for backward compatibility; removed in v5.0.0.
   */
  volumeButtonAriaLabel: string;
  /** Mute button label while the video has sound. */
  muteButtonAriaLabel: string;
  /** Mute button label while the video is muted. */
  unmuteButtonAriaLabel: string;
  /**
   * @deprecated Replaced by `enterFullscreenButtonAriaLabel` / `exitFullscreenButtonAriaLabel`,
   * which name the action and expose the state. Kept for backward compatibility; removed in v5.0.0.
   */
  fullscreenButtonAriaLabel: string;
  /** Fullscreen button label while the player is inline. */
  enterFullscreenButtonAriaLabel: string;
  /** Fullscreen button label while the player is fullscreen. */
  exitFullscreenButtonAriaLabel: string;
  /** Names the seek slider, through its own `<label>`. */
  videoProgressLabel: string;
  /**
   * @deprecated The seek slider carries one name, from `videoProgressLabel`. This overrode that
   * label with different wording, so the control announced something its visible label did not
   * say. Still honoured when supplied, so existing translations keep working; removed in v5.0.0.
   */
  videoProgressAriaLabel: string;
  /** The seek slider's spoken value. `{current}` and `{total}` are replaced with clock times. */
  videoProgressValueText: string;
  /** Announced after a volume shortcut. `{value}` is replaced with the volume percentage. */
  volumeAnnouncement: string;
  mutedAnnouncement: string;
  unmutedAnnouncement: string;
  captionsOnAnnouncement: string;
  captionsOffAnnouncement: string;
  fullscreenOnAnnouncement: string;
  fullscreenOffAnnouncement: string;
  currentTimeAriaLabel: string;
  durationAriaLabel: string;
  languageMenuAriaLabel: string;
  /**
   * @deprecated The captions are no longer a named region, so this label is not used. Still accepted,
   * so existing translations keep compiling; removed in v5.0.0.
   */
  videoCaptionsAriaLabel: string;
  keyboardShortcutsDescription: {
    title: string;
    playPause: string;
    backwardForward: string;
    volumeUpDown: string;
    captions: string;
    muteUnmute: string;
    fullscreen: string;
  };
};
export type VideoPlayerStates = 'idle' | 'playing' | 'paused';
export type CalculatedVideoSize = {
  width?: number;
  height?: number;
  style?: {
    width?: string;
    height?: string;
  };
};
export type JumpValues = {
  videoSkipTimeValue: number;
  volumeSkipValue: number;
};
export type CaptionValue = {
  label: string;
  kind: string;
  src: string;
  srclang: string;
  /**
   * Shows the captions as soon as the video loads; viewers can still turn them off with the captions
   * button. Defaults to `false`. Earlier versions only marked the `<track>` as the default one and
   * still started with the captions off, so set this to `false` to keep that behaviour.
   */
  default?: boolean;
};
export type ControlPanelConfig = {
  showFullscreenButton?: boolean;
  showVolumeButton?: boolean;
  autoplay?: boolean;
  /**
   * Starts the video silent while leaving the volume button in place, so a viewer can turn the
   * sound on. The `<video>` is also muted unconditionally when `autoplay` is `true` or
   * `showVolumeButton` is `false`.
   */
  muted?: boolean;
  loop?: boolean;
};
export type TrackLanguage = {
  code: string;
  label: string;
};
export type TimeFormats = 'default' | 'extended';
