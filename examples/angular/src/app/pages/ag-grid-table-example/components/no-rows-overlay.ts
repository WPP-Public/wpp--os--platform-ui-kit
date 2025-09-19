import { Component } from '@angular/core'
import { INoRowsOverlayAngularComp } from 'ag-grid-angular'
import { INoRowsOverlayParams } from 'ag-grid-community'

@Component({
  selector: 'app-no-rows-overlay',
  template: '<div>No data overlay</div>',
})
export class NoRowsOverlay implements INoRowsOverlayAngularComp {
  public params: INoRowsOverlayParams | undefined

  agInit(params: INoRowsOverlayParams): void {
    this.params = params
  }
}
