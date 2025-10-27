import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDataViewList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-view-list", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.54199 4.375H17.292", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), h("path", { d: "M8.54199 15.625H17.292", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), h("path", { d: "M8.54199 10H17.292", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round" }), h("path", { d: "M5.62467 6.04159H3.12467C2.89467 6.04159 2.70801 5.85492 2.70801 5.62492V3.12492C2.70801 2.89492 2.89467 2.70825 3.12467 2.70825H5.62467C5.85467 2.70825 6.04134 2.89492 6.04134 3.12492V5.62492C6.04134 5.85492 5.85467 6.04159 5.62467 6.04159Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { d: "M5.62467 17.2916H3.12467C2.89467 17.2916 2.70801 17.1049 2.70801 16.8749V14.3749C2.70801 14.1449 2.89467 13.9583 3.12467 13.9583H5.62467C5.85467 13.9583 6.04134 14.1449 6.04134 14.3749V16.8749C6.04134 17.1049 5.85467 17.2916 5.62467 17.2916Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" }), h("path", { d: "M5.62467 11.6666H3.12467C2.89467 11.6666 2.70801 11.4799 2.70801 11.2499V8.74992C2.70801 8.51992 2.89467 8.33325 3.12467 8.33325H5.62467C5.85467 8.33325 6.04134 8.51992 6.04134 8.74992V11.2499C6.04134 11.4799 5.85467 11.6666 5.62467 11.6666Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-data-view-list-v3-3-0"; }
};
WppIconDataViewList.style = wppIconCss;

export { WppIconDataViewList as wpp_icon_data_view_list };
