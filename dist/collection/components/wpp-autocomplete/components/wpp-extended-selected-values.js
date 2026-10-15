import { h } from '@stencil/core';
export function renderExtendedSelectedValuesComponent() {
  this.extendedPillRefs = [];
  return (h("div", { class: "selected-values" }, this.extendedSelectedValues?.map((el, ndx) => (h("wpp-pill-v4-5-0", { ref: ref => {
      if (ref)
        this.extendedPillRefs[ndx] = ref;
    }, label: el.label, type: "display", onWppClose: event => {
      this.handleClickListItem({
        ...event,
        ...{ detail: { value: el.value } },
      });
      this.restoreFocusAfterPillRemoval(event, ndx, () => this.extendedPillRefs);
    }, removable: true })))));
}
