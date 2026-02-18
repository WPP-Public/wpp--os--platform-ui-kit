import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { Z as Z_INDEX } from './consts-9fc0a13a.js';

const wppOverlayCss = ":host{--overlay-bg-color:var(--wpp-overlay-bg-color, color-mix(in srgb, var(--wpp-grey-color-500) 60%, transparent))}:host .overlay{position:absolute;top:0;left:0;width:100%;height:100%;background-color:var(--overlay-bg-color);opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}:host .overlay--visible{visibility:visible;opacity:1;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out}:host .overlay--hidden{visibility:hidden;pointer-events:none}";

const OVERLAY_ANIMATION_DURATION = 200;
const WppOverlay = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppClick = createEvent(this, "wppClick", 7);
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
    this.zIndex = Z_INDEX.OVERLAY;
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
  render() {
    return (h(Host, null, h("div", { class: this.getOverlayCssClasses(), style: { zIndex: this.zIndex.toString() }, onClick: this.handleClick })));
  }
  static get registryIs() { return "wpp-overlay-v4-0-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "isVisible": ["handleVisibleChange"]
  }; }
};
WppOverlay.style = wppOverlayCss;

export { WppOverlay as wpp_overlay };
