import { ChangeDetectionStrategy, Component } from '@angular/core'
import { data } from '../../config'

@Component({
  selector: 'app-single-tree-example',
  templateUrl: './tree-single.html',
  styleUrls: ['./tree-single.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingle {
  public treeData = data

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent).detail)
  }
}
