import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconChatMessageNew = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chat-message-new", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C10.9325 2.00005 11.8271 2.16138 12.6592 2.45508C12.4243 2.78075 12.245 3.14867 12.1328 3.54492C11.4618 3.32293 10.7454 3.20024 10 3.2002C6.245 3.2002 3.2003 6.24405 3.2002 9.99902C3.2002 11.1993 3.5142 12.3252 4.06055 13.3047C4.13737 13.4427 4.15673 13.6056 4.11426 13.7578L3.28906 16.7109L6.24414 15.8867C6.39636 15.8443 6.55922 15.8635 6.69727 15.9404C7.67597 16.4856 8.801 16.7988 10 16.7988C13.7549 16.7986 16.7988 13.7539 16.7988 9.99902C16.7988 9.25393 16.6761 8.53789 16.4541 7.86719C16.8499 7.75525 17.2166 7.57516 17.542 7.34082C17.8356 8.17282 17.999 9.06662 17.999 9.99902C17.999 14.4166 14.4176 17.9978 10 17.998C8.67841 17.998 7.43202 17.6742 6.33398 17.1064L3.27051 17.9619C2.51966 18.1719 1.82834 17.4796 2.03809 16.7295L2.89355 13.668C2.32469 12.5691 2 11.3218 2 9.99902C2.00011 5.58137 5.58233 2 10 2ZM11.7998 10.7998C12.1309 10.8 12.3994 11.0682 12.3994 11.3994C12.3994 11.7306 12.1309 11.9988 11.7998 11.999H6.59961C6.26839 11.9989 6.00001 11.7307 6 11.3994C6 11.0682 6.26839 10.7999 6.59961 10.7998H11.7998ZM13.3994 7.99902C13.7307 7.99914 13.999 8.26834 13.999 8.59961C13.9989 8.93076 13.7306 9.1991 13.3994 9.19922H6.59961C6.26847 9.19908 6.00014 8.93075 6 8.59961C6 8.26836 6.26839 7.99916 6.59961 7.99902H13.3994Z", fill: "currentColor" }), h("path", { d: "M18 4.5C18 5.88071 16.8807 7 15.5 7C14.1193 7 13 5.88071 13 4.5C13 3.11929 14.1193 2 15.5 2C16.8807 2 18 3.11929 18 4.5Z", fill: "var(--wpp-warning-color-400)" })));
  }
  static get registryIs() { return "wpp-icon-chat-message-new-v3-5-0"; }
};
WppIconChatMessageNew.style = wppIconCss;

export { WppIconChatMessageNew as wpp_icon_chat_message_new };
