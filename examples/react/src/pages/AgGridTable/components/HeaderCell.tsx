import React, { FunctionComponent } from 'react'
import { WppTypography, WppIconSort } from '@platform-ui-kit/components-library-react'
import { IHeaderParams } from 'ag-grid-community'

const HeaderCell: FunctionComponent<IHeaderParams> = props => {
  const handleHeaderCellClick = () => {
    if (!props.enableSorting) return

    const items: ('asc' | 'desc' | null)[] = ['asc', 'desc', null]
    const selectedSort = props.column.getSort()
    const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1
    const nextSortType =
      selectedSortIndex === -1 || selectedSortIndex === items.length - 1 ? 'asc' : items[selectedSortIndex + 1]

    props.setSort(nextSortType)

    const rowNode = props.api.getDisplayedRowAtIndex(0)

    console.log(rowNode)

    if (rowNode) {
      console.log(props)
    }
    // const allRows: any[] = props.api.getDisplayedRowAtIndex(0)?.gridOptionsWrapper?.gridOptions?.rowData || []
  }

  return (
    <div className="ag-header-cell-comp" onClick={() => handleHeaderCellClick()}>
      <WppTypography type="s-strong">{props.displayName}</WppTypography>
      {props.enableSorting && (
        <div className="ag-sorting">
          <WppIconSort
            className={`top-sort-icon ${
              props.column.isSortAscending() ? 'active' : props.column.isSortNone() ? '' : 'not-active'
            }`}
          />
        </div>
      )}
    </div>
  )
}

export default HeaderCell
