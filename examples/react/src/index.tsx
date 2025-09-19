import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '@platform-ui-kit/components-library/dist/platform-ui-kit/wpp-theme.css'
import '@platform-ui-kit/components-library/dist/collection/global.css'

import App from './App'

//@ts-ignore No module declaration
import { createTheme } from '@platform-ui-kit/components-library'
import themeJson from '@platform-ui-kit/components-library/dist/collection/wpp-theme.json'

import { AccordionVCPage } from './pages/vc/Accordion/AccordionVC'
import { Autocomplete } from './pages/Autocomplete/Autocomplete'
import { BreadcrumbsVCPage } from './pages/vc/Breadcrumbs/BreadcrumbsVC'
import { ButtonsVCPage } from './pages/vc/Buttons/ButtonsVC'
import { BackToTopButton } from './pages/BackToTopButton/BackToTopButton'
import { CheckboxesPage } from './pages/Checkboxes/Checkboxes'
import { CheckboxesVCPage } from './pages/vc/Checkboxes/CheckboxesVC'
import { EChartsPage } from './pages/ECharts/ECharts'
import { FormControlsPage } from './pages/FormControls/FormControls'
import { GridCssVcPage } from './pages/vc/GridCSS/GridCSSVC'
import { IconsVCPage } from './pages/vc/Icons/IconsVC'
import { ImagesVCPage } from './pages/vc/Images/ImagesVC'
import { ModalsPage } from './pages/Modals/Modals'
import { ModalsVCPage } from './pages/vc/Modals/ModalsVC'
import { SlidersVCPage } from './pages/vc/Sliders/SlidersVC'
import { SelectsVCPage } from './pages/vc/Selects/SelectsVC'
import { StepperVCPage } from './pages/vc/Steppers/StepperVC'
import { TabsVCPage } from './pages/vc/Tabs/TabsVC'
import { TextAreasVCPage } from './pages/vc/TextAreas/TextAreasVC'
import { InputsVCPage } from './pages/vc/Inputs/InputsVC'
import { ToastsVCPage } from './pages/vc/Toasts/ToastsVC'
import { TogglesPage } from './pages/Toggles/Toggles'
import { RadioButtonsPage } from './pages/RadioButtons/RadioButtons'
import { TogglesVCPage } from './pages/vc/Toggles/TogglesVC'
import { RadioButtonsVCPage } from './pages/vc/RadioButtons/RadioButtonsVC'
import { RichTextPage } from './pages/Richtext/Richtext'
import { CardsVCPage } from './pages/vc/Cards/CardsVC'
import { DividerVCPage } from './pages/vc/Divider/DividerVC'
import { InlineMessagesVCPage } from './pages/vc/InlineMessages/InlineMessagesVC'
import { CountersVCPage } from './pages/vc/Counters/CountersVC'
import { LabelsVCPage } from './pages/vc/Labels/LabelsVC'
import { ListItemsVCPage } from './pages/vc/ListItems/ListItemsVC'
import { MenuContextVCPage } from './pages/vc/MenuContext/MenuContextVC'
import { PaginationsVCPage } from './pages/vc/Paginations/PaginationsVC'
import { SegmentedControlsVCPage } from './pages/vc/SegmentedControls/SegmentedControlsVC'
import { TagsVCPage } from './pages/vc/Tags/TagsVC'
import { TooltipsVCPage } from './pages/vc/Tooltips/TooltipsVC'
import { TypographyVCPage } from './pages/vc/Typography/TypographyVC'
import { TopbarPage } from './pages/Topbar/Topbar'
import { TopbarVCPage } from './pages/vc/Topbar/TopbarVC'
import { NavSidebarVCPage } from './pages/vc/NavSidebar/NavSidebarVC'
import { SpinnersVCPage } from './pages/vc/Spinners/SpinnersVC'
import { ProgressIndicatorsVCPage } from './pages/vc/ProgressIndicators/ProgressIndicatorsVC'
import { PageLinkExample } from './pages/PageLinkExample/PageLinkExample'
import { AccordionPage } from './pages/Accordion/Accordion'
import { AvatarsVCPage } from './pages/vc/Avatars/AvatarsVC'
import { VCPage } from './pages/vc'
import { DatepickerVC } from './pages/vc/Datepicker/DatepickerVC'
import { PaginationAgGridTable } from './pages/AgGridTable/Pagination/PaginationAgGridTable'
import { Banners } from './pages/Banners/Banners'
import { PillsVC } from './pages/vc/Pills/PillsVC'
import { CardGroupVC } from './pages/vc/CardGroup/CardGroupVC'
import { FileUploadVC } from './pages/vc/FileUpload/FileUploadVC'
import { TreeVC } from './pages/vc/Tree/TreeVC'
import { ExpandableCardVC } from './pages/vc/ExpandableCard/ExpandableCardVC'
import { SkeletonPage } from './pages/Skeleton/Skeleton'
import { SkeletonVCPage } from './pages/vc/Skeleton/SkeletonVC'
import { ColorsGenerator } from './pages/ColorsGenerator/ColorsGenerator'
import { MenuContextBasedComponentsVC } from './pages/vc/MenuContextBasedComponents/MenuContextBasedComponentsVC'
import { PopoversVCPage } from './pages/vc/Popovers/PopoversVC'
import { FileUpload } from './pages/FileUpload/FileUpload'
import { MenuContextPage } from './pages/MenuContext/MenuContext'
import { DatepickersPage } from './pages/Datepickers/Datepickers'
import { SelectsPage } from './pages/Selects/Selects'
import { AutocompleteVCPage } from './pages/vc/Autocomplete/AutocompleteVC'
import { CountriesVCPage } from './pages/vc/Icons/Countries/CountriesVC'
import { InlineEditVCPage } from './pages/vc/InlineEdit/InlineEditVC'
import { SearchVCPage } from './pages/vc/Search/SearchVC'
import { SwiperPage } from './pages/Swiper/Swiper'
import { Search } from './pages/Search/Search'
import { CustomSelect } from './pages/CustomSelect/CustomSelect'
import { LoadMoreVCPage } from './pages/vc/LoadMore/LoadMoreVC'

import reportWebVitals from './reportWebVitals'

import './index.css'
import DropdownHiddenWhenNotVisible from './pages/Bugfixes/12842'
import { BugfixPage } from './pages/Bugfixes'
import AutocompleteOnBlur from './pages/Bugfixes/13719'
import CheckTruncateListItem from './pages/Bugfixes/13723'
import EmptyValueSelecting from './pages/Bugfixes/14413'
import ModalChangesWidthOrHeightWithStepper from './pages/Bugfixes/14506'
import Index from './pages/Bugfixes/16043'
import MultiSelectValueSetBeforeOptions from './pages/Bugfixes/16044'
import TooltipAndMenu from './pages/Bugfixes/16078'
import AutoFocusInputs from './pages/Bugfixes/4897'
import PopoverNativeEventsDoNotWork from './pages/Bugfixes/13666'
import DropdownMaxHeightCssVariable from './pages/Bugfixes/14803'
import FastClickingButtonInSafari from './pages/Bugfixes/15788'
import SelectsBlurAndFocusEvents from './pages/Bugfixes/16076'
import MultiSelectDropDown from './pages/Bugfixes/16077'
import LastItemFromDropdown from './pages/Bugfixes/16344'
import SideModals from './pages/Bugfixes/17148'
import MovingPlacesExample from './pages/Bugfixes/16080'
import FileUploadBugfix from './pages/Bugfixes/16589'
import AutofocusInModal from './pages/Bugfixes/15875'
import AutocompleteDropdownIssues from './pages/Bugfixes/16749'
import MultiSelectDropDownDisabledItem from './pages/Bugfixes/18403'
import TextSelect2Lines from './pages/Bugfixes/18849'
import InfiniteScrollAgGridTable from './pages/AgGridTable/InfiniteScrollAgGridTable/InfiniteScrollAgGridTable'
import { PerfPage } from './pages/performance'
import { SelectsPerfExample } from './pages/performance/SelectsPerfExample/SelectsPerfExample'
import { AutocompletesPerfExample } from './pages/performance/AutocompletesPerfExample/AutocompletesPerfExample'
import DropdownGetsCropped from './pages/Bugfixes/21215'
import EventNotTriggeringMenuContext from './pages/Bugfixes/19108'
import { CombinedInputsVCPage } from './pages/vc/CombinedInputs/CombinedInputs'
import { SelectsMultipleVCPage } from './pages/vc/SelectsMultiple/SelectsMultiple'
import { SelectsSingleVCPage } from './pages/vc/SelectsSingle/SelectsSingleVC'
import { SelectsTextVCPage } from './pages/vc/SelectsText/SelectsTextVC'
import AutocompleteCreateNewElementProblem from './pages/Bugfixes/20537'
import SizeSComponentsHeights from './pages/Bugfixes/22987'
import { StickyBarPage } from './pages/StickyBar/StickyBar'
import { SliderMarkInSideModal } from './pages/Bugfixes/26380'
import { DynamicTreeWidth } from './pages/Bugfixes/25809'
import { OneItemSegmentedControl } from './pages/Bugfixes/23062'
import SliderMarksNotVisible from './pages/Bugfixes/27379'
import SliderInputValidations from './pages/Bugfixes/27305'
import ClickSlider from './pages/Bugfixes/27272'
import ColorPicker from './pages/ColorPicker/ColorPicker'
import { SelectableNestedCards } from './pages/Bugfixes/29829'
import { NoSelectedCardDefault } from './pages/Bugfixes/29773'
import FalsyValueSelecting from './pages/Bugfixes/29098'
import StepperResizeObserverIssue from './pages/Bugfixes/30026'
import SliderLabelOverlapIssue from './pages/Bugfixes/28186'
import { ClickingNonInteractiveElementsPopover } from './pages/Bugfixes/30643'
import PopoverEventsNotTriggered from './pages/Bugfixes/30768'
import InputFieldTooltipIssue from './pages/Bugfixes/27613'
import DependableSelectsIssue from './pages/Bugfixes/31351'
import { ButtonsEnterKeyFix } from './pages/Bugfixes/30901'
import StepDynamicContent from './pages/Bugfixes/31258'
import SideModalScrollbarIssue from './pages/Bugfixes/30741'
import { RichTextEditorLinkTooltipHidden } from './pages/Bugfixes/29273'
import { ButtonLoadingStateExample } from './pages/Bugfixes/31702'
import MultiChildDependableSelects from './pages/Bugfixes/31688'
import CardGroupIssue from './pages/Bugfixes/31510'
import SidebarPlacementIssues from './pages/Bugfixes/31410'
import { ItalicTextClipping } from './pages/Bugfixes/31906'
import { InlineEditInputWidth } from './pages/Bugfixes/31910'
import { SearchWithCachingAPI } from './pages/Bugfixes/31855'
import DependableDatepickers from './pages/Bugfixes/27483'
import ModalEventsIssues from './pages/Bugfixes/32186'
import CardGroupTabsIssue from './pages/Bugfixes/32121'
import DestructiveSecondaryDisabledButtonWithIcon from './pages/Bugfixes/54'
import { FileUploadDeprecateAcceptExample } from './pages/Bugfixes/32255'
import { TooltipDynamicTextUpdate } from './pages/Bugfixes/161'
import { InputTooltipTruncation } from './pages/Bugfixes/48'
import ChatInput from './pages/ChatInput/ChatInput'
import { InlineEditSeveralIssues } from './pages/Bugfixes/310'
import SingleSelect from './pages/SingleSelect/SingleSelect'
import MultipleSelect from './pages/MultipleSelect/MultipleSelect'
import TextSelect from './pages/TextSelect/TextSelect'
import CombinedSelect from './pages/CombinedSelect/CombinedSelect'
import TimePicker from './pages/TimePicker/TimePicker'
import { LoadMoreAgGridTable } from './pages/AgGridTable/LoadMore/LoadMoreAgGridTable'
import { InputsWithWppChangeExtraEvent } from './pages/Bugfixes/326'
import CardGroupNesting from './pages/Bugfixes/516'
import ValidateListItemSlots from './pages/Bugfixes/296'
import { SelectsCombinedVCPage } from './pages/vc/SelectsCombined/SelectsCombinedVC'
import { AutocompleteImprovements } from './pages/Bugfixes/496'
import { RichtextMarkdownFix } from './pages/Bugfixes/543'
import MultipleSelectIssues from './pages/Bugfixes/574'
import { HybridInfiniteScrollAgGridTable } from './pages/AgGridTable/HybridInfiniteScrollAgGridTable/HybridInfiniteScrollAgGridTable'
import RecalculateTooltipOnListItem from './pages/Bugfixes/676'
import OverlayPage from './pages/Overlay/Overlay'

const theme = createTheme(themeJson as any)

console.log('Theme JSON', themeJson)

console.log('theme', theme)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="accordion" element={<AccordionPage />} />
          <Route path="autocomplete" element={<Autocomplete />} />
          <Route path="checkboxes" element={<CheckboxesPage />} />
          <Route path="datepickers" element={<DatepickersPage />} />
          <Route path="file-upload" element={<FileUpload />} />
          <Route path="form-controls" element={<FormControlsPage />} />
          <Route path="menu-context" element={<MenuContextPage />} />
          <Route path="menu-context-based-components" element={<MenuContextBasedComponentsVC />} />
          <Route path="modals" element={<ModalsPage />} />
          <Route path="overlay" element={<OverlayPage />} />
          <Route path="radio-buttons" element={<RadioButtonsPage />} />
          <Route path="rich-text" element={<RichTextPage />} />
          <Route path="selects" element={<SelectsPage />} />
          <Route path="single-select" element={<SingleSelect />} />
          <Route path="multiple-select" element={<MultipleSelect />} />
          <Route path="text-select" element={<TextSelect />} />
          <Route path="combined-select" element={<CombinedSelect />} />
          <Route path="skeleton" element={<SkeletonPage />} />
          <Route path="Swiper" element={<SwiperPage />} />
          <Route path="toggles" element={<TogglesPage />} />
          <Route path="topbar" element={<TopbarPage />} />
          <Route path="banners" element={<Banners />} />
          <Route path="back-to-top-button" element={<BackToTopButton />} />
          <Route path="search" element={<Search />} />
          <Route path="custom-select" element={<CustomSelect />} />
          <Route path="sticky-bar" element={<StickyBarPage />} />
          <Route path="time-picker" element={<TimePicker />} />
          <Route path="bugfixes/" element={<BugfixPage />}>
            <Route path="4897" element={<AutoFocusInputs />} />
            <Route path="12842" element={<DropdownHiddenWhenNotVisible />} />
            <Route path="13666" element={<PopoverNativeEventsDoNotWork />} />
            <Route path="13719" element={<AutocompleteOnBlur />} />
            <Route path="13723" element={<CheckTruncateListItem />} />
            <Route path="14413" element={<EmptyValueSelecting />} />
            <Route path="14506" element={<ModalChangesWidthOrHeightWithStepper />} />
            <Route path="14803" element={<DropdownMaxHeightCssVariable />} />
            <Route path="15788" element={<FastClickingButtonInSafari />} />
            <Route path="16043" element={<Index />} />
            <Route path="16044" element={<MultiSelectValueSetBeforeOptions />} />
            <Route path="16076" element={<SelectsBlurAndFocusEvents />} />
            <Route path="16077" element={<MultiSelectDropDown />} />
            <Route path="16078" element={<TooltipAndMenu />} />
            <Route path="16080" element={<MovingPlacesExample />} />
            <Route path="16344" element={<LastItemFromDropdown />} />
            <Route path="16589" element={<FileUploadBugfix />} />
            <Route path="17148" element={<SideModals />} />
            <Route path="15875" element={<AutofocusInModal />} />
            <Route path="16749" element={<AutocompleteDropdownIssues />} />
            <Route path="18403" element={<MultiSelectDropDownDisabledItem />} />
            <Route path="18849" element={<TextSelect2Lines />} />
            <Route path="19108" element={<EventNotTriggeringMenuContext />} />
            <Route path="20537" element={<AutocompleteCreateNewElementProblem />} />
            <Route path="21215" element={<DropdownGetsCropped />} />
            <Route path="22987" element={<SizeSComponentsHeights />} />
            <Route path="23062" element={<OneItemSegmentedControl />} />
            <Route path="25809" element={<DynamicTreeWidth />} />
            <Route path="26380" element={<SliderMarkInSideModal />} />
            <Route path="27272" element={<ClickSlider />} />
            <Route path="27305" element={<SliderInputValidations />} />
            <Route path="27379" element={<SliderMarksNotVisible />} />
            <Route path="27483" element={<DependableDatepickers />} />
            <Route path="29773" element={<NoSelectedCardDefault />} />
            <Route path="29829" element={<SelectableNestedCards />} />
            <Route path="29098" element={<FalsyValueSelecting />} />
            <Route path="30026" element={<StepperResizeObserverIssue />} />
            <Route path="28186" element={<SliderLabelOverlapIssue />} />
            <Route path="30643" element={<ClickingNonInteractiveElementsPopover />} />
            <Route path="30741" element={<SideModalScrollbarIssue />} />
            <Route path="30768" element={<PopoverEventsNotTriggered />} />
            <Route path="27613" element={<InputFieldTooltipIssue />} />{' '}
            <Route path="31351" element={<DependableSelectsIssue />} />
            <Route path="30901" element={<ButtonsEnterKeyFix />} />
            <Route path="31258" element={<StepDynamicContent />} />
            <Route path="29273" element={<RichTextEditorLinkTooltipHidden />} />
            <Route path="31702" element={<ButtonLoadingStateExample />} />
            <Route path="31688" element={<MultiChildDependableSelects />} />
            <Route path="31510" element={<CardGroupIssue />} />
            <Route path="31410" element={<SidebarPlacementIssues />} />
            <Route path="31906" element={<ItalicTextClipping />} />
            <Route path="31910" element={<InlineEditInputWidth />} />
            <Route path="31855" element={<SearchWithCachingAPI />} />
            <Route path="32186" element={<ModalEventsIssues />} />
            <Route path="32121" element={<CardGroupTabsIssue />} />
            <Route path="54" element={<DestructiveSecondaryDisabledButtonWithIcon />} />
            <Route path="32255" element={<FileUploadDeprecateAcceptExample />} />
            <Route path="161" element={<TooltipDynamicTextUpdate />} />
            <Route path="48" element={<InputTooltipTruncation />} />
            <Route path="310" element={<InlineEditSeveralIssues />} />
            <Route path="326" element={<InputsWithWppChangeExtraEvent />} />
            <Route path="516" element={<CardGroupNesting />} />
            <Route path="296" element={<ValidateListItemSlots />} />
            <Route path="496" element={<AutocompleteImprovements />} />
            <Route path="543" element={<RichtextMarkdownFix />} />
            <Route path="574" element={<MultipleSelectIssues />} />
            <Route path="676" element={<RecalculateTooltipOnListItem />} />
          </Route>
          <Route path="performance/" element={<PerfPage />}>
            <Route path="autocompletes" element={<AutocompletesPerfExample />} />
            <Route path="selects" element={<SelectsPerfExample />} />
          </Route>
          <Route path="/vc" element={<VCPage />}>
            <Route path="accordions" element={<AccordionVCPage />} />
            <Route path="avatars" element={<AvatarsVCPage />} />
            <Route path="autocomplete" element={<AutocompleteVCPage />} />
            <Route path="breadcrumbs" element={<BreadcrumbsVCPage />}>
              <Route path="breadcrumbs/*" element={<PageLinkExample />} />
            </Route>
            <Route path="buttons" element={<ButtonsVCPage />} />
            <Route path="cards" element={<CardsVCPage />} />
            <Route path="checkboxes" element={<CheckboxesVCPage />} />
            <Route path="combined-inputs" element={<CombinedInputsVCPage />} />
            <Route path="counters" element={<CountersVCPage />} />
            <Route path="countries" element={<CountriesVCPage />} />
            <Route path="datepicker" element={<DatepickerVC />} />
            <Route path="expandable-card" element={<ExpandableCardVC />} />
            <Route path="divider" element={<DividerVCPage />} />
            <Route path="file-upload" element={<FileUploadVC />} />
            <Route path="grid-css" element={<GridCssVcPage />} />
            <Route path="icons" element={<IconsVCPage />} />
            <Route path="images" element={<ImagesVCPage />} />
            <Route path="inline-edit" element={<InlineEditVCPage />} />
            <Route path="inline-messages" element={<InlineMessagesVCPage />} />
            <Route path="inputs" element={<InputsVCPage />} />
            <Route path="labels" element={<LabelsVCPage />} />
            <Route path="load-more" element={<LoadMoreVCPage />} />
            <Route path="list-items" element={<ListItemsVCPage />} />
            <Route path="menu-context" element={<MenuContextVCPage />} />
            <Route path="modals" element={<ModalsVCPage />} />
            <Route path="sliders" element={<SlidersVCPage />} />
            <Route path="nav-sidebar" element={<NavSidebarVCPage />} />
            <Route path="pagination" element={<PaginationsVCPage />} />
            <Route path="pills" element={<PillsVC />} />
            <Route path="card-group" element={<CardGroupVC />} />
            <Route path="progress-indicators" element={<ProgressIndicatorsVCPage />} />
            <Route path="radio-buttons" element={<RadioButtonsVCPage />} />
            <Route path="search" element={<SearchVCPage />} />
            <Route path="segmented-controls" element={<SegmentedControlsVCPage />} />
            <Route path="selects" element={<SelectsVCPage />} />
            <Route path="selects-multiple" element={<SelectsMultipleVCPage />} />
            <Route path="selects-single" element={<SelectsSingleVCPage />} />
            <Route path="selects-text" element={<SelectsTextVCPage />} />
            <Route path="selects-combined" element={<SelectsCombinedVCPage />} />
            <Route path="spinner" element={<SpinnersVCPage />} />
            <Route path="stepper" element={<StepperVCPage />} />
            <Route path="tabs" element={<TabsVCPage />} />
            <Route path="tags" element={<TagsVCPage />} />
            <Route path="text-areas" element={<TextAreasVCPage />} />
            <Route path="toasts" element={<ToastsVCPage />} />
            <Route path="toggles" element={<TogglesVCPage />} />
            <Route path="tooltips" element={<TooltipsVCPage />} />
            <Route path="topbar" element={<TopbarVCPage />}>
              <Route path="topbar/*" element={<PageLinkExample />} />
            </Route>
            <Route path="tree" element={<TreeVC />} />
            <Route path="typography" element={<TypographyVCPage />} />
            <Route path="skeleton" element={<SkeletonVCPage />} />
            <Route path="popovers" element={<PopoversVCPage />} />
          </Route>
          <Route path="ag-grid-table-pagination" element={<PaginationAgGridTable />} />
          <Route path="ag-grid-table-load-more" element={<LoadMoreAgGridTable />} />
          <Route path="ag-grid-table-hybrid-infinite-scroll" element={<HybridInfiniteScrollAgGridTable />} />
          <Route path="ag-grid-table-infinite-scroll" element={<InfiniteScrollAgGridTable />} />
          <Route path="echarts" element={<EChartsPage />} />
          <Route path="colors-generator" element={<ColorsGenerator />} />
          <Route path="color-picker" element={<ColorPicker />} />
          <Route path="chat-input" element={<ChatInput />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

reportWebVitals()
