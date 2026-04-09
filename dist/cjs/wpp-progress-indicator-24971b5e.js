'use strict';

const index = require('./index-ecf423ba.js');

const wppProgressIndicatorCss = ":host{--pi-bar-text-margin:var(--wpp-progress-bar-text-margin, 4px 0);--pi-bar-text-weight:var(--wpp-progress-bar-text-weight, 400);--pi-bar-text-size:var(--wpp-progress-bar-text-size, 14px);--pi-bar-height:var(--wpp-progress-bar-height, 4px);--pi-bar-color:var(--wpp-progress-bar-color, var(--wpp-brand-color));--pi-circle-stroke-width:var(--wpp-progress-circle-stroke-width, 4);--pi-circle-infinity-width:var(--wpp-progress-circle-infinity-width, 70);--pi-circle-stroke-color:var(--wpp-progress-circle-stroke-color, var(--wpp-grey-color-300));--pi-wrapper-bg-color:var(--wpp-progress-wrapper-bg-color, var(--wpp-grey-color-300));--pi-linear-bg-color:var(--wpp-progress-linear-bg-color, var(--wpp-brand-color));--pi-progress-text-color:var(--wpp-progress-text-color, var(--wpp-text-color));--pi-progress-text-margin:var(--wpp-progress-text-margin, 12px);--pi-width:80px}:host(.wpp-wrapper){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;font-family:var(--wpp-font-family)}:host(.wpp-wrapper-linear-full-width){display:block}.progress-bar-wrapper{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.progress-bar-wrapper.percentage:not(.linear-wrapper){position:relative}.progress-bar-wrapper.percentage:not(.linear-wrapper)::before{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:counter(percentage) \"%\";counter-reset:percentage var(--pi-value);color:var(--pi-progress-text-color)}.linear-wrapper{position:relative;display:block;width:var(--pi-width);background:var(--pi-wrapper-bg-color);border-radius:var(--wpp-border-radius-xs)}.overflow-hide{overflow:hidden}.progress-text{margin:var(--pi-bar-text-margin);font-weight:var(--pi-bar-text-weight);font-size:var(--pi-bar-text-size);text-align:center}.linear{width:calc(var(--pi-value) * 1%);height:var(--pi-bar-height);color:var(--pi-linear-text-color);background:var(--pi-linear-bg-color);border-radius:var(--wpp-border-radius-xs);-webkit-animation:infinityLineLoading 1.1s infinite linear;animation:infinityLineLoading 1.1s infinite linear}.linear.infinity-scroll-linear{position:relative;left:0%;width:30%;-webkit-animation:infinityLineLoading 1.5s infinite linear;animation:infinityLineLoading 1.5s infinite linear}.linear::before{position:absolute;top:50%;left:calc(100% + var(--pi-progress-text-margin));-webkit-transform:translateY(-50%);transform:translateY(-50%)}@-webkit-keyframes infinityLineLoading{0%{left:-40%}100%{left:100%}}@keyframes infinityLineLoading{0%{left:-40%}100%{left:100%}}.circle-wrapper{width:var(--pi-width);height:var(--pi-width);-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.circle-wrapper.infinity-scroll{-webkit-animation:infinityCircleLoading 1.1s infinite linear;animation:infinityCircleLoading 1.1s infinite linear}.circle{stroke-linecap:round;stroke-width:var(--pi-circle-stroke-width);stroke:var(--pi-circle-stroke-color)}.progress{stroke-dasharray:100;stroke-dashoffset:calc(100 - var(--pi-value));stroke:var(--pi-bar-color)}.percentage-text::before{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);content:counter(percentage) \"%\";counter-reset:percentage var(--pi-value);color:var(--pi-progress-text-color)}.infinity-scroll-circle-progress-bar{stroke-dashoffset:var(--pi-circle-infinity-width)}@-webkit-keyframes infinityCircleLoading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes infinityCircleLoading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";

const DEFAULT_CIRCLE_WIDTH = 80;
const WppProgressIndicator = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.lineCssClasses = (isShowCircleInfinityLoading, isShowLinearInfinityLoading, shouldShowPercentage) => ({
      linear: this.variant === 'bar',
      circle: this.variant === 'circle',
      'infinity-scroll-circle': isShowCircleInfinityLoading,
      'infinity-scroll-linear': isShowLinearInfinityLoading,
      'percentage-text': shouldShowPercentage,
    });
    this.circleWrapperCssClasses = (isShowCircleInfinityLoading) => ({
      'circle-wrapper': true,
      'infinity-scroll': isShowCircleInfinityLoading,
    });
    this.circleCssClasses = (isShowCircleInfinityLoading, shouldShowPercentage) => ({
      circle: true,
      progress: true,
      'infinity-scroll-circle-progress-bar': isShowCircleInfinityLoading,
      'percentage-text': shouldShowPercentage,
    });
    this.hostCssClasses = (isLinearDontHaveWidth) => ({
      'wpp-progress-indicator': true,
      'wpp-wrapper': true,
      'wpp-wrapper-linear-full-width': isLinearDontHaveWidth,
    });
    this.progressBarCssClasses = (isLinearDontHaveProgress, shouldShowPercentage) => ({
      'progress-bar-wrapper': true,
      'linear-wrapper': this.variant === 'bar',
      'overflow-hide': isLinearDontHaveProgress,
      percentage: shouldShowPercentage,
    });
    this.width = undefined;
    this.variant = 'bar';
    this.value = undefined;
    this.isShowPercentage = false;
    this.label = undefined;
    this.ariaProps = {};
    this.forceIntermediateEmptyState = false;
  }
  setComponentWidth(updateWidth) {
    const currentWidth = updateWidth || this.width;
    if (this.variant === 'circle') {
      if (!currentWidth) {
        return this.host.style.setProperty('--pi-width', `${DEFAULT_CIRCLE_WIDTH}px`);
      }
      this.host.style.setProperty('--pi-width', `${currentWidth}px`);
      return;
    }
    if (!currentWidth)
      return this.host.style.setProperty('--pi-width', '100%');
    this.host.style.setProperty('--pi-width', `${currentWidth}px`);
  }
  progressChange(newProgressValue) {
    this.host.style.setProperty('--pi-value', `${newProgressValue}`);
  }
  widthChange(newWidthValue) {
    this.setComponentWidth(newWidthValue);
  }
  componentDidLoad() {
    this.setComponentWidth();
    if (typeof this.value !== 'number')
      return;
    this.host.style.setProperty('--pi-value', `${this.value}`);
  }
  render() {
    const noDefinedValue = typeof this.value !== 'number' || (this.value === 0 && !this.forceIntermediateEmptyState);
    const isCircle = this.variant === 'circle';
    const isLinearDontHaveProgress = noDefinedValue && !isCircle;
    const isLinearDontHaveWidth = !this.width && !isCircle;
    const isShowCircleInfinityLoading = noDefinedValue && isCircle;
    const isShowLinearInfinityLoading = noDefinedValue && !isCircle;
    const shouldShowPercentage = this.isShowPercentage &&
      typeof this.value === 'number' &&
      (this.value > 0 || (this.value === 0 && !!this.forceIntermediateEmptyState));
    const renderLine = () => (index.h("div", { class: this.lineCssClasses(isShowCircleInfinityLoading, isShowLinearInfinityLoading, shouldShowPercentage), part: "line" }));
    const renderCircle = () => (index.h("svg", { class: this.circleWrapperCssClasses(isShowCircleInfinityLoading), viewBox: "0 0 120 120", part: "circle" }, index.h("circle", { class: "circle", cx: "60", cy: "60", r: "54", fill: "none" }), index.h("circle", { class: this.circleCssClasses(isShowCircleInfinityLoading, shouldShowPercentage), cx: "60", cy: "60", r: "54", fill: "none", pathLength: "100" })));
    return (index.h(index.Host, { class: this.hostCssClasses(isLinearDontHaveWidth), role: "progressbar", "aria-valuenow": this.value, "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, exportparts: "label, content, inner" }, index.h("div", { class: this.progressBarCssClasses(isLinearDontHaveProgress, shouldShowPercentage), part: "body" }, isCircle ? renderCircle() : renderLine()), !!this.label && (index.h("p", { class: "progress-text", part: "label" }, this.label))));
  }
  static get registryIs() { return "wpp-progress-indicator-v3-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["progressChange"],
    "width": ["widthChange"]
  }; }
};
WppProgressIndicator.style = wppProgressIndicatorCss;

exports.WppProgressIndicator = WppProgressIndicator;
