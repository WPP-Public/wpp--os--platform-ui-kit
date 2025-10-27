import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';

const wppLegendCss = ":host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:6px;cursor:default}.dot{width:12px;height:12px}:host(:hover) .wpp-typography{color:var(--wpp-grey-color-800) !important}:host(.wpp-disabled){pointer-events:none}:host(.wpp-disabled) .dot{opacity:0.5}";

const WppLegend = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-legend': true,
      'wpp-disabled': this.disabled,
    });
    this.dotCssClasses = () => ({
      dot: true,
    });
    this.label = undefined;
    this.disabled = false;
    this.color = 'var(--wpp-dataviz-color-cat-neutral-1)';
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("svg", { class: this.dotCssClasses() }, h("circle", { cx: 6, cy: 6, r: 5, fill: this.color })), this.label && (h("wpp-typography-v3-3-0", { color: this.disabled ? 'var(--wpp-grey-color-500)' : 'var(--wpp-grey-color-1000)', type: "xs-body" }, this.label))));
  }
  static get registryIs() { return "wpp-legend-v3-3-0"; }
};
WppLegend.style = wppLegendCss;

export { WppLegend as wpp_legend };
