import { h, Fragment } from '@stencil/core'
import { WppVideoPlayer } from '../wpp-video-player'

export function renderAccessibilityInstructionsComponent(this: WppVideoPlayer) {
  return (
    <Fragment>
      {/* Hidden element with video state info for screen readers */}
      <div class="sr-only" role="status" aria-live="polite">
        {this.videoPlayerState === 'playing'
          ? this._locales.videoStates.playing
          : this.videoPlayerState === 'paused'
            ? this._locales.videoStates.paused
            : this.videoPlayerState === 'idle'
              ? this._locales.videoStates.idle
              : ''}
      </div>
      {/* Hidden element with keyboard shortcut info for screen readers */}
      {!this.controlPanelConfigDefault.autoplay && (
        <div class="sr-only" aria-live="polite">
          <h2>{this._locales.keyboardShortcutsDescription.title}</h2>
          <ul>
            <li>{this._locales.keyboardShortcutsDescription.playPause}</li>
            <li>{this._locales.keyboardShortcutsDescription.backwardForward}</li>
            {!this.controlPanelConfigDefault.showVolumeButton && (
              <li>{this._locales.keyboardShortcutsDescription.volumeUpDown}</li>
            )}
            {this.caption && <li>{this._locales.keyboardShortcutsDescription.captions}</li>}
            {!this.controlPanelConfigDefault.showVolumeButton && (
              <li>{this._locales.keyboardShortcutsDescription.muteUnmute}</li>
            )}
            {!this.controlPanelConfigDefault.showFullscreenButton && (
              <li>{this._locales.keyboardShortcutsDescription.fullscreen}</li>
            )}
          </ul>
        </div>
      )}
    </Fragment>
  )
}
