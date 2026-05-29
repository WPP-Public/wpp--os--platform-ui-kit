'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const consts = require('./consts-d8f5ef98.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');

const wppOverlayCss = ":host{--overlay-bg-color:var(--wpp-overlay-bg-color, color-mix(in srgb, var(--wpp-grey-color-500) 60%, transparent))}:host .overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--overlay-bg-color);opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}:host .overlay--visible{visibility:visible;opacity:1;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}:host .overlay--hidden{visibility:hidden;pointer-events:none}:host([data-wpp-theme=dark]){--overlay-bg-color:color-mix(in srgb, var(--wpp-grey-color-000) 90%, transparent)}";

const OVERLAY_ANIMATION_DURATION = 200;
const WppOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClick = index.createEvent(this, "wppClick", 7);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.handleClick = () => {
      this.wppClick.emit();
    };
    this.getOverlayCssClasses = () => ({
      overlay: true,
      'overlay--visible': this.isVisible,
      'overlay--hidden': this.isHidden,
    });
    this.isHidden = false;
    this.isVisible = false;
    this.zIndex = consts.Z_INDEX.OVERLAY;
  }
  handleVisibleChange(newValue) {
    if (newValue) {
      this.isHidden = false;
    }
    else {
      setTimeout(() => {
        this.isHidden = true;
      }, OVERLAY_ANIMATION_DURATION);
    }
  }
  componentWillLoad() {
    if (!this.isVisible) {
      this.isHidden = true;
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: this.getOverlayCssClasses(), style: { zIndex: this.zIndex.toString() }, onClick: this.handleClick })));
  }
  static get registryIs() { return "wpp-overlay-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "isVisible": ["handleVisibleChange"]
  }; }
};
WppOverlay.style = wppOverlayCss;

exports.wpp_overlay = WppOverlay;
