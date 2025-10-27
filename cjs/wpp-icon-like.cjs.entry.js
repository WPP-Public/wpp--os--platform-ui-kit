'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLike = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-like component is deprecated. Please, use wpp-icon-thumbs-up instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-like", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M13.7727 4.87006C13.7727 2.91005 12.8576 1.5 11.3596 1.5C10.5359 1.5 10.2533 1.98268 9.95801 3.10495C9.89778 3.3368 9.86812 3.44968 9.83682 3.56093C9.7558 3.84887 9.6147 4.33909 9.41381 5.03058C9.40843 5.04911 9.40052 5.06656 9.39022 5.08268L7.08923 8.68308C6.545 9.53465 5.74197 10.1892 4.79816 10.5506L4.41828 10.696C3.4176 11.0791 2.83662 12.1256 3.04059 13.1775L3.36526 14.8519C3.55904 15.8513 4.31647 16.6466 5.30518 16.889L11.4275 18.3895C13.4592 18.8875 15.5127 17.6555 16.0295 15.6285L17.1652 11.1745C17.5211 9.7785 16.678 8.35824 15.2819 8.00229C15.0713 7.94859 14.8548 7.92142 14.6374 7.92142H13.174C13.5721 6.61079 13.7727 5.59963 13.7727 4.87006ZM4.22255 12.9484C4.12983 12.4702 4.39391 11.9945 4.84877 11.8204L5.22864 11.6749C6.41304 11.2215 7.42076 10.4001 8.10372 9.33143L10.4047 5.73103C10.477 5.61795 10.5327 5.4951 10.57 5.36622C10.7718 4.67192 10.9136 4.17911 10.9958 3.88703C11.0304 3.76402 11.0632 3.63925 11.1223 3.41132C11.2748 2.83205 11.3498 2.70397 11.3596 2.70397C12.0561 2.70397 12.5687 3.49383 12.5687 4.87006C12.5687 5.57999 12.3072 6.74459 11.7791 8.33353C11.6495 8.72324 11.9396 9.12539 12.3503 9.12539H14.6374C14.7545 9.12539 14.8711 9.14002 14.9845 9.16894C15.7362 9.3606 16.1902 10.1254 15.9985 10.8771L14.8629 15.3311C14.5092 16.7179 13.1042 17.5609 11.7141 17.2202L5.59179 15.7196C5.0594 15.5891 4.65156 15.1609 4.54721 14.6227L4.22255 12.9484Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-like-v3-3-0"; }
};
WppIconLike.style = wppIconCss;

exports.wpp_icon_like = WppIconLike;
