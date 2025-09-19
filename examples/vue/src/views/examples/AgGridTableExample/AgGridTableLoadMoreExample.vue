<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import type { GridApi, ColDef } from 'ag-grid-community'

import 'ag-grid-community/styles/ag-grid.css'
import '@platform-ui-kit/components-library/dist/collection/ag-theme-wpp.css'

import {
  WppButton,
  WppActionButton,
  WppIconTrash,
  WppIconPlus,
  WppIconExport,
  WppPill,
  WppInput,
  WppSelect,
  WppListItem,
  WppLoadMore,
} from '@platform-ui-kit/components-library-vue'
import { delay } from '@/utils'

import LinkedInCellRenderer from './components/LinkedInCellRenderer.vue'
import GenderCellRenderer from './components/GenderCellRenderer.vue'
import AvatarCellRenderer from './components/AvatarCellRenderer.vue'
import AvatarGroupCellRenderer from './components/AvatarGroupCellRenderer.vue'
import ActionsCellRenderer from './components/ActionsCellRenderer.vue'
import TooltipCellRenderer from './components/TooltipCellRenderer.vue'
import HeaderCellRenderer from './components/HeaderCellRenderer.vue'
import DefaultCellRenderer from './components/DefaultCellRenderer.vue'
import { dataList } from './consts'

type TableDataItem = (typeof dataList)[0]
type TableData = TableDataItem[]

const ALL = 'ALL'

export default defineComponent({
  name: 'LoadMoreAgGridTableExample',
  components: {
    WppButton,
    WppActionButton,
    WppIconTrash,
    WppIconPlus,
    WppIconExport,
    WppPill,
    WppInput,
    WppSelect,
    WppListItem,
    AgGridVue,
    WppLoadMore,
  },
  data() {
    return {
      selectedItems: [] as TableDataItem[],
      genderOptions: [ALL] as string[],
      search: '' as string,
      displayData: dataList,
      selectedGender: ALL,
      isAutoHeight: true,
      showProgress: true,
      gridApi: null as unknown as GridApi,
      gridColumnApi: null,
      columnDefs: [] as ColDef[],
      defaultColDef: {},
      // Load More specific properties
      itemsLoaded: 10,
      loading: false,
    }
  },
  computed: {
    // Only show the subset of rows that are "loaded"
    visibleData(): TableData {
      return this.displayData.slice(0, this.itemsLoaded)
    },
    totalItems(): number {
      return this.displayData.length
    },
  },
  mounted() {
    this.columnDefs = this.getColDefs()
    this.getDefaultColDef()
    this.handleFilters()
  },
  watch: {
    search() {
      this.handleFilters()
      this.getDefaultColDef()
    },
    selectedGender() {
      this.handleFilters()
    },
  },
  methods: {
    handleFilters() {
      const filteredBySearch = !this.search
        ? dataList
        : dataList.filter(item => item.firstName.toLowerCase().includes(this.search.toLowerCase()))

      const filteredByFilters =
        this.selectedGender === ALL
          ? filteredBySearch
          : filteredBySearch.filter(item => item.gender === this.selectedGender)

      this.genderOptions = [ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender).filter(Boolean)))]

      if (this.gridApi) {
        this.gridApi.setRowData(filteredByFilters)
      }

      this.displayData = filteredByFilters
      // Reset loaded items when filters change
      this.itemsLoaded = 10
      this.selectedItems = []
    },
    rowIdGetter(params: any) {
      return params.data?.id ?? params.node?.id
    },
    handleAutoHeightToggle() {
      this.isAutoHeight = !this.isAutoHeight
    },
    handleShowProgress() {
      this.showProgress = !this.showProgress
    },
    handleAddAvatarsColumn() {
      this.gridApi.setColumnDefs(this.getColDefs())
    },
    handleRemoveAvatarsColumn() {
      this.gridApi.setColumnDefs(this.getColDefs().filter(i => i.field !== 'avatar'))
    },
    handleEditClick() {
      alert(`Updating users with IDs: ${this.selectedItems.map(i => i.id)}`)
    },
    handleDeselectAll() {
      this.gridApi.deselectAll()
    },
    handleRowsSelect() {
      this.selectedItems = this.gridApi.getSelectedRows()
    },
    handleSearchChange(event: CustomEvent) {
      this.search = event.detail.value
    },
    handleGenderChange(event: CustomEvent) {
      this.selectedGender = event.detail.value
    },
    onGridReady(params: any) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    onFirstDataRendered() {
      const bodyViewport = document.querySelector('.ag-body-viewport')
      const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

      let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

      const handleVerticalScroll = () => {
        if (bodyViewport) {
          bodyViewport.classList.add('scrolling')
        }

        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout)
        }
        scrollingTimeout = setTimeout(() => {
          if (bodyViewport) {
            bodyViewport.classList.remove('scrolling')
          }
        }, 500)
      }

      const handleHorizontalScroll = () => {
        if (horizontalScroll) {
          horizontalScroll.classList.add('scrolling')
        }

        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout)
        }
        scrollingTimeout = setTimeout(() => {
          if (horizontalScroll) {
            horizontalScroll.classList.remove('scrolling')
          }
        }, 500)
      }

      bodyViewport?.addEventListener('scroll', handleVerticalScroll)
      horizontalScroll?.addEventListener('scroll', handleHorizontalScroll)

      onBeforeUnmount(() => {
        bodyViewport?.removeEventListener('scroll', handleVerticalScroll)
        horizontalScroll?.removeEventListener('scroll', handleHorizontalScroll)
      })
    },
    getDefaultColDef() {
      this.defaultColDef = {
        headerComponent: HeaderCellRenderer,
        sortable: false,
        cellRenderer: DefaultCellRenderer,
        cellRendererParams: {
          search: this.search,
          searchColumn: 'firstName',
        },
      }
    },
    getColDefs(): ColDef[] {
      return [
        {
          field: 'id',
          sortable: true,
          resizable: true,
          rowDrag: false,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          pinned: 'left',
        },
        { field: 'firstName', sortable: true },
        {
          field: 'lastName',
          sortable: true,
        },
        {
          field: 'LinkedIn',
          cellRenderer: LinkedInCellRenderer,
        },
        { field: 'email', resizable: true },
        {
          field: 'gender',
          cellRenderer: GenderCellRenderer,
        },
        {
          field: 'avatar',
          width: 250,
          cellRenderer: AvatarCellRenderer,
        },
        {
          field: 'avatar group',
          width: 250,
          cellRenderer: AvatarGroupCellRenderer,
        },
        {
          field: 'Actions',
          width: 100,
          cellRenderer: ActionsCellRenderer,
        },
        { field: 'job' },
        { field: 'IP' },
        {
          field: 'Tooltip',
          sortable: true,
          cellRenderer: TooltipCellRenderer,
        },
      ]
    },
    async handleLoadMore(event: CustomEvent<{ newItemsLoaded: number; incrementBy: number }>) {
      this.loading = true
      await delay(1000)
      const newItems = this.displayData.slice(this.itemsLoaded, event.detail.newItemsLoaded)
      this.gridApi.applyTransaction({ add: newItems })
      this.itemsLoaded = event.detail.newItemsLoaded
      this.loading = false
    },
  },
})
</script>

<template>
  <div data-testid="ag-grid-table">
    <div class="table-header">
      <WppButton size="s" @click="handleAutoHeightToggle">
        {{ `Set table ${isAutoHeight ? 'fixed' : 'auto'} height` }}
      </WppButton>
      <WppButton size="s" @click="handleShowProgress">
        {{ `${showProgress ? 'Hide' : 'Show'} progress` }}
      </WppButton>
    </div>

    <div class="filters">
      <div class="left">
        <WppInput @wppChange="handleSearchChange" type="search" placeholder="Search by First Name" size="s" />
        <WppSelect
          :list="
            genderOptions.map(item => ({
              value: item,
              label: `Gender: ${item}`,
            }))
          "
          :value="selectedGender"
          size="s"
          placeholder="Filter by gender"
          @wppChange="handleGenderChange"
        >
        </WppSelect>
      </div>
      <div class="right">
        <WppPill
          class="pill"
          :label="selectedItems.length + ' selected'"
          removable
          type="display"
          @wppClose="handleDeselectAll"
        />
        <WppActionButton class="remove-column-btn" @click="handleRemoveAvatarsColumn">
          Remove avatars column
          <WppIconTrash slot="icon-start" />
        </WppActionButton>
        <WppActionButton class="add-column-btn" @click="handleAddAvatarsColumn">
          Add avatars column
          <WppIconPlus slot="icon-start" />
        </WppActionButton>
        <WppButton variant="secondary" @click="handleEditClick" size="s">
          Edit
          <WppIconExport slot="icon-start" />
        </WppButton>
      </div>
    </div>

    <AgGridVue
      :class="{ 'ag-theme-wpp': true, 'fixed-height': !isAutoHeight }"
      :style="{
        width: '100%',
        height: isAutoHeight ? '' : '450px',
      }"
      :columnDefs="columnDefs"
      @grid-ready="onGridReady"
      @first-data-rendered="onFirstDataRendered"
      :rowData="visibleData"
      :getRowId="rowIdGetter"
      :domLayout="isAutoHeight ? 'autoHeight' : 'normal'"
      :defaultColDef="defaultColDef"
      rowSelection="multiple"
      rowDragMultiRow
      animateRows
      rowDragManaged
      loadingOverlayComponent="LoadingOverlay"
      noRowsOverlayComponent="NoDataOverlay"
      :rowClassRules="{ 'with-error': (data: any) => (data.data ? !!data.data.meta?.error : false) }"
      @row-selected="handleRowsSelect"
    ></AgGridVue>

    <!-- Load More Button -->
    <WppLoadMore
      v-if="itemsLoaded < totalItems"
      :totalItems="totalItems"
      :itemsLoaded="itemsLoaded"
      :loading="loading"
      :incrementBy="10"
      :showProgressBar="showProgress"
      @wppClickLoadMore="handleLoadMore"
    ></WppLoadMore>
  </div>
</template>

<style lang="scss">
.fixed-height {
  .ag-root-wrapper {
    .ag-root-wrapper-body {
      .ag-root {
        overflow-y: auto;
      }
    }
  }
}

.table-header {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  .left {
    display: flex;

    > * {
      width: 250px;
      margin-right: 20px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    > * {
      margin-left: 12px;
    }

    .pill {
      margin-right: 8px;
      margin-left: 0;
    }
  }
}

.avatar-cell,
.linkedin-cell,
.gender-cell {
  display: flex;
  align-items: center;
  height: 100%;
}

.avatar-cell i {
  margin-left: 12px;
}

.gender-cell {
  --wpp-input-select-min-width: 168px;
}

.column-data {
  display: flex;
  align-items: center;
  height: 100%;

  .wpp-menu-context-wrapper {
    display: inline-flex;
    align-items: center;
  }
}

.ag-header-cell-comp {
  cursor: pointer;
  transition: color 0.3s;

  .top-sort-icon,
  .down-sort-icon {
    color: var(--wpp-icon-color);
    transition: color 0.5s;

    &.active:not(:hover, :active) {
      color: var(--wpp-grey-color-800);
    }

    &.not-active:not(:hover, :active) {
      color: var(--wpp-grey-color-400);
    }
  }

  &:hover {
    .top-sort-icon,
    .down-sort-icon {
      color: var(--wpp-icon-color-hover);
    }
  }

  &:active {
    .top-sort-icon,
    .down-sort-icon {
      color: var(--wpp-icon-color-active);
    }
  }
}

.cell-text {
  width: 100%;
}

.wpp-load-more {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}
</style>
