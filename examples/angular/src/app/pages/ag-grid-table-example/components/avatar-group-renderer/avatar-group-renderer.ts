import { Component } from '@angular/core'
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

@Component({
  selector: 'app-ag-grid-table-avatar-group-renderer',
  templateUrl: './avatar-group-renderer.html',
  styleUrls: ['./avatar-group-renderer.scss'],
})
export class AvatarGroupRenderer implements ICellRendererAngularComp {
  public fullName: string | undefined
  public avatars: Array<{ src: string; alt: string }> = []

  agInit(params: ICellRendererParams): void {
    this.fullName = `${params.data.firstName} ${params.data.lastName}`
    this.avatars = params.data.avatarGroup || []
  }

  refresh(): boolean {
    return false
  }
}
