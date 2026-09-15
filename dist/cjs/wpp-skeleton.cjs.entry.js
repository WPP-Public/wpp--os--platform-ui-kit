'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');

const wppSkeletonCss = ":host{--skeleton-bg-color:var(--wpp-skeleton-bg-color, var(--wpp-grey-color-300));--skeleton-circle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-round));--skeleton-circle-width:var(--wpp-skeleton-circle-width, 80px);--skeleton-circle-height:var(--wpp-skeleton-circle-height, 80px);--skeleton-rectangle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-s));--skeleton-rectangle-width:var(--wpp-skeleton-rectangle-width, 100%);--skeleton-rectangle-height:var(--wpp-skeleton-rectangle-height, 80px);--skeleton-animation-duration:var(--wpp-skeleton-animation-duration, 2s);display:-ms-inline-flexbox;display:inline-flex;position:relative;overflow:hidden;background-color:var(--skeleton-bg-color)}:host:host(.wpp-animated)::after{position:absolute;inset:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:-webkit-gradient(linear, left top, right top, color-stop(0, rgba(255, 255, 255, 0)), color-stop(20%, rgba(255, 255, 255, 0.2)), color-stop(60%, rgba(255, 255, 255, 0.5)), to(rgba(255, 255, 255, 0)));background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));-webkit-animation:shimmer var(--skeleton-animation-duration) infinite;animation:shimmer var(--skeleton-animation-duration) infinite;content:\"\"}:host:host(.wpp-rectangle){border-radius:var(--skeleton-rectangle-border-radius);width:var(--skeleton-width, var(--skeleton-rectangle-width));height:var(--skeleton-height, var(--skeleton-rectangle-height))}:host:host(.wpp-circle){border-radius:var(--skeleton-circle-border-radius);width:var(--skeleton-width, var(--skeleton-circle-width));height:var(--skeleton-height, var(--skeleton-circle-height))}@-webkit-keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@media (prefers-reduced-motion: reduce){:host(.wpp-animated)::after{-webkit-animation:none !important;animation:none !important}}";

const WppSkeleton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return index.h(index.Host, { class: this.hostCssClasses(), style: style, "aria-hidden": "true" });
  }
  static get registryIs() { return "wpp-skeleton-v4-4-0"; }
};
WppSkeleton.style = wppSkeletonCss;

exports.wpp_skeleton = WppSkeleton;
