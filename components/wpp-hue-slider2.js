import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';

const wppHueSliderCss = ":host{position:relative;display:block;height:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .slider-container{position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host canvas{width:100%;height:100%;border-radius:32px;display:block}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none;top:50%;left:calc(var(--marker-position) - 8px);z-index:2}";

const HueSlider = /*@__PURE__*/ proxyCustomElement(class HueSlider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hueChanged = createEvent(this, "hueChanged", 1);
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
      this.markerPosition = lodash.clamp(position, 8, rect.width - 8);
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
      const xClamped = lodash.clamp(xRaw, 0, rect.width);
      const hueValue = Math.round((xClamped / rect.width) * 360);
      this.hueChanged.emit(hueValue);
      this.markerPosition = lodash.clamp(xClamped, 8, rect.width - 8);
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
  static get registryIs() { return "wpp-hue-slider-v3-4-0"; }
  get host() { return this; }
  static get watchers() { return {
    "hue": ["updateHue"]
  }; }
  static get style() { return wppHueSliderCss; }
}, [1, "wpp-hue-slider", "wpp-hue-slider-v3-4-0", {
    "hue": [2],
    "markerPosition": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-hue-slider-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-hue-slider-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, HueSlider);
      }
      break;
  } });
}

export { HueSlider as H, defineCustomElement as d };
