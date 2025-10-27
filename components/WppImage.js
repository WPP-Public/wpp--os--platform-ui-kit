import { h, Host } from '@stencil/core/internal/client';

const WppImage = ({ name, width, height, viewBoxX = 0, viewBoxY = 0, viewBoxWidth = 100, viewBoxHeight = 100 }, children) => {
  const imageWidth = width || height;
  const imageHeight = height || width || 'auto';
  return (h(Host, { class: { 'wpp-image': true, [name]: true } },
    h("svg", { width: imageWidth, height: imageHeight, viewBox: `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`, fill: "none", role: "img" }, children)));
};

export { WppImage as W };
