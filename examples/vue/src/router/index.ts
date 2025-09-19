import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

import VisualComparisonGroup from '../views/groups/VisualComparisonGroup/VisualComparisonGroup.vue'
import BugfixesGroup from '@/views/groups/BugfixesGroup/BugfixesGroup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bugfixes',
      component: BugfixesGroup,
      children: [],
    },
    {
      path: '/vc',
      component: VisualComparisonGroup,
      children: [
        {
          path: 'accordions',
          component: () => import('../views/examples/vc/AccordionVCExample/AccordionVCExample.vue'),
        },
        {
          path: 'autocomplete',
          component: () => import('../views/examples/vc/AutocompleteVCExample/AutocompleteVCExample.vue'),
        },
        {
          path: 'avatars',
          component: () => import('../views/examples/vc/AvatarVCExample/AvatarVCExample.vue'),
        },
        {
          path: 'breadcrumbs',
          component: () => import('../views/examples/vc/BreadcrumbsVCExample/BreadcrumbsVCExample.vue'),
        },
        {
          path: 'buttons',
          component: () => import('../views/examples/vc/ButtonVCExample/ButtonVCExample.vue'),
        },
        {
          path: 'cards',
          component: () => import('../views/examples/vc/CardVCExample/CardVCExample.vue'),
        },
        {
          path: 'card-group',
          component: () => import('../views/examples/vc/CardGroupVCExample/CardGroupVCExample.vue'),
        },
        {
          path: 'checkboxes',
          component: () => import('../views/examples/vc/CheckboxVCExample/CheckboxVCExample.vue'),
        },
        {
          path: 'combined-inputs',
          component: () => import('../views/examples/vc/CombinedInputsVCExample/CombinedInputsVCExample.vue'),
        },
        {
          path: 'counters',
          component: () => import('../views/examples/vc/CounterVCExample/CounterVCExample.vue'),
        },
        {
          path: 'countries',
          component: () => import('../views/examples/vc/IconsVCExample/countries/CountriesVCExample.vue'),
        },
        {
          path: 'datepicker',
          component: () => import('../views/examples/vc/DatePickerVCExample/DatePickerVCExample.vue'),
        },
        {
          path: 'divider',
          component: () => import('../views/examples/vc/DividerVCExample/DividerVCExample.vue'),
        },
        {
          path: 'expandable-card',
          component: () => import('../views/examples/vc/ExpandableCardVCExample/ExpandableCardVCExample.vue'),
        },
        {
          path: 'file-upload',
          component: () => import('../views/examples/vc/FileUploadVCExample/FileUploadVCExample.vue'),
        },
        {
          path: 'grid-css',
          component: () => import('../views/examples/vc/GridCSSVCExample/GridCSSVCExample.vue'),
        },
        {
          path: 'icons',
          component: () => import('../views/examples/vc/IconsVCExample/IconsVCExample.vue'),
        },
        {
          path: 'inline-edit',
          component: () => import('../views/examples/vc/InlineEditVCExample/InlineEditVCExample.vue'),
        },
        {
          path: 'inline-messages',
          component: () => import('../views/examples/vc/InlineMessageVCExample/InlineMessageVCExample.vue'),
        },
        {
          path: 'inputs',
          component: () => import('../views/examples/vc/InputVCExample/InputVCExample.vue'),
        },
        {
          path: 'images',
          component: () => import('../views/examples/vc/ImagesVCExample/ImagesVCExample.vue'),
        },
        {
          path: 'inline-edit',
          component: () => import('../views/examples/vc/InlineEditVCExample/InlineEditVCExample.vue'),
        },
        {
          path: 'labels',
          component: () => import('../views/examples/vc/LabelVCExample/LabelVCExample.vue'),
        },
        {
          path: 'list-items',
          component: () => import('../views/examples/vc/ListItemVCExample/ListItemVCExample.vue'),
        },
        {
          path: 'load-more',
          component: () => import('../views/examples/vc/LoadMoreVCExample/LoadMoreVCExample.vue'),
        },
        {
          path: 'menu-context',
          component: () => import('../views/examples/vc/MenuContextVCExample/MenuContextVCExample.vue'),
        },
        {
          path: 'modals',
          component: () => import('../views/examples/vc/ModalVCExample/ModalVCExample.vue'),
        },
        {
          path: 'nav-sidebar',
          component: () => import('../views/examples/vc/NavSidebarVCExample/NavSidebarVCExample.vue'),
        },
        {
          path: 'pagination',
          component: () => import('../views/examples/vc/PaginationVCExample/PaginationVCExample.vue'),
        },
        {
          path: 'pills',
          component: () => import('../views/examples/vc/PillVCExample/PillVCExample.vue'),
        },
        {
          path: 'popovers',
          component: () => import('../views/examples/vc/PopoversVCExample/PopoversVCExample.vue'),
        },
        {
          path: 'progress-indicators',
          component: () => import('../views/examples/vc/ProgressIndicatorVCExample/ProgressIndicatorVCExample.vue'),
        },
        {
          path: 'radio-buttons',
          component: () => import('../views/examples/vc/RadioVCExample/RadioVCExample.vue'),
        },
        {
          path: 'search',
          component: () => import('../views/examples/vc/SearchVCExample/SearchVCExample.vue'),
        },
        {
          path: 'segmented-controls',
          component: () => import('../views/examples/vc/SegmentedControlVCExample/SegmentedControlVCExample.vue'),
        },
        {
          path: 'selects-multiple',
          component: () => import('../views/examples/vc/SelectsMultipleVCExample/SelectsMultipleVCExample.vue'),
        },
        {
          path: 'selects-single',
          component: () => import('../views/examples/vc/SelectsSingleVCExample/SelectsSingleVCExample.vue'),
        },
        {
          path: 'selects-text',
          component: () => import('../views/examples/vc/SelectsTextVCExample/SelectsTextVCExample.vue'),
        },
        {
          path: 'selects-combined',
          component: () => import('../views/examples/vc/SelectsCombinedVCExample/SelectsCombinedVCExample.vue'),
        },
        {
          path: 'sliders',
          component: () => import('../views/examples/vc/SliderVCExample/SliderVCExample.vue'),
        },
        {
          path: 'spinner',
          component: () => import('../views/examples/vc/SpinnerVCExample/SpinnerVCExample.vue'),
        },
        {
          path: 'skeleton',
          component: () => import('../views/examples/vc/SkeletonVCExample/SkeletonVCExample.vue'),
        },
        {
          path: 'stepper',
          component: () => import('../views/examples/vc/StepperVCExample/StepperVCExample.vue'),
        },
        {
          path: 'tabs',
          component: () => import('../views/examples/vc/TabsVCExample/TabsVCExample.vue'),
        },
        {
          path: 'tags',
          component: () => import('../views/examples/vc/TagVCExample/TagVCExample.vue'),
        },
        {
          path: 'text-areas',
          component: () => import('../views/examples/vc/TextAreaVCExample/TextAreaVCExample.vue'),
        },
        {
          path: 'toasts',
          component: () => import('../views/examples/vc/ToastVCExample/ToastVCExample.vue'),
        },
        {
          path: 'toggles',
          component: () => import('../views/examples/vc/ToggleVCExample/ToggleVCExample.vue'),
        },
        {
          path: 'tooltips',
          component: () => import('../views/examples/vc/TooltipVCExample/TooltipVCExample.vue'),
        },
        {
          path: 'topbar',
          component: () => import('../views/examples/vc/TopBarVCExample/TopBarVCExample.vue'),
        },
        {
          path: 'tree',
          component: () => import('../views/examples/vc/TreeVCExample/TreeVCExample.vue'),
        },
        {
          path: 'typography',
          component: () => import('../views/examples/vc/TypographyVCExample/TypographyVCExample.vue'),
        },
      ],
    },
    {
      path: '/accordion',
      component: () => import('../views/examples/AccordionExample/AccordionExample.vue'),
    },
    {
      path: '/ag-grid-table-pagination',
      component: () => import('../views/examples/AgGridTableExample/AgGridTableExample.vue'),
    },
    {
      path: '/ag-grid-table-load-more',
      component: () => import('../views/examples/AgGridTableExample/AgGridTableLoadMoreExample.vue'),
    },
    {
      path: '/autocomplete',
      component: () => import('../views/examples/AutocompleteExample/AutocompleteExample.vue'),
    },
    {
      path: '/back-to-top-button',
      component: () => import('../views/examples/BackToTopButtonExample/BackToTopButtonExample.vue'),
    },
    {
      path: '/banners',
      component: () => import('../views/examples/BannerExample/BannerExample.vue'),
    },
    {
      path: '/chat-input',
      component: () => import('../views/examples/ChatInputExample/ChatInputExample.vue'),
    },
    {
      path: '/checkboxes',
      component: () => import('../views/examples/CheckboxExample/CheckboxExample.vue'),
    },
    {
      path: '/colors-generator',
      component: () => import('../views/examples/vc/PillVCExample/PillVCExample.vue'),
    },
    {
      path: '/color-picker',
      component: () => import('../views/examples/ColorPickerExample/ColorPickerExample.vue'),
    },
    {
      path: '/datepickers',
      component: () => import('../views/examples/DatepickerExample/DatepickerExample.vue'),
    },
    {
      path: '/echarts',
      component: () => import('../views/examples/EChartsExample/EchartsExample.vue'),
    },
    {
      path: '/file-upload',
      component: () => import('../views/examples/FileUploadExample/FileUploadExample.vue'),
    },
    {
      path: '/form-controls',
      component: () => import('../views/examples/vc/FileUploadVCExample/FileUploadVCExample.vue'),
    },
    {
      path: '/menu-context',
      component: () => import('../views/examples/MenuContextExample/MenuContextExample.vue'),
    },
    {
      path: '/menu-context-based-components',
      component: () => import('../views/examples/vc/DatePickerVCExample/DatePickerVCExample.vue'),
    },
    {
      path: '/modals',
      component: () => import('../views/examples/vc/ModalVCExample/ModalVCExample.vue'),
    },
    {
      path: '/overlay',
      component: () => import('../views/examples/OverlayExample/OverlayExample.vue'),
    },
    {
      path: '/radio-buttons',
      component: () => import('../views/examples/RadioButtonExample/RadioButtonExample.vue'),
    },
    {
      path: '/richtext',
      component: () => import('../views/examples/RichtextExample/RichtextExample.vue'),
    },
    {
      path: '/skeleton',
      component: () => import('../views/examples/vc/SkeletonVCExample/SkeletonVCExample.vue'),
    },
    {
      path: '/search',
      component: () => import('../views/examples/SelectsExample/SelectsExample.vue'),
    },
    {
      path: '/selects',
      component: () => import('../views/examples/SelectsExample/SelectsExample.vue'),
    },
    {
      path: '/single-select',
      component: () => import('../views/examples/SingleSelect/SingleSelect.vue'),
    },
    {
      path: '/multiple-select',
      component: () => import('../views/examples/MultipleSelect/MultipleSelect.vue'),
    },
    {
      path: '/text-select',
      component: () => import('../views/examples/TextSelect/TextSelect.vue'),
    },
    {
      path: '/combined-select',
      component: () => import('../views/examples/CombinedSelect/CombinedSelect.vue'),
    },
    {
      path: '/sticky-bar',
      component: () => import('../views/examples/StickyBarExample/StickyBarExample.vue'),
    },
    {
      path: '/swiper',
      component: () => import('../views/examples/SwiperExample/SwiperExample.vue'),
    },
    {
      path: '/toggles',
      component: () => import('../views/examples/ToggleExample/ToggleExample.vue'),
    },
    {
      path: '/time-picker',
      component: () => import('../views/examples/TimePickerExample/TimePicker.vue'),
    },
    {
      path: '/topbar',
      component: () => import('../views/examples/vc/TopBarVCExample/TopBarVCExample.vue'),
    },
    {
      path: '/bugfixes',
      component: () => import('../views/examples/vc/TopBarVCExample/TopBarVCExample.vue'),
    },
  ],
})

export default router
