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
import styles from './HybridInfiniteScrollAgGridTable.module.scss'
import { SAMPLE_LIST_3, SAMPLE_LIST_4 } from '../../SingleSelect/consts'

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
        <WppSelect value={data.gender} placeholder="Select user gender" id="select" list={SAMPLE_LIST_4}></WppSelect>
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

  console.log(genderOptions)

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
            list={SAMPLE_LIST_3}
          ></WppSelect>
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
