export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MINUTE = 60;
export const DEFAULT_PLAYBACK_RATES = [0.5, 1.0, 1.25, 1.5, 2.0];
/** How far the skip buttons and the Left/Right arrow keys move the playback position, in seconds. */
export const AUDIO_SKIP_TIME_VALUE = 10;
/** How far the Up/Down arrow keys move the volume, on the 0–1 scale. */
export const VOLUME_SKIP_VALUE = 0.05;
/** ARIA roles whose element Space activates, so the play/pause shortcut leaves Space to them. */
export const SPACE_ACTIVATED_ROLES = ['button', 'checkbox', 'radio', 'switch', 'menuitem'];
export const LOCALES_DEFAULTS = {
  notSupportedPlayer: 'Your browser does not support the audio tag.',
  hostAriaLabel: 'Audio player',
  playButtonAriaLabel: 'Play',
  pauseButtonAriaLabel: 'Pause',
  skipBackwardButtonAriaLabel: 'Skip backward',
  skipForwardButtonAriaLabel: 'Skip forward',
  progressAriaLabel: 'Seek audio timeline',
  currentTimeAriaLabel: 'Current time',
  durationAriaLabel: 'Total time',
  volumeProgressLabel: 'Volume',
  muteButtonAriaLabel: 'Mute',
  unmuteButtonAriaLabel: 'Unmute',
  playbackRateButtonAriaLabel: 'Playback speed',
};
