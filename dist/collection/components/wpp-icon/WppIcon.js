import { h, Host } from '@stencil/core';
const ICON_SIZE_FOR_S = 16;
const ICON_SIZE_FOR_M = 20;
const sizeConfig = {
  s: ICON_SIZE_FOR_S,
  m: ICON_SIZE_FOR_M,
};
export const WppIcon = ({ width, height, size, initialViewBoxNumber = 20, color, name, viewBoxX = 0, viewBoxY = 0, ariaLabel }, children) => {
  const iconHeight = height || width || sizeConfig[size];
  const iconWidth = width || sizeConfig[size];
  const style = {};
  if (color) {
    style['--wpp-prop-icon-color'] = color;
  }
  return (h(Host, { style: style, class: { 'wpp-icon': true, [name]: true } }, h("svg", { width: iconWidth, height: iconHeight, viewBox: `${viewBoxX} ${viewBoxY} ${initialViewBoxNumber} ${initialViewBoxNumber}`, fill: "none", role: "img" }, h("title", null, ariaLabel || name), children)));
};
