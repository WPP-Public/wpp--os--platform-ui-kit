import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-actions-renderer',
  templateUrl: './actions-renderer.html',
  styleUrls: ['./actions-renderer.scss'],
})
export class ActionsRenderer implements ICellRendererAngularComp {
  public id: number | undefined
  public dropdownConfig = { appendTo: () => document.body, placement: 'right' }

  public handleEditClick = () => alert(`Edit user with id: ${this.id}`)

  public handleDeleteClick = () => alert(`Delete user with id: ${this.id}`)

  agInit(params: ICellRendererParams): void {
    this.id = params.data.id
  }

  refresh() {
    return false
  }
}
