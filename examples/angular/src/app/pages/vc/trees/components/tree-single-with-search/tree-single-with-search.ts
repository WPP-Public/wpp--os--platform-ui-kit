import { ChangeDetectionStrategy, Component } from '@angular/core'
import { debounce } from 'lodash'
import { chosData } from '../../config'

@Component({
  selector: 'app-single-tree-with-search-example',
  templateUrl: './tree-single-with-search.html',
  styleUrls: ['./tree-single-with-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSingleWithSearch {
  public search = ''
  public treeData = chosData

  public handleTreeChange = (event: Event) => {
    console.log('handleTreeChange event :>> ', (event as CustomEvent).detail)

    this.treeData = (event as CustomEvent).detail.treeState
  }

  public handleSearch = (ev: Event) => {
    this.search = (ev as CustomEvent).detail.value || ''
  }

  public handleActionClick = (event: Event) => {
    console.log('handleActionClick', (event as CustomEvent).detail)
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  public debouncedHandleSearch = debounce(this.handleSearch, 400)
}
