import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-9177bb6d.js';
import { W as WrappedSlot } from './WrappedSlot-a49aa0dd.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { g as getSlotEmptyStates, j as transformToVersionedTag } from './utils-f3870f15.js';
import './consts-4b0f734e.js';

const wppAccordionCss = ":host{--accordion-actions-wrapper-left-margin:var(--wpp-accordion-actions-wrapper-left-margin, 8px);--accordion-counter-font-weight:var(--wpp-accordion-counter-font-weight, 400);--accordion-counter-font-size:var(--wpp-accordion-counter-font-size, 16px);--accordion-counter-height:var(--wpp-accordion-counter-height, 24px);--accordion-margin-s:var(--wpp-accordion-margin-s, 7px 0);--accordion-margin-m:var(--wpp-accordion-margin-m, 11px 0);--accordion-margin-l:var(--wpp-accordion-margin-l, 15px 0);--accordion-margin-xl:var(--wpp-accordion-margin-xl, 23px 0);--accordion-margin-2xl:var(--wpp-accordion-margin-2xl, 23px 0);--accordion-icon-margin:var(--wpp-accordion-icon-margin, 0 8px 0 0);--accordion-icon-color:var(--wpp-accordion-icon-color, var(--wpp-icon-color));--accordion-icon-color-hover:var(--wpp-accordion-icon-color-hover, var(--wpp-icon-color-hover));--accordion-icon-color-active:var(--wpp-accordion-icon-color-active, var(--wpp-icon-color-active));--accordion-icon-color-disabled:var(--wpp-accordion-icon-color-disabled, var(--wpp-icon-color-disabled));--accordion-text-color-disabled:var(--wpp-accordion-text-color-disabled, var(--wpp-text-color-disabled));--accordion-counter-color:var(--wpp-accordion-counter-color, var(--wpp-text-color-info));--accordion-first-border-color-focus:var(--wpp-accordion-first-border-color-focus, var(--wpp-grey-color-000));--accordion-second-border-color-focus:var(--wpp-accordion-second-border-color-focus, var(--wpp-brand-color));--accordion-expandable-section-margin-left:var(--wpp-accordion-expandable-section-margin-left, 24px);--accordion-expandable-section-margin-s:var(\n    --wpp-accordion-expandable-section-margin-s,\n    -3px 0 11px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-m:var(\n    --wpp-accordion-expandable-section-margin-m,\n    -3px 0 15px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-l:var(\n    --wpp-accordion-expandable-section-margin-l,\n    -3px 0 19px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-xl:var(\n    --wpp-accordion-expandable-section-margin-xl,\n    -7px 0 23px var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-2xl:var(\n    --wpp-accordion-expandable-section-margin-2xl,\n    -7px 0 23px var(--accordion-expandable-section-margin-left)\n  );--accordion-margin-s-internal:var(--wpp-accordion-margin-s-internal, 5px 0);--accordion-margin-m-internal:var(--wpp-accordion-margin-m-internal, 4px 0);--accordion-margin-l-internal:var(--wpp-accordion-margin-l-internal, 2px 0);--accordion-margin-xl-internal:var(--wpp-accordion-margin-xl-internal, 0);--accordion-margin-2xl-internal:var(--wpp-accordion-margin-2xl-internal, 0);--accordion-expandable-section-margin-s-internal:var(\n      --wpp-accordion-expandable-section-margin-s-internal,\n      -1px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-m-internal:var(\n      --wpp-accordion-expandable-section-margin-m-internal,\n      8px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-l-internal:var(\n      --wpp-accordion-expandable-section-margin-l-internal,\n      12px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-xl-internal:var(\n      --wpp-accordion-expandable-section-margin-xl-internal,\n      16px 0 0 var(--accordion-expandable-section-margin-left)\n  );--accordion-expandable-section-margin-2xl-internal:var(\n      --wpp-accordion-expandable-section-margin-2xl-internal,\n      16px 0 0 var(--accordion-expandable-section-margin-left)\n  )}:host(.wpp-section-wrapper){display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;width:100%;outline:none}:host(.wpp-section-wrapper) .wpp-section{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:8px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:justify;justify-content:space-between;position:relative}:host(.wpp-section-wrapper) .wpp-section.size-s{margin:var(--accordion-margin-s)}:host(.wpp-section-wrapper) .wpp-section.size-m{margin:var(--accordion-margin-m)}:host(.wpp-section-wrapper) .wpp-section.size-l{margin:var(--accordion-margin-l)}:host(.wpp-section-wrapper) .wpp-section.size-xl{margin:var(--accordion-margin-xl)}:host(.wpp-section-wrapper) .wpp-section.size-2xl{margin:var(--accordion-margin-2xl)}:host(.wpp-section-wrapper) .wpp-section.tab-focus{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--accordion-first-border-color-focus), 0 0 0 2px var(--accordion-second-border-color-focus);box-shadow:0 0 0 1px var(--accordion-first-border-color-focus), 0 0 0 2px var(--accordion-second-border-color-focus)}:host(.wpp-section-wrapper) .wpp-section .wpp-icon-chevron{-webkit-transition:-webkit-transform var(--accordion-hide-animation-duration) ease-out;transition:-webkit-transform var(--accordion-hide-animation-duration) ease-out;transition:transform var(--accordion-hide-animation-duration) ease-out;transition:transform var(--accordion-hide-animation-duration) ease-out, -webkit-transform var(--accordion-hide-animation-duration) ease-out}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;position:relative}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-tooltip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-tooltip::part(anchor){width:100%}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .typography-title{color:var(--accordion-title-color)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .typography-title.disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper.disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-icon-chevron{margin:var(--accordion-icon-margin);color:var(--accordion-icon-color)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-icon-chevron.disabled{color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper:hover .wpp-icon-chevron:not(.disabled){color:var(--accordion-icon-color-hover)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper:active .wpp-icon-chevron{color:var(--accordion-icon-color-active)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper.disabled .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .title-wrapper .wpp-typography{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .tags{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;position:absolute;left:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}:host(.wpp-section-wrapper) .wpp-section .title-tags-wrapper .tags.slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .actions{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);text-wrap:nowrap}:host(.wpp-section-wrapper) .wpp-section .actions.slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:-ms-flexbox;display:flex}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled).slot-hidden{display:none}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled) ::slotted([slot=header]){overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host(.wpp-section-wrapper) .wpp-section .header:not(.disabled).disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .wpp-section .counter{padding-left:4px;color:var(--accordion-counter-color)}:host(.wpp-section-wrapper) .wpp-section.tab-focus .title-wrapper .wpp-icon-chevron{color:var(--accordion-icon-color-hover)}:host(.wpp-section-wrapper) .wpp-section.disabled{cursor:not-allowed;color:var(--wpp-text-color-disabled)}:host(.wpp-section-wrapper) .closed{overflow:hidden}:host(.wpp-section-wrapper) .content{display:block;max-height:0;margin-left:var(--accordion-expandable-section-margin-left);-webkit-transition:max-height var(--accordion-hide-animation-duration) ease-out, margin var(--accordion-hide-animation-duration) var(--accordion-hide-animation-duration);transition:max-height var(--accordion-hide-animation-duration) ease-out, margin var(--accordion-hide-animation-duration) var(--accordion-hide-animation-duration)}:host(.wpp-section-wrapper) .content slot{display:-ms-flexbox;display:flex}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-s{margin:var(--accordion-margin-s-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-m{margin:var(--accordion-margin-m-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-l{margin:var(--accordion-margin-l-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-xl{margin:var(--accordion-margin-xl-internal)}:host(.wpp-section-wrapper):host(.wpp-internal) .wpp-section.size-2xl{margin:var(--accordion-margin-2xl-internal)}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section{cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section .title-wrapper{cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section .title-wrapper:hover .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .title-wrapper:active .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .header ::slotted([slot=header]){color:var(--accordion-text-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .wpp-icon-chevron{color:var(--accordion-icon-color-disabled)}:host([disabled]:not([disabled=false])) .wpp-section .actions{cursor:not-allowed}:host([disabled]:not([disabled=false])) .wpp-section .actions ::slotted([slot=actions]){color:var(--accordion-text-color-disabled)}:host([disabled]:not([disabled=false])) .content ::slotted(.wpp-typography){color:var(--accordion-text-color-disabled)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section .wpp-icon-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section .wpp-icon-chevron{-webkit-transition:-webkit-transform var(--accordion-show-animation-duration) ease-out;transition:-webkit-transform var(--accordion-show-animation-duration) ease-out;transition:transform var(--accordion-show-animation-duration) ease-out;transition:transform var(--accordion-show-animation-duration) ease-out, -webkit-transform var(--accordion-show-animation-duration) ease-out}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section.size-s~.content{margin:var(--accordion-expandable-section-margin-s)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section.size-m~.content{margin:var(--accordion-expandable-section-margin-m)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section.size-l~.content{margin:var(--accordion-expandable-section-margin-l)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section.size-xl~.content{margin:var(--accordion-expandable-section-margin-xl)}:host(.wpp-section-wrapper[aria-expanded]) .wpp-section.size-2xl~.content{margin:var(--accordion-expandable-section-margin-2xl)}:host(.wpp-section-wrapper[aria-expanded]):host(.wpp-internal) .wpp-section.size-s~.content{margin:var(--accordion-expandable-section-margin-s-internal)}:host(.wpp-section-wrapper[aria-expanded]):host(.wpp-internal) .wpp-section.size-m~.content{margin:var(--accordion-expandable-section-margin-m-internal)}:host(.wpp-section-wrapper[aria-expanded]):host(.wpp-internal) .wpp-section.size-l~.content{margin:var(--accordion-expandable-section-margin-l-internal)}:host(.wpp-section-wrapper[aria-expanded]):host(.wpp-internal) .wpp-section.size-xl~.content{margin:var(--accordion-expandable-section-margin-xl-internal)}:host(.wpp-section-wrapper[aria-expanded]):host(.wpp-internal) .wpp-section.size-2xl~.content{margin:var(--accordion-expandable-section-margin-2xl-internal)}:host(.wpp-section-wrapper[aria-expanded]) .content{max-height:var(--accordion-max-height);-webkit-transition:max-height var(--accordion-show-animation-duration) ease;transition:max-height var(--accordion-show-animation-duration) ease}:host([disabled]:not([disabled=false])) .content{pointer-events:none;color:var(--wpp-text-color-disabled)}";

const getInitFocusInfo = () => ({
  wrapper: FOCUS_TYPE.NONE,
  slot: FOCUS_TYPE.NONE,
});
const WppAccordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.getContentHeight = () => {
      requestAnimationFrame(() => {
        this.actionsWrapperWidth = this.host.shadowRoot.querySelector('.actions')?.clientWidth || 0;
        const tagsWrapper = this.host.shadowRoot.querySelector('.tags');
        this.tagGroupWrapperWidth = tagsWrapper?.clientWidth || 0;
        const gaps = this.hasActionsSlot && this.hasTagSlot ? 16 : this.hasActionsSlot || this.hasTagSlot ? 8 : 0;
        const usedWidth = this.actionsWrapperWidth + this.tagGroupWrapperWidth + gaps;
        const titleWrapperMaxWidth = this.host.clientWidth - usedWidth;
        //Removing the icon + margin width
        this.titleMaxWidth = titleWrapperMaxWidth - 28;
        const titleWrapper = this.host.shadowRoot.querySelector('.title-wrapper');
        if (titleWrapper) {
          titleWrapper.style.maxWidth = `${titleWrapperMaxWidth}px`;
        }
        const titleWrapperWidth = titleWrapper?.clientWidth || 0;
        if (this.hasTagSlot && tagsWrapper) {
          // Add an 8px gap if there's a title
          const leftPosition = titleWrapperWidth + (this.text || this.hasHeaderSlot ? 8 : 0);
          tagsWrapper.style.left = `${leftPosition}px`;
        }
        this.maxHeight = this.host.shadowRoot.querySelector('.slot-content')?.clientHeight || 0;
        this.checkTitleOverflow();
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
    this.onClick = (event) => {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this.expanded = !this.expanded;
      if (!this.isExpandedTouched)
        this.isExpandedTouched = true;
      this.wppChange.emit({
        expanded: this.expanded,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('slot', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('slot', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.hostCssClasses = (isInternal) => ({
      'wpp-accordion': true,
      'wpp-section-wrapper': true,
      'wpp-disabled': this.disabled,
      'wpp-internal': isInternal,
    });
    this.cssClasses = () => ({
      'wpp-section': true,
      disabled: this.disabled,
      'tab-focus': this.focusType.wrapper === FOCUS_TYPE.TAB && this.focusType.slot !== FOCUS_TYPE.TAB,
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
    this.checkTitleOverflow = () => {
      requestAnimationFrame(() => {
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
      });
    };
    this.maxHeight = undefined;
    this.toggleOverflow = undefined;
    this.focusType = getInitFocusInfo();
    this.hasHeaderSlot = false;
    this.hasActionsSlot = false;
    this.actionsWrapperWidth = undefined;
    this.tagGroupWrapperWidth = undefined;
    this.isExpandedTouched = false;
    this.hasTagSlot = false;
    this.isTitleOverflowing = false;
    this.titleMaxWidth = undefined;
    this.expandedByDefault = false;
    this.expanded = false;
    this.disabled = false;
    this.withDivider = true;
    this.counter = 0;
    this.size = 'l';
    this.text = undefined;
    this.withTag = false;
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
  get tabIndex() {
    return this.disabled ? -1 : 0;
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
    const titleContent = (h(Fragment, null, h("wpp-typography-v2-22-0", { type: this.typographyType(), part: "title", class: "title-text" }, this.text), h(WrappedSlot, { wrapperClass: this.headerCssClasses(), name: "header", onSlotchange: this.updateSlotData })));
    return (h(Host, { class: this.hostCssClasses(internal), "aria-expanded": this.expanded, role: "treeitem", exportparts: "section, title, icon, counter, divider, title-wrapper, content", onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, "aria-disabled": this.disabled, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), style: style, tabIndex: this.tabIndex }, h("div", { class: this.cssClasses(), part: "section" }, h("div", { class: "title-tags-wrapper", onClick: this.onClick }, h("div", { class: "title-wrapper", part: "title-wrapper" }, h("wpp-icon-chevron-v2-22-0", { part: "icon" }), this.isTitleOverflowing ? h("wpp-tooltip-v2-22-0", { text: tooltipText }, titleContent) : titleContent, this.counter > 0 && (h("wpp-typography-v2-22-0", { type: this.counterType(), class: "counter", part: "counter" }, `(${this.counter})`))), this.withTag && (h(WrappedSlot, { wrapperClass: this.tagGroupCssClasses(), name: "tags", onSlotchange: this.updateSlotData }))), h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData })), h("div", { class: this.contentCssClasses(), part: "content", onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'slot') }, h("slot", { class: "slot-content" })), this.withDivider && h("wpp-divider-v2-22-0", { part: "divider" })));
  }
  static get registryIs() { return "wpp-accordion-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["updateOverflow"]
  }; }
};
WppAccordion.style = wppAccordionCss;

export { WppAccordion as wpp_accordion };
