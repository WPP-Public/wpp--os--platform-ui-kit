import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'
import { capitalize } from '../../../../utils'

@Component({
  selector: 'app-ag-grid-table-avatar-renderer',
  templateUrl: './cell-renderer.html',
})
export class CellRenderer implements ICellRendererAngularComp {
  public value: string | undefined
  public firstPart: string | undefined
  public secondPart: string | undefined
  public search: string | undefined

  agInit(params: ICellRendererParams & { search: string; searchColumn: string }): void {
    if (params) {
      const { value, search: initSearch, column, searchColumn } = params

      this.value = value

      if (initSearch && column?.getColId() === searchColumn) {
        const splittedValue = value.toLowerCase().split(initSearch.toLowerCase())

        this.firstPart = splittedValue[0]
        this.secondPart = splittedValue[1]

        if (this.firstPart) {
          this.firstPart = capitalize(this.firstPart)
        }

        this.search = this.firstPart ? initSearch : capitalize(initSearch)
      }
    }
  }

  refresh() {
    return false
  }
}
