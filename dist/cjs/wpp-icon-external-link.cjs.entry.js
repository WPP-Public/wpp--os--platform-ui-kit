'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconExternalLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-external-link", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17.8221 2.17798C17.9725 2.32842 18.0457 2.52686 18.0416 2.72399V8.54165C18.0416 8.95586 17.7058 9.29165 17.2916 9.29165C16.8774 9.29165 16.5416 8.95586 16.5416 8.54165V4.51914L10.3221 10.7386C10.0292 11.0315 9.55431 11.0315 9.26142 10.7386C8.96852 10.4457 8.96852 9.97088 9.26142 9.67798L15.4811 3.45831H11.4583C11.044 3.45831 10.7083 3.12253 10.7083 2.70831C10.7083 2.2941 11.044 1.95831 11.4583 1.95831H17.2916H17.2917C17.2999 1.95831 17.3082 1.95845 17.3165 1.95872C17.5001 1.96475 17.6819 2.03783 17.8221 2.17798ZM3.45825 6.45831C3.45825 5.49169 4.24163 4.70831 5.20825 4.70831H9.37492C9.78913 4.70831 10.1249 4.37253 10.1249 3.95831C10.1249 3.5441 9.78913 3.20831 9.37492 3.20831H5.20825C3.41321 3.20831 1.95825 4.66327 1.95825 6.45831V14.7916C1.95825 16.5867 3.41321 18.0416 5.20825 18.0416H13.5416C15.3366 18.0416 16.7916 16.5867 16.7916 14.7916V10.625C16.7916 10.2108 16.4558 9.87498 16.0416 9.87498C15.6274 9.87498 15.2916 10.2108 15.2916 10.625V14.7916C15.2916 15.7583 14.5082 16.5416 13.5416 16.5416H5.20825C4.24163 16.5416 3.45825 15.7583 3.45825 14.7916V6.45831Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-external-link-v4-0-0"; }
};
WppIconExternalLink.style = wppIconCss;

exports.wpp_icon_external_link = WppIconExternalLink;
