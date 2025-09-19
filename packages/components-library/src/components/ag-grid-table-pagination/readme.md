# Pagination Ag Grid Table

## React
```tsx
import React, { useState, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import {
  WppPagination,
  WppSpinner,
  WppInput,
  WppTypography,
  WppAvatar,
  WppSelect,
  WppButton,
  WppTooltip,
  WppIconSmile,
  WppPill,
  WppActionButton,
  WppIconMore,
  WppListItem,
  WppMenuContext,
  WppIconExport,
  WppIconTrash,
  WppIconPlus,
  WppAvatarGroup,
} from '@platform-ui-kit/components-library-react'
import 'ag-grid-community/styles/ag-grid.css'
import '@platform-ui-kit/components-library/dist/collection/ag-theme-wpp.css'
import {
  InputChangeEventDetail,
  PaginationChangeEventDetail,
  SelectChangeEventDetail,
} from '@platform-ui-kit/components-library'

import { capitalize, delay } from '../../../utils'

import HeaderCell from '../components/HeaderCell'
import { dataList } from '../consts'
import '../ag-theme-custom.css'
import './PaginationAgGridTable.scss'

// prettier-ignore
export type TableDataItem = typeof dataList[0]
export type TableData = TableDataItem[]

const ALL = 'ALL'

const NoDataOverlay = () => <div>No data overlay</div>

const columnDefs: ColDef[] = [
  {
    field: 'id',
    sortable: true,
    resizable: true,
    rowDrag: true,
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
    cellRenderer: ({ data }: { data: TableDataItem }) => {
      const messageType = (data as any).meta?.error ? 'error' : undefined

      return (
        <div className="linkedin-cell">
          <WppInput value={data.linkedIn} size="s" messageType={messageType} />
        </div>
      )
    },
  },
  {
    field: 'email',
    resizable: true,
  },
  {
    field: 'gender',
    cellRenderer: ({ data }: { data: TableDataItem }) => (
      <div className="gender-cell">
        <WppSelect value={data.gender} placeholder="Select user gender" id="select">
          <WppListItem value="Male">
            <span slot="label">Male</span>
          </WppListItem>
          <WppListItem value="Female">
            <span slot="label">Female</span>
          </WppListItem>
          <WppListItem value="Polygender">
            <span slot="label">Polygender</span>
          </WppListItem>
          <WppListItem value="Agender">
            <span slot="label">Agender</span>
          </WppListItem>
        </WppSelect>
      </div>
    ),
  },
  {
    field: 'avatar',
    width: 250,
    cellRenderer: ({ data }: { data: TableDataItem }) => (
      <div className="avatar-cell">
        <WppAvatar size="s" src={data.avatar} />
        <i>
          {data.firstName} {data.lastName}
        </i>
      </div>
    ),
  },
  {
    field: 'avatar group',
    width: 250,
    cellRenderer: ({ data }: { data: TableDataItem }) => (
      <div className="avatar-cell">
        <WppAvatarGroup size="s" avatars={data.avatarGroup} maxAvatarsToDisplay={3} />
        <i>
          {data.firstName} {data.lastName}
        </i>
      </div>
    ),
  },
  {
    field: 'Actions',
    width: 100,
    cellRenderer: ({ data }: { data: TableDataItem }) => (
      <div className="column-data">
        <WppMenuContext dropdownConfig={{ placement: 'right' }}>
          <WppActionButton slot="trigger-element">
            <WppIconMore direction="horizontal" color="var(--wpp-color-primary-500)" slot="icon-start" />
          </WppActionButton>
          <div>
            <WppListItem className="centered" onWppChangeListItem={() => alert(`Edit user with id: ${data.id}`)}>
              <p slot="label">Edit</p>
            </WppListItem>
            <WppListItem className="centered" onWppChangeListItem={() => alert(`Delete user with id: ${data.id}`)}>
              <p slot="label">Delete</p>
            </WppListItem>
          </div>
        </WppMenuContext>
      </div>
    ),
  },
  { field: 'job' },
  { field: 'IP' },
  {
    field: 'Tooltip',
    sortable: true,
    cellRenderer: () => (
      <WppTooltip text="icon-smile">
        <WppIconSmile />
      </WppTooltip>
    ),
  },
]

export const PaginationAgGridTable = () => {
  const gridRef = useRef<AgGridReact<TableDataItem>>(null)

  const [selectedItems, setSelectedItems] = useState<TableDataItem[]>([])
  const [genderOptions, setGenderOptions] = useState([ALL])
  const [search, setSearch] = useState<InputChangeEventDetail['value']>('')
  const [displayData, setDisplayData] = useState<TableData>(dataList)
  const [paginationPageSize, setPaginationPageSize] = useState<number>(10)
  const [currPage, setPage] = useState<number>(1)
  const [selectedGender, setSelectedGender] = useState<SelectChangeEventDetail['value']>(ALL)
  const [isAutoHeight, setIsAutoHeight] = useState(true)

  useEffect(() => {
    const filteredBySearch = !search
      ? dataList
      : dataList.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase()))

    const filteredByFilters =
      selectedGender === ALL ? filteredBySearch : filteredBySearch.filter(item => item.gender === selectedGender)

    setGenderOptions([ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender).filter(Boolean)))])
    setDisplayData(filteredByFilters)
    setSelectedItems([])
  }, [search, selectedGender])

  const handlePaginationChange = async (event: CustomEvent<PaginationChangeEventDetail>) => {
    const { itemsPerPage, page } = event.detail

    gridRef.current!.api.showLoadingOverlay()

    await delay(1000)

    if (paginationPageSize !== itemsPerPage) {
      gridRef.current!.api.paginationSetPageSize(itemsPerPage)
      setPaginationPageSize(itemsPerPage)
    }

    if (currPage !== page) {
      gridRef.current!.api.paginationGoToPage(page - 1)
      setPage(page)
    }

    gridRef.current!.api.hideOverlay()
  }

  const onFirstDataRendered = () => {
    const bodyViewport = document.querySelector('.ag-body-viewport')

    bodyViewport?.setAttribute('data-testid', 'pagination-table-viewport')

    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
      scrollingTimeout = setTimeout(() => {
        horizontalScroll?.classList.remove('scrolling')
      }, 500)
    }

    bodyViewport?.addEventListener('scroll', handleVerticalScroll)
    horizontalScroll?.addEventListener('scroll', handleHorizontalScroll)

    return () => {
      bodyViewport?.removeEventListener('scroll', handleVerticalScroll)
      horizontalScroll?.removeEventListener('scroll', handleHorizontalScroll)
    }
  }

  const handleSearchChange = (event: CustomEvent<InputChangeEventDetail>) => setSearch(event.detail.value)

  const handleGenderChange = (event: CustomEvent<SelectChangeEventDetail>) => setSelectedGender(event.detail.value)

  const handleAutoHeightToggle = () => setIsAutoHeight(!isAutoHeight)

  const handleRemoveAvatarsColumn = () =>
    gridRef.current!.api.setColumnDefs(columnDefs.filter(i => i.field !== 'avatar'))

  const handleAddAvatarsColumn = () => gridRef.current!.api.setColumnDefs(columnDefs)

  const handleRowsSelect = () => {
    setSelectedItems(gridRef.current!.api.getSelectedRows() as any)
  }

  const handleDeselectAll = () => gridRef.current!.api.deselectAll()

  const handleEditClick = () => alert(`Updating users with IDs: ${selectedItems.map(i => i.id)}`)

  return (
    <div data-testid="ag-grid-table">
      <div className="table-header">
        <WppButton data-testid="set-table-height-btn" size="s" onClick={handleAutoHeightToggle}>{`Set table ${
          isAutoHeight ? 'fixed' : 'auto'
        } height`}</WppButton>
      </div>

      <div className="filters">
        <div className="left">
          <WppInput
            onWppChange={handleSearchChange}
            type={'search'}
            placeholder="Search by First Name"
            size="s"
            data-testid="search-input"
          />
          <WppSelect
            value={selectedGender}
            size="s"
            placeholder="Filter by gender"
            onWppChange={handleGenderChange}
            dropdownConfig={{ popperOptions: { strategy: 'fixed' }, placement: 'bottom' }}
            data-testid="gender-filter-select"
          >
            {genderOptions.map(gender => (
              <WppListItem value={gender} key={gender}>
                <span slot="label">
                  <span style={{ color: 'grey' }}>Gender: </span>
                  {gender}
                </span>
              </WppListItem>
            ))}
          </WppSelect>
        </div>
        <div className="right">
          <WppPill
            data-testid="selected-count-pill"
            className="pill"
            type="display"
            label={`${selectedItems.length} selected`}
            removable
            onWppClose={handleDeselectAll}
          />
          <WppActionButton
            className="remove-column-btn"
            onClick={handleRemoveAvatarsColumn}
            data-testid="remove-column-button"
          >
            Remove avatars column
            <WppIconTrash slot="icon-start" />
          </WppActionButton>
          <WppActionButton
            data-testid="add-avatars-column-btn"
            className="add-column-btn"
            onClick={handleAddAvatarsColumn}
          >
            Add avatars column
            <WppIconPlus slot="icon-start" />
          </WppActionButton>
          <WppButton data-testid="edit-btn" variant="secondary" onClick={handleEditClick} size="s">
            Edit
            <WppIconExport slot="icon-start" />
          </WppButton>
        </div>
      </div>

      <div
        style={{ height: isAutoHeight ? '' : '450px', width: '100%', marginBottom: 32 }}
        className="ag-theme-wpp"
        key={String(isAutoHeight)}
      >
        <AgGridReact
          ref={gridRef}
          rowData={displayData}
          onColumnResized={params => {
            params.api.resetRowHeights()
            params.api.refreshCells({ force: true })
          }}
          columnDefs={columnDefs}
          onFirstDataRendered={onFirstDataRendered}
          defaultColDef={{
            headerComponent: HeaderCell,
            sortable: false,
            cellRenderer: (props: ColDef['cellRenderer']) => {
              const { value, search: initSearch, column, searchColumn, eGridCell } = props

              if (initSearch && column.colId === searchColumn) {
                const splittedValue = value.toLowerCase().split(initSearch.toLowerCase())

                let firstPart = splittedValue[0]
                const secondPart = splittedValue[1]

                if (firstPart) {
                  firstPart = capitalize(firstPart)
                }

                const search = firstPart ? initSearch : capitalize(initSearch)

                return (
                  <WppTypography type="s-body" className="cell-text">
                    {firstPart}
                    <span className="ag-search-highlight">{search}</span>
                    {secondPart}
                  </WppTypography>
                )
              }

              const [isTextTruncated, setIsTextTruncated] = useState(false)
              const checkTruncation = () => {
                requestAnimationFrame(() => {
                  const textElement = eGridCell.querySelector('.cell-text')
                  const typographyElement = textElement.shadowRoot.querySelector('.typography')

                  setIsTextTruncated(typographyElement?.clientWidth < typographyElement?.scrollWidth)
                })
              }

              useEffect(() => {
                if (!eGridCell) return

                checkTruncation()

                const resizeObserver = new ResizeObserver(checkTruncation)

                resizeObserver.observe(eGridCell)

                return () => resizeObserver.disconnect()
              }, [eGridCell])

              if (isTextTruncated) {
                return (
                  <WppTooltip className="truncation-tooltip" text={value}>
                    <WppTypography type="s-body" className="cell-text">
                      {value}
                    </WppTypography>
                  </WppTooltip>
                )
              } else {
                return (
                  <WppTypography type="s-body" className="cell-text">
                    {value}
                  </WppTypography>
                )
              }
            },
            cellRendererParams: {
              search,
              searchColumn: 'firstName',
            },
          }}
          rowSelection="multiple"
          rowDragMultiRow
          animateRows
          rowDragManaged
          pagination
          paginationPageSize={paginationPageSize}
          suppressPaginationPanel
          loadingOverlayComponent={() => <WppSpinner size="m" />}
          noRowsOverlayComponent={NoDataOverlay}
          rowClassRules={{
            'with-error': data => (data.data ? !!data.data.meta?.error : false),
          }}
          domLayout={isAutoHeight ? 'autoHeight' : 'normal'}
          onRowSelected={handleRowsSelect}
        />
      </div>
      <WppPagination
        count={displayData.length}
        itemsPerPage={[3, 5, 10, 100]}
        activePageNumber={currPage}
        pageSelectThreshold={9}
        data-testid="pagination-list"
        selectedItemPerPage={paginationPageSize}
        onWppChange={handlePaginationChange}
      />
    </div>
  )
}
```

## Angular
```html
<div class='example-page'>
  <div class='table-header'>
    <wpp-button (click)='handleAutoHeightToggle()'>
      Set table {{ isAutoHeight ? 'fixed' : 'auto' }} height
    </wpp-button>
    <div>
      <wpp-button (click)='handleRemoveAvatarsColumn()'>Remove avatars column</wpp-button>
      <wpp-button (click)='handleAddAvatarsColumn()'>Add avatars column</wpp-button>
    </div>
  </div>

  <div class='filters'>
    <div class='left'>
      <wpp-input
        ngDefaultControl
        [(ngModel)]='search'
        type='search'
        placeholder="Search by First Name"
        (wppChange)='handleSearchChange($event)'
        size='s'
      ></wpp-input>
      <wpp-select [value]='selectedGender' size='s' placeholder="Filter by gender" (wppChange)='handleGenderChange($event)'>
        <wpp-list-item *ngFor="let gender of genderOptions" [value]="gender">
          <p slot="label">
            <span style="color: grey">Gender: </span>
            {{ gender }}
          </p>
        </wpp-list-item>
      </wpp-select>
    </div>
    <div class='right'>
      <wpp-pill label="{{ selectedItems.length }} selected" removable (wppClose)='handleDeselectAll()'></wpp-pill>
      <wpp-button variant="secondary" (click)='handleEditClick()' size="s">
        Edit
      </wpp-button>
    </div>
  </div>

  <ag-grid-angular
    [ngStyle]='getStyles()'
    class="ag-theme-wpp"
    [rowData]='displayData'
    [columnDefs]='columnDefs'
    [defaultColDef]='defaultColDef'
    rowSelection='multiple'
    rowDragMultiRow
    animateRows
    rowDragManaged
    pagination
    [paginationPageSize]='paginationPageSize'
    suppressPaginationPanel
    [loadingOverlayComponent]='loadingOverlayComponent'
    [noRowsOverlayComponent]='noRowsOverlayComponent'
    [rowClassRules]='rowClassRules'
    [domLayout]='domLayout'
    (rowSelected)='handleRowsSelect()'
    (firstDataRendered)="onFirstDataRendered($event)"
  ></ag-grid-angular>

  <wpp-pagination
    [count]='displayData.length'
    [itemsPerPage]='[3, 5, 10]'
    [activePageNumber]='currPage'
    [pageSelectThreshold]='9'
    [selectedItemPerPage]='paginationPageSize'
    (wppChange)='handlePaginationChange($event)'
  ></wpp-pagination>
</div>
```

```ts
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, FirstDataRenderedEvent, RowClassRules } from 'ag-grid-community'

import {
  PaginationChangeEventDetail,
  InputChangeEventDetail,
  SelectChangeEventDetail,
} from '@platform-ui-kit/components-library'

import { AvatarRenderer } from './components/avatar-renderer/avatar-renderer'
import { CustomLoadingOverlay } from './components/custom-loading-overlay'
import { NoRowsOverlay } from './components/no-rows-overlay'
import { CellRenderer } from './components/cell-renderer'
import { HeaderCellRenderer } from './components/header-cell-renderer/header-cell-renderer'
import { LinkedinCellRenderer } from './components/linkedin-cell-renderer'
import { ActionsRenderer } from './components/actions-renderer/actions-renderer'
import { delay } from '../../../utils'
import { AvatarGroupRenderer } from './components/avatar-group-renderer/avatar-group-renderer'
import users from '../../dummy-data/users'

const ALL = 'ALL'

@Component({
  selector: 'app-ag-grid-table-example',
  templateUrl: './ag-grid-table-example.page.html',
  styleUrls: ['./ag-grid-table-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableExamplePage {
  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users
  public paginationPageSize = 10
  public currPage = 1
  public selectedRowsNumber = 0
  public selectedGender: SelectChangeEventDetail['value'] = ALL
  public domLayout: 'normal' | 'autoHeight' = 'autoHeight'
  public isAutoHeight = true
  public selectedItems: typeof users = []

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      sortable: true,
      resizable: true,
      rowDrag: true,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      pinned: 'left',
    },
    { field: 'firstName', sortable: true },
    { field: 'lastName', sortable: true },
    { field: 'LinkedIn', cellRenderer: LinkedinCellRenderer },
    { field: 'email', resizable: true },
    { field: 'gender' },
    {
      field: 'avatar',
      width: 250,
      cellRenderer: AvatarRenderer,
    },
    {
      field: 'avatar',
      width: 250,
      cellRenderer: AvatarGroupRenderer,
    },
    {
      field: 'Actions',
      width: 100,
      cellRenderer: ActionsRenderer,
    },
    { field: 'job' },
    { field: 'IP' },
  ]

  public defaultColDef: ColDef = {}

  public loadingOverlayComponent = CustomLoadingOverlay
  public noRowsOverlayComponent = NoRowsOverlay

  public rowClassRules: RowClassRules<(typeof users)[0]> = {
    'with-error': data => (data.data ? !!data.data.meta?.error : false),
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular

  public onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const bodyViewport = document.querySelector('.ag-body-viewport')
    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')

      if (scrollingTimeout) {
        clearTimeout(scrollingTimeout)
      }
      scrollingTimeout = setTimeout(() => {
        horizontalScroll?.classList.remove('scrolling')
      }, 500)
    }

    bodyViewport?.addEventListener('scroll', handleVerticalScroll)
    horizontalScroll?.addEventListener('scroll', handleHorizontalScroll)

    event.api.addEventListener('gridDestroyed', () => {
      bodyViewport?.removeEventListener('scroll', handleVerticalScroll)
      horizontalScroll?.removeEventListener('scroll', handleHorizontalScroll)
    })
  }

  public getDefaultColDef = () => {
    this.defaultColDef = {
      headerComponent: HeaderCellRenderer,
      sortable: false,
      cellRenderer: CellRenderer,
      cellRendererParams: {
        search: this.search,
        searchColumn: 'firstName',
      },
    }
  }

  public handleSearchChange = (event: Event) => {
    this.search = (event as CustomEvent<InputChangeEventDetail>).detail.value

    this.handleFiltersChange()
    this.getDefaultColDef()
  }

  public handleGenderChange = (event: Event) => {
    this.selectedGender = (event as CustomEvent<SelectChangeEventDetail>).detail.value

    this.handleFiltersChange()
  }

  ngAfterContentInit() {
    this.getDefaultColDef()
    this.handleFiltersChange()
  }

  private handleFiltersChange = () => {
    const filteredBySearch = !this.search
      ? users
      : users.filter(item => item.firstName.toLowerCase().includes((this.search || '').toLowerCase()))

    const filteredByFilters =
      this.selectedGender === ALL
        ? filteredBySearch
        : filteredBySearch.filter(item => item.gender === this.selectedGender)

    this.genderOptions = [ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender)))]
    this.displayData = filteredByFilters
  }

  public handlePaginationChange = async (event: Event) => {
    const { itemsPerPage, page } = (event as CustomEvent<PaginationChangeEventDetail>).detail

    this.agGrid.api.showLoadingOverlay()

    await delay(1000)

    if (this.paginationPageSize !== itemsPerPage) {
      this.agGrid.api.paginationSetPageSize(itemsPerPage)
      this.paginationPageSize = itemsPerPage
    }

    if (this.currPage !== page) {
      this.agGrid.api.paginationGoToPage(page - 1)
      this.currPage = page
    }

    this.agGrid.api.hideOverlay()
  }

  public handleAutoHeightToggle = () => {
    this.isAutoHeight = !this.isAutoHeight
    this.domLayout = this.isAutoHeight ? 'autoHeight' : 'normal'
  }

  public getStyles = () => ({
    width: '100%',
    marginBottom: '32px',
    height: this.isAutoHeight ? '' : '450px',
  })

  public handleRemoveAvatarsColumn = () =>
    this.agGrid.api.setColumnDefs(this.columnDefs.filter(i => i.field !== 'avatar'))

  public handleAddAvatarsColumn = () => this.agGrid.api.setColumnDefs(this.columnDefs)

  public handleRowsSelect = () => {
    this.selectedItems = this.agGrid.api.getSelectedRows()
  }

  public handleDeselectAll = () => this.agGrid.api.deselectAll()

  public handleEditClick = () => alert(`Updating users with IDs: ${this.selectedItems.map(i => i.id)}`)
}
```

## Vue
```vue
<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import type { GridApi, ColDef } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "@platform-ui-kit/components-library/dist/collection/ag-theme-wpp.css";

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
  WppPagination,
} from "@platform-ui-kit/components-library-vue";
import { delay } from "@/utils";

import LinkedInCellRenderer from "./components/LinkedInCellRenderer.vue";
import GenderCellRenderer from "./components/GenderCellRenderer.vue";
import AvatarCellRenderer from "./components/AvatarCellRenderer.vue";
import AvatarGroupCellRenderer from "./components/AvatarGroupCellRenderer.vue";
import ActionsCellRenderer from "./components/ActionsCellRenderer.vue";
import TooltipCellRenderer from "./components/TooltipCellRenderer.vue";
import HeaderCellRenderer from "./components/HeaderCellRenderer.vue";
import DefaultCellRenderer from "./components/DefaultCellRenderer.vue";
import LoadingOverlay from "./components/LoadingOverlay.vue";
import NoDataOverlay from "./components/NoDataOverlay.vue";

import { dataList } from "./consts";

type TableDataItem = (typeof dataList)[0];
type TableData = TableDataItem[];

const ALL = "ALL";

export default defineComponent({
  components: {
    WppButton: WppButton,
    WppActionButton: WppActionButton,
    WppIconTrash: WppIconTrash,
    WppIconPlus: WppIconPlus,
    WppIconExport: WppIconExport,
    WppPill: WppPill,
    WppInput: WppInput,
    WppSelect: WppSelect,
    WppListItem: WppListItem,
    AgGridVue: AgGridVue,
    WppPagination: WppPagination,
    LoadingOverlay: LoadingOverlay,
    NoDataOverlay: NoDataOverlay,
  },
  data() {
    return {
      selectedItems: [] as TableDataItem[],
      genderOptions: [ALL] as string[],
      search: "" as string,
      displayData: dataList,
      displayDataLength: dataList.length,
      paginationPageSize: 10,
      currPage: 1,
      selectedGender: ALL,
      isAutoHeight: true,
      gridApi: null as unknown as GridApi,
      gridColumnApi: null,
      columnDefs: [] as ColDef[],
      defaultColDef: {},
      rowClassRules: {
        "with-error": (data) => (data.data ? !!data.data.meta?.error : false),
      },
    };
  },
  mounted() {
    this.columnDefs = this.getColDefs();
    this.getDefaultColDef();
    this.handleFilters();
  },
  watch: {
    search() {
      this.handleFilters();
      this.getDefaultColDef();
    },
    selectedGender() {
      this.handleFilters();
    },
  },
  methods: {
    handleFilters() {
      const filteredBySearch = !this.search
        ? dataList
        : dataList.filter((item) =>
            item.firstName.toLowerCase().includes(this.search.toLowerCase())
          );

      const filteredByFilters =
        this.selectedGender === ALL
          ? filteredBySearch
          : filteredBySearch.filter(
              (item) => item.gender === this.selectedGender
            );

      this.genderOptions = [
        ALL,
        ...Array.from(
          new Set(filteredBySearch.map((item) => item.gender).filter(Boolean))
        ),
      ];

      if (this.gridApi) {
        this.gridApi.setRowData(filteredByFilters);
        this.displayDataLength = filteredByFilters.length;
      }

      this.selectedItems = [];
    },
    handleAutoHeightToggle() {
      this.isAutoHeight = !this.isAutoHeight;
    },
    handleAddAvatarsColumn() {
      this.gridApi.setColumnDefs(this.getColDefs());
    },
    handleRemoveAvatarsColumn() {
      this.gridApi.setColumnDefs(
        this.getColDefs().filter((i) => i.field !== "avatar")
      );
    },
    handleEditClick() {
      alert(`Updating users with IDs: ${this.selectedItems.map((i) => i.id)}`);
    },
    handleDeselectAll() {
      this.gridApi.deselectAll();
    },
    handleRowsSelect() {
      this.selectedItems = this.gridApi.getSelectedRows();
    },
    handleSearchChange(event: CustomEvent) {
      this.search = event.detail.value;
    },
    handleGenderChange(event: CustomEvent) {
      this.selectedGender = event.detail.value;
    },
    onGridReady(params: any) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    onFirstDataRendered() {
      const bodyViewport = document.querySelector('.ag-body-viewport');
      const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport');

      let scrollingTimeout: ReturnType<typeof setTimeout> | null = null;

      const handleVerticalScroll = () => {
        if (bodyViewport) {
          bodyViewport.classList.add('scrolling');
        }

        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
        }
        scrollingTimeout = setTimeout(() => {
          if (bodyViewport) {
            bodyViewport.classList.remove('scrolling');
          }
        }, 500);
      };

      const handleHorizontalScroll = () => {
        if (horizontalScroll) {
          horizontalScroll.classList.add('scrolling');
        }

        if (scrollingTimeout) {
          clearTimeout(scrollingTimeout);
        }
        scrollingTimeout = setTimeout(() => {
          if (horizontalScroll) {
            horizontalScroll.classList.remove('scrolling');
          }
        }, 500);
      };

      bodyViewport?.addEventListener('scroll', handleVerticalScroll);
      horizontalScroll?.addEventListener('scroll', handleHorizontalScroll);

      onBeforeUnmount(() => {
        bodyViewport?.removeEventListener('scroll', handleVerticalScroll);
        horizontalScroll?.removeEventListener('scroll', handleHorizontalScroll);
      });
    },
    getDefaultColDef() {
      this.defaultColDef = {
        headerComponent: HeaderCellRenderer,
        sortable: false,
        cellRenderer: DefaultCellRenderer,
        cellRendererParams: {
          search: this.search,
          searchColumn: "firstName",
        },
      };
    },
    getColDefs(): ColDef[] {
      return [
        {
          field: "id",
          sortable: true,
          resizable: true,
          rowDrag: true,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          pinned: "left",
        },
        { field: "firstName", sortable: true },
        {
          field: "lastName",
          sortable: true,
        },
        {
          field: "LinkedIn",
          cellRenderer: LinkedInCellRenderer,
        },
        { field: "email", resizable: true },
        {
          field: "gender",
          cellRenderer: GenderCellRenderer,
        },
        {
          field: "avatar",
          width: 250,
          cellRenderer: AvatarCellRenderer,
        },
        {
          field: "avatar group",
          width: 250,
          cellRenderer: AvatarGroupCellRenderer,
        },
        {
          field: "Actions",
          width: 100,
          cellRenderer: ActionsCellRenderer,
        },
        { field: "job" },
        { field: "IP" },
        {
          field: "Tooltip",
          sortable: true,
          cellRenderer: TooltipCellRenderer,
        },
      ];
    },
    async handlePaginationChange(event) {
      const { itemsPerPage, page } = event.detail;

      this.gridApi.showLoadingOverlay();

      await delay(1000);

      if (this.paginationPageSize !== itemsPerPage) {
        this.gridApi.paginationSetPageSize(itemsPerPage);
        this.paginationPageSize = itemsPerPage;
      }

      if (this.currPage !== page) {
        this.gridApi.paginationGoToPage(page - 1);
        this.currPage = page;
      }

      this.gridApi.hideOverlay();
    },
  },
});
</script>

<template>
  <div data-testid="ag-grid-table">
    <div class="table-header">
      <WppButton size="s" @click="handleAutoHeightToggle">
        {{ `Set table ${isAutoHeight ? "fixed" : "auto"} height` }}
      </WppButton>
    </div>

    <div class="filters">
      <div class="left">
        <WppInput @wppChange="handleSearchChange" type="search" placeholder="Search by First Name" size="s" />

        <WppSelect :value="selectedGender" size="s" placeholder="Filter by gender" @wppChange="handleGenderChange">
          <WppListItem v-for="gender in genderOptions" :key="gender" :value="gender">
            <span slot="label">
              <span style="color: grey">Gender: </span>
              {{ gender }}
            </span>
          </WppListItem>
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
        <WppActionButton
          class="remove-column-btn"
          @click="handleRemoveAvatarsColumn"
        >
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

    <AgGridVue :class="{ 'ag-theme-wpp': true, 'fixed-height': !isAutoHeight }" :style="{
        width: '100%',
        height: isAutoHeight ? '' : '450px',
      }" :columnDefs="columnDefs" @grid-ready="onGridReady" @first-data-rendered="onFirstDataRendered"
      :rowData="displayData" :domLayout="isAutoHeight ? 'autoHeight' : 'normal'" :defaultColDef="defaultColDef"
      rowSelection="multiple" rowDragMultiRow animateRows rowDragManaged pagination
      :paginationPageSize="paginationPageSize" suppressPaginationPanel loadingOverlayComponent="LoadingOverlay"
      noRowsOverlayComponent="NoDataOverlay" :rowClassRules="rowClassRules" @row-selected="handleRowsSelect">
    </AgGridVue>

    <WppPagination :count="displayDataLength" :itemsPerPage="[3, 5, 10]" :activePageNumber="currPage"
      :pageSelectThreshold="9" data-testid="pagination-list" :selectedItemPerPage="paginationPageSize"
      @wppChange="handlePaginationChange"></WppPagination>
  </div>
</template>

<style lang="scss">
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

.actions {
  margin-top: 200px;
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
</style>
```