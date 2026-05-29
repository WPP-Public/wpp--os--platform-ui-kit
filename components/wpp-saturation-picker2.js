import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const wppSaturationPickerCss = ":host{position:relative;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .picker-container{position:relative;width:100%;height:208px}:host canvas{width:100%;height:100%;border-radius:var(--wpp-border-radius-s)}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none}";

const SaturationPicker = /*@__PURE__*/ proxyCustomElement(class SaturationPicker extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.saturationChanged = createEvent(this, "saturationChanged", 1);
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
  static get registryIs() { return "wpp-saturation-picker-v4-1-0"; }
  get host() { return this; }
  static get watchers() { return {
    "hue": ["onPropertyChange"],
    "saturation": ["onPropertyChange"],
    "value": ["onPropertyChange"]
  }; }
  static get style() { return wppSaturationPickerCss; }
}, [1, "wpp-saturation-picker", "wpp-saturation-picker-v4-1-0", {
    "saturation": [1026],
    "value": [1026],
    "hue": [2],
    "markerX": [32],
    "markerY": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-saturation-picker-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-saturation-picker-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SaturationPicker);
      }
      break;
  } });
}

export { SaturationPicker as S, defineCustomElement as d };
