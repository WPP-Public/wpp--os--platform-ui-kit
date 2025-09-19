# Load more Ag Grid Table

### How It Works

- **Data Slicing:** The full (or filtered) dataset is stored in a variable (for example, `displayData`). A secondary variable (e.g. `visibleData` in Angular/React or a computed property in Vue) contains only the first _N_ rows, where _N_ is controlled by a property like `itemsLoaded`.
- **Load More Trigger:** A dedicated Load More component (such as `<wpp-load-more>`) is used to trigger an event. When clicked, a simulated delay (or an actual API call) increases the value of `itemsLoaded`, and the table re-renders to display additional rows.
- **Resetting on Filter Change:** When the data is filtered (for example, via a search or dropdown), the number of loaded items is reset so that the table starts by displaying a subset of the new data.


## React
```tsx
import { useState, useRef, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ColDef, GridApi } from 'ag-grid-community'
import {
  WppLoadMore,
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
import { InputChangeEventDetail, SelectChangeEventDetail } from '@platform-ui-kit/components-library'

import { capitalize, delay } from '../../../utils'
import HeaderCell from '../components/HeaderCell'
import { dataList } from '../consts'
import '../ag-theme-custom.css'
import './LoadMoreAgGridTable.scss'

export type TableDataItem = (typeof dataList)[0]
export type TableData = TableDataItem[]

const ALL = 'ALL'

const NoDataOverlay = () => <div>No data overlay</div>

const columnDefs: ColDef[] = [
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
  { field: 'lastName', sortable: true },
  {
    field: 'LinkedIn',
    cellRenderer: ({ data }: { data: TableDataItem }) => {
      const messageType = (data as any)?.meta?.error ? 'error' : undefined

      return (
        <div className="linkedin-cell">
          <WppInput value={data.linkedIn} size="s" messageType={messageType} />
        </div>
      )
    },
  },
  { field: 'email', resizable: true },
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

export const LoadMoreAgGridTable = () => {
  const gridRef = useRef<AgGridReact<TableDataItem>>(null)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [displayData, setDisplayData] = useState<TableData>(dataList)
  const [itemsLoaded, setItemsLoaded] = useState<number>(10)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<InputChangeEventDetail['value']>('')
  const [selectedGender, setSelectedGender] = useState<SelectChangeEventDetail['value']>(ALL)
  const [genderOptions, setGenderOptions] = useState([ALL])
  const [selectedItems, setSelectedItems] = useState<TableDataItem[]>([])
  const [isAutoHeight, setIsAutoHeight] = useState(true)
  const [showProgress, setShowProgress] = useState(true)

  useEffect(() => {
    const selectedIds = new Set(selectedItems.map(item => item.id))

    const filteredBySearch = search
      ? dataList.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase()))
      : dataList

    const filteredByFilters =
      selectedGender === ALL ? filteredBySearch : filteredBySearch.filter(item => item.gender === selectedGender)

    setGenderOptions([ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender).filter(Boolean)))])
    setDisplayData(filteredByFilters)

    setItemsLoaded(10)

    if (gridApi) {
      gridApi.setRowData(filteredByFilters.slice(0, 10))

      gridApi.forEachNode(node => {
        if (node.data && selectedIds.has(node.data.id)) {
          node.setSelected(true)
        }
      })
    }
  }, [search, selectedGender, gridApi])

  const onGridReady = (params: any) => {
    setGridApi(params.api)
  }

  const onFirstDataRendered = () => {
    const bodyViewport = document.querySelector('.ag-body-viewport')

    bodyViewport?.setAttribute('data-testid', 'load-more-table-viewport')

    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')
    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
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

  const getRowId = (params: any) => params.data?.id ?? params.node?.id

  const handleLoadMore = async (event: CustomEvent<{ newItemsLoaded: number; incrementBy: number }>) => {
    setLoading(true)
    await delay(1000)

    const newItemsLoaded = event.detail.newItemsLoaded
    const allDataLength = displayData.length
    const effectiveItemsLoaded = Math.min(newItemsLoaded, allDataLength)
    const nextBatch = displayData.slice(itemsLoaded, effectiveItemsLoaded)

    if (gridApi && nextBatch.length > 0) {
      gridApi.applyTransaction({ add: nextBatch })
    }

    setItemsLoaded(effectiveItemsLoaded)
    setLoading(false)
  }

  const shouldHideLoadMore = itemsLoaded >= displayData.length
  const handleSearchChange = (event: CustomEvent<InputChangeEventDetail>) => setSearch(event.detail.value)
  const handleGenderChange = (event: CustomEvent<SelectChangeEventDetail>) => setSelectedGender(event.detail.value)
  const handleAutoHeightToggle = () => setIsAutoHeight(!isAutoHeight)
  const handleShowProgress = () => setShowProgress(!showProgress)
  const handleDeselectAll = () => gridRef.current?.api.deselectAll()
  const handleEditClick = () => alert(`Updating users with IDs: ${selectedItems.map(i => i.id)}`)

  const handleRowsSelect = () => {
    setSelectedItems((gridRef.current?.api.getSelectedRows() as TableDataItem[]) || [])
  }

  return (
    <div data-testid="ag-grid-table">
      <div className="table-header">
        <WppButton data-testid="set-table-height-btn" size="s" onClick={handleAutoHeightToggle}>
          {`Set table ${isAutoHeight ? 'fixed' : 'auto'} height`}
        </WppButton>
        <WppButton data-testid="progress-btn" size="s" onClick={handleShowProgress}>
          {`${showProgress ? 'Hide' : 'Show'} Progress`}
        </WppButton>
      </div>

      <div className="filters">
        <div className="left">
          <WppInput
            onWppChange={handleSearchChange}
            type="search"
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
            onClick={() => gridRef.current?.api.setColumnDefs(columnDefs.filter(i => i.field !== 'avatar'))}
            data-testid="remove-column-button"
          >
            Remove avatars column
            <WppIconTrash slot="icon-start" />
          </WppActionButton>
          <WppActionButton
            data-testid="add-avatars-column-btn"
            className="add-column-btn"
            onClick={() => gridRef.current?.api.setColumnDefs(columnDefs)}
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
        style={{ height: isAutoHeight ? '' : '450px', width: '100%' }}
        className="ag-theme-wpp"
        key={String(isAutoHeight)}
      >
        <AgGridReact<TableDataItem>
          ref={gridRef}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          columnDefs={columnDefs}
          defaultColDef={{
            headerComponent: HeaderCell,
            sortable: false,
            cellRenderer: (props: ColDef['cellRenderer']) => {
              const { value, search: initSearch, column, searchColumn, eGridCell } = props

              if (initSearch && column.colId === searchColumn) {
                const splittedValue = value.toLowerCase().split(initSearch.toLowerCase())
                let firstPart = splittedValue[0]
                const secondPart = splittedValue[1]

                if (firstPart) firstPart = capitalize(firstPart)
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

                  if (!textElement) return
                  const typographyElement = textElement.shadowRoot?.querySelector('.typography')

                  if (typographyElement) {
                    setIsTextTruncated(typographyElement.clientWidth < typographyElement.scrollWidth)
                  }
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
          loadingOverlayComponent={() => <WppSpinner size="m" />}
          noRowsOverlayComponent={NoDataOverlay}
          rowClassRules={{
            'with-error': data => (data.data ? !!data.data.meta?.error : false),
          }}
          domLayout={isAutoHeight ? 'autoHeight' : 'normal'}
          onRowSelected={handleRowsSelect}
          getRowId={getRowId}
        />
      </div>

      {!shouldHideLoadMore && (
        <WppLoadMore
          totalItems={displayData.length}
          itemsLoaded={itemsLoaded}
          loading={loading}
          incrementBy={10}
          onWppClickLoadMore={handleLoadMore}
          showProgressBar={showProgress}
          data-testid="load-more-btn"
        />
      )}
    </div>
  )
}
```

## Angular
```html
<div class="example-page">
  <div class="table-header">
    <wpp-button (click)="handleAutoHeightToggle()" size="s">
      Set table {{ isAutoHeight ? 'fixed' : 'auto' }} height
    </wpp-button>
    <wpp-button (click)="handleShowProgress()" size="s">
      {{ showProgress ? "Hide" : "Show" }} progress
    </wpp-button>
  </div>

  <div class="filters">
    <div class="left">
      <wpp-input
        [(ngModel)]="search"
        ngDefaultControl
        type="search"
        placeholder="Search by First Name"
        (wppChange)="handleSearchChange($event)"
        size="s"
      ></wpp-input>
      <wpp-select [value]="selectedGender" size="s" placeholder="Filter by gender" (wppChange)="handleGenderChange($event)">
        <wpp-list-item *ngFor="let gender of genderOptions" [value]="gender">
          <p slot="label">
            <span style="color: grey">Gender: </span>
            {{ gender }}
          </p>
        </wpp-list-item>
      </wpp-select>
    </div>
    <div class="right">
      <wpp-pill class="pill" type="display" label="{{ selectedItems.length }} selected" removable (wppClose)="handleDeselectAll()"></wpp-pill>
      <wpp-action-button class="remove-column-btn" (click)="handleRemoveAvatarsColumn()">Remove avatars column <wpp-icon-trash slot="icon-start"></wpp-icon-trash></wpp-action-button>
      <wpp-action-button class="add-column-btn" (click)="handleAddAvatarsColumn()">Add avatars column <wpp-icon-plus slot="icon-start"></wpp-icon-plus></wpp-action-button>

      <wpp-button variant="secondary" (click)="handleEditClick()" size="s"> Edit <wpp-icon-export slot="icon-start"></wpp-icon-export> </wpp-button>
    </div>
  </div>

   <div class="ag-theme-wpp" [ngStyle]="getStyles()">
    <ag-grid-angular
      class="ag-grid-table"
      [rowData]="visibleData"
      [getRowId]="rowIdGetter"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      rowSelection="multiple"
      rowDragMultiRow
      animateRows
      rowDragManaged
      [loadingOverlayComponent]="loadingOverlayComponent"
      [noRowsOverlayComponent]="noRowsOverlayComponent"
      [rowClassRules]="rowClassRules"
      [domLayout]="domLayout"
      (rowSelected)="handleRowsSelect()"
      (firstDataRendered)="onFirstDataRendered($event)"
    ></ag-grid-angular>
  </div>

  <wpp-load-more
    *ngIf="itemsLoaded < displayData.length"
    [totalItems]="displayData.length"
    [itemsLoaded]="itemsLoaded"
    [loading]="loading"
    [incrementBy]="10"
    [showProgressBar]="showProgress"
    (wppClickLoadMore)="handleLoadMore($event)"
  ></wpp-load-more>
</div>
```

```ts
import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, FirstDataRenderedEvent, RowClassRules } from 'ag-grid-community'
import { InputChangeEventDetail, SelectChangeEventDetail } from '@platform-ui-kit/components-library'

import { AvatarRenderer } from './components/avatar-renderer/avatar-renderer'
import { CustomLoadingOverlay } from './components/custom-loading-overlay'
import { NoRowsOverlay } from './components/no-rows-overlay'
import { CellRenderer } from './components/cell-renderer'
import { HeaderCellRenderer } from './components/header-cell-renderer/header-cell-renderer'
import { LinkedinCellRenderer } from './components/linkedin-cell-renderer'
import { ActionsRenderer } from './components/actions-renderer/actions-renderer'
import { AvatarGroupRenderer } from './components/avatar-group-renderer/avatar-group-renderer'
import { delay } from '../../../utils'
import users from '../../dummy-data/users'

const ALL = 'ALL'

@Component({
  selector: 'app-ag-grid-table-load-more-example',
  templateUrl: './ag-grid-table-load-more-example.page.html',
  styleUrls: ['./ag-grid-table-load-more-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableLoadMoreExamplePage {
  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users

  public itemsLoaded: number = 10
  public visibleData: any[] = []
  public loading: boolean = false

  public selectedGender: SelectChangeEventDetail['value'] = ALL
  public domLayout: 'normal' | 'autoHeight' = 'autoHeight'
  public isAutoHeight = true
  public showProgress = true
  public selectedItems: typeof users = []

  public columnDefs: ColDef[] = [
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

  constructor(private cdr: ChangeDetectorRef) {
    // Initialize visibleData with first slice of data.
    this.updateVisibleData()
  }

  public onFirstDataRendered(event: FirstDataRenderedEvent): void {
    const bodyViewport = document.querySelector('.ag-body-viewport')
    const horizontalScroll = document.querySelector('.ag-body-horizontal-scroll-viewport')

    let scrollingTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVerticalScroll = () => {
      bodyViewport?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
      scrollingTimeout = setTimeout(() => {
        bodyViewport?.classList.remove('scrolling')
      }, 500)
    }

    const handleHorizontalScroll = () => {
      horizontalScroll?.classList.add('scrolling')
      if (scrollingTimeout) clearTimeout(scrollingTimeout)
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

  public rowIdGetter = (params: any) => params.data?.id ?? params.node?.id

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
    // Reset loaded items when filters change
    this.itemsLoaded = 10
    this.updateVisibleData()
  }

  public handleAutoHeightToggle = () => {
    this.isAutoHeight = !this.isAutoHeight
    this.domLayout = this.isAutoHeight ? 'autoHeight' : 'normal'
  }

  public handleShowProgress = () => {
    this.showProgress = !this.showProgress
    this.cdr.markForCheck()
  }

  public getStyles = () => ({
    width: '100%',
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

  public async handleLoadMore(event: Event) {
    const detail = (event as CustomEvent<{ newItemsLoaded: number; incrementBy: number }>).detail

    this.loading = true
    await delay(1000)

    const newItemsLoaded = detail.newItemsLoaded
    const effectiveItemsLoaded = Math.min(newItemsLoaded, this.displayData.length)
    const nextBatch = this.displayData.slice(this.itemsLoaded, effectiveItemsLoaded)

    if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
      this.agGrid.api.applyTransaction({ add: nextBatch })
    }

    this.itemsLoaded = effectiveItemsLoaded
    this.updateVisibleData()
    this.loading = false
    this.cdr.markForCheck()
  }

  private updateVisibleData() {
    this.visibleData = this.displayData.slice(0, this.itemsLoaded)
    this.cdr.markForCheck()
  }
}
```

## Vue
```vue
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
```