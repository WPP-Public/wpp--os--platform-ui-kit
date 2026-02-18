'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const lodash = require('./lodash-04cddce7.js');
const utils = require('./utils-f99954d3.js');
const utils$1 = require('./utils-27884b05.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./consts-dba6e6dd.js');

const wppHueSliderCss = ":host{position:relative;display:block;height:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .slider-container{position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host canvas{width:100%;height:100%;border-radius:32px;display:block}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none;top:50%;left:calc(var(--marker-position) - 8px);z-index:2}";

const HueSlider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hueChanged = index.createEvent(this, "hueChanged", 1);
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
      this.markerPosition = lodash.lodash.clamp(position, 8, rect.width - 8);
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
      const xClamped = lodash.lodash.clamp(xRaw, 0, rect.width);
      const hueValue = Math.round((xClamped / rect.width) * 360);
      this.hueChanged.emit(hueValue);
      this.markerPosition = lodash.lodash.clamp(xClamped, 8, rect.width - 8);
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
    return (index.h(index.Host, { class: "wpp-hue-slider" }, index.h("div", { class: "slider-container" }, index.h("canvas", null), index.h("div", { class: "marker", style: {
        left: `${this.markerPosition}px`,
      } }))));
  }
  static get registryIs() { return "wpp-hue-slider-v3-5-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "hue": ["updateHue"]
  }; }
};
HueSlider.style = wppHueSliderCss;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSwatch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
  }
  render() {
    return (index.h(index.Fragment, null, this.size === 's' ? (index.h("svg", { width: "26", height: "26", viewBox: "0 0 26 26", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "3.71484", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "7.42969", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.1445", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "14.8555", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "18.5703", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "22.2852", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { y: "3.71436", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "3.71484", y: "3.71436", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "7.42969", y: "3.71436", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "11.1445", y: "3.71436", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "14.8555", y: "3.71436", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "18.5703", y: "3.71436", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.2852", y: "3.71436", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { y: "7.42847", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "3.71484", y: "7.42847", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "7.42969", y: "7.42847", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.1445", y: "7.42847", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "14.8555", y: "7.42847", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "18.5703", y: "7.42847", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "22.2852", y: "7.42847", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { y: "11.1428", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "3.71484", y: "11.1428", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "7.42969", y: "11.1428", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "11.1445", y: "11.1428", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "14.8555", y: "11.1428", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "18.5703", y: "11.1428", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.2852", y: "11.1428", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { y: "14.8572", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "3.71484", y: "14.8572", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "7.42969", y: "14.8572", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.1445", y: "14.8572", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "14.8555", y: "14.8572", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "18.5703", y: "14.8572", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "22.2852", y: "14.8572", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { y: "18.5715", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "3.71484", y: "18.5715", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "7.42969", y: "18.5715", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "11.1445", y: "18.5715", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "14.8555", y: "18.5715", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "18.5703", y: "18.5715", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.2852", y: "18.5715", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { y: "22.2856", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "3.71484", y: "22.2856", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "7.42969", y: "22.2856", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.1445", y: "22.2856", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "14.8555", y: "22.2856", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }), index.h("rect", { x: "18.5703", y: "22.2856", width: "3.71429", height: "3.71429", fill: "white" }), index.h("rect", { x: "22.2852", y: "22.2856", width: "3.71429", height: "3.71429", fill: "#E7EAEE" }))) : (index.h("svg", { width: "40", height: "40", viewBox: "0 0 40 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "5.71429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "11.4286", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "17.1429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "22.8571", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "28.5714", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "34.2857", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { y: "5.71429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "5.71429", y: "5.71429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.4286", y: "5.71429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "17.1429", y: "5.71429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.8571", y: "5.71429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "28.5714", y: "5.71429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "34.2857", y: "5.71429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { y: "11.4286", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "5.71429", y: "11.4286", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "11.4286", y: "11.4286", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "17.1429", y: "11.4286", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "22.8571", y: "11.4286", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "28.5714", y: "11.4286", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "34.2857", y: "11.4286", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { y: "17.1429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "5.71429", y: "17.1429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.4286", y: "17.1429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "17.1429", y: "17.1429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.8571", y: "17.1429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "28.5714", y: "17.1429", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "34.2857", y: "17.1429", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { y: "22.8571", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "5.71429", y: "22.8571", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "11.4286", y: "22.8571", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "17.1429", y: "22.8571", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "22.8571", y: "22.8571", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "28.5714", y: "22.8571", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "34.2857", y: "22.8571", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { y: "28.5714", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "5.71429", y: "28.5714", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "11.4286", y: "28.5714", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "17.1429", y: "28.5714", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "22.8571", y: "28.5714", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "28.5714", y: "28.5714", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "34.2857", y: "28.5714", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { y: "34.2857", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "5.71429", y: "34.2857", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "11.4286", y: "34.2857", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "17.1429", y: "34.2857", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "22.8571", y: "34.2857", width: "5.71429", height: "5.71429", fill: "#E7EAEE" }), index.h("rect", { x: "28.5714", y: "34.2857", width: "5.71429", height: "5.71429", fill: "white" }), index.h("rect", { x: "34.2857", y: "34.2857", width: "5.71429", height: "5.71429", fill: "#E7EAEE" })))));
  }
  static get registryIs() { return "wpp-icon-swatch-v3-5-0"; }
};
WppIconSwatch.style = wppIconCss;

const wppOpacitySliderCss = ":host{position:relative;display:block;height:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .slider-container{position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .checkerboard{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;border-radius:32px;overflow:hidden}:host canvas{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:32px;display:block;z-index:1}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none;top:50%;left:calc(var(--marker-position) - 8px);z-index:2}";

const OpacitySlider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.opacityChanged = index.createEvent(this, "opacityChanged", 1);
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
      const rgb = utils.hexToRgb(this.hexColor);
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0);
      gradient.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`);
      gradient.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    };
    this.updateMarkerPosition = () => {
      const rect = this.canvas.getBoundingClientRect();
      const position = this.opacity * rect.width;
      this.markerPosition = lodash.lodash.clamp(position, 8, rect.width - 8);
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
      const xClamped = lodash.lodash.clamp(xRaw, 0, rect.width);
      const newOpacity = xClamped / rect.width;
      this.opacityChanged.emit(newOpacity);
      this.markerPosition = lodash.lodash.clamp(xClamped, 8, rect.width - 8);
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
    return (index.h(index.Host, { class: "wpp-opacity-slider" }, index.h("div", { class: "slider-container" }, index.h("wpp-icon-transparent-v3-5-0", { class: "checkerboard" }), index.h("canvas", null), index.h("div", { class: "marker", style: {
        left: `${this.markerPosition}px`,
      } }))));
  }
  static get registryIs() { return "wpp-opacity-slider-v3-5-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "hexColor": ["onPropertyChange"],
    "opacity": ["onPropertyChange"]
  }; }
};
OpacitySlider.style = wppOpacitySliderCss;

const wppSaturationPickerCss = ":host{position:relative;display:block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .picker-container{position:relative;width:100%;height:208px}:host canvas{width:100%;height:100%;border-radius:var(--wpp-border-radius-s)}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none}";

const SaturationPicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.saturationChanged = index.createEvent(this, "saturationChanged", 1);
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
    return (index.h(index.Host, { class: "wpp-saturation-picker" }, index.h("div", { class: "picker-container" }, index.h("canvas", null), index.h("div", { class: "marker", onMouseDown: this.handleMarkerMouseDown, style: {
        left: `${this.markerX}px`,
        top: `${this.markerY}px`,
      } }))));
  }
  static get registryIs() { return "wpp-saturation-picker-v3-5-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "hue": ["onPropertyChange"],
    "saturation": ["onPropertyChange"],
    "value": ["onPropertyChange"]
  }; }
};
SaturationPicker.style = wppSaturationPickerCss;

const wppSegmentedControlCss = ":host{--sc-padding-s:var(--wpp-segmented-control-padding-s, 0);--sc-padding-m:var(--wpp-segmented-control-padding-m, 0);--sc-item-margin-s:var(--wpp-segmented-control-item-margin-s, 0);--sc-item-margin-m:var(--wpp-segmented-control-item-margin-m, 0);--sc-border-radius-s:var(--wpp-segmented-control-border-radius-s, var(--wpp-border-radius-s));--sc-border-radius-m:var(--wpp-segmented-control-border-radius-m, var(--wpp-border-radius-m));--sc-border-width:var(--wpp-segmented-control-border-width, 1px);--sc-border-style:var(--wpp-segmented-control-border-style, solid);--sc-border-color:var(--wpp-segmented-control-border-color, var(--wpp-grey-color-500));--sc-bg-color:var(--wpp-segmented-control-bg-color, transparent);--sc-label-margin:var(--wpp-segmented-control-label-margin, 0 0 8px 0);--wpp-bar-width:auto;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--sc-label-margin)}:host .wpp-bar-wrapper{display:-ms-inline-flexbox;display:inline-flex;padding:var(--sc-padding-m);background-color:var(--sc-bg-color)}:host .wpp-bar-wrapper.hug-content-off{width:var(--wpp-bar-width)}:host .wpp-bar-wrapper.size-s{padding:var(--sc-padding-s);border-radius:var(--sc-border-radius-s)}:host .wpp-bar-wrapper.size-s ::slotted(.wpp-segmented-control-item:not(:last-child)){margin-right:var(--sc-item-margin-s)}:host .wpp-bar-wrapper.size-m{padding:var(--sc-padding-m);border-radius:var(--sc-border-radius-m)}:host .wpp-bar-wrapper.size-m ::slotted(.wpp-segmented-control-item:not(:last-child)){margin-right:var(--sc-item-margin-m)}";

const WppSegmentedControl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChange = index.createEvent(this, "wppChange", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.setSegmentedControlItemsSize = (size) => {
      this.host
        .querySelectorAll(utils$1.transformToVersionedTag('wpp-segmented-control-item'))
        .forEach(item => {
        item.setAttribute('size', size);
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.cssClasses = () => ({
      'wpp-bar-wrapper': true,
      [`size-${this.size}`]: true,
      'hug-content-off': this.hugContentOff,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control': true,
    });
    this.previousActiveElement = undefined;
    this.size = 'm';
    this.hugContentOff = false;
    this.width = 'auto';
    this.variant = 'text';
    this.required = false;
    this.value = undefined;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  handleChangeSegmentedControlItemClick(event) {
    this.value = event.detail.value;
  }
  valueChanged(newValue) {
    this.previousActiveElement?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(utils$1.transformToVersionedTag('wpp-segmented-control-item'))).find(item => item.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.previousActiveElement = activeElement;
    this.wppChange.emit({ value: newValue, reason: 'valueChanged' });
  }
  widthChange(newValue) {
    this.host.style.setProperty('--wpp-bar-width', newValue);
  }
  onUpdateSize(newSize) {
    this.setSegmentedControlItemsSize(newSize);
  }
  componentWillLoad() {
    this.widthChange(this.width);
    this.setSegmentedControlItemsSize(this.size);
  }
  componentDidLoad() {
    this.host
      .querySelectorAll(utils$1.transformToVersionedTag('wpp-segmented-control-item'))
      .forEach(item => {
      if (item.value === this.value) {
        item.setAttribute('active', 'true');
        this.previousActiveElement = item;
      }
    });
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, label", onFocus: this.onFocus, onBlur: this.onBlur }, this.labelConfig?.text && (index.h("wpp-label-v3-5-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), index.h("div", { class: this.cssClasses(), role: "listbox", "aria-multiselectable": "false", "aria-required": this.required, part: "wrapper" }, index.h("slot", { part: "inner" }))));
  }
  static get registryIs() { return "wpp-segmented-control-v3-5-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"],
    "width": ["widthChange"],
    "size": ["onUpdateSize"]
  }; }
};
WppSegmentedControl.style = wppSegmentedControlCss;

const wppSegmentedControlItemCss = ":host{--sc-item-height-m:var(--wpp-segmented-control-item-height-m, 40px);--sc-item-height-s:var(--wpp-segmented-control-item-height-s, 32px);--sc-item-border-radius-m:var(--wpp-segmented-control-item-border-radius-m, var(--wpp-border-radius-m));--sc-item-border-radius-s:var(--wpp-segmented-control-item-border-radius-s, var(--wpp-border-radius-s));--sc-item-icon-padding-m:var(--wpp-segmented-control-item-icon-padding-m, 6px);--sc-item-icon-padding-s:var(--wpp-segmented-control-item-icon-padding-s, 4px);--sc-item-counter-font-weight:var(--wpp-segmented-control-item-counter-font-weight, 400);--sc-item-border-width:var(--wpp-segmented-control-item-border-width, 1px);--sc-item-border-style:var(--wpp-segmented-control-item-border-style, solid);--sc-item-border-color:var(--wpp-segmented-control-item-border-color, var(--wpp-grey-color-500));--sc-item-bg-color:var(--wpp-segmented-control-item-bg-color, transparent);--sc-item-text-padding-m:var(--wpp-segmented-control-item-text-padding-m, 9px 16px);--sc-item-text-padding-s:var(--wpp-segmented-control-item-text-padding-s, 5px 12px);--sc-item-text-border-color:var(--wpp-segmented-control-item-text-border-color, var(--wpp-grey-color-500));--sc-item-text-border-color-hover:var(\n    --wpp-segmented-control-item-text-border-color-hover,\n    var(--wpp-grey-color-500)\n  );--sc-item-text-border-color-active:var(\n    --wpp-segmented-control-item-text-border-color-active,\n    var(--wpp-grey-color-500)\n  );--sc-item-text-border-color-selected:var(\n    --wpp-segmented-control-item-text-border-color-selected,\n    var(--wpp-brand-color)\n  );--sc-item-text-border-color-disabled:var(\n    --wpp-segmented-control-item-text-border-color-disabled,\n    var(--wpp-grey-color-400)\n  );--sc-item-text-color:var(--wpp-segmented-control-item-text-color, var(--wpp-text-color-info));--sc-item-text-color-hover:var(--wpp-segmented-control-item-text-color-hover, var(--wpp-text-color));--sc-item-text-color-active:var(--wpp-segmented-control-item-text-color-active, var(--wpp-text-color));--sc-item-text-color-selected:var(--wpp-segmented-control-item-text-color-selected, var(--wpp-brand-color));--sc-item-text-color-disabled:var(--wpp-segmented-control-item-text-color-disabled, var(--wpp-text-color-disabled));--sc-item-text-bg-color-hover:var(--wpp-segmented-control-item-text-bg-color-hover, var(--wpp-grey-color-200));--sc-item-text-bg-color-active:var(--wpp-segmented-control-item-text-bg-color-active, var(--wpp-grey-color-300));--sc-item-text-bg-color-selected:var(\n    --wpp-segmented-control-item-text-bg-color-selected,\n    var(--wpp-primary-color-100)\n  );--sc-item-text-bg-color-disabled:var(--wpp-segmented-control-item-text-bg-color-disabled, transparent);--sc-item-icon-border-color:var(--wpp-segmented-control-item-icon-border-color, var(--wpp-grey-color-500));--sc-item-icon-border-color-hover:var(\n    --wpp-segmented-control-item-icon-border-color-hover,\n    var(--wpp-grey-color-500)\n  );--sc-item-icon-border-color-active:var(\n    --wpp-segmented-control-item-icon-border-color-active,\n    var(--wpp-grey-color-500)\n  );--sc-item-icon-border-color-selected:var(\n    --wpp-segmented-control-item-icon-border-color-selected,\n    var(--wpp-brand-color)\n  );--sc-item-icon-border-color-disabled:var(\n    --wpp-segmented-control-item-icon-border-color-disabled,\n    var(--wpp-grey-color-400)\n  );--sc-item-icon-color:var(--wpp-segmented-control-item-icon-color, var(--wpp-icon-color));--sc-item-icon-color-hover:var(--wpp-segmented-control-item-icon-color-hover, var(--wpp-icon-color-hover));--sc-item-icon-color-active:var(--wpp-segmented-control-item-icon-color-active, var(--wpp-icon-color-active));--sc-item-icon-color-selected:var(--wpp-segmented-control-item-icon-color-selected, var(--wpp-brand-color));--sc-item-icon-color-disabled:var(--wpp-segmented-control-item-icon-color-disabled, var(--wpp-grey-color-400));--sc-item-icon-bg-color-hover:var(--wpp-segmented-control-item-icon-bg-color-hover, var(--wpp-grey-color-200));--sc-item-icon-bg-color-active:var(--wpp-segmented-control-item-icon-bg-color-active, var(--wpp-grey-color-300));--sc-item-icon-bg-color-selected:var(\n    --wpp-segmented-control-item-icon-bg-color-selected,\n    var(--wpp-primary-color-100)\n  );--sc-item-icon-bg-color-disabled:var(--wpp-segmented-control-item-icon-bg-color-disabled, transparent);--sc-item-text-border-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-border-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-text-bg-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-bg-color-selected-disabled,\n    var(--wpp-primary-color-100)\n  );--sc-item-text-color-selected-disabled:var(\n    --wpp-segmented-control-item-text-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-icon-border-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-border-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );--sc-item-icon-bg-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-bg-color-selected-disabled,\n    var(--wpp-primary-color-100)\n  );--sc-item-icon-color-selected-disabled:var(\n    --wpp-segmented-control-item-icon-color-selected-disabled,\n    var(--wpp-primary-color-300)\n  );display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;outline:none;width:100%}:host([disabled]:not([disabled=false]):active){pointer-events:none}:host(:first-child) .segmented-control-item.size-m{border-top-left-radius:var(--sc-item-border-radius-m);border-bottom-left-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-right:none}:host(:first-child) .segmented-control-item.size-s{border-top-left-radius:var(--sc-item-border-radius-s);border-bottom-left-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-right:none}:host(:first-child) .segmented-control-item.disabled{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-disabled);border-right:none}:host(:last-child) .segmented-control-item.size-m{border-top-right-radius:var(--sc-item-border-radius-m);border-bottom-right-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-left:none}:host(:last-child) .segmented-control-item.size-s{border-top-right-radius:var(--sc-item-border-radius-s);border-bottom-right-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color);border-left:none}:host(:last-child) .segmented-control-item.disabled{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-disabled);border-left:none}:host(:first-child:last-child) .segmented-control-item.size-m{border-radius:var(--sc-item-border-radius-m);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}:host(:first-child:last-child) .segmented-control-item.size-s{border-radius:var(--sc-item-border-radius-s);border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}:host(:not(:first-child):not(:last-child)) .segmented-control-item{border-left:none;border-right:none}.content-wrapper{display:-ms-flexbox;display:flex}.segmented-control-item{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;width:100%;color:var(--sc-item-text-color);text-overflow:ellipsis;background-color:var(--sc-item-bg-color);outline:0;cursor:pointer;white-space:nowrap;border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-border-color)}.segmented-control-item.size-s{height:var(--sc-item-height-s)}.segmented-control-item.size-m{height:var(--sc-item-height-m)}.segmented-control-item .counter{padding-left:4px;font-weight:var(--sc-item-counter-font-weight)}.segmented-control-item.icon{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color)}.segmented-control-item.icon .counter{padding:0}.segmented-control-item.icon .content-wrapper{padding:var(--sc-item-icon-padding-m)}.segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color)}.segmented-control-item.icon.size-s .content-wrapper{padding:var(--sc-item-icon-padding-s)}.segmented-control-item.icon.size-s .content-wrapper ::slotted(*){color:var(--sc-item-icon-color)}.segmented-control-item.icon:hover{background-color:var(--sc-item-icon-bg-color-hover)}.segmented-control-item.icon:hover .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-hover)}.segmented-control-item.icon:active{background-color:var(--sc-item-icon-bg-color-active)}.segmented-control-item.icon:active .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-active)}.segmented-control-item.text{border:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color)}.segmented-control-item.text.size-m{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--sc-item-text-padding-m)}.segmented-control-item.text.size-s{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:var(--sc-item-text-padding-s)}.segmented-control-item.text:hover{color:var(--sc-item-text-color-hover);background-color:var(--sc-item-text-bg-color-hover);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-hover)}.segmented-control-item.text:active{color:var(--sc-item-text-color-active);background-color:var(--sc-item-text-bg-color-active);border-top:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active);border-bottom:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-active)}:host([active]:not([active=false])) .segmented-control-item.icon{outline-offset:calc(var(--sc-item-border-width) * -1);outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color-selected);background-color:var(--sc-item-icon-bg-color-selected);-webkit-transition:background-color 500ms ease, color 500ms ease;transition:background-color 500ms ease, color 500ms ease}:host([active]:not([active=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-selected)}:host([active]:not([active=false])) .segmented-control-item.text{outline-offset:calc(var(--sc-item-border-width) * -1);outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-selected);color:var(--sc-item-text-color-selected);background-color:var(--sc-item-text-bg-color-selected);-webkit-transition:background-color 500ms ease, color 500ms ease;transition:background-color 500ms ease, color 500ms ease}:host([disabled]:not([disabled=false])) .segmented-control-item.icon{background-color:var(--sc-item-icon-bg-color-disabled);cursor:not-allowed}:host([disabled]:not([disabled=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-disabled)}:host([disabled]:not([disabled=false])) .segmented-control-item.text{color:var(--sc-item-text-color-disabled);background-color:var(--sc-item-text-bg-color-disabled);cursor:not-allowed}:host(:focus-visible) .segmented-control-item:not(.active){outline:none;z-index:1;background-color:var(--sc-item-icon-bg-color-hover)}:host(:focus-visible) .segmented-control-item:not(.active).size-s{border-radius:var(--sc-item-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 0.5px var(--wpp-grey-color-300), 0 0 0 1.5px var(--wpp-brand-color);box-shadow:0 0 0 0.5px var(--wpp-grey-color-300), 0 0 0 1.5px var(--wpp-brand-color)}:host(:focus-visible) .segmented-control-item:not(.active).size-m{border-radius:var(--sc-item-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-300), 0 0 0 3px var(--wpp-brand-color)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item{cursor:not-allowed}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.icon{cursor:not-allowed;outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-text-border-color-selected-disabled);background-color:var(--sc-item-icon-bg-color-selected-disabled)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.icon .content-wrapper ::slotted(*){color:var(--sc-item-icon-color-selected-disabled)}:host([active]:not([active=false])[disabled]:not([disabled=false])) .segmented-control-item.text{cursor:not-allowed;outline:var(--sc-item-border-width) var(--sc-item-border-style) var(--sc-item-icon-border-color-selected-disabled);color:var(--sc-item-text-color-selected-disabled);background-color:var(--sc-item-text-bg-color-selected-disabled)}";

const WppSegmentedControlItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChangeSegmentedControlItem = index.createEvent(this, "wppChangeSegmentedControlItem", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.handleClickSegmentedControl = () => {
      if (this.disabled)
        return;
      this.wppChangeSegmentedControlItem.emit({ value: this.value });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.cssClasses = () => ({
      'segmented-control-item': true,
      [`size-${this.size}`]: true,
      [`${this.variant}`]: true,
      active: this.active,
      disabled: this.disabled,
    });
    this.hostCssClasses = () => ({
      'wpp-segmented-control-item': true,
    });
    this.size = 'm';
    this.active = false;
    this.disabled = false;
    this.value = undefined;
    this.counter = 0;
    this.variant = 'text';
    this.hugContentOff = false;
  }
  get tabIndex() {
    return this.disabled || this.active ? -1 : 0;
  }
  render() {
    return (index.h(index.Host, { tabIndex: this.tabIndex, onClick: this.handleClickSegmentedControl, onFocus: this.onFocus, onBlur: this.onBlur, class: this.hostCssClasses(), exportparts: "item" }, index.h("div", { class: this.cssClasses(), part: "item", id: String(this.value), role: "option", "aria-selected": this.active ? 'true' : 'false' }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: "content-wrapper" }), this.variant === 'text' && this.counter > 0 && index.h("div", { class: "counter" }, `(${this.counter})`))));
  }
  static get registryIs() { return "wpp-segmented-control-item-v3-5-0"; }
  get host() { return index.getElement(this); }
};
WppSegmentedControlItem.style = wppSegmentedControlItemCss;

exports.wpp_hue_slider = HueSlider;
exports.wpp_icon_swatch = WppIconSwatch;
exports.wpp_opacity_slider = OpacitySlider;
exports.wpp_saturation_picker = SaturationPicker;
exports.wpp_segmented_control = WppSegmentedControl;
exports.wpp_segmented_control_item = WppSegmentedControlItem;
