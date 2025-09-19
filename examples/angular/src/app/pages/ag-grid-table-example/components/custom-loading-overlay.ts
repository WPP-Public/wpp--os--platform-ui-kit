import { Component } from '@angular/core'
import { ILoadingOverlayAngularComp } from 'ag-grid-angular'
import { ILoadingOverlayParams } from 'ag-grid-community'

@Component({
  selector: 'app-loading-overlay',
  template: '<wpp-spinner size="m"></wpp-spinner>',
})
export class CustomLoadingOverlay implements ILoadingOverlayAngularComp {
  public params: ILoadingOverlayParams | undefined

  agInit(params: ILoadingOverlayParams): void {
    this.params = params
  }
}
