import { Host, h } from '@stencil/core';
const DEFAULT_CIRCLE_WIDTH = 80;
/**
 * @part line - progress line element
 * @part circle - progress circle element
 * @part body - Main content wrapper
 * @part label - Label text element
 */
export class WppProgressIndicator {
  constructor() {
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
    const renderLine = () => (h("div", { class: this.lineCssClasses(isShowCircleInfinityLoading, isShowLinearInfinityLoading, shouldShowPercentage), part: "line" }));
    const renderCircle = () => (h("svg", { class: this.circleWrapperCssClasses(isShowCircleInfinityLoading), viewBox: "0 0 120 120", part: "circle" }, h("circle", { class: "circle", cx: "60", cy: "60", r: "54", fill: "none" }), h("circle", { class: this.circleCssClasses(isShowCircleInfinityLoading, shouldShowPercentage), cx: "60", cy: "60", r: "54", fill: "none", pathLength: "100" })));
    return (h(Host, { class: this.hostCssClasses(isLinearDontHaveWidth), role: "progressbar", "aria-valuenow": this.value, "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, exportparts: "label, content, inner" }, h("div", { class: this.progressBarCssClasses(isLinearDontHaveProgress, shouldShowPercentage), part: "body" }, isCircle ? renderCircle() : renderLine()), !!this.label && (h("p", { class: "progress-text", part: "label" }, this.label))));
  }
  static get is() { return "wpp-progress-indicator"; }
  static get registryIs() { return "wpp-progress-indicator-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-progress-indicator.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-progress-indicator.css"]
    };
  }
  static get properties() {
    return {
      "width": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the progress indicator width in pixels. If left `undefined`, the linear indicators are **100%** in width, and circle indicators are **80px** by default."
        },
        "attribute": "width",
        "reflect": false
      },
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'bar' | 'circle'",
          "resolved": "\"bar\" | \"circle\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the progress indicator type."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'bar'"
      },
      "value": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the loading progress. If `undefined`, the loading progress is infinite."
        },
        "attribute": "value",
        "reflect": false
      },
      "isShowPercentage": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the loading percentage is displayed."
        },
        "attribute": "is-show-percentage",
        "reflect": false,
        "defaultValue": "false"
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "This property will be removed in version 5.0.0."
            }],
          "text": "Defines the loading label."
        },
        "attribute": "label",
        "reflect": false
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the `aria-` props of the progess-indicator component."
        },
        "defaultValue": "{}"
      },
      "forceIntermediateEmptyState": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If set to `true` and `value` is `0`, the component will show a 0% empty state\ninstead of the indeterminate loading animation."
        },
        "attribute": "force-intermediate-empty-state",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "progressChange"
      }, {
        "propName": "width",
        "methodName": "widthChange"
      }];
  }
}
