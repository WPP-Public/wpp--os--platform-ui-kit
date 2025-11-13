import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPitch = /*@__PURE__*/ proxyCustomElement(class WppIconPitch extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pitch", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.864 7.28033C14.1569 6.98744 14.1569 6.51256 13.864 6.21967C13.5711 5.92678 13.0962 5.92678 12.8033 6.21967L10.8337 8.18934L9.69732 7.053C9.40443 6.76011 8.92955 6.76011 8.63666 7.053L6.13666 9.553C5.84377 9.8459 5.84377 10.3208 6.13666 10.6137C6.42956 10.9066 6.90443 10.9066 7.19732 10.6137L9.16699 8.64399L10.3033 9.78033C10.5962 10.0732 11.0711 10.0732 11.364 9.78033L13.864 7.28033Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.75 3C0.75 2.58579 1.08579 2.25 1.5 2.25H18.5C18.9142 2.25 19.25 2.58579 19.25 3C19.25 3.41421 18.9142 3.75 18.5 3.75H18.25V12.1667C18.25 12.8573 17.9692 13.5162 17.4752 13.9993C16.9817 14.4818 16.3158 14.75 15.625 14.75H10.75V16.75H12.5C12.9142 16.75 13.25 17.0858 13.25 17.5C13.25 17.9142 12.9142 18.25 12.5 18.25H7.5C7.08579 18.25 6.75 17.9142 6.75 17.5C6.75 17.0858 7.08579 16.75 7.5 16.75H9.25V14.75H4.375C3.68418 14.75 3.01835 14.4818 2.52484 13.9993C2.03075 13.5162 1.75 12.8573 1.75 12.1667V3.75H1.5C1.08579 3.75 0.75 3.41421 0.75 3ZM3.25 12.1667V3.75H16.75V12.1667C16.75 12.4485 16.6357 12.7222 16.4265 12.9268C16.2167 13.1319 15.9287 13.25 15.625 13.25H4.375C4.07126 13.25 3.78326 13.1319 3.57351 12.9268C3.36434 12.7222 3.25 12.4485 3.25 12.1667Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pitch-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-pitch", "wpp-icon-pitch-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-pitch-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-pitch-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPitch);
      }
      break;
  } });
}

export { WppIconPitch as W, defineCustomElement as d };
