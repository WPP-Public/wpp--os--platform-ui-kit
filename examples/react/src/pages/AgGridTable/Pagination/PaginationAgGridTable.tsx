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
import { SAMPLE_LIST_3, SAMPLE_LIST_4 } from '../../SingleSelect/consts'

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

  console.log(genderOptions)

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

                  if (!typographyElement) return

                  setIsTextTruncated(typographyElement.clientWidth < typographyElement.scrollWidth)
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
