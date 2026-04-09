import { Host, h, Fragment, } from '@stencil/core';
import highlightWords from 'highlight-words';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { debounce, getSlotEmptyStates, transformToVersionedTag, uuidv4 } from '../../utils/utils';
import { EVENT_SOURCE, PRESENTATION_ROLE } from './const';
import { getThemeColor, isValidThemeColor } from './utils';
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
    this.previousLabelText = '';
    this.removeTriggerWrapperAttributes = () => {
      const menuContextTag = transformToVersionedTag('wpp-menu-context').toUpperCase();
      const menuContext = this.host.querySelector(`${menuContextTag}[slot="right"]`);
      if (menuContext) {
        let triggerWrapper = menuContext.querySelector('.trigger-wrapper');
        if (triggerWrapper) {
          triggerWrapper.removeAttribute('tabindex');
          triggerWrapper.removeAttribute('role');
        }
        else {
          const observer = new MutationObserver(() => {
            triggerWrapper = menuContext.querySelector('.trigger-wrapper');
            if (triggerWrapper) {
              triggerWrapper.removeAttribute('tabindex');
              triggerWrapper.removeAttribute('role');
              observer.disconnect();
            }
          });
          observer.observe(menuContext, { childList: true, subtree: true });
        }
      }
    };
    this.setupLabelContentObserver = () => {
      const labelEl = this.host.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      // Create a new observer that will watch for text changes
      this.labelObserver = new MutationObserver(() => {
        const currentLabelText = labelEl.textContent || '';
        if (currentLabelText !== this.previousLabelText) {
          this.previousLabelText = currentLabelText;
          this.updateSlotData();
          requestAnimationFrame(this.checkHasTooltip);
        }
      });
      // Configure the observer to watch for changes in text content and child nodes
      this.labelObserver.observe(labelEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    };
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
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled || this.nonInteractive)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest('.wpp-select-portal'),
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
      'custom-typography': !!this.labelTypography,
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
      'custom-typography': !!this.captionTypography,
    });
    this.ulWrapperCssClasses = () => ({
      'ul-wrapper': true,
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, h(WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, h("span", { class: "highlight-text" }, this.getHighlightedText('label')))), h(WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "caption" }, h("span", { class: "highlight-text" }, this.getHighlightedText('caption'))))));
    };
    this.renderRightSlot = () => (h(WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && h("wpp-icon-chevron-v4-0-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && h("wpp-icon-tick-v4-0-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (h(WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.handleMouseEnter = () => {
      this.updateComponentState({ hover: true });
    };
    this.handleMouseLeave = () => {
      this.updateComponentState({ hover: false });
    };
    this.handleMouseDown = () => {
      this.updateComponentState({ active: true });
    };
    this.handleMouseUp = () => {
      this.updateComponentState({ active: false });
    };
    this.handleKeyDown = (event) => {
      if (this.disabled || this.nonInteractive)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleItemClick();
      }
    };
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
    this.labelTypography = undefined;
    this.captionTypography = undefined;
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.indeterminate = false;
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
  /**
   * Sets focus on the list-item element.
   */
  async setFocus() {
    setTimeout(() => {
      this.host.focus();
    }, 0);
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  typographyLabel() {
    this.applyTypographyVariables('label', this.labelTypography || {});
  }
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {});
  }
  componentWillLoad() {
    this.updateSlotData();
    this.hasRightSlot = !!this.host.querySelector('[slot="right"]');
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
    this.setupLabelContentObserver();
    this.removeTriggerWrapperAttributes();
    this.typographyLabel();
    this.typographyCaption();
  }
  applyTypographyVariables(slotName, props) {
    if (!props)
      return;
    const prefix = `--wpp-list-item-${slotName}`;
    const cssAttrs = ['font-weight', 'font-size', 'font-family', 'line-height', 'letter-spacing', 'text-transform'];
    if (props.type) {
      cssAttrs.forEach(attr => {
        const varName = `--wpp-typography-${props.type}-${attr}`;
        let value = getComputedStyle(this.host).getPropertyValue(varName).trim();
        if (!value)
          value = getComputedStyle(document.body).getPropertyValue(varName).trim();
        if (value)
          this.host.style.setProperty(`${prefix}-${attr}`, value);
      });
    }
    // Only apply custom color if the component is not disabled
    if (props.color && !this.disabled) {
      // Validate and normalize the color
      const normalizedColor = getThemeColor(props.color);
      if (!isValidThemeColor(props.color)) {
        console.warn(`[WppListItem] Using non-theme color "${props.color}". ` +
          `Consider using theme colors CSS variables like "var(--wpp-brand-color)"`);
      }
      this.host.style.setProperty(`${prefix}-color`, normalizedColor);
    }
    else if (this.disabled && props.color) {
      // Remove custom color when disabled to let the disabled state color take effect
      this.host.style.removeProperty(`${prefix}-color`);
    }
  }
  disconnectedCallback() {
    this.tooltipId = uuidv4();
    if (this.labelObserver) {
      this.labelObserver.disconnect();
    }
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords({
      text: captionText,
      query: newValue || '',
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
  disabledChanged() {
    this.typographyLabel();
    this.typographyCaption();
  }
  getHighlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords({
      text: slotText,
      query: this.highlight || '',
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
    const tabIndex = this.disabled ? -1 : this.nonInteractive ? -1 : 0;
    return (h(Host, { class: this.hostCssClasses(), role: PRESENTATION_ROLE, exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: tabIndex }, this.hasSubtitleSlot && (h(WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), h("ul", { onClick: this.handleItemClick, onKeyDown: this.handleKeyDown, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, class: this.ulWrapperCssClasses(), part: "ul-wrapper" }, h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (h("wpp-checkbox-v4-0-0", { disabled: this.disabled, checked: this.checked, indeterminate: this.indeterminate, internalState: displayState, part: "checkbox", name: this.checkboxName || 'wpp-list-item-checkbox' })) : (h(Fragment, null, this.tooltipConfig.leftSlot ? (h("wpp-tooltip-v4-0-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, warning: this.tooltipConfig.leftSlot.warning, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (h("wpp-tooltip-v4-0-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (h("wpp-tooltip-v4-0-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, warning: this.tooltipConfig.rightSlot.warning, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot())))));
  }
  static get is() { return "wpp-list-item"; }
  static get registryIs() { return "wpp-list-item-v4-0-0"; }
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
      "labelTypography": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\n    color?: ThemeColorValue\n    type?: TypographyType\n  }",
          "resolved": "undefined | { color?: ThemeColorValue | undefined; type?: TypographyType | undefined; }",
          "references": {
            "ThemeColorValue": {
              "location": "import",
              "path": "../../../src/types/theme-tokens",
              "id": "src/types/theme-tokens.ts::ThemeColorValue"
            },
            "TypographyType": {
              "location": "import",
              "path": "../wpp-typography/types",
              "id": "src/components/wpp-typography/types.ts::TypographyType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "example",
              "text": "labelTypography={{ color: var(--wpp-brand-color), type: 's-midi' }}"
            }],
          "text": "Custom Typography for label text"
        }
      },
      "captionTypography": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{\n    color?: ThemeColorValue\n    type?: TypographyType\n  }",
          "resolved": "undefined | { color?: ThemeColorValue | undefined; type?: TypographyType | undefined; }",
          "references": {
            "ThemeColorValue": {
              "location": "import",
              "path": "../../../src/types/theme-tokens",
              "id": "src/types/theme-tokens.ts::ThemeColorValue"
            },
            "TypographyType": {
              "location": "import",
              "path": "../wpp-typography/types",
              "id": "src/components/wpp-typography/types.ts::TypographyType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "example",
              "text": "captionTypography={{ color: var(--wpp-warning-color-500), type: 's-caption' }}"
            }],
          "text": "Custom Typography for caption text"
        }
      },
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
      "indeterminate": {
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
              "text": "- This prop is controlled by WppSelect when the list item is used inside the select dropdown with `showSelectAllOption` enabled"
            }],
          "text": "If `true`, the checkbox is in indeterminate state. Only applies when `multiple` is true."
        },
        "attribute": "indeterminate",
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
  static get methods() {
    return {
      "setFocus": {
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
          "text": "Sets focus on the list-item element.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "labelTypography",
        "methodName": "typographyLabel"
      }, {
        "propName": "captionTypography",
        "methodName": "typographyCaption"
      }, {
        "propName": "highlight",
        "methodName": "highlightUpdate"
      }, {
        "propName": "containerState",
        "methodName": "handleViewChange"
      }, {
        "propName": "disabled",
        "methodName": "disabledChanged"
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
