import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPieChart = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pie-chart", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.7083 1.875C10.7083 1.46079 11.0441 1.125 11.4583 1.125C15.5546 1.125 18.875 4.44537 18.875 8.54167C18.875 8.95588 18.5392 9.29167 18.125 9.29167H11.4583C11.0441 9.29167 10.7083 8.95588 10.7083 8.54167V1.875ZM12.2083 2.67208V7.79167H17.3279C16.9904 5.12357 14.8764 3.00954 12.2083 2.67208ZM1.54163 11.0417C1.54163 6.94537 4.862 3.625 8.95829 3.625C9.37251 3.625 9.70829 3.96079 9.70829 4.375V10.2917H15.625C16.0392 10.2917 16.375 10.6275 16.375 11.0417C16.375 15.138 13.0546 18.4583 8.95829 18.4583C4.862 18.4583 1.54163 15.138 1.54163 11.0417ZM8.20829 5.17208C5.29457 5.5406 3.04163 8.02786 3.04163 11.0417C3.04163 14.3095 5.69042 16.9583 8.95829 16.9583C11.9721 16.9583 14.4594 14.7054 14.8279 11.7917H8.95829C8.54408 11.7917 8.20829 11.4559 8.20829 11.0417V5.17208Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pie-chart-v4-1-0"; }
};
WppIconPieChart.style = wppIconCss;

export { WppIconPieChart as wpp_icon_pie_chart };
