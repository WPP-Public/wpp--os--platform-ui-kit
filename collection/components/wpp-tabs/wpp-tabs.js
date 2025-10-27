import { h, Host } from '@stencil/core';
import { debounce, transformToVersionedTag } from '../../utils/utils';
import { TAB_MARGIN_RIGHT } from './const';
/**
 * @slot - Should contain only the tab control elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - tabs slider element
 */
export class WppTabs {
  constructor() {
    this.resizeObserver = new ResizeObserver(debounce(() => {
      this.redrawUnderline(this.position);
    }, 50));
    this.hostCssClasses = () => ({
      'wpp-tabs': true,
    });
    this.position = undefined;
    this.previousActiveTab = undefined;
    this.value = undefined;
    this.size = 'm';
  }
  handleChangeTabControlItemClick(event) {
    this.value = event.detail.value;
  }
  sizeChanged(newSize) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      tab.setAttribute('size', newSize);
    });
  }
  valueChanged(newValue) {
    this.previousActiveTab?.setAttribute('active', 'false');
    const activeElement = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-tab'))).find(tab => tab.value === newValue);
    activeElement?.setAttribute('active', 'true');
    this.redrawUnderline(newValue);
    this.previousActiveTab = activeElement ?? null;
    this.wppChange.emit({ value: newValue, itemId: '' });
  }
  redrawUnderline(newPosition) {
    this.position = newPosition;
    let sumWidthOfPreviousElements = 0;
    let currentItemWidth = 0;
    let isToSumWidthOfPreviousElements = true;
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.position) {
        isToSumWidthOfPreviousElements = false;
      }
      if (isToSumWidthOfPreviousElements) {
        sumWidthOfPreviousElements += tab.clientWidth + TAB_MARGIN_RIGHT;
      }
      if (tab.value === newPosition) {
        currentItemWidth = tab.clientWidth || 0;
      }
    });
    this.host.style.setProperty('--tab-bar-item-transform', `${sumWidthOfPreviousElements}px`);
    this.host.style.setProperty('--tab-bar-item-width', `${currentItemWidth}px`);
    this.host.style.setProperty('--tab-bar-item-position', newPosition.toString());
  }
  lengthChange(newLength) {
    newLength && this.host.style.setProperty('--item-length', newLength.toString());
  }
  componentDidLoad() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.host);
    }
    let amountOfActiveTabs = 0;
    this.lengthChange(this.host.children.length);
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.value) {
        tab.setAttribute('active', 'true');
      }
      tab.setAttribute('size', this.size);
      if (tab.hasAttribute('active')) {
        amountOfActiveTabs = amountOfActiveTabs + 1;
        if (amountOfActiveTabs > 1) {
          tab.removeAttribute('active');
          return;
        }
        this.previousActiveTab = tab;
        this.redrawUnderline(tab.value);
      }
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, slider" }, h("div", { class: "wpp-tab-control-wrapper", role: "listbox", "aria-multiselectable": "false", part: "wrapper" }, h("slot", { part: "inner" })), h("div", { class: "slider", part: "slider" })));
  }
  static get is() { return "wpp-tabs"; }
  static get registryIs() { return "wpp-tabs-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tabs.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tabs.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the active tab `itemId`."
        },
        "attribute": "value",
        "reflect": true
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'m' | 's'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates tabs size"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      }
    };
  }
  static get states() {
    return {
      "position": {},
      "previousActiveTab": {}
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
          "text": "Emitted when the active tab has changed, emits index of the active tab"
        },
        "complexType": {
          "original": "TabsChangeEventDetail",
          "resolved": "TabsChangeEventDetail",
          "references": {
            "TabsChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tabs/types.ts::TabsChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "size",
        "methodName": "sizeChanged"
      }, {
        "propName": "value",
        "methodName": "valueChanged"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppChangeTabControlItem",
        "method": "handleChangeTabControlItemClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
