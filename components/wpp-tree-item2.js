import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { h as highlightWords } from './highlight-words.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { j as transformToVersionedTag, g as getSlotEmptyStates } from './utils.js';
import { d as defineCustomElement$n } from './wpp-action-button2.js';
import { d as defineCustomElement$m } from './wpp-avatar2.js';
import { d as defineCustomElement$l } from './wpp-avatar-group2.js';
import { d as defineCustomElement$k } from './wpp-checkbox2.js';
import { d as defineCustomElement$j } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$i } from './wpp-icon-cross2.js';
import { d as defineCustomElement$h } from './wpp-icon-dash2.js';
import { d as defineCustomElement$g } from './wpp-icon-error2.js';
import { d as defineCustomElement$f } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$e } from './wpp-icon-success2.js';
import { d as defineCustomElement$d } from './wpp-icon-tick2.js';
import { d as defineCustomElement$c } from './wpp-icon-triangle-fill2.js';
import { d as defineCustomElement$b } from './wpp-icon-warning2.js';
import { d as defineCustomElement$a } from './wpp-inline-message2.js';
import { d as defineCustomElement$9 } from './wpp-internal-label2.js';
import { d as defineCustomElement$8 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$7 } from './wpp-label2.js';
import { d as defineCustomElement$6 } from './wpp-list-item2.js';
import { d as defineCustomElement$5 } from './wpp-menu-context2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-tag2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const areAllChildrenSelected = (treeData) => treeData.every(item => {
  if (item.children) {
    return areAllChildrenSelected(item.children);
  }
  else {
    return !!item.selected;
  }
});
const areAnyChildrenSelected = (treeData) => treeData.some(item => {
  if (item.children) {
    return areAnyChildrenSelected(item.children);
  }
  else {
    return !!item.selected || !!item.indeterminate;
  }
});
const areAnyChildrenDisabled = (treeData) => treeData.some(item => {
  if (item.children && !item.disabled) {
    return areAnyChildrenDisabled(item.children);
  }
  else {
    return !!item.disabled;
  }
});
const updateTreeById = (tree, id, newItem) => tree.map(item => {
  if (item.id !== id) {
    if (item.children?.length) {
      return { ...item, children: updateTreeById(item.children, id, newItem) };
    }
    return item;
  }
  return { ...item, ...newItem };
});
const updateTreeByIds = (tree, idsList, newItemParamsCb, passedCheckOnParent = false) => tree.map(item => {
  if (item.children?.length) {
    return {
      ...item,
      children: updateTreeByIds(item.children, idsList, newItemParamsCb, idsList.includes(item.id) || passedCheckOnParent),
      ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)),
    };
  }
  return { ...item, ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)) };
});
const findSelectedItems = (tree) => tree
  .map(item => {
  if (!item.selected) {
    if (item.children?.length) {
      return findSelectedItems(item.children);
    }
    else {
      return null;
    }
  }
  else {
    if (item.children?.length) {
      return [item].concat([findSelectedItems(item.children)]);
    }
    return item;
  }
})
  .flat()
  .filter(Boolean)
  .flatMap(elem => elem);
const convertToOriginalItems = (treeArr) => treeArr.map(({ search, children, selected, loadingActions, isNotSelectable, disabled, checked, indeterminate, iconStart, iconEnd, iconsStart, iconsEnd, hidden, open, ...itemWithoutConfig }) => itemWithoutConfig);
const markChildrenAs = (tree, treeItemCb) => tree.map(item => {
  if (item.children) {
    return { ...item, ...treeItemCb(item), children: markChildrenAs(item.children, treeItemCb) };
  }
  return { ...item, ...treeItemCb(item) };
});
const isHaveFoundChildren = (tree, search, matcherFn) => tree.some(item => {
  const isMatch = matcherFn(item, search);
  if (!isMatch && item.children) {
    return isHaveFoundChildren(item.children, search, matcherFn);
  }
  return isMatch;
});
const recalculateIndeterminateTreeState = (treeData) => treeData.reduce((acc, item) => {
  if (item.children) {
    const selected = !item.isNotSelectable && areAllChildrenSelected(item.children);
    const indeterminate = areAnyChildrenSelected(item.children);
    const children = recalculateIndeterminateTreeState(item.children);
    return [...acc, { ...item, selected, children, indeterminate: selected ? false : indeterminate }];
  }
  return [...acc, item];
}, []);

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

const WppTreeItem = /*@__PURE__*/ proxyCustomElement(class WppTreeItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppTreeItemOpenChange = createEvent(this, "wppTreeItemOpenChange", 7);
    this.wppTreeItemSelectChange = createEvent(this, "wppTreeItemSelectChange", 7);
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
      if (el.tagName !== transformToVersionedTag('wpp-tree-item').toUpperCase() && el.slot !== 'content') {
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
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
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
        const haveDisabledChildren = areAnyChildrenDisabled(this.item.children);
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
      const chunks = highlightWords({
        text: this.item.title,
        query: this.transformSearchQuery ? this.transformSearchQuery(this.search) : this.search,
        ...this.highlightOptions,
      });
      return (h("span", { "aria-label": this.item.title, class: this.titleClasses(), part: "tree-item-title-wrapper" }, this.disableSearchHighlight ? (h("span", { "aria-hidden": "true", part: "tree-item-title" }, this.item.title)) : (chunks.map(({ text, match, key }) => match ? (h("span", { "aria-hidden": "true", class: "highlight", key: key, part: "tree-item-title-highlighted" }, text)) : (h("span", { "aria-hidden": "true", key: key, part: "tree-item-title" }, text))))));
    };
    this.renderEndContent = () => {
      if (!this.endContent)
        return null;
      const { contentType, props } = this.endContent;
      const { className } = props;
      switch (contentType) {
        case 'text':
          return (h("wpp-typography-v2-22-0", { type: "s-body", tag: "span", ...props, class: this.endContentCssClasses(className), part: "tree-item-end-text" }, props?.text));
        case 'tag': {
          const { icon } = props;
          return (h("wpp-tag-v2-22-0", { ...props, class: this.endContentCssClasses(className), disabled: this.item.disabled, part: "tree-item-end-tag" }, icon &&
            h(transformToVersionedTag(icon), {
              slot: 'icon-start',
              part: 'icon-start',
            })));
        }
        case 'avatar':
          return (h("wpp-avatar-v2-22-0", { ...props, class: this.endContentCssClasses(className), size: "xs", part: "tree-item-end-avatar" }));
        case 'avatarGroup':
          return (h("wpp-avatar-group-v2-22-0", { ...props, class: this.endContentCssClasses(className), part: "tree-item-end-avatar-group" }));
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "tree-item,tree-item-switcher,tree-item-checkbox,tree-item-title-wrapper,tree-item-title,tree-item-title-highlighted,tree-item-action-button", role: "treeItem", ...(!this.disableOpenCloseAnimation && { onTransitionEnd: this.handleTransitionEnd }) }, h("div", { class: this.treeItemClasses(), style: { paddingLeft: this.calculateItemOffset(this.level, isParent) }, onClick: this.handleItemClick, part: "tree-item" }, isParent && (h("div", { class: "switcher", onClick: this.handleSwitcherClick, part: "tree-item-switcher" }, h("wpp-icon-triangle-fill-v2-22-0", { "data-open": this.item.open ? 'true' : 'false' }))), this.multiple && !this.item.isNotSelectable && (h("wpp-checkbox-v2-22-0", { class: "checkbox", indeterminate: this.item.indeterminate, checked: this.item.selected, controlled: true, onWppChange: this.handleCheckboxClick, disabled: this.item.disabled, part: "tree-item-checkbox" })), h(WrappedSlot, { name: "icon-start", onSlotchange: this.updateSlotData, wrapperClass: this.iconStartCssClasses() }), this.isTextWrappable && this.withItemsTruncation ? (h("wpp-tooltip-v2-22-0", { text: this.item.title, config: { placement: 'right' }, class: "tooltip" }, this.renderTitle())) : (this.renderTitle()), h("wpp-action-button-v2-22-0", { variant: "secondary", disabled: this.item.disabled, onMouseEnter: this.handleMouseDown, onMouseLeave: this.handleMouseLeave, class: this.iconEndCssClasses(), loading: this.item.loadingActions, part: "tree-item-action-button" }, h("slot", { name: "icon-end", onSlotchange: this.updateSlotData })), this.renderEndContent()), ((this.item.children && this.item.open) || !this.isCollapseTransitionEnd) && (h(WrappedSlot, { name: "content", onSlotchange: this.updateSlotData }))));
  }
  static get registryIs() { return "wpp-tree-item-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "item": ["onItemChange"]
  }; }
  static get style() { return wppTreeItemCss; }
}, [1, "wpp-tree-item", "wpp-tree-item-v2-22-0", {
    "text": [513],
    "multiple": [516],
    "search": [1],
    "item": [16],
    "level": [514],
    "highlightOptions": [16],
    "transformSearchQuery": [16],
    "disableSearchHighlight": [4, "disable-search-highlight"],
    "disableOpenCloseAnimation": [4, "disable-open-close-animation"],
    "withItemsTruncation": [4, "with-items-truncation"],
    "endContent": [16],
    "hasIconStartSlot": [32],
    "hasIconEndSlot": [32],
    "hasIconEndContextMenu": [32],
    "isMouseOnIconEnd": [32],
    "isCollapseTransitionEnd": [32],
    "isTextWrappable": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tree-item-v2-22-0", "wpp-action-button-v2-22-0", "wpp-avatar-v2-22-0", "wpp-avatar-group-v2-22-0", "wpp-checkbox-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-dash-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-tick-v2-22-0", "wpp-icon-triangle-fill-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-internal-label-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-label-v2-22-0", "wpp-list-item-v2-22-0", "wpp-menu-context-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tag-v2-22-0", "wpp-tooltip-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tree-item-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTreeItem);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-avatar-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-avatar-group-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-checkbox-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-dash-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-tick-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-triangle-fill-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-internal-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-list-item-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-menu-context-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tag-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTreeItem as W, updateTreeByIds as a, convertToOriginalItems as c, defineCustomElement as d, findSelectedItems as f, isHaveFoundChildren as i, markChildrenAs as m, recalculateIndeterminateTreeState as r, updateTreeById as u };
