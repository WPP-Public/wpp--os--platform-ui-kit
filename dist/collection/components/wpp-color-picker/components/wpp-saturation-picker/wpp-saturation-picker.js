import { h, Host } from '@stencil/core';
/**
 * @internal
 */
export class SaturationPicker {
  constructor() {
    this.isDragging = false;
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.setupCanvas = () => {
      const canvasWidth = 346;
      const canvasHeight = 208;
      this.canvas.width = canvasWidth * this.devicePixelRatio;
      this.canvas.height = canvasHeight * this.devicePixelRatio;
      this.canvas.style.width = `${canvasWidth}px`;
      this.canvas.style.height = `${canvasHeight}px`;
      const ctx = this.canvas.getContext('2d');
      if (ctx)
        ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    };
    this.drawSaturationValuePicker = () => {
      const ctx = this.canvas.getContext('2d');
      if (!ctx)
        return;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const saturationGradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0);
      saturationGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      saturationGradient.addColorStop(1, `hsl(${this.hue}, 100%, 50%)`);
      ctx.fillStyle = saturationGradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
      const valueGradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height / this.devicePixelRatio);
      valueGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      valueGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      ctx.fillStyle = valueGradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    };
    this.updateMarkerPosition = () => {
      const rect = this.canvas.getBoundingClientRect();
      this.markerX = (this.saturation / 100) * rect.width;
      this.markerY = (1 - this.value / 100) * rect.height;
    };
    this.handleMouseDown = (event) => {
      this.isDragging = true;
      this.updateSaturationValue(event);
    };
    this.handleMouseUp = () => {
      this.isDragging = false;
    };
    this.handleMouseMove = (event) => {
      if (this.isDragging) {
        this.updateSaturationValue(event);
      }
    };
    this.updateSaturationValue = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
      const y = Math.min(Math.max(0, event.clientY - rect.top), rect.height);
      this.saturation = Math.round((x / rect.width) * 100);
      this.value = Math.round(100 - (y / rect.height) * 100);
      this.markerX = x;
      this.markerY = y;
      this.saturationChanged.emit({ saturation: this.saturation, saturationValue: this.value });
    };
    this.handleMarkerMouseDown = (event) => {
      event.stopPropagation();
      this.isDragging = true;
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    };
    this.saturation = undefined;
    this.value = undefined;
    this.hue = 0;
    this.markerX = 0;
    this.markerY = 0;
  }
  onPropertyChange() {
    this.drawSaturationValuePicker();
    this.updateMarkerPosition();
  }
  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas');
    this.setupCanvas();
    this.drawSaturationValuePicker();
    this.updateMarkerPosition();
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  render() {
    return (h(Host, { class: "wpp-saturation-picker" }, h("div", { class: "picker-container" }, h("canvas", null), h("div", { class: "marker", onMouseDown: this.handleMarkerMouseDown, style: {
        left: `${this.markerX}px`,
        top: `${this.markerY}px`,
      } }))));
  }
  static get is() { return "wpp-saturation-picker"; }
  static get registryIs() { return "wpp-saturation-picker-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-saturation-picker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-saturation-picker.css"]
    };
  }
  static get properties() {
    return {
      "saturation": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Saturation value."
        },
        "attribute": "saturation",
        "reflect": false
      },
      "value": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Corresponds to brightness in HSV"
        },
        "attribute": "value",
        "reflect": false
      },
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
          "text": "Hue value to get the color."
        },
        "attribute": "hue",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "markerX": {},
      "markerY": {}
    };
  }
  static get events() {
    return [{
        "method": "saturationChanged",
        "name": "saturationChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Event emitted when the saturation changes, containing the saturation and the brightness"
        },
        "complexType": {
          "original": "SaturationChangeDetail",
          "resolved": "SaturationChangeDetail",
          "references": {
            "SaturationChangeDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-color-picker/types.ts::SaturationChangeDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "hue",
        "methodName": "onPropertyChange"
      }, {
        "propName": "saturation",
        "methodName": "onPropertyChange"
      }, {
        "propName": "value",
        "methodName": "onPropertyChange"
      }];
  }
}
