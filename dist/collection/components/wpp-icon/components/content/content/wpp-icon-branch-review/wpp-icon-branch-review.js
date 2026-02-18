import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBranchReview {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-branch-review", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M13.0912 2.11969C13.3841 2.41258 13.3841 2.88745 13.0912 3.18035L12.11 4.16156H13.1258C13.9245 4.16156 14.6905 4.47885 15.2552 5.04361C15.8201 5.6084 16.1373 6.37441 16.1373 7.1731V12.1712C17.4375 12.5046 18.3985 13.6843 18.3985 15.0885C18.3985 16.7517 17.0503 18.1 15.387 18.1C13.7238 18.1 12.3755 16.7517 12.3755 15.0885C12.3755 13.6841 13.3368 12.5042 14.6373 12.171V7.1731C14.6373 6.77221 14.4781 6.38775 14.1946 6.1043C13.9111 5.82081 13.5266 5.66156 13.1258 5.66156H12.11L13.0912 6.64278C13.3841 6.93567 13.3841 7.41055 13.0912 7.70344C12.7983 7.99633 12.3234 7.99632 12.0305 7.70343L9.76903 5.44189C9.47614 5.149 9.47614 4.67413 9.76903 4.38124L12.0305 2.1197C12.3234 1.8268 12.7983 1.8268 13.0912 2.11969ZM13.8755 15.0885C13.8755 14.2537 14.5523 13.5769 15.387 13.5769C16.2218 13.5769 16.8985 14.2537 16.8985 15.0885C16.8985 15.9233 16.2218 16.6 15.387 16.6C14.5523 16.6 13.8755 15.9233 13.8755 15.0885Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.85715 17.8804C6.56425 17.5875 6.56425 17.1126 6.85714 16.8197L7.83834 15.8385H6.82251C6.02383 15.8385 5.25787 15.5212 4.69309 14.9565C4.12827 14.3917 3.81101 13.6257 3.81101 12.827V7.8289C2.51081 7.49548 1.5498 6.31573 1.5498 4.91158C1.5498 3.24839 2.89808 1.90004 4.5613 1.90004C6.22452 1.90004 7.5728 3.24839 7.5728 4.91158C7.5728 6.31594 6.61151 7.49583 5.31101 7.82905V12.827C5.31101 13.2279 5.47025 13.6123 5.75372 13.8958C6.03722 14.1793 6.42169 14.3385 6.82251 14.3385H7.83833L6.85714 13.3573C6.56425 13.0644 6.56425 12.5895 6.85715 12.2966C7.15005 12.0037 7.62492 12.0037 7.91781 12.2966L10.1793 14.5582C10.4722 14.8511 10.4722 15.3259 10.1793 15.6188L7.91781 17.8804C7.62492 18.1733 7.15005 18.1733 6.85715 17.8804ZM6.0728 4.91158C6.0728 5.74637 5.39606 6.42311 4.5613 6.42311C3.72654 6.42311 3.04981 5.74637 3.04981 4.91158C3.04981 4.07678 3.72654 3.40004 4.5613 3.40004C5.39606 3.40004 6.0728 4.07678 6.0728 4.91158Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-branch-review"; }
  static get registryIs() { return "wpp-icon-branch-review-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../../wpp-icon.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon size, where `s` is **16px** and `m` is **20px**."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
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
          "text": "Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same."
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
          "text": "Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-icon-color)'"
      }
    };
  }
}
