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
} from '@platform-ui-kit/components-library-react'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import styles from './InfiniteScrollAgGridTable.module.scss'
import { AgGridReact } from 'ag-grid-react'
import HeaderCell from '../components/HeaderCell'
import { ColDef, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community'
import { TableDataItem } from '../Pagination/PaginationAgGridTable'
import { dataList } from '../consts'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'
import { capitalize } from '../../../utils'
import { SAMPLE_LIST_4 } from '../../SingleSelect/consts'

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
          <WppSelect value={data?.gender} placeholder="Select user gender" id="select" list={SAMPLE_LIST_4}></WppSelect>
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
            <WppActionButton className={styles.mcBtn} slot="trigger-element">
              <WppIconMore direction="horizontal" color="var(--wpp-grey-color-800)" slot="icon-start" />
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
