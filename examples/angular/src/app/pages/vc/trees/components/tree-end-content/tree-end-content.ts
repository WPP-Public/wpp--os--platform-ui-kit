import { ChangeDetectionStrategy, Component } from '@angular/core'
import { dataWithEndContent } from '../../config'

@Component({
  selector: 'app-end-content-tree-example',
  templateUrl: './tree-end-content.html',
  styleUrls: ['./tree-end-content.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeEndContent {
  public treeData = dataWithEndContent

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent).detail)
  }
}
