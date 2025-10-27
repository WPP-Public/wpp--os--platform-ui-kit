import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconIdea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-idea", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.75 5.5C10.75 5.08579 10.4142 4.75 10 4.75C9.58579 4.75 9.25 5.08579 9.25 5.5V7C9.25 7.41421 9.58579 7.75 10 7.75C10.4142 7.75 10.75 7.41421 10.75 7V5.5Z", fill: "currentColor" }), h("path", { d: "M13.712 7.34835C14.0049 7.05546 14.0049 6.58058 13.712 6.28769C13.4191 5.9948 12.9442 5.9948 12.6513 6.28769L11.5907 7.34835C11.2978 7.64124 11.2978 8.11612 11.5907 8.40901C11.8835 8.7019 12.3584 8.7019 12.6513 8.40901L13.712 7.34835Z", fill: "currentColor" }), h("path", { d: "M6.28814 6.28769C6.58104 5.9948 7.05591 5.9948 7.3488 6.28769L8.40946 7.34835C8.70236 7.64124 8.70236 8.11612 8.40946 8.40901C8.11657 8.7019 7.6417 8.7019 7.3488 8.40901L6.28814 7.34835C5.99525 7.05546 5.99525 6.58058 6.28814 6.28769Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 1.5C6.54822 1.5 3.75 4.29822 3.75 7.75C3.75 9.77196 4.71097 11.5698 6.19802 12.7109C6.29232 12.7833 6.33348 12.8619 6.34465 12.9193L7.02769 16.4297C7.23338 17.4869 8.15932 18.25 9.23627 18.25H10.7637C11.8407 18.25 12.7666 17.4869 12.9723 16.4297L13.6554 12.9193C13.6665 12.8619 13.7077 12.7833 13.802 12.7109C15.289 11.5698 16.25 9.77196 16.25 7.75C16.25 4.29822 13.4518 1.5 10 1.5ZM5.25 7.75C5.25 5.12665 7.37665 3 10 3C12.6234 3 14.75 5.12665 14.75 7.75C14.75 9.28592 14.0218 10.6515 12.8888 11.521C12.5538 11.778 12.2751 12.159 12.183 12.6328L11.9169 14H10.75V9.25C10.75 8.83579 10.4142 8.5 10 8.5C9.58579 8.5 9.25 8.83579 9.25 9.25V14H8.08306L7.81704 12.6328C7.72485 12.159 7.44622 11.778 7.11122 11.521C5.97817 10.6515 5.25 9.28592 5.25 7.75ZM8.37492 15.5L8.50008 16.1432C8.56864 16.4956 8.87729 16.75 9.23627 16.75H10.7637C11.1227 16.75 11.4314 16.4956 11.4999 16.1432L11.6251 15.5H8.37492Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-idea-v3-3-0"; }
};
WppIconIdea.style = wppIconCss;

export { WppIconIdea as wpp_icon_idea };
