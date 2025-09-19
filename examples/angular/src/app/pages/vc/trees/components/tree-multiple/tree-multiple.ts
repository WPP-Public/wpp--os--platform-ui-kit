import { ChangeDetectionStrategy, Component } from '@angular/core'
import { dataWithLongNames } from '../../config'

@Component({
  selector: 'app-multiple-tree-example',
  templateUrl: './tree-multiple.html',
  styleUrls: ['./tree-multiple.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeMultiple {
  public treeData = dataWithLongNames

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent).detail)
  }
}
