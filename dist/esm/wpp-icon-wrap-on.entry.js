import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconWrapOn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-wrap-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.75 3.5C15.5449 3.5 17 4.95507 17 6.75C17 8.54493 15.5449 10 13.75 10H6.25C5.2835 10 4.5 10.7835 4.5 11.75C4.5 12.7165 5.2835 13.5 6.25 13.5H15.4393L15.2197 13.2803C14.9268 12.9874 14.9268 12.5126 15.2197 12.2197C15.5126 11.9268 15.9874 11.9268 16.2803 12.2197L17.7803 13.7197C18.0732 14.0126 18.0732 14.4874 17.7803 14.7803L16.2803 16.2803C15.9874 16.5732 15.5126 16.5732 15.2197 16.2803C14.9268 15.9874 14.9268 15.5126 15.2197 15.2197L15.4393 15H6.25C4.45508 15 3 13.5449 3 11.75C3 9.95507 4.45507 8.5 6.25 8.5H13.75C14.7165 8.5 15.5 7.7165 15.5 6.75C15.5 5.7835 14.7165 5 13.75 5H3.75C3.33579 5 3 4.66421 3 4.25C3 3.83579 3.33579 3.5 3.75 3.5H13.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-wrap-on-v2-22-0"; }
};
WppIconWrapOn.style = wppIconCss;

export { WppIconWrapOn as wpp_icon_wrap_on };
