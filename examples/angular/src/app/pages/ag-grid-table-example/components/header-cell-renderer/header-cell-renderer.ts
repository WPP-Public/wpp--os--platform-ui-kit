import { Component } from '@angular/core'
import { IHeaderAngularComp } from 'ag-grid-angular'
import { IHeaderParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-header-cell-renderer',
  templateUrl: './header-cell-renderer.html',
})
export class HeaderCellRenderer implements IHeaderAngularComp {
  public params: IHeaderParams | undefined

  agInit(params: IHeaderParams): void {
    this.params = params
  }

  public handleHeaderCellClick = () => {
    if (!this.params || !this.params.enableSorting) return

    const items: ('asc' | 'desc' | null)[] = ['asc', 'desc', null]
    const selectedSort = this.params.column.getSort()
    const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1
    const nextSortType =
      selectedSortIndex === -1 || selectedSortIndex === items.length - 1 ? 'asc' : items[selectedSortIndex + 1]

    this.params.setSort(nextSortType)
  }

  public getColor = (isActive: boolean | undefined): string =>
    isActive ? 'var(--wpp-icon-color-active)' : 'var(--wpp-grey-color-600)'

  refresh() {
    return false
  }
}
