'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const highlightWords = require('./highlight-words-25672f7c.js');
const WrappedSlot = require('./WrappedSlot-736c2736.js');
const utils = require('./utils-9c925efe.js');
const utils$1 = require('./utils-a82778a7.js');
require('./consts-255c1066.js');

const wppSkeletonCss = ":host{--skeleton-bg-color:var(--wpp-skeleton-bg-color, var(--wpp-grey-color-300));--skeleton-circle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-round));--skeleton-circle-width:var(--wpp-skeleton-circle-width, 80px);--skeleton-circle-height:var(--wpp-skeleton-circle-height, 80px);--skeleton-rectangle-border-radius:var(--wpp-skeleton-rectangle-border-radius, var(--wpp-border-radius-s));--skeleton-rectangle-width:var(--wpp-skeleton-rectangle-width, 100%);--skeleton-rectangle-height:var(--wpp-skeleton-rectangle-height, 80px);--skeleton-animation-duration:var(--wpp-skeleton-animation-duration, 2s);display:-ms-inline-flexbox;display:inline-flex;position:relative;overflow:hidden;background-color:var(--skeleton-bg-color)}:host:host(.wpp-animated)::after{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);background-image:-webkit-gradient(linear, left top, right top, color-stop(0, rgba(255, 255, 255, 0)), color-stop(20%, rgba(255, 255, 255, 0.2)), color-stop(60%, rgba(255, 255, 255, 0.5)), to(rgba(255, 255, 255, 0)));background-image:linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));-webkit-animation:shimmer var(--skeleton-animation-duration) infinite;animation:shimmer var(--skeleton-animation-duration) infinite;content:\"\"}:host:host(.wpp-rectangle){border-radius:var(--skeleton-rectangle-border-radius);width:var(--skeleton-width, var(--skeleton-rectangle-width));height:var(--skeleton-height, var(--skeleton-rectangle-height))}:host:host(.wpp-circle){border-radius:var(--skeleton-circle-border-radius);width:var(--skeleton-width, var(--skeleton-circle-width));height:var(--skeleton-height, var(--skeleton-circle-height))}@-webkit-keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}@keyframes shimmer{100%{-webkit-transform:translateX(100%);transform:translateX(100%)}}";

const WppSkeleton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-skeleton': true,
      [`wpp-${this.variant}`]: true,
      'wpp-animated': this.animation,
    });
    this.getSizeWithDimension = (initialValue) => String(initialValue || '').replace(/^(\d+)(\S+)?$/, (...match) => match[1] + (match[2] || 'px'));
    this.variant = 'rectangle';
    this.animation = true;
    this.width = undefined;
    this.height = undefined;
  }
  render() {
    const style = {
      '--skeleton-width': this.getSizeWithDimension(this.width),
      '--skeleton-height': this.getSizeWithDimension(this.height),
    };
    return index.h(index.Host, { class: this.hostCssClasses(), style: style });
  }
  static get registryIs() { return "wpp-skeleton-v2-22-0"; }
};
WppSkeleton.style = wppSkeletonCss;

const clickOnElementsWithHandlers = (e) => {
  const innerElementsWithHandlers = ['wpp-checkbox', 'wpp-menu-context', 'wpp-icon', 'wpp-action-button'];
  return e
    .composedPath()
    ?.some(elem => Array.from(elem.classList || []).some(className => innerElementsWithHandlers.includes(className)));
};
const clickOnSwitcher = (e) => e
  .composedPath()
  ?.some(elem => Array.from(elem.classList || []).some(className => ['switcher'].includes(className)));

const wppTreeItemCss = ":host{--tree-item-height:var(--wpp-tree-item-height, 32px);--tree-item-width:var(--wpp-tree-item-width, 100%);--tree-item-padding:var(--wpp-tree-item-padding, 4px 8px 4px 0);--tree-item-cursor:var(--wpp-tree-item-cursor, pointer);--tree-item-border-radius:var(--wpp-tree-item-border-radius, 6px);--tree-item-checkbox-margin:var(--wpp-tree-item-checkbox-margin, 0 8px 0 0);--tree-item-disabled-color:var(--wpp-tree-item-disabled-color, var(--wpp-grey-color-400));--tree-item-bg-color:var(--wpp-tree-item-bg-color, var(--wpp-grey-color-000));--tree-item-bg-color-hover:var(--wpp-tree-item-bg-color-hover, var(--wpp-grey-color-200));--tree-item-bg-color-active:var(--wpp-tree-item-bg-color-active, var(--wpp-grey-color-300));--tree-item-bg-color-selected:var(--wpp-tree-item-bg-color-selected, var(--wpp-primary-color-100));--tree-item-extended-active-bg-color:var(--wpp-tree-item-extended-active-bg-color, var(--wpp-grey-color-200));--tree-item-extended-icon-margin:var(--wpp-tree-item-extended-icon-margin, 0 4px 0 0);--tree-item-extended-icon-color-hover:var(--wpp-tree-item-extended-icon-color-hover, var(--wpp-icon-color-hover));--tree-item-extended-icon-color-active:var(--wpp-tree-item-extended-icon-color-active, var(--wpp-icon-color-active));--tree-item-icon-end-color-hover:var(--wpp-tree-item-icon-end-color-hover, var(--wpp-icon-color-hover));--tree-item-icon-end-color-active:var(--wpp-tree-item-icon-end-color-active, var(--wpp-icon-color-active));--tree-item-text-active:var(--wpp-tree-item-text-active, var(--wpp-brand-color));--tree-item-text-highlight:var(--wpp-tree-item-text-highlight, var(--wpp-grey-color-1000));--tree-item-switcher-transition-property:var(--wpp-tree-item-switcher-transition-property, all);--tree-item-switcher-transition-duration:var(--wpp-tree-item-switcher-transition-duration, 100ms);--tree-item-switcher-transition-timing-function:var(\n    --wpp-tree-item-switcher-transition-timing-function,\n    ease-in-out\n  );--tree-item-end-content-margin-left:var(--wpp-tree-item-end-content-margin-left, 8px);--tree-item-end-content-avatar-size-xs:var(--wpp-tree-item-end-content-avatar-size-xs, 24px);display:inline-block;-webkit-transition:height 350ms ease;transition:height 350ms ease;width:var(--tree-item-width)}:host(.wpp-hidden){display:none}.tree-item{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);height:var(--tree-item-height);display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;position:relative;background:var(--tree-item-bg-color);border-radius:var(--tree-item-border-radius);padding:var(--tree-item-padding);padding-left:36px;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:var(--tree-item-cursor);-webkit-transition:0.1s ease-in-out;transition:0.1s ease-in-out;width:var(--tree-item-width)}.tree-item.with-text-wrap:not(.with-truncation){height:auto}.tree-item.with-text-wrap:not(.with-truncation) .title{white-space:normal}.tree-item.with-truncation{min-width:0;overflow:hidden}.tree-item.with-truncation .tooltip{min-width:0}.tree-item.with-truncation .tooltip::part(anchor){overflow:hidden}.tree-item.with-truncation .title{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.tree-item.parent{padding-left:0}.tree-item .wpp-checkbox{margin:var(--tree-item-checkbox-margin)}.tree-item.selected:not(.multiple){background:var(--tree-item-bg-color-selected)}.tree-item.selected:not(.multiple) .title{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);color:var(--tree-item-text-active)}.tree-item.selected:not(.multiple):hover{background:var(--tree-item-bg-color-selected)}.tree-item.disabled{cursor:not-allowed}.tree-item.disabled .title{color:var(--tree-item-disabled-color)}.tree-item.disabled .switcher .wpp-icon-triangle-fill{color:var(--tree-item-disabled-color)}.tree-item.disabled .switcher:hover .wpp-icon-triangle-fill{color:var(--tree-item-disabled-color)}.tree-item.disabled .icon-end{pointer-events:none}.tree-item.disabled:hover{background:none}.tree-item .switcher{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;height:32px;width:32px;min-width:32px;border-radius:var(--tree-item-border-radius);margin-right:4px}.tree-item .switcher .wpp-icon-triangle-fill{-webkit-transition-property:var(--tree-item-switcher-transition-property);transition-property:var(--tree-item-switcher-transition-property);-webkit-transition-duration:var(--tree-item-switcher-transition-duration);transition-duration:var(--tree-item-switcher-transition-duration);-webkit-transition-timing-function:var(--tree-item-switcher-transition-timing-function);transition-timing-function:var(--tree-item-switcher-transition-timing-function)}.tree-item .switcher .wpp-icon-triangle-fill[data-open=true]{rotate:90deg}.tree-item .switcher:hover .wpp-icon-triangle-fill{color:var(--tree-item-extended-icon-color-hover)}.tree-item:hover{background:var(--tree-item-bg-color-hover)}.tree-item:hover:not(.disabled) .icon-end{opacity:1}.tree-item:hover .wpp-icon-triangle-fill{color:var(--wpp-grey-color-800)}.tree-item:hover .icon-extended{color:var(--tree-item-extended-icon-color-hover)}.tree-item:active{background:var(--tree-item-bg-color-active)}.tree-item:active .wpp-icon-triangle-fill{color:var(--wpp-grey-color-900)}.tree-item:active .icon-end{color:var(--wpp-grey-color-900)}.tree-item .title{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);width:100%;white-space:nowrap}.tree-item .title.with-icon-end{padding-right:32px}.tree-item .icon-start{display:-ms-inline-flexbox;display:inline-flex;margin-right:8px;color:var(--wpp-grey-color-800)}.tree-item .icon-start ::slotted(*){color:var(--wpp-grey-color-800)}.tree-item .icon-start:hover{color:var(--wpp-grey-color-800)}.tree-item .icon-start:hover ::slotted(*){color:var(--wpp-grey-color-800)}.tree-item .icon-start:active{color:var(--wpp-grey-color-900)}.tree-item .icon-start:active ::slotted(*){color:var(--wpp-grey-color-900)}.tree-item .wpp-menu-context{margin-top:6px}.tree-item .icon-end{width:var(--tree-input-trigger-area);height:var(--tree-input-trigger-area);-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;display:-ms-inline-flexbox;display:inline-flex;margin-left:auto;opacity:0;-webkit-transition:0.1s ease-in-out;transition:0.1s ease-in-out;border-radius:var(--tree-item-border-radius);margin-right:-4px;position:absolute;right:4px;cursor:pointer;pointer-events:all;--wpp-action-button-secondary-icon-color-active:var(--tree-item-icon-end-color-active)}.tree-item .icon-end:hover{opacity:1}.tree-item .icon-end:active{opacity:1}.tree-item .end-content{display:-ms-flexbox;display:flex;-ms-flex-pack:end;justify-content:flex-end;margin-left:var(--tree-item-end-content-margin-left);white-space:nowrap}.tree-item .end-content.wpp-typography{color:var(--wpp-grey-color-800)}.tree-item .tree-end-content-tag{overflow:visible}.tree-item .wpp-avatar.size-xs::part(image){width:var(--tree-item-end-content-avatar-size-xs)}.tree-item .slot-hidden{display:none}.menu-trigger{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--tree-input-trigger-area);height:var(--tree-input-trigger-area);border-radius:var(--tree-item-border-radius);-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out;color:var(--tree-item-icon-end-color)}.menu-trigger.disabled{pointer-events:none;color:var(--tree-item-disabled-color);background-color:transparent}.menu-trigger[aria-expanded=true]{color:var(--tree-item-icon-end-color-active);background-color:var(--tree-item-icon-end-background-active-color)}.menu-trigger:active{color:var(--tree-item-icon-end-color-active)}.content-container{display:grid;-ms-flex-direction:column;flex-direction:column}.highlight{font-weight:700}.content-wrapper{display:grid;overflow:hidden;-webkit-transition:height 500ms ease;transition:height 500ms ease}";

const WppTreeItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppTreeItemOpenChange = index.createEvent(this, "wppTreeItemOpenChange", 7);
    this.wppTreeItemSelectChange = index.createEvent(this, "wppTreeItemSelectChange", 7);
    this.shouldRecalculateItemHeight = false;
    this.defaultItemHeight = '32px';
    this.itemHeight = null;
    this.getItemHeight = () => this.itemHeight || this.defaultItemHeight;
    this.addHeightToHost = (el) => {
      function traverse(node) {
        if (node.hidden === true)
          return 0;
        if (!node.open)
          return 1;
        let count = node.hidden === false || node.open ? 1 : 0;
        if (node.children) {
          for (const child of node.children) {
            count += traverse(child);
          }
        }
        return count;
      }
      const visibleItems = traverse(el);
      this.host.style.height = `${visibleItems * parseInt(this.getItemHeight())}px`;
    };
    this.updateParentHeight = (el) => {
      if (el.tagName !== utils.transformToVersionedTag('wpp-tree-item').toUpperCase() && el.slot !== 'content') {
        return;
      }
      if (el.style.height.includes('px')) {
        el.style.height = 'auto';
        return;
      }
      if (el.parentElement) {
        this.updateParentHeight(el.parentElement);
      }
      return;
    };
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
        end: '[slot="icon-end"]',
      });
      const hasMenuContext = !!this.host.querySelector('.wpp-menu-context');
      this.hasIconStartSlot = !emptyStates.start;
      this.hasIconEndSlot = !emptyStates.end;
      this.hasIconEndContextMenu = hasMenuContext;
    };
    this.handleMouseDown = () => {
      if (this.item.disabled)
        return;
      this.isMouseOnIconEnd = true;
    };
    this.handleMouseLeave = () => {
      this.isMouseOnIconEnd = false;
    };
    this.handleCheckboxClick = () => {
      if (this.item.children?.length) {
        const haveDisabledChildren = utils$1.areAnyChildrenDisabled(this.item.children);
        if (this.item.indeterminate && haveDisabledChildren) {
          const nextState = { selected: false, indeterminate: false };
          return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
        }
        if (!this.item.selected && haveDisabledChildren) {
          const nextState = { selected: false, indeterminate: true };
          return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
        }
      }
      const nextState = this.item.indeterminate
        ? { selected: true, indeterminate: false }
        : { selected: !this.item.selected, indeterminate: false };
      this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState });
    };
    this.handleSwitcherClick = () => {
      if (this.item.disabled)
        return;
      if (!this.disableOpenCloseAnimation) {
        if (!this.itemHeight) {
          this.itemHeight = this.host.shadowRoot?.querySelector('.tree-item')?.clientHeight + 'px';
        }
        // We need to set proper height value in px before animation start
        if (!this.host.style.height || this.host.style.height === 'auto') {
          this.host.style.height = this.item.open ? `${this.host.scrollHeight}px` : this.getItemHeight();
        }
      }
      this.wppTreeItemOpenChange.emit({ ...this.item, open: !this.item.open });
    };
    this.handleItemClick = (e) => {
      if (this.item.disabled)
        return;
      if (clickOnElementsWithHandlers(e)) {
        return;
      }
      if (!clickOnSwitcher(e)) {
        if (this.item.children?.length)
          this.handleSwitcherClick();
      }
      if (!this.multiple && !this.item.isNotSelectable) {
        this.wppTreeItemSelectChange.emit({
          ...this.item,
          selected: !this.item.selected,
          ...(this.item.children?.length && { open: !this.item.open }),
        });
      }
    };
    this.handleTransitionEnd = () => {
      this.host.style.height = 'auto';
      this.isCollapseTransitionEnd = true;
    };
    this.calculateItemOffset = (level, isParent) => {
      const levelDifference = 20;
      const switcherOffset = 16;
      if (level === 1) {
        return isParent ? '0px' : `${levelDifference + switcherOffset}px`;
      }
      return isParent
        ? `${this.level * levelDifference - levelDifference}px`
        : `${this.level * levelDifference + switcherOffset}px`;
    };
    this.hostCssClasses = () => ({
      'wpp-tree-item': true,
      'wpp-hidden': !!this.item.hidden,
    });
    this.treeItemClasses = () => ({
      'tree-item': true,
      open: !!this.item.open,
      multiple: this.multiple,
      selected: !!this.item.selected,
      disabled: !!this.item.disabled,
      parent: !!this.item?.children?.length,
      'with-truncation': this.withItemsTruncation,
      'with-text-wrap': this.isTextWrappable,
    });
    this.titleClasses = () => ({
      title: true,
      disabled: !!this.item.disabled,
      'with-icon-end': this.hasIconEndContextMenu || this.hasIconEndSlot,
    });
    this.iconStartCssClasses = () => ({
      'icon-start': true,
      'slot-hidden': !this.hasIconStartSlot,
    });
    this.iconEndCssClasses = () => ({
      'icon-end': true,
      'slot-hidden': !this.hasIconEndSlot,
      margin: this.hasIconEndContextMenu,
      disabled: !!this.item.disabled,
    });
    this.endContentCssClasses = (className) => ({
      'end-content': true,
      ...(className ? { [className]: true } : {}),
      disabled: !!this.item.disabled,
    });
    this.renderTitle = () => {
      const chunks = highlightWords.highlightWords({
        text: this.item.title,
        query: this.transformSearchQuery ? this.transformSearchQuery(this.search) : this.search,
        ...this.highlightOptions,
      });
      return (index.h("span", { "aria-label": this.item.title, class: this.titleClasses(), part: "tree-item-title-wrapper" }, this.disableSearchHighlight ? (index.h("span", { "aria-hidden": "true", part: "tree-item-title" }, this.item.title)) : (chunks.map(({ text, match, key }) => match ? (index.h("span", { "aria-hidden": "true", class: "highlight", key: key, part: "tree-item-title-highlighted" }, text)) : (index.h("span", { "aria-hidden": "true", key: key, part: "tree-item-title" }, text))))));
    };
    this.renderEndContent = () => {
      if (!this.endContent)
        return null;
      const { contentType, props } = this.endContent;
      const { className } = props;
      switch (contentType) {
        case 'text':
          return (index.h("wpp-typography-v2-22-0", { type: "s-body", tag: "span", ...props, class: this.endContentCssClasses(className), part: "tree-item-end-text" }, props?.text));
        case 'tag': {
          const { icon } = props;
          return (index.h("wpp-tag-v2-22-0", { ...props, class: this.endContentCssClasses(className), disabled: this.item.disabled, part: "tree-item-end-tag" }, icon &&
            index.h(utils.transformToVersionedTag(icon), {
              slot: 'icon-start',
              part: 'icon-start',
            })));
        }
        case 'avatar':
          return (index.h("wpp-avatar-v2-22-0", { ...props, class: this.endContentCssClasses(className), size: "xs", part: "tree-item-end-avatar" }));
        case 'avatarGroup':
          return (index.h("wpp-avatar-group-v2-22-0", { ...props, class: this.endContentCssClasses(className), part: "tree-item-end-avatar-group" }));
        default:
          return null;
      }
    };
    this.hasIconStartSlot = false;
    this.hasIconEndSlot = false;
    this.hasIconEndContextMenu = false;
    this.isMouseOnIconEnd = false;
    this.isCollapseTransitionEnd = true;
    this.isTextWrappable = false;
    this.text = undefined;
    this.multiple = false;
    this.search = undefined;
    this.item = undefined;
    this.level = 1;
    this.highlightOptions = undefined;
    this.transformSearchQuery = undefined;
    this.disableSearchHighlight = false;
    this.disableOpenCloseAnimation = false;
    this.withItemsTruncation = false;
    this.endContent = undefined;
  }
  onItemChange(next, prev) {
    if (prev.open !== next.open) {
      this.shouldRecalculateItemHeight = true;
    }
    if (prev.hidden !== next.hidden && next.hidden) {
      // When item is hidden, we need to update height of parent element
      this.updateParentHeight(this.host);
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      const title = this.host.shadowRoot.querySelector('.title');
      if (title) {
        this.isTextWrappable = title.scrollWidth > title.clientWidth;
      }
    }, 0);
  }
  componentDidUpdate() {
    if (this.shouldRecalculateItemHeight && !this.disableOpenCloseAnimation) {
      if (!this.item.open) {
        this.isCollapseTransitionEnd = false;
        this.host.style.height = this.getItemHeight();
      }
      else {
        // TODO: fix that approach. Currently 50 ms delay makes it possible to see animation open/close on filtering by search.
        // delay in 0 ms makes it work without animation. Possible solution: may be recalculated based on number of
        // open children in tree, but that will cost us some performance
        setTimeout(() => {
          this.addHeightToHost(this.item);
        }, 50);
      }
      this.shouldRecalculateItemHeight = false;
    }
  }
  render() {
    const isParent = !!this.item?.children?.length;
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "tree-item,tree-item-switcher,tree-item-checkbox,tree-item-title-wrapper,tree-item-title,tree-item-title-highlighted,tree-item-action-button", role: "treeItem", ...(!this.disableOpenCloseAnimation && { onTransitionEnd: this.handleTransitionEnd }) }, index.h("div", { class: this.treeItemClasses(), style: { paddingLeft: this.calculateItemOffset(this.level, isParent) }, onClick: this.handleItemClick, part: "tree-item" }, isParent && (index.h("div", { class: "switcher", onClick: this.handleSwitcherClick, part: "tree-item-switcher" }, index.h("wpp-icon-triangle-fill-v2-22-0", { "data-open": this.item.open ? 'true' : 'false' }))), this.multiple && !this.item.isNotSelectable && (index.h("wpp-checkbox-v2-22-0", { class: "checkbox", indeterminate: this.item.indeterminate, checked: this.item.selected, controlled: true, onWppChange: this.handleCheckboxClick, disabled: this.item.disabled, part: "tree-item-checkbox" })), index.h(WrappedSlot.WrappedSlot, { name: "icon-start", onSlotchange: this.updateSlotData, wrapperClass: this.iconStartCssClasses() }), this.isTextWrappable && this.withItemsTruncation ? (index.h("wpp-tooltip-v2-22-0", { text: this.item.title, config: { placement: 'right' }, class: "tooltip" }, this.renderTitle())) : (this.renderTitle()), index.h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: this.item.disabled, onMouseEnter: this.handleMouseDown, onMouseLeave: this.handleMouseLeave, class: this.iconEndCssClasses(), loading: this.item.loadingActions, part: "tree-item-action-button" }, index.h("slot", { name: "icon-end", onSlotchange: this.updateSlotData })), this.renderEndContent()), ((this.item.children && this.item.open) || !this.isCollapseTransitionEnd) && (index.h(WrappedSlot.WrappedSlot, { name: "content", onSlotchange: this.updateSlotData }))));
  }
  static get registryIs() { return "wpp-tree-item-v2-22-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "item": ["onItemChange"]
  }; }
};
WppTreeItem.style = wppTreeItemCss;

exports.wpp_skeleton = WppSkeleton;
exports.wpp_tree_item = WppTreeItem;
