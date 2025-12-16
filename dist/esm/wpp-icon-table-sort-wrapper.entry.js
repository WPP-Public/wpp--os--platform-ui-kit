import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-fb733700.js';
import './consts-5bf9c29f.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableSortWrapper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.defaultColors = {
      unsorted: 'var(--wpp-grey-color-600)',
      unsortedHover: 'var(--wpp-grey-color-800)',
      unsortedPressed: 'var(--wpp-grey-color-800)',
      ascendingUp: 'var(--wpp-grey-color-800)',
      ascendingDown: 'var(--wpp-grey-color-400)',
      ascendingDownHover: 'var(--wpp-grey-color-500)',
      ascendingDownPressed: 'var(--wpp-grey-color-600)',
      descendingUp: 'var(--wpp-grey-color-400)',
      descendingUpHover: 'var(--wpp-grey-color-500)',
      descendingUpPressed: 'var(--wpp-grey-color-600)',
      descendingDown: 'var(--wpp-grey-color-800)',
    };
    this.onMouseEnter = () => {
      this.isHoveredState = true;
    };
    this.onMouseLeave = () => {
      this.isHoveredState = false;
      this.isPressedState = false;
    };
    this.onMouseDown = () => {
      this.isPressedState = true;
    };
    this.onMouseUp = () => {
      this.isPressedState = false;
    };
    this.colorMap = {
      none: {
        pressed: (c) => ({ up: c.unsortedPressed, down: c.unsortedPressed }),
        hover: (c) => ({ up: c.unsortedHover, down: c.unsortedHover }),
        default: (c) => ({ up: c.unsorted, down: c.unsorted }),
      },
      ascending: {
        pressed: (c) => ({ up: c.ascendingUp, down: c.ascendingDownPressed }),
        hover: (c) => ({ up: c.ascendingUp, down: c.ascendingDownHover }),
        default: (c) => ({ up: c.ascendingUp, down: c.ascendingDown }),
      },
      descending: {
        pressed: (c) => ({ up: c.descendingUpPressed, down: c.descendingDown }),
        hover: (c) => ({ up: c.descendingUpHover, down: c.descendingDown }),
        default: (c) => ({ up: c.descendingUp, down: c.descendingDown }),
      },
    };
    this.iconMap = {
      none: {
        pressed: 'wpp-icon-table-sort-pressed',
        hover: 'wpp-icon-table-sort-hover',
        default: 'wpp-icon-table-sort',
      },
      ascending: {
        pressed: 'wpp-icon-table-sort-asc-pressed',
        hover: 'wpp-icon-table-sort-asc-hover',
        default: 'wpp-icon-table-sort-asc',
      },
      descending: {
        pressed: 'wpp-icon-table-sort-desc-pressed',
        hover: 'wpp-icon-table-sort-desc-hover',
        default: 'wpp-icon-table-sort-desc',
      },
    };
    this.isHoveredState = false;
    this.isPressedState = false;
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.direction = 'none';
    this.interactive = true;
    this.colors = undefined;
    this.isHovered = undefined;
    this.isPressed = undefined;
  }
  componentDidLoad() {
    if (this.interactive) {
      this.host.addEventListener('mouseenter', this.onMouseEnter);
      this.host.addEventListener('mouseleave', this.onMouseLeave);
      this.host.addEventListener('mousedown', this.onMouseDown);
      this.host.addEventListener('mouseup', this.onMouseUp);
    }
  }
  disconnectedCallback() {
    if (this.interactive) {
      this.host.removeEventListener('mouseenter', this.onMouseEnter);
      this.host.removeEventListener('mouseleave', this.onMouseLeave);
      this.host.removeEventListener('mousedown', this.onMouseDown);
      this.host.removeEventListener('mouseup', this.onMouseUp);
    }
  }
  getCurrentState() {
    if (!this.interactive)
      return 'default';
    const pressed = this.isPressed ?? this.isPressedState;
    const hovered = this.isHovered ?? this.isHoveredState;
    if (pressed)
      return 'pressed';
    if (hovered)
      return 'hover';
    return 'default';
  }
  getArrowColors(direction, state) {
    const c = { ...this.defaultColors, ...(this.colors || {}) };
    const directionMap = this.colorMap[direction] || this.colorMap.none;
    const stateHandler = directionMap[state] || directionMap.default;
    return stateHandler(c);
  }
  getIconTag(direction, state) {
    const directionMap = this.iconMap[direction] || this.iconMap.none;
    if (!directionMap) {
      console.warn(`Unknown sort direction: ${direction}. Defaulting to 'none'.`);
      return this.iconMap.none.default;
    }
    return directionMap[state] || directionMap.default;
  }
  getIconComponent() {
    const direction = this.direction;
    const state = this.getCurrentState();
    const colors = this.getArrowColors(direction, state);
    const iconTag = this.getIconTag(direction, state);
    return h(transformToVersionedTag(iconTag), {
      size: this.size,
      width: this.width,
      height: this.height,
      upArrowColor: colors.up,
      downArrowColor: colors.down,
    });
  }
  render() {
    return h(Host, null, this.getIconComponent());
  }
  static get registryIs() { return "wpp-icon-table-sort-wrapper-v3-4-0"; }
  get host() { return getElement(this); }
};
WppIconTableSortWrapper.style = wppIconCss;

export { WppIconTableSortWrapper as wpp_icon_table_sort_wrapper };
