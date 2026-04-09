import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as lodash } from './lodash.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$1 } from './wpp-icon-transparent2.js';

const DEFAULT_VALUE_RGBA = 'rgba(217, 217, 217, 1)';
const DEFAULT_VALUE_HEX = '#D9D9D9';
const MAXIMUM_NUMBER_OF_SAVED_COLORS = 33;
const RGB_INPUTS = ['red', 'green', 'blue'];
const RGB_INPUT_CONFIG = {
  decimalPatternOptions: {
    min: 0,
    max: 255,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
};
const OPACITY_INPUT_CONFIG = {
  decimalPatternOptions: {
    min: 0,
    max: 100,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    postfix: '%',
  },
};
const defaultDropdownConfig = {
  trigger: 'manual',
  hideOnClick: false,
  placement: 'bottom-start',
  maxWidth: '378px',
  offset: [0, 4],
  zIndex: Z_INDEX.COLOR_PICKER,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  },
};
const DEFAULT_THEME_SECTIONS = [
  {
    keys: ['primary'],
    title: 'Brand Primary',
  },
  {
    keys: ['grey'],
    title: 'Grey',
  },
  {
    keys: ['dataviz-cat'],
    title: 'Categorical',
  },
  {
    keys: ['dataviz-seq'],
    title: 'Sequential',
  },
  {
    keys: ['danger', 'warning', 'success', 'highlight'],
    title: 'System',
  },
];
const rgbaToHex = (rgba) => {
  const rgbaValues = rgba.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*(?:\.\d+)?)\s*)?\)/);
  if (!rgbaValues) {
    console.warn(`Invalid RGBA string format. Trying to convert ${rgba} to hex`);
    return { hexValue: DEFAULT_VALUE_HEX, opacity: '100%' };
  }
  const r = parseInt(rgbaValues[1], 10);
  const g = parseInt(rgbaValues[2], 10);
  const b = parseInt(rgbaValues[3], 10);
  const a = parseFloat(rgbaValues[4]);
  const toHex = (component) => {
    const hex = Math.round(component).toString(16).padStart(2, '0');
    return hex.toUpperCase();
  };
  return {
    hexValue: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
    opacity: `${Math.round(a * 100)}%`,
  };
};
const hexToRGBA = (color) => {
  const r = parseInt(color.hexValue.substring(1, 3), 16);
  const g = parseInt(color.hexValue.substring(3, 5), 16);
  const b = parseInt(color.hexValue.substring(5, 7), 16);
  const opacityValue = color.opacity.replace('%', '');
  return `rgba(${r}, ${g}, ${b}, ${parseFloat(opacityValue) / 100})`;
};
function isValidRgba(rgba) {
  const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/;
  const match = rgba.match(rgbaRegex);
  if (!match) {
    return false;
  }
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  if (r > 255 || g > 255 || b > 255) {
    return false;
  }
  if (match[4] === undefined)
    return false;
  const a = parseFloat(match[4]);
  if (isNaN(a) || a < 0 || a > 1) {
    return false;
  }
  return true;
}
const isValid6DigitHex = (hex) => /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(hex);
const isValid8DigitHex = (hex) => /^#([A-Fa-f0-9]{3}){1,2}([A-Fa-f0-9]{2})?$/.test(hex);
const getNestedValue = (obj, keyString) => keyString.split('-').reduce((acc, keyItem) => {
  if (acc && acc[keyItem]) {
    return acc[keyItem];
  }
  return undefined;
}, obj);
const getValuesFrom8DigitHex = (colorValue) => {
  const hexValue = colorValue.substring(0, 7);
  const opacity = parseInt(colorValue.substring(7, 9), 16);
  return {
    hexValue,
    opacity: `${Math.round((opacity / 255) * 100)}%`,
  };
};
const THEME_VARIABLES = [
  {
    title: 'Brand Primary',
    sections: [
      {
        key: 'primary-color',
        range: ['100', '800'],
      },
    ],
  },
  {
    title: 'Grey',
    sections: [
      {
        key: 'grey-color',
        range: ['000', '1000'],
      },
    ],
  },
  {
    title: 'Categorical',
    sections: [
      {
        key: 'dataviz-color-cat-dark',
        range: ['1', '10'],
      },
      {
        key: 'dataviz-color-cat-neutral',
        range: ['1', '10'],
      },
      {
        key: 'dataviz-color-cat-light',
        range: ['1', '10'],
      },
    ],
  },
  {
    title: 'Sequential',
    sections: [
      {
        key: 'dataviz-color-seq-brand',
        range: ['100', '1000'],
      },
      {
        key: 'dataviz-color-seq-grey',
        range: ['100', '1000'],
      },
      {
        key: 'dataviz-color-seq-negative',
        range: ['100', '1000'],
      },
      {
        key: 'dataviz-color-seq-positive',
        range: ['100', '1000'],
      },
      {
        key: 'dataviz-color-seq-warning',
        range: ['100', '1000'],
      },
    ],
  },
  {
    title: 'System',
    sections: [
      {
        key: 'danger-color',
        range: ['100', '600'],
      },
      {
        key: 'warning-color',
        range: ['200', '500'],
      },
      {
        key: 'success-color',
        range: ['200', '500'],
      },
      {
        key: 'highlight-color',
        range: ['200', '400'],
      },
    ],
  },
];
/**
 * This function is used to get the default theme data applied on a page. The returning
 * object represents a matrix with data for each color section.
 */
const getColorsFromThemeOnPage = (host) => {
  const colorValues = [];
  THEME_VARIABLES.forEach((themeSection) => {
    const colorValuesOfSection = [];
    const hostComputedStyles = getComputedStyle(host);
    themeSection.sections.forEach((colorSection) => {
      const colorValuesOfSubSection = [];
      const indexStart = parseInt(colorSection.range[0]);
      const indexEnd = parseInt(colorSection.range[1]);
      const increment = colorSection.key.includes('dataviz-color-cat') ? 1 : 100;
      for (let index = indexStart; index <= indexEnd; index += increment) {
        let variableName = '--wpp-' + colorSection.key;
        if (index === 0) {
          variableName += '-000';
        }
        else {
          variableName += `-${index}`;
        }
        const variableValue = hostComputedStyles.getPropertyValue(variableName);
        if (variableValue) {
          if (isValid6DigitHex(variableValue)) {
            colorValuesOfSubSection.push({
              hexValue: variableValue,
              opacity: '100%',
            });
          }
          else if (isValid8DigitHex(variableValue)) {
            colorValuesOfSubSection.push(getValuesFrom8DigitHex(variableValue));
          }
          else if (isValidRgba(variableValue)) {
            colorValuesOfSubSection.push(rgbaToHex(variableValue));
          }
        }
      }
      if (colorValuesOfSubSection.length > 0) {
        colorValuesOfSection.push(colorValuesOfSubSection);
      }
    });
    colorValues.push({ title: themeSection.title, colors: colorValuesOfSection });
  });
  return colorValues;
};
/**
 * This function is used to transform the theme object passed to the component. The returning
 * object represents a matrix with data for each color section.
 */
const getColorsForSections = (themeColors) => {
  const colorValues = [];
  DEFAULT_THEME_SECTIONS.forEach((themeSection) => {
    const colorValuesOfSection = [];
    const traverseObject = (colorObj) => {
      const colorValuesOfSubSection = [];
      Object.keys(colorObj).forEach(key => {
        const value = colorObj[key];
        if (typeof value === 'object' && value !== null) {
          traverseObject(value);
        }
        else if (typeof value === 'string') {
          if (isValid6DigitHex(value)) {
            colorValuesOfSubSection.push({
              hexValue: value,
              opacity: '100%',
            });
          }
          else if (isValid8DigitHex(value)) {
            colorValuesOfSubSection.push(getValuesFrom8DigitHex(value));
          }
          else if (isValidRgba(value)) {
            colorValuesOfSubSection.push(rgbaToHex(value));
          }
          else {
            console.warn(`Theme color: ${value} is not a valid color value`);
          }
        }
      });
      if (colorValuesOfSubSection.length > 0) {
        colorValuesOfSection.push(colorValuesOfSubSection);
      }
    };
    if (themeSection.keys) {
      themeSection.keys.forEach((key) => {
        const themeSectionValues = getNestedValue(themeColors, key);
        if (themeSectionValues) {
          traverseObject(themeSectionValues);
        }
      });
    }
    if (themeSection.title === 'Grey') {
      // We need to do this because, for some reason, grey-000 is found at the end of the object
      // when traversing it, and it should be at the beginning.
      const poppedColor = colorValuesOfSection[0].pop();
      if (poppedColor) {
        colorValuesOfSection[0].unshift(poppedColor);
      }
    }
    colorValues.push({ title: themeSection.title, colors: colorValuesOfSection });
  });
  return colorValues;
};
const hexToRgb = (hex) => {
  const hexValue = hex.replace(/^#/, '');
  if (hexValue.length === 6) {
    const red = parseInt(hexValue.substring(0, 2), 16);
    const green = parseInt(hexValue.substring(2, 4), 16);
    const blue = parseInt(hexValue.substring(4, 6), 16);
    return { red, green, blue };
  }
  console.warn(`Invalid hex color format: ${hex}. Must be 6 characters.`);
  return { red: 0, green: 0, blue: 0 };
};
const luminance = (r, g, b) => {
  const rgb = [r, g, b].map(c => {
    const cNorm = c / 255;
    return cNorm <= 0.03928 ? cNorm / 12.92 : Math.pow((cNorm + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};
const contrastWithWhite = (hex) => {
  const rgb = hexToRgb(hex);
  const luminanceColor = luminance(rgb.red, rgb.green, rgb.blue);
  const luminanceWhite = 1;
  const contrastRatio = (luminanceWhite + 0.05) / (luminanceColor + 0.05);
  return parseFloat(contrastRatio.toFixed(2));
};
const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0, s = 0, v = max;
  if (delta !== 0) {
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  s = max === 0 ? 0 : delta / max;
  s = Math.round(s * 100);
  v = Math.round(v * 100);
  return { h, s, v };
};
function hexToHsv(hex) {
  const { red, green, blue } = hexToRgb(hex);
  return rgbToHsv(red, green, blue);
}
const hsvToRgb = (h, s, v) => {
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let rPrime = 0, gPrime = 0, bPrime = 0;
  if (0 <= h && h < 60) {
    rPrime = c;
    gPrime = x;
    bPrime = 0;
  }
  else if (60 <= h && h < 120) {
    rPrime = x;
    gPrime = c;
    bPrime = 0;
  }
  else if (120 <= h && h < 180) {
    rPrime = 0;
    gPrime = c;
    bPrime = x;
  }
  else if (180 <= h && h < 240) {
    rPrime = 0;
    gPrime = x;
    bPrime = c;
  }
  else if (240 <= h && h < 300) {
    rPrime = x;
    gPrime = 0;
    bPrime = c;
  }
  else if (300 <= h && h <= 360) {
    rPrime = c;
    gPrime = 0;
    bPrime = x;
  }
  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);
  return { r, g, b };
};
const rgbToHex = (r, g, b) => {
  const toHex = (x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};
function hsvToHex(h, s, v) {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

const wppOpacitySliderCss = ":host{position:relative;display:block;height:16px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .slider-container{position:relative;width:100%;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .checkerboard{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;border-radius:32px;overflow:hidden}:host canvas{position:absolute;top:0;left:0;width:100%;height:100%;border-radius:32px;display:block;z-index:1}:host .marker{position:absolute;width:16px;height:16px;border:3px solid var(--wpp-grey-color-000);border-radius:50%;background-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);box-shadow:0px 1px 5px 0px rgba(52, 58, 63, 0.1019607843), 0px 0px 1px 0px rgba(52, 58, 63, 0.1019607843);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);pointer-events:none;top:50%;left:calc(var(--marker-position) - 8px);z-index:2}";

const OpacitySlider = /*@__PURE__*/ proxyCustomElement(class OpacitySlider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.opacityChanged = createEvent(this, "opacityChanged", 1);
    this.isDragging = false;
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.setupCanvas = () => {
      const canvasWidth = 290;
      const canvasHeight = 16;
      this.canvas.width = canvasWidth * this.devicePixelRatio;
      this.canvas.height = canvasHeight * this.devicePixelRatio;
      this.canvas.style.width = `${canvasWidth}px`;
      this.canvas.style.height = `${canvasHeight}px`;
      const ctx = this.canvas.getContext('2d');
      if (ctx)
        ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    };
    this.drawOpacitySlider = () => {
      const ctx = this.canvas.getContext('2d');
      if (!ctx)
        return;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const rgb = hexToRgb(this.hexColor);
      const gradient = ctx.createLinearGradient(0, 0, this.canvas.width / this.devicePixelRatio, 0);
      gradient.addColorStop(0, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`);
      gradient.addColorStop(1, `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 1)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.canvas.width / this.devicePixelRatio, this.canvas.height / this.devicePixelRatio);
    };
    this.updateMarkerPosition = () => {
      const rect = this.canvas.getBoundingClientRect();
      const position = this.opacity * rect.width;
      this.markerPosition = lodash.clamp(position, 8, rect.width - 8);
    };
    this.handleMouseDown = (event) => {
      this.isDragging = true;
      event.preventDefault();
      this.updateOpacity(event);
    };
    this.handleMouseUp = () => {
      this.isDragging = false;
    };
    this.handleMouseMove = (event) => {
      if (this.isDragging) {
        event.preventDefault();
        window.requestAnimationFrame(() => this.updateOpacity(event));
      }
    };
    this.updateOpacity = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const xRaw = event.clientX - rect.left;
      const xClamped = lodash.clamp(xRaw, 0, rect.width);
      const newOpacity = xClamped / rect.width;
      this.opacityChanged.emit(newOpacity);
      this.markerPosition = lodash.clamp(xClamped, 8, rect.width - 8);
    };
    this.hexColor = undefined;
    this.opacity = 1;
    this.markerPosition = 8;
  }
  onPropertyChange() {
    this.updateMarkerPosition();
    this.drawOpacitySlider();
  }
  componentDidLoad() {
    this.canvas = this.host.shadowRoot?.querySelector('canvas');
    this.setupCanvas();
    this.drawOpacitySlider();
    this.updateMarkerPosition();
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
  }
  render() {
    return (h(Host, { class: "wpp-opacity-slider" }, h("div", { class: "slider-container" }, h("wpp-icon-transparent-v3-6-0", { class: "checkerboard" }), h("canvas", null), h("div", { class: "marker", style: {
        left: `${this.markerPosition}px`,
      } }))));
  }
  static get registryIs() { return "wpp-opacity-slider-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "hexColor": ["onPropertyChange"],
    "opacity": ["onPropertyChange"]
  }; }
  static get style() { return wppOpacitySliderCss; }
}, [1, "wpp-opacity-slider", "wpp-opacity-slider-v3-6-0", {
    "hexColor": [1, "hex-color"],
    "opacity": [2],
    "markerPosition": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-opacity-slider-v3-6-0", "wpp-icon-transparent-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-opacity-slider-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, OpacitySlider);
      }
      break;
    case "wpp-icon-transparent-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { DEFAULT_VALUE_HEX as D, MAXIMUM_NUMBER_OF_SAVED_COLORS as M, OPACITY_INPUT_CONFIG as O, RGB_INPUTS as R, isValidRgba as a, hexToRgb as b, hexToHsv as c, defaultDropdownConfig as d, hexToRGBA as e, rgbToHex as f, DEFAULT_VALUE_RGBA as g, hsvToHex as h, isValid6DigitHex as i, getColorsForSections as j, getColorsFromThemeOnPage as k, RGB_INPUT_CONFIG as l, contrastWithWhite as m, defineCustomElement as n, OpacitySlider as o, rgbaToHex as r };
