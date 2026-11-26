import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { b as hexToRgb, n as getSliderMarkerLeft, o as getSliderKeyValue } from './utils4.js';
import { d as defineCustomElement$1 } from './wpp-icon-transparent2.js';

const wppOpacitySliderCss = ":host{position:relative;display:block;height:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .slider-container{position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .checkerboard{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;border-radius:32px;overflow:hidden}:host canvas{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:32px;display:block;z-index:1}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1019607843), 0 0 1px 0 rgba(52, 58, 63, 0.1019607843);box-shadow:0 1px 5px 0 rgba(52, 58, 63, 0.1019607843), 0 0 1px 0 rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none;top:50%;left:calc(var(--marker-position) - 8px);z-index:2}:host .marker:focus{outline:none}:host .marker:focus-visible{border-radius:var(--wpp-border-radius-round);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}";

const OpacitySlider = /*@__PURE__*/ proxyCustomElement(class OpacitySlider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.opacityChanged = createEvent(this, "opacityChanged", 1);
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
      const xClamped = lodash.clamp(xRaw, 0, rect.width);
      const newOpacity = xClamped / rect.width;
      this.opacityChanged.emit(newOpacity);
    };
    this.handleKeyDown = (event) => {
      const percent = getSliderKeyValue(event.key, Math.round(this.opacity * 100), 0, 100);
      if (percent === undefined)
        return;
      event.preventDefault();
      this.opacityChanged.emit(percent / 100);
    };
    this.hexColor = undefined;
    this.opacity = 1;
    this.label = undefined;
  }
  onPropertyChange() {
    this.drawOpacitySlider();
  }
  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas');
    this.setupCanvas();
    this.drawOpacitySlider();
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  render() {
    return (h(Host, { class: "wpp-opacity-slider" }, h("div", { class: "slider-container" }, h("wpp-icon-transparent-v4-7-0", { class: "checkerboard" }), h("canvas", null), h("div", { class: "marker", role: "slider", tabIndex: 0, "aria-label": this.label, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(this.opacity * 100), "aria-valuetext": `${Math.round(this.opacity * 100)}%`, onKeyDown: this.handleKeyDown, style: {
        left: getSliderMarkerLeft(this.opacity),
      } }))));
  }
  static get registryIs() { return "wpp-opacity-slider-v4-7-0"; }
  get host() { return this; }
  static get watchers() { return {
    "hexColor": ["onPropertyChange"],
    "opacity": ["onPropertyChange"]
  }; }
  static get style() { return wppOpacitySliderCss; }
}, [1, "wpp-opacity-slider", "wpp-opacity-slider-v4-7-0", {
    "hexColor": [1, "hex-color"],
    "opacity": [2],
    "label": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-opacity-slider-v4-7-0", "wpp-icon-transparent-v4-7-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-opacity-slider-v4-7-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OpacitySlider);
      }
      break;
    case "wpp-icon-transparent-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { OpacitySlider as O, defineCustomElement as d };
