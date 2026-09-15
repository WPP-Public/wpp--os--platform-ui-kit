import { r as registerInstance, h, g as getElement } from './index-93f63aaa.js';
import { E as EmptyStateGraphic, a as EmptyStateGraphicView } from './EmptyStateGraphicView-46fb5cd5.js';
import './theme-observer-b7886d19.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex;position:relative}.wpp-empty-state-animation{display:block;}.wpp-empty-state-animation image{-webkit-filter:url(\"#wpp-empty-state-shadow-tint\");filter:url(\"#wpp-empty-state-shadow-tint\")}.wpp-empty-state-tint{flood-color:var(--wpp-empty-state-shadow-color, transparent)}.wpp-empty-state-skeleton{position:absolute;inset:0}.wpp-empty-state-defs{position:absolute;width:0;height:0}";

const WppEmptyTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.graphic = new EmptyStateGraphic('wpp-empty-table');
    this.width = undefined;
    this.height = undefined;
  }
  connectedCallback() {
    this.graphic.connect(this.host);
  }
  disconnectedCallback() {
    this.graphic.disconnect();
  }
  render() {
    return (h(EmptyStateGraphicView, { graphic: this.graphic, name: "wpp-empty-table", width: this.width, height: this.height }));
  }
  static get registryIs() { return "wpp-empty-table-v4-4-0"; }
  get host() { return getElement(this); }
};
WppEmptyTable.style = wppImageCss;

export { WppEmptyTable as wpp_empty_table };
