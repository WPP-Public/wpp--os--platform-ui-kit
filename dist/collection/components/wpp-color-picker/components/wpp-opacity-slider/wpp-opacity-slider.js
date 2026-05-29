import { h, Host } from '@stencil/core';
import { clamp } from 'lodash';
import { hexToRgb } from '../../utils';
/**
 * @internal
 */
export class OpacitySlider {
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
    this.drawOpacitySlider = () => {
      const ctx = this.canvas.getContext('2d');
      if (!ctx)
        return;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const rgb = hexToRgb(this.hexColor);
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0);
      gradient.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`);
      gradient.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    };
    this.updateMarkerPosition = () => {
      const rect = this.canvas.getBoundingClientRect();
      const position = this.opacity * rect.width;
      this.markerPosition = clamp(position, 8, rect.width - 8);
    };
    this.handleMouseDown = (event) => {
      this.isDragging = true;
      event.preventDefault();
      this.updateOpacity(event);
    };
    this.handleMouseUp = () => {
      this.isDragging = false;
    };
    this.handleMouseMove = (event) => {
      if (this.isDragging) {
        event.preventDefault();
        window.requestAnimationFrame(() => this.updateOpacity(event));
      }
    };
    this.updateOpacity = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const xRaw = event.clientX - rect.left;
      const xClamped = clamp(xRaw, 0, rect.width);
      const newOpacity = xClamped / rect.width;
      this.opacityChanged.emit(newOpacity);
      this.markerPosition = clamp(xClamped, 8, rect.width - 8);
    };
    this.hexColor = undefined;
    this.opacity = 1;
    this.markerPosition = 8;
  }
  onPropertyChange() {
    this.updateMarkerPosition();
    this.drawOpacitySlider();
  }
  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas');
    this.setupCanvas();
    this.drawOpacitySlider();
    this.updateMarkerPosition();
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  render() {
    return (h(Host, { class: "wpp-opacity-slider" }, h("div", { class: "slider-container" }, h("wpp-icon-transparent-v4-1-0", { class: "checkerboard" }), h("canvas", null), h("div", { class: "marker", style: {
        left: `${this.markerPosition}px`,
      } }))));
  }
  static get is() { return "wpp-opacity-slider"; }
  static get registryIs() { return "wpp-opacity-slider-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-opacity-slider.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-opacity-slider.css"]
    };
  }
  static get properties() {
    return {
      "hexColor": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Hex color of the slider."
        },
        "attribute": "hex-color",
        "reflect": false
      },
      "opacity": {
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
          "text": "Opacity value of the slider. Values between: [0, 1]"
        },
        "attribute": "opacity",
        "reflect": false,
        "defaultValue": "1"
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
        "method": "opacityChanged",
        "name": "opacityChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Event emitted when the opacity value changes"
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
        "propName": "hexColor",
        "methodName": "onPropertyChange"
      }, {
        "propName": "opacity",
        "methodName": "onPropertyChange"
      }];
  }
}
