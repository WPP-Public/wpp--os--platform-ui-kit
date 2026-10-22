'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const utils = require('./utils-a3ab9816.js');
require('./consts-d8f5ef98.js');

const LOCALES_DEFAULTS = {
  quoteAction: 'Quote',
  pinAction: 'Pin',
  unpinAction: 'Unpin',
  copyAction: 'Copy',
  copiedAction: 'Copied',
  downloadAction: 'Download',
  moreActionsLabel: 'More actions',
  closeAction: 'Close',
  resizeHandleLabel: 'Resize artefact',
  versionSelectorLabel: 'Version',
  bodyLabel: 'Artefact content',
};
const DEFAULT_TITLE_ICON = 'wpp-icon-document';
const PIN_ACTION_ID = 'pin';
const COPY_ACTION_ID = 'copy';
// While the Copy action confirms a copy, as in chat messages: a checkmark, and `copiedAction` as its label
const COPIED_ICON = 'wpp-icon-done';
// How long, in milliseconds, the Copy action confirms a copy before it shows Copy again
const COPIED_CONFIRMATION_TIMEOUT = 3000;
// Minimum width of the artefact, in pixels, exposed by the resize handle and reached with the Home key.
// Keep it in sync with `--fa-min-width` in `wpp-focus-artefact.scss`, which applies it to the layout.
const MIN_WIDTH = 440;
// Width, in pixels, that each Arrow key press on the resize handle adds to or removes from the artefact
const RESIZE_KEYBOARD_STEP = 10;
// The width each key asks for once the resize handle is focused, from the artefact's width: a number of pixels, or
// `100%`. The stylesheet and the layout bound it, so End asks for the whole container to get the widest width allowed.
const RESIZE_KEY_WIDTHS = new Map([
  ['ArrowLeft', width => width + RESIZE_KEYBOARD_STEP],
  ['ArrowRight', width => width - RESIZE_KEYBOARD_STEP],
  ['Home', () => MIN_WIDTH],
  ['End', () => '100%'],
]);
// While the pin is on, its icon shows that state and its label (`unpinAction`) names what a click does
const PINNED_ICON = 'wpp-icon-pinned';
// The menus render their items in a popup appended to <body>, out of reach of the component's styles
const MENU_LIST_STYLE = { display: 'flex', flexDirection: 'column', gap: '4px' };
/**
 * The actions always rendered in the header, in the order of the design.
 */
const getDefaultActions = (locales) => [
  { id: 'quote', icon: 'wpp-icon-blockquote', label: locales.quoteAction },
  { id: PIN_ACTION_ID, icon: 'wpp-icon-unpinned', label: locales.pinAction },
  { id: COPY_ACTION_ID, icon: 'wpp-icon-copy', label: locales.copyAction },
  { id: 'download', icon: 'wpp-icon-download', label: locales.downloadAction },
];

const wppFocusArtefactCss = ":host{--fa-bg-color:var(--wpp-grey-color-000);--fa-body-bg-color:var(--wpp-grey-color-100);--fa-border-color:var(--wpp-grey-color-300);--fa-resize-handle-color:var(--wpp-brand-color);--fa-header-gap:24px;--fa-title-gap:10px;--fa-actions-wrapper-gap:12px;--fa-actions-gap:4px;--fa-header-padding:0 16px;--fa-width:100%;--fa-min-width:440px;--fa-header-height:64px;--fa-resize-handle-width:6px;--fa-resize-divider-width:2px;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--fa-width);height:100%;min-width:var(--fa-min-width);max-width:100%;contain:inline-size;background-color:var(--fa-bg-color);border:var(--wpp-border-width-s) solid var(--fa-border-color)}.resize-handle{position:absolute;top:0;left:0;z-index:1;width:var(--fa-resize-handle-width);height:100%;cursor:ew-resize;-ms-touch-action:none;touch-action:none}.resize-handle:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.resize-handle::before{position:absolute;top:0;left:0;width:var(--fa-resize-divider-width);height:100%;background-color:transparent;-webkit-transition:background-color 0.15s ease-in-out;transition:background-color 0.15s ease-in-out;content:\"\"}.resize-handle:hover::before,.resize-handle:active::before{background-color:var(--fa-resize-handle-color)}.resize-handle:focus-visible:hover::before,.resize-handle:focus-visible:active::before{background-color:transparent}.header{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:var(--fa-header-gap);-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--fa-header-height);padding:var(--fa-header-padding)}.title-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:var(--fa-title-gap);min-width:0}.title-wrapper .title-icon{-ms-flex-negative:0;flex-shrink:0}.title-wrapper .title-tooltip{min-width:0}.title-wrapper .title-tooltip::part(anchor){width:100%}.title-wrapper .title{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.title-wrapper .version-selector{--wpp-mc-wrapper-width:fit-content;-ms-flex-negative:0;flex-shrink:0}.actions-wrapper{display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;gap:var(--fa-actions-wrapper-gap)}.actions-wrapper .actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:var(--fa-actions-gap)}.divider{-ms-flex-negative:0;flex-shrink:0}.body{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow-y:auto;background-color:var(--fa-body-bg-color);scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.body::-webkit-scrollbar{width:4px;height:4px}.body::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.body:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}";

const WppFocusArtefact = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppActionClick = index.createEvent(this, "wppActionClick", 1);
    this.wppVersionSelect = index.createEvent(this, "wppVersionSelect", 1);
    this.wppClose = index.createEvent(this, "wppClose", 1);
    this.wppResize = index.createEvent(this, "wppResize", 1);
    this.resizeStartX = 0;
    this.resizeStartWidth = 0;
    this.titleTooltipConfig = {
      placement: 'top',
      onShow: () => {
        if (!this.titleRef || this.titleRef.clientWidth >= this.titleRef.scrollWidth)
          return false;
      },
    };
    this.moreMenuConfig = {
      placement: 'bottom-start',
      onShow: () => {
        this.isMoreMenuOpen = true;
      },
      onHide: () => {
        this.isMoreMenuOpen = false;
      },
    };
    this.versionMenuConfig = {
      placement: 'bottom-start',
      onShow: () => {
        this.isVersionMenuOpen = true;
      },
      onHide: () => {
        this.isVersionMenuOpen = false;
      },
    };
    this.isPinAction = (action) => action.id === PIN_ACTION_ID;
    this.isCopyAction = (action) => action.id === COPY_ACTION_ID;
    this.handleActionClick = (action) => {
      if (!this.isPinAction(action)) {
        this.wppActionClick.emit(action);
        if (this.isCopyAction(action))
          this.confirmCopy();
        return;
      }
      this.isPinned = !this.isPinned;
      this.wppActionClick.emit({ ...action, isActive: this.isPinned });
    };
    this.handleMenuActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    // Picking the version already selected changes nothing, so it emits nothing either
    this.handleVersionSelect = (version) => {
      if (version.id === this.selectedVersion?.id)
        return;
      this.selectedVersionId = version.id;
      this.wppVersionSelect.emit(version);
    };
    this.handleClose = () => {
      this.wppClose.emit();
    };
    // The body keeps its size when its content grows, so the content is observed too: each element in the slot, again
    // whenever the slot's content changes
    this.observeBody = () => {
      if (!this.bodyRef)
        return;
      const observer = new ResizeObserver(this.updateBodyScrollable);
      this.bodyObserver?.disconnect();
      this.bodyObserver = observer;
      observer.observe(this.bodyRef);
      Array.from(this.host.children)
        .filter(child => child.getAttribute('slot') === 'body')
        .forEach(element => observer.observe(element));
      this.updateBodyScrollable();
    };
    this.updateBodyScrollable = () => {
      if (!this.bodyRef)
        return;
      this.isBodyScrollable = this.bodyRef.scrollHeight > this.bodyRef.clientHeight;
    };
    this.measureHostWidth = () => this.host.offsetWidth;
    // The parent's content box, the one a percentage `width` resolves against
    this.measureParentWidth = () => {
      const parent = this.layoutParent;
      if (!parent)
        return 0;
      const { paddingLeft, paddingRight } = window.getComputedStyle(parent);
      return Math.round((parent.clientWidth || 0) - (parseFloat(paddingLeft) || 0) - (parseFloat(paddingRight) || 0));
    };
    // The widest width is the one the artefact renders at when it fills its parent, measured before the browser paints.
    // The width set before is restored as is, so a drag in progress keeps its width.
    this.measureBounds = () => {
      const width = this.host.style.getPropertyValue('--fa-width');
      this.setWidthVar('100%');
      this.maxResizeWidth = this.measureHostWidth();
      this.setWidthVar(width || undefined);
      this.currentWidth = this.measureHostWidth();
    };
    // A number, or a number given as a string (e.g. from an attribute), is a number of pixels. Any other string is passed
    // as is, so the stylesheet resolves a percentage or a `calc()` against the parent.
    this.setWidthVar = (value) => {
      if (value === undefined) {
        this.host.style.removeProperty('--fa-width');
        return;
      }
      const length = String(value).trim();
      // A number of pixels is capped at the container: unlike plain pixels, `min()` with a percentage never makes a
      // container sized by its content (e.g. a `1fr` grid track) grow, so the stylesheet and the layout keep bounding it
      this.host.style.setProperty('--fa-width', isNaN(Number(length)) ? length : `min(${length}px, 100%)`);
    };
    this.applyWidth = () => this.setWidthVar(this.width);
    this.toPercentage = (pixels, parentWidth) => `${Math.round((pixels / parentWidth) * 10000) / 100}%`;
    // Keeps the width the artefact renders at once bounded, in the unit `width` was given in. When that's the width it
    // started at (e.g. the resize went past a bound), nothing changed, so the width the props give is restored.
    this.endResize = (startWidth) => {
      const width = this.measureHostWidth();
      if (width === startWidth) {
        this.applyWidth();
        return;
      }
      const isPercentage = typeof this.width === 'string' && this.width.trim().endsWith('%');
      const parentWidth = isPercentage ? this.measureParentWidth() : 0;
      // Set here too, as the width watcher doesn't run when the new value equals the old one
      this.currentWidth = width;
      this.width = parentWidth ? this.toPercentage(width, parentWidth) : width;
      this.wppResize.emit({ width: this.width });
    };
    this.handleResizeStart = (event) => {
      // Only the primary (left) button starts a resize; ignore right / middle clicks.
      if (event.button !== 0)
        return;
      event.preventDefault();
      this.resizeStartX = event.clientX;
      this.resizeStartWidth = this.measureHostWidth();
      // Sends the pointer events to the handle until the button is released, wherever the pointer goes, even outside
      // the window
      const handle = event.currentTarget;
      handle.setPointerCapture(event.pointerId);
    };
    this.handleResizeMove = (event) => {
      // Only a drag holds the pointer captured: moving over the handle without one does nothing
      if (!event.currentTarget.hasPointerCapture(event.pointerId))
        return;
      // The handle is on the left border, so dragging it to the left widens the artefact
      this.setWidthVar(this.resizeStartWidth + this.resizeStartX - event.clientX);
    };
    this.handleResizeEnd = () => {
      this.endResize(this.resizeStartWidth);
    };
    this.handleResizeKeyDown = (event) => {
      const getNextWidth = RESIZE_KEY_WIDTHS.get(event.key);
      if (!getNextWidth)
        return;
      event.preventDefault();
      // The layout may have changed since the handle was focused
      const width = this.measureHostWidth();
      // At a bound, the width stays as it was, so the key in that direction does nothing
      this.setWidthVar(getNextWidth(width));
      this.endResize(width);
    };
    this.isPinned = false;
    this.isMoreMenuOpen = false;
    this.isBodyScrollable = false;
    this.isVersionMenuOpen = false;
    this.isCopied = false;
    this.currentWidth = 0;
    this.maxResizeWidth = 0;
    this.artefactTitle = 'Title';
    this.titleIcon = DEFAULT_TITLE_ICON;
    this.menuActions = [];
    this.versions = [];
    this.selectedVersionId = undefined;
    this.locales = {};
    this.ariaProps = {};
    this.width = undefined;
  }
  // A new width changes the layout, so the handle measures it again to expose the new values
  onWidthChange() {
    this.applyWidth();
    this.measureBounds();
  }
  connectedCallback() {
    const parent = this.layoutParent;
    this.parentObserver = new ResizeObserver(this.measureBounds);
    if (parent)
      this.parentObserver.observe(parent);
    if (this.bodyRef)
      this.observeBody();
  }
  // Applied before the first render, so the artefact appears at the width it's given
  componentWillLoad() {
    this.applyWidth();
  }
  componentDidLoad() {
    this.measureBounds();
    this.observeBody();
  }
  disconnectedCallback() {
    this.parentObserver?.disconnect();
    this.bodyObserver?.disconnect();
    this.bodyObserver = undefined;
    clearTimeout(this.copiedResetTimer);
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  // The element the artefact is laid out in, which a percentage `width` resolves against: its parent, or, when it's
  // slotted into another component, the slot's parent, as a slot renders no box of its own. A slot at the root of that
  // component's shadow DOM has no parent element, so the component itself is the one.
  get layoutParent() {
    const slot = this.host.assignedSlot;
    if (!slot)
      return this.host.parentElement;
    return slot.parentElement ?? slot.getRootNode().host;
  }
  get selectedVersion() {
    return this.versions.find(version => version.id === this.selectedVersionId) ?? this.versions[0];
  }
  // The app copies the content on `wppActionClick`, so the Copy action confirms it right away, as chat messages do.
  // A repeat click starts the confirmation again instead of stacking timers.
  confirmCopy() {
    clearTimeout(this.copiedResetTimer);
    this.isCopied = true;
    this.copiedResetTimer = setTimeout(() => (this.isCopied = false), COPIED_CONFIRMATION_TIMEOUT);
  }
  // The icon and label an action shows: the pin's while it's on, and Copy's while it confirms a copy
  getActionDisplay(action) {
    if (this.isPinAction(action) && this.isPinned)
      return { icon: PINNED_ICON, label: this._locales.unpinAction };
    if (this.isCopyAction(action) && this.isCopied)
      return { icon: COPIED_ICON, label: this._locales.copiedAction };
    return { icon: action.icon, label: action.label };
  }
  renderResizeHandle() {
    return (index.h("div", { class: "resize-handle", role: "separator", tabindex: "0", "aria-orientation": "vertical", "aria-label": this._locales.resizeHandleLabel, "aria-valuenow": this.currentWidth, "aria-valuemin": MIN_WIDTH, "aria-valuemax": this.maxResizeWidth, onPointerDown: this.handleResizeStart, onPointerMove: this.handleResizeMove, onLostPointerCapture: this.handleResizeEnd, onKeyDown: this.handleResizeKeyDown, onFocus: this.measureBounds, "data-testid": "wpp-focus-artefact-resize-handle" }));
  }
  renderIcon(icon, slot) {
    if (!icon)
      return null;
    return index.h(utils.transformToVersionedTag(icon), { slot });
  }
  renderTitle() {
    return (index.h("div", { class: "title-wrapper" }, index.h(utils.transformToVersionedTag(this.titleIcon), {
      class: { 'title-icon': true },
      color: 'var(--wpp-grey-color-700)',
    }), index.h("wpp-tooltip-v4-6-0", { text: this.artefactTitle, class: "title-tooltip", config: this.titleTooltipConfig }, index.h("p", { ref: el => (this.titleRef = el), class: "title" }, this.artefactTitle)), this.renderVersionSelector()));
  }
  renderVersionSelector() {
    const selectedVersion = this.selectedVersion;
    if (!selectedVersion)
      return null;
    return (index.h("wpp-menu-context-v4-6-0", { class: "version-selector", dropdownConfig: this.versionMenuConfig }, index.h("wpp-action-button-v4-6-0", { slot: "trigger-element", variant: "secondary", ariaProps: {
        label: `${this._locales.versionSelectorLabel}: ${selectedVersion.label}`,
        haspopup: 'menu',
        expanded: this.isVersionMenuOpen,
      } }, selectedVersion.label, index.h("wpp-icon-chevron-v4-6-0", { slot: "icon-end", direction: this.isVersionMenuOpen ? 'up' : 'down' })), index.h("div", { style: MENU_LIST_STYLE }, this.versions.map(version => {
      const isSelected = version.id === selectedVersion.id;
      return (index.h("wpp-list-item-v4-6-0", { key: version.id, checked: isSelected, role: "menuitemradio", "aria-checked": String(isSelected), onWppChangeListItem: () => this.handleVersionSelect(version) }, index.h("span", { slot: "label" }, version.label)));
    }))));
  }
  renderAction(action) {
    // The pin's label names what a click does ("Pin" / "Unpin"), so it needs no `aria-pressed` on top
    const { icon, label } = this.getActionDisplay(action);
    return (index.h("wpp-tooltip-v4-6-0", { key: action.id, text: label }, index.h("wpp-action-button-v4-6-0", { variant: "secondary", ariaProps: { label }, onClick: () => this.handleActionClick(action) }, this.renderIcon(icon, 'icon-start'))));
  }
  renderMoreMenu() {
    if (this.menuActions.length === 0)
      return null;
    return (index.h("wpp-menu-context-v4-6-0", { class: "more-menu", dropdownConfig: this.moreMenuConfig }, index.h("wpp-action-button-v4-6-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this._locales.moreActionsLabel, haspopup: 'menu', expanded: this.isMoreMenuOpen } }, index.h("wpp-icon-more-v4-6-0", { slot: "icon-start" })), index.h("div", { style: MENU_LIST_STYLE }, this.menuActions.map(action => (index.h("wpp-list-item-v4-6-0", { key: action.id, disabled: action.disabled, onWppChangeListItem: () => this.handleMenuActionClick(action) }, this.renderIcon(action.icon, 'left'), index.h("span", { slot: "label" }, action.label)))))));
  }
  renderActions() {
    return (index.h("div", { class: "actions-wrapper" }, index.h("div", { class: "actions" }, getDefaultActions(this._locales).map(action => this.renderAction(action)), this.renderMoreMenu()), index.h("wpp-tooltip-v4-6-0", { text: this._locales.closeAction }, index.h("wpp-action-button-v4-6-0", { class: "close-button", variant: "secondary", ariaProps: { label: this._locales.closeAction }, onClick: this.handleClose }, index.h("wpp-icon-close-v4-6-0", { slot: "icon-start" })))));
  }
  render() {
    // The region is named after the title unless the app names it, by label or by reference
    const ariaProps = {
      ...this.ariaProps,
      label: this.ariaProps.label ?? (this.ariaProps.labelledby ? undefined : this.artefactTitle),
    };
    return (index.h(index.Host, { class: "wpp-focus-artefact", role: "region", ...utils.getAriaProps(ariaProps) }, this.renderResizeHandle(), index.h("div", { class: "header" }, this.renderTitle(), this.renderActions()), index.h("wpp-divider-v4-6-0", { class: "divider" }), index.h("div", { ref: el => (this.bodyRef = el), class: "body", ...(this.isBodyScrollable ? { tabindex: '0', role: 'region', 'aria-label': this._locales.bodyLabel } : {}) }, index.h("slot", { name: "body", onSlotchange: this.observeBody }))));
  }
  static get registryIs() { return "wpp-focus-artefact-v4-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "width": ["onWidthChange"]
  }; }
};
WppFocusArtefact.style = wppFocusArtefactCss;

exports.wpp_focus_artefact = WppFocusArtefact;
