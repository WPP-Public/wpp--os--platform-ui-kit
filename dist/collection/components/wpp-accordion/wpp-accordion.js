import { Host, h, Fragment } from '@stencil/core';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { FOCUS_TYPE } from '../../types/common';
import { getSlotEmptyStates, transformToVersionedTag } from '../../utils/utils';
/**
 * @slot header - content that is placed inside the header section
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 * @slot tags - Content that is placed inside the `.tags` to display contextual tags.
 *
 * @part section - Defines the accordion top wrapper.
 * @part button - Defines the accordion button element (title + chevron icon).
 * @part title-wrapper - Defines wrapper that contains title and chevron.
 * @part title - Defines accordion title.
 * @part icon - Defines accordion icon chevron.
 * @part counter - Defines accordion counter.
 * @part divider - Defines accordion divider.
 * @part ws-wrapper - Content slot wrapper element
 * @part ws-inner - Content slot element
 */
export class WppAccordion {
  constructor() {
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
  static get is() { return "wpp-accordion"; }
  static get registryIs() { return "wpp-accordion-v3-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-accordion.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-accordion.css"]
    };
  }
  static get properties() {
    return {
      "expandedByDefault": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is expanded by default. Enabling this prop prevents users from expanding the accordion and removes the initial expansion animation."
        },
        "attribute": "expanded-by-default",
        "reflect": true,
        "defaultValue": "false"
      },
      "expanded": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is expanded."
        },
        "attribute": "expanded",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "withDivider": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the component has a divider at the bottom."
        },
        "attribute": "with-divider",
        "reflect": true,
        "defaultValue": "true"
      },
      "counter": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0."
            }],
          "text": "Defines the number of elements within a specific section."
        },
        "attribute": "counter",
        "reflect": false,
        "defaultValue": "0"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm' | 'l' | 'xl' | '2xl'",
          "resolved": "\"2xl\" | \"l\" | \"m\" | \"s\" | \"xl\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the section size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'l'"
      },
      "text": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0. If you want to use this prop, use \"header\" slot instead"
            }],
          "text": "If set, adds text next to the section."
        },
        "attribute": "text",
        "reflect": false
      },
      "withTag": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If set to true, displays `Tag` next to the section. The tag must placed in the `.tags` slot."
        },
        "attribute": "with-tag",
        "reflect": true,
        "defaultValue": "false"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the accordion `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "maxHeight": {},
      "toggleOverflow": {},
      "hasHeaderSlot": {},
      "hasActionsSlot": {},
      "actionsWrapperWidth": {},
      "tagGroupWrapperWidth": {},
      "isExpandedTouched": {},
      "hasTagSlot": {},
      "isTitleOverflowing": {},
      "titleMaxWidth": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the expanded state changes."
        },
        "complexType": {
          "original": "AccordionSectionChangeEventDetail",
          "resolved": "AccordionSectionChangeEventDetail",
          "references": {
            "AccordionSectionChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-accordion/types.ts::AccordionSectionChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a section is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "updateHeight": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Calculate the height of the content for the accordion.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "expanded",
        "methodName": "updateOverflow"
      }];
  }
}
