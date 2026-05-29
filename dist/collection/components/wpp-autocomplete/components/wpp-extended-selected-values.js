import { h } from '@stencil/core';
export function renderExtendedSelectedValuesComponent() {
  return (h("div", { class: "selected-values" }, this.extendedSelectedValues?.map(el => (h("wpp-pill-v4-1-0", { label: el.label, type: "display", onWppClose: event => this.handleClickListItem({
      ...event,
      ...{ detail: { value: el.value } },
    }), removable: true })))));
}
