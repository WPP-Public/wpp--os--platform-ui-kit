import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const wppSkeletonCss = ":host{--skeleton-bg-color:var(--wpp-skeleton-bg-color, var(--wpp-grey-color-300));--skeleton-circle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-round));--skeleton-circle-width:var(--wpp-skeleton-circle-width, 80px);--skeleton-circle-height:var(--wpp-skeleton-circle-height, 80px);--skeleton-rectangle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-s));--skeleton-rectangle-width:var(--wpp-skeleton-rectangle-width, 100%);--skeleton-rectangle-height:var(--wpp-skeleton-rectangle-height, 80px);--skeleton-animation-duration:var(--wpp-skeleton-animation-duration, 2s);display:-ms-inline-flexbox;display:inline-flex;position:relative;overflow:hidden;background-color:var(--skeleton-bg-color)}:host:host(.wpp-animated)::after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:-webkit-gradient(linear, left top, right top, color-stop(0, rgba(255, 255, 255, 0)), color-stop(20%, rgba(255, 255, 255, 0.2)), color-stop(60%, rgba(255, 255, 255, 0.5)), to(rgba(255, 255, 255, 0)));background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));-webkit-animation:shimmer var(--skeleton-animation-duration) infinite;animation:shimmer var(--skeleton-animation-duration) infinite;content:\"\"}:host:host(.wpp-rectangle){border-radius:var(--skeleton-rectangle-border-radius);width:var(--skeleton-width, var(--skeleton-rectangle-width));height:var(--skeleton-height, var(--skeleton-rectangle-height))}:host:host(.wpp-circle){border-radius:var(--skeleton-circle-border-radius);width:var(--skeleton-width, var(--skeleton-circle-width));height:var(--skeleton-height, var(--skeleton-circle-height))}@-webkit-keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@media (prefers-reduced-motion: reduce){:host(.wpp-animated){-webkit-animation:none !important;animation:none !important}}";

const WppSkeleton = /*@__PURE__*/ proxyCustomElement(class WppSkeleton extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-skeleton': true,
      [`wpp-${this.variant}`]: true,
      'wpp-animated': true,
    });
    this.getSizeWithDimension = (initialValue) => String(initialValue || '').replace(/^(\d+)(\S+)?$/, (...match) => match[1] + (match[2] || 'px'));
    this.variant = 'rectangle';
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const style = {
      '--skeleton-width': this.getSizeWithDimension(this.width),
      '--skeleton-height': this.getSizeWithDimension(this.height),
    };
    return h(Host, { class: this.hostCssClasses(), style: style, "aria-hidden": "true" });
  }
  static get registryIs() { return "wpp-skeleton-v4-0-0"; }
  static get style() { return wppSkeletonCss; }
}, [1, "wpp-skeleton", "wpp-skeleton-v4-0-0", {
    "variant": [1],
    "width": [8],
    "height": [8]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-skeleton-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-skeleton-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppSkeleton);
      }
      break;
  } });
}

export { WppSkeleton as W, defineCustomElement as d };
