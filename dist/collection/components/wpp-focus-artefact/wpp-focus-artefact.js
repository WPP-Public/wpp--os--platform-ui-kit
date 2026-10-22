import { h, Host } from '@stencil/core';
import { getAriaProps, mergeLocales, transformToVersionedTag } from '../../utils/utils';
import { COPIED_CONFIRMATION_TIMEOUT, COPIED_ICON, COPY_ACTION_ID, DEFAULT_TITLE_ICON, getDefaultActions, LOCALES_DEFAULTS, MENU_LIST_STYLE, MIN_WIDTH, PIN_ACTION_ID, PINNED_ICON, RESIZE_KEY_WIDTHS, } from './consts';
/**
 * WppFocusArtefact: a header with its title which is truncated in case the text is too long, an optional version selector, its actions and a
 * close button, and the artefact's content below it.
 *
 * It expands to fill its parent container, taking its full height and its full width up to its `max-width` (`100%` by
 * default; set it on the element with CSS, e.g. `900px` or `60%`). The
 * user can resize its width by dragging its left border, or with the arrow keys once that border is focused: from then
 * on, it keeps the width it was resized to (`width`). Its width never goes below 440px, nor above its `max-width`. Set
 * its width with the `width` property only: a CSS `width` on the element would override the one the component sets
 * while resizing. The body has no padding, so the content sets its own spacing.
 *
 * As the handle is on the left border, the artefact is meant to sit on the right of a split view.
 *
 * The header always renders the Quote, Pin, Copy and Download actions. The component doesn't know the
 * artefact's content, so they only emit `wppActionClick`: the app performs them. The pin flips on its own
 * and the event reports the state it ends in. Copy confirms the copy the app makes, as chat messages do: a
 * checkmark and "Copied" for 3 seconds.
 *
 * @slot body - Contains the content of the artefact.
 *
 */
export class WppFocusArtefact {
  constructor() {
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
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
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
    return (h("div", { class: "resize-handle", role: "separator", tabindex: "0", "aria-orientation": "vertical", "aria-label": this._locales.resizeHandleLabel, "aria-valuenow": this.currentWidth, "aria-valuemin": MIN_WIDTH, "aria-valuemax": this.maxResizeWidth, onPointerDown: this.handleResizeStart, onPointerMove: this.handleResizeMove, onLostPointerCapture: this.handleResizeEnd, onKeyDown: this.handleResizeKeyDown, onFocus: this.measureBounds, "data-testid": "wpp-focus-artefact-resize-handle" }));
  }
  renderIcon(icon, slot) {
    if (!icon)
      return null;
    return h(transformToVersionedTag(icon), { slot });
  }
  renderTitle() {
    return (h("div", { class: "title-wrapper" }, h(transformToVersionedTag(this.titleIcon), {
      class: { 'title-icon': true },
      color: 'var(--wpp-grey-color-700)',
    }), h("wpp-tooltip-v4-6-0", { text: this.artefactTitle, class: "title-tooltip", config: this.titleTooltipConfig }, h("p", { ref: el => (this.titleRef = el), class: "title" }, this.artefactTitle)), this.renderVersionSelector()));
  }
  renderVersionSelector() {
    const selectedVersion = this.selectedVersion;
    if (!selectedVersion)
      return null;
    return (h("wpp-menu-context-v4-6-0", { class: "version-selector", dropdownConfig: this.versionMenuConfig }, h("wpp-action-button-v4-6-0", { slot: "trigger-element", variant: "secondary", ariaProps: {
        label: `${this._locales.versionSelectorLabel}: ${selectedVersion.label}`,
        haspopup: 'menu',
        expanded: this.isVersionMenuOpen,
      } }, selectedVersion.label, h("wpp-icon-chevron-v4-6-0", { slot: "icon-end", direction: this.isVersionMenuOpen ? 'up' : 'down' })), h("div", { style: MENU_LIST_STYLE }, this.versions.map(version => {
      const isSelected = version.id === selectedVersion.id;
      return (h("wpp-list-item-v4-6-0", { key: version.id, checked: isSelected, role: "menuitemradio", "aria-checked": String(isSelected), onWppChangeListItem: () => this.handleVersionSelect(version) }, h("span", { slot: "label" }, version.label)));
    }))));
  }
  renderAction(action) {
    // The pin's label names what a click does ("Pin" / "Unpin"), so it needs no `aria-pressed` on top
    const { icon, label } = this.getActionDisplay(action);
    return (h("wpp-tooltip-v4-6-0", { key: action.id, text: label }, h("wpp-action-button-v4-6-0", { variant: "secondary", ariaProps: { label }, onClick: () => this.handleActionClick(action) }, this.renderIcon(icon, 'icon-start'))));
  }
  renderMoreMenu() {
    if (this.menuActions.length === 0)
      return null;
    return (h("wpp-menu-context-v4-6-0", { class: "more-menu", dropdownConfig: this.moreMenuConfig }, h("wpp-action-button-v4-6-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this._locales.moreActionsLabel, haspopup: 'menu', expanded: this.isMoreMenuOpen } }, h("wpp-icon-more-v4-6-0", { slot: "icon-start" })), h("div", { style: MENU_LIST_STYLE }, this.menuActions.map(action => (h("wpp-list-item-v4-6-0", { key: action.id, disabled: action.disabled, onWppChangeListItem: () => this.handleMenuActionClick(action) }, this.renderIcon(action.icon, 'left'), h("span", { slot: "label" }, action.label)))))));
  }
  renderActions() {
    return (h("div", { class: "actions-wrapper" }, h("div", { class: "actions" }, getDefaultActions(this._locales).map(action => this.renderAction(action)), this.renderMoreMenu()), h("wpp-tooltip-v4-6-0", { text: this._locales.closeAction }, h("wpp-action-button-v4-6-0", { class: "close-button", variant: "secondary", ariaProps: { label: this._locales.closeAction }, onClick: this.handleClose }, h("wpp-icon-close-v4-6-0", { slot: "icon-start" })))));
  }
  render() {
    // The region is named after the title unless the app names it, by label or by reference
    const ariaProps = {
      ...this.ariaProps,
      label: this.ariaProps.label ?? (this.ariaProps.labelledby ? undefined : this.artefactTitle),
    };
    return (h(Host, { class: "wpp-focus-artefact", role: "region", ...getAriaProps(ariaProps) }, this.renderResizeHandle(), h("div", { class: "header" }, this.renderTitle(), this.renderActions()), h("wpp-divider-v4-6-0", { class: "divider" }), h("div", { ref: el => (this.bodyRef = el), class: "body", ...(this.isBodyScrollable ? { tabindex: '0', role: 'region', 'aria-label': this._locales.bodyLabel } : {}) }, h("slot", { name: "body", onSlotchange: this.observeBody }))));
  }
  static get is() { return "wpp-focus-artefact"; }
  static get registryIs() { return "wpp-focus-artefact-v4-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-focus-artefact.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-focus-artefact.css"]
    };
  }
  static get properties() {
    return {
      "artefactTitle": {
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
          "text": "Defines the title of the artefact, displayed in the header. A title that doesn't fit is truncated and\nshown in full in a tooltip."
        },
        "attribute": "artefact-title",
        "reflect": false,
        "defaultValue": "'Title'"
      },
      "titleIcon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}`",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon rendered before the title. Should be a valid icon name from the library."
        },
        "attribute": "title-icon",
        "reflect": false,
        "defaultValue": "DEFAULT_TITLE_ICON"
      },
      "menuActions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FocusArtefactMenuAction[]",
          "resolved": "FocusArtefactMenuAction[]",
          "references": {
            "FocusArtefactMenuAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactMenuAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the additional actions of the header. The Quote, Pin, Copy and Download actions are always\nrendered; the actions passed here are listed in a \"More actions\" menu after them. When none are passed,\nthe \"More actions\" button is hidden."
        },
        "defaultValue": "[]"
      },
      "versions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FocusArtefactVersion[]",
          "resolved": "FocusArtefactVersion[]",
          "references": {
            "FocusArtefactVersion": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactVersion"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the versions of the artefact. When at least one version is passed, a version selector is shown\nnext to the title."
        },
        "defaultValue": "[]"
      },
      "selectedVersionId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the id of the selected version. Defaults to the first version. The component keeps it in sync when\nthe user picks a version from the selector."
        },
        "attribute": "selected-version-id",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<FocusArtefactLocales>",
          "resolved": "{ quoteAction?: string | undefined; pinAction?: string | undefined; unpinAction?: string | undefined; copyAction?: string | undefined; copiedAction?: string | undefined; downloadAction?: string | undefined; moreActionsLabel?: string | undefined; closeAction?: string | undefined; resizeHandleLabel?: string | undefined; versionSelectorLabel?: string | undefined; bodyLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "FocusArtefactLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the locales for the focus artefact component."
        },
        "defaultValue": "{}"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FocusArtefactAriaProps",
          "resolved": "{ label?: string | undefined; describedby?: string | undefined; labelledby?: string | undefined; }",
          "references": {
            "FocusArtefactAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactAriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the ARIA attributes of the artefact region. Its accessible name defaults to the artefact's title."
        },
        "defaultValue": "{}"
      },
      "width": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "FocusArtefactWidth",
          "resolved": "`${number}%` | number | undefined",
          "references": {
            "FocusArtefactWidth": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactWidth"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the width of the artefact: a number of pixels, or a percentage of its parent, e.g. `'40%'`. Until it's\nset, the artefact fills its parent, up to its `max-width`. The component keeps it in sync when the user resizes the\nartefact, in the same unit, so the app can store it and pass it back later: a percentage stays a percentage, so\nthe artefact keeps its share of the parent when the parent's width changes. It is kept between the minimum width\n(440px) and its `max-width`, and a number of pixels never makes it wider than its container."
        },
        "attribute": "width",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isPinned": {},
      "isMoreMenuOpen": {},
      "isBodyScrollable": {},
      "isVersionMenuOpen": {},
      "isCopied": {},
      "currentWidth": {},
      "maxResizeWidth": {}
    };
  }
  static get events() {
    return [{
        "method": "wppActionClick",
        "name": "wppActionClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a header action or a \"More actions\" menu item is clicked. For the pin, the detail carries the\nstate it ends in (`isActive`)."
        },
        "complexType": {
          "original": "FocusArtefactActionClickDetail",
          "resolved": "FocusArtefactAction | FocusArtefactMenuAction",
          "references": {
            "FocusArtefactActionClickDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactActionClickDetail"
            }
          }
        }
      }, {
        "method": "wppVersionSelect",
        "name": "wppVersionSelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user picks a version from the version selector."
        },
        "complexType": {
          "original": "FocusArtefactVersion",
          "resolved": "FocusArtefactVersion",
          "references": {
            "FocusArtefactVersion": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactVersion"
            }
          }
        }
      }, {
        "method": "wppClose",
        "name": "wppClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the close button is clicked."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppResize",
        "name": "wppResize",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user resizes the artefact: once on release for a pointer drag, and on every step for keyboard\nresizing. The detail contains the new width, in the unit `width` was given in: pixels, or a percentage of the\nparent."
        },
        "complexType": {
          "original": "FocusArtefactResizeDetail",
          "resolved": "FocusArtefactResizeDetail",
          "references": {
            "FocusArtefactResizeDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-focus-artefact/types.ts::FocusArtefactResizeDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "width",
        "methodName": "onWidthChange"
      }];
  }
}
