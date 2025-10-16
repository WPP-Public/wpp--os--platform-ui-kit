# Hybrid Infinite scroll with Load more Ag Grid Table

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
} from '@wppopen/components-library-react'
import 'ag-grid-community/styles/ag-grid.css'
import '@wppopen/components-library/dist/collection/ag-theme-wpp.css'
import { InputChangeEventDetail, SelectChangeEventDetail } from '@wppopen/components-library'

import { capitalize, delay } from '../../../utils'
import HeaderCell from '../components/HeaderCell'
import { dataList } from '../consts'
import '../ag-theme-custom.css'
import styles from './HybridInfiniteScrollAgGridTable.module.scss'

export type TableDataItem = (typeof dataList)[0]
export type TableData = TableDataItem[]

const ALL = 'ALL'
const NoDataOverlay = () => <div>No data overlay</div>
const AUTO_LOAD_LIMIT = 50 // Number of rows to auto-load before showing "Load More"
const LOAD_MORE_COUNT = 25 // Number of rows to load on each "Load More" click
const INITIAL_LOAD = 10 // Initial batch

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

export const HybridInfiniteScrollAgGridTable = () => {
  const gridRef = useRef<AgGridReact<TableDataItem>>(null)
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [displayData, setDisplayData] = useState<TableData>(dataList)
  const [itemsLoaded, setItemsLoaded] = useState<number>(INITIAL_LOAD)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<InputChangeEventDetail['value']>('')
  const [selectedGender, setSelectedGender] = useState<SelectChangeEventDetail['value']>(ALL)
  const [genderOptions, setGenderOptions] = useState([ALL])
  const [selectedItems, setSelectedItems] = useState<TableDataItem[]>([])
  const [showProgress, setShowProgress] = useState(true)
  const [showAddAvatarsColumn, setShowAddAvatarsColumn] = useState(true)

  useEffect(() => {
    const selectedIds = new Set(selectedItems.map(item => item.id))

    const filteredBySearch = search
      ? dataList.filter(item => item.firstName.toLowerCase().includes(search.toLowerCase()))
      : dataList

    const filteredByFilters =
      selectedGender === ALL ? filteredBySearch : filteredBySearch.filter(item => item.gender === selectedGender)

    setGenderOptions([ALL, ...Array.from(new Set(filteredBySearch.map(item => item.gender).filter(Boolean)))])
    setDisplayData(filteredByFilters)

    setItemsLoaded(INITIAL_LOAD)

    if (gridApi) {
      gridApi.setRowData(filteredByFilters.slice(0, INITIAL_LOAD))

      gridApi.forEachNode(node => {
        if (node.data && selectedIds.has(node.data.id)) {
          node.setSelected(true)
        }
      })
    }
  }, [search, selectedGender, gridApi])

  // Infinite scroll: auto-load more rows up to AUTO_LOAD_LIMIT
  useEffect(() => {
    const bodyViewport = document.querySelector('.ag-body-viewport')

    if (!bodyViewport) return

    const onScroll = () => {
      if (
        bodyViewport.scrollTop + bodyViewport.clientHeight >= bodyViewport.scrollHeight - 10 &&
        itemsLoaded < Math.min(displayData.length, AUTO_LOAD_LIMIT)
      ) {
        const next = Math.min(itemsLoaded + LOAD_MORE_COUNT, AUTO_LOAD_LIMIT, displayData.length)
        const nextBatch = displayData.slice(itemsLoaded, next)

        if (gridApi && nextBatch.length > 0) {
          gridApi.applyTransaction({ add: nextBatch })
        }
        setItemsLoaded(next)
      }
    }

    bodyViewport.addEventListener('scroll', onScroll)

    return () => bodyViewport.removeEventListener('scroll', onScroll)
  }, [itemsLoaded, displayData, gridApi])

  // Show Load More button after AUTO_LOAD_LIMIT
  const showLoadMore = itemsLoaded >= AUTO_LOAD_LIMIT && itemsLoaded < displayData.length

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

  const handleLoadMore = async () => {
    setLoading(true)
    await delay(1000)

    const next = Math.min(itemsLoaded + LOAD_MORE_COUNT, displayData.length)
    const nextBatch = displayData.slice(itemsLoaded, next)

    if (gridApi && nextBatch.length > 0) {
      gridApi.applyTransaction({ add: nextBatch })
    }

    setItemsLoaded(next)
    setLoading(false)
  }

  const handleSearchChange = (event: CustomEvent<InputChangeEventDetail>) => setSearch(event.detail.value)
  const handleGenderChange = (event: CustomEvent<SelectChangeEventDetail>) => setSelectedGender(event.detail.value)
  const handleShowProgress = () => setShowProgress(!showProgress)
  const handleDeselectAll = () => gridRef.current?.api.deselectAll()
  const handleEditClick = () => alert(`Updating users with IDs: ${selectedItems.map(i => i.id)}`)

  const handleRowsSelect = () => {
    setSelectedItems((gridRef.current?.api.getSelectedRows() as TableDataItem[]) || [])
  }

  return (
    <div data-testid="ag-grid-table">
      <div className={styles.showProgress}>
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
          {showAddAvatarsColumn ? (
            <WppActionButton
              className="remove-column-btn"
              onClick={() => {
                gridRef.current?.api.setColumnDefs(columnDefs.filter(i => i.field !== 'avatar'))
                setShowAddAvatarsColumn(!showAddAvatarsColumn)
              }}
              data-testid="remove-column-button"
            >
              Remove avatars column
              <WppIconTrash slot="icon-start" />
            </WppActionButton>
          ) : (
            <WppActionButton
              data-testid="add-avatars-column-btn"
              className="add-column-btn"
              onClick={() => {
                gridRef.current?.api.setColumnDefs(columnDefs)
                setShowAddAvatarsColumn(!showAddAvatarsColumn)
              }}
            >
              Add avatars column
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
          )}
          <WppButton data-testid="edit-btn" variant="secondary" onClick={handleEditClick} size="s">
            Edit
            <WppIconExport slot="icon-start" />
          </WppButton>
        </div>
      </div>
      <div style={{ height: '450px', width: '100%' }} className="ag-theme-wpp">
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
          onRowSelected={handleRowsSelect}
          getRowId={getRowId}
        />
      </div>

      {showLoadMore && (
        <WppLoadMore
          totalItems={displayData.length}
          itemsLoaded={itemsLoaded}
          loading={loading}
          incrementBy={LOAD_MORE_COUNT}
          onWppClickLoadMore={handleLoadMore}
          showProgressBar={showProgress}
          data-testid="load-more-btn"
          className={styles.wppLoadMore}
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
        <wpp-button (click)="handleShowProgress()" size="s">
            {{ showProgress ? "Hide" : "Show" }} progress
        </wpp-button>
    </div>

    <div class="filters">
        <div class="left">
            <wpp-input [(ngModel)]="search" ngDefaultControl type="search" placeholder="Search by First Name"
                (wppChange)="handleSearchChange($event)" size="s"></wpp-input>
            <wpp-select [value]="selectedGender" size="s" placeholder="Filter by gender"
                (wppChange)="handleGenderChange($event)">
                <wpp-list-item *ngFor="let gender of genderOptions" [value]="gender">
                    <p slot="label">
                        <span style="color: grey">Gender: </span>
                        {{ gender }}
                    </p>
                </wpp-list-item>
            </wpp-select>
        </div>
        <div class="right">
            <wpp-pill class="pill" type="display" label="{{ selectedItems.length }} selected" removable
                (wppClose)="handleDeselectAll()"></wpp-pill>
            <wpp-action-button class="remove-column-btn" (click)="handleRemoveAvatarsColumn()">Remove avatars column
                <wpp-icon-trash slot="icon-start"></wpp-icon-trash></wpp-action-button>
            <wpp-action-button class="add-column-btn" (click)="handleAddAvatarsColumn()">Add avatars column
                <wpp-icon-plus slot="icon-start"></wpp-icon-plus></wpp-action-button>

            <wpp-button variant="secondary" (click)="handleEditClick()" size="s"> Edit <wpp-icon-export
                    slot="icon-start"></wpp-icon-export> </wpp-button>
        </div>
    </div>

    <div class="ag-theme-wpp" [ngStyle]="getStyles()">
        <ag-grid-angular class="ag-grid-table" [rowData]="visibleData" [getRowId]="rowIdGetter"
            [columnDefs]="columnDefs" [defaultColDef]="defaultColDef" rowSelection="multiple" rowDragMultiRow
            animateRows rowDragManaged [loadingOverlayComponent]="loadingOverlayComponent"
            [noRowsOverlayComponent]="noRowsOverlayComponent" [rowClassRules]="rowClassRules"
            (rowSelected)="handleRowsSelect()" (firstDataRendered)="onFirstDataRendered($event)"></ag-grid-angular>
    </div>

    <wpp-load-more *ngIf="itemsLoaded >= AUTO_LOAD_LIMIT && itemsLoaded < displayData.length"
        [totalItems]="displayData.length" [itemsLoaded]="itemsLoaded" [loading]="loading"
        [incrementBy]="LOAD_MORE_COUNT" [showProgressBar]="showProgress" (wppClickLoadMore)="handleLoadMore()">
    </wpp-load-more>
</div>
```

```ts
import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, FirstDataRenderedEvent, RowClassRules } from 'ag-grid-community'
import { InputChangeEventDetail, SelectChangeEventDetail } from '@wppopen/components-library'

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
  selector: 'ag-grid-table-hybrid-infinite-scroll-example',
  templateUrl: './ag-grid-table-hybrid-infinite-scroll-example.page.html',
  styleUrls: ['./ag-grid-table-hybrid-infinite-scroll-example.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridTableHybridInfiniteScrollExamplePage {
  public readonly AUTO_LOAD_LIMIT = 50
  public readonly LOAD_MORE_COUNT = 25
  public readonly INITIAL_LOAD = 10

  public genderOptions = [ALL]
  public search: InputChangeEventDetail['value'] = ''
  public displayData = users

  public itemsLoaded: number = this.INITIAL_LOAD
  public visibleData: any[] = []
  public loading: boolean = false

  public selectedGender: SelectChangeEventDetail['value'] = ALL
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

    this.attachInfiniteScroll()
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
    this.itemsLoaded = this.INITIAL_LOAD
    this.updateVisibleData()
  }

  public handleShowProgress = () => {
    this.showProgress = !this.showProgress
    this.cdr.markForCheck()
  }

  public getStyles = () => ({
    width: '100%',
    height: '450px',
  })

  public handleRemoveAvatarsColumn = () =>
    this.agGrid.api.setColumnDefs(this.columnDefs.filter(i => i.field !== 'avatar'))

  public handleAddAvatarsColumn = () => this.agGrid.api.setColumnDefs(this.columnDefs)

  public handleRowsSelect = () => {
    this.selectedItems = this.agGrid.api.getSelectedRows()
  }

  public handleDeselectAll = () => this.agGrid.api.deselectAll()

  public handleEditClick = () => alert(`Updating users with IDs: ${this.selectedItems.map(i => i.id)}`)

  public async handleLoadMore() {
    this.loading = true
    await delay(1000)

    const next = Math.min(this.itemsLoaded + this.LOAD_MORE_COUNT, this.displayData.length)
    const nextBatch = this.displayData.slice(this.itemsLoaded, next)

    if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
      this.agGrid.api.applyTransaction({ add: nextBatch })
    }

    this.itemsLoaded = next
    this.updateVisibleData()
    this.loading = false
    this.cdr.markForCheck()
  }

  private updateVisibleData() {
    this.visibleData = this.displayData.slice(0, this.itemsLoaded)
    this.cdr.markForCheck()
  }

  private attachInfiniteScroll() {
    setTimeout(() => {
      const bodyViewport = document.querySelector('.ag-body-viewport')

      if (!bodyViewport) return

      const onScroll = () => {
        if (
          bodyViewport.scrollTop + bodyViewport.clientHeight >= bodyViewport.scrollHeight - 10 &&
          this.itemsLoaded < Math.min(this.displayData.length, this.AUTO_LOAD_LIMIT)
        ) {
          const next = Math.min(this.itemsLoaded + this.LOAD_MORE_COUNT, this.AUTO_LOAD_LIMIT, this.displayData.length)
          const nextBatch = this.displayData.slice(this.itemsLoaded, next)

          if (this.agGrid && this.agGrid.api && nextBatch.length > 0) {
            this.agGrid.api.applyTransaction({ add: nextBatch })
          }
          this.itemsLoaded = next
          this.updateVisibleData()
          this.cdr.markForCheck()
        }
      }

      bodyViewport.addEventListener('scroll', onScroll)

      // Clean up on destroy or layout change
      this.agGrid.api.addEventListener('gridDestroyed', () => {
        bodyViewport.removeEventListener('scroll', onScroll)
      })
    }, 0)
  }
}
```
