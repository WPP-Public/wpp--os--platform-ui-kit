import { h, Fragment } from '@stencil/core'
import { WppVideoPlayer } from '../wpp-video-player'

export function renderSeekBarComponent(this: WppVideoPlayer) {
  const id = `progress-slider-${Math.random().toString(36).slice(2, 9)}`

  return (
    <Fragment>
      <div class="progress-container">
        <div class="loading-progress" style={{ width: `${this.loadedPercentage}%` }} aria-hidden="true" />
        <label htmlFor={id} class="sr-only">
          {this._locales.videoProgressLabel}
        </label>
        <input
          ref={ref => (this.seekBarRef = ref)}
          id={id}
          class="progress-bar"
          type="range"
          min={0}
          max={this.overallVideoTime}
          step={0.01}
          value={this.currentVideoTime}
          onInput={this.handleSeek}
          aria-label={this._locales.videoProgressAriaLabel}
          aria-valuemin="0"
          aria-valuemax={this.overallVideoTime}
          aria-valuenow={this.currentVideoTime}
          autocomplete="off"
        />
      </div>
    </Fragment>
  )
}
