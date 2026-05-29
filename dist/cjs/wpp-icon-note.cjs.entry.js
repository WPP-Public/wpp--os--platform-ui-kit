'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconNote = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-note", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.875 4.375C3.875 4.0988 4.0988 3.875 4.375 3.875H15.625C15.9012 3.875 16.125 4.0988 16.125 4.375V11.5417H13.5417C12.437 11.5417 11.5417 12.437 11.5417 13.5417V16.125H4.375C4.0988 16.125 3.875 15.9012 3.875 15.625V4.375ZM4.375 2.375C3.27037 2.375 2.375 3.27037 2.375 4.375V15.625C2.375 16.7296 3.27037 17.625 4.375 17.625H12.2917C12.4988 17.625 12.6863 17.5411 12.822 17.4053L12.822 17.4053L17.4053 12.822L17.4053 12.822C17.5411 12.6863 17.625 12.4988 17.625 12.2917V4.375C17.625 3.27037 16.7296 2.375 15.625 2.375H4.375ZM15.0644 13.0417H13.5417C13.2655 13.0417 13.0417 13.2655 13.0417 13.5417V15.0644L15.0644 13.0417ZM5.70837 6.45789C5.70837 6.04367 6.04416 5.70789 6.45837 5.70789H13.5417C13.9559 5.70789 14.2917 6.04367 14.2917 6.45789C14.2917 6.8721 13.9559 7.20789 13.5417 7.20789H6.45837C6.04416 7.20789 5.70837 6.8721 5.70837 6.45789ZM6.45837 8.62463C6.04416 8.62463 5.70837 8.96042 5.70837 9.37463C5.70837 9.78885 6.04416 10.1246 6.45837 10.1246H11.875C12.2893 10.1246 12.625 9.78885 12.625 9.37463C12.625 8.96042 12.2893 8.62463 11.875 8.62463H6.45837Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-note-v4-1-0"; }
};
WppIconNote.style = wppIconCss;

exports.wpp_icon_note = WppIconNote;
