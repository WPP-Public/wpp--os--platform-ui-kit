import { h, Fragment } from '@stencil/core'
import { WppVideoPlayer } from '../wpp-video-player'
import { SplitTimeFormat } from '../types'

export function renderVideoCurrentTimeComponent(this: WppVideoPlayer, time: SplitTimeFormat) {
  const ariaLabel = time.hours ? `${time.hours}:${time.minutes}:${time.seconds}` : `${time.minutes}:${time.seconds}`

  return (
    <Fragment>
      <wpp-typography class="video-time" type="xs-body">
        <span class="wrapper" role="timer" aria-label={ariaLabel}>
          {time.hours && (
            <Fragment>
              <span class="time-wrapper" role="presentation">
                <span class="time-placeholder" aria-hidden="true">
                  44
                </span>
                <span class="time-value">
                  <span>{time.hours[0]}</span>
                  <span>{time.hours[1]}</span>
                </span>
              </span>
              <span class="time-separator" role="presentation">
                :
              </span>
            </Fragment>
          )}
          <span class="time-wrapper" role="presentation">
            <span class="time-placeholder" aria-hidden="true">
              44
            </span>
            <span class="time-value">
              <span>{time.minutes[0]}</span>
              <span>{time.minutes[1]}</span>
            </span>
          </span>
          <span class="time-separator" role="presentation">
            :
          </span>
          <span class="time-wrapper" role="presentation">
            <span class="time-placeholder" aria-hidden="true">
              44
            </span>
            <span class="time-value">
              <span>{time.seconds[0]}</span>
              <span>{time.seconds[1]}</span>
            </span>
          </span>
        </span>
      </wpp-typography>
    </Fragment>
  )
}
