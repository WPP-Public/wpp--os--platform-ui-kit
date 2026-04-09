import { h } from '@stencil/core';
import { WppImage } from '../../../WppImage';
export class WppEmptyTable {
  constructor() {
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const width = this.width || 160;
    const height = this.height || width;
    const viewBoxSize = 160;
    return (h(WppImage, { name: "wpp-empty-table", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("path", { d: "M133.825 80.8329C134.18 79.5166 136.129 79.5166 136.484 80.8329L136.669 81.5227C136.798 82.0005 137.195 82.3691 137.697 82.4776L138.084 82.5613C139.512 82.87 139.512 84.8214 138.084 85.1301L137.697 85.2138C137.195 85.3223 136.798 85.6909 136.669 86.1687L136.484 86.8585C136.129 88.1748 134.18 88.1748 133.825 86.8585L133.639 86.1687C133.511 85.6909 133.114 85.3223 132.612 85.2138L132.225 85.1301C130.797 84.8214 130.797 82.87 132.225 82.5613L132.612 82.4776C133.114 82.3691 133.511 82.0005 133.639 81.5227L133.825 80.8329Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "141.308", cy: "71.8457", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-300)" }), h("path", { d: "M74.3387 9.1568C74.7822 7.51153 77.2182 7.51154 77.6616 9.15681L77.894 10.0191C78.0549 10.6163 78.5506 11.0771 79.178 11.2127L79.6617 11.3173C81.4465 11.7032 81.4465 14.1425 79.6617 14.5284L79.178 14.633C78.5506 14.7686 78.0549 15.2294 77.894 15.8266L77.6616 16.6889C77.2182 18.3342 74.7822 18.3342 74.3387 16.6889L74.1064 15.8266C73.9454 15.2294 73.4498 14.7686 72.8223 14.633L72.3386 14.5284C70.5538 14.1425 70.5538 11.7032 72.3386 11.3173L72.8223 11.2127C73.4498 11.0771 73.9454 10.6163 74.1064 10.0191L74.3387 9.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "87", cy: "20.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("circle", { cx: "16.6162", cy: "55.6924", r: "2", fill: "var(--wpp-primary-color-200)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_138)" }, h("rect", { x: "16", y: "69", width: "100", height: "25", rx: "4", fill: "var(--wpp-primary-color-500)" })), h("rect", { x: "16", y: "66", width: "100", height: "28", rx: "4", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "46", y: "72", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "46", y: "82", width: "64", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("ellipse", { cx: "31", cy: "80.0002", rx: "9", ry: "9.00016", fill: "var(--wpp-primary-color-500)" }), h("g", { "clip-path": "url(#clip0_18170_138)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M31.0017 75.1751C31.1722 75.1751 31.328 75.2714 31.4042 75.4239L32.6751 77.9657L35.6951 78.4303C35.8627 78.4561 36.0016 78.5739 36.0543 78.7351C36.1071 78.8962 36.0648 79.0734 35.9448 79.1933L33.8561 81.282L34.3214 84.3066C34.3472 84.4742 34.2765 84.6422 34.1386 84.7409C34.0007 84.8396 33.8189 84.8524 33.6685 84.774L31.0017 83.3826L28.3349 84.774C28.1845 84.8524 28.0028 84.8396 27.8648 84.7409C27.7269 84.6422 27.6562 84.4742 27.682 84.3066L28.1473 81.282L26.0586 79.1933C25.9387 79.0734 25.8963 78.8962 25.9491 78.7351C26.0019 78.5739 26.1407 78.4561 26.3083 78.4303L29.3283 77.9657L30.5992 75.4239C30.6754 75.2714 30.8313 75.1751 31.0017 75.1751ZM31.0017 76.6313L30.0292 78.5763C29.9639 78.7069 29.8394 78.7976 29.6951 78.8198L27.3229 79.1848L28.9449 80.8068C29.0463 80.9082 29.0933 81.0518 29.0715 81.1935L28.7067 83.5649L30.7936 82.4761C30.924 82.408 31.0794 82.408 31.2099 82.4761L33.2967 83.5649L32.9319 81.1935C32.9101 81.0518 32.9571 80.9082 33.0585 80.8068L34.6805 79.1848L32.3083 78.8198C32.164 78.7976 32.0395 78.7069 31.9742 78.5763L31.0017 76.6313Z", fill: "var(--wpp-grey-color-100)" })), h("g", { opacity: "0.5", filter: "url(#filter1_f_18170_138)" }, h("rect", { x: "33", y: "103", width: "100", height: "25", rx: "4", fill: "var(--wpp-primary-color-500)" })), h("rect", { x: "33", y: "100", width: "100", height: "28", rx: "4", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "63", y: "106", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "63", y: "116", width: "64", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("ellipse", { cx: "48", cy: "114", rx: "9", ry: "9.00016", fill: "var(--wpp-primary-color-500)" }), h("g", { "clip-path": "url(#clip1_18170_138)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M48.0017 109.175C48.1722 109.175 48.328 109.271 48.4042 109.424L49.6751 111.966L52.6951 112.43C52.8627 112.456 53.0016 112.574 53.0543 112.735C53.1071 112.896 53.0648 113.073 52.9448 113.193L50.8561 115.282L51.3214 118.307C51.3472 118.474 51.2765 118.642 51.1386 118.741C51.0007 118.84 50.8189 118.852 50.6685 118.774L48.0017 117.383L45.3349 118.774C45.1845 118.852 45.0028 118.84 44.8648 118.741C44.7269 118.642 44.6562 118.474 44.682 118.307L45.1473 115.282L43.0586 113.193C42.9387 113.073 42.8963 112.896 42.9491 112.735C43.0019 112.574 43.1407 112.456 43.3083 112.43L46.3283 111.966L47.5992 109.424C47.6754 109.271 47.8313 109.175 48.0017 109.175ZM48.0017 110.631L47.0292 112.576C46.9639 112.707 46.8394 112.798 46.6951 112.82L44.3229 113.185L45.9449 114.807C46.0463 114.908 46.0933 115.052 46.0715 115.193L45.7067 117.565L47.7936 116.476C47.924 116.408 48.0794 116.408 48.2099 116.476L50.2967 117.565L49.9319 115.193C49.9101 115.052 49.9571 114.908 50.0585 114.807L51.6805 113.185L49.3083 112.82C49.164 112.798 49.0395 112.707 48.9742 112.576L48.0017 110.631Z", fill: "var(--wpp-grey-color-100)" })), h("g", { opacity: "0.5", filter: "url(#filter2_f_18170_138)" }, h("rect", { x: "33", y: "35", width: "100", height: "25", rx: "4", fill: "var(--wpp-primary-color-500)" })), h("rect", { x: "33", y: "32", width: "100", height: "28", rx: "4", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "63", y: "38", width: "28", height: "6", rx: "1", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "63", y: "48", width: "64", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("ellipse", { cx: "48", cy: "46.0002", rx: "9", ry: "9.00016", fill: "var(--wpp-primary-color-500)" }), h("g", { "clip-path": "url(#clip2_18170_138)" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M48.0017 41.1751C48.1722 41.1751 48.328 41.2714 48.4042 41.4239L49.6751 43.9657L52.6951 44.4303C52.8627 44.4561 53.0016 44.5739 53.0543 44.7351C53.1071 44.8962 53.0648 45.0734 52.9448 45.1933L50.8561 47.282L51.3214 50.3066C51.3472 50.4742 51.2765 50.6422 51.1386 50.7409C51.0007 50.8396 50.8189 50.8524 50.6685 50.774L48.0017 49.3826L45.3349 50.774C45.1845 50.8524 45.0028 50.8396 44.8648 50.7409C44.7269 50.6422 44.6562 50.4742 44.682 50.3066L45.1473 47.282L43.0586 45.1933C42.9387 45.0734 42.8963 44.8962 42.9491 44.7351C43.0019 44.5739 43.1407 44.4561 43.3083 44.4303L46.3283 43.9657L47.5992 41.4239C47.6754 41.2714 47.8313 41.1751 48.0017 41.1751ZM48.0017 42.6313L47.0292 44.5763C46.9639 44.7069 46.8394 44.7976 46.6951 44.8198L44.3229 45.1848L45.9449 46.8068C46.0463 46.9082 46.0933 47.0518 46.0715 47.1935L45.7067 49.5649L47.7936 48.4761C47.924 48.408 48.0794 48.408 48.2099 48.4761L50.2967 49.5649L49.9319 47.1935C49.9101 47.0518 49.9571 46.9082 50.0585 46.8068L51.6805 45.1848L49.3083 44.8198C49.164 44.7976 49.0395 44.7069 48.9742 44.5763L48.0017 42.6313Z", fill: "var(--wpp-grey-color-100)" })), h("circle", { cx: "80", cy: "143.539", r: "3", fill: "var(--wpp-primary-color-300)" }), h("defs", null, h("filter", { id: "filter0_f_18170_138", x: "6", y: "59", width: "120", height: "45", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_18170_138" })), h("filter", { id: "filter1_f_18170_138", x: "23", y: "93", width: "120", height: "45", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_18170_138" })), h("filter", { id: "filter2_f_18170_138", x: "23", y: "25", width: "120", height: "45", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_18170_138" })), h("clipPath", { id: "clip0_18170_138" }, h("rect", { width: "11.9999", height: "11.9999", fill: "var(--wpp-grey-color-000)", transform: "translate(25.002 74.0001)" })), h("clipPath", { id: "clip1_18170_138" }, h("rect", { width: "11.9999", height: "11.9999", fill: "var(--wpp-grey-color-000)", transform: "translate(42.002 108)" })), h("clipPath", { id: "clip2_18170_138" }, h("rect", { width: "11.9999", height: "11.9999", fill: "var(--wpp-grey-color-000)", transform: "translate(42.002 40.0001)" })))));
  }
  static get is() { return "wpp-empty-table"; }
  static get registryIs() { return "wpp-empty-table-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-image.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-image.css"]
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
          "text": "Defines the image width and changes its default size. If you use `width` only, the image width and height will be the same."
        },
        "attribute": "width",
        "reflect": false
      },
      "height": {
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
          "text": "Defines the image height and changes its default size. If you use `height` only, the image width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      }
    };
  }
}
