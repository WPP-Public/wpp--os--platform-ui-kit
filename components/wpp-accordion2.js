import { proxyCustomElement, HTMLElement, createEvent, h, Fragment, Host } from '@stencil/core/internal/client';
import { W as WrappedSlot } from './WrappedSlot.js';
import { F as FOCUS_TYPE } from './common.js';
import { g as getSlotEmptyStates, k as transformToVersionedTag } from './utils.js';
import { d as defineCustomElement$7 } from './wpp-divider2.js';
import { d as defineCustomElement$6 } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$5 } from './wpp-icon-error2.js';
import { d as defineCustomElement$4 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$3 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const wppAccordionCss = ":host{--accordion-actions-wrapper-left-margin:var(--wpp-accordion-actions-wrapper-left-margin, 8px);--accordion-counter-font-weight:var(--wpp-accordion-counter-font-weight, 400);--accordion-counter-font-size:var(--wpp-accordion-counter-font-size, 16px);--accordion-counter-height:var(--wpp-accordion-counter-height, 24px);--accordion-margin-s:var(--wpp-accordion-margin-s, 7px 0);--accordion-margin-m:var(--wpp-accordion-margin-m, 11px 0);--accordion-margin-l:var(--wpp-accordion-margin-l, 15px 0);--accordion-margin-xl:var(--wpp-accordion-margin-xl, 23px 0);--accordion-margin-2xl:var(--wpp-accordion-margin-2xl, 23px 0);--accordion-icon-margin:var(--wpp-accordion-icon-margin, 0 8px 0 0);--accordion-icon-color:var(--wpp-accordion-icon-color, var(--wpp-grey-color-600));--accordion-icon-color-hover:var(--wpp-accordion-icon-color-hover, var(--wpp-grey-color-800));--accordion-icon-color-active:var(--wpp-accordion-icon-color-active, var(--wpp-grey-color-900));--accordion-icon-color-disabled:var(--wpp-accordion-icon-color-disabled, var(--wpp-grey-color-500));--accordion-text-color-disabled:var(--wpp-accordion-text-color-disabled, var(--wpp-text-color-disabled));--accordion-counter-color:var(--wpp-accordion-counter-color, var(--wpp-text-color-info));--accordion-first-border-color-focus:var(--wpp-accordion-first-border-color-focus, var(--wpp-grey-color-000));--accordion-second-border-color-focus:var(--wpp-accordion-second-border-color-focus, var(--wpp-brand-color));--accordion-expandable-section-margin-left:var(--wpp-accordion-expandable-section-margin-left, 24px);--accordion-expandable-section-margin-s:var(\n    --wpp-accordion-expandable-section-margin-s,\n    -3px 0 11px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-m:var(\n    --wpp-accordion-expandable-section-margin-m,\n    -3px 0 15px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-l:var(\n    --wpp-accordion-expandable-section-margin-l,\n    -3px 0 19px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-xl:var(\n    --wpp-accordion-expandable-section-margin-xl,\n    -7px 0 23px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-2xl:var(\n    --wpp-accordion-expandable-section-margin-2xl,\n    -7px 0 23px var(--accordion-expandable-section-margin-left)\n  );--accordion-margin-s-internal:var(--wpp-accordion-margin-s-internal, 5px 0);--accordion-margin-m-internal:var(--wpp-accordion-margin-m-internal, 4px 0);--accordion-margin-l-internal:var(--wpp-accordion-margin-l-internal, 2px 0);--accordion-margin-xl-internal:var(--wpp-accordion-margin-xl-internal, 0);--accordion-margin-2xl-internal:var(--wpp-accordion-margin-2xl-internal, 0);--accordion-expandable-section-margin-s-internal:var(\n    --wpp-accordion-expandable-section-margin-s-internal,\n    -1px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-m-internal:var(\n    --wpp-accordion-expandable-section-margin-m-internal,\n    8px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-l-internal:var(\n    --wpp-accordion-expandable-section-margin-l-internal,\n    12px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-xl-internal:var(\n    --wpp-accordion-expandable-section-margin-xl-internal,\n    16px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-2xl-internal:var(\n    --wpp-accordion-expandable-section-margin-2xl-internal,\n    16px 0 0 var(--accordion-expandable-section-margin-left)\n  )}:host(.wpp-section-wrapper){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:100%;outline:none}:host(.wpp-section-wrapper) .wpp-section{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:8px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:justify;justify-content:space-between;position:relative}:host(.wpp-section-wrapper) .wpp-section.size-s{margin:var(--accordion-margin-s)}:host(.wpp-section-wrapper) .wpp-section.size-m{margin:var(--accordion-margin-m)}:host(.wpp-section-wrapper) .wpp-section.size-l{margin:var(--accordion-margin-l)}:host(.wpp-section-wrapper) .wpp-section.size-xl{margin:var(--accordion-margin-xl)}:host(.wpp-section-wrapper) .wpp-section.size-2xl{margin:var(--accordion-margin-2xl)}:host(.wpp-section-wrapper) .wpp-section .wpp-icon-chevron{-webkit-transition:-webkit-transform var(--accordion-hide-animation-duration) ease-out;transition:-webkit-transform var(--accordion-hide-animation-duration) ease-out;transition:transform var(--accordion-hide-animation-duration) ease-out;transition:transform var(--accordion-hide-animation-duration) ease-out, -webkit-transform var(--accordion-hide-animation-duration) ease-out}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;position:relative;border:none;background:none;padding:0;outline:none;-ms-flex-positive:1;flex-grow:1}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper.tab-focus{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--accordion-first-border-color-focus), 0 0 0 3px var(--accordion-second-border-color-focus);box-shadow:0 0 0 1px var(--accordion-first-border-color-focus), 0 0 0 3px var(--accordion-second-border-color-focus)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper:focus-visible .title-wrapper .wpp-icon-chevron,:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .tab-focus .title-wrapper .wpp-icon-chevron{color:var(--accordion-icon-color-hover) !important}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-tooltip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-tooltip::part(anchor){width:100%}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .typography-title{color:var(--accordion-title-color)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .typography-title.disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-icon-chevron{margin:var(--accordion-icon-margin);color:var(--accordion-icon-color)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-icon-chevron.disabled{color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper:hover .wpp-icon-chevron{color:var(--accordion-icon-color-hover)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper:active .wpp-icon-chevron{color:var(--accordion-icon-color-active)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-typography{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .tags{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .tags.slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .actions{text-wrap:nowrap}:host(.wpp-section-wrapper) .wpp-section .actions.slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:-ms-flexbox;display:flex}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled).slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled) ::slotted([slot=header]){overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled).disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .counter{padding-left:4px;color:var(--accordion-counter-color)}:host(.wpp-section-wrapper) .closed{overflow:hidden}:host(.wpp-section-wrapper) .content{display:block;max-height:0;margin-left:var(--accordion-expandable-section-margin-left);-webkit-transition:max-height var(--accordion-hide-animation-duration) ease-out, margin var(--accordion-hide-animation-duration) var(--accordion-hide-animation-duration);transition:max-height var(--accordion-hide-animation-duration) ease-out, margin var(--accordion-hide-animation-duration) var(--accordion-hide-animation-duration)}:host(.wpp-section-wrapper) .content slot{display:-ms-flexbox;display:flex}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-s{margin:var(--accordion-margin-s-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-m{margin:var(--accordion-margin-m-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-l{margin:var(--accordion-margin-l-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-xl{margin:var(--accordion-margin-xl-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-2xl{margin:var(--accordion-margin-2xl-internal)}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section{cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section .title-tags-wrapper .title-wrapper{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .title-tags-wrapper .title-wrapper:hover .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .title-tags-wrapper .title-wrapper .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .header ::slotted([slot=header]){color:var(--accordion-text-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .actions{cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section .actions ::slotted([slot=actions]){color:var(--accordion-text-color-disabled)}:host([disabled]:not([disabled=false])) .content ::slotted(.wpp-typography){color:var(--accordion-text-color-disabled)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section .wpp-icon-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section .wpp-icon-chevron{-webkit-transition:-webkit-transform var(--accordion-show-animation-duration) ease-out;transition:-webkit-transform var(--accordion-show-animation-duration) ease-out;transition:transform var(--accordion-show-animation-duration) ease-out;transition:transform var(--accordion-show-animation-duration) ease-out, -webkit-transform var(--accordion-show-animation-duration) ease-out}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section.size-s~.content{margin:var(--accordion-expandable-section-margin-s)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section.size-m~.content{margin:var(--accordion-expandable-section-margin-m)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section.size-l~.content{margin:var(--accordion-expandable-section-margin-l)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section.size-xl~.content{margin:var(--accordion-expandable-section-margin-xl)}:host(.wpp-section-wrapper.wpp-expanded) .wpp-section.size-2xl~.content{margin:var(--accordion-expandable-section-margin-2xl)}:host(.wpp-section-wrapper.wpp-expanded):host(.wpp-internal) .wpp-section.size-s~.content{margin:var(--accordion-expandable-section-margin-s-internal)}:host(.wpp-section-wrapper.wpp-expanded):host(.wpp-internal) .wpp-section.size-m~.content{margin:var(--accordion-expandable-section-margin-m-internal)}:host(.wpp-section-wrapper.wpp-expanded):host(.wpp-internal) .wpp-section.size-l~.content{margin:var(--accordion-expandable-section-margin-l-internal)}:host(.wpp-section-wrapper.wpp-expanded):host(.wpp-internal) .wpp-section.size-xl~.content{margin:var(--accordion-expandable-section-margin-xl-internal)}:host(.wpp-section-wrapper.wpp-expanded):host(.wpp-internal) .wpp-section.size-2xl~.content{margin:var(--accordion-expandable-section-margin-2xl-internal)}:host(.wpp-section-wrapper.wpp-expanded) .content{max-height:var(--accordion-max-height);-webkit-transition:max-height var(--accordion-show-animation-duration) ease;transition:max-height var(--accordion-show-animation-duration) ease}:host([disabled]:not([disabled=false])) .content{pointer-events:none;color:var(--wpp-text-color-disabled)}";

const WppAccordion = /*@__PURE__*/ proxyCustomElement(class WppAccordion extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.prevTextContent = '';
    this.prevFont = '';
    this.cachedTextWidth = 0;
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
        header: '[slot="header"]',
        tags: '[slot="tags"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
      this.hasHeaderSlot = !emptyStates.header;
      this.hasTagSlot = !emptyStates.tags;
      if (!emptyStates.tags && this.disabled) {
        const tagEl = this.host?.querySelector(transformToVersionedTag('wpp-tag').toUpperCase());
        tagEl.setAttribute('disabled', this.disabled.toString());
      }
      this.getContentHeight();
    };
    this.getContentHeight = () => {
      requestAnimationFrame(() => {
        this.calculateContentLayout();
      });
    };
    this.typographyType = () => {
      if (this.size === 's')
        return 's-strong';
      if (this.size === 'm')
        return 'm-strong';
      if (this.size === 'l')
        return 'l-strong';
      if (this.size === 'xl')
        return 'xl-heading';
      if (this.size === '2xl')
        return '2xl-heading';
    };
    this.counterType = () => {
      if (this.size === 's')
        return 's-body';
      if (this.size === 'm')
        return 'm-body';
      if (this.size === 'l')
        return 'l-body';
      if (this.size === 'xl')
        return 'xl-heading';
      if (this.size === '2xl')
        return '2xl-heading';
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
      if (!this.isExpandedTouched)
        this.isExpandedTouched = true;
      this.wppChange.emit({
        expanded: this.expanded,
      });
    };
    this.onClick = (event) => {
      if (this.disabled || event.target.getAttribute('slot') === 'actions') {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this.toggleExpand();
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab' && this.host?.shadowRoot?.activeElement === this.titleTagsWrapperButtonRef)
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.onKeyDown = (event) => {
      if (this.disabled || this.focusType === FOCUS_TYPE.NONE)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleExpand();
      }
    };
    this.hostCssClasses = (isInternal) => ({
      'wpp-accordion': true,
      'wpp-section-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-internal': isInternal,
      'wpp-expanded': this.expanded,
    });
    this.cssSectionClasses = () => ({
      'wpp-section': true,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.contentCssClasses = () => ({
      content: true,
      closed: !this.toggleOverflow,
    });
    this.headerCssClasses = () => ({
      header: true,
      'slot-hidden': !this.hasHeaderSlot,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.calcAnimationTime = () => 500 + Math.floor(this.maxHeight / 100) * 15;
    this.getAnimationStyles = () => {
      // base time is 500ms, and each 100pixels adds 15ms to the animation duration
      const time = this.calcAnimationTime();
      const skipAnimation = this.expandedByDefault && this.expanded && !this.isExpandedTouched;
      return {
        '--accordion-max-height': this.maxHeight + 'px',
        '--accordion-show-animation-duration': skipAnimation ? '0' : `${time}ms`,
        '--accordion-hide-animation-duration': time / 2.5 + 'ms',
      };
    };
    this.tagGroupCssClasses = () => ({
      tags: true,
      'slot-hidden': !this.hasTagSlot,
    });
    this.checkTitleOverflowInternal = () => {
      let textContent = '';
      let font = '';
      let textWidth = 0;
      if (this.text) {
        textContent = this.text;
        font = this.getTextTitleFont();
      }
      else if (this.hasHeaderSlot) {
        const headerData = this.getHeaderSlotText();
        textContent = headerData.headerTitle;
        font = headerData.font;
      }
      else {
        return;
      }
      if (textContent !== this.prevTextContent || font !== this.prevFont) {
        this.prevTextContent = textContent;
        this.prevFont = font;
        this.cachedTextWidth = this.getTextWidth(textContent, font);
      }
      textWidth = this.cachedTextWidth;
      const isOverflowing = textWidth > this.titleMaxWidth;
      if (this.isTitleOverflowing !== isOverflowing) {
        this.isTitleOverflowing = isOverflowing;
      }
    };
    this.checkTitleOverflow = () => {
      requestAnimationFrame(() => this.checkTitleOverflowInternal());
    };
    this.cssTagWrapperClasses = () => ({
      'title-tags-wrapper': true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.maxHeight = undefined;
    this.toggleOverflow = undefined;
    this.hasHeaderSlot = false;
    this.hasActionsSlot = false;
    this.actionsWrapperWidth = undefined;
    this.tagGroupWrapperWidth = undefined;
    this.isExpandedTouched = false;
    this.hasTagSlot = false;
    this.isTitleOverflowing = false;
    this.titleMaxWidth = undefined;
    this.focusType = undefined;
    this.expandedByDefault = false;
    this.expanded = false;
    this.disabled = false;
    this.withDivider = true;
    this.counter = 0;
    this.size = 'l';
    this.text = undefined;
    this.withTag = false;
    this.ariaProps = {};
  }
  updateOverflow(expanded) {
    if (expanded) {
      this.expandedTimeout = setTimeout(() => {
        this.toggleOverflow = expanded;
      }, this.calcAnimationTime());
    }
    else {
      clearTimeout(this.expandedTimeout);
      this.toggleOverflow = expanded;
    }
  }
  /**
   * Calculate the height of the content for the accordion.
   */
  async updateHeight() {
    this.getContentHeight();
  }
  componentWillLoad() {
    this.toggleOverflow = !this.expanded && !this.disabled;
    if (this.expandedByDefault && !this.disabled)
      this.expanded = true;
    this.updateOverflow(this.expanded);
    this.updateSlotData();
  }
  componentDidLoad() {
    const slotWrapper = this.host.shadowRoot.querySelector('.slot-content');
    this.getContentHeight();
    this.resizeObserver = new ResizeObserver(() => {
      this.getContentHeight();
    });
    if (this.resizeObserver) {
      this.resizeObserver.observe(slotWrapper);
      this.resizeObserver.observe(this.host);
    }
    this.checkTitleOverflow();
  }
  componentDidUpdate() {
    this.checkTitleOverflow();
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  calculateContentLayout() {
    this.actionsWrapperWidth = this.host.shadowRoot.querySelector('.actions')?.clientWidth || 0;
    const tagsWrapper = this.host.shadowRoot.querySelector('.tags');
    this.tagGroupWrapperWidth = tagsWrapper?.clientWidth || 0;
    const gaps = this.hasActionsSlot && this.hasTagSlot ? 16 : this.hasActionsSlot || this.hasTagSlot ? 8 : 0;
    const usedWidth = this.actionsWrapperWidth + this.tagGroupWrapperWidth + gaps;
    const titleWrapperMaxWidth = this.host.clientWidth - usedWidth;
    this.titleMaxWidth = titleWrapperMaxWidth - 28;
    const titleWrapper = this.host.shadowRoot.querySelector('.title-wrapper');
    if (titleWrapper) {
      titleWrapper.style.maxWidth = `${titleWrapperMaxWidth}px`;
    }
    const titleWrapperWidth = titleWrapper?.clientWidth || 0;
    if (this.hasTagSlot && tagsWrapper) {
      const leftPosition = titleWrapperWidth + (this.text || this.hasHeaderSlot ? 8 : 0);
      tagsWrapper.style.left = `${leftPosition}px`;
    }
    this.maxHeight = this.host.shadowRoot.querySelector('.slot-content')?.clientHeight || 0;
    this.checkTitleOverflow();
  }
  getTextWidth(text, font) {
    const canvas = this.textWidthCanvas || (this.textWidthCanvas = document.createElement('canvas'));
    const context = canvas.getContext('2d');
    if (context) {
      context.font = font;
      const metrics = context.measureText(text);
      return metrics.width;
    }
    return 0;
  }
  getElementFontStyle(element) {
    const computedStyles = window.getComputedStyle(element);
    const fontWeight = computedStyles.getPropertyValue('--wpp-default-type-font-weight') || computedStyles.fontWeight;
    const fontSize = computedStyles.getPropertyValue('--wpp-default-type-font-size') || computedStyles.fontSize;
    const fontFamily = computedStyles.getPropertyValue('--wpp-default-type-font-family') || computedStyles.fontFamily;
    const lineHeight = computedStyles.getPropertyValue('--wpp-default-type-line-height') || computedStyles.lineHeight;
    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
  }
  getHeaderSlotText() {
    const headerSlot = this.host.shadowRoot?.querySelector('slot[name="header"]');
    const assignedNodes = headerSlot?.assignedNodes({ flatten: true }) || [];
    let textContent = '';
    let font = '';
    let fontRetrieved = false;
    assignedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
      else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        if (!fontRetrieved) {
          font = this.getElementFontStyle(element);
          fontRetrieved = true;
        }
        textContent += element.innerText || element.textContent || '';
      }
    });
    return { headerTitle: textContent.trim(), font };
  }
  getTextTitleFont() {
    const titleTextElement = this.host.shadowRoot?.querySelector('.title-text');
    if (!titleTextElement) {
      return '';
    }
    return this.getElementFontStyle(titleTextElement);
  }
  render() {
    const { headerTitle } = this.getHeaderSlotText();
    const internal = !!this.host.children[0]?.assignedElements;
    const style = this.getAnimationStyles();
    const tooltipText = this.counter > 0 ? `${this.text || headerTitle} (${this.counter})` : this.text || headerTitle || '';
    const titleContent = (h(Fragment, null, this.hasHeaderSlot ? (h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", role: "presentation", onSlotchange: this.updateSlotData })) : (h("wpp-typography-v3-6-0", { type: this.typographyType(), part: "title", role: "presentation", class: "title-text" }, this.text))));
    return (h(Host, { class: this.hostCssClasses(internal), exportparts: "section, title, icon, counter, divider, title-wrapper, content, button", style: style, onBlur: this.onBlur, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown }, h("div", { class: this.cssSectionClasses(), part: "section" }, h("button", { ref: ref => (this.titleTagsWrapperButtonRef = ref), class: this.cssTagWrapperClasses(), "aria-expanded": this.expanded.toString(), "aria-controls": this.ariaProps?.controls ?? 'expandable-panel', id: this.ariaProps?.labelledby ?? 'expandable-button', onFocus: this.onFocus, onClick: this.onClick, disabled: this.disabled, part: "button" }, h("div", { class: "title-wrapper", part: "title-wrapper", role: "none" }, h("wpp-icon-chevron-v3-6-0", { role: "presentation", part: "icon" }), this.isTitleOverflowing ? (h("wpp-tooltip-v3-6-0", { config: { triggerTarget: this.titleTagsWrapperButtonRef }, text: tooltipText }, titleContent)) : (titleContent), this.counter > 0 && (h("wpp-typography-v3-6-0", { type: this.counterType(), class: "counter", part: "counter" }, `(${this.counter})`))), this.withTag && (h(WrappedSlot, { wrapperClass: this.tagGroupCssClasses(), name: "tags", onSlotchange: this.updateSlotData }))), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { class: this.contentCssClasses(), part: "content", role: "region", id: this.ariaProps?.controls ?? 'expandable-panel', "aria-labelledby": this.ariaProps?.labelledby ?? 'expandable-button', ...(!this.expanded ? { inert: true, 'aria-hidden': true } : {}) }, h("slot", { class: "slot-content" })), this.withDivider && h("wpp-divider-v3-6-0", { part: "divider" })));
  }
  static get registryIs() { return "wpp-accordion-v3-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "expanded": ["updateOverflow"]
  }; }
  static get style() { return wppAccordionCss; }
}, [1, "wpp-accordion", "wpp-accordion-v3-6-0", {
    "expandedByDefault": [516, "expanded-by-default"],
    "expanded": [1540],
    "disabled": [516],
    "withDivider": [516, "with-divider"],
    "counter": [2],
    "size": [1],
    "text": [1],
    "withTag": [516, "with-tag"],
    "ariaProps": [16],
    "maxHeight": [32],
    "toggleOverflow": [32],
    "hasHeaderSlot": [32],
    "hasActionsSlot": [32],
    "actionsWrapperWidth": [32],
    "tagGroupWrapperWidth": [32],
    "isExpandedTouched": [32],
    "hasTagSlot": [32],
    "isTitleOverflowing": [32],
    "titleMaxWidth": [32],
    "focusType": [32],
    "updateHeight": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-accordion-v3-6-0", "wpp-divider-v3-6-0", "wpp-icon-chevron-v3-6-0", "wpp-icon-error-v3-6-0", "wpp-icon-warning-v3-6-0", "wpp-internal-tooltip-v3-6-0", "wpp-tooltip-v3-6-0", "wpp-typography-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-accordion-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppAccordion);
      }
      break;
    case "wpp-divider-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-chevron-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-error-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-warning-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-internal-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppAccordion as W, defineCustomElement as d };
