import { Host, h, Fragment } from '@stencil/core';
import highlightWords from 'highlight-words';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { MENU_BAR_ROLE, CONTEXT_ITEM_TAG } from '../wpp-menu-context/constants';
import { debounce, getSlotEmptyStates, transformToVersionedTag, uuidv4 } from '../../utils/utils';
import { EVENT_SOURCE } from './consts';
import { validateLeftSlotContent, validateRightSlotContent } from './utils';
/**
 * @slot left - May contain an icon or avatar that will be placed before the label, e.g. a plus icon, avatar
 * @slot right - May contain an icon, text or tag, action button that will be placed after the label, e.g. a plus icon, action button
 * @slot label - Main text
 * @slot caption - Caption text
 * @slot subtitle - Subtitle text
 *
 * @part item - Wrapper that contains label, icon, caption
 * @part info-wrapper - Wrapper that contains left-icon, label and caption
 * @part body-wrapper - Wrapper that contains label and caption
 * @part checkbox - checkbox element
 */
export class WppListItem {
  constructor() {
    this.tooltipId = uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
    this.checkHasTooltip = () => {
      let labelWrapper = this.host?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = this.host?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = this.host?.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      const textEl = labelEl?.shadowRoot?.querySelector('.typography');
      if (textEl) {
        this.hasTooltip = textEl.clientWidth < textEl.scrollWidth;
      }
      else {
        this.hasTooltip = labelEl.clientWidth < labelEl.scrollWidth;
      }
    };
    this.handleComponentMount = () => {
      this.mounted = true;
      requestAnimationFrame(() => {
        this.checkHasTooltip();
      });
      this.loading = false;
    };
    this.getSlotText = (slotName) => {
      const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
      return slotEl?.textContent || '';
    };
    this.subtitleSlotCssClasses = () => ({
      subtitle: true,
      'slot-hidden': !this.hasSubtitleSlot,
    });
    this.updateComponentState = (updateData) => {
      if (this.nonInteractive)
        return;
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        caption: '[slot="caption"]',
        left: '[slot="left"]',
        right: '[slot="right"]',
        subtitle: '[slot="subtitle"]',
      });
      this.hasCaptionSlot = !emptyStates.caption;
      this.hasLeftSlot = !emptyStates.left;
      this.hasRightSlot = !emptyStates.right;
      this.hasSubtitleSlot = !emptyStates.subtitle;
      this.hasRightSlot && validateRightSlotContent(this.host, this.multiple);
      this.hasLeftSlot && validateLeftSlotContent(this.host, this.multiple);
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-select')),
        isAutocompleteBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-autocomplete')),
      });
    };
    this.handleRightWrapperClick = () => {
      this.eventSource = EVENT_SOURCE.RIGHT_SLOT;
    };
    this.hostCssClasses = () => ({
      'wpp-list-item': true,
      'wpp-disabled': this.disabled,
      'wpp-hidden': this.hidden,
      'wpp-mounted': this.mounted,
      'wpp-loading': this.loading,
    });
    this.itemWrapperCssClasses = () => ({
      item: true,
      checked: this.checked,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'non-interactive': this.nonInteractive,
    });
    this.labelSlotCssClasses = () => ({
      label: true,
      'slot-hidden': Boolean(this.highlight),
    });
    this.leftSlotCssClasses = () => ({
      left: true,
      'slot-hidden': !this.hasLeftSlot,
    });
    this.rightSlotCssClasses = () => ({
      right: true,
      'slot-hidden': !this.hasRightSlot && !this.isExtended && !this.active,
    });
    this.captionSlotCssClasses = () => ({
      caption: true,
      'slot-hidden': !this.hasCaptionSlot || Boolean(this.highlight),
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, h(WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, h("span", { class: "highlight-text" }, this.getHightlightedText('label')))), h(WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "caption" }, h("span", { class: "highlight-text" }, this.getHightlightedText('caption'))))));
    };
    this.renderRightSlot = () => (h(WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && h("wpp-icon-chevron-v2-22-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && h("wpp-icon-tick-v2-22-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (h(WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.loading = true;
    this.mounted = false;
    this.hasCaptionSlot = false;
    this.hasLeftSlot = false;
    this.hasRightSlot = false;
    this.hasCaptionHighlight = false;
    this.hasTooltip = false;
    this.hasToggle = false;
    this.hasSubtitleSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.disabled = false;
    this.highlight = '';
    this.containerState = undefined;
    this.isExtended = false;
    this.tooltipConfig = {};
    this.labelTooltipConfig = {};
    this.linkConfig = {};
    this.hidden = false;
    this.isLoadingItem = false;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon');
    }, 0);
    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle');
    }, 0);
    this.debouncedResizeHandler = debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
  }
  disconnectedCallback() {
    this.tooltipId = uuidv4();
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords({
      text: captionText,
      query: newValue,
      matchExactly: true,
    });
    this.hasCaptionHighlight = chunks.some(el => el.match);
  }
  handleViewChange(newContainerState) {
    if (newContainerState === 'shown') {
      this.mounted = false;
      this.loading = false;
      this.hasTooltip = false;
      setTimeout(this.handleComponentMount, 100);
    }
    // Special state for a cases when we have list items inside context menu to trigger tooltip check
    if (newContainerState === 'tooltipTrigger') {
      requestAnimationFrame(this.checkHasTooltip);
    }
  }
  getHightlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords({
      text: slotText,
      query: this.highlight,
      matchExactly: true,
    });
    if (this.highlight && chunks.some(el => el.match)) {
      return (h("span", { class: "highlight-wrapper" }, chunks.map(({ text, match }) => match && !this.disabled ? (h("span", { key: text, class: "highlight", part: "highlight" }, text)) : (h("span", { key: text }, text)))));
    }
    return slotText;
  }
  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li';
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleItemClick, role: this.isExtended ? MENU_BAR_ROLE : CONTEXT_ITEM_TAG, onMouseEnter: () => this.updateComponentState({ hover: true }), onMouseLeave: () => this.updateComponentState({ hover: false }), onMouseDown: () => this.updateComponentState({ active: true }), onMouseUp: () => this.updateComponentState({ active: false }), exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: this.disabled ? -1 : 0 }, this.hasSubtitleSlot && (h(WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (h("wpp-checkbox-v2-22-0", { disabled: this.disabled, checked: this.checked, internalState: displayState, index: -1, part: "checkbox", name: this.checkboxName && this.checkboxName })) : (h(Fragment, null, this.tooltipConfig.leftSlot ? (h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (h("wpp-tooltip-v2-22-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot()))));
  }
  static get is() { return "wpp-list-item"; }
  static get registryIs() { return "wpp-list-item-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-list-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-list-item.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "ListValue",
          "resolved": "number | string | undefined | { [x: string]: any; }",
          "references": {
            "ListValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-list-item/types.ts::ListValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates the value of list item"
        },
        "attribute": "value",
        "reflect": true
      },
      "label": {
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
          "tags": [],
          "text": "Indicates the label of list item"
        },
        "attribute": "label",
        "reflect": true,
        "defaultValue": "''"
      },
      "checked": {
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
          "text": "If `true`, the component is checked."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "active": {
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
          "text": "If the component is active."
        },
        "attribute": "active",
        "reflect": true,
        "defaultValue": "false"
      },
      "selectable": {
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
          "text": "If `true`, the component is selectable."
        },
        "attribute": "selectable",
        "reflect": true,
        "defaultValue": "false"
      },
      "multiple": {
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
          "text": "If `true`, the component is multiple."
        },
        "attribute": "multiple",
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
          "text": "If `true`, the component is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "highlight": {
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
          "text": "If `true`, it will be used to highlight matching parts of the label or caption text in the component."
        },
        "attribute": "highlight",
        "reflect": true,
        "defaultValue": "''"
      },
      "containerState": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ContainerStateType",
          "resolved": "\"hidden\" | \"shown\" | \"tooltipTrigger\" | undefined",
          "references": {
            "ContainerStateType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-list-item/types.ts::ContainerStateType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Show if the item list container is visible."
        },
        "attribute": "container-state",
        "reflect": true
      },
      "isExtended": {
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
          "text": "If the component is extended."
        },
        "attribute": "is-extended",
        "reflect": true,
        "defaultValue": "false"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "TooltipConfig",
          "resolved": "TooltipConfig",
          "references": {
            "TooltipConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-list-item/types.ts::TooltipConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip config for the slots."
        },
        "defaultValue": "{}"
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configuration of tooltip's dropdown."
        },
        "defaultValue": "{}"
      },
      "linkConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\n    href?: string\n    rel?: string\n    target?: string\n    onClick?: (e: PointerEvent) => void\n  }",
          "resolved": "{ href?: string | undefined; rel?: string | undefined; target?: string | undefined; onClick?: ((e: PointerEvent) => void) | undefined; }",
          "references": {
            "PointerEvent": {
              "location": "global",
              "id": "global::PointerEvent"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If you pass a href here menu-item will be rendered as a tag. This config allow you to customize link"
        },
        "defaultValue": "{}"
      },
      "hidden": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by Autocomplete"
            }],
          "text": "If 'true', the component is hidden."
        },
        "attribute": "hidden",
        "reflect": true,
        "defaultValue": "false"
      },
      "isLoadingItem": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by Autocomplete"
            }],
          "text": "If 'true', the component won't have hover effects."
        },
        "attribute": "is-loading-item",
        "reflect": true,
        "defaultValue": "false"
      },
      "nonInteractive": {
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
          "text": "If 'false', the component will have hover/active style states"
        },
        "attribute": "non-interactive",
        "reflect": true,
        "defaultValue": "false"
      },
      "checkboxName": {
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
          "tags": [],
          "text": "Value for a name attribute on checkbox input\nUsed in WppSelect component"
        },
        "attribute": "checkbox-name",
        "reflect": true
      }
    };
  }
  static get states() {
    return {
      "loading": {},
      "mounted": {},
      "hasCaptionSlot": {},
      "hasLeftSlot": {},
      "hasRightSlot": {},
      "hasCaptionHighlight": {},
      "hasTooltip": {},
      "hasToggle": {},
      "hasSubtitleSlot": {},
      "componentState": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChangeListItem",
        "name": "wppChangeListItem",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the list item was clicked"
        },
        "complexType": {
          "original": "ListItemChangeEventDetail",
          "resolved": "ListItemChangeEventDetail",
          "references": {
            "ListItemChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-list-item/types.ts::ListItemChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "highlight",
        "methodName": "highlightUpdate"
      }, {
        "propName": "containerState",
        "methodName": "handleViewChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "resize",
        "method": "onResize",
        "target": "window",
        "capture": false,
        "passive": true
      }];
  }
}
