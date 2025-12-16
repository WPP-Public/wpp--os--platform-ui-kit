import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMailOff = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mail-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L3.17583 4.02437C2.46768 4.48888 2 5.28981 2 6.19998V13.7999L2.00412 13.9475C2.0806 15.3147 3.21357 16.3999 4.59998 16.3999H15.3999L15.547 16.3958L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM14.3511 15.1999H4.59998L4.48516 15.1953C3.76568 15.1369 3.19999 14.5345 3.19999 13.7999V7.89916L9.72049 11.3309L9.79735 11.3647C9.95445 11.4211 10.1295 11.4098 10.2794 11.3309L10.4123 11.2609L14.3511 15.1999ZM8.46594 9.31459L3.19999 6.54317V6.19998L3.20463 6.08515C3.2478 5.55331 3.58823 5.10551 4.05955 4.90811L8.46594 9.31459ZM16.7999 6.54237L11.7474 9.20202L12.6358 10.0904L16.7999 7.89836V13.7999L16.7952 13.9147C16.7873 14.0121 16.7695 14.1066 16.7427 14.1974L17.6495 15.1042C17.8723 14.7208 17.9999 14.2753 17.9999 13.7999V6.19998L17.9958 6.05244C17.9193 4.68515 16.7863 3.6 15.3999 3.6H6.14553L7.3455 4.79999H15.3999L15.5147 4.80463C16.2342 4.86303 16.7999 5.46544 16.7999 6.19998V6.54237Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-mail-off-v3-4-0"; }
};
WppIconMailOff.style = wppIconCss;

export { WppIconMailOff as wpp_icon_mail_off };
