export const JUMP_VALUES_DEFAULTS = {
  videoSkipTimeValue: 5,
  volumeSkipValue: 0.05,
};
/**
 * Gap between emptying the announcement region and writing the next message (ms), so even a message
 * worded like the last one is a fresh change. Within one frame the browser can merge the two into none.
 */
export const ANNOUNCEMENT_RESET_DELAY = 100;
export const LOCALES_DEFAULTS = {
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
