import { h } from '@stencil/core';
import { WppImage } from '../../../WppImage';
export class WppEmptyCards {
  constructor() {
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const width = this.width || 160;
    const height = this.height || width;
    const viewBoxSize = 160;
    return (h(WppImage, { name: "wpp-empty-cards", width: width, height: height, viewBoxWidth: viewBoxSize, viewBoxHeight: viewBoxSize }, h("circle", { cx: "80", cy: "80", r: "80", fill: "var(--wpp-primary-color-100)" }), h("g", { opacity: "0.5", filter: "url(#filter0_f_18170_169)" }, h("rect", { x: "30", y: "38", width: "100", height: "39", rx: "6", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M30 39C30 35.6863 32.6863 33 36 33H124C127.314 33 130 35.6863 130 39V71C130 74.3137 127.314 77 124 77H36C32.6863 77 30 74.3137 30 71V39Z", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "36", y: "39", width: "32", height: "32", rx: "4", fill: "var(--wpp-primary-color-500)" }), h("rect", { x: "74", y: "40", width: "24", height: "6", rx: "1", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "74", y: "65", width: "6", height: "6", rx: "3", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "82", y: "65", width: "16", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "74", y: "50", width: "50", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M52.0001 48.5667C52.2273 48.5667 52.4351 48.6951 52.5367 48.8983L54.2313 52.2875L58.258 52.907C58.4815 52.9414 58.6666 53.0984 58.737 53.3133C58.8073 53.5282 58.7509 53.7644 58.591 53.9243L55.806 56.7093L56.4264 60.7421C56.4608 60.9657 56.3666 61.1896 56.1827 61.3212C55.9987 61.4529 55.7564 61.4699 55.5559 61.3653L52.0001 59.5101L48.4443 61.3653C48.2438 61.4699 48.0014 61.4529 47.8175 61.3212C47.6336 61.1896 47.5393 60.9657 47.5737 60.7421L48.1942 56.7093L45.4092 53.9243C45.2493 53.7644 45.1928 53.5282 45.2632 53.3133C45.3335 53.0984 45.5187 52.9414 45.7422 52.907L49.7688 52.2875L51.4634 48.8983C51.5651 48.6951 51.7728 48.5667 52.0001 48.5667ZM52.0001 50.5083L50.7034 53.1017C50.6164 53.2757 50.4503 53.3968 50.258 53.4264L47.0949 53.913L49.2577 56.0757C49.3928 56.2109 49.4555 56.4023 49.4264 56.5912L48.94 59.7531L51.7225 58.3014C51.8964 58.2106 52.1037 58.2106 52.2776 58.3014L55.0602 59.7531L54.5737 56.5912C54.5447 56.4023 54.6073 56.2109 54.7425 56.0757L56.9052 53.913L53.7422 53.4264C53.5498 53.3968 53.3838 53.2757 53.2968 53.1017L52.0001 50.5083Z", fill: "var(--wpp-grey-color-000)" }), h("g", { opacity: "0.5", filter: "url(#filter1_f_18170_169)" }, h("rect", { x: "30", y: "88", width: "100", height: "39", rx: "6", fill: "var(--wpp-primary-color-500)" })), h("path", { d: "M30 89C30 85.6863 32.6863 83 36 83H124C127.314 83 130 85.6863 130 89V121C130 124.314 127.314 127 124 127H36C32.6863 127 30 124.314 30 121V89Z", fill: "var(--wpp-grey-color-000)" }), h("rect", { x: "36", y: "89", width: "32", height: "32", rx: "4", fill: "var(--wpp-primary-color-500)" }), h("rect", { x: "74", y: "90", width: "24", height: "6", rx: "1", fill: "var(--wpp-primary-color-300)" }), h("rect", { x: "74", y: "115", width: "6", height: "6", rx: "3", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "82", y: "115", width: "16", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("rect", { x: "74", y: "100", width: "50", height: "6", rx: "1", fill: "var(--wpp-primary-color-100)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M52.0001 98.5667C52.2273 98.5667 52.4351 98.6951 52.5367 98.8984L54.2313 102.288L58.258 102.907C58.4815 102.941 58.6666 103.098 58.737 103.313C58.8073 103.528 58.7509 103.764 58.591 103.924L55.806 106.709L56.4264 110.742C56.4608 110.966 56.3666 111.19 56.1827 111.321C55.9987 111.453 55.7564 111.47 55.5559 111.365L52.0001 109.51L48.4443 111.365C48.2438 111.47 48.0014 111.453 47.8175 111.321C47.6336 111.19 47.5393 110.966 47.5737 110.742L48.1942 106.709L45.4092 103.924C45.2493 103.764 45.1928 103.528 45.2632 103.313C45.3335 103.098 45.5187 102.941 45.7422 102.907L49.7688 102.288L51.4634 98.8984C51.5651 98.6951 51.7728 98.5667 52.0001 98.5667ZM52.0001 100.508L50.7034 103.102C50.6164 103.276 50.4503 103.397 50.258 103.426L47.0949 103.913L49.2577 106.076C49.3928 106.211 49.4555 106.402 49.4264 106.591L48.94 109.753L51.7225 108.301C51.8964 108.211 52.1037 108.211 52.2776 108.301L55.0602 109.753L54.5737 106.591C54.5447 106.402 54.6073 106.211 54.7425 106.076L56.9052 103.913L53.7422 103.426C53.5498 103.397 53.3838 103.276 53.2968 103.102L52.0001 100.508Z", fill: "var(--wpp-grey-color-000)" }), h("path", { d: "M142.646 81.6955C143.09 80.0502 145.526 80.0502 145.969 81.6955L146.201 82.5578C146.362 83.155 146.858 83.6158 147.485 83.7514L147.969 83.856C149.754 84.2419 149.754 86.6812 147.969 87.0671L147.485 87.1717C146.858 87.3073 146.362 87.7681 146.201 88.3653L145.969 89.2276C145.526 90.8729 143.09 90.8729 142.646 89.2276L142.414 88.3653C142.253 87.7681 141.757 87.3073 141.13 87.1717L140.646 87.0671C138.861 86.6812 138.861 84.2419 140.646 83.856L141.13 83.7514C141.757 83.6158 142.253 83.155 142.414 82.5578L142.646 81.6955Z", fill: "var(--wpp-primary-color-400)" }), h("ellipse", { cx: "11.4608", cy: "75.0001", rx: "1.9999", ry: "2", fill: "var(--wpp-primary-color-300)" }), h("ellipse", { cx: "17.4607", cy: "65.0001", rx: "3.9998", ry: "4", fill: "var(--wpp-primary-color-200)" }), h("path", { d: "M74.3387 12.1568C74.7822 10.5115 77.2182 10.5115 77.6616 12.1568L77.894 13.0191C78.0549 13.6163 78.5506 14.0771 79.178 14.2127L79.6617 14.3173C81.4465 14.7032 81.4465 17.1425 79.6617 17.5284L79.178 17.633C78.5506 17.7686 78.0549 18.2294 77.894 18.8266L77.6616 19.6889C77.2182 21.3342 74.7822 21.3342 74.3387 19.6889L74.1064 18.8266C73.9454 18.2294 73.4498 17.7686 72.8223 17.633L72.3386 17.5284C70.5538 17.1425 70.5538 14.7032 72.3386 14.3173L72.8223 14.2127C73.4498 14.0771 73.9454 13.6163 74.1064 13.0191L74.3387 12.1568Z", fill: "var(--wpp-primary-color-300)" }), h("circle", { cx: "87", cy: "23.3076", r: "2", fill: "var(--wpp-primary-color-400)" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M78.3333 146.744C80.1743 146.744 81.6667 145.251 81.6667 143.41C83.5076 143.41 85 144.903 85 146.744C85 148.584 83.5076 150.077 81.6667 150.077C79.8257 150.077 78.3333 148.584 78.3333 146.744ZM78.3333 146.744C78.3333 144.903 79.8257 143.41 81.6667 143.41C81.6667 141.569 80.1743 140.077 78.3333 140.077C76.4924 140.077 75 141.569 75 143.41C75 145.251 76.4924 146.744 78.3333 146.744Z", fill: "var(--wpp-primary-color-400)" }), h("defs", null, h("filter", { id: "filter0_f_18170_169", x: "20", y: "28", width: "120", height: "59", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_18170_169" })), h("filter", { id: "filter1_f_18170_169", x: "20", y: "78", width: "120", height: "59", filterUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" }, h("feFlood", { "flood-opacity": "0", result: "BackgroundImageFix" }), h("feBlend", { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }), h("feGaussianBlur", { stdDeviation: "5", result: "effect1_foregroundBlur_18170_169" })))));
  }
  static get is() { return "wpp-empty-cards"; }
  static get registryIs() { return "wpp-empty-cards-v4-0-0"; }
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
