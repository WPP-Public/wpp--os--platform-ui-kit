import { h } from '@stencil/core'
import { WppVideoPlayer } from '../wpp-video-player'

export function renderCaptionsComponent(this: WppVideoPlayer) {
  const captionWrapperCssClasses = () => ({
    'captions-wrapper': true,
    'caption-enabled': this.isCaptionEnabled,
  })

  return (
    <div
      class={captionWrapperCssClasses()}
      role="region"
      aria-label={this._locales.videoCaptionsAriaLabel}
      aria-live={this.isCaptionEnabled ? 'polite' : 'off'}
    >
      {this.activeCues.map((cue, index) => {
        const vttCue = cue as VTTCue
        const cueText = vttCue.text

        return (
          <div key={`cue-${index}`} class="caption-cue" aria-atomic="true">
            {cueText}
          </div>
        )
      })}
    </div>
  )
}
