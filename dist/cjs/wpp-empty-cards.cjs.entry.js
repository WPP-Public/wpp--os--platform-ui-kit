'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const EmptyStateGraphicView = require('./EmptyStateGraphicView-e80f5b04.js');
require('./theme-observer-4179316e.js');

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex;position:relative}.wpp-empty-state-animation{display:block;}.wpp-empty-state-animation image{-webkit-filter:url(\"#wpp-empty-state-shadow-tint\");filter:url(\"#wpp-empty-state-shadow-tint\")}.wpp-empty-state-tint{flood-color:var(--wpp-empty-state-shadow-color, transparent)}.wpp-empty-state-skeleton{position:absolute;inset:0}.wpp-empty-state-defs{position:absolute;width:0;height:0}";

const WppEmptyCards = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.graphic = new EmptyStateGraphicView.EmptyStateGraphic('wpp-empty-cards');
    this.width = undefined;
    this.height = undefined;
  }
  connectedCallback() {
    this.graphic.connect(this.host);
  }
  disconnectedCallback() {
    this.graphic.disconnect();
  }
  render() {
    return (index.h(EmptyStateGraphicView.EmptyStateGraphicView, { graphic: this.graphic, name: "wpp-empty-cards", width: this.width, height: this.height }));
  }
  static get registryIs() { return "wpp-empty-cards-v4-4-0"; }
  get host() { return index.getElement(this); }
};
WppEmptyCards.style = wppImageCss;

exports.wpp_empty_cards = WppEmptyCards;
