import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBuilding$1 = /*@__PURE__*/ proxyCustomElement(class WppIconBuilding extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-building", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.46191 8.33658C9.78287 8.4035 10.8333 9.49574 10.8333 10.8333V15.8333C10.8333 17.1709 9.78287 18.2631 8.46191 18.3301L8.33333 18.3333H5C3.61929 18.3333 2.5 17.214 2.5 15.8333V10.8333C2.5 9.45261 3.61929 8.33332 5 8.33332H8.33333L8.46191 8.33658ZM15.1286 1.66991C16.4495 1.73684 17.5 2.82907 17.5 4.16666V15C17.5 16.3376 16.4495 17.4298 15.1286 17.4967L15 17.5H12.9818C12.5485 17.4999 12.2763 16.9528 12.3991 16.5373C12.4721 16.2904 12.6844 16.0832 12.9419 16.0832H15C15.5983 16.0832 16.0832 15.5983 16.0832 15V4.16666C16.0832 3.56835 15.5983 3.08349 15 3.08349H8.33333C7.73502 3.08349 7.25016 3.56835 7.25016 4.16666V6.08316C7.25016 6.40542 6.98892 6.66666 6.66667 6.66666C6.25203 6.66666 5.83355 6.37648 5.83333 5.9619V4.16666C5.83333 2.78594 6.95262 1.66666 8.33333 1.66666H15L15.1286 1.66991ZM5 9.75015C4.40169 9.75015 3.91683 10.235 3.91683 10.8333V15.8333C3.91683 16.4316 4.40169 16.9165 5 16.9165H8.33333C8.93164 16.9165 9.4165 16.4316 9.4165 15.8333V10.8333C9.4165 10.235 8.93164 9.75015 8.33333 9.75015H5ZM6.66748 11.4998C7.21969 11.4999 7.66764 11.9478 7.66764 12.5C7.66764 13.0522 7.21969 13.5001 6.66748 13.5002C6.1152 13.5002 5.66732 13.0523 5.66732 12.5C5.66732 11.9477 6.1152 11.4998 6.66748 11.4998ZM13.3341 11.4998C13.8863 11.4999 14.3343 11.9478 14.3343 12.5C14.3343 13.0522 13.8864 13.5001 13.3341 13.5002C12.7819 13.5002 12.334 13.0523 12.334 12.5C12.334 11.9477 12.7819 11.4998 13.3341 11.4998ZM13.3341 8.16649C13.8863 8.16658 14.3343 8.61444 14.3343 9.16666C14.3343 9.71889 13.8864 10.1667 13.3341 10.1668C12.7819 10.1668 12.334 9.71894 12.334 9.16666C12.334 8.61439 12.7819 8.16649 13.3341 8.16649ZM10.0008 4.83316C10.553 4.83325 11.001 5.28111 11.001 5.83332C11.001 6.38555 10.553 6.8334 10.0008 6.83349C9.44853 6.83349 9.00065 6.38561 9.00065 5.83332C9.00067 5.28106 9.44854 4.83316 10.0008 4.83316ZM13.3341 4.83316C13.8863 4.83325 14.3343 5.28111 14.3343 5.83332C14.3343 6.38555 13.8864 6.8334 13.3341 6.83349C12.7819 6.83349 12.334 6.38561 12.334 5.83332C12.334 5.28106 12.7819 4.83316 13.3341 4.83316Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-building-v4-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-building", "wpp-icon-building-v4-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-building-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-building-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconBuilding$1);
      }
      break;
  } });
}

const WppIconBuilding = WppIconBuilding$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconBuilding, defineCustomElement };
