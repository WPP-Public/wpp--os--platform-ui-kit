import { h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
export class WppFloatingToolbar {
  constructor() {
    this.items = [];
    this._actionButtonsConfig = [];
    this.validateActionButtonConfig = (config) => {
      if (config.length < 2) {
        console.error('The number of action buttons must be at least 2.');
      }
      else if (config.length > 7) {
        console.error('The number of action buttons must not exceed 7.');
      }
      this._actionButtonsConfig = this.actionButtonsConfig.slice(0, 7).map(item => ({
        ...item,
        variant: 'secondary',
      }));
    };
    this.renderActionButton = (data) => (h("wpp-action-button-v3-5-0", { key: `${data.icon}`, ...data }, h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })));
    this.setActionButtons = () => {
      this.items = Array.from(this.host.shadowRoot?.querySelectorAll(transformToVersionedTag('wpp-action-button')) || []);
      this.syncTabIndexes();
    };
    this.getEnabledButtons = () => this.items.filter(item => !item.disabled);
    this.syncTabIndexes = (ndx = 0) => {
      const items = this.getEnabledButtons();
      if (!items)
        return;
      items.forEach((el, i) => {
        el.ariaProps = { ...(el.ariaProps ?? {}), tabIndex: i === ndx ? 0 : -1 };
      });
    };
    this.onKeyDown = (event) => {
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
        items[ndx]?.setFocus();
        this.syncTabIndexes(ndx);
        return;
      }
      const dir = prevKeys.includes(event.key) ? -1 : 1;
      const nextNdx = (ndx + dir + items.length) % items.length;
      items[nextNdx]?.setFocus();
      this.syncTabIndexes(nextNdx);
    };
    this.hostCssClasses = () => ({
      'wpp-floating-toolbar': true,
    });
    this.wrapperCssClasses = () => ({
      wrapper: true,
      vertical: this.orientation === 'vertical',
    });
    this.actionButtonsConfig = undefined;
    this.orientation = 'horizontal';
    this.ariaProps = {};
  }
  onUpdateActionButtonsConfig(config) {
    this.validateActionButtonConfig(config);
    this.setActionButtons();
  }
  componentWillLoad() {
    this.validateActionButtonConfig(this.actionButtonsConfig);
  }
  componentDidLoad() {
    this.setActionButtons();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "toolbar", "aria-orientation": this.orientation, "aria-label": this.ariaProps?.label, "aria-labelledby": this.ariaProps?.labelledby, onKeyDown: this.onKeyDown }, h("div", { class: this.wrapperCssClasses() }, this._actionButtonsConfig.map(this.renderActionButton))));
  }
  static get is() { return "wpp-floating-toolbar"; }
  static get registryIs() { return "wpp-floating-toolbar-v3-5-0"; }
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
          "text": "Defines the action buttons configuration.\nMust contain between 2 and 7 items."
        }
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
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "actionButtonsConfig",
        "methodName": "onUpdateActionButtonsConfig"
      }];
  }
}
