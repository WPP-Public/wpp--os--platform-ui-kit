import { Component, h, Element, Prop, Event, EventEmitter, Watch, State, Host } from '@stencil/core'
import { clamp } from 'lodash'
import { hexToRgb } from '../../utils'

/**
 * @internal
 */
@Component({
  tag: 'wpp-opacity-slider',
  styleUrl: 'wpp-opacity-slider.scss',
  shadow: true,
})
export class OpacitySlider {
  private canvas: HTMLCanvasElement
  private isDragging: boolean = false
  private devicePixelRatio = window.devicePixelRatio || 1

  @Element() host: HTMLWppOpacitySliderElement

  /**
   * Hex color of the slider.
   */
  @Prop() readonly hexColor: string

  /**
   * Opacity value of the slider. Values between: [0, 1]
   */
  @Prop() readonly opacity: number = 1

  /**
   * Event emitted when the opacity value changes
   */
  @Event({ bubbles: false, composed: false }) opacityChanged: EventEmitter<number>

  @State() markerPosition: number = 8

  @Watch('hexColor')
  @Watch('opacity')
  onPropertyChange() {
    this.updateMarkerPosition()
    this.drawOpacitySlider()
  }

  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas') as HTMLCanvasElement
    this.setupCanvas()
    this.drawOpacitySlider()
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

  private drawOpacitySlider = () => {
    const ctx = this.canvas.getContext('2d')

    if (!ctx) return

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const rgb = hexToRgb(this.hexColor)
    const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0)

    gradient.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`)
    gradient.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio)
  }

  private updateMarkerPosition = () => {
    const rect = this.canvas.getBoundingClientRect()
    const position = this.opacity * rect.width

    this.markerPosition = clamp(position, 8, rect.width - 8)
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true
    event.preventDefault()
    this.updateOpacity(event)
  }

  private handleMouseUp = () => {
    this.isDragging = false
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isDragging) {
      event.preventDefault()
      window.requestAnimationFrame(() => this.updateOpacity(event))
    }
  }

  private updateOpacity = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const xRaw = event.clientX - rect.left
    const xClamped = clamp(xRaw, 0, rect.width)

    const newOpacity = xClamped / rect.width

    this.opacityChanged.emit(newOpacity)
    this.markerPosition = clamp(xClamped, 8, rect.width - 8)
  }

  render() {
    return (
      <Host class="wpp-opacity-slider">
        <div class="slider-container">
          <wpp-icon-transparent class="checkerboard"></wpp-icon-transparent>
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
