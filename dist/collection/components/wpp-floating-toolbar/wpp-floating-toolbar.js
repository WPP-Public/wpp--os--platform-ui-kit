import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @part action - Every action button, for styling the set from outside.
 * @part action-{id} - One action button, named after its config `id` (for example `action-zoom-level`).
 * @part action-tooltip - The tooltip wrapper around an action that sets one.
 * @part button - The native button inside each action.
 */
export class WppFloatingToolbar {
  constructor() {
    this.items = [];
    this._actionButtonsConfig = [];
    this.themeSubscription = themeSubscriptionController(() => this.host);
    // Used to identify the property we keep track of the selected btn (id or index)
    this.hasIdProp = false;
    // Action to focus after the next render, set when the focused action becomes disabled
    this.pendingFocusIndex = null;
    // Whether the last interaction with the toolbar was a pointer press, so moved focus keeps the same look
    this.isPointerInput = false;
    this.validateActionButtonConfig = (config) => {
      if (config.length > 7) {
        console.error('The number of action buttons must not exceed 7.');
      }
      const actions = this.actionButtonsConfig.filter(item => {
        if (item.icon || item.label)
          return true;
        console.error('Each action button needs an icon, a label, or both.');
        return false;
      });
      this.hasIdProp = actions.every((item) => !!item.id);
      this._actionButtonsConfig = actions.slice(0, 7);
    };
    this.identifierAt = (index) => this.hasIdProp ? this._actionButtonsConfig[index].id : index;
    this.indexOfIdentifier = (identifier) => {
      if (this.hasIdProp)
        return this._actionButtonsConfig.findIndex(item => item.id === identifier);
      return typeof identifier === 'number' && identifier < this._actionButtonsConfig.length ? identifier : -1;
    };
    this.getFocusedIdentifier = () => {
      const ndx = this.items.findIndex(el => el === this.host.shadowRoot?.activeElement);
      return ndx === -1 ? undefined : this.identifierAt(ndx);
    };
    // Previous enabled action first, else the next one
    this.nearestEnabledIndex = (index) => {
      for (let i = index - 1; i >= 0; i--) {
        if (!this._actionButtonsConfig[i].disabled)
          return i;
      }
      for (let i = index + 1; i < this._actionButtonsConfig.length; i++) {
        if (!this._actionButtonsConfig[i].disabled)
          return i;
      }
      return -1;
    };
    // The tab stop stays on the same action across config changes and moves off it only when it's disabled
    this.getRovingIndex = () => {
      const ndx = this.rovingIdentifier === undefined ? -1 : this.indexOfIdentifier(this.rovingIdentifier);
      if (ndx !== -1 && !this._actionButtonsConfig[ndx].disabled)
        return ndx;
      if (ndx !== -1)
        return this.nearestEnabledIndex(ndx);
      return this._actionButtonsConfig.findIndex(item => !item.disabled);
    };
    this.handleBtnClick = (data, index) => {
      data?.onClick && data.onClick();
      if (!this.selectable)
        return;
      this.selectedIdentifier = this.hasIdProp ? data.id : index;
    };
    this.renderActionButton = (data, index, rovingIndex) => {
      // label renders as the button's text; tooltip is ours; everything else is passed through as before
      const { label, tooltip, ...buttonData } = data;
      const key = `${data.id ?? data.icon ?? label}-${index}`;
      // `action` styles every button from outside; `action-<id>` picks one out, as a toolbar holding a
      // readout of changing width needs
      const part = data.id ? `action action-${data.id}` : 'action';
      const button = (h("wpp-action-button-v4-6-0", { key: key, ...buttonData, part: part, exportparts: "button", ariaProps: { ...data.ariaProps, tabIndex: index === rovingIndex ? 0 : -1 }, variant: "secondary", class: {
          'is-selected': this.selectable &&
            (this.hasIdProp ? this.selectedIdentifier === data.id : this.selectedIdentifier === index),
        }, onClick: () => this.handleBtnClick(data, index) }, data.icon && h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' }), label));
      if (!tooltip)
        return button;
      return (h("wpp-tooltip-v4-6-0", { key: `tooltip-${key}`, text: tooltip, part: "action-tooltip" }, button));
    };
    this.getEnabledButtons = () => this.items.filter(item => !item.disabled);
    this.focusItem = (item) => {
      if (!item)
        return;
      item.setFocus();
      this.rovingIdentifier = this.identifierAt(this.items.indexOf(item));
    };
    this.onPointerDown = () => {
      this.isPointerInput = true;
    };
    this.onKeyDown = (event) => {
      this.isPointerInput = false;
      const horizontal = this.orientation === 'horizontal';
      const prevKeys = horizontal ? ['ArrowLeft'] : ['ArrowUp'];
      const nextKeys = horizontal ? ['ArrowRight'] : ['ArrowDown'];
      if (![...prevKeys, ...nextKeys, 'Home', 'End'].includes(event.key))
        return;
      const items = this.getEnabledButtons();
      if (!items)
        return;
      const active = this.host.shadowRoot?.activeElement;
      let ndx = active ? items.findIndex(el => el === active) : 0;
      if (ndx === -1)
        return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') {
        ndx = event.key === 'Home' ? 0 : items.length - 1;
        this.focusItem(items[ndx]);
        return;
      }
      const dir = prevKeys.includes(event.key) ? -1 : 1;
      const nextNdx = (ndx + dir + items.length) % items.length;
      this.focusItem(items[nextNdx]);
    };
    this.hostCssClasses = () => ({
      'wpp-floating-toolbar': true,
    });
    this.wrapperCssClasses = () => ({
      wrapper: true,
      vertical: this.orientation === 'vertical',
    });
    this.selectedIdentifier = undefined;
    this.rovingIdentifier = undefined;
    this.actionButtonsConfig = undefined;
    this.selectable = false;
    this.orientation = 'horizontal';
    this.ariaProps = {};
  }
  onUpdateActionButtonsConfig(config) {
    // Read before the new config replaces the old one: the focused button still matches it
    const focusedIdentifier = this.getFocusedIdentifier();
    this.validateActionButtonConfig(config);
    if (focusedIdentifier === undefined)
      return;
    const focusedIndex = this.indexOfIdentifier(focusedIdentifier);
    if (focusedIndex === -1 || !this._actionButtonsConfig[focusedIndex].disabled)
      return;
    const rescueIndex = this.nearestEnabledIndex(focusedIndex);
    if (rescueIndex === -1)
      return;
    this.pendingFocusIndex = rescueIndex;
    this.rovingIdentifier = this.identifierAt(rescueIndex);
  }
  componentWillLoad() {
    this.validateActionButtonConfig(this.actionButtonsConfig);
  }
  componentDidRender() {
    this.items = Array.from(this.host.shadowRoot?.querySelectorAll(transformToVersionedTag('wpp-action-button')) || []);
    if (this.pendingFocusIndex !== null) {
      this.items[this.pendingFocusIndex]?.setFocus({ focusVisible: !this.isPointerInput });
      this.pendingFocusIndex = null;
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    const rovingIndex = this.getRovingIndex();
    return (h(Host, { class: this.hostCssClasses(), role: "toolbar", "aria-orientation": this.orientation, "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, onKeyDown: this.onKeyDown, onPointerDown: this.onPointerDown }, h("div", { class: this.wrapperCssClasses() }, this._actionButtonsConfig.map((data, index) => this.renderActionButton(data, index, rovingIndex)))));
  }
  static get is() { return "wpp-floating-toolbar"; }
  static get registryIs() { return "wpp-floating-toolbar-v4-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-floating-toolbar.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-floating-toolbar.css"]
    };
  }
  static get properties() {
    return {
      "actionButtonsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionButtonData[]",
          "resolved": "ActionButtonData[]",
          "references": {
            "ActionButtonData": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-floating-toolbar/types.ts::ActionButtonData"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the action buttons configuration.\nMust contain between 1 and 7 items. Each item needs an `icon`, a text `label`, or both.\nWhen the focused action becomes disabled, focus moves to the nearest enabled action. If none is left\nenabled, the toolbar can't hold focus and the browser moves it to the page, so move it somewhere useful\nyourself (for example to the content the toolbar controls)."
        }
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
          "text": "Defines whether the buttons will have a \"selected\" state after being clicked."
        },
        "attribute": "selectable",
        "reflect": false,
        "defaultValue": "false"
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'horizontal' | 'vertical'",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the orientation of the floating toolbar."
        },
        "attribute": "orientation",
        "reflect": false,
        "defaultValue": "'horizontal'"
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
          "text": "Contains the floating toolbar `aria-` props."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "selectedIdentifier": {},
      "rovingIdentifier": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "actionButtonsConfig",
        "methodName": "onUpdateActionButtonsConfig"
      }];
  }
}
