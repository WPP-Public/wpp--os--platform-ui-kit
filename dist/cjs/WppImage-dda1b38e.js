'use strict';

const index = require('./index-ecf423ba.js');

const WppImage = ({ name, width, height, viewBoxX = 0, viewBoxY = 0, viewBoxWidth = 100, viewBoxHeight = 100 }, children) => {
  const imageWidth = width || height;
  const imageHeight = height || width || 'auto';
  return (index.h(index.Host, { class: { 'wpp-image': true, [name]: true } },
    index.h("svg", { width: imageWidth, height: imageHeight, viewBox: `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`, fill: "none", role: "img" }, children)));
};

exports.WppImage = WppImage;
