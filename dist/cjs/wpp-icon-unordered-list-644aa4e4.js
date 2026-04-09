'use strict';

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');

const wppIconCss$l = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBlockquote = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-blockquote", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9C6.98728 9 7.442 8.86059 7.82645 8.61948C7.63092 9.73653 7.28608 10.6355 6.87439 11.384C6.22505 12.5647 5.39792 13.395 4.64645 14.1464C4.45118 14.3417 4.45118 14.6583 4.64645 14.8536C4.84171 15.0488 5.15829 15.0488 5.35355 14.8536L5.36545 14.8417C6.11184 14.0953 7.02879 13.1784 7.75061 11.866C8.48082 10.5383 9 8.82976 9 6.5ZM14.8264 8.61948C14.442 8.86059 13.9873 9 13.5 9C12.1193 9 11 7.88071 11 6.5C11 5.11929 12.1193 4 13.5 4C14.8807 4 16 5.11929 16 6.5C16 8.82976 15.4808 10.5383 14.7506 11.866C14.0288 13.1784 13.1118 14.0953 12.3655 14.8417L12.3536 14.8536C12.1583 15.0488 11.8417 15.0488 11.6464 14.8536C11.4512 14.6583 11.4512 14.3417 11.6464 14.1464C12.3979 13.395 13.225 12.5647 13.8744 11.384C14.2861 10.6355 14.6309 9.73653 14.8264 8.61948Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-blockquote-v4-0-0"; }
};
WppIconBlockquote.style = wppIconCss$l;

const wppIconCss$k = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconBold = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-bold", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.5 4.25C5.5 3.55964 6.05964 3 6.75 3H10.2512C12.654 3 14.25 4.98768 14.25 7C14.25 7.87176 13.9504 8.73837 13.4157 9.44091C14.3205 10.1431 14.9974 11.242 14.9974 12.75C14.9974 15.6133 12.5599 16.9955 10.7531 16.9955H6.75C6.05964 16.9955 5.5 16.4358 5.5 15.7455V4.25ZM8 11V14.4955H10.7531C11.5641 14.4955 12.4974 13.8768 12.4974 12.75C12.4974 11.6212 11.5598 11 10.7531 11H8ZM8 8.5H10.2478C11.1296 8.5 11.75 7.77853 11.75 7C11.75 6.22003 11.1295 5.5 10.2512 5.5H8V8.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-bold-v4-0-0"; }
};
WppIconBold.style = wppIconCss$k;

const wppIconCss$j = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCodeView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-code-view", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M12.9365 4.052C13.1033 3.67286 12.9312 3.23028 12.5521 3.06346C12.1729 2.89664 11.7303 3.06875 11.5635 3.44789L6.06352 15.9479C5.8967 16.327 6.06882 16.7696 6.44795 16.9364C6.82709 17.1033 7.26967 16.9311 7.43649 16.552L12.9365 4.052ZM14.2927 13.8444C13.9644 13.5919 13.903 13.121 14.1555 12.7927L16.3038 9.99996L14.1555 7.20725C13.903 6.87893 13.9644 6.40805 14.2927 6.15549C14.621 5.90294 15.0919 5.96436 15.3445 6.29268L17.8445 9.54268C18.0518 9.81227 18.0518 10.1877 17.8445 10.4572L15.3445 13.7072C15.0919 14.0356 14.621 14.097 14.2927 13.8444ZM5.70728 6.15557C6.0356 6.40812 6.09702 6.879 5.84447 7.20732L3.69622 10L5.84447 12.7928C6.09702 13.1211 6.0356 13.592 5.70728 13.8445C5.37897 14.0971 4.90808 14.0356 4.65553 13.7073L2.15553 10.4573C1.94816 10.1877 1.94816 9.81234 2.15553 9.54275L4.65553 6.29275C4.90808 5.96444 5.37897 5.90302 5.70728 6.15557Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-code-view-v4-0-0"; }
};
WppIconCodeView.style = wppIconCss$j;

const wppIconCss$i = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatCenter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-float-center", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M7.5 5.833h5v5H7.5V5.833M2.5 2.5h15v1.667H2.5V2.5m0 10h15v1.667H2.5v-1.667m0 3.333h11.667v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-center-v4-0-0"; }
};
WppIconFloatCenter.style = wppIconCss$i;

const wppIconCss$h = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatLeft = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-float-left", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M2.5 5.833h5v5H2.5V5.833m0-3.333h15v1.667H2.5V2.5m15 3.333v1.667H9.167V5.833h8.333m0 3.333v1.667H9.167v-1.667h8.333M2.5 12.5h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-left-v4-0-0"; }
};
WppIconFloatLeft.style = wppIconCss$h;

const wppIconCss$g = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFloatRight = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-float-right", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M12.5 5.833h5v5h-5V5.833M2.5 2.5h15v1.667H2.5V2.5m8.333 3.333v1.667H2.5V5.833h8.333m-3.333 3.333v1.667H2.5v-1.667h5m-5 3.333h11.667v1.667H2.5v-1.667m0 3.333h15v1.667H2.5v-1.667z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-float-right-v4-0-0"; }
};
WppIconFloatRight.style = wppIconCss$g;

const wppIconCss$f = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconH1 = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-h1", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M16.5725 3.82273C16.4981 3.78724 16.417 3.76365 16.3315 3.75441C16.1242 3.7315 15.9234 3.79659 15.771 3.92289C15.6922 3.98821 15.6263 4.0699 15.5792 4.16425C15.5496 4.22325 15.5276 4.28669 15.5143 4.35331C15.2597 5.4912 14.2065 6.96097 12.834 7.876C12.4893 8.10576 12.3962 8.57141 12.626 8.91606C12.8557 9.26071 13.3214 9.35384 13.666 9.12407C14.3432 8.67266 14.9718 8.09961 15.5 7.46852V15.5C15.5 15.9142 15.8358 16.25 16.25 16.25C16.6642 16.25 17 15.9142 17 15.5V4.51556C17.0038 4.34006 16.9455 4.1726 16.8418 4.03924C16.7713 3.94858 16.6798 3.87369 16.5725 3.82273ZM3.5 4.50004C3.5 4.08582 3.16421 3.75004 2.75 3.75004C2.33579 3.75004 2 4.08582 2 4.50004V15.5C2 15.9142 2.33579 16.25 2.75 16.25C3.16421 16.25 3.5 15.9142 3.5 15.5V10.5H8.5V15.5C8.5 15.9142 8.83579 16.25 9.25 16.25C9.66421 16.25 10 15.9142 10 15.5V4.50004C10 4.08582 9.66421 3.75004 9.25 3.75004C8.83579 3.75004 8.5 4.08582 8.5 4.50004V9.00004H3.5V4.50004Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-h1-v4-0-0"; }
};
WppIconH1.style = wppIconCss$f;

const wppIconCss$e = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconH2 = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-h2", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3.5 4.5C3.5 4.08579 3.16421 3.75 2.75 3.75C2.33579 3.75 2 4.08579 2 4.5V15.5C2 15.9142 2.33579 16.25 2.75 16.25C3.16421 16.25 3.5 15.9142 3.5 15.5V10.5H8.5V15.5C8.5 15.9142 8.83579 16.25 9.25 16.25C9.66421 16.25 10 15.9142 10 15.5V4.5C10 4.08579 9.66421 3.75 9.25 3.75C8.83579 3.75 8.5 4.08579 8.5 4.5V9H3.5V4.5ZM14.75 5.25C13.4578 5.25 12.5 6.37402 12.5 7.5C12.5 7.91421 12.1642 8.25 11.75 8.25C11.3358 8.25 11 7.91421 11 7.5C11 5.62598 12.5513 3.75 14.75 3.75C16.1527 3.75 17.225 4.54308 17.7225 5.66463C18.2133 6.77098 18.1329 8.15287 17.3931 9.38587C17.0081 10.0276 16.4347 10.5441 15.8663 10.9916C15.6005 11.2009 15.3209 11.4061 15.0496 11.6053L14.9835 11.6538C14.6876 11.8712 14.4006 12.0833 14.1254 12.3039C13.2332 13.0192 12.5563 13.7528 12.331 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H11.5C11.0858 16.25 10.75 15.9142 10.75 15.5C10.75 13.4013 11.9765 12.1043 13.1871 11.1336C13.4901 10.8907 13.8007 10.6614 14.0956 10.4448L14.1577 10.3993C14.4335 10.1967 14.6934 10.0059 14.9384 9.81304C15.4715 9.39335 15.8669 9.01409 16.1069 8.61413C16.6171 7.76379 16.6276 6.89569 16.3514 6.27287C16.0818 5.66525 15.5292 5.25 14.75 5.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-h2-v4-0-0"; }
};
WppIconH2.style = wppIconCss$e;

const wppIconCss$d = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconIndentDecrease = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-indent-decrease", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M7.83322 13.3333H14.9166C15.129 13.3336 15.3332 13.4149 15.4877 13.5607C15.6421 13.7065 15.7351 13.9058 15.7475 14.1178C15.76 14.3299 15.691 14.5386 15.5547 14.7015C15.4183 14.8644 15.225 14.9691 15.0141 14.9942L14.9166 15H7.83322C7.62082 14.9998 7.41652 14.9184 7.26208 14.7726C7.10763 14.6268 7.01469 14.4275 7.00224 14.2155C6.98979 14.0035 7.05878 13.7947 7.1951 13.6318C7.33143 13.4689 7.5248 13.3643 7.73572 13.3392L7.83322 13.3333ZM2.24405 9.41083L3.91072 7.74417C4.06068 7.59471 4.26191 7.50794 4.47354 7.50148C4.68516 7.49501 4.89131 7.56935 5.05012 7.70937C5.20892 7.8494 5.30847 8.04463 5.32855 8.25539C5.34863 8.46616 5.28773 8.67667 5.15822 8.84417L5.08905 8.9225L4.01155 10L5.08905 11.0775C5.23851 11.2275 5.32528 11.4287 5.33174 11.6403C5.3382 11.8519 5.26387 12.0581 5.12384 12.2169C4.98382 12.3757 4.78859 12.4753 4.57782 12.4953C4.36705 12.5154 4.15654 12.4545 3.98905 12.325L3.91072 12.2558L2.24405 10.5892C2.10057 10.4457 2.01438 10.2548 2.00164 10.0522C1.98891 9.84971 2.05051 9.6495 2.17488 9.48917L2.24405 9.41083ZM7.83322 9.16667L17.4166 9.16583C17.629 9.16607 17.8332 9.2474 17.9877 9.39321C18.1421 9.53901 18.2351 9.73829 18.2475 9.95033C18.26 10.1624 18.191 10.3711 18.0547 10.534C17.9183 10.6969 17.725 10.8016 17.5141 10.8267L17.4166 10.8333H7.83322C7.62082 10.8331 7.41652 10.7518 7.26208 10.606C7.10763 10.4602 7.01469 10.2609 7.00224 10.0488C6.98979 9.8368 7.05878 9.62802 7.1951 9.46514C7.33143 9.30226 7.5248 9.19759 7.73572 9.1725L7.83322 9.16667ZM7.83322 5H14.9166C15.129 5.00024 15.3332 5.08157 15.4877 5.22737C15.6421 5.37318 15.7351 5.57246 15.7475 5.7845C15.76 5.99653 15.691 6.20532 15.5547 6.36819C15.4183 6.53107 15.225 6.63575 15.0141 6.66083L14.9166 6.66667H7.83322C7.62082 6.66643 7.41652 6.5851 7.26208 6.43929C7.10763 6.29349 7.01469 6.09421 7.00224 5.88217C6.98979 5.67014 7.05878 5.46135 7.1951 5.29847C7.33143 5.1356 7.5248 5.03092 7.73572 5.00583L7.83322 5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-indent-decrease-v4-0-0"; }
};
WppIconIndentDecrease.style = wppIconCss$d;

const wppIconCss$c = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconIndentIncrease = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-indent-increase", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M7.83316 13.3333H14.9165C15.1289 13.3336 15.3332 13.4149 15.4876 13.5607C15.6421 13.7065 15.735 13.9058 15.7475 14.1178C15.7599 14.3299 15.6909 14.5386 15.5546 14.7015C15.4183 14.8644 15.2249 14.9691 15.014 14.9942L14.9165 15H7.83316C7.62076 14.9998 7.41646 14.9184 7.26201 14.7726C7.10757 14.6268 7.01463 14.4275 7.00218 14.2155C6.98973 14.0035 7.05872 13.7947 7.19504 13.6318C7.33137 13.4689 7.52474 13.3643 7.73566 13.3392L7.83316 13.3333ZM2.24399 7.74417C2.38748 7.60069 2.5784 7.51449 2.78092 7.50176C2.98344 7.48903 3.18365 7.55062 3.34399 7.675L3.42232 7.74417L5.08899 9.41083C5.23247 9.55433 5.31866 9.74524 5.3314 9.94777C5.34413 10.1503 5.28253 10.3505 5.15816 10.5108L5.08899 10.5892L3.42232 12.2558C3.27236 12.4053 3.07113 12.4921 2.8595 12.4985C2.64788 12.505 2.44173 12.4307 2.28292 12.2906C2.12412 12.1506 2.02457 11.9554 2.00449 11.7446C1.98441 11.5338 2.04531 11.3233 2.17482 11.1558L2.24399 11.0775L3.32149 10L2.24399 8.9225C2.08776 8.76623 2 8.5543 2 8.33333C2 8.11236 2.08776 7.90044 2.24399 7.74417ZM7.83316 9.16667L17.4165 9.16583C17.6289 9.16607 17.8332 9.2474 17.9876 9.39321C18.1421 9.53901 18.235 9.73829 18.2475 9.95033C18.2599 10.1624 18.1909 10.3711 18.0546 10.534C17.9183 10.6969 17.7249 10.8016 17.514 10.8267L17.4165 10.8333H7.83316C7.62076 10.8331 7.41646 10.7518 7.26201 10.606C7.10757 10.4602 7.01463 10.2609 7.00218 10.0488C6.98973 9.8368 7.05872 9.62802 7.19504 9.46514C7.33137 9.30226 7.52474 9.19759 7.73566 9.1725L7.83316 9.16667ZM7.83316 5H14.9165C15.1289 5.00024 15.3332 5.08157 15.4876 5.22737C15.6421 5.37318 15.735 5.57246 15.7475 5.7845C15.7599 5.99653 15.6909 6.20532 15.5546 6.36819C15.4183 6.53107 15.2249 6.63575 15.014 6.66083L14.9165 6.66667H7.83316C7.62076 6.66643 7.41646 6.5851 7.26201 6.43929C7.10757 6.29349 7.01463 6.09421 7.00218 5.88217C6.98973 5.67014 7.05872 5.46135 7.19504 5.29847C7.33137 5.1356 7.52474 5.03092 7.73566 5.00583L7.83316 5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-indent-increase-v4-0-0"; }
};
WppIconIndentIncrease.style = wppIconCss$c;

const wppIconCss$b = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconItalic = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-italic", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M8 3.25C8 2.83579 8.33579 2.5 8.75 2.5H16.25C16.6642 2.5 17 2.83579 17 3.25C17 3.66421 16.6642 4 16.25 4H13.0151L8.59202 15.5H11.25C11.6642 15.5 12 15.8358 12 16.25C12 16.6642 11.6642 17 11.25 17H3.75C3.33579 17 3 16.6642 3 16.25C3 15.8358 3.33579 15.5 3.75 15.5H6.9849L11.408 4H8.75C8.33579 4 8 3.66421 8 3.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-italic-v4-0-0"; }
};
WppIconItalic.style = wppIconCss$b;

const wppIconCss$a = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-link", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M11.6262 4.13519L9.2798 6.47693C8.98661 6.76954 8.51174 6.76906 8.21914 6.47588C7.92654 6.18269 7.92701 5.70782 8.2202 5.41522L10.5724 3.06768C11.4187 2.23512 12.5596 1.77069 13.7467 1.77552C14.9338 1.78035 16.071 2.25408 16.9104 3.0935C17.7498 3.93293 18.2235 5.07004 18.2284 6.25716C18.2332 7.44427 17.7688 8.58521 16.9362 9.43144L16.9315 9.43624L14.583 11.7808C14.2899 12.0734 13.815 12.073 13.5224 11.7799C13.2297 11.4867 13.2301 11.0119 13.5232 10.7192L15.8692 8.37717C16.4228 7.81324 16.7316 7.05361 16.7284 6.26327C16.7252 5.47186 16.4093 4.71378 15.8497 4.15416C15.2901 3.59455 14.532 3.27873 13.7406 3.27551C12.9501 3.27229 12.1902 3.58126 11.6262 4.13519Z", fill: "currentColor" }), index.h("path", { d: "M13.0303 6.96967C13.3232 7.26256 13.3232 7.73744 13.0303 8.03033L8.03033 13.0303C7.73744 13.3232 7.26256 13.3232 6.96967 13.0303C6.67678 12.7374 6.67678 12.2626 6.96967 11.9697L11.9697 6.96967C12.2626 6.67678 12.7374 6.67678 13.0303 6.96967Z", fill: "currentColor" }), index.h("path", { d: "M6.47684 9.2798C6.76944 8.98661 6.76897 8.51174 6.47578 8.21914C6.1826 7.92654 5.70772 7.92701 5.41512 8.2202L3.07136 10.5686L3.0676 10.5724C2.23504 11.4187 1.77059 12.5596 1.77543 13.7467C1.78026 14.9338 2.25399 16.071 3.09341 16.9104C3.93284 17.7498 5.06995 18.2235 6.25707 18.2284C7.44418 18.2332 8.58514 17.7688 9.43137 16.9362L11.7807 14.583C12.0733 14.2899 12.0729 13.815 11.7798 13.5224C11.4866 13.2297 11.0118 13.2301 10.7191 13.5232L8.37707 15.8692C7.81315 16.4228 7.05351 16.7316 6.26318 16.7284C5.47176 16.7252 4.71369 16.4093 4.15407 15.8497C3.59445 15.2901 3.27864 14.532 3.27542 13.7406C3.2722 12.9501 3.58117 12.1902 4.1351 11.6262L6.47684 9.2798Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-link-v4-0-0"; }
};
WppIconLink.style = wppIconCss$a;

const wppIconCss$9 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconOrderedList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-ordered-list", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.00011 1.49988C5.00011 1.26799 4.84067 1.06653 4.61499 1.01325C4.38621 0.959243 4.15942 1.07477 4.05148 1.27895C4.0295 1.32085 4.00531 1.36162 3.98053 1.40189C3.92681 1.48918 3.8447 1.61249 3.73468 1.75003C3.51178 2.02864 3.19011 2.34586 2.7765 2.55266C2.52951 2.67616 2.4294 2.97649 2.5529 3.22348C2.67639 3.47047 2.97673 3.57058 3.22372 3.44709C3.52353 3.29718 3.78202 3.11079 4.00011 2.9181V5.49988C4.00011 5.77602 4.22397 5.99988 4.50011 5.99988C4.77625 5.99988 5.00011 5.77602 5.00011 5.49988V1.49988ZM8.75 3.99988C8.33579 3.99988 8 4.33566 8 4.74988C8 5.16409 8.33579 5.49988 8.75 5.49988H16.25C16.6642 5.49988 17 5.16409 17 4.74988C17 4.33566 16.6642 3.99988 16.25 3.99988H8.75ZM8.75 8.99988C8.33579 8.99988 8 9.33566 8 9.74988C8 10.1641 8.33579 10.4999 8.75 10.4999H16.25C16.6642 10.4999 17 10.1641 17 9.74988C17 9.33566 16.6642 8.99988 16.25 8.99988H8.75ZM8 14.7499C8 14.3357 8.33579 13.9999 8.75 13.9999H16.25C16.6642 13.9999 17 14.3357 17 14.7499C17 15.1641 16.6642 15.4999 16.25 15.4999H8.75C8.33579 15.4999 8 15.1641 8 14.7499ZM2.64642 7.64639C2.45117 7.84166 2.4512 8.15825 2.64647 8.35349C2.84059 8.54758 3.15457 8.54871 3.35008 8.35691L3.35665 8.35089C3.36458 8.34379 3.37911 8.3312 3.39988 8.31488C3.44165 8.28204 3.50709 8.23533 3.59323 8.18792C3.76518 8.09329 4.01033 8.00073 4.31294 7.99988C4.54021 8.00441 4.72387 8.06465 4.83732 8.14866C4.93306 8.21956 5 8.31935 5 8.49997C5 8.70224 4.92979 8.8191 4.78928 8.93618C4.63792 9.06232 4.44136 9.15961 4.17109 9.29339C4.12524 9.31608 4.07662 9.34015 4.0264 9.36526C3.71266 9.52213 3.32368 9.72875 3.02065 10.0621C2.69919 10.4157 2.5 10.8808 2.5 11.5C2.5 11.7761 2.72386 12 3 12H5.49944C5.77558 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11H3.58925C3.63458 10.8933 3.69413 10.8079 3.7606 10.7347C3.92632 10.5524 4.16234 10.4153 4.4736 10.2597C4.51228 10.2404 4.55304 10.2204 4.59534 10.1996C4.8573 10.0711 5.17854 9.91352 5.42947 9.7044C5.75771 9.43086 6 9.04771 6 8.49997C6 7.99553 5.77725 7.60036 5.43244 7.34502C5.10604 7.10332 4.69985 7.00626 4.32563 6.99995L4.31722 6.99988C3.80459 6.99985 3.39261 7.15689 3.11107 7.31184C2.97006 7.38944 2.85942 7.46775 2.78191 7.52868C2.74303 7.55924 2.71212 7.58572 2.68951 7.60596C2.67819 7.6161 2.66892 7.62471 2.66173 7.63152L2.65251 7.64038L2.64907 7.64375L2.64765 7.64516L2.64642 7.64639ZM2.66173 7.63152L2.64642 7.64639C2.64642 7.64639 2.7471 7.55664 2.66173 7.63152ZM3.75011 15.4999C3.75011 15.2237 3.97397 14.9999 4.25011 14.9999C4.5929 14.9999 4.78233 14.9032 4.87775 14.8168C4.97201 14.7314 5.01072 14.6254 5.00671 14.5186C4.99946 14.3251 4.82083 13.9999 4.25011 13.9999C3.8376 13.9999 3.62396 14.1016 3.52746 14.1659C3.4769 14.1996 3.44973 14.2289 3.43891 14.2418L3.43482 14.2469C3.30449 14.4767 3.01552 14.5666 2.7765 14.4471C2.52951 14.3236 2.4294 14.0233 2.5529 13.7763L2.55361 13.7748L2.55435 13.7734L2.55594 13.7703L2.55948 13.7635L2.56815 13.7478C2.57465 13.7363 2.58262 13.7229 2.59222 13.708C2.61141 13.6782 2.63716 13.6419 2.67069 13.6017C2.73799 13.5209 2.83582 13.4251 2.97276 13.3339C3.25126 13.1482 3.66262 12.9999 4.25011 12.9999C5.27939 12.9999 5.97576 13.6746 6.00601 14.4811C6.01979 14.8486 5.88798 15.2168 5.60959 15.4999C5.88798 15.7829 6.01979 16.1511 6.00601 16.5186C5.97576 17.3251 5.27939 17.9999 4.25011 17.9999C3.66262 17.9999 3.25126 17.8516 2.97276 17.6659C2.83582 17.5746 2.73799 17.4789 2.67069 17.3981C2.63716 17.3579 2.61141 17.3216 2.59222 17.2917C2.58262 17.2768 2.57465 17.2635 2.56815 17.252L2.55948 17.2362L2.55594 17.2295L2.55435 17.2264L2.55361 17.2249L2.5529 17.2235C2.4294 16.9765 2.52951 16.6762 2.7765 16.5527C3.01552 16.4332 3.30449 16.5231 3.43482 16.7528L3.43891 16.7579C3.44973 16.7709 3.4769 16.8001 3.52746 16.8339C3.62396 16.8982 3.8376 16.9999 4.25011 16.9999C4.82083 16.9999 4.99946 16.6746 5.00671 16.4811C5.01072 16.3743 4.97201 16.2683 4.87775 16.183C4.78233 16.0966 4.5929 15.9999 4.25011 15.9999C3.97397 15.9999 3.75011 15.776 3.75011 15.4999ZM3.43482 14.2469C3.43904 14.2395 3.44309 14.2319 3.44698 14.2242L3.44596 14.2262L3.44465 14.2287L3.44223 14.2334L3.43817 14.2408C3.43583 14.2449 3.43339 14.2488 3.43339 14.2488L3.43279 14.2497L3.43482 14.2469Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-ordered-list-v4-0-0"; }
};
WppIconOrderedList.style = wppIconCss$9;

const wppIconCss$8 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRedo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-redo", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M9 6C8.94015 5.99788 9.06037 6 9 6C9.02294 5.99789 9.22651 6 9.25 6H13.6434L11.3754 3.73202C11.0825 3.43913 11.0825 2.96425 11.3754 2.67136C11.6683 2.37847 12.1432 2.37847 12.4361 2.67136L15.789 6.02427C15.963 6.19831 16.0337 6.43661 16.0009 6.6628C15.9821 6.82493 15.9106 6.98212 15.7862 7.10649L12.5391 10.3536C12.2462 10.6465 11.7714 10.6465 11.4785 10.3536C11.1856 10.0607 11.1856 9.5858 11.4785 9.29291L13.2714 7.5H9C7.067 7.5 5.5 9.067 5.5 11C5.5 12.933 7.067 14.5 9 14.5H13.25C13.6642 14.5 14 14.8358 14 15.25C14 15.6642 13.6642 16 13.25 16H9.25C9.22651 16 9 16 9 16C6.23858 16 4 13.7614 4 11C4 8.23858 6.23858 6 9 6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-redo-v4-0-0"; }
};
WppIconRedo.style = wppIconCss$8;

const wppIconCss$7 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStrikeThrough = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-strike-through", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.2516 3.7022C7.2437 2.99357 8.58175 2.5 10.0001 2.5C12.7826 2.5 14.4888 3.98502 15.1001 4.8C15.3486 5.13137 15.2814 5.60147 14.9501 5.85C14.6187 6.09853 14.1486 6.03137 13.9001 5.7C13.5113 5.18165 12.2175 4 10.0001 4C8.91836 4 7.88138 4.38143 7.12345 4.9228C6.33129 5.48862 5.99999 6.10486 5.99999 6.5C5.99999 7.28069 6.37608 7.78532 7.11015 8.21031C7.29064 8.3148 7.48662 8.41057 7.69621 8.5H5.16181C4.75426 7.97689 4.49999 7.32249 4.49999 6.5C4.49999 5.39514 5.29373 4.38638 6.2516 3.7022ZM16.5 10C16.9142 10 17.25 10.3358 17.25 10.75C17.25 11.1642 16.9142 11.5 16.5 11.5H14.8382C15.2457 12.0231 15.5 12.6775 15.5 13.5C15.5 14.8585 14.6255 15.8755 13.5884 16.5137C12.5464 17.155 11.2207 17.5 10.0001 17.5C8.85764 17.5 7.86749 17.371 7.00841 17.0015C6.1309 16.6241 5.44521 16.0198 4.87602 15.166C4.64625 14.8214 4.73938 14.3557 5.08403 14.126C5.42868 13.8962 5.89433 13.9893 6.12409 14.334C6.5549 14.9802 7.02546 15.3759 7.60108 15.6235C8.19512 15.879 8.95497 16 10.0001 16C10.9669 16 12.0162 15.72 12.8023 15.2363C13.5933 14.7495 14 14.1415 14 13.5C14 12.7193 13.6239 12.2147 12.8898 11.7897C12.7093 11.6852 12.5134 11.5894 12.3038 11.5H3.5C3.08579 11.5 2.75 11.1642 2.75 10.75C2.75 10.3358 3.08579 10 3.5 10H16.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-strike-through-v4-0-0"; }
};
WppIconStrikeThrough.style = wppIconCss$7;

const wppIconCss$6 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentCenter = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-text-alignment-center", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M4 4.25C4 3.83579 4.33579 3.5 4.75 3.5H15.25C15.6642 3.5 16 3.83579 16 4.25C16 4.66421 15.6642 5 15.25 5H4.75C4.33579 5 4 4.66421 4 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM6.75 13.5C6.33579 13.5 6 13.8358 6 14.25C6 14.6642 6.33579 15 6.75 15H13.25C13.6642 15 14 14.6642 14 14.25C14 13.8358 13.6642 13.5 13.25 13.5H6.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-center-v4-0-0"; }
};
WppIconTextAlignmentCenter.style = wppIconCss$6;

const wppIconCss$5 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentJustify = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-text-alignment-justify", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M2 4.25C2 3.83579 2.33579 3.5 2.75 3.5H17.25C17.6642 3.5 18 3.83579 18 4.25C18 4.66421 17.6642 5 17.25 5H2.75C2.33579 5 2 4.66421 2 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM2.75 13.5C2.33579 13.5 2 13.8358 2 14.25C2 14.6642 2.33579 15 2.75 15H17.25C17.6642 15 18 14.6642 18 14.25C18 13.8358 17.6642 13.5 17.25 13.5H2.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-justify-v4-0-0"; }
};
WppIconTextAlignmentJustify.style = wppIconCss$5;

const wppIconCss$4 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentLeft = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-text-alignment-left", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M2 4.25C2 3.83579 2.33579 3.5 2.75 3.5H13.25C13.6642 3.5 14 3.83579 14 4.25C14 4.66421 13.6642 5 13.25 5H2.75C2.33579 5 2 4.66421 2 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM2.75 13.5C2.33579 13.5 2 13.8358 2 14.25C2 14.6642 2.33579 15 2.75 15H11.25C11.6642 15 12 14.6642 12 14.25C12 13.8358 11.6642 13.5 11.25 13.5H2.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-left-v4-0-0"; }
};
WppIconTextAlignmentLeft.style = wppIconCss$4;

const wppIconCss$3 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTextAlignmentRight = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-text-alignment-right", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6 4.25C6 3.83579 6.33579 3.5 6.75 3.5H17.25C17.6642 3.5 18 3.83579 18 4.25C18 4.66421 17.6642 5 17.25 5H6.75C6.33579 5 6 4.66421 6 4.25ZM2 9.25C2 8.83579 2.33579 8.5 2.75 8.5H17.25C17.6642 8.5 18 8.83579 18 9.25C18 9.66421 17.6642 10 17.25 10H2.75C2.33579 10 2 9.66421 2 9.25ZM9.75 13.5C9.33579 13.5 9 13.8358 9 14.25C9 14.6642 9.33579 15 9.75 15H17.25C17.6642 15 18 14.6642 18 14.25C18 13.8358 17.6642 13.5 17.25 13.5H9.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-text-alignment-right-v4-0-0"; }
};
WppIconTextAlignmentRight.style = wppIconCss$3;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUnderline = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-underline", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75V9C5 10.367 5.33884 11.7359 6.1606 12.7802C7.00313 13.8509 8.29163 14.5 10 14.5C11.7084 14.5 12.9969 13.8509 13.8394 12.7802C14.6612 11.7359 15 10.367 15 9V3.75C15 3.33579 14.6642 3 14.25 3C13.8358 3 13.5 3.33579 13.5 3.75V9C13.5 10.1434 13.2138 11.1495 12.6606 11.8526C12.1281 12.5293 11.2916 13 10 13C8.70837 13 7.87187 12.5293 7.3394 11.8526C6.78616 11.1495 6.5 10.1434 6.5 9V3.75ZM5.75 15.5C5.33579 15.5 5 15.8358 5 16.25C5 16.6642 5.33579 17 5.75 17H14.25C14.6642 17 15 16.6642 15 16.25C15 15.8358 14.6642 15.5 14.25 15.5H5.75Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-underline-v4-0-0"; }
};
WppIconUnderline.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUndo = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-undo", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M6 15.25C6 15.6642 6.33579 16 6.75 16H11.25C12.8365 16 13.9458 15.3788 14.78 14.4118C15.6009 13.4603 16 12.2164 16 11C16 9.78364 15.7009 8.53973 14.88 7.5882C14.0458 6.62123 12.8365 6 11.25 6H6.56066L8.78033 3.78033C9.07322 3.48744 9.07322 3.01256 8.78033 2.71967C8.48744 2.42678 8.01256 2.42678 7.71967 2.71967L4.21967 6.21967C4.07561 6.36373 3.99636 6.56019 4.00013 6.76388C4.0039 6.96757 4.09037 7.16097 4.23966 7.29959L7.73966 10.5496C8.04319 10.8314 8.51774 10.8139 8.7996 10.5103C9.08145 10.2068 9.06387 9.73226 8.76034 9.4504L6.6599 7.5H11.25C12.4135 7.5 13.1092 7.94127 13.65 8.56805C14.2041 9.21027 14.5 10.0914 14.5 11C14.5 11.9086 14.2041 12.7897 13.65 13.432C13.1092 14.0587 12.4135 14.5 11.25 14.5H6.75C6.33579 14.5 6 14.8358 6 15.25Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-undo-v4-0-0"; }
};
WppIconUndo.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconUnorderedList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-unordered-list", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M3.25 6.5C3.94036 6.5 4.5 5.94036 4.5 5.25C4.5 4.55964 3.94036 4 3.25 4C2.55964 4 2 4.55964 2 5.25C2 5.94036 2.55964 6.5 3.25 6.5ZM7 5.25C7 4.83579 7.33579 4.5 7.75 4.5H17.25C17.6642 4.5 18 4.83579 18 5.25C18 5.66421 17.6642 6 17.25 6H7.75C7.33579 6 7 5.66421 7 5.25ZM7.75 9.5C7.33579 9.5 7 9.83579 7 10.25C7 10.6642 7.33579 11 7.75 11H17.25C17.6642 11 18 10.6642 18 10.25C18 9.83579 17.6642 9.5 17.25 9.5H7.75ZM7.75 14.5C7.33579 14.5 7 14.8358 7 15.25C7 15.6642 7.33579 16 7.75 16H17.25C17.6642 16 18 15.6642 18 15.25C18 14.8358 17.6642 14.5 17.25 14.5H7.75ZM4.5 10.25C4.5 10.9404 3.94036 11.5 3.25 11.5C2.55964 11.5 2 10.9404 2 10.25C2 9.55964 2.55964 9 3.25 9C3.94036 9 4.5 9.55964 4.5 10.25ZM3.25 16.5C3.94036 16.5 4.5 15.9404 4.5 15.25C4.5 14.5596 3.94036 14 3.25 14C2.55964 14 2 14.5596 2 15.25C2 15.9404 2.55964 16.5 3.25 16.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-unordered-list-v4-0-0"; }
};
WppIconUnorderedList.style = wppIconCss;

exports.WppIconBlockquote = WppIconBlockquote;
exports.WppIconBold = WppIconBold;
exports.WppIconCodeView = WppIconCodeView;
exports.WppIconFloatCenter = WppIconFloatCenter;
exports.WppIconFloatLeft = WppIconFloatLeft;
exports.WppIconFloatRight = WppIconFloatRight;
exports.WppIconH1 = WppIconH1;
exports.WppIconH2 = WppIconH2;
exports.WppIconIndentDecrease = WppIconIndentDecrease;
exports.WppIconIndentIncrease = WppIconIndentIncrease;
exports.WppIconItalic = WppIconItalic;
exports.WppIconLink = WppIconLink;
exports.WppIconOrderedList = WppIconOrderedList;
exports.WppIconRedo = WppIconRedo;
exports.WppIconStrikeThrough = WppIconStrikeThrough;
exports.WppIconTextAlignmentCenter = WppIconTextAlignmentCenter;
exports.WppIconTextAlignmentJustify = WppIconTextAlignmentJustify;
exports.WppIconTextAlignmentLeft = WppIconTextAlignmentLeft;
exports.WppIconTextAlignmentRight = WppIconTextAlignmentRight;
exports.WppIconUnderline = WppIconUnderline;
exports.WppIconUndo = WppIconUndo;
exports.WppIconUnorderedList = WppIconUnorderedList;
