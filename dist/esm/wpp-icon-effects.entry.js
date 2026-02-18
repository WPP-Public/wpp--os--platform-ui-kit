import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEffects = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-effects", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.0862 3.40581C11.7422 2.5561 10.9172 2 10.0005 2C9.08386 2 8.25883 2.55612 7.91491 3.40583L4.8983 10.8587C4.88469 10.8902 4.87178 10.9221 4.85959 10.9544L3.66496 13.9058C3.19874 15.0577 3.75456 16.3694 4.90642 16.8356C6.05828 17.3019 7.37 16.746 7.83623 15.5942L8.48148 14H11.5197L12.165 15.5942C12.6312 16.7461 13.9429 17.3019 15.0948 16.8356C16.2466 16.3694 16.8025 15.0577 16.3362 13.9058L15.1416 10.9543C15.1294 10.9221 15.1165 10.8902 15.1029 10.8587L12.0862 3.40581ZM10.6958 3.9686L13.7252 11.4529C13.7297 11.4634 13.734 11.474 13.7381 11.4848L14.9458 14.4686C15.1012 14.8526 14.9159 15.2898 14.532 15.4452C14.148 15.6006 13.7108 15.4154 13.5554 15.0314L12.5308 12.5H7.4704L6.44581 15.0314C6.2904 15.4153 5.85316 15.6006 5.4692 15.4452C5.08525 15.2898 4.89998 14.8526 5.05538 14.4686L6.2631 11.4848C6.26717 11.474 6.27147 11.4634 6.27601 11.4529L9.30533 3.96861C9.41997 3.68537 9.69498 3.5 10.0005 3.5C10.3061 3.5 10.5811 3.68537 10.6958 3.9686ZM11.9236 11H8.07753L10.0006 6.24897L11.9236 11Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-effects-v3-5-0"; }
};
WppIconEffects.style = wppIconCss;

export { WppIconEffects as wpp_icon_effects };
