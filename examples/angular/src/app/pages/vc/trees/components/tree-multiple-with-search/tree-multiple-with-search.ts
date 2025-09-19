import { ChangeDetectionStrategy, Component } from '@angular/core'
import { debounce } from 'lodash'
import { dataWithLongNames } from '../../config'

@Component({
  selector: 'app-multiple-tree-with-search-example',
  templateUrl: './tree-multiple-with-search.html',
  styleUrls: ['./tree-multiple-with-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeMultipleWithSearch {
  public treeData = dataWithLongNames
  public search = ''

  public handleTreeChange = (ev: Event) => {
    this.treeData = (ev as CustomEvent).detail.treeState
  }

  public handleSearch = (ev: Event) => {
    this.search = (ev as CustomEvent).detail.value || ''
  }

  // In order to prevent rendering issues on big data, use debounce for search handler
  public debouncedHandleSearch = debounce(this.handleSearch, 400)
}
