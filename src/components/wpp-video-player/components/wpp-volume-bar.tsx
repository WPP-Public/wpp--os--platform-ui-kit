import { h } from '@stencil/core'
import { WppVideoPlayer } from '../wpp-video-player'

export function renderVolumeBarComponent(this: WppVideoPlayer) {
  return (
    <div
      ref={ref => (this.volumeContainerRef = ref)}
      class="volume-container"
      onMouseEnter={this.handleSliderShow}
      onMouseLeave={() => this.handleSliderHide(300)}
    >
      <wpp-action-button
        ref={ref => (this.volumeButtonRef = ref)}
        class="volume-button"
        variant="inverted"
        onClick={this.toggleMute}
        onFocus={this.handleSliderShow}
        onFocusout={() => this.handleSliderHide(300)}
        ariaProps={{ label: this._locales.volumeButtonAriaLabel }}
      >
        {this.volume === 0 ? (
          <wpp-icon-speaker-mute slot="icon-start" aria-hidden="true" />
        ) : (
          <wpp-icon-speaker slot="icon-start" aria-hidden="true" />
        )}
      </wpp-action-button>

      <div ref={ref => (this.volumeBarContainerRef = ref)} class="slider-container">
        <label htmlFor="volume-slider" class="sr-only">
          {this._locales.volumeProgressLabel}
        </label>
        <input
          ref={ref => (this.volumeBarRef = ref)}
          style={{ '--progress-bar-progress': `${this.volume * 100}%` }}
          class="progress-bar"
          id="volume-slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={this.volume}
          onInput={this.handleVolume}
          aria-label="Volume control bar"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow={this.volume.toString()}
          autocomplete="off"
          onFocus={this.handleSliderShow}
          onFocusout={() => this.handleSliderHide(300)}
        />
      </div>
    </div>
  )
}
