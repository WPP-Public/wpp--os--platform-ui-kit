import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { MainComponent } from './components/main/main.component'
import { PanelComponent } from './components/panel/panel.component'
import { AccordionExamplePage } from './pages/accordion-example/accordion-example.page'
import { AgGridTableExamplePage } from './pages/ag-grid-table-example/ag-grid-table-example.page'
import { AutocompleteExamplePage } from './pages/autocomplete-example/autocomplete-example.page'
import { AutocompleteVC } from './pages/vc/autocomplete/autocompleteVC'
import { AvatarsVC } from './pages/vc/avatars/avatarsVC'
import { BannerExamplePage } from './pages/banner-example/banner-example.page'
import { ButtonsVC } from './pages/vc/buttons/buttonsVC'
import { CardsVC } from './pages/vc/cards/cardsVC'
import { CheckboxesVC } from './pages/vc/checkboxes/checkboxesVC'
import { CountersVC } from './pages/vc/counters/countersVC'
import { DatepickerExamplePage } from './pages/datepicker-example/datepicker-example.page'
import { FileUploadExamplePage } from './pages/file-upload-example/file-upload.page'
import { ModalExamplePage } from './pages/modal-example/modal-example.page'
import { RadioButtonsExamplePage } from './pages/radio-buttons-example/radio-buttons-example.page'
import { RichtextExamplePage } from './pages/richtext-example/richtext-example.page'
import { InputsExampleVC } from './pages/vc/inputs/inputsVC'
import { TogglesVC } from './pages/vc/toggles/togglesVC'
import { TopbarExamplePage } from './pages/topbar-example/topbar-example.page'
import { BackToTopButtonExamplePage } from './pages/back-to-top-button-example/back-to-top-button-example.page'
import { AgGridModule } from 'ag-grid-angular'

import { AvatarRenderer } from './pages/ag-grid-table-example/components/avatar-renderer/avatar-renderer'
import { CustomLoadingOverlay } from './pages/ag-grid-table-example/components/custom-loading-overlay'
import { NoRowsOverlay } from './pages/ag-grid-table-example/components/no-rows-overlay'
import { CellRenderer } from './pages/ag-grid-table-example/components/cell-renderer'
import { HeaderCellRenderer } from './pages/ag-grid-table-example/components/header-cell-renderer/header-cell-renderer'
import { LinkedinCellRenderer } from './pages/ag-grid-table-example/components/linkedin-cell-renderer'
import { ActionsRenderer } from './pages/ag-grid-table-example/components/actions-renderer/actions-renderer'
import { VCComponent } from './components/vc/vc.component'
import { SelectsVC } from './pages/vc/selects/selectsVC'
import { SelectsExamplePage } from './pages/selects-example/selects-example.page'
import { MenuContextExamplePage } from './pages/menu-context-example/menu-context-example.page'
import { MenuContextVC } from './pages/vc/menu-context/menu-contextVC'
import { PopoversVC } from './pages/vc/popovers/popoversVC'
import { FormExamplePage } from './pages/form-example/form-example.page'
import { BreadcrumbsVC } from './pages/vc/breadcrumbs/breadcrumbsVC'
import { CheckboxExamplePage } from './pages/checkbox-example/checkbox-example.page'
import { InlineEditVC } from './pages/vc/inline-edit/inline-editVC'
import { SteppersVC } from './pages/vc/steppers/steppersVC'
import { HorizontalStepperVC } from './pages/vc/steppers/horizontal-stepper/horizontal-stepperVC'
import { VerticalStepperVC } from './pages/vc/steppers/vertical-stepper/vertical-stepperVC'
import { DecimalVerticalStepperVC } from './pages/vc/steppers/decimal-vertical-stepper/decimal-vertical-stepperVC'
import { TextAreaVC } from './pages/vc/text-area/text-areaVC'
import { ToggleExamplePage } from './pages/toggle-example/toggle-example.page'
import { AcceptConfig } from './pages/file-upload-example/examples/accept-config/accept-config'
import { AcceptProp } from './pages/file-upload-example/examples/accept-prop/accept-prop'
import { AcceptConfigAndAcceptProp } from './pages/file-upload-example/examples/accept-config-and-accept-prop/accept-config-and-accept-prop'
import { NoLimitations } from './pages/file-upload-example/examples/no-limitations/no-limitations'
import { AccordionsVC } from './pages/vc/accordions/accordionsVC'
import { CardGroupVC } from './pages/vc/card-group/card-group'
import { DatepickerVC } from './pages/vc/datepicker/datepickerVC'
import { DividerVC } from './pages/vc/divider/dividerVC'
import { ExpandableCardVC } from './pages/vc/expandable-card/expandable-cardVC'
import { FileUploadVC } from './pages/vc/file-upload/file-uploadVC'
import { GridCssVC } from './pages/vc/grid-css/grid-cssVC'
import { IconsVC } from './pages/vc/icons/iconsVC'
import { ImagesVC } from './pages/vc/images/imagesVC'
import { InlineMessagesVC } from './pages/vc/inline-messages/inline-messagesVC'
import { LabelsVC } from './pages/vc/labels/labelsVC'
import { ListItemsVC } from './pages/vc/list-items/list-itemsVC'
import { ModalsVC } from './pages/vc/modals/modalsVC'
import { FirstModalPageVC } from './pages/vc/modals/components/first-page/first-page'
import { SecondModalPageVC } from './pages/vc/modals/components/second-page/second-page'
import { ThirdModalPageVC } from './pages/vc/modals/components/third-page/third-page'
import { FourthModalPageVC } from './pages/vc/modals/components/fourth-page/fourth-page'
import { NavSidebarVC } from './pages/vc/nav-sidebar/nav-sidebarVC'
import { PaginationsVC } from './pages/vc/paginations/paginationsVC'
import { PillsVC } from './pages/vc/pills/pillsVC'
import { ProgressIndicatorsVC } from './pages/vc/progress-indicators/progress-indicatorsVC'
import { RadioButtonsVC } from './pages/vc/radio-buttons/radio-buttonsVC'
import { SegmentedControlsVC } from './pages/vc/segmented-controls/segmented-controlsVC'
import { SlidersVC } from './pages/vc/sliders/slidersVC'
import { SpinnersVC } from './pages/vc/spinners/spinnersVC'
import { SkeletonVC } from './pages/vc/skeleton/skeletonVC'
import { TabsVC } from './pages/vc/tabs/tabsVC'
import { TagsVC } from './pages/vc/tags/tagsVC'
import { ToastsVC } from './pages/vc/toasts/toastsVC'
import { TooltipsVC } from './pages/vc/tooltips/tooltipsVC'
import { TopbarVC } from './pages/vc/topbar/topbarVC'
import { TreesVC } from './pages/vc/trees/treesVC'
import { TreeMultiple } from './pages/vc/trees/components/tree-multiple/tree-multiple'
import { TreeMultipleWithDefaultSelectedIds } from './pages/vc/trees/components/tree-multiple-with-default-selected-ids/tree-multiple-with-default-selected-ids'
import { TreeMultipleWithNotSelectableItem } from './pages/vc/trees/components/tree-multiple-with-not-selectable-item/tree-multiple-with-not-selectable-item'
import { TreeMultipleWithSearch } from './pages/vc/trees/components/tree-multiple-with-search/tree-multiple-with-search'
import { TreeMultipleWithoutSearchHighlight } from './pages/vc/trees/components/tree-multiple-without-search-highlight/tree-multiple-without-search-highlight'
import { TreeSingle } from './pages/vc/trees/components/tree-single/tree-single'
import { TreeSingleWithCustomSearch } from './pages/vc/trees/components/tree-single-with-custom-search/tree-single-with-custom-search'
import { TreeSingleWithNewCustomSearch } from './pages/vc/trees/components/tree-single-with-new-custom-search/tree-single-with-new-custom-search'
import { TreeSingleWithDisabledAnimation } from './pages/vc/trees/components/tree-single-with-disabled-animation/tree-single-with-disabled-animation'
import { TreeSingleWithSearch } from './pages/vc/trees/components/tree-single-with-search/tree-single-with-search'
import { TypographyVC } from './pages/vc/typography/typographyVC'
import { BannerNavbar } from './pages/banner-example/components/navbar/banner-navbar'
import { BannerTopbar } from './pages/banner-example/components/topbar/banner-topbar'
import { BannerStates } from './pages/banner-example/components/states/banner-states'
import { TreeSingleWithQuotationMarks } from './pages/vc/trees/components/tree-single-with-quotation-marks/tree-single-with-quotation-marks'
import { FormVanilla } from './pages/form-example/components/form-vanilla/form-vanilla'
import { SwiperExamplePage } from './pages/swiper-example/swiper-example.page'
import { CountriesVC } from './pages/vc/icons/countries/countriesVC'
import { CustomDropdown } from './pages/selects-example/Example/custom-dropdown'
import { SearchVC } from './pages/vc/search/searchVC'
import { SelectsMultipleVC } from './pages/vc/selects-multiple/selects-multipleVC'
import { SelectsSingleVC } from './pages/vc/selects-single/selects-singleVC'
import { SelectsTextVC } from './pages/vc/selects-text/selects-textVC'
import { SelectsCombinedVC } from './pages/vc/selects-combined/selects-combinedVC'
import { CombinedInputsVC } from './pages/vc/combined-inputs/combined-inputsVC'
import { DecimalInput } from './pages/vc/inputs/components/decimalInput'
import { StickyBarExamplePage } from './pages/sticky-bar-example/sticky-bar.page'
import { LoadMoreVC } from './pages/vc/load-more/load-moreVC'
import { ComponentsLibraryModule } from '@platform-ui-kit/components-library-angular'
import { ColorPickerExamplePage } from './pages/color-picker-example/color-picker-example.page'
import { VerticalStepperWWidthVC } from './pages/vc/steppers/vertical-stepper-with-width/vertical-stepper-with-widthVC'
import { TreeEndContent } from './pages/vc/trees/components/tree-end-content/tree-end-content'
import { AvatarGroupRenderer } from './pages/ag-grid-table-example/components/avatar-group-renderer/avatar-group-renderer'
import { TreeSkeletonLoading } from './pages/vc/trees/components/tree-skeleton-loading/tree-skeleton-loading'
import { TimePickerExamplePage } from './pages/time-picker-example/time-picker.page'
import { AgGridTableLoadMoreExamplePage } from './pages/ag-grid-table-example/ag-grid-table-load-more-example.page'
import { AgGridTableHybridInfiniteScrollExamplePage } from './pages/ag-grid-table-example/ag-grid-table-hybrid-infinite-scroll-example.page'
import { ChatInputExamplePage } from './pages/chat-input-example/chat-input-example.page'
import { SingleSelectPage } from './pages/single-select-example/single-select-example.page'
import { MultipleSelectPage } from './pages/multiple-select-example/multiple-select-example.page'
import { TextSelectPage } from './pages/text-select-example/text-select-example.page'
import { CombinedSelectPage } from './pages/combined-select-example/combined-select-example.page'
import { OverlayExamplePage } from './pages/overlay-example/overlay-example.page'

@NgModule({
  declarations: [
    MainComponent,
    VCComponent,
    PanelComponent,

    // Pages
    AccordionExamplePage,
    AgGridTableExamplePage,
    AgGridTableLoadMoreExamplePage,
    AgGridTableHybridInfiniteScrollExamplePage,
    CustomLoadingOverlay,
    AutocompleteExamplePage,
    AutocompleteVC,
    AvatarsVC,
    BannerExamplePage,
    BreadcrumbsVC,
    ButtonsVC,
    CardsVC,
    CheckboxesVC,
    ChatInputExamplePage,
    CheckboxExamplePage,
    ColorPickerExamplePage,
    CountersVC,
    CountriesVC,
    DatepickerExamplePage,
    FileUploadExamplePage,
    AcceptConfig,
    AcceptProp,
    AcceptConfigAndAcceptProp,
    NoLimitations,
    ModalExamplePage,
    RadioButtonsExamplePage,
    RichtextExamplePage,
    InputsExampleVC,
    TogglesVC,
    ToggleExamplePage,
    TextAreaVC,
    TopbarExamplePage,
    BackToTopButtonExamplePage,
    SelectsVC,
    SelectsMultipleVC,
    SelectsCombinedVC,
    SelectsSingleVC,
    SelectsTextVC,
    CombinedInputsVC,
    DecimalInput,
    SelectsExamplePage,
    SteppersVC,
    HorizontalStepperVC,
    VerticalStepperVC,
    VerticalStepperWWidthVC,
    DecimalVerticalStepperVC,
    MenuContextExamplePage,
    MenuContextVC,
    PopoversVC,
    InlineEditVC,
    AccordionsVC,
    CardGroupVC,
    DatepickerVC,
    DividerVC,
    ExpandableCardVC,
    FileUploadVC,
    GridCssVC,
    IconsVC,
    ImagesVC,
    InlineMessagesVC,
    LabelsVC,
    ListItemsVC,
    LoadMoreVC,
    ModalsVC,
    FirstModalPageVC,
    SecondModalPageVC,
    ThirdModalPageVC,
    FourthModalPageVC,
    NavSidebarVC,
    PaginationsVC,
    PillsVC,
    ProgressIndicatorsVC,
    RadioButtonsVC,
    SearchVC,
    SegmentedControlsVC,
    SlidersVC,
    SpinnersVC,
    SkeletonVC,
    TabsVC,
    TagsVC,
    ToastsVC,
    TooltipsVC,
    TopbarVC,
    TreesVC,
    TreeMultiple,
    TreeEndContent,
    TreeMultipleWithDefaultSelectedIds,
    TreeMultipleWithNotSelectableItem,
    TreeMultipleWithSearch,
    TreeMultipleWithoutSearchHighlight,
    TreeSingle,
    TreeSingleWithCustomSearch,
    TreeSingleWithNewCustomSearch,
    TreeSingleWithDisabledAnimation,
    TreeSingleWithSearch,
    TreeSingleWithQuotationMarks,
    TypographyVC,
    BannerNavbar,
    BannerTopbar,
    BannerStates,
    FormVanilla,
    TreeSkeletonLoading,

    // AG Grid example
    AvatarRenderer,
    AvatarGroupRenderer,
    CellRenderer,
    CustomLoadingOverlay,
    NoRowsOverlay,
    HeaderCellRenderer,
    LinkedinCellRenderer,
    ActionsRenderer,

    FormExamplePage,

    SwiperExamplePage,
    CustomDropdown,
    StickyBarExamplePage,
    TimePickerExamplePage,
    SingleSelectPage,
    MultipleSelectPage,
    TextSelectPage,
    CombinedSelectPage,
    OverlayExamplePage,
  ],

  imports: [BrowserModule, FormsModule, ComponentsLibraryModule, AppRoutingModule, AgGridModule],

  bootstrap: [MainComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
