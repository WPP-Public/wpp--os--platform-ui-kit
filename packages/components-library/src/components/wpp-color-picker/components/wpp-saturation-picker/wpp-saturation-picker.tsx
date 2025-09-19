import { Component, h, Element, Prop, Event, EventEmitter, Watch, Host, State } from '@stencil/core'
import { SaturationChangeDetail } from '../../types'

/**
 * @internal
 */
@Component({
  tag: 'wpp-saturation-picker',
  styleUrl: 'wpp-saturation-picker.scss',
  shadow: true,
})
export class SaturationPicker {
  private canvas: HTMLCanvasElement
  private isDragging: boolean = false
  private devicePixelRatio = window.devicePixelRatio || 1

  @Element() host: HTMLWppSaturationPickerElement

  /**
   * Saturation value.
   */
  @Prop({ mutable: true }) saturation: number

  /**
   * Corresponds to brightness in HSV
   */
  @Prop({ mutable: true }) value: number

  /**
   * Hue value to get the color.
   */
  @Prop() readonly hue: number = 0

  /**
   * Event emitted when the saturation changes, containing the saturation and the brightness
   */
  @Event({ bubbles: false, composed: false }) saturationChanged: EventEmitter<SaturationChangeDetail>

  @State() markerX: number = 0
  @State() markerY: number = 0

  @Watch('hue')
  @Watch('saturation')
  @Watch('value')
  onPropertyChange() {
    this.drawSaturationValuePicker()
    this.updateMarkerPosition()
  }

  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas') as HTMLCanvasElement
    this.setupCanvas()
    this.drawSaturationValuePicker()
    this.updateMarkerPosition()

    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  private setupCanvas = () => {
    const canvasWidth = 346
    const canvasHeight = 208

    this.canvas.width = canvasWidth * this.devicePixelRatio
    this.canvas.height = canvasHeight * this.devicePixelRatio
    this.canvas.style.width = `${canvasWidth}px`
    this.canvas.style.height = `${canvasHeight}px`

    const ctx = this.canvas.getContext('2d')

    if (ctx) ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
  }

  private drawSaturationValuePicker = () => {
    const ctx = this.canvas.getContext('2d')

    if (!ctx) return

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const saturationGradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0)

    saturationGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    saturationGradient.addColorStop(1, `hsl(${this.hue}, 100%, 50%)`)
    ctx.fillStyle = saturationGradient
    ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio)

    const valueGradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height / this.devicePixelRatio)

    valueGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    valueGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
    ctx.fillStyle = valueGradient
    ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio)
  }

  private updateMarkerPosition = () => {
    const rect = this.canvas.getBoundingClientRect()

    this.markerX = (this.saturation / 100) * rect.width
    this.markerY = (1 - this.value / 100) * rect.height
  }

  private handleMouseDown = (event: MouseEvent) => {
    this.isDragging = true
    this.updateSaturationValue(event)
  }

  private handleMouseUp = () => {
    this.isDragging = false
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (this.isDragging) {
      this.updateSaturationValue(event)
    }
  }

  private updateSaturationValue = (event: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    const x = Math.min(Math.max(0, event.clientX - rect.left), rect.width)
    const y = Math.min(Math.max(0, event.clientY - rect.top), rect.height)

    this.saturation = Math.round((x / rect.width) * 100)
    this.value = Math.round(100 - (y / rect.height) * 100)

    this.markerX = x
    this.markerY = y

    this.saturationChanged.emit({ saturation: this.saturation, saturationValue: this.value })
  }

  private handleMarkerMouseDown = (event: MouseEvent) => {
    event.stopPropagation()
    this.isDragging = true
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    return (
      <Host class="wpp-saturation-picker">
        <div class="picker-container">
          <canvas></canvas>
          <div
            class="marker"
            onMouseDown={this.handleMarkerMouseDown}
            style={{
              left: `${this.markerX}px`,
              top: `${this.markerY}px`,
            }}
          ></div>
        </div>
      </Host>
    )
  }
}
