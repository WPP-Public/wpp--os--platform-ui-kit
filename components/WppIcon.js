import { h, Host } from '@stencil/core/internal/client';

const ICON_SIZE_FOR_S = 16;
const ICON_SIZE_FOR_M = 20;
const sizeConfig = {
  s: ICON_SIZE_FOR_S,
  m: ICON_SIZE_FOR_M,
};
const WppIcon = ({ width, height, size, initialViewBoxNumber = 20, color, name, viewBoxX = 0, viewBoxY = 0, ariaLabel }, children) => {
  const iconHeight = height || width || sizeConfig[size];
  const iconWidth = width || sizeConfig[size];
  const style = {};
  if (color) {
    style['--wpp-prop-icon-color'] = color;
  }
  return (h(Host, { style: style, class: { 'wpp-icon': true, [name]: true }, "data-testid": name },
    h("svg", { width: iconWidth, height: iconHeight, viewBox: `${viewBoxX} ${viewBoxY} ${initialViewBoxNumber} ${initialViewBoxNumber}`, fill: "none", role: !ariaLabel ? 'presentation' : 'img', "aria-hidden": !ariaLabel ? 'true' : undefined, "aria-label": !ariaLabel ? undefined : ariaLabel }, children)));
};

export { WppIcon as W };
