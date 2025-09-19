import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-avatar-renderer',
  templateUrl: './avatar-renderer.html',
  styleUrls: ['./avatar-renderer.scss'],
})
export class AvatarRenderer implements ICellRendererAngularComp {
  public fullName: string | undefined
  public src: string | undefined

  agInit(params: ICellRendererParams): void {
    this.fullName = `${params.data.firstName} ${params.data.lastName}`
    this.src = params.data.avatar
  }

  refresh() {
    return false
  }
}
