import { Component, h, Element, Event, EventEmitter, Host, Prop, Watch, State } from '@stencil/core'
import { clamp } from 'lodash'

/**
 * @internal
 */
@Component({
  tag: 'wpp-hue-slider',
  styleUrl: 'wpp-hue-slider.scss',
  shadow: true,
})
export class HueSlider {
  private canvas: HTMLCanvasElement
  private isDragging: boolean = false
  private devicePixelRatio = window.devicePixelRatio || 1

  @Element() host: HTMLWppHueSliderElement

  /**
   * Hue value of the slider. Can contain values between: [0, 360].
   */
  @Prop() readonly hue: number = 0

  /**
   * Event emitted when the hue of the slider changes.
   */
  @Event({ bubbles: false, composed: false }) hueChanged: EventEmitter<number>

  @State() markerPosition: number = 8

  @Watch('hue')
  updateHue() {
    this.updateMarkerPosition()
  }

  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas') as HTMLCanvasElement
    this.setupCanvas()
    this.drawHueSlider()
    this.updateMarkerPosition()

    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  private setupCanvas = () => {
    const canvasWidth = 290
    const canvasHeight = 16

    this.canvas.width = canvasWidth * this.devicePixelRatio
    this.canvas.height = canvasHeight * this.devicePixelRatio
    this.canvas.style.width = `${canvasWidth}px`
    this.canvas.style.height = `${canvasHeight}px`

    const ctx = this.canvas.getContext('2d')

    if (ctx) ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
  }

  private drawHueSlider = () => {
    const ctx = this.canvas.getContext('2d')

    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0)

    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.16, 'yellow')
    gradient.addColorStop(0.33, 'lime')
    gradient.addColorStop(0.5, 'cyan')
    gradient.addColorStop(0.66, 'blue')
    gradient.addColorStop(0.83, 'magenta')
    gradient.addColorStop(1, 'red')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio)
  }

  private updateMarkerPosition = () => {
    const rect = this.canvas.getBoundingClientRect()
    const position = (this.hue / 360) * rect.width

    this.markerPosition = clamp(position, 8, rect.width - 8)
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true
    event.preventDefault()
    this.updateHueFromMouse(event)
  }

  private handleMouseUp = () => {
    this.isDragging = false
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isDragging) {
      event.preventDefault()
      window.requestAnimationFrame(() => this.updateHueFromMouse(event))
    }
  }

  private updateHueFromMouse = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const xRaw = event.clientX - rect.left
    const xClamped = clamp(xRaw, 0, rect.width)
    const hueValue = Math.round((xClamped / rect.width) * 360)

    this.hueChanged.emit(hueValue)
    this.markerPosition = clamp(xClamped, 8, rect.width - 8)
  }

  render() {
    return (
      <Host class="wpp-hue-slider">
        <div class="slider-container">
          <canvas></canvas>
          <div
            class="marker"
            style={{
              left: `${this.markerPosition}px`,
            }}
          ></div>
        </div>
      </Host>
    )
  }
}
