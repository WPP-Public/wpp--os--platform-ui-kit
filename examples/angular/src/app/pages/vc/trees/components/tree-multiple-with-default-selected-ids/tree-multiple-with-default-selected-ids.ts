import { ChangeDetectionStrategy, Component } from '@angular/core'
import { data } from '../../config'
import { TreeChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-multiple-tree-with-default-selected-ids-example',
  templateUrl: './tree-multiple-with-default-selected-ids.html',
  styleUrls: ['./tree-multiple-with-default-selected-ids.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeMultipleWithDefaultSelectedIds {
  public treeData = data

  public handleTreeChange = (event: Event) => {
    this.treeData = (event as CustomEvent<TreeChangeEventDetail>).detail.treeState
  }
}
