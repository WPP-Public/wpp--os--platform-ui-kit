import { h, Host } from '@stencil/core';
import { clamp } from 'lodash';
/**
 * @internal
 */
export class HueSlider {
  constructor() {
    this.isDragging = false;
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.setupCanvas = () => {
      const canvasWidth = 290;
      const canvasHeight = 16;
      this.canvas.width = canvasWidth * this.devicePixelRatio;
      this.canvas.height = canvasHeight * this.devicePixelRatio;
      this.canvas.style.width = `${canvasWidth}px`;
      this.canvas.style.height = `${canvasHeight}px`;
      const ctx = this.canvas.getContext('2d');
      if (ctx)
        ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    };
    this.drawHueSlider = () => {
      const ctx = this.canvas.getContext('2d');
      if (!ctx)
        return;
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.16, 'yellow');
      gradient.addColorStop(0.33, 'lime');
      gradient.addColorStop(0.5, 'cyan');
      gradient.addColorStop(0.66, 'blue');
      gradient.addColorStop(0.83, 'magenta');
      gradient.addColorStop(1, 'red');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    };
    this.updateMarkerPosition = () => {
      const rect = this.canvas.getBoundingClientRect();
      const position = (this.hue / 360) * rect.width;
      this.markerPosition = clamp(position, 8, rect.width - 8);
    };
    this.handleMouseDown = (event) => {
      this.isDragging = true;
      event.preventDefault();
      this.updateHueFromMouse(event);
    };
    this.handleMouseUp = () => {
      this.isDragging = false;
    };
    this.handleMouseMove = (event) => {
      if (this.isDragging) {
        event.preventDefault();
        window.requestAnimationFrame(() => this.updateHueFromMouse(event));
      }
    };
    this.updateHueFromMouse = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const xRaw = event.clientX - rect.left;
      const xClamped = clamp(xRaw, 0, rect.width);
      const hueValue = Math.round((xClamped / rect.width) * 360);
      this.hueChanged.emit(hueValue);
      this.markerPosition = clamp(xClamped, 8, rect.width - 8);
    };
    this.hue = 0;
    this.markerPosition = 8;
  }
  updateHue() {
    this.updateMarkerPosition();
  }
  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas');
    this.setupCanvas();
    this.drawHueSlider();
    this.updateMarkerPosition();
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  render() {
    return (h(Host, { class: "wpp-hue-slider" }, h("div", { class: "slider-container" }, h("canvas", null), h("div", { class: "marker", style: {
        left: `${this.markerPosition}px`,
      } }))));
  }
  static get is() { return "wpp-hue-slider"; }
  static get registryIs() { return "wpp-hue-slider-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-hue-slider.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-hue-slider.css"]
    };
  }
  static get properties() {
    return {
      "hue": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hue value of the slider. Can contain values between: [0, 360]."
        },
        "attribute": "hue",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "markerPosition": {}
    };
  }
  static get events() {
    return [{
        "method": "hueChanged",
        "name": "hueChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Event emitted when the hue of the slider changes."
        },
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "hue",
        "methodName": "updateHue"
      }];
  }
}
