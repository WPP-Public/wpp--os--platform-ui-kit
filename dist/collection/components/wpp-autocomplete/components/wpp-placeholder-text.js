import { Fragment, h } from '@stencil/core';
export function renderPlaceholderTextComponent() {
  const inputPlaceholderCssClasses = () => ({
    'input-placeholder': true,
    'with-hidden-count': this.hiddenSelectedOptionsNumber > 0 && this.value.length > 1,
    hidden: this.isFocused && this.searchText.length > 0,
    disabled: this.disabled,
  });
  const hiddenCountCssClasses = () => ({
    'hidden-count': true,
    computed: this.hiddenSelectedOptionsNumber > 0 && this.value.length > 1,
  });
  return (h(Fragment, null, h("wpp-typography-v4-0-0", { ref: ref => (this.inputPlaceholderRef = ref), type: "s-body", class: inputPlaceholderCssClasses() }, this.placeholderText), h("wpp-typography-v4-0-0", { ref: ref => (this.hiddenInputPlaceholderRef = ref), role: "presentation", type: "s-body", class: "hidden-input-placeholder" }), this.value.length > 1 && (h("wpp-typography-v4-0-0", { class: hiddenCountCssClasses(), type: "s-body" }, "+ ", this.hiddenSelectedOptionsNumber))));
}
