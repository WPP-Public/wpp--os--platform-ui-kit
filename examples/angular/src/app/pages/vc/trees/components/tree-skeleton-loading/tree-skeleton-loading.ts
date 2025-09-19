import { ChangeDetectionStrategy, Component } from '@angular/core'
import { data } from '../../config'

@Component({
  selector: 'app-skeleton-loading-tree-example',
  templateUrl: './tree-skeleton-loading.html',
  styleUrls: ['./tree-skeleton-loading.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSkeletonLoading {
  public treeData = data
  public loading = true

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent).detail)
  }

  public toggleLoading = () => {
    this.loading = !this.loading
  }
}
