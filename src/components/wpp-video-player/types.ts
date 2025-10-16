/**
 * Common MIME types for video sources
 */
export type VideoSourceType =
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'video/quicktime'
  | 'video/x-msvideo'
  | 'video/x-ms-wmv'
  | 'video/x-flv'
  | 'video/x-matroska'
  | 'application/x-mpegURL'
  | 'application/dash+xml'
  | 'video/3gpp'
  | 'video/3gpp2'
  | 'video/mp2t'
  | string

export type VideoSizeDimensions = {
  width: number | `${number}%`
  height: number | `${number}%`
}

export type VideoPlayerLocales = {
  notSupportedPlayer: string
  hostAriaLabel: string
  videoPlayerElement: string
  videoStates: {
    playing: string
    paused: string
    idle: string
  }
  controlsAriaLabel: string
  playButtonAriaLabel: {
    play: string
    pause: string
  }
  playPauseButtonArealLabels: {
    play: string
    pause: string
  }
  captionButtonAriaLabel: string
  volumeProgressLabel: string
  volumeButtonAriaLabel: string
  fullscreenButtonAriaLabel: string
  videoProgressLabel: string
  videoProgressAriaLabel: string
  languageMenuAriaLabel: string
  videoCaptionsAriaLabel: string
  keyboardShortcutsDescription: {
    title: string
    playPause: string
    backwardForward: string
    volumeUpDown: string
    captions: string
    muteUnmute: string
    fullscreen: string
  }
}

export type VideoPlayerStates = 'idle' | 'playing' | 'paused'

export type SplitTimeFormat = {
  hours?: string
  minutes: string
  seconds: string
}

export type CalculatedVideoSize = {
  width?: number
  height?: number
  style?: {
    width?: string
    height?: string
  }
}

export type JumpValues = {
  videoSkipTimeValue: number
  volumeSkipValue: number
}

export type CaptionValue = {
  label: string
  kind: string
  src: string
  srclang: string
  default?: boolean
}

export type ControlPanelConfig = {
  showFullscreenButton?: boolean
  showVolumeButton?: boolean
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export type TrackLanguage = {
  code: string
  label: string
}

export type TimeFormats = 'default' | 'extended'
