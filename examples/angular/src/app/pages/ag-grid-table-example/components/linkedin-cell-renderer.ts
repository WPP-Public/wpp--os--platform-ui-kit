import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-avatar-renderer',
  template:
    '<div class="linkedIn-cell" style="height: 100%; display: flex; align-items: center"><wpp-input [value]="value" [messageType]="messageType" size="s"></wpp-input></div>',
})
export class LinkedinCellRenderer implements ICellRendererAngularComp {
  public value: string | undefined
  public messageType: 'error' | undefined

  agInit(params: ICellRendererParams): void {
    if (params) {
      this.value = params.data.linkedIn
      this.messageType = params.data.meta?.error ? 'error' : undefined
    }
  }

  refresh() {
    return false
  }
}
