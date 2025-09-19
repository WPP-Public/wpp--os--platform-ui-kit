import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TreeActionClickEventDetail } from '@platform-ui-kit/components-library'
import { data } from '../../config'

@Component({
  selector: 'app-single-tree-no-animation-example',
  templateUrl: './tree-single-with-disabled-animation.html',
  styleUrls: ['./tree-single-with-disabled-animation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingleWithDisabledAnimation {
  public treeData = data

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)
    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent<TreeActionClickEventDetail>).detail)
  }
}
