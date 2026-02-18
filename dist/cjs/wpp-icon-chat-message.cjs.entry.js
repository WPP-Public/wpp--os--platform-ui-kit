'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconChatMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-chat-message", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.66664 9.99959C1.66664 5.39733 5.39771 1.66626 9.99997 1.66626C14.6022 1.66626 18.3333 5.39733 18.3333 9.99959C18.3333 14.6019 14.6022 18.3329 9.99997 18.3329C8.62318 18.3329 7.32523 17.9956 6.18133 17.4041L2.98953 18.2948C2.20732 18.5136 1.48742 17.7929 1.70593 17.0115L1.70601 17.0112L1.70603 17.0111L2.597 13.8212C2.00438 12.6765 1.66664 11.3776 1.66664 9.99959ZM9.99997 2.91626C6.08806 2.91626 2.91664 6.08769 2.91664 9.99959C2.91664 11.25 3.2433 12.4223 3.81246 13.4426C3.89277 13.5866 3.91294 13.7565 3.8686 13.9152L3.00933 16.9916L6.08739 16.1326C6.24601 16.0883 6.41569 16.1085 6.55956 16.1886C7.57921 16.7566 8.75077 17.0829 9.99997 17.0829C13.9119 17.0829 17.0833 13.9115 17.0833 9.99959C17.0833 6.08769 13.9119 2.91626 9.99997 2.91626ZM5.83337 8.54126C5.83337 8.19608 6.1132 7.91626 6.45837 7.91626H13.5417C13.8869 7.91626 14.1667 8.19608 14.1667 8.54126C14.1667 8.88644 13.8869 9.16626 13.5417 9.16626H6.45837C6.1132 9.16626 5.83337 8.88644 5.83337 8.54126ZM6.45837 10.833C6.1132 10.833 5.83337 11.1128 5.83337 11.458C5.83337 11.8032 6.1132 12.083 6.45837 12.083H11.875C12.2202 12.083 12.5 11.8032 12.5 11.458C12.5 11.1128 12.2202 10.833 11.875 10.833H6.45837Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-chat-message-v3-5-0"; }
};
WppIconChatMessage.style = wppIconCss;

exports.wpp_icon_chat_message = WppIconChatMessage;
