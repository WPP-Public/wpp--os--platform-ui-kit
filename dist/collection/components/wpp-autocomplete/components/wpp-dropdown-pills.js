import { Fragment, h } from '@stencil/core';
export function renderDropdownPillsComponent() {
  if (!this.withPills)
    return null;
  this.selectedPillRefs = [];
  /**
   * When isShowMore is `true`:
   * - Checks if child elements (WppPill/WppTooltip) have text truncation:
   *   If truncated, need to add `transparent` class to WppPill/WppTooltip
   * When isShowMore is `false`:
   * - Checks if child elements (WppPill) have text truncation:
   *    - If `true` wrap WppPill with WppTooltip
   *    - If `false` render WppPill
   */
  const isNeedDivider = !!this.selectedOptions.length;
  // Render Show More/Show Less button only in cases when we have truncated WppPill (not .label inside)
  const showMoreLessRender = (label) => (h("wpp-action-button-v4-0-0", { "data-testid": "wpp-autocomplete-show-btn", class: "nowrap", variant: "secondary", onClick: this.handleShowMoreLessClick }, label));
  const renderPillComponent = (option, ndx, isTransparentPill = false) => (h("wpp-pill-v4-0-0", { ref: ref => {
      if (ref)
        this.selectedPillRefs[ndx] = ref;
    }, class: { transparent: this.isShowMore && isTransparentPill }, label: option.label, type: "display", onWppClose: event => {
      this.handleClickListItem({
        ...event,
        ...{ detail: { value: option.value } },
      });
      this.setFocus();
    }, removable: true }));
  const selectedPillsWrapperCssClasses = () => ({
    'selected-pills-wrapper': true,
    'not-empty': !!this.searchText.length || !!this.value.length,
  });
  return (h(Fragment, null, this.value.length > 0 && (h("div", { ref: ref => (this.headerWrapperRef = ref), class: {
      'header-wrapper': true,
      overflow: this.isShowMore,
      visible: this.isShowMore && this.activePillsTruncationState.includes(true),
    }, tabindex: "-1", onClick: () => this.setFocus() }, h("div", { ref: ref => (this.selectedPillsWrapperRef = ref), class: selectedPillsWrapperCssClasses() }, this.selectedOptions.map((option, ndx) => renderPillComponent(option, ndx, this.activePillsTruncationState[ndx]))), h("div", { ref: ref => (this.showMoreElementRef = ref), class: "show-more-action" }, showMoreLessRender(`+${this.activePillsTruncationState.filter(x => x).length} ${this._locales.showMore}`)))), !this.isShowMore && h("div", { class: "show-less-action" }, showMoreLessRender(this._locales.showLess)), isNeedDivider && h("wpp-divider-v4-0-0", { class: "nothing-found-divider" })));
}
