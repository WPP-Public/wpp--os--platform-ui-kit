# Infinite Scroll Ag Grid Table

## React
```tsx
import {
  WppActionButton,
  WppAvatar,
  WppIconMore,
  WppIconSmile,
  WppInput,
  WppListItem,
  WppMenuContext,
  WppSelect,
  WppSpinner,
  WppTooltip,
  WppTypography,
} from '@wppopen/components-library-react'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import styles from './InfiniteScrollAgGridTable.module.scss'
import { AgGridReact } from 'ag-grid-react'
import HeaderCell from '../components/HeaderCell'
import { ColDef, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community'
import { TableDataItem } from '../Pagination/PaginationAgGridTable'
import { dataList } from '../consts'
import { InputChangeEventDetail } from '@wppopen/components-library'
import { capitalize } from '../../../utils'

const URL_EXAMPLE = 'http://url-example:9000/rows'

const columnDefs: ColDef[] = [
  {
    field: 'id',
    sortable: true,
    checkboxSelection: true,
    filter: true,
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
      const messageType = (data as any)?.meta?.error ? 'error' : undefined

      if (!data) return null

      return (
        <div className="linkedin-cell">
          <WppInput value={data?.linkedIn} size="s" messageType={messageType} />
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
    cellRenderer: ({ data }: { data: TableDataItem }) => {
      if (!data) return null

      return (
        <div className="gender-cell">
          <WppSelect value={data?.gender} placeholder="Select user gender" id="select">
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
      )
    },
  },
  {
    field: 'avatar',
    width: 250,
    cellRenderer: ({ data }: { data: TableDataItem }) => {
      if (!data) return null

      return (
        <div className="avatar-cell">
          <WppAvatar size="s" src={data?.avatar} />
          <i>
            {data?.firstName} {data?.lastName}
          </i>
        </div>
      )
    },
  },
  {
    field: 'Actions',
    width: 100,
    cellRenderer: ({ data }: { data: TableDataItem }) => {
      if (!data) return null

      return (
        <div className="column-data">
          <WppMenuContext dropdownConfig={{ placement: 'right' }}>
            <WppActionButton slot="trigger-element">
              <WppIconMore direction="horizontal" color="var(--wpp-color-primary-500)" slot="icon-start" />
            </WppActionButton>
            <div>
              <WppListItem className="centered" onWppChangeListItem={() => alert(`Edit user with id: ${data?.id}`)}>
                <p slot="label">Edit</p>
              </WppListItem>
              <WppListItem className="centered" onWppChangeListItem={() => alert(`Delete user with id: ${data?.id}`)}>
                <p slot="label">Delete</p>
              </WppListItem>
            </div>
          </WppMenuContext>
        </div>
      )
    },
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

interface IResponse {
  data: TableDataItem[]
  totalCount: number
}

const InfiniteScrollAgGridTable: FunctionComponent = () => {
  const [search, setSearch] = useState<InputChangeEventDetail['value']>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const searchValueRef = useRef(search)
  const gridRef = useRef<AgGridReact<TableDataItem>>(null)

  useEffect(() => {
    searchValueRef.current = search
  }, [search])

  const onFirstDataRendered = () => {
    const bodyViewport = document.querySelector('.ag-body-viewport')

    bodyViewport?.setAttribute('data-testid', 'infinite-table-viewport')

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

  const sortBasedOnParams = (
    filteredList: TableDataItem[],
    sortKey: keyof TableDataItem | null,
    order: string | null,
  ): TableDataItem[] => {
    if (!sortKey || !order) return filteredList

    const arrayCopy = [...filteredList]

    arrayCopy.sort((a: TableDataItem, b: TableDataItem) => {
      const aValue = a[sortKey] || ''
      const bValue = b[sortKey] || ''

      if (order === 'asc') {
        if (aValue < bValue) return -1
        if (aValue > bValue) return 1

        return 0
      } else {
        if (aValue > bValue) return -1
        if (aValue < bValue) return 1

        return 0
      }
    })

    return arrayCopy
  }

  const fitlerBasedOnParams = (filterValue: string | null) => {
    if (!filterValue) return dataList

    const arrayCopy = [...dataList]

    return arrayCopy.filter((item: TableDataItem) => item.firstName.toLowerCase().includes(filterValue.toLowerCase()))
  }

  const getParamValue = (paramKey: string | null): keyof TableDataItem | null =>
    typeof paramKey === 'string' ? (paramKey as keyof TableDataItem) : null

  const fetchData = (url: string): Promise<IResponse> => {
    const urlParams = new URL(url).searchParams

    const sortKey: keyof TableDataItem | null = getParamValue(urlParams.get('_sort'))

    const filteredList: TableDataItem[] = fitlerBasedOnParams(urlParams.get('_filterValue'))
    const sortedList: TableDataItem[] = sortBasedOnParams(filteredList, sortKey, urlParams.get('_order'))

    gridRef.current!.api.setRowCount(sortedList.length)

    console.log(url)

    return new Promise(resolve => {
      const data: TableDataItem[] = sortedList.slice(
        parseInt(urlParams.get('_start') || '0'),
        parseInt(urlParams.get('_end') || '0'),
      )

      setTimeout(() => {
        resolve({
          data,
          totalCount: sortedList.length,
        })
      }, 500)
    })
  }

  const onGridReady = (params: GridReadyEvent) => {
    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        // Implement your data fetching logic here
        // Fetch data for the specified block range
        const { startRow, endRow, sortModel } = params

        let finalURL = URL_EXAMPLE + '?'

        if (sortModel.length) {
          const { colId, sort } = sortModel[0]

          finalURL += `_sort=${colId}&_order=${sort}&`
        }

        if (searchValueRef.current) {
          finalURL += `_filterValue=${searchValueRef.current}&`
        }

        finalURL += `_start=${startRow}&_end=${endRow}`

        setIsLoading(true)

        fetchData(finalURL)
          .then(rowData => {
            params.successCallback(rowData.data, rowData.totalCount)
          })
          .catch(error => {
            console.error('Error loading data:', error)
            params.failCallback()
          })
          .finally(() => {
            setIsLoading(false)
          })
      },
    }

    params.api.setDatasource(dataSource)
  }

  const handleSearchChange = (event: CustomEvent<InputChangeEventDetail>) => {
    setSearch(event.detail.value)

    gridRef.current!.api.purgeInfiniteCache()
  }

  return (
    <div data-testid="ag-grid-table" className={`ag-theme-wpp ${styles['grid-container']}`}>
      <WppTypography className={styles.title} type="2xl-heading">
        AG Grid Table with Infinite scroll
      </WppTypography>
      <WppInput
        class={styles.input}
        onWppChange={handleSearchChange}
        type={'search'}
        placeholder="Search by First Name"
        size="s"
        data-testid="search-input"
      />
      <div style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          onFirstDataRendered={onFirstDataRendered}
          cacheBlockSize={10}
          rowModelType={'infinite'}
          paginationPageSize={10}
          rowSelection="multiple"
          columnDefs={columnDefs}
          onGridReady={params => onGridReady(params)}
          loadingOverlayComponent={() => <WppSpinner size="s" />}
          defaultColDef={{
            headerComponent: HeaderCell,
            sortable: false,
            cellRenderer: ({ value, search: initSearch, column, searchColumn }: ColDef['cellRenderer']) => {
              if (!value) {
                if (isLoading) {
                  return column.colId === 'id' ? (
                    <div className={styles['spinner-container']}>
                      <WppSpinner size="s" />
                    </div>
                  ) : null
                }

                return null
              }

              if (initSearch && column.colId === searchColumn) {
                const splittedValue = value?.toLowerCase().split(initSearch.toLowerCase())

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

              return (
                <WppTypography type="s-body" className="cell-text">
                  {value}
                </WppTypography>
              )
            },
            cellRendererParams: {
              search,
              searchColumn: 'firstName',
            },
          }}
        />
      </div>
    </div>
  )
}

export default InfiniteScrollAgGridTable
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