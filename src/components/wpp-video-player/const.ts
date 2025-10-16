import { VideoPlayerLocales, SplitTimeFormat } from './types'

export const INIT_SPLIT_TIME_FORMAT: SplitTimeFormat = {
  minutes: '00',
  seconds: '00',
}

export const INIT_SPLIT_TIME_FORMAT_W_HOURS: SplitTimeFormat = {
  hours: '00',
  minutes: '00',
  seconds: '00',
}

export const LOCALES_DEFAULTS: VideoPlayerLocales = {
  notSupportedPlayer: 'Your browser does not support the video tag.',
  hostAriaLabel: 'Video player component',
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
  volumeProgressLabel: 'Volume',
  volumeButtonAriaLabel: 'Volume control button (toggle mute)',
  fullscreenButtonAriaLabel: 'Fullscreen button',
  videoProgressLabel: 'Video progress',
  videoProgressAriaLabel: 'Seek video timeline',
  languageMenuAriaLabel: 'Language menu',
  videoCaptionsAriaLabel: 'Video captions',
  keyboardShortcutsDescription: {
    title: 'Keyboard shortcuts',
    playPause: 'Space: Play/Pause',
    backwardForward: 'Left/Right arrows: Seek backward/forward 10 seconds',
    volumeUpDown: 'Up/Down arrows: Increase/decrease volume',
    captions: 'C: Toggle captions',
    muteUnmute: 'M: Toggle mute',
    fullscreen: 'F: Toggle fullscreen',
  },
}
