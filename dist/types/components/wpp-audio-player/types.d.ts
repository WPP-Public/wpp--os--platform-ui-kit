/**
 * Common MIME types for audio sources
 */
export type AudioSourceType = 'audio/mpeg' | 'audio/mp4' | 'audio/ogg' | 'audio/wav' | 'audio/webm' | 'audio/aac' | 'audio/flac' | 'audio/x-m4a' | string;
export type AudioPlayerStates = 'idle' | 'playing' | 'paused';
export type AudioTimeFormats = 'default' | 'extended';
export interface AudioPlayerTimeEventDetail {
  currentTime: number;
  duration: number;
}
export interface AudioPlayerVolumeEventDetail {
  volume: number;
  isMuted: boolean;
}
export interface AudioPlayerRateEventDetail {
  playbackRate: number;
}
export type AudioPlayerLocales = {
  notSupportedPlayer: string;
  hostAriaLabel: string;
  playButtonAriaLabel: string;
  pauseButtonAriaLabel: string;
  skipBackwardButtonAriaLabel: string;
  skipForwardButtonAriaLabel: string;
  progressAriaLabel: string;
  currentTimeAriaLabel: string;
  durationAriaLabel: string;
  volumeProgressLabel: string;
  muteButtonAriaLabel: string;
  unmuteButtonAriaLabel: string;
  playbackRateButtonAriaLabel: string;
};
